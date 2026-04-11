/**
 * Course detail page composable: course data (SSR via useAsyncData), head.
 */
export function useCourseDetailPage () {
  const { course, pending, error, refresh } = useCourseDetail()

  useHead(() => ({
    title: course.value ? `${course.value.title} | Courses | TECH SAVVY Code Camp` : 'Course not found | TECH SAVVY Code Camp',
    meta: [{ name: 'description', content: course.value?.description || 'TECH SAVVY Code Camp courses.' }],
    link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
  }))

  return { course, pending, error, refresh }
}
