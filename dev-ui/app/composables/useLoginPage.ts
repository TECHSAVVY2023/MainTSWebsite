/**
 * Login page composable: head.
 */
export function useLoginPage () {
  useHead({
    title: 'Sign in | TECH SAVVY',
    link: [
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
    ]
  })
}
