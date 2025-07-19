'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Upload } from 'lucide-react';
import { PhotoBlock } from '@/types';

interface DashboardProps {
  onBackToLanding: () => void;
}

export default function Dashboard({ onBackToLanding }: DashboardProps) {
  const [blocks, setBlocks] = useState<PhotoBlock[]>([
    { id: '1', photo: null, video: null }
  ]);

  const addBlock = () => {
    if (blocks.length < 5) {
      const newBlock: PhotoBlock = {
        id: Date.now().toString(),
        photo: null,
        video: null
      };
      setBlocks([...blocks, newBlock]);
    }
  };

  const removeBlock = (id: string) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter(block => block.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={onBackToLanding}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Créer ma commande</h1>
        <div className="w-20"></div> {/* Spacer */}
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <span className="ml-2 text-sm font-medium">Upload fichiers</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <span className="ml-2 text-sm text-gray-500">Informations</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <span className="ml-2 text-sm text-gray-500">Paiement</span>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Blocs Photo-Vidéo</h2>
          <Button 
            onClick={addBlock}
            disabled={blocks.length >= 5}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter un bloc
          </Button>
        </div>

        <p className="text-sm text-gray-600">
          Maximum 5 blocs. Chaque bloc doit contenir 1 photo ET 1 vidéo.
        </p>

        {/* Blocks */}
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <Card key={block.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Bloc {index + 1}</span>
                  {blocks.length > 1 && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeBlock(block.id)}
                    >
                      Supprimer
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Photo (JPEG/PNG - 10MB max)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Cliquez pour uploader une photo</p>
                    </div>
                  </div>

                  {/* Video Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vidéo (MP4 - 50MB max)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Cliquez pour uploader une vidéo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Step Button */}
        <div className="flex justify-end pt-6">
          <Button size="lg" className="px-8">
            Continuer vers les informations
          </Button>
        </div>
      </div>
    </div>
  );
} 