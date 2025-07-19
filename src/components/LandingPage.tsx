'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Video, Smartphone, Zap } from 'lucide-react';

interface LandingPageProps {
  onStartOrder: () => void;
}

export default function LandingPage({ onStartOrder }: LandingPageProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
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
          Commencer ma commande
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Photos Haute Qualité</CardTitle>
            <CardDescription>
              Uploadez vos plus belles photos en JPEG ou PNG
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Formats acceptés : JPEG, PNG<br />
              Taille maximale : 10MB
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Vidéos Interactives</CardTitle>
            <CardDescription>
              Ajoutez des vidéos MP4 pour enrichir l'expérience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Format accepté : MP4<br />
              Taille maximale : 50MB
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle>Technologie NFC</CardTitle>
            <CardDescription>
              Accédez au contenu en approchant votre smartphone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Compatible avec tous les smartphones modernes<br />
              Activation instantanée
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How it works */}
      <div className="text-center mb-16">
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