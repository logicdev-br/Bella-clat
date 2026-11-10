/**
 * ============================================================================
 * CONFIGURAÇÃO DA API GOOGLE GEMINI — BELLE ÉCLAT
 * ============================================================================
 * A chave fica salva com segurança no arquivo .env (VITE_GEMINI_API_KEY)
 * para não ser bloqueada pelo detector de segredos do GitHub!
 */

export const API_KEYS = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
};

export const DEFAULT_CITY = 'Sao Paulo,BR';
