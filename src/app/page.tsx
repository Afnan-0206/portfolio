"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import MoreBuilds from "@/components/MoreBuilds";
import NetworkingSection from "@/components/NetworkingSection";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Journey from "@/components/Journey";
import Credentials from "@/components/Credentials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#090A0C] font-sans noise text-[#F4F4F5]">
      
      {/* Scroll progress bar + back to top */}
      <ScrollProgress />

      {/* Atmospheric Background — In Hero only, blending into obsidian */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-[100vh] z-0 overflow-hidden bg-[#08090B]" aria-hidden="true">
        <Image
          src="/hero-background.jpg"
          alt="Atmospheric background texture"
          fill
          priority
          className="object-cover object-[center_35%] md:object-center opacity-25 grayscale-[30%] brightness-[0.7] contrast-[1.05]"
          sizes="100vw"
        />
        {/* Deep obsidian gradient overlays: fades completely into #08090B at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/30 via-[#08090B]/60 to-[#08090B]" />
        {/* Subtle warm accent light */}
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#E2B36E]/4 blur-[160px]" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main content layer */}
      <main id="main-content" className="relative z-10">
        
        {/* Hero Section */}
        <Hero />

        {/* Transitional statement */}
        <div className="relative px-6 py-16 sm:px-8 lg:px-12 border-y border-white/5 bg-[#090A0C]/60 backdrop-blur-xs">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xl font-medium leading-relaxed text-[#A1A1AA] sm:text-2xl">
              I care about more than making interfaces look pretty. I build the{" "}
              <span className="text-[#F4F4F5]">workflow behind them</span>—data pipelines,
              deterministic validation, multi-agent reasoning, and resilient user software.
            </p>
          </div>
        </div>

        {/* Featured Work */}
        <FeaturedWork />

        {/* More Builds */}
        <MoreBuilds />

        {/* Networking & Founders Section */}
        <NetworkingSection />

        {/* About Section */}
        <About />

        {/* Capabilities */}
        <Capabilities />

        {/* Journey */}
        <Journey />

        {/* Credentials */}
        <Credentials />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
