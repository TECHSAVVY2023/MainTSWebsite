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
            <linearGradient id="swg-terms-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="swg-terms-2" x1="0%" y1="0%" x2="0%" y2="100%">
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
          <path class="section-wire section-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#swg-terms-1)" stroke-width="0.8" stroke-linecap="round" />
          <path class="section-wire section-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#swg-terms-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#swg-terms-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#swg-terms-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-5" d="M80 400 Q200 360 320 400" fill="none" stroke="url(#swg-terms-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-6" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="url(#swg-terms-2)" stroke-width="0.55" stroke-linecap="round" />
        </svg>
      </div>
      <div class="section-content-layer flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative flex-1 flex flex-col">
        <!-- Page header -->
        <div class="section-title-card mb-10 sm:mb-12">
          <div class="terms-header mb-0">
            <span class="section-label">Legal</span>
            <h1 class="section-heading mb-2">Terms of Use</h1>
            <p class="section-sub mb-4">Please read these terms carefully before using our services.</p>
            <p class="text-white/50 text-sm">Last updated: March 3, 2025</p>
          </div>
        </div>

        <!-- Single card with accordion dropdowns -->
        <div class="terms-card">
          <div class="terms-card-header">
            <h2 class="terms-card-title">Sections</h2>
            <div class="terms-card-actions">
              <button
                type="button"
                class="terms-expand-btn"
                @click="expandAll(true)"
              >
                Expand all
              </button>
              <button
                type="button"
                class="terms-expand-btn"
                @click="expandAll(false)"
              >
                Collapse all
              </button>
            </div>
          </div>
          <div class="terms-accordion-list">
            <section
              v-for="(section, idx) in sections"
              :key="section.id"
              :id="section.id"
              class="terms-accordion-item scroll-mt-24"
              :class="{ 'is-open': openSections[idx] }"
            >
              <button
                type="button"
                class="terms-accordion-trigger"
                :aria-expanded="openSections[idx]"
                :aria-controls="`terms-body-${section.id}`"
                @click="toggleSection(idx)"
              >
                <span class="terms-accordion-num">{{ section.title.split('.')[0] }}.</span>
                <span class="terms-accordion-text">{{ section.title.replace(/^\d+\.\s*/, '') }}</span>
                <i class="fas terms-accordion-icon fa-chevron-down" aria-hidden="true"></i>
              </button>
              <div
                :id="`terms-body-${section.id}`"
                class="terms-body-wrap"
                :class="{ open: openSections[idx] }"
              >
                <div class="terms-body">
                  <p v-for="(para, i) in section.paragraphs" :key="i" class="terms-para">{{ para }}</p>
                  <ul v-if="section.list" class="terms-list">
                    <li v-for="(item, j) in section.list" :key="j">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="section-title-card mt-16 sm:mt-20 pt-12 border-t border-white/10">
          <p class="text-white/70 text-sm sm:text-base mb-4">
            If you have any questions about these Terms of Use, please contact us.
          </p>
          <NuxtLink to="/contact" class="terms-cta">
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
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    paragraphs: [
      'By accessing or using the TECH SAVVY Code Camp website, community platform, courses, and related services (collectively, the "Services"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Services.',
      'We reserve the right to modify these terms at any time. Your continued use of the Services after any changes constitutes acceptance of the revised terms. We encourage you to review this page periodically.'
    ]
  },
  {
    id: 'use-of-service',
    title: '2. Use of Service',
    paragraphs: [
      'Our Services are provided for educational and community purposes. You may use the Services only for lawful purposes and in accordance with these Terms. You agree to use the Services in a manner that does not infringe the rights of others or restrict their use and enjoyment of the Services.',
      'You must be at least 13 years of age to use our Services. If you are under 18, you should have parental or guardian consent before participating in our community or courses.'
    ]
  },
  {
    id: 'user-conduct',
    title: '3. User Conduct',
    paragraphs: [
      'When using our Services, you agree not to:'
    ],
    list: [
      'Harass, abuse, or harm other members of the community',
      'Post false, misleading, or defamatory content',
      'Share content that infringes intellectual property rights',
      'Attempt to gain unauthorized access to our systems or other users\' accounts',
      'Use the Services for any commercial purpose without our prior written consent',
      'Interfere with or disrupt the integrity or performance of the Services',
      'Collect or harvest user data without consent'
    ]
  },
  {
    id: 'intellectual-property',
    title: '4. Intellectual Property',
    paragraphs: [
      'All content on our Services—including but not limited to text, graphics, logos, course materials, and software—is the property of TECH SAVVY, CODEDEV Solutions, or our licensors and is protected by copyright and other intellectual property laws.',
      'You may not reproduce, distribute, modify, or create derivative works from our content without express written permission. Course materials are provided for your personal, non-commercial use only.'
    ]
  },
  {
    id: 'privacy',
    title: '5. Privacy',
    paragraphs: [
      'Your use of the Services is also governed by our Privacy Policy. By using our Services, you consent to the collection and use of your information as described in our Privacy Policy. We encourage you to read our Privacy Policy to understand how we handle your data.'
    ]
  },
  {
    id: 'disclaimers',
    title: '6. Disclaimers',
    paragraphs: [
      'The Services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Services will be uninterrupted, error-free, or free of viruses or other harmful components.',
      'Course content and community advice are for educational purposes only. We do not guarantee specific outcomes, job placements, or career results. Any reliance on information provided through our Services is at your own risk.'
    ]
  },
  {
    id: 'limitation',
    title: '7. Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, TECH SAVVY, CODEDEV Solutions, and our affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services.',
      'Our total liability for any claims arising from or related to these Terms or the Services shall not exceed the amount you paid to us, if any, in the twelve months preceding the claim.'
    ]
  },
  {
    id: 'termination',
    title: '8. Termination',
    paragraphs: [
      'We may suspend or terminate your access to the Services at any time, with or without cause or notice. Upon termination, your right to use the Services will immediately cease.',
      'You may stop using our Services at any time. Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.'
    ]
  },
  {
    id: 'governing-law',
    title: '9. Governing Law',
    paragraphs: [
      'These Terms shall be governed by and construed in accordance with the laws of the Philippines, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Services shall be subject to the exclusive jurisdiction of the courts of Misamis Occidental, Philippines.'
    ]
  },
  {
    id: 'contact',
    title: '10. Contact Us',
    paragraphs: [
      'For questions about these Terms of Use or our Services, please reach out through our community channels or visit our main website for contact information.'
    ]
  }
]

onMounted(() => {
  openSections.value = sections.map(() => false)
})

useHead({
  title: 'Terms of Use | TECH SAVVY Code Camp',
  meta: [
    { name: 'description', content: 'Terms of Use for TECH SAVVY Code Camp - an IT community in Misamis Occidental.' }
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
.terms-card {
  background: rgba(35, 21, 89, 0.95);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
.terms-card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(181, 163, 255, 0.15);
  background: rgba(0, 0, 0, 0.15);
}
.terms-card-title {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #B5A3FF;
  margin: 0;
}
.terms-card-actions {
  display: flex;
  gap: 0.5rem;
}
.terms-expand-btn {
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
.terms-expand-btn:hover {
  background: rgba(181, 163, 255, 0.2);
  color: #fff;
  border-color: rgba(181, 163, 255, 0.3);
}
.terms-accordion-list {
  padding: 0.5rem 0;
}
.terms-accordion-item {
  border-bottom: 1px solid rgba(181, 163, 255, 0.1);
}
.terms-accordion-item:last-child {
  border-bottom: none;
}
.terms-accordion-trigger {
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
.terms-accordion-trigger:hover {
  background: rgba(181, 163, 255, 0.08);
}
.terms-accordion-item.is-open .terms-accordion-trigger {
  background: rgba(181, 163, 255, 0.06);
  color: #fff;
}
.terms-accordion-num {
  flex-shrink: 0;
  color: #B5A3FF;
  min-width: 1.75rem;
  font-weight: 700;
}
.terms-accordion-text {
  flex: 1;
}
.terms-accordion-icon {
  flex-shrink: 0;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.25s ease;
}
.terms-accordion-item.is-open .terms-accordion-icon {
  transform: rotate(180deg);
  color: #B5A3FF;
}
.terms-body-wrap {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.terms-body-wrap.open {
  max-height: 2000px;
  transition: max-height 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.terms-body {
  padding: 0 1.5rem 1.25rem 1.5rem;
  border: none;
  border-radius: 0;
  background: #f8f7f5;
  opacity: 0;
  transition: opacity 0.35s ease 0.08s;
}
.terms-body-wrap.open .terms-body {
  opacity: 1;
}
.terms-para {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 1rem;
}
.terms-para:first-child { margin-top: 0; }
.terms-para:last-of-type { margin-bottom: 0.5rem; }
.terms-list {
  margin: 0.75rem 0 0 1.25rem;
  padding: 0;
  list-style: disc;
}
.terms-list li {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 0.5rem;
}
.terms-list li:last-child { margin-bottom: 0; }

.terms-cta {
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
.terms-cta:hover {
  background: #ffe066;
  box-shadow: 0 4px 20px rgba(255, 215, 74, 0.4);
  transform: translateY(-1px);
}

@media (min-width: 640px) {
  .section-heading { font-size: 26px; line-height: 1.3; margin-bottom: 0.5rem; }
  .section-sub { font-size: 14px; line-height: 1.5; }
  .terms-accordion-trigger { font-size: 1.0625rem; padding: 1.125rem 1.5rem; }
  .terms-para, .terms-list li { font-size: 1rem; }
}
@media (min-width: 768px) {
  .section-heading { font-size: 30px; line-height: 36px; letter-spacing: -0.6px; }
  .section-sub { font-size: 16px; line-height: 24px; }
  .terms-card { border-radius: 20px; }
  .terms-card-header { padding: 1.25rem 1.75rem; }
  .terms-accordion-trigger { padding: 1.125rem 1.75rem; }
  .terms-body { padding: 0 1.75rem 1.5rem 1.75rem; }
}
@media (max-width: 767px) {
  .section-heading { font-size: 1.125rem; line-height: 1.3; }
  .section-sub { font-size: 0.75rem; line-height: 1.35; }
  .terms-card-header { flex-direction: column; align-items: stretch; }
  .terms-accordion-trigger { font-size: 0.9375rem; padding: 0.875rem 1.25rem; }
  .terms-body { padding: 0 1.25rem 1rem 1.25rem; }
  .terms-para, .terms-list li { font-size: 0.875rem; }
}
</style>
