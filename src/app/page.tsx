"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import MoreBuilds from "@/components/MoreBuilds";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Journey from "@/components/Journey";
import Credentials from "@/components/Credentials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050817] font-sans noise">
      
      {/* Cinematic Full-Page Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050817]" aria-hidden="true">
        <Image
          src="/hero-background.jpg"
          alt="Cinematic background portrait"
          fill
          priority
          className="object-cover object-[center_35%] md:object-center opacity-40 md:opacity-45 brightness-[0.70] contrast-[1.05] saturate-[0.80]"
          sizes="100vw"
        />
        {/* Layered lighting overlays & spot glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050817]/20 via-[#050817]/50 to-[#050817]/80" />
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#22D3EE]/6 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/6 blur-[120px]" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main content layer */}
      <main id="main-content" className="relative z-10">
        
        {/* Hero Section - portrait clearly visible */}
        <div className="relative bg-transparent">
          <Hero />
        </div>

        {/* Transitional statement */}
        <div className="relative bg-[#050817]/45 px-4 py-16 sm:px-6 lg:px-8 backdrop-blur-xs">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xl font-medium leading-9 text-[#C7D2E2] sm:text-2xl">
              I care about more than making interfaces look good. I build the{" "}
              <span className="text-[#F8FAFC]">workflow behind them</span>—data,
              automation, AI reasoning, validation and the final user experience.
            </p>
          </div>
        </div>

        {/* Featured Work - darker overlay for high readability */}
        <div className="relative bg-[#050817]/65 backdrop-blur-xs">
          <FeaturedWork />
        </div>

        {/* More Builds */}
        <div className="relative bg-[#050817]/70 backdrop-blur-xs">
          <MoreBuilds />
        </div>

        {/* About Section - reveals a little more of the portrait */}
        <div className="relative bg-[#050817]/50 backdrop-blur-xs">
          <About />
        </div>

        {/* Capabilities - dark navy glass layer */}
        <div className="relative bg-[#050817]/75 backdrop-blur-xs">
          <Capabilities />
        </div>

        {/* Journey - subtle purple/navy lighting */}
        <div className="relative bg-[#050817]/60 backdrop-blur-xs">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050817]/0 via-[#211A33]/15 to-[#050817]/0" aria-hidden="true" />
          <Journey />
        </div>

        {/* Credentials - near-solid container with portrait visible at the edges */}
        <div className="relative bg-[#050817]/70 backdrop-blur-xs">
          <Credentials />
        </div>

        {/* Contact Section - dramatic cinematic background reveal */}
        <div className="relative bg-[#050817]/45 backdrop-blur-xs">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10 bg-[#050817]/90 backdrop-blur-md">
        <Footer />
      </div>
    </div>
  );
}
