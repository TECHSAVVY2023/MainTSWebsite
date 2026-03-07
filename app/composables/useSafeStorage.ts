/**
 * Safe localStorage access. Use this when storage may be unavailable
 * (e.g. iframe, private mode, or "Access to storage is not allowed").
 */
export function useSafeStorage() {
  function getItem(key: string): string | null {
    try {
      if (import.meta.client && typeof localStorage !== 'undefined') {
        return localStorage.getItem(key)
      }
    } catch {
      /* SecurityError / access denied in this context */
    }
    return null
  }

  function setItem(key: string, value: string): void {
    try {
      if (import.meta.client && typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value)
      }
    } catch {
      /* SecurityError / access denied */
    }
  }

  return { getItem, setItem }
}
