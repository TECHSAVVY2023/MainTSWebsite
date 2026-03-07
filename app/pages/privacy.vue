<template>
  <div class="font-inter text-white min-h-screen page-bg-violet">
    <header class="sticky top-0 left-0 right-0 z-50 header-bar">
      <nav class="container mx-auto px-5 sm:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink :to="backToHomeHref" class="flex items-center gap-2 sm:gap-3 text-white/90 hover:text-white transition-colors text-sm sm:text-base">
            <i class="fas fa-arrow-left text-base sm:text-lg"></i>
            <span class="font-medium">Back to Home</span>
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center shrink-0">
            <img :src="logoUrl" alt="TECH SAVVY" class="h-8 sm:h-9 w-auto object-contain opacity-90" />
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="section-bg-violet pt-8 pb-20 sm:pt-12 sm:pb-24 md:pt-16 md:pb-32 relative overflow-hidden flex flex-col">
      <div class="section-wires" aria-hidden="true">
        <svg class="section-wires-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
          <defs>
              <linearGradient id="swg-privacy-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
                <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
              </linearGradient>
              <linearGradient id="swg-privacy-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFD74A" stop-opacity="0.3" />
                <stop offset="50%" stop-color="#FFD74A" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#FFD74A" stop-opacity="0.3" />
              </linearGradient>
            </defs>
            <path class="section-wire-base" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="#B5A3FF" stroke-width="0.35" stroke-opacity="0.15" />
            <path class="section-wire-base" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="#FFD74A" stroke-width="0.35" stroke-opacity="0.12" />
            <path class="section-wire-base" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="#B5A3FF" stroke-width="0.35" stroke-opacity="0.15" />
            <path class="section-wire-base" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="#FFD74A" stroke-width="0.35" stroke-opacity="0.12" />
            <path class="section-wire-base" d="M80 400 Q200 360 320 400" fill="none" stroke="#B5A3FF" stroke-width="0.35" stroke-opacity="0.15" />
            <path class="section-wire-base" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="#FFD74A" stroke-width="0.35" stroke-opacity="0.12" />
            <path class="section-wire section-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#swg-privacy-1)" stroke-width="0.8" stroke-linecap="round" />
            <path class="section-wire section-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#swg-privacy-2)" stroke-width="0.65" stroke-linecap="round" />
            <path class="section-wire section-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#swg-privacy-1)" stroke-width="0.55" stroke-linecap="round" />
            <path class="section-wire section-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#swg-privacy-2)" stroke-width="0.65" stroke-linecap="round" />
            <path class="section-wire section-wire-5" d="M80 400 Q200 360 320 400" fill="none" stroke="url(#swg-privacy-1)" stroke-width="0.55" stroke-linecap="round" />
            <path class="section-wire section-wire-6" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="url(#swg-privacy-2)" stroke-width="0.55" stroke-linecap="round" />
        </svg>
      </div>
      <div class="section-content-layer flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative flex-1 flex flex-col">
        <!-- Page header -->
        <div class="section-title-card mb-10 sm:mb-12">
          <div class="legal-header mb-0">
            <span class="section-label">Legal</span>
            <h1 class="section-heading mb-2">Privacy Policy</h1>
            <p class="section-sub mb-4">How we collect, use, and protect your information.</p>
            <p class="text-white/50 text-sm">Last updated: March 3, 2025</p>
          </div>
        </div>

        <!-- Single card with accordion dropdowns -->
        <div class="legal-card">
          <div class="legal-card-header">
            <h2 class="legal-card-title">Sections</h2>
            <div class="legal-card-actions">
              <button
                type="button"
                class="legal-expand-btn"
                @click="expandAll(true)"
              >
                Expand all
              </button>
              <button
                type="button"
                class="legal-expand-btn"
                @click="expandAll(false)"
              >
                Collapse all
              </button>
            </div>
          </div>
          <div class="legal-accordion-list">
            <section
              v-for="(section, idx) in sections"
              :key="section.id"
              :id="section.id"
              class="legal-accordion-item scroll-mt-24"
              :class="{ 'is-open': openSections[idx] }"
            >
              <button
                type="button"
                class="legal-accordion-trigger"
                :aria-expanded="openSections[idx]"
                :aria-controls="`legal-body-${section.id}`"
                @click="toggleSection(idx)"
              >
                <span class="legal-accordion-num">{{ section.title.split('.')[0] }}.</span>
                <span class="legal-accordion-text">{{ section.title.replace(/^\d+\.\s*/, '') }}</span>
                <i class="fas legal-accordion-icon fa-chevron-down" aria-hidden="true"></i>
              </button>
              <div
                :id="`legal-body-${section.id}`"
                class="legal-body-wrap"
                :class="{ open: openSections[idx] }"
              >
                <div class="legal-body">
                  <p v-for="(para, i) in section.paragraphs" :key="i" class="legal-para">{{ para }}</p>
                  <ul v-if="section.list" class="legal-list">
                    <li v-for="(item, j) in section.list" :key="j">{{ item }}</li>
                  </ul>
                  <p v-for="(para, k) in (section.paragraphsAfter || [])" :key="'after-' + k" class="legal-para">{{ para }}</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="section-title-card mt-16 sm:mt-20 pt-12 border-t border-white/10">
          <p class="text-white/70 text-sm sm:text-base mb-4">
            If you have any questions about this Privacy Policy, please contact us.
          </p>
          <NuxtLink to="/contact" class="legal-cta">
            Contact Us
            <i class="fas fa-arrow-right ml-2 text-sm"></i>
          </NuxtLink>
        </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { backToHomeHref } = useBackToHome()
const logoUrl = '/assets/codebev-logo.png'

const openSections = ref<boolean[]>([])

function toggleSection (idx: number) {
  openSections.value = openSections.value.map((v, i) => (i === idx ? !v : v))
}

function expandAll (open: boolean) {
  openSections.value = sections.map(() => open)
}

const sections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    paragraphs: [
      'TECH SAVVY Code Camp ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, community platform, courses, and related services (collectively, the "Services").',
      'By using our Services, you consent to the practices described in this policy. If you do not agree with this policy, please do not use our Services.'
    ]
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    paragraphs: [
      'We may collect information that you provide directly to us, such as when you register for an account, join our community, enroll in courses, or contact us. This may include:'
    ],
    list: [
      'Name and contact information (email address, phone number)',
      'Account credentials (username, password)',
      'Profile information (bio, profile picture)',
      'Communications you send to us',
      'Feedback and survey responses'
    ]
  },
  {
    id: 'automatically-collected',
    title: '3. Information Collected Automatically',
    paragraphs: [
      'When you access our Services, we may automatically collect certain information, including:'
    ],
    list: [
      'Device information (browser type, operating system, IP address)',
      'Usage data (pages visited, features used, time spent)',
      'Cookies and similar technologies (see our Cookies section below)'
    ]
  },
  {
    id: 'how-we-use',
    title: '4. How We Use Your Information',
    paragraphs: [
      'We use the information we collect to:'
    ],
    list: [
      'Provide, maintain, and improve our Services',
      'Process registrations and manage your account',
      'Send you updates, newsletters, and course-related communications',
      'Respond to your inquiries and support requests',
      'Analyze usage patterns to enhance user experience',
      'Detect and prevent fraud or abuse',
      'Comply with legal obligations'
    ]
  },
  {
    id: 'sharing',
    title: '5. Sharing Your Information',
    paragraphs: [
      'We do not sell your personal information. We may share your information only in the following circumstances:'
    ],
    list: [
      'With service providers who assist us in operating our Services (under strict confidentiality agreements)',
      'When required by law or to protect our rights and safety',
      'In connection with a merger, acquisition, or sale of assets (with notice to you)',
      'With your consent or at your direction'
    ]
  },
  {
    id: 'cookies',
    title: '6. Cookies and Tracking',
    paragraphs: [
      'We use cookies and similar technologies to enhance your experience. Cookies are small data files stored on your device. We use them for the purposes listed below. You can control cookies through your browser settings; disabling them may limit certain features of our Services.'
    ],
    list: [
      'Keep you logged in',
      'Remember your preferences',
      'Understand how you use our Services'
    ]
  },
  {
    id: 'data-security',
    title: '7. Data Security',
    paragraphs: [
      'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.'
    ]
  },
  {
    id: 'data-retention',
    title: '8. Data Retention',
    paragraphs: [
      'We retain your information for as long as your account is active or as needed to provide you with our Services. We may retain certain information to comply with legal obligations, resolve disputes, and enforce our agreements.'
    ]
  },
  {
    id: 'your-rights',
    title: '9. Your Rights',
    paragraphs: [
      'Depending on your location, you may have the right to:'
    ],
    list: [
      'Access the personal information we hold about you',
      'Request correction of inaccurate data',
      'Request deletion of your data',
      'Object to or restrict certain processing',
      'Data portability',
      'Withdraw consent where applicable'
    ],
    paragraphsAfter: [
      'To exercise these rights, please contact us. We will respond within a reasonable timeframe.'
    ]
  },
  {
    id: 'children',
    title: '10. Children\'s Privacy',
    paragraphs: [
      'Our Services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us and we will take steps to delete it.'
    ]
  },
  {
    id: 'changes',
    title: '11. Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page and updating the "Last updated" date. Your continued use of our Services after such changes constitutes acceptance of the revised policy.'
    ]
  },
  {
    id: 'contact',
    title: '12. Contact Us',
    paragraphs: [
      'For questions about this Privacy Policy or our data practices, please reach out through our community channels or visit our main website for contact information.'
    ]
  }
]

onMounted(() => {
  openSections.value = sections.map(() => false)
})

useHead({
  title: 'Privacy Policy | TECH SAVVY Code Camp',
  meta: [
    { name: 'description', content: 'Privacy Policy for TECH SAVVY Code Camp - how we collect, use, and protect your information.' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }
  ]
})
</script>

<style scoped>
.page-bg-violet { background-color: #14082E; }
</style>

<style>
.section-bg-violet { background-color: #14082E !important; }
.section-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #B5A3FF;
  margin-bottom: 0.5rem;
}
.section-heading {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.25;
  color: #fff;
  margin-bottom: 0.35rem;
}
.section-sub {
  font-size: 13px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.6);
}

.header-bar {
  background: rgba(20, 8, 46, 0.98);
  border-bottom: 1px solid rgba(181, 163, 255, 0.1);
}

/* Single card container */
.legal-card {
  background: rgba(35, 21, 89, 0.95);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
.legal-card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(181, 163, 255, 0.15);
  background: rgba(0, 0, 0, 0.15);
}
.legal-card-title {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #B5A3FF;
  margin: 0;
}
.legal-card-actions {
  display: flex;
  gap: 0.5rem;
}
.legal-expand-btn {
  padding: 0.5rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(181, 163, 255, 0.1);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.legal-expand-btn:hover {
  background: rgba(181, 163, 255, 0.2);
  color: #fff;
  border-color: rgba(181, 163, 255, 0.3);
}
.legal-accordion-list {
  padding: 0.5rem 0;
}
.legal-accordion-item {
  border-bottom: 1px solid rgba(181, 163, 255, 0.1);
}
.legal-accordion-item:last-child {
  border-bottom: none;
}
.legal-accordion-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.legal-accordion-trigger:hover {
  background: rgba(181, 163, 255, 0.08);
}
.legal-accordion-item.is-open .legal-accordion-trigger {
  background: rgba(181, 163, 255, 0.06);
  color: #fff;
}
.legal-accordion-num {
  flex-shrink: 0;
  color: #B5A3FF;
  min-width: 1.75rem;
  font-weight: 700;
}
.legal-accordion-text {
  flex: 1;
}
.legal-accordion-icon {
  flex-shrink: 0;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.25s ease;
}
.legal-accordion-item.is-open .legal-accordion-icon {
  transform: rotate(180deg);
  color: #B5A3FF;
}
.legal-body-wrap {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.legal-body-wrap.open {
  max-height: 2000px;
  transition: max-height 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.legal-body {
  padding: 0 1.5rem 1.25rem 1.5rem;
  border: none;
  border-radius: 0;
  background: #f8f7f5;
  opacity: 0;
  transition: opacity 0.35s ease 0.08s;
}
.legal-body-wrap.open .legal-body {
  opacity: 1;
}
.legal-para {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 1rem;
}
.legal-para:first-child { margin-top: 0; }
.legal-para:last-of-type { margin-bottom: 0.5rem; }
.legal-list {
  margin: 0.75rem 0 0 1.25rem;
  padding: 0;
  list-style: disc;
}
.legal-list li {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 0.5rem;
}
.legal-list li:last-child { margin-bottom: 0; }

.legal-cta {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  background: #FFD74A;
  color: #14082E;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.legal-cta:hover {
  background: #ffe066;
  box-shadow: 0 4px 20px rgba(255, 215, 74, 0.4);
  transform: translateY(-1px);
}

@media (min-width: 640px) {
  .section-heading { font-size: 26px; line-height: 1.3; margin-bottom: 0.5rem; }
  .section-sub { font-size: 14px; line-height: 1.5; }
  .legal-accordion-trigger { font-size: 1.0625rem; padding: 1.125rem 1.5rem; }
  .legal-para, .legal-list li { font-size: 1rem; }
}
@media (min-width: 768px) {
  .section-heading { font-size: 30px; line-height: 36px; letter-spacing: -0.6px; }
  .section-sub { font-size: 16px; line-height: 24px; }
  .legal-card { border-radius: 20px; }
  .legal-card-header { padding: 1.25rem 1.75rem; }
  .legal-accordion-trigger { padding: 1.125rem 1.75rem; }
  .legal-body { padding: 0 1.75rem 1.5rem 1.75rem; }
}
@media (max-width: 767px) {
  .section-heading { font-size: 1.125rem; line-height: 1.3; }
  .section-sub { font-size: 0.75rem; line-height: 1.35; }
  .legal-card-header { flex-direction: column; align-items: stretch; }
  .legal-accordion-trigger { font-size: 0.9375rem; padding: 0.875rem 1.25rem; }
  .legal-body { padding: 0 1.25rem 1rem 1.25rem; }
  .legal-para, .legal-list li { font-size: 0.875rem; }
}
</style>
