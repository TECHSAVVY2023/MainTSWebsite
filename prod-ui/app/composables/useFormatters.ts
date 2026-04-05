/**
 * Shared date and text formatters for news, search, and other pages.
 */
export function useFormatters () {
  function formatDate (str: string | undefined) {
    if (!str) return ''
    const d = new Date(str)
    return isNaN(d.getTime())
      ? str
      : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  function formatDateUppercase (str: string | undefined) {
    if (!str) return ''
    const d = new Date(str)
    if (isNaN(d.getTime())) return str
    return d
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase()
      .replace(/\s+/g, ' ')
  }

  return { formatDate, formatDateUppercase }
}
