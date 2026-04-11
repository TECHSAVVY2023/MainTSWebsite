// Server middleware: headers for social media crawlers (from prod-ui app/server/middleware/social-meta.ts)
export default defineEventHandler((event) => {
  const userAgent = getHeader(event, 'user-agent') || ''

  const isSocialCrawler =
    /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|TelegramBot/i.test(userAgent)

  if (isSocialCrawler) {
    setHeader(event, 'Cache-Control', 'public, max-age=3600')
    setHeader(event, 'X-Robots-Tag', 'index, follow')
  }
})
