/**
 * Course detail page composable: course data, loadData, head.
 */
export function useCourseDetailPage () {
  const course = useCourseDetail()

  onMounted(() => course.loadData())

  useHead(() => ({
    title: course.course.value ? `${course.course.value.title} | Courses | TECH SAVVY Code Camp` : 'Course not found | TECH SAVVY Code Camp',
    meta: [{ name: 'description', content: course.course.value?.description || 'TECH SAVVY Code Camp courses.' }],
    link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
  }))

  return { course }
}
