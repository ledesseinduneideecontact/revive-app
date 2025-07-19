export interface PhotoBlock {
  id: string;
  photo: File | null;
  video: File | null;
  photoPreview?: string;
  videoPreview?: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  customerInfo: CustomerInfo;
  blocks: PhotoBlock[];
  totalPrice: number;
  status: 'pending' | 'paid' | 'processing' | 'completed';
  createdAt: Date;
}

export interface UploadValidation {
  isValid: boolean;
  message: string;
}

export type AppView = 'landing' | 'dashboard'; 