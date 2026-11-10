/**
 * ============================================================================
 * CONFIGURAÇÃO DE APIs E SUPABASE — BELLE ÉCLAT
 * ============================================================================
 * Todas as chaves são lidas com segurança do arquivo .env (local)
 * ou das Environment Variables (na Vercel).
 */

export const API_KEYS = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

export const DEFAULT_CITY = 'Sao Paulo,BR';
