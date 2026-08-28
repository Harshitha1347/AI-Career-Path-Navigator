import React from 'react';
import LandingNav from './components/LandingNav';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import LandingFooter from './components/LandingFooter';
import ParticleBackground from './components/ParticleBackground';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <LandingNav />
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <LandingFooter />
      </div>
    </div>
  );
}
