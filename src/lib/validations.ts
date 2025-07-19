import { z } from 'zod';

export const customerInfoSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  address: z.string().min(5, 'Adresse invalide'),
  city: z.string().min(2, 'Ville invalide'),
  postalCode: z.string().min(4, 'Code postal invalide'),
  country: z.string().min(2, 'Pays invalide'),
});

export const photoBlockSchema = z.object({
  id: z.string(),
  photo: z.instanceof(File).nullable(),
  video: z.instanceof(File).nullable(),
});

export const orderSchema = z.object({
  customerInfo: customerInfoSchema,
  blocks: z.array(photoBlockSchema).min(1, 'Au moins un bloc est requis').max(5, 'Maximum 5 blocs autorisés'),
});

export type CustomerInfoFormData = z.infer<typeof customerInfoSchema>;
export type PhotoBlockFormData = z.infer<typeof photoBlockSchema>;
export type OrderFormData = z.infer<typeof orderSchema>; 