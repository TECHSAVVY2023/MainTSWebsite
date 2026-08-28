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
          <div v-if="filteredCourses.length > 0" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="c in filteredCourses"
              :key="c.id"
              class="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg transition-all hover:border-violet-500/40 hover:bg-slate-900"
            >
              <!-- Course Banner on Top of Card & Title -->
              <div class="relative h-36 w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                <img
                  :src="c.thumbnail || '/img/The-division-shd-logo.png'"
                  :alt="c.title"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  @error="(e: any) => { e.target.src = '/img/The-division-shd-logo.png' }"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                <div class="absolute top-2.5 left-2.5">
                  <span class="rounded bg-violet-950/90 backdrop-blur-md border border-violet-800/60 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-violet-300">
                    {{ c.category }}
                  </span>
                </div>
                <div class="absolute top-2.5 right-2.5">
                  <span
                    class="rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider backdrop-blur-md"
                    :class="c.is_published ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-800/60' : 'bg-slate-800/90 text-slate-400 border border-slate-700'"
                  >
                    {{ c.is_published ? 'Published' : 'Draft' }}
                  </span>
                </div>
              </div>

              <!-- Card Body -->
              <div class="flex flex-1 flex-col p-5">
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
            <!-- Course Banner on Top of Title -->
            <div class="rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
              <div class="flex items-center justify-between mb-2">
                <label class="block font-bold text-slate-300">Course Banner</label>
                <span v-if="!courseForm.thumbnail" class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  No image attached (Default SHD will be used)
                </span>
                <span v-else class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <i class="fas fa-check-circle text-[10px]" /> Image Attached
                </span>
              </div>
              
              <!-- Live Banner Preview (If attached) -->
              <div
                v-if="courseForm.thumbnail"
                class="relative h-36 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 mb-3 group"
              >
                <img
                  :src="courseForm.thumbnail"
                  alt="Course Banner Preview"
                  class="h-full w-full object-cover"
                  @error="(e: any) => { e.target.src = '/img/The-division-shd-logo.png' }"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end justify-between p-3">
                  <span class="text-[10px] font-mono text-slate-300 truncate max-w-[70%]">
                    {{ courseForm.thumbnail }}
                  </span>
                  <button
                    type="button"
                    @click="courseForm.thumbnail = ''"
                    class="rounded-lg bg-rose-500/80 hover:bg-rose-500 px-2 py-1 text-[10px] font-bold text-white shadow transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <i class="fas fa-trash-alt text-[9px]" /> Remove
                  </button>
                </div>
              </div>

              <!-- Skeleton Placeholder Upload Box (When empty / not attached) -->
              <div
                v-else
                @click="triggerBannerFileInput"
                class="relative h-36 w-full rounded-xl border-2 border-dashed border-slate-800 hover:border-violet-500/50 bg-slate-900/30 hover:bg-slate-900/50 flex flex-col items-center justify-center p-4 mb-3 cursor-pointer transition-all group"
              >
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 group-hover:text-violet-400 group-hover:border-violet-500/40 mb-2 transition-all">
                  <i class="fas fa-image text-lg" />
                </div>
                <p class="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                  Upload or attach course banner
                </p>
                <p class="text-[10px] text-slate-500 text-center mt-0.5">
                  PNG, JPG, or WebP. Defaults to SHD banner if left empty.
                </p>
              </div>

              <!-- Upload & Controls Row -->
              <div class="flex flex-wrap items-center gap-2">
                <input
                  ref="bannerFileInputRef"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleBannerFileUpload"
                />
                <button
                  type="button"
                  :disabled="uploadingBanner"
                  @click="triggerBannerFileInput"
                  class="flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-600/20 px-3 py-2 text-xs font-bold text-violet-300 hover:bg-violet-600 hover:text-white transition-all disabled:opacity-50 cursor-pointer"
                >
                  <i v-if="uploadingBanner" class="fas fa-spinner fa-spin text-xs" />
                  <i v-else class="fas fa-upload text-xs" />
                  <span>{{ uploadingBanner ? 'Uploading…' : 'Upload from Computer' }}</span>
                </button>

                <button
                  v-if="!courseForm.thumbnail"
                  type="button"
                  @click="courseForm.thumbnail = '/img/The-division-shd-logo.png'"
                  class="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300 hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
                >
                  <i class="fas fa-undo text-[10px] text-slate-400" />
                  <span>Use Default SHD Banner</span>
                </button>

                <button
                  v-else
                  type="button"
                  @click="courseForm.thumbnail = ''"
                  class="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-400 hover:border-rose-800 hover:text-rose-300 transition-colors cursor-pointer"
                >
                  <i class="fas fa-times text-[10px]" />
                  <span>Clear Banner</span>
                </button>

                <button
                  type="button"
                  @click="showCustomUrlInput = !showCustomUrlInput"
                  class="text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2 ml-auto cursor-pointer"
                >
                  {{ showCustomUrlInput ? 'Hide URL input' : 'Paste Image URL' }}
                </button>
              </div>

              <!-- Optional Custom URL input -->
              <div v-if="showCustomUrlInput" class="mt-2.5">
                <input
                  v-model="courseForm.thumbnail"
                  type="text"
                  placeholder="https://… or /img/custom.png"
                  class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-400 mb-1">Course Title *</label>
              <input
                v-model="courseForm.title"
                required
                placeholder="course title"
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
                <h3 class="text-xs font-black uppercase text-white">Lesson Studio & Markdown Editor</h3>
                <span class="text-[9px] font-mono text-violet-400">Author markdown lessons & interactive mini quizzes</span>
              </div>
            </div>

            <!-- Subtab Switcher -->
            <div class="flex items-center gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800">
              <button
                type="button"
                @click="lessonEditorTab = 'markdown'"
                class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all"
                :class="lessonEditorTab === 'markdown' ? 'bg-violet-600 text-white shadow' : 'text-slate-400 hover:text-white'"
              >
                <i class="fas fa-file-alt text-[10px]" />
                <span>Markdown Content</span>
              </button>

              <button
                type="button"
                @click="lessonEditorTab = 'mini_quiz'"
                class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all"
                :class="lessonEditorTab === 'mini_quiz' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'"
              >
                <i class="fas fa-bolt text-[10px]" />
                <span>Mini Quiz</span>
                <span
                  class="rounded px-1.5 py-0.2 text-[8px] font-black uppercase"
                  :class="lessonForm.mini_quiz_enabled ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40' : 'bg-slate-800 text-slate-500'"
                >
                  {{ lessonForm.mini_quiz_enabled ? `+${lessonForm.mini_quiz_data.points || 10} pts` : 'Off' }}
                </span>
              </button>
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

          <!-- Markdown Toolbar (when on markdown tab) -->
          <div v-if="lessonEditorTab === 'markdown'" class="flex flex-wrap items-center gap-1 border-b border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs">
            <button type="button" @click="insertMd('# ')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800">H1</button>
            <button type="button" @click="insertMd('## ')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800">H2</button>
            <button type="button" @click="insertMd('**', '**')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800"><i class="fas fa-bold" /></button>
            <button type="button" @click="insertMd('*', '*')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800"><i class="fas fa-italic" /></button>
            <button type="button" @click="insertMd('```typescript\n', '\n```')" class="rounded px-2 py-1 font-bold text-violet-400 hover:bg-slate-800"><i class="fas fa-code mr-1" />Code</button>
            <span class="text-slate-700">|</span>
            <!-- Mermaid Graph Buttons -->
            <button
              type="button"
              @click="insertMermaidTemplate('flowchart')"
              class="rounded px-2 py-1 font-bold text-emerald-400 hover:bg-slate-800 flex items-center gap-1"
              title="Insert Mermaid Flowchart Diagram"
            >
              <i class="fas fa-project-diagram text-xs" />
              <span>Flowchart</span>
            </button>
            <button
              type="button"
              @click="insertMermaidTemplate('sequence')"
              class="rounded px-2 py-1 font-bold text-cyan-400 hover:bg-slate-800 flex items-center gap-1"
              title="Insert Mermaid Sequence Diagram"
            >
              <i class="fas fa-stream text-xs" />
              <span>Sequence</span>
            </button>
            <button
              type="button"
              @click="insertMermaidTemplate('architecture')"
              class="rounded px-2 py-1 font-bold text-violet-400 hover:bg-slate-800 flex items-center gap-1"
              title="Insert Architecture Diagram"
            >
              <i class="fas fa-sitemap text-xs" />
              <span>Architecture</span>
            </button>
            <span class="text-slate-700">|</span>
            <!-- Table Button -->
            <button
              type="button"
              @click="insertTableTemplate"
              class="rounded px-2 py-1 font-bold text-amber-300 hover:bg-slate-800 flex items-center gap-1"
              title="Insert Markdown Table"
            >
              <i class="fas fa-table text-xs" />
              <span>Table</span>
            </button>
            <span class="text-slate-700">|</span>
            <button type="button" @click="insertMd('> [!NOTE]\n> ')" class="rounded px-2 py-1 text-[10px] font-bold text-blue-400 hover:bg-slate-800">[!NOTE]</button>
            <button type="button" @click="insertMd('> [!TIP]\n> ')" class="rounded px-2 py-1 text-[10px] font-bold text-emerald-400 hover:bg-slate-800">[!TIP]</button>
            <button type="button" @click="insertMd('> [!WARNING]\n> ')" class="rounded px-2 py-1 text-[10px] font-bold text-amber-400 hover:bg-slate-800">[!WARNING]</button>
          </div>

          <!-- Split-Screen Editor & Live Reader Preview -->
          <div class="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <!-- Left Pane: Editor (Markdown or Mini Quiz) -->
            <div class="custom-scrollbar h-full overflow-y-auto bg-slate-950 p-6">
              <!-- Tab 1: Markdown text area -->
              <div v-if="lessonEditorTab === 'markdown'" class="h-full flex flex-col">
                <textarea
                  ref="markdownTextareaRef"
                  v-model="lessonForm.content_markdown"
                  placeholder="Write your Markdown lesson here…"
                  class="custom-scrollbar flex-1 w-full resize-none bg-transparent font-mono text-xs text-slate-200 outline-none leading-relaxed"
                />
              </div>

              <!-- Tab 2: Mini Quiz Configuration -->
              <div v-else-if="lessonEditorTab === 'mini_quiz'" class="space-y-5 text-xs">
                <!-- Mini Quiz Toggle Card -->
                <div class="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <div class="space-y-0.5">
                    <span class="block font-black text-white text-xs">Attach Mini Knowledge Check</span>
                    <span class="text-[11px] text-slate-400">Award bonus points to learners when they correctly answer this mini quiz.</span>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="lessonForm.mini_quiz_enabled"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
                  </label>
                </div>

                <div v-if="lessonForm.mini_quiz_enabled" class="space-y-4">
                  <!-- Points and Reward Settings -->
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-400 mb-1">Bonus Points Awarded</label>
                      <input
                        v-model.number="lessonForm.mini_quiz_data.points"
                        type="number"
                        min="1"
                        placeholder="10"
                        class="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 font-mono font-bold text-amber-300 outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label class="block font-bold text-slate-400 mb-1">Badge / Topic Tag</label>
                      <input
                        placeholder="Quick Check"
                        disabled
                        value="Knowledge Check"
                        class="w-full rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-slate-500 outline-none"
                      />
                    </div>
                  </div>

                  <!-- Question Prompt -->
                  <div>
                    <label class="block font-bold text-slate-400 mb-1">Question Prompt *</label>
                    <textarea
                      v-model="lessonForm.mini_quiz_data.prompt"
                      rows="3"
                      placeholder="e.g. Which HTTP method is typically used to create a new resource in REST?"
                      class="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 font-medium text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  <!-- Multiple Choice Options -->
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <label class="font-bold text-slate-400">Answer Options (Select the correct radio)</label>
                      <button
                        type="button"
                        @click="addMiniQuizOption"
                        class="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                      >
                        <i class="fas fa-plus text-[10px]" />
                        <span>Add Option</span>
                      </button>
                    </div>

                    <div class="space-y-2">
                      <div
                        v-for="(opt, idx) in lessonForm.mini_quiz_data.options"
                        :key="opt.id"
                        class="flex items-center gap-2.5 rounded-xl border p-2 transition-all"
                        :class="opt.is_correct ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-slate-800 bg-slate-900'"
                      >
                        <input
                          type="radio"
                          name="correct_option"
                          :checked="opt.is_correct"
                          @change="setCorrectMiniQuizOption(idx)"
                          class="h-4 w-4 accent-emerald-500 cursor-pointer ml-1"
                          title="Set as correct answer"
                        />
                        <input
                          v-model="opt.text"
                          placeholder="Option text…"
                          class="flex-1 bg-transparent text-xs text-white outline-none"
                        />
                        <button
                          type="button"
                          @click="removeMiniQuizOption(idx)"
                          :disabled="lessonForm.mini_quiz_data.options.length <= 2"
                          class="text-slate-600 hover:text-red-400 p-1 disabled:opacity-20"
                          title="Remove option"
                        >
                          <i class="fas fa-trash text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Learning Explanation -->
                  <div>
                    <label class="block font-bold text-slate-400 mb-1">Learning Takeaway / Explanation (Shown after answering)</label>
                    <textarea
                      v-model="lessonForm.mini_quiz_data.explanation"
                      rows="2"
                      placeholder="e.g. POST requests submit data to be processed to a specified resource."
                      class="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 font-medium text-slate-300 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Pane: Live Classroom Reader Preview -->
            <div class="custom-scrollbar h-full overflow-y-auto bg-slate-900/90 p-6 space-y-6">
              <!-- Lesson Markdown Preview -->
              <div
                ref="lessonPreviewContainer"
                class="academy-markdown"
                v-html="renderedLessonPreviewHtml"
              />

              <!-- Live Mini Quiz Preview Card (Attached at bottom of lesson) -->
              <div
                v-if="lessonForm.mini_quiz_enabled"
                class="rounded-2xl border border-amber-500/40 bg-slate-950/80 p-5 shadow-xl transition-all"
              >
                <div class="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="flex h-5 w-5 items-center justify-center rounded bg-amber-500/20 text-amber-400 text-xs">
                      <i class="fas fa-bolt text-[10px]" />
                    </span>
                    <span class="text-xs font-black uppercase tracking-wider text-white">Lesson Knowledge Check</span>
                  </div>
                  <span class="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[9px] font-black uppercase font-mono text-amber-300">
                    +{{ lessonForm.mini_quiz_data.points || 10 }} Points
                  </span>
                </div>

                <p class="text-xs font-bold text-slate-200 mb-3 leading-relaxed">
                  {{ lessonForm.mini_quiz_data.prompt || 'Question prompt will appear here…' }}
                </p>

                <div class="space-y-2 mb-4">
                  <div
                    v-for="opt in lessonForm.mini_quiz_data.options"
                    :key="opt.id"
                    class="flex items-center gap-2.5 rounded-xl border px-3 py-2 text-xs transition-colors"
                    :class="opt.is_correct ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200' : 'border-slate-800 bg-slate-900/80 text-slate-300'"
                  >
                    <i class="fas text-[10px]" :class="opt.is_correct ? 'fa-check-circle text-emerald-400' : 'fa-circle text-slate-600'" />
                    <span class="font-medium">{{ opt.text || '(Empty option)' }}</span>
                    <span v-if="opt.is_correct" class="ml-auto text-[9px] font-black uppercase text-emerald-400 font-mono">Correct Answer</span>
                  </div>
                </div>

                <div v-if="lessonForm.mini_quiz_data.explanation" class="rounded-xl bg-slate-900/60 border border-slate-800 p-2.5 text-[11px] text-slate-400">
                  <strong class="text-amber-400 block mb-0.5">Takeaway:</strong>
                  {{ lessonForm.mini_quiz_data.explanation }}
                </div>
              </div>
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

    <!-- ── Modal 4: Quiz & Question Studio Modal ───────────────────── -->
    <Teleport to="body">
      <div
        v-if="showAssessmentStudio"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      >
        <div class="flex h-[92vh] w-full max-w-5xl flex-col rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-6 py-3.5">
            <div class="flex items-center gap-3">
              <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <i class="fas fa-tasks text-xs" />
              </div>
              <div>
                <h3 class="text-xs font-black uppercase text-white">Quiz & Assessment Studio</h3>
                <span class="text-[9px] font-mono text-emerald-400">Configure questions, options, correct answers, and passing grades</span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="closeAssessmentStudio"
                class="rounded-xl px-4 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                Close Studio
              </button>
            </div>
          </div>

          <!-- Top Section: Quiz Metadata Settings -->
          <div class="border-b border-slate-800/80 bg-slate-900/50 p-4">
            <form @submit.prevent="saveAssessmentSettings" class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div class="sm:col-span-2">
                <label class="block font-bold text-slate-400 mb-1">Assessment Title *</label>
                <input
                  v-model="assessmentForm.title"
                  required
                  placeholder="e.g. Chapter 1 Knowledge Check Quiz"
                  class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-bold text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label class="block font-bold text-slate-400 mb-1">Kind</label>
                <select
                  v-model="assessmentForm.kind"
                  class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-bold text-white outline-none focus:border-emerald-500"
                >
                  <option value="quiz">Chapter Quiz</option>
                  <option value="test">Module / Final Test</option>
                </select>
              </div>

              <div class="flex items-end gap-2">
                <div class="flex-1">
                  <label class="block font-bold text-slate-400 mb-1">Passing %</label>
                  <input
                    v-model.number="assessmentForm.passing_percentage"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="80"
                    class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-mono font-bold text-white outline-none"
                  />
                </div>
                <button
                  type="submit"
                  :disabled="savingAssessmentSettings"
                  class="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-emerald-500 disabled:opacity-50"
                >
                  {{ savingAssessmentSettings ? 'Saving…' : 'Update' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Main Area: Questions List & Question Editor -->
          <div class="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <!-- Left 5 Cols: Questions List -->
            <div class="custom-scrollbar h-full overflow-y-auto bg-slate-950/60 p-4 md:col-span-5 flex flex-col">
              <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-black uppercase tracking-wider text-white">Questions</span>
                  <span class="rounded bg-emerald-950 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-300 border border-emerald-800/40">
                    {{ assessmentQuestions.length }} total
                  </span>
                </div>

                <button
                  type="button"
                  @click="openCreateQuestion"
                  class="flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-black uppercase text-white hover:bg-emerald-500 shadow transition-all"
                >
                  <i class="fas fa-plus text-[10px]" />
                  <span>Add Question</span>
                </button>
              </div>

              <!-- Question Items List -->
              <div v-if="assessmentQuestions.length > 0" class="space-y-2.5 flex-1">
                <div
                  v-for="(q, idx) in assessmentQuestions"
                  :key="q.id"
                  @click="openEditQuestion(q)"
                  class="group cursor-pointer rounded-2xl border p-3.5 transition-all text-xs"
                  :class="editingQuestionId === q.id ? 'border-emerald-500/70 bg-emerald-950/30' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <span class="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-950 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-800/40">
                        {{ idx + 1 }}
                      </span>
                      <span class="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        {{ q.question_type === 'single_choice' ? 'Single Choice' : (q.question_type === 'multiple_choice' ? 'Multiple Choice' : 'True/False') }}
                      </span>
                    </div>

                    <div class="flex items-center gap-2">
                      <span class="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono font-bold text-amber-300">
                        {{ q.points }} pts
                      </span>
                      <button
                        type="button"
                        @click.stop="handleDeleteQuestion(q.id)"
                        class="text-slate-500 hover:text-rose-400 p-1"
                        title="Delete question"
                      >
                        <i class="fas fa-trash text-xs" />
                      </button>
                    </div>
                  </div>

                  <p class="font-bold text-slate-200 line-clamp-2 leading-relaxed">
                    {{ q.prompt_markdown }}
                  </p>

                  <div class="mt-2 text-[10px] text-slate-500 font-mono">
                    {{ q.options_json?.length || 0 }} Options &bull; {{ (q.options_json || []).filter((o: any) => o.is_correct).length }} Correct
                  </div>
                </div>
              </div>

              <div v-else class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 p-8 text-center my-auto">
                <i class="fas fa-question-circle text-2xl text-slate-600 mb-2" />
                <p class="text-xs font-bold text-slate-400">No questions yet</p>
                <p class="text-[11px] text-slate-500 mt-1">Click "Add Question" above to start authoring questions.</p>
              </div>
            </div>

            <!-- Right 7 Cols: Question Editor & Live Preview -->
            <div class="custom-scrollbar h-full overflow-y-auto bg-slate-900/90 p-6 md:col-span-7">
              <div v-if="isEditingQuestion" class="space-y-4 text-xs">
                <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
                  <h4 class="text-xs font-black uppercase text-white">
                    {{ questionForm.id ? `Edit Question #${questionForm.order || 1}` : 'Create New Question' }}
                  </h4>
                  <button
                    type="button"
                    @click="isEditingQuestion = false"
                    class="text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <!-- Prompt Markdown -->
                <div>
                  <label class="block font-bold text-slate-300 mb-1">Question Prompt (Markdown supported) *</label>
                  <textarea
                    v-model="questionForm.prompt_markdown"
                    required
                    rows="3"
                    placeholder="e.g. Which layer of the OSI model does IP address resolution occur?"
                    class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-medium text-white outline-none focus:border-emerald-500 leading-relaxed"
                  />
                </div>

                <!-- Type & Points Row -->
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block font-bold text-slate-400 mb-1">Question Type</label>
                    <select
                      v-model="questionForm.question_type"
                      @change="handleQuestionTypeChange"
                      class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-bold text-white outline-none focus:border-emerald-500"
                    >
                      <option value="single_choice">Single Choice (Radio)</option>
                      <option value="multiple_choice">Multiple Choice (Checkboxes)</option>
                      <option value="true_false">True / False</option>
                    </select>
                  </div>

                  <div>
                    <label class="block font-bold text-slate-400 mb-1">Points</label>
                    <input
                      v-model.number="questionForm.points"
                      type="number"
                      min="1"
                      placeholder="10"
                      class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-mono font-bold text-amber-300 outline-none"
                    />
                  </div>
                </div>

                <!-- Options Builder -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <label class="font-bold text-slate-300">
                      Answer Choices (Select the correct {{ questionForm.question_type === 'multiple_choice' ? 'checkboxes' : 'answer' }})
                    </label>
                    <button
                      v-if="questionForm.question_type !== 'true_false'"
                      type="button"
                      @click="addQuestionOption"
                      class="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <i class="fas fa-plus text-[10px]" />
                      <span>Add Option</span>
                    </button>
                  </div>

                  <div class="space-y-2.5">
                    <div
                      v-for="(opt, idx) in questionForm.options_json"
                      :key="opt.id"
                      class="space-y-1.5 rounded-xl border p-2.5 transition-all"
                      :class="opt.is_correct ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-slate-800 bg-slate-950'"
                    >
                      <div class="flex items-center gap-2.5">
                        <input
                          v-if="questionForm.question_type === 'multiple_choice'"
                          type="checkbox"
                          v-model="opt.is_correct"
                          class="h-4 w-4 rounded accent-emerald-500 cursor-pointer ml-1"
                        />
                        <input
                          v-else
                          type="radio"
                          name="q_correct_option"
                          :checked="opt.is_correct"
                          @change="setCorrectQuestionOption(idx)"
                          class="h-4 w-4 accent-emerald-500 cursor-pointer ml-1"
                        />

                        <input
                          v-model="opt.text"
                          placeholder="Option text…"
                          class="flex-1 bg-transparent text-xs font-medium text-white outline-none"
                        />

                        <button
                          v-if="questionForm.question_type !== 'true_false'"
                          type="button"
                          @click="removeQuestionOption(idx)"
                          :disabled="questionForm.options_json.length <= 2"
                          class="text-slate-600 hover:text-rose-400 p-1 disabled:opacity-20"
                        >
                          <i class="fas fa-trash text-xs" />
                        </button>
                      </div>

                      <input
                        v-model="opt.explanation"
                        placeholder="Optional feedback / explanation for this choice…"
                        class="w-full rounded-lg bg-slate-900/60 px-2.5 py-1 text-[11px] text-slate-400 outline-none focus:text-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <!-- Save & Cancel Buttons -->
                <div class="pt-4 border-t border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    @click="isEditingQuestion = false"
                    class="rounded-xl px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    :disabled="savingQuestion"
                    @click="saveQuestionConfirm"
                    class="rounded-xl bg-emerald-600 px-6 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-emerald-500 disabled:opacity-50"
                  >
                    <i v-if="savingQuestion" class="fas fa-spinner fa-spin mr-1" />
                    <span>{{ savingQuestion ? 'Saving…' : 'Save Question' }}</span>
                  </button>
                </div>
              </div>

              <!-- Empty selection state -->
              <div v-else class="flex flex-col items-center justify-center h-full text-center py-16">
                <i class="fas fa-tasks text-4xl text-slate-700 mb-3" />
                <h4 class="text-sm font-black uppercase text-slate-300">Select a question or create new</h4>
                <p class="text-xs text-slate-500 max-w-sm mt-1 mb-4">
                  Select any question on the left to edit its prompt, choices, and explanations, or click below to add a new question.
                </p>
                <button
                  type="button"
                  @click="openCreateQuestion"
                  class="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-emerald-500 shadow-lg"
                >
                  <i class="fas fa-plus text-[10px]" />
                  <span>Add New Question</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  useAcademy,
  type AcademyCourse,
  type AcademyAssessmentOutline,
  type AcademyQuestion,
  type AcademyQuestionOption
} from '~/composables/useAcademy'
import { useMarkdownRenderer } from '~/composables/useMarkdownRenderer'

useHead({
  title: 'LMS Studio | TechSavvy Academy',
  meta: [{ name: 'description', content: 'Minimalist Academy LMS Studio for courses, markdown lessons, and quiz management.' }]
})

const {
  courses,
  adminFetchCourses,
  adminFetchCourseById,
  fetchLesson,
  adminCreateCourse,
  adminUpdateCourse,
  adminDeleteCourse,
  adminCreateModule,
  adminDeleteModule,
  adminSaveLesson,
  adminDeleteLesson,
  adminFetchAssessment,
  adminSaveAssessment,
  adminDeleteAssessment,
  adminSaveQuestion,
  adminDeleteQuestion
} = useAcademy()

const { renderMarkdown, renderMermaidInElement } = useMarkdownRenderer()
const lessonPreviewContainer = ref<HTMLElement | null>(null)
const markdownTextareaRef = ref<HTMLTextAreaElement | null>(null)

const activeTab = ref<'courses' | 'gradebook'>('courses')
const searchQuery = ref('')
const selectedCurriculumCourse = ref<AcademyCourse | null>(null)

const filteredCourses = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return courses.value
  return courses.value.filter(c => (c.title || '').toLowerCase().includes(q) || (c.category || '').toLowerCase().includes(q))
})

onMounted(async () => {
  await adminFetchCourses()
})

// ── Course Modal & Banner Upload ──
const config = useRuntimeConfig()
const apiBase = (config.public?.apiBase as string || '').replace(/\/$/, '')
const showCourseModal = ref(false)
const editingCourse = ref<Partial<AcademyCourse> | null>(null)
const bannerFileInputRef = ref<HTMLInputElement | null>(null)
const uploadingBanner = ref(false)
const showCustomUrlInput = ref(false)

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

function triggerBannerFileInput () {
  bannerFileInputRef.value?.click()
}

async function handleBannerFileUpload (event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingBanner.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)

    const res = await $fetch<{ uploaded_files: Array<{ name: string; url: string }> }>(`${apiBase}/cms/upload/`, {
      method: 'POST',
      body: formData
    })

    if (res?.uploaded_files && res.uploaded_files.length > 0) {
      courseForm.value.thumbnail = res.uploaded_files[0].url
    } else {
      // Fallback to FileReader data URL
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          courseForm.value.thumbnail = e.target.result as string
        }
      }
      reader.readAsDataURL(file)
    }
  } catch (err) {
    console.error('File upload error, using local fallback:', err)
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        courseForm.value.thumbnail = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
  } finally {
    uploadingBanner.value = false
    if (target) target.value = ''
  }
}

function openCourseModal (c?: AcademyCourse) {
  showCustomUrlInput.value = false
  if (c) {
    editingCourse.value = c
    courseForm.value = {
      ...c,
      thumbnail: c.thumbnail || ''
    }
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
    const payload = {
      ...courseForm.value,
      thumbnail: courseForm.value.thumbnail?.trim() || '/img/The-division-shd-logo.png'
    }
    if (editingCourse.value?.id) {
      await adminUpdateCourse(editingCourse.value.id, payload)
    } else {
      await adminCreateCourse(payload)
    }
    showCourseModal.value = false
    await adminFetchCourses()
  } catch (e) {
    console.error('Failed to save course:', e)
  }
}

async function handleDeleteCourse (c: AcademyCourse) {
  if (confirm(`Delete course "${c.title}"?`)) {
    await adminDeleteCourse(c.id)
    await adminFetchCourses()
  }
}

// ── Curriculum Builder ──
async function openCurriculumBuilder (c: AcademyCourse) {
  const full = await adminFetchCourseById(c.id)
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
  await adminFetchCourses()
}

async function handleDeleteModule (modId: number) {
  if (confirm('Delete this chapter and all its lessons?')) {
    await adminDeleteModule(modId)
    if (selectedCurriculumCourse.value) {
      await openCurriculumBuilder(selectedCurriculumCourse.value)
      await adminFetchCourses()
    }
  }
}

// ── Markdown Lesson Editor ──
const showLessonEditor = ref(false)
const lessonEditorTab = ref<'markdown' | 'mini_quiz'>('markdown')
const targetModuleId = ref<number | null>(null)

interface MiniQuizOptionForm {
  id: string
  text: string
  is_correct: boolean
}

interface MiniQuizForm {
  prompt: string
  points: number
  explanation: string
  options: MiniQuizOptionForm[]
}

interface LessonFormState {
  id?: number
  module_id?: number
  title: string
  content_markdown: string
  estimated_minutes: number
  mini_quiz_enabled: boolean
  mini_quiz_data: MiniQuizForm
}

const defaultMiniQuiz = (): MiniQuizForm => ({
  prompt: '',
  points: 10,
  explanation: '',
  options: [
    { id: '1', text: '', is_correct: true },
    { id: '2', text: '', is_correct: false },
    { id: '3', text: '', is_correct: false }
  ]
})

const lessonForm = ref<LessonFormState>({
  title: '',
  content_markdown: '',
  estimated_minutes: 15,
  mini_quiz_enabled: false,
  mini_quiz_data: defaultMiniQuiz()
})

const debouncedLessonContent = ref(lessonForm.value.content_markdown)

let previewDebounceTimer: any = null
watch(() => lessonForm.value.content_markdown, (newVal) => {
  clearTimeout(previewDebounceTimer)
  previewDebounceTimer = setTimeout(async () => {
    debouncedLessonContent.value = newVal
    await nextTick()
    if (lessonPreviewContainer.value) {
      await renderMermaidInElement(lessonPreviewContainer.value)
    }
  }, 100)
})

watch(showLessonEditor, (isOpen) => {
  if (isOpen) {
    debouncedLessonContent.value = lessonForm.value.content_markdown
    nextTick(async () => {
      if (lessonPreviewContainer.value) {
        await renderMermaidInElement(lessonPreviewContainer.value)
      }
    })
  }
})

watch(lessonEditorTab, (tab) => {
  if (tab === 'markdown') {
    debouncedLessonContent.value = lessonForm.value.content_markdown
    nextTick(async () => {
      if (lessonPreviewContainer.value) {
        await renderMermaidInElement(lessonPreviewContainer.value)
      }
    })
  }
})

const renderedLessonPreviewHtml = computed(() => {
  return renderMarkdown(debouncedLessonContent.value)
})

function addMiniQuizOption () {
  const newId = String(lessonForm.value.mini_quiz_data.options.length + 1)
  lessonForm.value.mini_quiz_data.options.push({
    id: newId,
    text: '',
    is_correct: false
  })
}

function removeMiniQuizOption (index: number) {
  if (lessonForm.value.mini_quiz_data.options.length <= 2) return
  const wasCorrect = lessonForm.value.mini_quiz_data.options[index].is_correct
  lessonForm.value.mini_quiz_data.options.splice(index, 1)
  if (wasCorrect && lessonForm.value.mini_quiz_data.options.length > 0) {
    lessonForm.value.mini_quiz_data.options[0].is_correct = true
  }
}

function setCorrectMiniQuizOption (index: number) {
  lessonForm.value.mini_quiz_data.options.forEach((opt, idx) => {
    opt.is_correct = idx === index
  })
}

function openAddLessonModal (modId: number) {
  targetModuleId.value = modId
  lessonEditorTab.value = 'markdown'
  const initMd = '# Lesson Title\n\nWrite your Markdown content here...\n\n> [!NOTE]\n> Key concept to remember.'
  lessonForm.value = {
    module_id: modId,
    title: '',
    content_markdown: initMd,
    estimated_minutes: 15,
    mini_quiz_enabled: false,
    mini_quiz_data: defaultMiniQuiz()
  }
  debouncedLessonContent.value = initMd
  showLessonEditor.value = true
}

async function openEditLessonModal (lesId: number) {
  const les = await fetchLesson(lesId)
  if (les) {
    lessonEditorTab.value = 'markdown'
    const quiz = les.mini_quiz_data || {}
    lessonForm.value = {
      id: les.id,
      module_id: les.module,
      title: les.title,
      content_markdown: les.content_markdown,
      estimated_minutes: les.estimated_minutes,
      mini_quiz_enabled: Boolean(les.mini_quiz_enabled),
      mini_quiz_data: {
        prompt: quiz.prompt || '',
        points: quiz.points || 10,
        explanation: quiz.explanation || '',
        options: quiz.options?.length ? quiz.options.map((o: any, idx: number) => ({
          id: String(o.id || idx + 1),
          text: o.text || '',
          is_correct: Boolean(o.is_correct)
        })) : [
          { id: '1', text: '', is_correct: true },
          { id: '2', text: '', is_correct: false },
          { id: '3', text: '', is_correct: false }
        ]
      }
    }
    debouncedLessonContent.value = les.content_markdown
    showLessonEditor.value = true
  }
}

async function saveLessonContent () {
  try {
    await adminSaveLesson(lessonForm.value)
    showLessonEditor.value = false
    if (selectedCurriculumCourse.value) {
      await openCurriculumBuilder(selectedCurriculumCourse.value)
      await adminFetchCourses()
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
      await adminFetchCourses()
    }
  }
}

// ── Assessment / Quiz & Question Studio ──
const showAssessmentStudio = ref(false)
const savingAssessmentSettings = ref(false)
const savingQuestion = ref(false)
const isEditingQuestion = ref(false)
const editingQuestionId = ref<number | null>(null)

const editingAssessment = ref<AcademyAssessmentOutline | null>(null)
const assessmentForm = ref<{
  id?: number
  title: string
  kind: 'quiz' | 'test'
  passing_percentage: number
  time_limit_minutes: number
  description: string
}>({
  title: '',
  kind: 'quiz',
  passing_percentage: 80,
  time_limit_minutes: 0,
  description: ''
})

const assessmentQuestions = ref<AcademyQuestion[]>([])

interface QuestionOptionForm {
  id: string
  text: string
  is_correct: boolean
  explanation?: string
}

interface QuestionFormState {
  id?: number
  prompt_markdown: string
  question_type: 'single_choice' | 'multiple_choice' | 'true_false'
  points: number
  order: number
  options_json: QuestionOptionForm[]
}

const defaultQuestionOptions = (type: 'single_choice' | 'multiple_choice' | 'true_false'): QuestionOptionForm[] => {
  if (type === 'true_false') {
    return [
      { id: '1', text: 'True', is_correct: true, explanation: '' },
      { id: '2', text: 'False', is_correct: false, explanation: '' }
    ]
  }
  return [
    { id: '1', text: '', is_correct: true, explanation: '' },
    { id: '2', text: '', is_correct: false, explanation: '' },
    { id: '3', text: '', is_correct: false, explanation: '' },
    { id: '4', text: '', is_correct: false, explanation: '' }
  ]
}

const questionForm = ref<QuestionFormState>({
  prompt_markdown: '',
  question_type: 'single_choice',
  points: 10,
  order: 1,
  options_json: defaultQuestionOptions('single_choice')
})

async function openQuestionBuilder (ass: AcademyAssessmentOutline) {
  try {
    const full = await adminFetchAssessment(ass.id)
    if (full) {
      editingAssessment.value = full
      assessmentForm.value = {
        id: full.id,
        title: full.title,
        kind: full.kind || 'quiz',
        passing_percentage: full.passing_percentage || 80,
        time_limit_minutes: full.time_limit_minutes || 0,
        description: full.description || ''
      }
      assessmentQuestions.value = (full.questions || []).map((q: any) => ({
        ...q,
        options_json: q.options_json || []
      }))
      isEditingQuestion.value = false
      editingQuestionId.value = null
      showAssessmentStudio.value = true
    }
  } catch (err) {
    console.error('Failed to open question studio:', err)
  }
}

async function closeAssessmentStudio () {
  showAssessmentStudio.value = false
  if (selectedCurriculumCourse.value) {
    await openCurriculumBuilder(selectedCurriculumCourse.value)
    await adminFetchCourses()
  }
}

async function saveAssessmentSettings () {
  if (!editingAssessment.value) return
  savingAssessmentSettings.value = true
  try {
    await adminSaveAssessment({
      id: editingAssessment.value.id,
      title: assessmentForm.value.title,
      kind: assessmentForm.value.kind,
      passing_percentage: assessmentForm.value.passing_percentage,
      time_limit_minutes: assessmentForm.value.time_limit_minutes,
      description: assessmentForm.value.description
    })
    if (editingAssessment.value) {
      editingAssessment.value.title = assessmentForm.value.title
      editingAssessment.value.kind = assessmentForm.value.kind
      editingAssessment.value.passing_percentage = assessmentForm.value.passing_percentage
    }
  } catch (err) {
    console.error('Failed to save assessment settings:', err)
  } finally {
    savingAssessmentSettings.value = false
  }
}

function openCreateQuestion () {
  editingQuestionId.value = null
  questionForm.value = {
    prompt_markdown: '',
    question_type: 'single_choice',
    points: 10,
    order: assessmentQuestions.value.length + 1,
    options_json: defaultQuestionOptions('single_choice')
  }
  isEditingQuestion.value = true
}

function openEditQuestion (q: AcademyQuestion) {
  editingQuestionId.value = q.id
  const opts = (q.options_json || []).map((o: any, idx: number) => ({
    id: String(o.id || idx + 1),
    text: o.text || '',
    is_correct: Boolean(o.is_correct),
    explanation: o.explanation || ''
  }))

  questionForm.value = {
    id: q.id,
    prompt_markdown: q.prompt_markdown,
    question_type: q.question_type as any,
    points: q.points || 10,
    order: q.order || 1,
    options_json: opts.length ? opts : defaultQuestionOptions(q.question_type as any)
  }
  isEditingQuestion.value = true
}

function handleQuestionTypeChange () {
  if (questionForm.value.question_type === 'true_false') {
    questionForm.value.options_json = defaultQuestionOptions('true_false')
  } else if (questionForm.value.options_json.length < 2) {
    questionForm.value.options_json = defaultQuestionOptions('single_choice')
  }
}

function addQuestionOption () {
  const newId = String(questionForm.value.options_json.length + 1)
  questionForm.value.options_json.push({
    id: newId,
    text: '',
    is_correct: false,
    explanation: ''
  })
}

function removeQuestionOption (index: number) {
  if (questionForm.value.options_json.length <= 2) return
  const wasCorrect = questionForm.value.options_json[index].is_correct
  questionForm.value.options_json.splice(index, 1)
  if (wasCorrect && questionForm.value.options_json.length > 0) {
    questionForm.value.options_json[0].is_correct = true
  }
}

function setCorrectQuestionOption (index: number) {
  questionForm.value.options_json.forEach((opt, idx) => {
    opt.is_correct = idx === index
  })
}

async function saveQuestionConfirm () {
  if (!editingAssessment.value || !questionForm.value.prompt_markdown.trim()) return
  savingQuestion.value = true
  try {
    await adminSaveQuestion({
      id: questionForm.value.id,
      assessment_id: editingAssessment.value.id,
      prompt_markdown: questionForm.value.prompt_markdown.trim(),
      question_type: questionForm.value.question_type,
      points: Number(questionForm.value.points) || 10,
      order: questionForm.value.order || (assessmentQuestions.value.length + 1),
      options_json: questionForm.value.options_json
    })

    // Refresh assessment questions
    const full = await adminFetchAssessment(editingAssessment.value.id)
    if (full) {
      assessmentQuestions.value = full.questions || []
    }
    isEditingQuestion.value = false
    editingQuestionId.value = null
  } catch (err) {
    console.error('Failed to save question:', err)
  } finally {
    savingQuestion.value = false
  }
}

async function handleDeleteQuestion (qId: number) {
  if (confirm('Delete this question from the assessment?')) {
    await adminDeleteQuestion(qId)
    if (editingAssessment.value) {
      const full = await adminFetchAssessment(editingAssessment.value.id)
      if (full) {
        assessmentQuestions.value = full.questions || []
      }
    }
    if (editingQuestionId.value === qId) {
      isEditingQuestion.value = false
      editingQuestionId.value = null
    }
  }
}

async function openAddAssessmentModal (modId: number) {
  const title = prompt('Enter Quiz / Test Title:', 'Chapter 1 Knowledge Check')
  if (!title || !selectedCurriculumCourse.value) return
  const newAss = await adminSaveAssessment({
    course_id: selectedCurriculumCourse.value.id,
    module_id: modId,
    title: title.trim(),
    kind: 'quiz',
    passing_percentage: 80
  })
  await openCurriculumBuilder(selectedCurriculumCourse.value)
  if (newAss?.id) {
    await openQuestionBuilder(newAss)
  }
}

async function handleDeleteAssessment (assId: number) {
  if (confirm('Delete this quiz?')) {
    await adminDeleteAssessment(assId)
    if (selectedCurriculumCourse.value) {
      await openCurriculumBuilder(selectedCurriculumCourse.value)
    }
  }
}

function insertMd (before: string, after: string = '') {
  const textarea = markdownTextareaRef.value
  const current = lessonForm.value.content_markdown || ''

  if (!textarea) {
    lessonForm.value.content_markdown += `${before}Content${after}`
    return
  }

  const start = textarea.selectionStart ?? current.length
  const end = textarea.selectionEnd ?? current.length
  const selectedText = current.substring(start, end)
  const innerText = selectedText || (after ? 'Content' : '')
  const replacement = `${before}${innerText}${after}`

  lessonForm.value.content_markdown = current.substring(0, start) + replacement + current.substring(end)

  nextTick(() => {
    textarea.focus()
    const newPos = start + replacement.length
    textarea.setSelectionRange(newPos, newPos)
  })
}

function insertMermaidTemplate (kind: 'flowchart' | 'sequence' | 'architecture' = 'flowchart') {
  let template = ''
  if (kind === 'flowchart') {
    template = `\n\`\`\`mermaid
graph TD
    A[Node A] --> B[Node B]
    B --> C[Node C]
\`\`\`\n`
  } else if (kind === 'sequence') {
    template = `\n\`\`\`mermaid
sequenceDiagram
    autonumber
    A->>B: Message
    B-->>A: Response
\`\`\`\n`
  } else {
    template = `\n\`\`\`mermaid
graph LR
    subgraph Group A
        A[Component 1]
    end
    subgraph Group B
        B[Component 2]
    end
    A --> B
\`\`\`\n`
  }

  const textarea = markdownTextareaRef.value
  const current = lessonForm.value.content_markdown || ''

  if (!textarea) {
    lessonForm.value.content_markdown += template
  } else {
    const start = textarea.selectionStart ?? current.length
    const end = textarea.selectionEnd ?? current.length
    lessonForm.value.content_markdown = current.substring(0, start) + template + current.substring(end)

    nextTick(() => {
      textarea.focus()
      const newPos = start + template.length
      textarea.setSelectionRange(newPos, newPos)
    })
  }

  nextTick(async () => {
    if (lessonPreviewContainer.value) {
      await renderMermaidInElement(lessonPreviewContainer.value)
    }
  })
}

function insertTableTemplate () {
  const tableTemplate = `\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Item 1   | Item 2   | Item 3   |\n| Item 4   | Item 5   | Item 6   |\n\n`

  const textarea = markdownTextareaRef.value
  const current = lessonForm.value.content_markdown || ''

  if (!textarea) {
    lessonForm.value.content_markdown += tableTemplate
  } else {
    const start = textarea.selectionStart ?? current.length
    const end = textarea.selectionEnd ?? current.length
    lessonForm.value.content_markdown = current.substring(0, start) + tableTemplate + current.substring(end)

    nextTick(() => {
      textarea.focus()
      const newPos = start + tableTemplate.length
      textarea.setSelectionRange(newPos, newPos)
    })
  }
}
</script>
