import { marked } from 'marked'

let mermaidInstance: any = null

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
 * Mermaid.js graph diagram support, and clean typography.
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

  async function renderMermaidInElement (containerEl?: HTMLElement | null) {
    if (!import.meta.client) return
    const el = containerEl || document
    const mermaidNodes = el.querySelectorAll('pre code.language-mermaid, div.mermaid, pre.mermaid')
    if (!mermaidNodes.length) return

    const mer = await getMermaidInstance()
    if (!mer) return

    for (let i = 0; i < mermaidNodes.length; i++) {
      const codeNode = mermaidNodes[i] as HTMLElement
      const rawCode = codeNode.getAttribute('data-mermaid-source') || codeNode.textContent || ''
      if (!rawCode.trim()) continue

      try {
        const parent = codeNode.closest('pre') || codeNode
        const uniqueId = `mermaid-svg-${Date.now()}-${i}-${Math.floor(Math.random() * 10000)}`
        const { svg } = await mer.render(uniqueId, rawCode.trim())

        const container = document.createElement('div')
        container.className = 'academy-mermaid-container'
        container.innerHTML = svg
        parent.replaceWith(container)
      } catch (err) {
        console.warn('Mermaid rendering error for node:', err)
      }
    }
  }

  return {
    renderMarkdown,
    renderMermaidInElement
  }
}
