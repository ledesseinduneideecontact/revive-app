'use client';

import Hero from './Hero';
import Features from './Features';
import CTA from './CTA';

interface LandingProps {
  onStartOrder: () => void;
}

export default function Landing({ onStartOrder }: LandingProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <Hero onStartOrder={onStartOrder} />
      <Features />
      <CTA onStartOrder={onStartOrder} />
    </div>
  );
} 