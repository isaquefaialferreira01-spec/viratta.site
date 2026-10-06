import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FirstImpact } from './components/FirstImpact';
import { StructuralNumbers } from './components/StructuralNumbers';
import { InteractiveServices } from './components/InteractiveServices';
import { BrandStatement } from './components/BrandStatement';
import { BeforeAfterPerception } from './components/BeforeAfterPerception';
import { TargetAudience } from './components/TargetAudience';
import { MethodSequence } from './components/MethodSequence';
import { CustomerJourney } from './components/CustomerJourney';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VirattaDifference } from './components/VirattaDifference';
import { BrandPhilosophyLight } from './components/BrandPhilosophyLight';
import { AboutViratta } from './components/AboutViratta';
import { InfiniteMarquee } from './components/InfiniteMarquee';
import { InstagramFeed } from './components/InstagramFeed';
import { FinalConversion } from './components/FinalConversion';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#070708] text-[#F3F4F6] selection:bg-[#FF5E14] selection:text-white relative">
      {/* 08 — OPENING / PRELOADER */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 09 — NAVIGATION */}
      <Navbar />

      <main className="relative">
        {/* 10 & 11 — HERO & HERO MICROCOPY */}
        <Hero />

        {/* 12 — FIRST IMPACT SECTION */}
        <FirstImpact />

        {/* 13 — NUMBERS / STRUCTURAL DATA */}
        <StructuralNumbers />

        {/* MARQUEE 01 — SERVICES (TRANSITION ELEMENT) */}
        <InfiniteMarquee variant="orange" />

        {/* 14 — SERVICES (INTERACTIVE) */}
        <InteractiveServices />

        {/* 15 — BIG BRAND STATEMENT */}
        <BrandStatement />

        {/* 16 — BEFORE / AFTER PERCEPTION SLIDER */}
        <BeforeAfterPerception />

        {/* 17 — TARGET AUDIENCE / MOVING TICKER */}
        <TargetAudience />

        {/* 18 — METHOD (O PROCESSO VIRATTA) */}
        <MethodSequence />

        {/* 19 — CUSTOMER JOURNEY */}
        <CustomerJourney />

        {/* 20 — PORTFOLIO (CASOS DE IMPACTO) */}
        <PortfolioShowcase />

        {/* DEPOIMENTOS EM MOVIMENTO */}
        <TestimonialsSection />

        {/* 21 — VIRATTA DIFFERENCE */}
        <VirattaDifference />

        {/* 22 — BRAND PHILOSOPHY (CLEAN LIGHT SECTION) */}
        <BrandPhilosophyLight />

        {/* 23 — ABOUT VIRATTA */}
        <AboutViratta />

        {/* MARQUEE 02 — BRAND MANTRA (REVERSE TRANSITION) */}
        <InfiniteMarquee variant="dark" reverse />

        {/* 26 — INSTAGRAM FEED */}
        <InstagramFeed />

        {/* 24 & 25 — FINAL CONVERSION SECTION */}
        <FinalConversion />
      </main>

      {/* 27 — FOOTER */}
      <Footer />

      {/* 25 — FLOATING WHATSAPP BUTTON (VIRATTA DESIGN) */}
      <FloatingWhatsApp />
    </div>
  );
}
