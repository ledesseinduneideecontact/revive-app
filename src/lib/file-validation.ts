import { UploadValidation } from '@/types';

export const validatePhotoFile = (file: File): UploadValidation => {
  // Vérifier le type MIME
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      message: 'Format non supporté. Utilisez JPEG ou PNG uniquement.'
    };
  }

  // Vérifier la taille (10MB max)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      message: 'Fichier trop volumineux. Maximum 10MB autorisé.'
    };
  }

  return {
    isValid: true,
    message: 'Photo valide'
  };
};

export const validateVideoFile = (file: File): UploadValidation => {
  // Vérifier le type MIME
  const allowedTypes = ['video/mp4'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      message: 'Format non supporté. Utilisez MP4 uniquement.'
    };
  }

  // Vérifier la taille (50MB max)
  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      message: 'Fichier trop volumineux. Maximum 50MB autorisé.'
    };
  }

  return {
    isValid: true,
    message: 'Vidéo valide'
  };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 