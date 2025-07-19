'use client';

import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface CTAProps {
  onStartOrder: () => void;
}

export default function CTA({ onStartOrder }: CTAProps) {
  return (
    <div className="space-y-16">
      {/* How it works */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              1
            </div>
            <h3 className="font-semibold mb-2">Uploadez</h3>
            <p className="text-sm text-gray-600">Vos photos et vidéos</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              2
            </div>
            <h3 className="font-semibold mb-2">Personnalisez</h3>
            <p className="text-sm text-gray-600">Vos informations</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              3
            </div>
            <h3 className="font-semibold mb-2">Payez</h3>
            <p className="text-sm text-gray-600">Sécurisé et rapide</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              4
            </div>
            <h3 className="font-semibold mb-2">Recevez</h3>
            <p className="text-sm text-gray-600">Vos photos magiques</p>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Prêt à donner vie à vos souvenirs ?</h2>
        <p className="text-xl mb-8 opacity-90">
          Créez jusqu'à 5 blocs photo-vidéo interactifs
        </p>
        <Button 
          size="lg" 
          variant="secondary"
          className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-gray-100"
          onClick={onStartOrder}
        >
          <Zap className="w-5 h-5 mr-2" />
          Commencer maintenant
        </Button>
      </div>
    </div>
  );
} 