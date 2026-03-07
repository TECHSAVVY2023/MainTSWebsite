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
            <linearGradient id="swg-contact-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="swg-contact-2" x1="0%" y1="0%" x2="0%" y2="100%">
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
          <path class="section-wire section-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#swg-contact-1)" stroke-width="0.8" stroke-linecap="round" />
          <path class="section-wire section-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#swg-contact-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#swg-contact-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#swg-contact-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-5" d="M80 400 Q200 360 320 400" fill="none" stroke="url(#swg-contact-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-6" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="url(#swg-contact-2)" stroke-width="0.55" stroke-linecap="round" />
        </svg>
      </div>
      <div class="section-content-layer flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative flex-1 flex flex-col">
        <!-- Page header -->
        <div class="section-title-card mb-12 sm:mb-16">
          <div class="contact-header mb-0">
            <span class="section-label">Get in touch</span>
            <h1 class="section-heading mb-2">Contact Us</h1>
            <p class="section-sub max-w-2xl">
              Have questions about Code Camp, our community, or courses? Reach out—we'd love to hear from you.
            </p>
          </div>
        </div>

        <div class="contact-layout">
          <!-- Contact info cards -->
          <div class="contact-cards">
            <a
              :href="`mailto:${contact.email}`"
              class="contact-card group"
              aria-label="Send email"
            >
              <div class="contact-card-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <h3 class="contact-card-title">Email</h3>
              <p class="contact-card-value">{{ contact.email }}</p>
              <span class="contact-card-hint">We typically respond within 24–48 hours</span>
            </a>

            <a
              :href="contact.websiteUrl"
              target="_blank"
              rel="noopener"
              class="contact-card group"
              aria-label="Visit website"
            >
              <div class="contact-card-icon">
                <i class="fas fa-globe"></i>
              </div>
              <h3 class="contact-card-title">Website</h3>
              <p class="contact-card-value">{{ contact.website }}</p>
              <span class="contact-card-hint">Visit our main site</span>
            </a>
          </div>

          <!-- Right column: Map + Form (same width, aligned) -->
          <div class="contact-form-wrap">
            <div class="contact-card contact-card-location contact-card-map">
              <div class="contact-card-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <h3 class="contact-card-title">Location</h3>
              <address class="contact-card-value contact-address not-italic">
                {{ contact.addressLine1 }}<br />
                {{ contact.addressLine2 }}<br />
                {{ contact.city }}, Philippines
              </address>
              <span class="contact-card-hint">Workflow Co-Working Space</span>
              <div class="contact-map-wrap">
                <iframe
                  :src="mapEmbedUrl"
                  class="contact-map"
                  width="100%"
                  height="450"
                  style="border:0;"
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Workflow Co-Working Space location map"
                />
                <a
                  :href="mapDirectionsUrl"
                  target="_blank"
                  rel="noopener"
                  class="contact-map-link"
                >
                  Open in Google Maps
                  <i class="fas fa-external-link-alt ml-1 text-xs"></i>
                </a>
              </div>
            </div>

            <!-- Contact form -->
            <div class="contact-form-card">
              <h2 class="contact-form-title">Send us a message</h2>
              <p class="contact-form-sub">Fill out the form below and we'll get back to you soon.</p>
              <form
                class="contact-form"
                @submit.prevent="onFormSubmit"
              >
                <div class="form-row">
                  <div class="form-group">
                    <label for="contact-name" class="form-label">Name</label>
                    <input
                      id="contact-name"
                      v-model="form.name"
                      type="text"
                      name="name"
                      class="form-input"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="contact-email" class="form-label">Email</label>
                    <input
                      id="contact-email"
                      v-model="form.email"
                      type="email"
                      name="email"
                      class="form-input"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="contact-message" class="form-label">Message</label>
                  <textarea
                    id="contact-message"
                    v-model="form.message"
                    name="message"
                    class="form-input form-textarea"
                    placeholder="How can we help?"
                    rows="5"
                    required
                  />
                </div>
                <button type="submit" class="contact-submit">
                  Send Message
                  <i class="fas fa-paper-plane ml-2 text-sm"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Social links -->
        <div class="contact-social-wrap">
          <h3 class="contact-social-title">Follow us</h3>
          <div class="contact-social-links">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              target="_blank"
              rel="noopener"
              class="contact-social-link"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Legal links -->
        <div class="contact-legal mt-12 pt-8 border-t border-white/10">
          <p class="text-white/60 text-sm mb-2">Related</p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/terms" class="contact-legal-link">Terms of Use</NuxtLink>
            <NuxtLink to="/privacy" class="contact-legal-link">Privacy Policy</NuxtLink>
          </div>
        </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { backToHomeHref } = useBackToHome()
const logoUrl = '/assets/codebev-logo.png'

const contact = {
  email: 'info@techsavvies.space',
  website: 'www.techsavvies.space',
  websiteUrl: 'https://www.techsavvies.space',
  addressLine1: 'Workflow (Co-working Space)',
  addressLine2: '555 Don Anselmo Bernad Avenue',
  city: 'Ozamiz, Misamis Occidental'
}

// Map: Google Maps embed (centered on Workflow Co-Working Space)
const mapEmbedUrl = 'https://www.google.com/maps?q=555+Don+Anselmo+Bernad+Avenue,+Ozamiz,+Misamis+Occidental,+Philippines&output=embed'
const mapDirectionsUrl = 'https://www.google.com/maps/search/?api=1&query=555+Don+Anselmo+Bernad+Avenue,+Ozamiz,+Misamis+Occidental,+Philippines'

const socialLinks = [
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
  { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
  { name: 'GitHub', icon: 'fab fa-github', url: '#' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' }
]

const form = ref({
  name: '',
  email: '',
  message: ''
})

function onFormSubmit () {
  const { name, email, message } = form.value
  const subject = encodeURIComponent(`Contact from ${name || 'Visitor'} - TECH SAVVY`)
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
  const mailto = `mailto:${contact.email}?subject=${subject}&body=${body}`
  window.location.href = mailto
}

useHead({
  title: 'Contact Us | TECH SAVVY Code Camp',
  meta: [
    { name: 'description', content: 'Get in touch with TECH SAVVY Code Camp - an IT community in Misamis Occidental, Philippines.' }
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
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.6);
}

.header-bar {
  background: rgba(20, 8, 46, 0.98);
  border-bottom: 1px solid rgba(181, 163, 255, 0.1);
}

.contact-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}
.contact-card {
  display: block;
  padding: 1.5rem;
  background: rgba(35, 21, 89, 0.95);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}
a.contact-card:hover {
  border-color: rgba(181, 163, 255, 0.4);
  background: rgba(45, 28, 110, 0.98);
  transform: translateY(-2px);
}
.contact-card-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(181, 163, 255, 0.15);
  border-radius: 10px;
  color: #B5A3FF;
  font-size: 1rem;
  margin-bottom: 1rem;
}
.contact-card-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #B5A3FF;
  margin-bottom: 0.35rem;
}
.contact-card-value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.25rem;
}
.contact-address {
  font-weight: 500;
  line-height: 1.5;
}
.contact-card-hint {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

.contact-form-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.contact-card-map {
  width: 100%;
}
.contact-card-location {
  border-radius: 0;
}
.contact-map-wrap {
  margin-top: 1rem;
  border-radius: 0;
  overflow: hidden;
  background: rgba(35, 21, 89, 0.95);
  border: 1px solid rgba(181, 163, 255, 0.2);
}
.contact-map {
  display: block;
  width: 100%;
  min-height: 380px;
}
.contact-map-link {
  display: inline-flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: #B5A3FF;
  text-decoration: none;
  transition: color 0.2s;
}
.contact-map-link:hover {
  color: #fff;
}

.contact-form-card {
  padding: 1.5rem;
  background: rgba(35, 21, 89, 0.95);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 12px;
}
.contact-form-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.35rem;
}
.contact-form-sub {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.25rem;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-group {
  margin-bottom: 1rem;
}
.form-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.35rem;
}
.form-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  background: rgba(35, 21, 89, 0.95);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 0.9375rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.form-input:focus {
  outline: none;
  border-color: #B5A3FF;
  box-shadow: 0 0 0 2px rgba(181, 163, 255, 0.2);
}
.form-textarea {
  min-height: 120px;
  resize: vertical;
}
.contact-submit {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  background: #FFD74A;
  color: #14082E;
  font-weight: 700;
  font-size: 0.875rem;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.contact-submit:hover {
  background: #ffe066;
  box-shadow: 0 4px 20px rgba(255, 215, 74, 0.4);
  transform: translateY(-1px);
}

.contact-social-wrap {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.contact-social-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #B5A3FF;
  margin-bottom: 1rem;
}
.contact-social-links {
  display: flex;
  gap: 0.75rem;
}
.contact-social-link {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(181, 163, 255, 0.1);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.2s, background 0.2s, border-color 0.2s;
}
.contact-social-link:hover {
  color: #B5A3FF;
  background: rgba(181, 163, 255, 0.15);
  border-color: rgba(181, 163, 255, 0.3);
}

.contact-legal-link {
  font-size: 0.875rem;
  color: #B5A3FF;
  text-decoration: none;
  transition: color 0.2s;
}
.contact-legal-link:hover {
  color: #fff;
}

@media (min-width: 640px) {
  .section-heading { font-size: 26px; line-height: 1.3; margin-bottom: 0.5rem; }
  .section-sub { font-size: 14px; line-height: 1.6; }
  .contact-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
  .contact-map { min-height: 400px; }
  .form-row { gap: 1.25rem; }
}
@media (min-width: 768px) {
  .section-heading { font-size: 30px; line-height: 36px; letter-spacing: -0.6px; }
  .section-sub { font-size: 16px; line-height: 24px; }
  .contact-layout {
    display: grid;
    grid-template-columns: minmax(180px, 240px) 1fr;
    gap: 2.5rem;
    align-items: start;
  }
  .contact-cards {
    grid-template-columns: 1fr;
    margin-bottom: 0;
    gap: 1rem;
  }
  .contact-map { min-height: 450px; }
  .contact-form-card { padding: 1.75rem; }
  .contact-form-title { font-size: 1.25rem; }
}
@media (max-width: 767px) {
  .section-heading { font-size: 1.125rem; line-height: 1.3; }
  .section-sub { font-size: 0.875rem; line-height: 1.5; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
