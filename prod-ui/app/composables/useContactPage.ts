/**
 * Contact page composable: head.
 */
export function useContactPage () {
  useHead({
    title: 'Contact Us | TECH SAVVY Code Camp',
    meta: [
      {
        name: 'description',
        content: 'Get in touch with TECH SAVVY Code Camp - an IT community in Misamis Occidental, Philippines.'
      }
    ],
    link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
  })
}
