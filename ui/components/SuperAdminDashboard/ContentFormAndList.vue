<template>
  <div
    class="rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-cyan-500/20 p-8"
  >
    <div class="w-full px-6">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1
              class="text-xl font-extralight tracking-[0.2em] uppercase mb-1 text-cyan-400"
            >
              Content Form
            </h1>
            <p
              class="text-sm font-extralight tracking-[0.2em] uppercase mb-1 text-gray-400"
            >
              Manage content for Tech Savvy
            </p>
          </div>
        </div>
      </div>

      <div class="w-full">
        <!-- Content Form Section -->
        <div
          v-if="showForm"
          class="rounded-lg shadow-sm border mb-8 transition-colors duration-300 w-full bg-black/40 border-cyan-500/30"
        >
          <div class="px-6 py-4 border-b border-cyan-500/30">
            <div class="lg:flex items-center justify-between">
              <h2 class="text-xl font-semibold text-cyan-400">
                {{ isEditing ? "Edit Content" : "Create New Content" }}
              </h2>

              <button
                v-if="showForm"
                @click="showForm = !showForm"
                class="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-gray-700 text-white hover:bg-gray-600"
              >
                <i class="fas fa-times mr-2"></i>
                {{ showForm ? "Close" : "Show Form" }}
              </button>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-300">
                Title <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.title"
                type="text"
                required
                placeholder="Enter content title"
                class="w-full px-4 py-2 border rounded-md transition-colors duration-200 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <!-- Author/s -->
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-300">
                Author/s
              </label>
              <textarea
                v-model="formData.authors"
                required
                rows="4"
                placeholder="Provide a detailed description of the content"
                class="w-full px-4 py-2 border rounded-md transition-colors duration-200 resize-y bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                disabled
                ></textarea>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-300">
                Description <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="formData.descriptions"
                required
                rows="4"
                placeholder="Provide a detailed description of the content"
                class="w-full px-4 py-2 border rounded-md transition-colors duration-200 resize-y bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              ></textarea>
            </div>

            <!-- Category-specific filters -->
            <div>
              <label
                class="block text-sm font-medium mb-3 uppercase text-gray-300"
              >
                Category & Filters
              </label>
              <div class="mb-4">
                <select
                  v-model="formData.filters.category"
                  class="w-full px-4 py-2 border rounded-md transition-colors duration-200 bg-gray-800 border-gray-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option
                    v-for="category in categoryOptions"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>
              <div
                v-for="field in activeCategoryFields"
                :key="field.key"
                class="mb-3"
              >
                <label class="block text-xs font-semibold mb-1 uppercase text-gray-400">
                  {{ field.label }}
                </label>
                <input
                  v-model="formData.filters[field.key]"
                  type="text"
                  :placeholder="field.placeholder"
                  class="w-full px-4 py-2 border rounded-md transition-colors duration-200 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <!-- Attachments (Links) -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-medium text-gray-300">
                  Attachments (Links)
                </label>
                <button
                  type="button"
                  @click="addLink"
                  class="inline-flex items-center px-3 py-1 text-sm rounded-md transition-colors duration-200 bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500"
                >
                  <span class="mr-1">+</span> Add Link
                </button>
              </div>

              <!-- Links List -->
              <div
                v-if="formData.links && formData.links.length > 0"
                class="space-y-2 mt-3"
              >
                <div
                  v-for="(link, index) in formData.links"
                  :key="index"
                  class="flex items-center gap-2 p-3 bg-gray-800 border border-gray-700 rounded-lg"
                >
                  <input
                    v-model="formData.links[index]"
                    type="url"
                    placeholder="https://example.com/file.pdf"
                    class="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    @click="removeLink(index)"
                    class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Upload Files -->
            <div>
              <p
                :class="[
                  'text-xs mb-3',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500',
                ]"
              >
                Upload files or add file URLs manually. Supported: Images (JPG,
                PNG), Videos (MP4), PDFs & Other files.
              </p>

              <div
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleFileDrop"
                :class="[
                  'border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200',
                  isDragging
                    ? isDarkMode
                      ? 'border-yellow-500 bg-yellow-900/20'
                      : 'border-yellow-500 bg-yellow-50'
                    : isDarkMode
                      ? 'border-gray-600 bg-gray-700/50'
                      : 'border-gray-300 bg-gray-50',
                ]"
              >
                <div class="flex flex-col items-center">
                  <svg
                    :class="[
                      'w-12 h-12 mb-3',
                      isDarkMode ? 'text-gray-500' : 'text-gray-400',
                    ]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p
                    :class="[
                      'text-sm mb-1',
                      isDarkMode ? 'text-gray-300' : 'text-gray-600',
                    ]"
                  >
                    <button
                      type="button"
                      @click="triggerFileInput"
                      :class="[
                        'font-medium transition-colors',
                        isDarkMode
                          ? 'text-yellow-400 hover:text-yellow-300'
                          : 'text-yellow-600 hover:text-yellow-700',
                      ]"
                    >
                      Click to upload
                    </button>
                    or drag and drop
                  </p>
                  <p
                    :class="[
                      'text-xs',
                      isDarkMode ? 'text-gray-400' : 'text-gray-500',
                    ]"
                  >
                    Up to 500 files, max 500MB per file
                  </p>
                </div>
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  @change="handleFileSelect"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  class="hidden"
                />
              </div>

              <!-- Selected Files Preview with Grid Layout -->
              <div v-if="selectedFiles.length > 0" class="mt-4">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-medium text-gray-700">
                    Selected Files ({{ selectedFiles.length }})
                  </p>
                  <p class="text-xs text-gray-500">
                    <span class="mr-2">✋ Drag to reorder</span>
                  </p>
                </div>

                <div
                  class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                >
                  <div
                    v-for="(file, index) in selectedFiles"
                    :key="index"
                    draggable="true"
                    @dragstart="handleSelectedDragStart(index)"
                    @dragover.prevent
                    @drop="handleSelectedDrop(index)"
                    @dragenter="handleSelectedDragEnter(index)"
                    @dragleave="handleSelectedDragLeave"
                    :class="[
                      'relative group cursor-move rounded-xl overflow-hidden transition-all duration-300 transform',
                      draggedSelectedIndex === index
                        ? 'opacity-50 scale-95 rotate-2'
                        : 'hover:scale-105 hover:shadow-2xl',
                      dragOverSelectedIndex === index
                        ? 'ring-4 ring-green-400 shadow-lg shadow-green-500/50 scale-105'
                        : isDarkMode
                          ? 'bg-gray-800 border border-gray-700 hover:border-yellow-500/50'
                          : 'bg-white border border-gray-200 hover:border-yellow-500/50 shadow-md',
                    ]"
                  >
                    <!-- Image Preview or File Icon -->
                    <div
                      :class="[
                        'aspect-square flex items-center justify-center relative overflow-hidden',
                        isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
                      ]"
                    >
                      <img
                        v-if="isImageFile(file.name)"
                        :src="getFilePreviewUrl(file)"
                        :alt="file.name"
                        class="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                        @click="
                          openImageViewer(getFilePreviewUrl(file), file.name)
                        "
                      />
                      <div
                        v-else
                        class="flex flex-col items-center justify-center p-4"
                      >
                        <svg
                          :class="[
                            'w-16 h-16 transition-all duration-300 group-hover:scale-110',
                            isDarkMode ? 'text-gray-600' : 'text-gray-400',
                          ]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        <p
                          :class="[
                            'text-xs mt-2 text-center truncate w-full font-medium',
                            isDarkMode ? 'text-gray-400' : 'text-gray-500',
                          ]"
                        >
                          {{ getFileExtension(file.name) }}
                        </p>
                      </div>

                      <!-- Overlay on hover -->
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>

                      <!-- Drag Handle Icon -->
                      <div
                        :class="[
                          'absolute top-2 left-2 rounded-lg p-1.5 backdrop-blur-sm transition-all duration-300',
                          isDarkMode
                            ? 'bg-gray-800/90 group-hover:bg-yellow-500/90'
                            : 'bg-white/90 group-hover:bg-yellow-500/90',
                        ]"
                      >
                        <svg
                          :class="[
                            'w-4 h-4 transition-colors duration-300',
                            isDarkMode
                              ? 'text-gray-300 group-hover:text-gray-900'
                              : 'text-gray-600 group-hover:text-white',
                          ]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 8h16M4 16h16"
                          />
                        </svg>
                      </div>

                      <!-- Zoom Icon for Images -->
                      <button
                        v-if="isImageFile(file.name)"
                        type="button"
                        @click="
                          openImageViewer(getFilePreviewUrl(file), file.name)
                        "
                        class="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        title="View full size"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </button>

                      <!-- Index Badge -->
                      <div
                        class="absolute bottom-2 left-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg"
                      >
                        #{{ index + 1 }}
                      </div>
                    </div>

                    <!-- File Info -->
                    <div
                      :class="['p-3', isDarkMode ? 'bg-gray-800' : 'bg-white']"
                    >
                      <p
                        :class="[
                          'text-xs font-medium truncate mb-2',
                          isDarkMode ? 'text-gray-200' : 'text-gray-700',
                        ]"
                        :title="file.name"
                      >
                        {{ getCleanFilename(file.name) }}
                      </p>
                      <div class="flex items-center justify-between">
                        <span
                          :class="[
                            'text-xs font-medium px-2 py-1 rounded-full',
                            isDarkMode
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-600',
                          ]"
                        >
                          {{ formatFileSize(file.size) }}
                        </span>
                        <button
                          type="button"
                          @click="removeSelectedFile(index)"
                          class="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-yellow-700 hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                          title="Remove file"
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Manual File Entry Section -->
              <div
                v-for="(manualFile, index) in manualFiles"
                :key="'manual-' + index"
                :class="[
                  'p-4 rounded-lg border mb-3 mt-4',
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-gray-50 border-gray-200',
                ]"
              >
                <div class="flex items-start gap-3">
                  <div class="flex-1 space-y-3">
                    <div>
                      <label
                        :class="[
                          'block text-xs font-medium mb-1',
                          isDarkMode ? 'text-gray-300' : 'text-gray-700',
                        ]"
                      >
                        Name
                      </label>
                      <input
                        v-model="manualFile.name"
                        type="text"
                        placeholder="Enter file name (e.g., product-image.jpg)"
                        :class="[
                          'w-full px-3 py-2 border rounded-md text-sm transition-colors duration-200',
                          isDarkMode
                            ? 'bg-gray-900 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500',
                        ]"
                      />
                    </div>
                    <div>
                      <label
                        :class="[
                          'block text-xs font-medium mb-1',
                          isDarkMode ? 'text-gray-300' : 'text-gray-700',
                        ]"
                      >
                        Url
                      </label>
                      <input
                        v-model="manualFile.url"
                        type="url"
                        placeholder="https://example.com/path/to/file.jpg"
                        :class="[
                          'w-full px-3 py-2 border rounded-md text-sm transition-colors duration-200',
                          isDarkMode
                            ? 'bg-gray-900 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500',
                        ]"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="removeManualFile(index)"
                    class="mt-6 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-black rounded-md hover:from-red-600 hover:to-red-700 transition-all duration-200 text-sm font-medium"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>

              <!-- Uploaded Files (Existing) with Drag & Drop Reordering -->
              <div
                v-if="formData.files && formData.files.length > 0"
                class="mt-4"
              >
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-medium text-gray-700">
                    Uploaded Files ({{ formData.files.length }})
                  </p>
                  <p class="text-xs text-gray-500">
                    <span class="mr-2">✋ Drag to reorder</span>
                  </p>
                </div>

                <div
                  class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                >
                  <div
                    v-for="(file, index) in formData.files"
                    :key="file.url"
                    draggable="true"
                    @dragstart="handleDragStart(index)"
                    @dragover.prevent
                    @drop="handleDrop(index)"
                    @dragenter="handleDragEnter(index)"
                    @dragleave="handleDragLeave"
                    :class="[
                      'relative group cursor-move rounded-xl overflow-hidden transition-all duration-300 transform',
                      draggedIndex === index
                        ? 'opacity-50 scale-95 rotate-2'
                        : 'hover:scale-105 hover:shadow-2xl',
                      dragOverIndex === index
                        ? 'ring-4 ring-green-400 shadow-lg shadow-green-500/50 scale-105'
                        : isDarkMode
                          ? 'bg-gray-800 border border-gray-700 hover:border-purple-500/50'
                          : 'bg-white border border-gray-200 hover:border-purple-500/50 shadow-md',
                    ]"
                  >
                    <!-- Image Preview or File Icon -->
                    <div
                      :class="[
                        'aspect-square flex items-center justify-center relative overflow-hidden',
                        isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
                      ]"
                    >



                      <img
                        v-if="isImageFile(file.name)"
                        :src="cleanImageUrl(file.url)"
                        :alt="getCleanFilename(file.name)"
                        class="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                        @click="openImageViewer(file.url, file.name)"
                        @error="
                          (e) => {
                            console.error('Image load error:', file.url);
                            e.target.style.display = 'none';
                          }
                        "
                        loading="lazy"
                      />
                      <div
                        v-else
                        class="flex flex-col items-center justify-center p-4"
                      >
                        <svg
                          :class="[
                            'w-16 h-16 transition-all duration-300 group-hover:scale-110',
                            isDarkMode ? 'text-gray-600' : 'text-gray-400',
                          ]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        <p
                          :class="[
                            'text-xs mt-2 text-center truncate w-full font-medium',
                            isDarkMode ? 'text-gray-400' : 'text-gray-500',
                          ]"
                        >
                          {{ getFileExtension(file.name) }}
                        </p>
                      </div>

                      <!-- Overlay on hover -->
                      <div
                        class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>

                      <!-- Drag Handle Icon -->
                      <div
                        :class="[
                          'absolute top-2 left-2 rounded-lg p-1.5 backdrop-blur-sm transition-all duration-300',
                          isDarkMode
                            ? 'bg-gray-800/90 group-hover:bg-purple-500/90'
                            : 'bg-white/90 group-hover:bg-purple-500/90',
                        ]"
                      >
                        <svg
                          :class="[
                            'w-4 h-4 transition-colors duration-300',
                            isDarkMode
                              ? 'text-gray-300 group-hover:text-white'
                              : 'text-gray-600 group-hover:text-white',
                          ]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 8h16M4 16h16"
                          />
                        </svg>
                      </div>

                      <!-- Zoom Icon for Images -->
                      <button
                        v-if="isImageFile(file.name)"
                        type="button"
                        @click="openImageViewer(file.url, file.name)"
                        class="absolute top-2 right-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        title="View full size"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </button>

                      <!-- Index Badge -->
                      <div
                        class="absolute bottom-2 left-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
                      >
                        #{{ index + 1 }}
                      </div>
                    </div>

                    <!-- File Info -->
                    <div
                      :class="['p-3', isDarkMode ? 'bg-gray-800' : 'bg-white']"
                    >
                      <p
                        :class="[
                          'text-xs font-medium truncate mb-2',
                          isDarkMode ? 'text-gray-200' : 'text-gray-700',
                        ]"
                        :title="file.name"
                      >
                        {{ getCleanFilename(file.name) }}
                      </p>
                      <div class="flex items-center justify-between">
                        <span
                          :class="[
                            'text-xs font-medium px-2 py-1 rounded-full',
                            isDarkMode
                              ? 'bg-purple-900/50 text-purple-300'
                              : 'bg-purple-100 text-purple-600',
                          ]"
                        >
                          Uploaded
                        </span>
                        <button
                          type="button"
                          @click="removeUploadedFile(index)"
                          class="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-black hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                          title="Remove file"
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-4 pt-4 border-t border-gray-700">
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 px-6 py-3 font-medium rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/50"
              >
                {{
                  loading
                    ? isEditing
                      ? "Saving..."
                      : "Submitting..."
                    : isEditing
                      ? "Save Changes"
                      : "Submit Content"
                }}
              </button>
              <button
                type="button"
                @click="clearForm"
                class="px-6 py-3 border font-medium rounded-md transition-colors duration-200 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                <span class="mr-1">↻</span> Clear
              </button>
            </div>
          </form>
        </div>
        <!-- List of Content Section -->
        <div
          class="rounded-xl bg-black/40 backdrop-blur-sm border border-cyan-500/30"
        >
          <div
            class="px-6 py-4 border-b border-cyan-500/30 justify-between flex items-center"
          >
            <h2
              class="text-xl font-extralight tracking-[0.2em] uppercase mb-1 text-cyan-400"
            >
              Content List
            </h2>

            <!-- Add New Content Button -->
            <button
              v-if="!showForm"
              @click="openNewContentForm"
              class="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-cyan-500 text-white hover:bg-cyan-600"
            >
              <i class="fas fa-plus"></i>
              Add New Content
            </button>
          </div>

          <!-- Search Bar -->
          <div class="px-6 py-4">
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <i class="fas fa-search text-gray-500"></i>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by title, or filters..."
                class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-600 bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-xs font-extralight uppercase mb-1 text-white"
              />
              <!-- Clear Search Button -->
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-cyan-400"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <div class="px-6 pb-6">
            <!-- Loading State -->
            <div v-if="loading && !posts.length" class="text-center py-8">
              <div
                class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"
              ></div>
              <p class="mt-2 text-sm text-gray-600">Loading content...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="!posts.length" class="text-center py-8">
              <p class="text-gray-500">
                No content available. Create your first post above!
              </p>
            </div>

            <!-- No Search Results -->
            <div
              v-else-if="searchQuery && !filteredPosts.length"
              class="text-center py-12"
            >
              <svg
                :class="[
                  'w-16 h-16 mx-auto mb-4',
                  isDarkMode ? 'text-gray-600' : 'text-gray-400',
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3
                :class="[
                  'text-lg font-semibold mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700',
                ]"
              >
                No results found
              </h3>
              <p :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">
                Try searching with different keywords
              </p>
            </div>

            <!-- Content Table -->
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-700">
                <thead class="bg-gray-800/50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-normal uppercase tracking-wider text-cyan-400"
                    >
                      Title
                    </th>
                    <th
                      v-if="canSeeApprovalStatus"
                      class="px-6 py-3 text-left text-xs font-normal uppercase tracking-wider text-cyan-400"
                    >
                      Approval Status
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-normal uppercase tracking-wider text-cyan-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-black/20 divide-y divide-gray-700">
                  <tr
                    v-for="post in filteredPosts"
                    :key="post.id"
                    class="transition-colors hover:bg-gray-800/50"
                  >
                    <td class="px-6 py-4">
                      <div class="text-sm text-white font-extralight">
                        {{ post.title }}
                      </div>
                    </td>

                    <td v-if="canSeeApprovalStatus" class="px-6 py-4">
                      <div class="flex items-center space-x-3">
                        <label
                          v-for="status in approvalStatuses"
                          :key="status.value"
                          class="flex items-center space-x-1 cursor-pointer"
                        >
                          <input
                            type="radio"
                            :value="status.value"
                            :checked="post.approval_status === status.value"
                            @change="
                              updateApprovalStatus(post.id, status.value)
                            "
                            class="border-gray-600 text-cyan-500 focus:ring-cyan-500 bg-gray-700 transition-colors"
                          />
                          <span
                            class="text-xs whitespace-nowrap text-gray-300 font-extralight uppercase"
                            >{{ status.label }}</span
                          >
                        </label>
                      </div>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-extralight"
                    >
                      <button
                        @click="editPost(post)"
                        class="mr-3 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <i class="fa fa-pencil"></i>
                      </button>
                      <button
                        @click="confirmDelete(post.id)"
                        class="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Viewer Modal -->
    <Teleport to="body">
      <div
        v-if="imageViewerOpen"
        @click="closeImageViewer"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      >
        <div class="relative max-w-7xl max-h-screen" @click.stop>
          <!-- Close Button -->
          <button
            @click="closeImageViewer"
            class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Image Title -->
          <div class="absolute -top-12 left-0 text-white text-sm">
            {{ currentImageName }}
          </div>

          <!-- Zoom Controls -->
          <div
            class="absolute top-4 right-4 flex gap-2 bg-black/50 rounded-lg p-2"
          >
            <button
              @click.stop="zoomOut"
              class="text-white hover:text-gray-300 p-2 bg-white/10 rounded"
              title="Zoom Out"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                />
              </svg>
            </button>
            <button
              @click.stop="resetZoom"
              class="text-white hover:text-gray-300 p-2 bg-white/10 rounded text-xs font-medium"
              title="Reset Zoom"
            >
              {{ Math.round(zoomLevel * 100) }}%
            </button>
            <button
              @click.stop="zoomIn"
              class="text-white hover:text-gray-300 p-2 bg-white/10 rounded"
              title="Zoom In"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </button>
          </div>

          <!-- Image -->
          <div class="overflow-auto max-h-screen">
            <img
              :src="currentImageUrl"
              :alt="currentImageName"
              :style="{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center',
              }"
              class="max-w-full h-auto transition-transform duration-200 cursor-zoom-in"
              @click.stop="zoomIn"
            />
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast Notifications -->
    <Teleport to="body">
      <div class="fixed top-4 right-4 z-50 space-y-2">
        <!-- Toast Messages -->
        <TransitionGroup name="toast">
          <div
            v-for="toast in toasts"
            :key="toast.id"
            :class="[
              'min-w-[300px] max-w-md rounded-lg shadow-lg border p-4 flex items-start gap-3 transition-all duration-300',
              toast.type === 'success' &&
                (isDarkMode
                  ? 'bg-gray-800 border-green-500/50 text-green-400'
                  : 'bg-white border-green-500 text-green-700'),
              toast.type === 'error' &&
                (isDarkMode
                  ? 'bg-gray-800 border-red-500/50 text-red-400'
                  : 'bg-white border-red-500 text-red-700'),
              toast.type === 'confirm' &&
                (isDarkMode
                  ? 'bg-gray-800 border-yellow-500/50 text-yellow-400'
                  : 'bg-white border-yellow-500 text-yellow-700'),
            ]"
          >
            <!-- Icon -->
            <div class="flex-shrink-0">
              <!-- Success Icon -->
              <svg
                v-if="toast.type === 'success'"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <!-- Error Icon -->
              <svg
                v-else-if="toast.type === 'error'"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>

              <!-- Warning Icon (for confirm) -->
              <svg
                v-else
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <!-- Content -->
            <div class="flex-1">
              <p class="text-sm font-medium">{{ toast.message }}</p>

              <!-- Confirm Buttons -->
              <div v-if="toast.type === 'confirm'" class="mt-3 flex gap-2">
                <button
                  @click="toast.onConfirm"
                  :class="[
                    'px-3 py-1 text-xs font-medium rounded transition-colors',
                    isDarkMode
                      ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                      : 'bg-yellow-600 text-white hover:bg-yellow-700',
                  ]"
                >
                  Yes, Delete
                </button>
                <button
                  @click="toast.onCancel"
                  :class="[
                    'px-3 py-1 text-xs font-medium rounded transition-colors',
                    isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                  ]"
                >
                  Cancel
                </button>
              </div>
            </div>

            <!-- Close Button (for non-confirm toasts) -->
            <button
              v-if="toast.type !== 'confirm'"
              @click="removeToast(toast.id)"
              :class="[
                'flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors',
                isDarkMode && 'hover:text-gray-200',
              ]"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* Toast animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}
</style>

<script setup>
import moment from "moment";
import { useImageUrl } from "~/composables/useImageUrl";

const { cleanImageUrl } = useImageUrl();
const { user, init } = useAuth();

onMounted(() => {
  init();
});

const {
  posts,
  loading,
  error,
  loadPosts,
  createPost,
  updatePost,
  deletePost,
  uploadMultipleFiles,
} = useCMS();

// Form state
const formData = ref({
  content_id: "CMS" + moment().valueOf(),
  title: "",
  authors: "jorenleeluna24@gmail.com, info@techsavvies.space",
  filters: {
    category: "",
    tagline: "",
    course_level: "",
    course_duration: "",
    course_type: "",
    project_client: "",
    project_status: "",
    project_year: "",
  },
  descriptions: "",
  approval_status: "pending",
  links: [],
  files: [],
  logs: [],
});

const selectedFiles = ref([]);
const manualFiles = ref([]);
const isDragging = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const successMessage = ref("");
const fileInput = ref(null);

// Search state
const searchQuery = ref("");

// Form visibility state
const showForm = ref(false);

// Theme state
const isDarkMode = ref(false);

// Toast notification state
const toasts = ref([]);
let toastIdCounter = 0;

// Image viewer state
const imageViewerOpen = ref(false);
const currentImageUrl = ref("");
const currentImageName = ref("");
const zoomLevel = ref(1);

// Drag and drop state for reordering uploaded files
const draggedIndex = ref(null);
const dragOverIndex = ref(null);

// Drag and drop state for reordering selected files
const draggedSelectedIndex = ref(null);
const dragOverSelectedIndex = ref(null);

const categoryOptions = ["News and update", "Courses", "Featured Projects"];
const categoryFieldConfig = {
  "News and update": [
    { key: "tagline", label: "Tagline", placeholder: "Enter news tagline" },
  ],
  Courses: [
    { key: "tagline", label: "Tagline", placeholder: "Enter course tagline" },
    { key: "course_level", label: "Course Level", placeholder: "Beginner / Intermediate / Advanced" },
    { key: "course_duration", label: "Course Duration", placeholder: "e.g. 8 weeks" },
    { key: "course_type", label: "Course Type", placeholder: "Online / Hybrid / Onsite" },
  ],
  "Featured Projects": [
    { key: "tagline", label: "Tagline", placeholder: "Enter project tagline" },
    { key: "project_client", label: "Project Client", placeholder: "Who is the client?" },
    { key: "project_status", label: "Project Status", placeholder: "Ongoing / Completed" },
    { key: "project_year", label: "Project Year", placeholder: "e.g. 2026" },
  ],
};

const createEmptyFilters = () => ({
  category: "",
  tagline: "",
  course_level: "",
  course_duration: "",
  course_type: "",
  project_client: "",
  project_status: "",
  project_year: "",
});

const parseLegacyFilters = (rawFilters) => {
  if (!rawFilters) {
    return createEmptyFilters();
  }

  if (typeof rawFilters === "object") {
    return {
      ...createEmptyFilters(),
      ...rawFilters,
    };
  }

  const parsed = createEmptyFilters();
  const parts = String(rawFilters)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (parts.length > 0) {
    parsed.category = parts[0];
  }
  return parsed;
};

const normalizeFiltersForSubmit = (filters) => {
  const parsed = parseLegacyFilters(filters);
  const category = parsed.category;

  if (!category) {
    return {};
  }

  const allowedKeys = (categoryFieldConfig[category] || []).map((item) => item.key);
  const normalized = { category };
  allowedKeys.forEach((key) => {
    if (parsed[key]) {
      normalized[key] = parsed[key];
    }
  });
  return normalized;
};

const activeCategoryFields = computed(() => {
  const category = formData.value?.filters?.category || "";
  return categoryFieldConfig[category] || [];
});

// Approval statuses
const approvalStatuses = [
  { value: "unpublished", label: "Unpublished" },
  { value: "published", label: "Published" },
];

// Check if current user can see approval status
const canSeeApprovalStatus = computed(() => {
  return user.value?.email === "jorenleeluna24@gmail.com";
});

// Theme toggle function
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  // Save preference to localStorage
  localStorage.setItem("cms-theme", isDarkMode.value ? "dark" : "light");
};

// Toast notification functions
const showToast = (message, type = "success", duration = 3000) => {
  const id = ++toastIdCounter;
  toasts.value.push({ id, message, type });

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }

  return id;
};

const removeToast = (id) => {
  const index = toasts.value.findIndex((t) => t.id === id);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
};

const showConfirmToast = (message, onConfirm) => {
  const id = ++toastIdCounter;

  const handleConfirm = async () => {
    removeToast(id);
    await onConfirm();
  };

  const handleCancel = () => {
    removeToast(id);
  };

  toasts.value.push({
    id,
    message,
    type: "confirm",
    onConfirm: handleConfirm,
    onCancel: handleCancel,
  });
};

// Computed: Filtered posts based on search query
const filteredPosts = computed(() => {
  if (!searchQuery.value.trim()) {
    return posts.value;
  }

  const query = searchQuery.value.toLowerCase().trim();

  return posts.value.filter((post) => {
    // Search in title
    const titleMatch = post.title?.toLowerCase().includes(query);

    // Search in authors
    const authorsMatch = post.authors?.toLowerCase().includes(query);

    const filtersSearchable =
      typeof post.filters === "object"
        ? JSON.stringify(post.filters).toLowerCase()
        : String(post.filters || "").toLowerCase();
    const filtersMatch = filtersSearchable.includes(query);

    // Search in descriptions
    const descriptionsMatch = post.descriptions?.toLowerCase().includes(query);

    // Search in approval status
    const statusMatch = post.approval_status?.toLowerCase().includes(query);

    return (
      titleMatch ||
      authorsMatch ||
      filtersMatch ||
      descriptionsMatch ||
      statusMatch
    );
  });
});

// Load posts on mount
onMounted(async () => {
  await loadPosts();

  // Load theme preference
  const savedTheme = localStorage.getItem("cms-theme");
  if (savedTheme === "dark") {
    isDarkMode.value = true;
  }

  // Add keyboard shortcuts for image viewer
  window.addEventListener("keydown", handleKeyPress);
});

// Cleanup on unmount
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyPress);
  document.body.style.overflow = "";
});

// Keyboard shortcuts
const handleKeyPress = (event) => {
  if (!imageViewerOpen.value) return;

  switch (event.key) {
    case "Escape":
      closeImageViewer();
      break;
    case "+":
    case "=":
      zoomIn();
      break;
    case "-":
      zoomOut();
      break;
    case "0":
      resetZoom();
      break;
  }
};

// File handling
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files || []);
  selectedFiles.value.push(...files);
};

const handleFileDrop = (event) => {
  isDragging.value = false;
  const files = Array.from(event.dataTransfer.files || []);
  selectedFiles.value.push(...files);
};

const removeSelectedFile = (index) => {
  selectedFiles.value.splice(index, 1);
};

const removeUploadedFile = (index) => {
  formData.value.files.splice(index, 1);
};

// Manual file entry functions
const addManualFile = () => {
  manualFiles.value.push({ name: "", url: "" });
};

const removeManualFile = (index) => {
  manualFiles.value.splice(index, 1);
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

// Check if file is an image
const isImageFile = (filename) => {
  if (!filename) return false;

  // Remove query parameters first
  const cleanFilename = filename.split("?")[0];

  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".svg",
    ".bmp",
  ];
  const ext = cleanFilename
    .toLowerCase()
    .substring(cleanFilename.lastIndexOf("."));
  return imageExtensions.includes(ext);
};

// Get file extension
const getFileExtension = (filename) => {
  if (!filename) return "";

  // Remove query parameters first
  const cleanFilename = filename.split("?")[0];

  const ext = cleanFilename
    .substring(cleanFilename.lastIndexOf(".") + 1)
    .toUpperCase();
  return ext;
};

// Clean filename - extract only filename up to extension, remove query params and hashes
const getCleanFilename = (filename) => {
  if (!filename) return "";

  // First, remove query parameters (everything after ?)
  let cleanName = filename.split("?")[0];

  // Extract the actual filename from URL path if it's a full URL
  if (cleanName.includes("/")) {
    cleanName = cleanName.split("/").pop();
  }

  // Pattern to match: filename_HASH.extension or just filename.extension
  // This will extract the first occurrence of a valid filename with extension
  // Examples:
  // "615253807_122115229365105864_504322.jpg" -> "615253807.jpg"
  // "photo_12345678901234567890.png" -> "photo.png"
  // "document.pdf" -> "document.pdf"

  // Try to find pattern: anything before underscore + extension
  const underscoreMatch = cleanName.match(/^([^_]+)_.*?\.([a-zA-Z0-9]+)$/);
  if (underscoreMatch) {
    return `${underscoreMatch[1]}.${underscoreMatch[2]}`;
  }

  // If no underscore pattern, just get filename.extension (remove any hash after extension)
  const simpleMatch = cleanName.match(/^(.+?)\.([a-zA-Z0-9]+)/);
  if (simpleMatch) {
    return `${simpleMatch[1]}.${simpleMatch[2]}`;
  }

  // If no extension found, return the cleaned name
  return cleanName;
};

// Handle image loading errors
const handleImageError = (event, file) => {
  console.error("Image failed to load:", {
    url: file.url,
    name: file.name,
    error: event,
  });
  // Set a placeholder or retry logic here if needed
  event.target.src =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EError%3C/text%3E%3C/svg%3E';
};

// Image Viewer Functions
const openImageViewer = (url, name) => {
  currentImageUrl.value = url;
  currentImageName.value = name;
  imageViewerOpen.value = true;
  zoomLevel.value = 1;
  // Prevent body scroll when modal is open
  document.body.style.overflow = "hidden";
};

const closeImageViewer = () => {
  imageViewerOpen.value = false;
  currentImageUrl.value = "";
  currentImageName.value = "";
  zoomLevel.value = 1;
  // Restore body scroll
  document.body.style.overflow = "";
};

const zoomIn = () => {
  if (zoomLevel.value < 3) {
    zoomLevel.value += 0.25;
  }
};

const zoomOut = () => {
  if (zoomLevel.value > 0.5) {
    zoomLevel.value -= 0.25;
  }
};

const resetZoom = () => {
  zoomLevel.value = 1;
};

// Drag and Drop Reordering Functions for Uploaded Files
const handleDragStart = (index) => {
  draggedIndex.value = index;
};

const handleDragEnter = (index) => {
  dragOverIndex.value = index;
};

const handleDragLeave = () => {
  // Small delay to prevent flickering
  setTimeout(() => {
    dragOverIndex.value = null;
  }, 50);
};

const handleDrop = (dropIndex) => {
  if (draggedIndex.value === null || draggedIndex.value === dropIndex) {
    draggedIndex.value = null;
    dragOverIndex.value = null;
    return;
  }

  // Reorder the files array
  const files = [...formData.value.files];
  const draggedFile = files[draggedIndex.value];

  // Remove from old position
  files.splice(draggedIndex.value, 1);

  // Insert at new position
  files.splice(dropIndex, 0, draggedFile);

  // Update formData
  formData.value.files = files;

  // Reset drag state
  draggedIndex.value = null;
  dragOverIndex.value = null;
};

// Drag and Drop Reordering Functions for Selected Files
const handleSelectedDragStart = (index) => {
  draggedSelectedIndex.value = index;
};

const handleSelectedDragEnter = (index) => {
  dragOverSelectedIndex.value = index;
};

const handleSelectedDragLeave = () => {
  setTimeout(() => {
    dragOverSelectedIndex.value = null;
  }, 50);
};

const handleSelectedDrop = (dropIndex) => {
  if (
    draggedSelectedIndex.value === null ||
    draggedSelectedIndex.value === dropIndex
  ) {
    draggedSelectedIndex.value = null;
    dragOverSelectedIndex.value = null;
    return;
  }

  // Reorder the selected files array
  const files = [...selectedFiles.value];
  const draggedFile = files[draggedSelectedIndex.value];

  // Remove from old position
  files.splice(draggedSelectedIndex.value, 1);

  // Insert at new position
  files.splice(dropIndex, 0, draggedFile);

  // Update selectedFiles
  selectedFiles.value = files;

  // Reset drag state
  draggedSelectedIndex.value = null;
  dragOverSelectedIndex.value = null;
};

// Get preview URL for File object
const getFilePreviewUrl = (file) => {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  return file.url || "";
};

// Links handling
const addLink = () => {
  if (!formData.value.links) {
    formData.value.links = [];
  }
  formData.value.links.push("");
};

const removeLink = (index) => {
  formData.value.links.splice(index, 1);
};

// Form submission
const handleSubmit = async () => {
  try {
    successMessage.value = "";
    error.value = "";

    console.log("=== FORM SUBMISSION START ===");
    console.log(
      "Form Data Before Processing:",
      JSON.parse(JSON.stringify(formData.value)),
    );
    console.log("Selected Files:", selectedFiles.value.length);

    // Upload files first if any
    if (selectedFiles.value.length > 0) {
      console.log("Uploading files...");
      const uploadedFiles = await uploadMultipleFiles(selectedFiles.value);
      console.log("Uploaded files:", uploadedFiles);

      if (!formData.value.files) {
        formData.value.files = [];
      }
      formData.value.files.push(...uploadedFiles);
      selectedFiles.value = [];
    }

    // Add manual files to formData.files
    if (manualFiles.value.length > 0) {
      console.log("Adding manual files...");
      const validManualFiles = manualFiles.value.filter(
        (file) => file.name && file.url,
      );
      console.log("Valid manual files:", validManualFiles);

      if (!formData.value.files) {
        formData.value.files = [];
      }
      formData.value.files.push(...validManualFiles);
      manualFiles.value = [];
    }

    // Filters are already auto-generated via computedFilters and watch
    // No need to manually build filters here anymore

    // Prepare final data
    const submitData = {
      ...formData.value,
      filters: normalizeFiltersForSubmit(formData.value.filters),
      // Ensure JSON fields are properly formatted
      links: formData.value.links || [],
      files: formData.value.files || [],
      logs: formData.value.logs || [],
    };

    console.log("Final Submit Data:", JSON.parse(JSON.stringify(submitData)));

    // Create or update post
    if (isEditing.value && editingId.value) {
      console.log("Updating post:", editingId.value);
      await updatePost(editingId.value, submitData);
      showToast("Content updated successfully!", "success");
    } else {
      console.log("Creating new post...");
      const response = await createPost(submitData);
      console.log("Create response:", response);
      showToast("Content created successfully!", "success");
    }

    // Clear form and reload
    clearForm();
    await loadPosts();
  } catch (err) {
    console.error("=== FORM SUBMISSION ERROR ===");
    console.error("Error:", err);
    console.error("Error message:", err.message);
    console.error("Error data:", err.data);

    // Display error to user
    let errorMessage = "Failed to submit form";
    if (err.data && err.data.errors) {
      errorMessage = "Validation errors: " + JSON.stringify(err.data.errors);
    } else if (err.message) {
      errorMessage = err.message;
    }

    showToast(errorMessage, "error", 5000);
  }
};

// Edit post
const editPost = (post) => {
  isEditing.value = true;
  editingId.value = post.id;
  showForm.value = true; // Show the form when editing

  formData.value = {
    content_id: post.content_id || "",
    title: post.title || "",
    authors: post.authors || "",
    filters: parseLegacyFilters(post.filters),
    descriptions: post.descriptions || "",
    date: post.date || "",
    links: post.links || [],
    files: post.files || [],
    logs: post.logs || [],
  };

  // Scroll to form
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Delete post
const confirmDelete = async (id) => {
  showConfirmToast(
    "Are you sure you want to delete this content?",
    async () => {
      try {
        await deletePost(id);
        showToast("Content deleted successfully!", "success");
        await loadPosts();
      } catch (err) {
        console.error("Delete error:", err);
        showToast("Failed to delete content", "error");
      }
    },
  );
};

// Update approval status
const updateApprovalStatus = async (id, status) => {
  try {
    console.log("Updating approval status:", id, status);
    await updatePost(id, { approval_status: status });
    showToast(`Approval status updated to ${status}!`, "success");
    await loadPosts();
  } catch (err) {
    console.error("Update approval status error:", err);
    showToast("Failed to update approval status", "error");
  }
};

// Open new content form
const openNewContentForm = () => {
  clearForm();
  showForm.value = true;
};

// Clear form
const clearForm = () => {
  isEditing.value = false;
  editingId.value = null;
  selectedFiles.value = [];
  manualFiles.value = [];
  formData.value = {
    content_id: "CMS" + moment().valueOf(),
    title: "",
    authors: "jorenleeluna24@gmail.com, info@techsavvies.space",
    filters: createEmptyFilters(),
    descriptions: "",
    date: "",
    approval_status: "pending",
    links: [],
    files: [],
    logs: [],
  };

  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

// Helper function to detect if a URL is a video link
const isVideoUrl = (url) => {
  if (!url) return false;
  const videoPatterns = [
    /youtube\.com\/watch/i,
    /youtube\.com\/embed/i,
    /youtube\.com\/shorts/i,
    /youtu\.be\//i,
    /facebook\.com\/.*\/videos/i,
    /facebook\.com\/share\/r\//i, // Facebook Reels share links
    /facebook\.com\/share\/v\//i, // Facebook video share links
    /fb\.watch/i,
    /facebook\.com\/reel/i,
    /instagram\.com\/reel/i,
    /vimeo\.com/i,
    /tiktok\.com/i,
  ];
  return videoPatterns.some((pattern) => pattern.test(url));
};

// Helper function to convert video URLs to embed format
const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";

  // YouTube - handle various formats including Shorts
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    // Already an embed URL
    if (url.includes("/embed/")) {
      return url;
    }

    // Extract video ID from various YouTube URL formats
    let videoId = "";

    // Format: https://youtu.be/VIDEO_ID
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0].split("&")[0];
    }
    // Format: https://www.youtube.com/shorts/VIDEO_ID
    else if (url.includes("/shorts/")) {
      videoId = url.split("/shorts/")[1].split("?")[0].split("&")[0];
    }
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }
    // Format: https://www.youtube.com/watch?list=...&v=VIDEO_ID
    else if (url.includes("&v=")) {
      videoId = url.split("&v=")[1].split("&")[0];
    }

    // If we found a video ID, return the embed URL
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  // Facebook Video/Reel - handle all formats including share links
  if (url.includes("facebook.com") || url.includes("fb.watch")) {
    // For share links like https://www.facebook.com/share/r/1RX7NaNFHe/
    // We need to use the Facebook video plugin which handles all types
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=734`;
  }

  // Instagram Reel
  if (url.includes("instagram.com/reel")) {
    const reelId = url.split("/reel/")[1]?.split("/")[0];
    if (reelId) {
      return `https://www.instagram.com/reel/${reelId}/embed`;
    }
  }

  // Vimeo
  if (url.includes("vimeo.com")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}`;
    }
  }

  // Return original URL if we couldn't parse it
  return url;
};
</script>

<style scoped>
/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth transitions for drag and drop */
.cursor-move {
  cursor: move;
}

/* Image viewer animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fixed.inset-0 {
  animation: fadeIn 0.2s ease-in-out;
}

/* Prevent text selection during drag */
[draggable="true"] {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
