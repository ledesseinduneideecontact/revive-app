'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhotoBlock } from '@/types';
import PhotoUpload from './PhotoUpload';
import VideoUpload from './VideoUpload';

interface UploadBlockProps {
  block: PhotoBlock;
  index: number;
  onUpdate: (updates: Partial<PhotoBlock>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export default function UploadBlock({ 
  block, 
  index, 
  onUpdate, 
  onRemove, 
  canRemove 
}: UploadBlockProps) {
  const handlePhotoUpdate = (photo: File | null, photoPreview?: string) => {
    onUpdate({ photo, photoPreview });
  };

  const handleVideoUpdate = (video: File | null, videoPreview?: string) => {
    onUpdate({ video, videoPreview });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Bloc {index + 1}</span>
          {canRemove && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onRemove}
            >
              Supprimer
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <PhotoUpload
            photo={block.photo}
            photoPreview={block.photoPreview}
            onPhotoChange={handlePhotoUpdate}
          />
          <VideoUpload
            video={block.video}
            videoPreview={block.videoPreview}
            onVideoChange={handleVideoUpdate}
          />
        </div>
      </CardContent>
    </Card>
  );
} 