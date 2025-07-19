'use client';

import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface HeroProps {
  onStartOrder: () => void;
}

export default function Hero({ onStartOrder }: HeroProps) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Photo Magique
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Transformez vos photos physiques en expériences interactives grâce à la technologie NFC. 
        Donnez vie à vos souvenirs avec des vidéos et des contenus multimédias.
      </p>
      <Button 
        size="lg" 
        className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        onClick={onStartOrder}
      >
        <Zap className="w-5 h-5 mr-2" />
        Créer ma photo magique
      </Button>
    </div>
  );
} 