<template>
  <div class="font-inter min-h-screen bg-[#090D16] text-slate-100 selection:bg-violet-500 selection:text-white">
    <!-- ── Minimalist Studio Header ──────────────────────────────── -->
    <header class="sticky top-0 z-40 border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur-md">
      <div class="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-3">
          <NuxtLink to="/academy" class="flex items-center gap-2.5 text-white transition-opacity hover:opacity-80">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white shadow-md shadow-violet-600/30">
              <i class="fas fa-graduation-cap text-xs" />
            </div>
            <span class="text-xs font-black uppercase tracking-wider text-white">
              TechSavvy <span class="text-violet-400">Academy</span>
            </span>
          </NuxtLink>
          <span class="rounded bg-violet-950/80 border border-violet-800/50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-violet-300">
            LMS Studio
          </span>
        </div>

        <!-- Navigation Tabs & Actions -->
        <div class="flex items-center gap-2 sm:gap-3">
          <nav class="hidden md:flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
            <button
              type="button"
              @click="activeTab = 'courses'"
              class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all"
              :class="activeTab === 'courses' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'"
            >
              <i class="fas fa-book-open mr-1.5 text-[10px]" />
              Courses & Curriculum
            </button>
            <button
              type="button"
              @click="activeTab = 'gradebook'"
              class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all"
              :class="activeTab === 'gradebook' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'"
            >
              <i class="fas fa-user-graduate mr-1.5 text-[10px]" />
              Gradebook
            </button>
          </nav>

          <NuxtLink
            to="/academy"
            class="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            <i class="fas fa-external-link-alt text-[10px] text-violet-400" />
            <span class="hidden sm:inline">Student View</span>
          </NuxtLink>

          <button
            type="button"
            @click="openCourseModal()"
            class="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 transition-all"
          >
            <i class="fas fa-plus text-[10px]" />
            <span>New Course</span>
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl">
      <!-- ── Tab 1: Courses & Curriculum ───────────────────────────── -->
      <div v-if="activeTab === 'courses'">
        <!-- View 1A: Course Catalog List -->
        <div v-if="!selectedCurriculumCourse" class="space-y-6">
          <!-- Minimalist Stats & Search Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-6">
            <div>
              <h1 class="text-xl font-black uppercase tracking-tight text-white">Course Management</h1>
              <p class="text-xs text-slate-400 mt-0.5">Author courses, organize chapter modules, and configure quizzes.</p>
            </div>

            <div class="flex items-center gap-3">
              <div class="relative w-full sm:w-64">
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Filter courses…"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-1.5 pl-8 pr-3 text-xs font-medium text-white outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>

          <!-- Minimalist Course Cards -->
          <div v-if="filteredCourses.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="c in filteredCourses"
              :key="c.id"
              class="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-violet-500/40 hover:bg-slate-900"
            >
              <div class="flex items-start justify-between gap-3 mb-2.5">
                <span class="rounded bg-violet-950/80 border border-violet-800/40 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-violet-300">
                  {{ c.category }}
                </span>
                <span
                  class="rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider"
                  :class="c.is_published ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40' : 'bg-slate-800 text-slate-400'"
                >
                  {{ c.is_published ? 'Published' : 'Draft' }}
                </span>
              </div>

              <h3 class="text-sm font-black uppercase text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                {{ c.title }}
              </h3>

              <p class="mt-1.5 line-clamp-2 text-xs text-slate-400 leading-relaxed flex-1">
                {{ c.description || 'No summary provided.' }}
              </p>

              <!-- Stats Pill Row -->
              <div class="mt-4 flex items-center gap-3 text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-3">
                <span><strong>{{ c.modules_count ?? 0 }}</strong> Modules</span>
                <span>•</span>
                <span><strong>{{ c.lessons_count ?? 0 }}</strong> Lessons</span>
                <span>•</span>
                <span><strong>{{ c.estimated_hours }}</strong>h</span>
              </div>

              <!-- Actions -->
              <div class="mt-4 flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  type="button"
                  @click="openCurriculumBuilder(c)"
                  class="flex items-center gap-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 px-3 py-1.5 text-xs font-bold text-violet-300 hover:bg-violet-600 hover:text-white transition-all"
                >
                  <i class="fas fa-sitemap text-[10px]" />
                  <span>Curriculum</span>
                </button>

                <div class="flex items-center gap-1">
                  <button
                    type="button"
                    @click="openCourseModal(c)"
                    class="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
                    title="Edit Details"
                  >
                    <i class="fas fa-edit text-xs" />
                  </button>
                  <button
                    type="button"
                    @click="handleDeleteCourse(c)"
                    class="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-950/40 hover:text-rose-400"
                    title="Delete Course"
                  >
                    <i class="fas fa-trash text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-16 text-center">
            <i class="fas fa-book-open text-3xl text-slate-600 mb-3" />
            <h4 class="text-sm font-bold uppercase text-white">No Courses Created</h4>
            <p class="text-xs text-slate-500 mt-1">Click "New Course" above to create your first curriculum.</p>
          </div>
        </div>

        <!-- View 1B: Curriculum & Module Builder -->
        <div v-else class="space-y-6">
          <div class="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div class="flex items-center gap-3">
              <button
                type="button"
                @click="selectedCurriculumCourse = null"
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <i class="fas fa-arrow-left text-xs" />
              </button>
              <div>
                <h2 class="text-sm font-black uppercase text-white">
                  Curriculum: {{ selectedCurriculumCourse.title }}
                </h2>
                <p class="text-[10px] text-violet-400 font-mono">Organize chapters, markdown lessons, and chapter quizzes</p>
              </div>
            </div>

            <button
              type="button"
              @click="openAddModuleModal"
              class="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-violet-500"
            >
              <i class="fas fa-plus text-[10px]" />
              <span>Add Chapter</span>
            </button>
          </div>

          <!-- Modules Tree -->
          <div class="space-y-4">
            <div
              v-for="(mod, modIdx) in selectedCurriculumCourse.modules"
              :key="mod.id"
              class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"
            >
              <!-- Module Header -->
              <div class="flex items-center justify-between bg-slate-850/80 px-4 py-3 border-b border-slate-800">
                <div class="flex items-center gap-2.5">
                  <span class="flex h-6 w-6 items-center justify-center rounded bg-violet-950 text-xs font-bold text-violet-400 border border-violet-800/40 font-mono">
                    {{ modIdx + 1 }}
                  </span>
                  <div>
                    <h3 class="text-xs font-black uppercase text-white">{{ mod.title }}</h3>
                    <p v-if="mod.description" class="text-[10px] text-slate-400">{{ mod.description }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    @click="openAddLessonModal(mod.id)"
                    class="flex items-center gap-1 rounded-lg border border-violet-800/40 bg-violet-950/40 px-2.5 py-1 text-[10px] font-bold text-violet-300 hover:bg-violet-900/60"
                  >
                    <i class="far fa-file-alt text-[9px]" />
                    <span>+ Lesson</span>
                  </button>

                  <button
                    type="button"
                    @click="openAddAssessmentModal(mod.id)"
                    class="flex items-center gap-1 rounded-lg border border-emerald-800/40 bg-emerald-950/40 px-2.5 py-1 text-[10px] font-bold text-emerald-300 hover:bg-emerald-900/60"
                  >
                    <i class="fas fa-tasks text-[9px]" />
                    <span>+ Quiz</span>
                  </button>

                  <button
                    type="button"
                    @click="handleDeleteModule(mod.id)"
                    class="text-slate-500 hover:text-rose-400 p-1"
                    title="Delete Module"
                  >
                    <i class="fas fa-trash text-xs" />
                  </button>
                </div>
              </div>

              <!-- Module Items -->
              <div class="p-2 space-y-1.5 bg-slate-950/40">
                <!-- Lessons -->
                <div
                  v-for="(les, lesIdx) in mod.lessons"
                  :key="les.id"
                  class="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-900/80 px-3.5 py-2 text-xs"
                >
                  <div class="flex items-center gap-2.5">
                    <i class="far fa-file-code text-violet-400 text-xs" />
                    <span class="font-bold text-slate-200">{{ modIdx + 1 }}.{{ lesIdx + 1 }} {{ les.title }}</span>
                    <span class="font-mono text-[10px] text-slate-500">({{ les.estimated_minutes }}m)</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      @click="openEditLessonModal(les.id)"
                      class="rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-violet-300 border border-slate-700 hover:bg-violet-600 hover:text-white transition-colors"
                    >
                      <i class="fas fa-edit mr-1" /> Edit Markdown
                    </button>
                    <button
                      type="button"
                      @click="handleDeleteLesson(les.id)"
                      class="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <i class="fas fa-trash text-[10px]" />
                    </button>
                  </div>
                </div>

                <!-- Assessments -->
                <div
                  v-for="ass in mod.assessments"
                  :key="ass.id"
                  class="flex items-center justify-between rounded-xl border border-emerald-900/40 bg-emerald-950/20 px-3.5 py-2 text-xs"
                >
                  <div class="flex items-center gap-2.5">
                    <i class="fas fa-tasks text-emerald-400 text-xs" />
                    <span class="font-bold text-emerald-200">{{ ass.title }}</span>
                    <span class="rounded bg-emerald-950 px-1.5 py-0.5 text-[8px] font-black uppercase text-emerald-300 font-mono">
                      {{ ass.kind }} (Pass: {{ ass.passing_percentage }}%)
                    </span>
                  </div>

                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      @click="openQuestionBuilder(ass)"
                      class="rounded-lg bg-emerald-950/60 px-2.5 py-1 text-[10px] font-bold text-emerald-300 border border-emerald-800/40 hover:bg-emerald-600 hover:text-white transition-colors"
                    >
                      <i class="fas fa-list-ol mr-1" /> Questions ({{ ass.questions_count }})
                    </button>
                    <button
                      type="button"
                      @click="handleDeleteAssessment(ass.id)"
                      class="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <i class="fas fa-trash text-[10px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Tab 2: Minimalist Gradebook ───────────────────────────── -->
      <div v-else-if="activeTab === 'gradebook'" class="space-y-6">
        <div class="flex items-center justify-between border-b border-slate-850 pb-6">
          <div>
            <h1 class="text-xl font-black uppercase tracking-tight text-white">Student Gradebook & Analytics</h1>
            <p class="text-xs text-slate-400 mt-0.5">Track student enrollments, module completions, and quiz performance.</p>
          </div>
        </div>

        <div class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
          <div class="p-8 text-center">
            <i class="fas fa-chart-line text-3xl text-slate-600 mb-3" />
            <h3 class="text-sm font-bold uppercase text-white">Active Student Enrollments</h3>
            <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Student progress is automatically synchronized in real-time as learners advance through Markdown lessons and submit quizzes.
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- ── Modal 1: Create / Edit Course ──────────────────────────── -->
    <Teleport to="body">
      <div
        v-if="showCourseModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        @click.self="showCourseModal = false"
      >
        <div class="custom-scrollbar max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-850 pb-3.5 mb-4">
            <h3 class="text-sm font-black uppercase text-white">
              {{ editingCourse?.id ? 'Edit Course Settings' : 'Create New Course' }}
            </h3>
            <button type="button" @click="showCourseModal = false" class="text-slate-400 hover:text-white">
              <i class="fas fa-times" />
            </button>
          </div>

          <form @submit.prevent="saveCourseForm" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-400 mb-1">Course Title *</label>
              <input
                v-model="courseForm.title"
                required
                placeholder="e.g. Modern Full-Stack Engineering with Nuxt 3 & Django"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none focus:border-violet-500"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-400 mb-1">Track / Category</label>
                <select
                  v-model="courseForm.category"
                  class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none focus:border-violet-500"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Python & AI">Python & AI</option>
                  <option value="Systems & Networking">Systems & Networking</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-slate-400 mb-1">Level</label>
                <select
                  v-model="courseForm.level"
                  class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none focus:border-violet-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-400 mb-1">Instructor</label>
                <input
                  v-model="courseForm.instructor_name"
                  placeholder="TechSavvy Team"
                  class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none"
                />
              </div>

              <div>
                <label class="block font-bold text-slate-400 mb-1">Estimated Hours</label>
                <input
                  v-model.number="courseForm.estimated_hours"
                  type="number"
                  min="1"
                  placeholder="10"
                  class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-400 mb-1">Thumbnail URL</label>
              <input
                v-model="courseForm.thumbnail"
                type="url"
                placeholder="https://images.unsplash.com/…"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-medium text-white outline-none"
              />
            </div>

            <div>
              <label class="block font-bold text-slate-400 mb-1">Description</label>
              <textarea
                v-model="courseForm.description"
                rows="3"
                placeholder="Course summary and learning outcomes…"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-medium text-white outline-none"
              />
            </div>

            <div class="flex items-center gap-2 pt-1">
              <input
                id="pub_check"
                v-model="courseForm.is_published"
                type="checkbox"
                class="h-4 w-4 rounded accent-violet-600"
              />
              <label for="pub_check" class="font-bold text-slate-300">Published to Student Catalog</label>
            </div>

            <div class="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                @click="showCourseModal = false"
                class="rounded-xl px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="rounded-xl bg-violet-600 px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-violet-500"
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ── Modal 2: Distraction-Free Split-Screen Markdown Editor ─── -->
    <Teleport to="body">
      <div
        v-if="showLessonEditor"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      >
        <div class="flex h-[92vh] w-full max-w-6xl flex-col rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
          <!-- Editor Header -->
          <div class="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-6 py-3.5">
            <div class="flex items-center gap-3">
              <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white">
                <i class="fas fa-code text-xs" />
              </div>
              <div>
                <h3 class="text-xs font-black uppercase text-white">Markdown Lesson Editor</h3>
                <span class="text-[9px] font-mono text-violet-400">NetAcad split-screen live preview</span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="showLessonEditor = false"
                class="rounded-xl px-4 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                @click="saveLessonContent"
                class="rounded-xl bg-violet-600 px-5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-violet-500"
              >
                Save Lesson
              </button>
            </div>
          </div>

          <!-- Title & Time Row -->
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 border-b border-slate-800/80 bg-slate-900/40 p-3 text-xs">
            <div class="sm:col-span-3">
              <input
                v-model="lessonForm.title"
                placeholder="Lesson Title…"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-bold text-white outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <input
                v-model.number="lessonForm.estimated_minutes"
                type="number"
                placeholder="Minutes (e.g. 15)"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-bold text-white outline-none"
              />
            </div>
          </div>

          <!-- Markdown Toolbar -->
          <div class="flex flex-wrap items-center gap-1 border-b border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs">
            <button type="button" @click="insertMd('# ')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800">H1</button>
            <button type="button" @click="insertMd('## ')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800">H2</button>
            <button type="button" @click="insertMd('**', '**')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800"><i class="fas fa-bold" /></button>
            <button type="button" @click="insertMd('*', '*')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800"><i class="fas fa-italic" /></button>
            <button type="button" @click="insertMd('```typescript\n', '\n```')" class="rounded px-2 py-1 font-bold text-violet-400 hover:bg-slate-800"><i class="fas fa-code mr-1" />Code</button>
            <span class="text-slate-700">|</span>
            <button type="button" @click="insertMd('> [!NOTE]\n> ')" class="rounded px-2 py-1 text-[10px] font-bold text-blue-400 hover:bg-slate-800">[!NOTE]</button>
            <button type="button" @click="insertMd('> [!TIP]\n> ')" class="rounded px-2 py-1 text-[10px] font-bold text-emerald-400 hover:bg-slate-800">[!TIP]</button>
            <button type="button" @click="insertMd('> [!WARNING]\n> ')" class="rounded px-2 py-1 text-[10px] font-bold text-amber-400 hover:bg-slate-800">[!WARNING]</button>
          </div>

          <!-- Split-Screen Editor -->
          <div class="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <textarea
              v-model="lessonForm.content_markdown"
              placeholder="Write your Markdown lesson here…"
              class="custom-scrollbar h-full w-full resize-none bg-slate-950 p-6 font-mono text-xs text-slate-200 outline-none leading-relaxed"
            />

            <div class="custom-scrollbar h-full overflow-y-auto bg-slate-900/90 p-6">
              <div class="academy-markdown text-slate-100" v-html="renderMarkdown(lessonForm.content_markdown)" />
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ── Modal 3: Add Chapter Modal ─────────────────────────────── -->
    <Teleport to="body">
      <div
        v-if="showModuleModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        @click.self="showModuleModal = false"
      >
        <div class="w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <h3 class="text-xs font-black uppercase text-white mb-4">Add Chapter / Module</h3>
          <div class="space-y-3 text-xs">
            <div>
              <label class="block font-bold text-slate-400 mb-1">Module Title *</label>
              <input
                v-model="moduleTitle"
                placeholder="e.g. Module 1: Core Fundamentals"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-400 mb-1">Description</label>
              <textarea
                v-model="moduleDesc"
                rows="2"
                placeholder="Module summary…"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none"
              />
            </div>
          </div>
          <div class="mt-5 flex justify-end gap-2">
            <button type="button" @click="showModuleModal = false" class="rounded-xl px-4 py-2 text-xs font-bold text-slate-400">Cancel</button>
            <button type="button" @click="createModuleConfirm" class="rounded-xl bg-violet-600 px-5 py-2 text-xs font-black uppercase text-white">Create Module</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useAcademy, type AcademyCourse, type AcademyAssessmentOutline } from '~/composables/useAcademy'
import { useMarkdownRenderer } from '~/composables/useMarkdownRenderer'

useHead({
  title: 'LMS Studio | TechSavvy Academy',
  meta: [{ name: 'description', content: 'Minimalist Academy LMS Studio for courses, markdown lessons, and quiz management.' }]
})

const {
  courses,
  fetchCourses,
  fetchCourseBySlug,
  fetchLesson,
  adminCreateCourse,
  adminUpdateCourse,
  adminDeleteCourse,
  adminCreateModule,
  adminDeleteModule,
  adminSaveLesson,
  adminDeleteLesson,
  adminSaveAssessment,
  adminDeleteAssessment
} = useAcademy()

const { renderMarkdown } = useMarkdownRenderer()

const activeTab = ref<'courses' | 'gradebook'>('courses')
const searchQuery = ref('')
const selectedCurriculumCourse = ref<AcademyCourse | null>(null)

const filteredCourses = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return courses.value
  return courses.value.filter(c => (c.title || '').toLowerCase().includes(q) || (c.category || '').toLowerCase().includes(q))
})

onMounted(async () => {
  await fetchCourses()
})

// ── Course Modal ──
const showCourseModal = ref(false)
const editingCourse = ref<Partial<AcademyCourse> | null>(null)
const courseForm = ref<Partial<AcademyCourse>>({
  title: '',
  category: 'Web Development',
  level: 'beginner',
  instructor_name: 'TechSavvy Instructor',
  estimated_hours: 10,
  thumbnail: '',
  description: '',
  is_published: true
})

function openCourseModal (c?: AcademyCourse) {
  if (c) {
    editingCourse.value = c
    courseForm.value = { ...c }
  } else {
    editingCourse.value = null
    courseForm.value = {
      title: '',
      category: 'Web Development',
      level: 'beginner',
      instructor_name: 'TechSavvy Instructor',
      estimated_hours: 10,
      thumbnail: '',
      description: '',
      is_published: true
    }
  }
  showCourseModal.value = true
}

async function saveCourseForm () {
  try {
    if (editingCourse.value?.id) {
      await adminUpdateCourse(editingCourse.value.id, courseForm.value)
    } else {
      await adminCreateCourse(courseForm.value)
    }
    showCourseModal.value = false
    await fetchCourses()
  } catch (e) {
    console.error('Failed to save course:', e)
  }
}

async function handleDeleteCourse (c: AcademyCourse) {
  if (confirm(`Delete course "${c.title}"?`)) {
    await adminDeleteCourse(c.id)
    await fetchCourses()
  }
}

// ── Curriculum Builder ──
async function openCurriculumBuilder (c: AcademyCourse) {
  const full = await fetchCourseBySlug(c.slug)
  if (full) {
    selectedCurriculumCourse.value = full
  }
}

// Module modal
const showModuleModal = ref(false)
const moduleTitle = ref('')
const moduleDesc = ref('')

function openAddModuleModal () {
  moduleTitle.value = ''
  moduleDesc.value = ''
  showModuleModal.value = true
}

async function createModuleConfirm () {
  if (!selectedCurriculumCourse.value || !moduleTitle.value.trim()) return
  await adminCreateModule(selectedCurriculumCourse.value.id, moduleTitle.value.trim(), moduleDesc.value.trim())
  showModuleModal.value = false
  await openCurriculumBuilder(selectedCurriculumCourse.value)
  await fetchCourses()
}

async function handleDeleteModule (modId: number) {
  if (confirm('Delete this chapter and all its lessons?')) {
    await adminDeleteModule(modId)
    if (selectedCurriculumCourse.value) {
      await openCurriculumBuilder(selectedCurriculumCourse.value)
      await fetchCourses()
    }
  }
}

// ── Markdown Lesson Editor ──
const showLessonEditor = ref(false)
const targetModuleId = ref<number | null>(null)
const lessonForm = ref<{ id?: number; module_id?: number; title: string; content_markdown: string; estimated_minutes: number }>({
  title: '',
  content_markdown: '',
  estimated_minutes: 15
})

function openAddLessonModal (modId: number) {
  targetModuleId.value = modId
  lessonForm.value = {
    module_id: modId,
    title: '',
    content_markdown: '# Lesson Title\n\nWrite your Markdown content here...\n\n> [!NOTE]\n> Key concept to remember.',
    estimated_minutes: 15
  }
  showLessonEditor.value = true
}

async function openEditLessonModal (lesId: number) {
  const les = await fetchLesson(lesId)
  if (les) {
    lessonForm.value = {
      id: les.id,
      module_id: les.module,
      title: les.title,
      content_markdown: les.content_markdown,
      estimated_minutes: les.estimated_minutes
    }
    showLessonEditor.value = true
  }
}

async function saveLessonContent () {
  try {
    await adminSaveLesson(lessonForm.value)
    showLessonEditor.value = false
    if (selectedCurriculumCourse.value) {
      await openCurriculumBuilder(selectedCurriculumCourse.value)
      await fetchCourses()
    }
  } catch (e) {
    console.error('Failed to save lesson:', e)
  }
}

async function handleDeleteLesson (lesId: number) {
  if (confirm('Delete this lesson?')) {
    await adminDeleteLesson(lesId)
    if (selectedCurriculumCourse.value) {
      await openCurriculumBuilder(selectedCurriculumCourse.value)
      await fetchCourses()
    }
  }
}

// ── Assessment / Quiz Builder ──
async function openAddAssessmentModal (modId: number) {
  const title = prompt('Enter Quiz / Test Title:', 'Chapter 1 Knowledge Check')
  if (!title || !selectedCurriculumCourse.value) return
  await adminSaveAssessment({
    course_id: selectedCurriculumCourse.value.id,
    module_id: modId,
    title: title.trim(),
    kind: 'quiz',
    passing_percentage: 80
  })
  await openCurriculumBuilder(selectedCurriculumCourse.value)
}

async function handleDeleteAssessment (assId: number) {
  if (confirm('Delete this quiz?')) {
    await adminDeleteAssessment(assId)
    if (selectedCurriculumCourse.value) {
      await openCurriculumBuilder(selectedCurriculumCourse.value)
    }
  }
}

function openQuestionBuilder (ass: AcademyAssessmentOutline) {
  alert(`Assessment "${ass.title}": Question builder is active. Configurable via API or Django admin.`)
}

function insertMd (before: string, after: string = '') {
  lessonForm.value.content_markdown += `${before}Content${after}`
}
</script>
