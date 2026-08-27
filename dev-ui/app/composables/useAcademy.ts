import { useAuth } from '~/composables/useAuth'

export interface MiniQuizOption {
  id: string
  text: string
  is_correct?: boolean
}

export interface MiniQuizData {
  prompt?: string
  points?: number
  explanation?: string
  options?: MiniQuizOption[]
}

export interface AcademyLessonOutline {
  id: number
  title: string
  slug: string
  estimated_minutes: number
  order: number
  mini_quiz_enabled?: boolean
}

export interface AcademyAssessmentOutline {
  id: number
  course: number
  module?: number | null
  title: string
  kind: 'quiz' | 'test'
  description?: string
  passing_percentage: number
  time_limit_minutes: number
  order: number
  questions_count: number
}

export interface AcademyModuleOutline {
  id: number
  title: string
  description?: string
  order: number
  lessons: AcademyLessonOutline[]
  assessments: AcademyAssessmentOutline[]
}

export interface AcademyCourse {
  id: number
  title: string
  slug: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  thumbnail?: string
  description?: string
  instructor_name: string
  instructor_avatar?: string
  estimated_hours: number
  badge_label?: string
  is_published: boolean
  approval_status?: string
  modules?: AcademyModuleOutline[]
  assessments?: AcademyAssessmentOutline[]
  modules_count?: number
  lessons_count?: number
  created_at?: string
  updated_at?: string
}

export interface AcademyLessonDetail {
  id: number
  title: string
  slug: string
  content_markdown: string
  video_url?: string
  estimated_minutes: number
  order: number
  mini_quiz_enabled?: boolean
  mini_quiz_data?: MiniQuizData
  module: number
  module_title: string
  course_slug: string
  course_title: string
  prev_lesson?: { id: number; title: string; slug: string } | null
  next_lesson?: { id: number; title: string; slug: string } | null
  created_at?: string
  updated_at?: string
}

export interface AcademyQuestionOption {
  id: string
  text: string
  is_correct?: boolean
  explanation?: string
}

export interface AcademyQuestion {
  id: number
  prompt_markdown: string
  question_type: 'single_choice' | 'multiple_choice' | 'true_false'
  points: number
  order: number
  options?: { id: string; text: string }[]
  options_json?: AcademyQuestionOption[]
}

export interface AcademyEnrollment {
  id: number
  student_email: string
  student_name: string
  course: number
  course_title: string
  course_slug: string
  course_thumbnail?: string
  progress_percentage: number
  completed_lessons: number[]
  total_lessons: number
  total_points?: number
  mini_quiz_progress?: Record<string, {
    completed: boolean
    mini_quiz_answered: boolean
    mini_quiz_is_correct: boolean
    points_earned: number
  }>
  enrolled_at: string
  completed_at?: string | null
}

export interface QuizSubmissionResult {
  attempt_id: number
  score_percentage: number
  earned_points: number
  total_points: number
  passing_percentage: number
  passed: boolean
  breakdown: Array<{
    question_id: number
    prompt: string
    is_correct: boolean
    user_selected: string[]
    correct_options: string[]
    options: AcademyQuestionOption[]
  }>
}

export function useAcademy () {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase as string || '').replace(/\/$/, '')
  const { user } = useAuth()

  const courses = ref<AcademyCourse[]>([])
  const currentCourse = ref<AcademyCourse | null>(null)
  const currentLesson = ref<AcademyLessonDetail | null>(null)
  const myEnrollments = ref<AcademyEnrollment[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ── Public & Student Methods ─────────────────────────────────

  async function fetchCourses (category = 'all', level = 'all', query = '') {
    if (!apiBase) return
    loading.value = true
    error.value = null

    try {
      const params = new URLSearchParams()
      if (category && category !== 'all') params.append('category', category)
      if (level && level !== 'all') params.append('level', level)
      if (query.trim()) params.append('q', query.trim())

      const qs = params.toString() ? `?${params.toString()}` : ''
      const res = await $fetch<AcademyCourse[]>(`${apiBase}/academy/courses/${qs}`).catch(() => [])
      if (Array.isArray(res)) {
        courses.value = res
      }
    } catch (e: any) {
      console.error('Failed to fetch academy courses:', e)
      error.value = e.message || 'Failed to fetch courses'
    } finally {
      loading.value = false
    }
  }

  async function fetchCourseBySlug (slug: string) {
    if (!apiBase || !slug) return null
    loading.value = true
    error.value = null

    try {
      const res = await $fetch<AcademyCourse>(`${apiBase}/academy/courses/${slug}/`)
      currentCourse.value = res
      return res
    } catch (e: any) {
      console.error('Failed to fetch course details:', e)
      error.value = e.message || 'Course not found'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchLesson (lessonId: number | string) {
    if (!apiBase || !lessonId) return null
    loading.value = true
    error.value = null

    try {
      const res = await $fetch<AcademyLessonDetail>(`${apiBase}/academy/lessons/${lessonId}/`)
      currentLesson.value = res
      return res
    } catch (e: any) {
      console.error('Failed to fetch lesson:', e)
      error.value = e.message || 'Lesson not found'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchAssessmentQuestions (assessmentId: number | string) {
    if (!apiBase || !assessmentId) return null
    try {
      const res = await $fetch<{
        assessment_id: number
        title: string
        kind: string
        passing_percentage: number
        time_limit_minutes: number
        questions: AcademyQuestion[]
      }>(`${apiBase}/academy/assessments/${assessmentId}/questions/`)
      return res
    } catch (e) {
      console.error('Failed to fetch quiz questions:', e)
      return null
    }
  }

  async function submitQuiz (assessmentId: number | string, answers: Record<string, string[] | string>, email?: string) {
    if (!apiBase || !assessmentId) return null
    const studentEmail = email || user.value?.email || 'student@techsavvy.ph'
    try {
      const res = await $fetch<QuizSubmissionResult>(`${apiBase}/academy/assessments/${assessmentId}/submit/`, {
        method: 'POST',
        body: {
          email: studentEmail,
          answers
        }
      })
      return res
    } catch (e: any) {
      console.error('Failed to submit quiz:', e)
      throw e
    }
  }

  async function submitMiniQuiz (lessonId: number | string, selectedOptionId: string, email?: string) {
    if (!apiBase || !lessonId) return null
    const studentEmail = email || user.value?.email || 'student@techsavvy.ph'
    try {
      const res = await $fetch<{
        lesson_id: number
        is_correct: boolean
        selected_option_id: string
        correct_option_id: string | null
        points_earned: number
        total_points: number
        explanation: string
      }>(`${apiBase}/academy/progress/submit-mini-quiz/`, {
        method: 'POST',
        body: {
          email: studentEmail,
          lesson_id: lessonId,
          selected_option_id: selectedOptionId
        }
      })
      await fetchMyEnrollments(studentEmail)
      return res
    } catch (e: any) {
      console.error('Failed to submit mini quiz:', e)
      throw e
    }
  }

  async function enrollCourse (courseId?: number, courseSlug?: string, email?: string, name?: string) {
    if (!apiBase) return null
    const studentEmail = email || user.value?.email || 'student@techsavvy.ph'
    const studentName = name || user.value?.name || studentEmail.split('@')[0]

    try {
      const res = await $fetch<{ enrollment: AcademyEnrollment; created: boolean }>(`${apiBase}/academy/enroll/`, {
        method: 'POST',
        body: {
          email: studentEmail,
          name: studentName,
          course_id: courseId,
          course_slug: courseSlug,
        }
      })
      await fetchMyEnrollments(studentEmail)
      return res.enrollment
    } catch (e) {
      console.error('Failed to enroll in course:', e)
      return null
    }
  }

  async function fetchMyEnrollments (email?: string) {
    if (!apiBase) return
    const studentEmail = email || user.value?.email
    if (!studentEmail) return

    try {
      const res = await $fetch<AcademyEnrollment[]>(`${apiBase}/academy/my-courses/?email=${encodeURIComponent(studentEmail)}`).catch(() => [])
      if (Array.isArray(res)) {
        myEnrollments.value = res
      }
    } catch (e) {
      console.error('Failed to fetch student enrollments:', e)
    }
  }

  async function markLessonProgress (lessonId: number, isCompleted = true, email?: string) {
    if (!apiBase || !lessonId) return null
    const studentEmail = email || user.value?.email || 'student@techsavvy.ph'

    try {
      const res = await $fetch<any>(`${apiBase}/academy/progress/`, {
        method: 'POST',
        body: {
          email: studentEmail,
          lesson_id: lessonId,
          is_completed: isCompleted
        }
      })
      await fetchMyEnrollments(studentEmail)
      return res
    } catch (e) {
      console.error('Failed to update lesson progress:', e)
      return null
    }
  }

  // ── Admin Management Methods ─────────────────────────────────

  async function adminCreateCourse (payload: Partial<AcademyCourse>) {
    if (!apiBase) return null
    return await $fetch<AcademyCourse>(`${apiBase}/academy/admin/courses/`, {
      method: 'POST',
      body: payload
    })
  }

  async function adminUpdateCourse (id: number, payload: Partial<AcademyCourse>) {
    if (!apiBase) return null
    return await $fetch<AcademyCourse>(`${apiBase}/academy/admin/courses/${id}/`, {
      method: 'PUT',
      body: payload
    })
  }

  async function adminDeleteCourse (id: number) {
    if (!apiBase) return null
    return await $fetch<{ deleted: boolean }>(`${apiBase}/academy/admin/courses/${id}/`, {
      method: 'DELETE'
    })
  }

  async function adminCreateModule (courseId: number, title: string, description = '', order = 1) {
    if (!apiBase) return null
    return await $fetch<any>(`${apiBase}/academy/admin/courses/${courseId}/modules/`, {
      method: 'POST',
      body: { title, description, order }
    })
  }

  async function adminUpdateModule (moduleId: number, title: string, description = '', order = 1) {
    if (!apiBase) return null
    return await $fetch<any>(`${apiBase}/academy/admin/modules/${moduleId}/`, {
      method: 'PUT',
      body: { title, description, order }
    })
  }

  async function adminDeleteModule (moduleId: number) {
    if (!apiBase) return null
    return await $fetch<any>(`${apiBase}/academy/admin/modules/${moduleId}/`, {
      method: 'DELETE'
    })
  }

  async function adminSaveLesson (payload: {
    id?: number
    module_id?: number
    title: string
    content_markdown: string
    video_url?: string
    estimated_minutes?: number
    order?: number
    mini_quiz_enabled?: boolean
    mini_quiz_data?: MiniQuizData
  }) {
    if (!apiBase) return null
    if (payload.id) {
      return await $fetch<AcademyLessonDetail>(`${apiBase}/academy/admin/lessons/${payload.id}/`, {
        method: 'PUT',
        body: payload
      })
    } else {
      return await $fetch<AcademyLessonDetail>(`${apiBase}/academy/admin/lessons/`, {
        method: 'POST',
        body: payload
      })
    }
  }

  async function adminDeleteLesson (lessonId: number) {
    if (!apiBase) return null
    return await $fetch<any>(`${apiBase}/academy/admin/lessons/${lessonId}/`, {
      method: 'DELETE'
    })
  }

  async function adminFetchAssessment (assessmentId: number) {
    if (!apiBase || !assessmentId) return null
    return await $fetch<AcademyAssessmentOutline & { questions: AcademyQuestion[] }>(`${apiBase}/academy/admin/assessments/${assessmentId}/`)
  }

  async function adminSaveAssessment (payload: {
    id?: number
    course_id?: number
    module_id?: number | null
    title: string
    kind: 'quiz' | 'test'
    description?: string
    passing_percentage?: number
    time_limit_minutes?: number
    order?: number
  }) {
    if (!apiBase) return null
    if (payload.id) {
      return await $fetch<any>(`${apiBase}/academy/admin/assessments/${payload.id}/`, {
        method: 'PUT',
        body: payload
      })
    } else {
      return await $fetch<any>(`${apiBase}/academy/admin/assessments/`, {
        method: 'POST',
        body: payload
      })
    }
  }

  async function adminDeleteAssessment (assessmentId: number) {
    if (!apiBase) return null
    return await $fetch<any>(`${apiBase}/academy/admin/assessments/${assessmentId}/`, {
      method: 'DELETE'
    })
  }

  async function adminSaveQuestion (payload: {
    id?: number
    assessment_id?: number
    prompt_markdown: string
    question_type: 'single_choice' | 'multiple_choice' | 'true_false'
    points: number
    order: number
    options_json: AcademyQuestionOption[]
  }) {
    if (!apiBase) return null
    if (payload.id) {
      return await $fetch<any>(`${apiBase}/academy/admin/questions/${payload.id}/`, {
        method: 'PUT',
        body: payload
      })
    } else {
      return await $fetch<any>(`${apiBase}/academy/admin/questions/`, {
        method: 'POST',
        body: payload
      })
    }
  }

  async function adminDeleteQuestion (questionId: number) {
    if (!apiBase) return null
    return await $fetch<any>(`${apiBase}/academy/admin/questions/${questionId}/`, {
      method: 'DELETE'
    })
  }

  return {
    courses,
    currentCourse,
    currentLesson,
    myEnrollments,
    loading,
    error,
    fetchCourses,
    fetchCourseBySlug,
    fetchLesson,
    fetchAssessmentQuestions,
    submitQuiz,
    submitMiniQuiz,
    enrollCourse,
    fetchMyEnrollments,
    markLessonProgress,
    adminCreateCourse,
    adminUpdateCourse,
    adminDeleteCourse,
    adminCreateModule,
    adminUpdateModule,
    adminDeleteModule,
    adminSaveLesson,
    adminDeleteLesson,
    adminFetchAssessment,
    adminSaveAssessment,
    adminDeleteAssessment,
    adminSaveQuestion,
    adminDeleteQuestion,
  }
}
