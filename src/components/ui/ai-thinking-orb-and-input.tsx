"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowUp, Sparkles, RotateCcw } from "lucide-react";

export interface MorphOrbProps {
  onSubmit?: (text: string) => Promise<string> | string;
  minThinkMs?: number;
  speed?: number;
  placeholder?: string;
  className?: string;
  initialPrompt?: string;
  onReset?: () => void;
  externalSubmitText?: string;
  children?: React.ReactNode;
}

type Phase = "input" | "thinking" | "answered";

interface Particle {
  theta: number;
  phi: number;
  baseRadius: number;
  speed: number;
  phase: number;
  colorType: number; // 0 = gold, 1 = amber, 2 = white, 3 = warm bronze
}

const STATUS_STAGES = [
  "Thinking...",
  "Searching project index...",
  "Analyzing architecture...",
  "Composing response...",
];

export function MorphOrb({
  onSubmit,
  minThinkMs = 2600,
  speed = 1,
  placeholder = "Ask about my projects...",
  className = "",
  initialPrompt = "",
  onReset,
  externalSubmitText,
  children,
}: MorphOrbProps) {
  const [phase, setPhase] = useState<Phase>("input");
  const [inputText, setInputText] = useState(initialPrompt);
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [statusText, setStatusText] = useState(STATUS_STAGES[0]);
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resetBtnRef = useRef<HTMLButtonElement | null>(null);

  const animationFrameId = useRef<number | null>(null);
  const statusTimerId = useRef<NodeJS.Timeout | null>(null);
  const thinkStartRef = useRef<number>(0);
  const isMountedRef = useRef<boolean>(true);
  const requestIdRef = useRef<number>(0);

  const inputId = useId();

  // Particle configuration stored in ref to prevent React re-renders during rAF loop
  const particlesRef = useRef<Particle[]>([]);
  const rotationRef = useRef({ alpha: 0, beta: 0 });

  // Initialize particle cloud once
  useEffect(() => {
    isMountedRef.current = true;
    const numParticles = 140;
    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(Math.random() * 2 - 1),
        baseRadius: 1,
        speed: 0.8 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        colorType: Math.floor(Math.random() * 4),
      });
    }
    particlesRef.current = particles;

    return () => {
      isMountedRef.current = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (statusTimerId.current) {
        clearTimeout(statusTimerId.current);
      }
    };
  }, []);

  // Execute submission flow with timing guarantees and status label sequencing
  const handleExecuteSubmit = useCallback(
    async (queryText: string) => {
      const textToSubmit = queryText.trim();
      if (!textToSubmit || phase === "thinking") return;

      setErrorMessage("");
      setSubmittedQuery(textToSubmit);
      setPhase("thinking");
      setStatusText(STATUS_STAGES[0]);
      thinkStartRef.current = Date.now();
      requestIdRef.current += 1;
      const currentRequestId = requestIdRef.current;

      // Sequence through status stages during the thinking duration
      const stepDuration = Math.max(500, Math.floor(minThinkMs / STATUS_STAGES.length));
      let stepIndex = 0;

      const advanceStatus = () => {
        stepIndex += 1;
        if (stepIndex < STATUS_STAGES.length && isMountedRef.current && requestIdRef.current === currentRequestId) {
          setStatusText(STATUS_STAGES[stepIndex]);
          statusTimerId.current = setTimeout(advanceStatus, stepDuration);
        }
      };

      statusTimerId.current = setTimeout(advanceStatus, stepDuration);

      try {
        // Execute response generation
        const answerPromise = onSubmit
          ? Promise.resolve(onSubmit(textToSubmit))
          : Promise.resolve("The answer goes here");

        const [resolvedAnswer] = await Promise.all([
          answerPromise,
          // Guarantee minThinkMs duration so visitor experiences the thinking orb animation
          new Promise((resolve) => setTimeout(resolve, minThinkMs)),
        ]);

        if (!isMountedRef.current || requestIdRef.current !== currentRequestId) return;

        setAnswer(typeof resolvedAnswer === "string" ? resolvedAnswer : "The answer goes here");
        setPhase("answered");

        // Auto-focus the reset button for keyboard accessibility
        setTimeout(() => {
          if (resetBtnRef.current) {
            resetBtnRef.current.focus();
          }
        }, 100);
      } catch (err: unknown) {
        if (!isMountedRef.current || requestIdRef.current !== currentRequestId) return;
        const message = err instanceof Error ? err.message : "Failed to generate answer. Please try again.";
        setErrorMessage(message);
        setPhase("input");
      }
    },
    [phase, minThinkMs, onSubmit]
  );

  // Handle external submit requests (e.g. from suggestion chips)
  useEffect(() => {
    if (externalSubmitText && externalSubmitText.trim() && phase === "input") {
      setInputText(externalSubmitText);
      handleExecuteSubmit(externalSubmitText);
    }
  }, [externalSubmitText, phase, handleExecuteSubmit]);

  // Clean Canvas particle renderer confined strictly to the measured stageRef
  useEffect(() => {
    if (phase !== "thinking") {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = stage.clientWidth || 360;
    let height = stage.clientHeight || 380;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          width = entry.contentRect.width || 360;
          height = entry.contentRect.height || 380;
          if (canvas) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
          }
        }
      }
    });

    resizeObserver.observe(stage);

    let startTime = performance.now();

    const render = (now: number) => {
      if (!isMountedRef.current || phase !== "thinking") return;

      const elapsed = (now - startTime) / 1000;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Centered strictly in the stage container with an upper bias to accommodate the status label
      const cx = width / 2;
      const cy = Math.max(120, height / 2 - 24);

      // Orb radius is proportionally bounded to the container size
      const maxRadius = Math.min(width, height) * 0.28;
      const boundedRadius = Math.max(48, Math.min(maxRadius, 72));

      // Central pulsating radial glow
      const pulse = Math.sin(elapsed * 2.5) * 0.12 + 0.95;
      const glowGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, boundedRadius * 1.5 * pulse);
      glowGrad.addColorStop(0, "rgba(226, 179, 110, 0.45)");
      glowGrad.addColorStop(0.4, "rgba(245, 158, 11, 0.18)");
      glowGrad.addColorStop(0.7, "rgba(226, 179, 110, 0.05)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, boundedRadius * 1.5 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Core inner sphere
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, boundedRadius * 0.55);
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.85)");
      coreGrad.addColorStop(0.5, "rgba(226, 179, 110, 0.55)");
      coreGrad.addColorStop(1, "rgba(18, 19, 22, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, boundedRadius * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // Update rotation
      rotationRef.current.alpha += 0.012 * speed;
      rotationRef.current.beta += 0.007 * speed;
      const { alpha, beta } = rotationRef.current;

      const fov = 180;
      const projectedPoints: { x: number; y: number; z: number; color: string; size: number }[] = [];

      // Project each particle in 3D
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const rOsc = boundedRadius * (1 + 0.06 * Math.sin(elapsed * p.speed * 3 + p.phase));

        // 3D Spherical to Cartesian
        const x0 = rOsc * Math.sin(p.phi) * Math.cos(p.theta);
        const y0 = rOsc * Math.cos(p.phi);
        const z0 = rOsc * Math.sin(p.phi) * Math.sin(p.theta);

        // Rotate Y (alpha)
        const x1 = x0 * Math.cos(alpha) + z0 * Math.sin(alpha);
        const z1 = -x0 * Math.sin(alpha) + z0 * Math.cos(alpha);

        // Rotate X (beta)
        const y2 = y0 * Math.cos(beta) - z1 * Math.sin(beta);
        const z2 = y0 * Math.sin(beta) + z1 * Math.cos(beta);

        // Perspective transform
        const scale = fov / (fov + z2);
        const x2d = cx + x1 * scale;
        const y2d = cy + y2 * scale;

        // Color based on type and z-depth
        const depthAlpha = Math.max(0.18, Math.min(0.95, (z2 + boundedRadius) / (2 * boundedRadius)));
        let color = `rgba(226, 179, 110, ${depthAlpha.toFixed(2)})`; // Gold
        let size = 1.6 * scale;

        if (p.colorType === 1) {
          color = `rgba(245, 158, 11, ${depthAlpha.toFixed(2)})`; // Amber
          size = 1.8 * scale;
        } else if (p.colorType === 2) {
          color = `rgba(255, 255, 255, ${(depthAlpha * 1.1).toFixed(2)})`; // Sparkle White
          size = 1.3 * scale;
        } else if (p.colorType === 3) {
          color = `rgba(16, 185, 129, ${(depthAlpha * 0.8).toFixed(2)})`; // Emerald accent hint
          size = 1.5 * scale;
        }

        projectedPoints.push({ x: x2d, y: y2d, z: z2, color, size });
      }

      // Draw constellation lines between nearby particles
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const pt1 = projectedPoints[i];
          const pt2 = projectedPoints[j];
          const dx = pt1.x - pt2.x;
          const dy = pt1.y - pt2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 720) {
            const lineAlpha = (1 - distSq / 720) * 0.22;
            ctx.strokeStyle = `rgba(226, 179, 110, ${lineAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pt1.x, pt1.y);
            ctx.lineTo(pt2.x, pt2.y);
            ctx.stroke();
          }
        }
      }

      // Draw points sorted by depth (back to front)
      projectedPoints.sort((a, b) => b.z - a.z);
      for (let i = 0; i < projectedPoints.length; i++) {
        const pt = projectedPoints[i];
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [phase, speed]);


  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleExecuteSubmit(inputText);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleExecuteSubmit(inputText);
    }
  };

  const handleReset = () => {
    requestIdRef.current += 1;
    if (statusTimerId.current) {
      clearTimeout(statusTimerId.current);
    }
    setPhase("input");
    setInputText("");
    setSubmittedQuery("");
    setAnswer("");
    setErrorMessage("");
    if (onReset) onReset();

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
  };

  // Helper to parse simple markdown formatting for answer display
  const renderFormattedAnswer = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      // Markdown-like bold formatting
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      // Bullets
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
        return (
          <li key={index} className="ml-4 list-disc text-white/90">
            {renderedLine}
          </li>
        );
      }

      // Numbered items
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={index} className="ml-1 my-1 font-medium text-white/90">
            {renderedLine}
          </div>
        );
      }

      // Empty line spacer
      if (!line.trim()) {
        return <div key={index} className="h-2" />;
      }

      return (
        <p key={index} className="mb-2 last:mb-0">
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <div
      ref={stageRef}
      className={`mo-stage ${className}`}
      role="region"
      aria-live="polite"
      aria-label="Interactive AI thinking orb stage"
    >
      {/* ── UPPER CONTENT AREA ── */}
      <div className="mo-content-area">
        {/* Phase 1: Idle/Input -> Render welcome card & suggestion chips passed via children */}
        {phase === "input" && (
          <div className="flex-1 flex flex-col justify-start">
            {children}
          </div>
        )}

        {/* Phase 2: Thinking -> Canvas Particle Orb */}
        {phase === "thinking" && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[260px] py-2">
            {submittedQuery && (
              <div className="mb-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#E4E4E7] max-w-[90%] truncate text-center shadow-sm">
                &ldquo;{submittedQuery}&rdquo;
              </div>
            )}
            <div className="mo-canvas-wrap">
              <div className="mo-orb-glow" aria-hidden="true" />
              <canvas ref={canvasRef} className="mo-canvas" />
              <div className="mo-status-container">
                <div className="mo-status-pill">
                  <span className="mo-status-dot" aria-hidden="true" />
                  <span className="font-mono">{statusText}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Answered -> Answer Card */}
        {phase === "answered" && (
          <div className="flex-1 flex flex-col justify-start pb-2">
            {submittedQuery && (
              <div className="mb-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#E4E4E7] max-w-[90%] truncate">
                Q: &ldquo;{submittedQuery}&rdquo;
              </div>
            )}
            <div className="mo-answer-card">
              <div className="mo-answer-header">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#E2B36E]" aria-hidden="true" />
                  <span className="mo-answer-category">Portfolio Knowledge</span>
                </div>
                <span className="text-[10px] font-mono text-white/40">Verified Local Engine</span>
              </div>

              <div className="mo-answer-body">
                {renderFormattedAnswer(answer)}
              </div>

              <button
                ref={resetBtnRef}
                type="button"
                onClick={handleReset}
                className="mo-reset-btn"
                aria-label="Back to suggestion chips"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>Back to suggestions</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── FIXED BOTTOM INPUT PILL DOCK ── */}
      <div className="mo-pill-container">
        <form onSubmit={handleFormSubmit} className="w-full">
          <div className={`mo-pill ${phase === "thinking" ? "opacity-60 pointer-events-none" : ""}`}>
            <Sparkles size={16} className="text-[#E2B36E] mr-2 shrink-0" aria-hidden="true" />
            <label htmlFor={inputId} className="sr-only">
              {placeholder}
            </label>
            <input
              id={inputId}
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={phase === "thinking" ? "Thinking about your question..." : placeholder}
              disabled={phase === "thinking"}
              className="mo-input"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || phase === "thinking"}
              className="mo-submit-btn"
              aria-label="Submit question"
            >
              <ArrowUp size={16} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </form>

        {errorMessage && (
          <p className="text-xs text-red-400 text-center mt-1" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default MorphOrb;
