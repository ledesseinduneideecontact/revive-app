'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Video, X, Upload } from 'lucide-react';
import { validateVideoFile, formatFileSize } from '@/lib/file-validation';

interface VideoUploadProps {
  video: File | null;
  videoPreview?: string;
  onVideoChange: (video: File | null, videoPreview?: string) => void;
}

export default function VideoUpload({ video, videoPreview, onVideoChange }: VideoUploadProps) {
  const [error, setError] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const validation = validateVideoFile(file);
    
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setError('');
    const preview = URL.createObjectURL(file);
    onVideoChange(file, preview);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleRemove = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    onVideoChange(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <Video className="w-4 h-4" />
        Vidéo (MP4 - 50MB max)
      </label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {!video ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
            isDragOver 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-gray-400'
          } ${error ? 'border-red-500 bg-red-50' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            Cliquez ou glissez votre vidéo ici
          </p>
          <p className="text-xs text-gray-500">
            Format accepté : MP4 uniquement
          </p>
          {error && (
            <p className="text-xs text-red-500 mt-2">{error}</p>
          )}
        </div>
      ) : (
        <div className="relative">
          <video
            src={videoPreview}
            controls
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              size="sm"
              variant="destructive"
              onClick={handleRemove}
              className="w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {video.name} ({formatFileSize(video.size)})
          </div>
        </div>
      )}
    </div>
  );
} 