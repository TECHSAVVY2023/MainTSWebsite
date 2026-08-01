<template>
  <div class="space-y-6 font-[Roboto,sans-serif] text-[#1a0533]">
    <!-- Header Card -->
    <div class="rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-black uppercase tracking-tight text-[#1a0533]">
              Main Page Content Manager
            </h2>
            <span
              class="inline-flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700"
            >
              <i class="fas fa-shield-alt text-[10px]" />
              {{ userRole }}
            </span>
          </div>
          <p class="mt-1 text-xs font-medium text-slate-500">
            Control content dynamically displayed on the main landing page sections: Featured Projects, Event Reminders, and Sponsors & Partners.
          </p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex h-64 items-center justify-center rounded-2xl border border-violet-100 bg-white">
      <div class="flex flex-col items-center gap-3">
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
        <p class="text-xs font-bold text-slate-400">Loading main page CMS content…</p>
      </div>
    </div>

    <!-- TAB 1: FEATURED PROJECTS MANAGER -->
    <div v-else-if="activeTab === 'projects'" class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-base font-black uppercase text-[#1a0533]">Featured Projects</h3>
          <p class="text-xs text-slate-500">Manage ecommerce websites & community projects highlighted on the homepage.</p>
        </div>
        <button
          v-if="canManage"
          type="button"
          @click="openProjectModal()"
          class="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-emerald-600"
        >
          <i class="fas fa-plus" /> Add Project
        </button>
      </div>

      <!-- Projects Grid/Table -->
      <div class="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th class="px-4 py-3">Project</th>
              <th class="px-4 py-3">Domain</th>
              <th class="px-4 py-3">Developer</th>
              <th class="px-4 py-3">Status</th>
              <th v-if="canManage" class="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 font-medium">
            <tr v-if="projects.length === 0">
              <td colspan="5" class="px-4 py-8 text-center text-slate-400">
                No featured projects configured yet. Click "Add Project" to add one!
              </td>
            </tr>
            <tr v-for="proj in projects" :key="proj.id || proj.title" class="hover:bg-violet-50/50">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <img
                    :src="proj.image || defaultProjectImage"
                    :alt="proj.title"
                    class="h-10 w-14 rounded-lg object-cover border border-slate-200 bg-slate-100"
                  />
                  <div>
                    <p class="font-bold text-[#1a0533]">{{ proj.title }}</p>
                    <a :href="proj.url" target="_blank" class="text-[11px] text-violet-600 hover:underline">
                      {{ proj.url }} <i class="fas fa-external-link-alt text-[9px]" />
                    </a>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-slate-600">{{ proj.domain || '—' }}</td>
              <td class="px-4 py-3 text-slate-600">{{ proj.developer || 'Tech Savvy Community' }}</td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize"
                  :class="getStatusBadgeClass(proj.approval_status)"
                >
                  <span class="h-1.5 w-1.5 rounded-full" :class="getStatusDotClass(proj.approval_status)" />
                  {{ proj.approval_status || 'approved' }}
                </span>
              </td>
              <td v-if="canManage" class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    @click="openProjectModal(proj)"
                    class="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-violet-100 hover:text-violet-700"
                    title="Edit Project"
                  >
                    <i class="fas fa-edit" />
                  </button>
                  <button
                    type="button"
                    @click="confirmDelete('project', proj.id!, proj.title)"
                    class="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-red-100 hover:text-red-600"
                    title="Delete Project"
                  >
                    <i class="fas fa-trash-alt" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB 2: EVENT REMINDERS MANAGER -->
    <div v-else-if="activeTab === 'events'" class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-base font-black uppercase text-[#1a0533]">Event Reminders & Calendar</h3>
          <p class="text-xs text-slate-500">Manage upcoming community workshops, build nights, and reminders.</p>
        </div>
        <button
          v-if="canManage"
          type="button"
          @click="openEventModal()"
          class="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-emerald-600"
        >
          <i class="fas fa-plus" /> Add Event / Reminder
        </button>
      </div>

      <div class="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th class="px-4 py-3">Event Title</th>
              <th class="px-4 py-3">Date & Time</th>
              <th class="px-4 py-3">Type</th>
              <th class="px-4 py-3">Status</th>
              <th v-if="canManage" class="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 font-medium">
            <tr v-if="eventReminders.length === 0">
              <td colspan="5" class="px-4 py-8 text-center text-slate-400">
                No event reminders configured yet. Click "Add Event / Reminder" to add one!
              </td>
            </tr>
            <tr v-for="evt in eventReminders" :key="evt.id || evt.title" class="hover:bg-violet-50/50">
              <td class="px-4 py-3">
                <p class="font-bold text-[#1a0533]">{{ evt.title }}</p>
                <p v-if="evt.description" class="text-[11px] text-slate-500 line-clamp-1">{{ evt.description }}</p>
              </td>
              <td class="px-4 py-3 text-slate-600">
                <div>
                  <span class="font-bold">{{ evt.date || '—' }}</span>
                  <span v-if="evt.time" class="text-[11px] text-slate-400 block">{{ evt.time }} {{ evt.endTime ? '- ' + evt.endTime : '' }}</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                  :class="evt.kind === 'workshop' ? 'bg-purple-100 text-purple-700' : evt.kind === 'reminder' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'"
                >
                  {{ evt.kind }}
                </span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize"
                  :class="getStatusBadgeClass(evt.approval_status)"
                >
                  <span class="h-1.5 w-1.5 rounded-full" :class="getStatusDotClass(evt.approval_status)" />
                  {{ evt.approval_status || 'approved' }}
                </span>
              </td>
              <td v-if="canManage" class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    @click="openEventModal(evt)"
                    class="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-violet-100 hover:text-violet-700"
                    title="Edit Event"
                  >
                    <i class="fas fa-edit" />
                  </button>
                  <button
                    type="button"
                    @click="confirmDelete('event', evt.id!, evt.title)"
                    class="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-red-100 hover:text-red-600"
                    title="Delete Event"
                  >
                    <i class="fas fa-trash-alt" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB 3: SPONSORS & PARTNERS MANAGER -->
    <div v-else-if="activeTab === 'sponsors'" class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-base font-black uppercase text-[#1a0533]">Sponsors & Community Partners</h3>
          <p class="text-xs text-slate-500">Manage logos and links for official sponsors and ecosystem partners.</p>
        </div>
        <button
          v-if="canManage"
          type="button"
          @click="openSponsorModal()"
          class="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-emerald-600"
        >
          <i class="fas fa-plus" /> Add Sponsor / Partner
        </button>
      </div>

      <div class="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th class="px-4 py-3">Name & Logo</th>
              <th class="px-4 py-3">Tier / Category</th>
              <th class="px-4 py-3">Website Link</th>
              <th class="px-4 py-3">Status</th>
              <th v-if="canManage" class="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 font-medium">
            <tr v-if="allSponsorsPartners.length === 0">
              <td colspan="5" class="px-4 py-8 text-center text-slate-400">
                No sponsors or partners configured yet. Click "Add Sponsor / Partner" to add one!
              </td>
            </tr>
            <tr v-for="sp in allSponsorsPartners" :key="sp.id || sp.name" class="hover:bg-violet-50/50">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <img
                    :src="sp.logoUrl || defaultSponsorLogo"
                    :alt="sp.name"
                    class="h-10 w-10 rounded-full object-contain border border-slate-200 p-1 bg-white"
                  />
                  <span class="font-bold text-[#1a0533]">{{ sp.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                  :class="sp.type === 'partner' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'"
                >
                  {{ sp.type }}
                </span>
              </td>
              <td class="px-4 py-3">
                <a :href="sp.websiteUrl" target="_blank" class="text-[11px] text-violet-600 hover:underline">
                  {{ sp.websiteUrl }} <i class="fas fa-external-link-alt text-[9px]" />
                </a>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize"
                  :class="getStatusBadgeClass(sp.approval_status)"
                >
                  <span class="h-1.5 w-1.5 rounded-full" :class="getStatusDotClass(sp.approval_status)" />
                  {{ sp.approval_status || 'approved' }}
                </span>
              </td>
              <td v-if="canManage" class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    @click="openSponsorModal(sp)"
                    class="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-violet-100 hover:text-violet-700"
                    title="Edit Item"
                  >
                    <i class="fas fa-edit" />
                  </button>
                  <button
                    type="button"
                    @click="confirmDelete('sponsor', sp.id!, sp.name)"
                    class="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-red-100 hover:text-red-600"
                    title="Delete Item"
                  >
                    <i class="fas fa-trash-alt" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL: PROJECT FORM -->
    <div v-if="showProjectModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 class="text-base font-black uppercase text-[#1a0533]">
            {{ editingProject ? 'Edit Featured Project' : 'Add New Featured Project' }}
          </h4>
          <button type="button" @click="showProjectModal = false" class="text-slate-400 hover:text-slate-600">
            <i class="fas fa-times" />
          </button>
        </div>

        <form @submit.prevent="handleProjectSubmit" class="space-y-3 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Project Name *</label>
            <input
              v-model="projectForm.title"
              type="text"
              required
              placeholder="Name of the project"
              class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Domain Name</label>
              <input
                v-model="projectForm.domain"
                type="text"
                placeholder="Domain name"
                class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Developer</label>
              <input
                v-model="projectForm.developer"
                type="text"
                placeholder="Developer name"
                class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Website Link (URL) *</label>
            <input
              v-model="projectForm.url"
              type="url"
              required
              placeholder="Website URL"
              class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Project Image / Logo URL</label>
            <div class="flex gap-2">
              <input
                v-model="projectForm.image"
                type="text"
                placeholder="Project image URL"
                class="flex-1 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
              />
              <label class="cursor-pointer rounded-xl bg-violet-100 px-3 py-2 font-bold text-violet-700 hover:bg-violet-200 flex items-center">
                <i class="fas fa-upload mr-1" /> File
                <input type="file" accept="image/*" class="hidden" @change="handleFileUpload($event, 'project')" />
              </label>
            </div>
          </div>

          <div class="flex justify-end gap-2 border-t border-slate-100 pt-3">
            <button
              type="button"
              @click="showProjectModal = false"
              class="rounded-xl bg-slate-100 px-4 py-2 font-bold text-slate-600 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="rounded-xl bg-violet-600 px-5 py-2 font-bold text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {{ saving ? 'Saving…' : 'Save Project' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: EVENT FORM -->
    <div v-if="showEventModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 class="text-base font-black uppercase text-[#1a0533]">
            {{ editingEvent ? 'Edit Event Reminder' : 'Add New Event Reminder' }}
          </h4>
          <button type="button" @click="showEventModal = false" class="text-slate-400 hover:text-slate-600">
            <i class="fas fa-times" />
          </button>
        </div>

        <form @submit.prevent="handleEventSubmit" class="space-y-3 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Event Title *</label>
            <input
              v-model="eventForm.title"
              type="text"
              required
              placeholder="Event name"
              class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
            />
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Date *</label>
              <input
                v-model="eventForm.date"
                type="date"
                required
                class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Start Time</label>
              <input
                v-model="eventForm.time"
                type="text"
                placeholder="Event time"
                class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Type</label>
              <select
                v-model="eventForm.kind"
                class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
              >
                <option value="event">Event</option>
                <option value="reminder">Reminder</option>
                <option value="workshop">Workshop</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Event / Registration Link</label>
            <input
              v-model="eventForm.link"
              type="url"
              placeholder="Event link"
              class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Description</label>
            <textarea
              v-model="eventForm.description"
              rows="3"
              placeholder="Event description"
              class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
            />
          </div>

          <div class="flex justify-end gap-2 border-t border-slate-100 pt-3">
            <button
              type="button"
              @click="showEventModal = false"
              class="rounded-xl bg-slate-100 px-4 py-2 font-bold text-slate-600 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="rounded-xl bg-violet-600 px-5 py-2 font-bold text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {{ saving ? 'Saving…' : 'Save Event' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: SPONSOR/PARTNER FORM -->
    <div v-if="showSponsorModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 class="text-base font-black uppercase text-[#1a0533]">
            {{ editingSponsor ? 'Edit Sponsor / Partner' : 'Add New Sponsor / Partner' }}
          </h4>
          <button type="button" @click="showSponsorModal = false" class="text-slate-400 hover:text-slate-600">
            <i class="fas fa-times" />
          </button>
        </div>

        <form @submit.prevent="handleSponsorSubmit" class="space-y-3 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Name *</label>
            <input
              v-model="sponsorForm.name"
              type="text"
              required
              placeholder="Name of the sponsor/partner"
              class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Tier / Category *</label>
            <select
              v-model="sponsorForm.type"
              class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
            >
              <option value="sponsor">Official Sponsor</option>
              <option value="partner">Community Partner</option>
            </select>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Website URL *</label>
            <input
              v-model="sponsorForm.websiteUrl"
              type="url"
              required
              placeholder="Website URL"
              class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Logo URL</label>
            <div class="flex gap-2">
              <input
                v-model="sponsorForm.logoUrl"
                type="text"
                placeholder="Logo URL"
                class="flex-1 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
              />
              <label class="cursor-pointer rounded-xl bg-violet-100 px-3 py-2 font-bold text-violet-700 hover:bg-violet-200 flex items-center">
                <i class="fas fa-upload mr-1" /> File
                <input type="file" accept="image/*" class="hidden" @change="handleFileUpload($event, 'sponsor')" />
              </label>
            </div>
          </div>

          <div class="flex justify-end gap-2 border-t border-slate-100 pt-3">
            <button
              type="button"
              @click="showSponsorModal = false"
              class="rounded-xl bg-slate-100 px-4 py-2 font-bold text-slate-600 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="rounded-xl bg-violet-600 px-5 py-2 font-bold text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {{ saving ? 'Saving…' : 'Save Item' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: DELETE CONFIRMATION -->
    <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
        <h4 class="text-base font-black uppercase text-red-600">Confirm Delete</h4>
        <p class="text-xs text-slate-600">
          Are you sure you want to remove <strong>{{ deleteTarget.name }}</strong>? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-2 border-t border-slate-100 pt-3">
          <button
            type="button"
            @click="deleteTarget = null"
            class="rounded-xl bg-slate-100 px-4 py-2 font-bold text-slate-600 hover:bg-slate-200 text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="executeDelete"
            class="rounded-xl bg-red-600 px-5 py-2 font-bold text-white hover:bg-red-700 text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainPageCms, type FeaturedProject, type MainPageEventReminder, type SponsorPartnerItem } from '~/composables/useMainPageCms'
import { DEFAULT_PROJECT_IMAGE } from '~/constants/sampleMedia'

const props = withDefaults(
  defineProps<{
    userRole?: string
    isSuperAdmin?: boolean
    initialTab?: 'projects' | 'events' | 'sponsors'
  }>(),
  {
    userRole: 'Member',
    isSuperAdmin: false,
    initialTab: 'projects'
  }
)

const activeTab = ref<'projects' | 'events' | 'sponsors'>(props.initialTab || 'projects')

watch(() => props.initialTab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab
  }
})

const defaultProjectImage = DEFAULT_PROJECT_IMAGE
const defaultSponsorLogo = 'https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/graphixMind.jpg'

const {
  projects,
  eventReminders,
  sponsors,
  partners,
  loading,
  refreshMainPageContent,
  saveProject,
  removeProject,
  saveEventReminder,
  removeEventReminder,
  saveSponsorPartner,
  removeSponsorPartner,
  uploadMultipleFiles
} = useMainPageCms()

const canManage = computed(() => {
  const role = (props.userRole || '').toLowerCase()
  return props.isSuperAdmin || role === 'admin' || role === 'mentor' || role === 'member'
})

const isAutoApproved = computed(() => {
  const role = (props.userRole || '').toLowerCase()
  return props.isSuperAdmin || role === 'admin'
})

const allSponsorsPartners = computed(() => [...sponsors.value, ...partners.value])

onMounted(async () => {
  await refreshMainPageContent()
})

function getStatusBadgeClass (status?: string) {
  const s = (status || '').toLowerCase()
  if (s === 'approved') return 'bg-emerald-100 text-emerald-700'
  if (s === 'pending') return 'bg-amber-100 text-amber-700'
  if (s === 'rejected') return 'bg-red-100 text-red-700'
  return 'bg-slate-100 text-slate-600'
}

function getStatusDotClass (status?: string) {
  const s = (status || '').toLowerCase()
  if (s === 'approved') return 'bg-emerald-500'
  if (s === 'pending') return 'bg-amber-500'
  if (s === 'rejected') return 'bg-red-500'
  return 'bg-slate-400'
}

// ── Project Modal & Form State ──
const showProjectModal = ref(false)
const editingProject = ref<FeaturedProject | null>(null)
const saving = ref(false)
const projectForm = ref<FeaturedProject>({
  title: '',
  domain: '',
  developer: '',
  url: '',
  image: ''
})

function openProjectModal (proj?: FeaturedProject) {
  if (proj) {
    editingProject.value = proj
    projectForm.value = { ...proj }
  } else {
    editingProject.value = null
    projectForm.value = { title: '', domain: '', developer: '', url: '', image: '' }
  }
  showProjectModal.value = true
}

async function handleProjectSubmit () {
  saving.value = true
  try {
    await saveProject(projectForm.value, isAutoApproved.value)
    showProjectModal.value = false
  } catch (e) {
    console.error('Failed to save project:', e)
  } finally {
    saving.value = false
  }
}

// ── Event Modal & Form State ──
const showEventModal = ref(false)
const editingEvent = ref<MainPageEventReminder | null>(null)
const eventForm = ref<MainPageEventReminder>({
  title: '',
  date: '',
  time: '',
  endTime: '',
  kind: 'event',
  link: '',
  description: ''
})

function openEventModal (evt?: MainPageEventReminder) {
  if (evt) {
    editingEvent.value = evt
    eventForm.value = { ...evt }
  } else {
    editingEvent.value = null
    eventForm.value = { title: '', date: '', time: '', endTime: '', kind: 'event', link: '', description: '' }
  }
  showEventModal.value = true
}

async function handleEventSubmit () {
  saving.value = true
  try {
    await saveEventReminder(eventForm.value, isAutoApproved.value)
    showEventModal.value = false
  } catch (e) {
    console.error('Failed to save event reminder:', e)
  } finally {
    saving.value = false
  }
}

// ── Sponsor Modal & Form State ──
const showSponsorModal = ref(false)
const editingSponsor = ref<SponsorPartnerItem | null>(null)
const sponsorForm = ref<SponsorPartnerItem>({
  name: '',
  type: 'sponsor',
  logoUrl: '',
  websiteUrl: ''
})

function openSponsorModal (sp?: SponsorPartnerItem) {
  if (sp) {
    editingSponsor.value = sp
    sponsorForm.value = { ...sp }
  } else {
    editingSponsor.value = null
    sponsorForm.value = { name: '', type: 'sponsor', logoUrl: '', websiteUrl: '' }
  }
  showSponsorModal.value = true
}

async function handleSponsorSubmit () {
  saving.value = true
  try {
    await saveSponsorPartner(sponsorForm.value, isAutoApproved.value)
    showSponsorModal.value = false
  } catch (e) {
    console.error('Failed to save sponsor/partner:', e)
  } finally {
    saving.value = false
  }
}

// ── Image File Upload Handler ──
async function handleFileUpload (event: Event, targetType: 'project' | 'sponsor') {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return
  const files = Array.from(input.files)

  try {
    const uploaded = await uploadMultipleFiles(files)
    if (uploaded && uploaded.length > 0) {
      const url = (uploaded[0] as any)?.url || (uploaded[0] as any)
      if (targetType === 'project') {
        projectForm.value.image = url
      } else {
        sponsorForm.value.logoUrl = url
      }
    }
  } catch (e) {
    console.error('Upload failed:', e)
  }
}

// ── Delete Confirmation ──
const deleteTarget = ref<{ type: 'project' | 'event' | 'sponsor'; id: number; name: string } | null>(null)

function confirmDelete (type: 'project' | 'event' | 'sponsor', id: number, name: string) {
  deleteTarget.value = { type, id, name }
}

async function executeDelete () {
  if (!deleteTarget.value) return
  const { type, id } = deleteTarget.value
  deleteTarget.value = null
  try {
    if (type === 'project') {
      await removeProject(id)
    } else if (type === 'event') {
      await removeEventReminder(id)
    } else {
      await removeSponsorPartner(id)
    }
  } catch (e) {
    console.error('Delete failed:', e)
  }
}
</script>
