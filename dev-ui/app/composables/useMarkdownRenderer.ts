import { marked } from 'marked'

let mermaidInstance: any = null
const mermaidSvgCache = new Map<string, string>()

async function getMermaidInstance () {
  if (!import.meta.client) return null
  if (!mermaidInstance) {
    try {
      const m = await import('mermaid')
      mermaidInstance = m.default || m
      mermaidInstance.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          darkMode: true,
          background: '#090d16',
          primaryColor: '#7c3aed',
          primaryTextColor: '#f8fafc',
          primaryBorderColor: '#8b5cf6',
          lineColor: '#a78bfa',
          secondaryColor: '#0f172a',
          tertiaryColor: '#1e1b4b',
          textColor: '#e2e8f0',
          mainBkg: '#0f172a',
          nodeBorder: '#8b5cf6',
          clusterBkg: '#030712',
          clusterBorder: '#334155',
          titleColor: '#ffffff',
          edgeLabelBackground: '#020617'
        },
        securityLevel: 'loose',
        fontFamily: 'JetBrains Mono, monospace, sans-serif'
      })
    } catch (e) {
      console.warn('Failed to load mermaid.js:', e)
      return null
    }
  }
  return mermaidInstance
}

/**
 * Custom Markdown Renderer with Cisco NetAcad & GitHub style callout boxes,
 * cached flicker-free Mermaid.js graph diagram support, and clean typography.
 */
export function useMarkdownRenderer () {
  function renderMarkdown (mdContent: string = ''): string {
    if (!mdContent) return ''

    // Transform GitHub/NetAcad alerts:
    // > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION]
    let processed = mdContent
      .replace(/>\s*\[!NOTE\]\s*\n((?:>.*\n?)*)/gi, (_, text) => {
        const body = text.replace(/^>\s?/gm, '').trim()
        const parsedBody = marked.parseInline(body)
        return `<div class="academy-callout academy-callout-note"><div class="callout-title"><i class="fas fa-info-circle"></i> NOTE</div><div class="callout-body">${parsedBody}</div></div>\n`
      })
      .replace(/>\s*\[!TIP\]\s*\n((?:>.*\n?)*)/gi, (_, text) => {
        const body = text.replace(/^>\s?/gm, '').trim()
        const parsedBody = marked.parseInline(body)
        return `<div class="academy-callout academy-callout-tip"><div class="callout-title"><i class="fas fa-lightbulb"></i> PRO TIP</div><div class="callout-body">${parsedBody}</div></div>\n`
      })
      .replace(/>\s*\[!IMPORTANT\]\s*\n((?:>.*\n?)*)/gi, (_, text) => {
        const body = text.replace(/^>\s?/gm, '').trim()
        const parsedBody = marked.parseInline(body)
        return `<div class="academy-callout academy-callout-important"><div class="callout-title"><i class="fas fa-exclamation-circle"></i> IMPORTANT</div><div class="callout-body">${parsedBody}</div></div>\n`
      })
      .replace(/>\s*\[!WARNING\]\s*\n((?:>.*\n?)*)/gi, (_, text) => {
        const body = text.replace(/^>\s?/gm, '').trim()
        const parsedBody = marked.parseInline(body)
        return `<div class="academy-callout academy-callout-warning"><div class="callout-title"><i class="fas fa-exclamation-triangle"></i> WARNING</div><div class="callout-body">${parsedBody}</div></div>\n`
      })

    // Check for cached Mermaid diagrams before parsing
    const mermaidPlaceholders = new Map<string, string>()
    let placeholderCounter = 0

    processed = processed.replace(/```mermaid\s*\n([\s\S]*?)\n```/gi, (_, code) => {
      const trimmedCode = code.trim()
      const token = `%%MERMAID_PLACEHOLDER_${placeholderCounter++}%%`
      if (mermaidSvgCache.has(trimmedCode)) {
        mermaidPlaceholders.set(token, `<div class="academy-mermaid-container" data-rendered="true">${mermaidSvgCache.get(trimmedCode)}</div>`)
      } else {
        mermaidPlaceholders.set(token, `<div class="academy-mermaid-container academy-mermaid-loading" data-mermaid-source="${encodeURIComponent(trimmedCode)}"><pre class="language-mermaid"><code>${trimmedCode}</code></pre></div>`)
      }
      return token
    })

    // Parse Markdown to HTML
    try {
      let html = marked.parse(processed, {
        gfm: true,
        breaks: true,
      }) as string

      // Restore Mermaid blocks with cached SVGs or placeholder
      mermaidPlaceholders.forEach((blockHtml, token) => {
        html = html.replace(`<p>${token}</p>`, blockHtml).replace(token, blockHtml)
      })

      return html
    } catch (e) {
      console.error('Markdown rendering error:', e)
      return mdContent
    }
  }

  async function renderMermaidInElement (containerEl?: HTMLElement | null) {
    if (!import.meta.client) return
    const el = containerEl || document
    const mermaidNodes = el.querySelectorAll('.academy-mermaid-loading, pre code.language-mermaid')
    if (!mermaidNodes.length) return

    const mer = await getMermaidInstance()
    if (!mer) return

    for (let i = 0; i < mermaidNodes.length; i++) {
      const node = mermaidNodes[i] as HTMLElement
      let rawCode = ''
      let container: HTMLElement | null = null

      if (node.classList.contains('academy-mermaid-loading')) {
        container = node
        rawCode = decodeURIComponent(node.getAttribute('data-mermaid-source') || '')
      } else {
        container = node.closest('.academy-mermaid-container') || node.closest('pre')
        rawCode = node.textContent || ''
      }

      if (!rawCode.trim() || !container) continue

      if (mermaidSvgCache.has(rawCode.trim())) {
        container.innerHTML = mermaidSvgCache.get(rawCode.trim()) || ''
        container.classList.remove('academy-mermaid-loading')
        continue
      }

      try {
        const uniqueId = `mermaid-svg-${Date.now()}-${i}-${Math.floor(Math.random() * 10000)}`
        const { svg } = await mer.render(uniqueId, rawCode.trim())
        mermaidSvgCache.set(rawCode.trim(), svg)
        container.innerHTML = svg
        container.classList.remove('academy-mermaid-loading')
      } catch (err) {
        // Keep raw text visible if syntax is currently incomplete while typing
      }
    }
  }

  return {
    renderMarkdown,
    renderMermaidInElement
  }
}
