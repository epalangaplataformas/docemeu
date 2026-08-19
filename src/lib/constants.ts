import { env } from "@/schemas/env";

// ---------------------------------------------------------------------------
// Moeda
// ---------------------------------------------------------------------------
export const CURRENCY = 'AOA' as const;
export const CURRENCY_SYMBOL = 'Kz' as const;
export const LOCALE = 'pt-AO' as const;

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_MIME_TYPES = ['application/pdf'] as const;

// ---------------------------------------------------------------------------
// Status de transação
// ---------------------------------------------------------------------------
export const TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REVIEW: 'REVIEW',
  REJECTED: 'REJECTED',
} as const;

export const TRANSACTION_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  REVIEW: 'Em Revisão',
  REJECTED: 'Rejeitado',
};

// ---------------------------------------------------------------------------
// Cores da marca (para uso em gráficos ou componentes customizados)
// ---------------------------------------------------------------------------
export const BRAND = {
  EMERALD: '#0a4d3b',
  EMERALD_LIGHT: '#0d6b52',
  BLACK: '#000000',
  WHITE: '#ffffff',
  GRAY_50: '#f9fafb',
  GRAY_100: '#f3f4f6',
  GRAY_200: '#e5e7eb',
  GRAY_500: '#6b7280',
  GRAY_900: '#111827',
} as const;

// ---------------------------------------------------------------------------
// Endpoints da API (base já definido no axios)
// ---------------------------------------------------------------------------
export const API_PREFIX = '/v1' as const;

// ---------------------------------------------------------------------------
// Google OAuth
// ---------------------------------------------------------------------------
export const GOOGLE_CLIENT_ID = env.VITE_GOOGLE_CLIENT_ID;
