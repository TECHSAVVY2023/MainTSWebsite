/**
 * Unwrap ref/computed value from composable return objects.
 * Vue does not auto-unwrap refs nested in plain objects.
 */
export function useUnwrapRef () {
  function unwrapRef (val: unknown): unknown {
    if (val != null && typeof val === 'object' && 'value' in val) {
      return (val as { value: unknown }).value
    }
    return val
  }
  return { unwrapRef }
}
