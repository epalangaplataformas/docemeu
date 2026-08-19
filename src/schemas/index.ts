import { z } from 'zod';

export const productCategorySchema = z.enum([
  'bolos',
  'docaria',
  'biscoitos',
  'bebidas',
  'especialidades',
]);
export type ProductCategory = z.infer<typeof productCategorySchema>;

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number(),
  category: productCategorySchema,
  image: z.string(),
  featured: z.boolean().default(false),
  available: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
});
export type Product = z.infer<typeof productSchema>;

export const orderItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  unitPrice: z.number(),
  quantity: z.number().min(1),
  image: z.string(),
  subtotal: z.number(),
});
export type OrderItem = z.infer<typeof orderItemSchema>;

export const customerSchema = z.object({
  name: z.string().min(2, 'O nome é demasiado curto.'),
  phone: z.string().min(9, 'Número de telefone inválido.'),
  email: z.email('Email inválido.').optional().or(z.literal('')),
  notes: z.string().max(500, 'Máximo 500 caracteres.').optional(),
});
export type CustomerDetails = z.infer<typeof customerSchema>;

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'O carrinho está vazio.'),
  customer: customerSchema,
});
export type Order = z.infer<typeof orderSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório.'),
  email: z.email('Email inválido.'),
  subject: z.string().min(3, 'Assunto obrigatório.'),
  message: z.string().min(10, 'Mensagem demasiado curta.'),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;
