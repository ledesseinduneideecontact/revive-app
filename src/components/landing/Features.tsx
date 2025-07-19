'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Video, Smartphone } from 'lucide-react';

export default function Features() {
  return (
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
  );
} 