'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, X, Upload } from 'lucide-react';
import { validatePhotoFile, formatFileSize } from '@/lib/file-validation';

interface PhotoUploadProps {
  photo: File | null;
  photoPreview?: string;
  onPhotoChange: (photo: File | null, photoPreview?: string) => void;
}

export default function PhotoUpload({ photo, photoPreview, onPhotoChange }: PhotoUploadProps) {
  const [error, setError] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const validation = validatePhotoFile(file);
    
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setError('');
    const preview = URL.createObjectURL(file);
    onPhotoChange(file, preview);
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
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    onPhotoChange(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <Camera className="w-4 h-4" />
        Photo (JPEG/PNG - 10MB max)
      </label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {!photo ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          } ${error ? 'border-red-500 bg-red-50' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            Cliquez ou glissez votre photo ici
          </p>
          <p className="text-xs text-gray-500">
            Formats acceptés : JPEG, PNG
          </p>
          {error && (
            <p className="text-xs text-red-500 mt-2">{error}</p>
          )}
        </div>
      ) : (
        <div className="relative">
          <img
            src={photoPreview}
            alt="Photo preview"
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
            {photo.name} ({formatFileSize(photo.size)})
          </div>
        </div>
      )}
    </div>
  );
} 