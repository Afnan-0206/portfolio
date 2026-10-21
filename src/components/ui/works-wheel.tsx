/* eslint-disable @next/next/no-img-element */
"use client";

// A portfolio index built as an interactive 3D wheel.
//
// At rest the work sits in a ring around a title, each card tangent to the circle.
// The first notch of scroll blows the ring open into a perspective vertical drum:
// the card at the front lies flat and full size, the ones above and below rotate away
// into hard perspective and run off the top and bottom of the frame.
//
// Continuous rotation is powered by a single rAF pass that writes transforms
// straight to DOM elements, avoiding per-frame React re-renders.

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Local path or remote URL. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
}

export interface WorksWheelProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring at rest. @default "Selected Work" */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default "View case study" */
  action?: string;
}

/* Geometry constants calibrated for 3D perspective and stage proportion */
const CARD_H = 0.38; // front card height, ratio of stage
const CARD_MAX_W = 0.34; // max width ratio of stage
const CARD_RATIO = 1.45; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 2.22; // drum radius in card heights
const LENS = 2.7; // perspective distance
const RING_R = 1.14; // ring radius
const BOW = 1.82; // arc radius pushing neighboring cards to the left
const TITLE = 0.124; // text sizing base
const INDEX = 0.04; // index text sizing base
const CULL = 1.6; // distance threshold past which rotated cards are culled

/** Gesture sensitivities */
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140; // settle delay after wheel gesture ends
const EASE = 0.12; // easing coefficient

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Computes the horizontal lateral bow displacement along the drum arc */
const bowAt = (drumDeg: number, bow: number) => -bow * (1 - Math.cos(rad(drumDeg)));

/** Computes the combined CSS transform for a card in ring (m=0) and drum (m=1) states */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

type Stage = { w: number; h: number };

export function WorksWheel({
  items,
  label = "Selected Work",
  action = "View case study",
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  // Wheel position tracker
  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });
  const [imageErrors, setImageErrors] = React.useState<Record<number, boolean>>({});

  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Drag tracking to distinguish intentional clicks from rotational drags
  const drag = React.useRef<number | null>(null);
  const dragStartY = React.useRef<number>(0);
  const dragStartX = React.useRef<number>(0);
  const isDragging = React.useRef<boolean>(false);
  const settling = React.useRef<number>(0);

  // Respect user motion preferences
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  // Measure stage dimensions with ResizeObserver
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Compute layout metrics derived from stage dimensions
  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min((h || 600) * CARD_H * CARD_RATIO, (w || 1000) * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count > 0
      ? clamp(((2 * Math.PI * ringR) / count) * 0.82 / (cardW || 1), 0.16, 1)
      : 1;

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  // Main animation loop: eases turn -> target, applies direct CSS transforms
  React.useEffect(() => {
    if (!stage.h || count === 0) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) {
        turn.current = target.current;
      } else {
        turn.current += gap * (reduced ? 1 : EASE);
      }

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / (count || 1)),
            drumDeg,
            ringR,
            drumR,
            bow,
            m
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) {
          face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
        }
      }

      if (labelRef.current) {
        labelRef.current.style.opacity = String(1 - m);
      }
      if (titleRef.current) {
        titleRef.current.style.opacity = String(m);
      }

      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  // Navigate target position with bounds clamping
  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last]
  );

  // Wheel listener: cancels default scroll only when inside the navigable wheel range,
  // allowing continuous page scrolling above and below the wheel section.
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      // If user is scrolling vertically
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        const delta = event.deltaY / WHEEL_UNITS;
        const next = target.current + delta;

        // Cancel default only if within internal turn range
        if (next > 0 && next < last + 1) {
          event.preventDefault();
        }

        to(next);

        window.clearTimeout(settling.current);
        settling.current = window.setTimeout(() => {
          to(Math.round(target.current));
        }, SETTLE);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  if (count === 0) return null;

  return (
    <section
      aria-label={label}
      className={cn(
        "relative w-full h-[65vh] sm:h-[72vh] md:h-[78vh] min-h-[460px] sm:min-h-[520px] max-h-[760px] select-none overflow-hidden bg-[#090A0C]",
        className
      )}
      {...props}
    >
      {/* 3D Transform Stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-roledescription="3D interactive project wheel"
        aria-label="Interactive works wheel"
        className="absolute inset-0 cursor-grab touch-pan-y outline-none active:cursor-grabbing focus-visible:ring-1 focus-visible:ring-[#E2B36E]/50"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          isDragging.current = false;
          dragStartY.current = event.clientY;
          dragStartX.current = event.clientX;
          drag.current = event.clientY;
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          const dy = Math.abs(event.clientY - dragStartY.current);
          const dx = Math.abs(event.clientX - dragStartX.current);
          if (dy > 6 || dx > 6) {
            isDragging.current = true;
            try {
              event.currentTarget.setPointerCapture(event.pointerId);
            } catch (_) {
              // Ignore if pointer capture fails on touch devices
            }
          }
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) {
            to(Math.round(target.current));
          }
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "PageDown") {
            to(Math.round(target.current) + 1);
            event.preventDefault();
          } else if (event.key === "ArrowUp" || event.key === "PageUp") {
            to(Math.round(target.current) - 1);
            event.preventDefault();
          } else if (event.key === "Home") {
            to(0);
            event.preventDefault();
          } else if (event.key === "End") {
            to(last + 1);
            event.preventDefault();
          }
        }}
      >
        {/* Rotating 3D Center Container */}
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const hasError = imageErrors[i];
            const CardWrapper = item.href ? Link : "div";
            const linkProps = item.href
              ? {
                  href: item.href,
                  onClick: (e: React.MouseEvent) => {
                    if (isDragging.current) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  },
                }
              : {};

            return (
              <div
                key={item.title}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                className="group absolute [backface-visibility:hidden]"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                <div className="size-full transition-transform duration-150 ease-out origin-center">
                  <CardWrapper
                    {...(linkProps as any)}
                    className="relative block size-full overflow-hidden rounded-xl border border-white/10 bg-[#121316] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:border-[#E2B36E]/40 pointer-events-auto cursor-pointer"
                    aria-label={`View ${item.title} case study`}
                  >
                    {!hasError ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        draggable={false}
                        onError={() => setImageErrors((prev) => ({ ...prev, [i]: true }))}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                      />
                    ) : (
                      <div className="size-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#17181D] to-[#0D0E11]">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#E2B36E]">
                          Systems Project
                        </span>
                        <h4 className="mt-2 text-base font-bold text-[#F4F4F5]">{item.title}</h4>
                      </div>
                    )}

                    {/* Subtle vignette gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                    {/* Hover Action Badge */}
                    {action && item.href ? (
                      <span className="pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1.5 rounded-full border border-[#E2B36E]/30 bg-[#090A0C]/90 px-3 py-1 font-mono text-[11px] text-[#E2B36E] opacity-0 backdrop-blur-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 shadow-md">
                        <span>{action}</span>
                        <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </CardWrapper>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Center Label at Rest (m = 0) */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight"
        style={{ fontSize: Math.max(14, metrics.title * 0.45) }}
      >
        <div className="flex flex-col items-center gap-2 text-center px-4">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#E2B36E]">
            Curated Systems
          </span>
          <span className="text-base sm:text-2xl font-bold text-[#F4F4F5] tracking-wide">
            {label}
          </span>
          <span className="text-[11px] text-[#71717A] flex items-center gap-1.5 font-sans mt-0.5">
            <span>Scroll or drag cards to explore</span>
            <span className="text-[#E2B36E] animate-bounce">↓</span>
          </span>
        </div>
      </div>

      {/* Active Project Title Beside Wheel (m = 1) */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[5%] sm:left-[8%] -translate-y-1/2 tracking-tight opacity-0 max-w-[34%] sm:max-w-[28%] z-10"
      >
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#E2B36E] block">
            Project 0{active + 1}
          </span>
          <h3
            className="font-bold text-[#F4F4F5] leading-tight drop-shadow-lg text-lg sm:text-2xl md:text-3xl"
          >
            {items[active]?.title}
          </h3>
          <p className="hidden sm:block text-xs text-[#A1A1AA] line-clamp-2">
            Explore the architecture, formal checks, and live deployment.
          </p>
        </div>
      </div>

      {/* Project Index Along Right Edge */}
      <ol
        className="absolute top-[8%] right-[4%] text-right leading-[1.8] z-20 space-y-1 pointer-events-auto"
        style={{ fontSize: Math.max(11, metrics.index) }}
        aria-label="Project list"
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "cursor-pointer transition-all duration-200 outline-none text-xs sm:text-sm font-mono flex items-center justify-end gap-2 group py-0.5 ml-auto",
                i === active
                  ? "text-[#E2B36E] font-bold scale-105"
                  : "text-[#71717A] hover:text-[#D4D4D8]"
              )}
              aria-label={`Select ${item.title}`}
              aria-current={i === active ? "true" : undefined}
            >
              <span className="text-[10px] text-[#52525B] group-hover:text-[#A1A1AA]">
                0{i + 1}
              </span>
              <span className="truncate max-w-[120px] sm:max-w-[160px] md:max-w-none">
                {item.title}
              </span>
              {i === active && (
                <span className="inline-block size-1.5 rounded-full bg-[#E2B36E]" />
              )}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default WorksWheel;
