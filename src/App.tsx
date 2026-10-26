import React, { useState } from 'react';
import { Route, Switch } from 'wouter';
import { CmsProvider, useCms } from './context/CmsContext';
import { ThemeProvider } from './context/ThemeContext';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FirstImpact } from './components/FirstImpact';
import { StructuralNumbers } from './components/StructuralNumbers';
import { InteractiveServices } from './components/InteractiveServices';
import { BrandStatement } from './components/BrandStatement';
import { TargetAudience } from './components/TargetAudience';
import { MethodSequence } from './components/MethodSequence';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VirattaDifference } from './components/VirattaDifference';
import { BrandPhilosophyLight } from './components/BrandPhilosophyLight';
import { AboutViratta } from './components/AboutViratta';
import { InfiniteMarquee } from './components/InfiniteMarquee';
import { InstagramFeed } from './components/InstagramFeed';
import { FAQSection } from './components/FAQSection';
import { BusinessDiagnosticSection } from './components/BusinessDiagnosticSection';
import { FinalConversion } from './components/FinalConversion';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';

import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminAuthCallback } from './components/admin/AdminAuthCallback';
import { AdminResetPassword } from './components/admin/AdminResetPassword';
import { AdminPreviewBar } from './components/admin/AdminPreviewBar';

function PublicWebsite() {
  const [loading, setLoading] = useState(true);
  const { content } = useCms();
  const sections = content?.sections || ({} as any);

  return (
    <div className="min-h-screen bg-[#070708] text-[#F3F4F6] selection:bg-[#FF5E14] selection:text-white relative">
      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-[#FF5E14] focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white transition-all text-xs uppercase tracking-wider"
      >
        Pular para o conteúdo
      </a>

      {/* Admin Preview Mode Floating Bar */}
      <AdminPreviewBar />

      {/* 08 — OPENING / PRELOADER */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 09 — NAVIGATION */}
      <Navbar />

      <main id="main-content" tabIndex={-1} className="relative outline-none">
        {/* 10 & 11 — HERO & HERO MICROCOPY */}
        {sections.hero !== false && <Hero />}

        {/* 12 — FIRST IMPACT SECTION */}
        {sections.first_impact !== false && <FirstImpact />}

        {/* 13 — NUMBERS / STRUCTURAL DATA */}
        {sections.numbers !== false && <StructuralNumbers />}

        {/* MARQUEE 01 — SERVICES (TRANSITION ELEMENT) */}
        {sections.marquee_services !== false && <InfiniteMarquee variant="orange" />}

        {/* 14 — SERVICES (INTERACTIVE) */}
        {sections.services !== false && <InteractiveServices />}

        {/* 15 — BIG BRAND STATEMENT */}
        {sections.brand_statement !== false && <BrandStatement />}

        {/* 17 — TARGET AUDIENCE / MOVING TICKER */}
        {sections.target_audience !== false && <TargetAudience />}

        {/* 18 — METHOD (O PROCESSO VIRATTA) */}
        {sections.method !== false && <MethodSequence />}

        {/* 20 — PORTFOLIO (CASOS DE IMPACTO) */}
        {sections.portfolio !== false && <PortfolioShowcase />}

        {/* DEPOIMENTOS EM MOVIMENTO */}
        {sections.testimonials !== false && <TestimonialsSection />}

        {/* 21 — VIRATTA DIFFERENCE */}
        {sections.difference !== false && <VirattaDifference />}

        {/* 22 — BRAND PHILOSOPHY (CLEAN LIGHT SECTION) */}
        {sections.philosophy !== false && <BrandPhilosophyLight />}

        {/* 23 — ABOUT VIRATTA */}
        {sections.about !== false && <AboutViratta />}

        {/* MARQUEE 02 — BRAND MANTRA (REVERSE TRANSITION) */}
        {sections.marquee_mantra !== false && <InfiniteMarquee variant="dark" reverse />}

        {/* 26 — INSTAGRAM FEED */}
        {sections.instagram !== false && <InstagramFeed />}

        {/* 26.5 — FAQ (PERGUNTAS FREQUENTES & SEO) */}
        {sections.faq !== false && <FAQSection />}

        {/* NOVA SEÇÃO — DIAGNÓSTICO DO NEGÓCIO */}
        {sections.diagnostic !== false && <BusinessDiagnosticSection />}

        {/* 24 & 25 — FINAL CONVERSION SECTION */}
        {sections.final_conversion !== false && <FinalConversion />}
      </main>

      {/* 27 — FOOTER */}
      <Footer />

      {/* BOTÃO PARA O TOPO */}
      <ScrollToTop />

      {/* 25 — FLOATING WHATSAPP BUTTON (VIRATTA DESIGN) */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CmsProvider>
        <Switch>
          <Route path="/admin/auth/callback" component={AdminAuthCallback} />
          <Route path="/admin/reset-password" component={AdminResetPassword} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/:sub*" component={AdminDashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/" component={PublicWebsite} />
          <Route component={PublicWebsite} />
        </Switch>
      </CmsProvider>
    </ThemeProvider>
  );
}
