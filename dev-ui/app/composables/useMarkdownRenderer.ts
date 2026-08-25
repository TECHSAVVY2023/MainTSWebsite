import { marked } from 'marked'

/**
 * Custom Markdown Renderer with Cisco NetAcad & GitHub style callout boxes,
 * code blocks with copy helpers, and clean typography.
 */
export function useMarkdownRenderer () {
  function renderMarkdown (mdContent: string = ''): string {
    if (!mdContent) return ''

    // Transform GitHub/NetAcad alerts:
    // > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION]
    let processed = mdContent
      .replace(/>\s*\[!NOTE\]\s*\n((?:>.*\n?)*)/gi, (_, text) => {
        const body = text.replace(/^>\s?/gm, '')
        return `<div class="academy-callout academy-callout-note"><div class="callout-title"><i class="fas fa-info-circle"></i> NOTE</div><div class="callout-body">${body}</div></div>\n`
      })
      .replace(/>\s*\[!TIP\]\s*\n((?:>.*\n?)*)/gi, (_, text) => {
        const body = text.replace(/^>\s?/gm, '')
        return `<div class="academy-callout academy-callout-tip"><div class="callout-title"><i class="fas fa-lightbulb"></i> PRO TIP</div><div class="callout-body">${body}</div></div>\n`
      })
      .replace(/>\s*\[!IMPORTANT\]\s*\n((?:>.*\n?)*)/gi, (_, text) => {
        const body = text.replace(/^>\s?/gm, '')
        return `<div class="academy-callout academy-callout-important"><div class="callout-title"><i class="fas fa-exclamation-circle"></i> IMPORTANT</div><div class="callout-body">${body}</div></div>\n`
      })
      .replace(/>\s*\[!WARNING\]\s*\n((?:>.*\n?)*)/gi, (_, text) => {
        const body = text.replace(/^>\s?/gm, '')
        return `<div class="academy-callout academy-callout-warning"><div class="callout-title"><i class="fas fa-exclamation-triangle"></i> WARNING</div><div class="callout-body">${body}</div></div>\n`
      })

    // Parse Markdown to HTML
    try {
      const html = marked.parse(processed, {
        gfm: true,
        breaks: true,
      }) as string
      return html
    } catch (e) {
      console.error('Markdown rendering error:', e)
      return mdContent
    }
  }

  return {
    renderMarkdown
  }
}
