// localStorage helpers (SSR-safe)

export function getLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail if storage is full or unavailable
  }
}

export function removeLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

// AI settings storage keys
export const STORAGE_KEYS = {
  AI_PROVIDER: 'cheki_ai_provider',
  AI_API_KEY: 'cheki_ai_apikey',
  AI_MODEL: 'cheki_ai_model',
  PACKING_LISTS: 'cheki_packing_lists',
  ACTIVE_LIST_ID: 'cheki_active_list_id',
} as const;
