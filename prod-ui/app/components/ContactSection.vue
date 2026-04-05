<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative flex-1 flex flex-col">
    <div class="mb-12 sm:mb-16">
      <span class="block text-xs font-semibold tracking-widest uppercase text-accent-purple mb-2">Get in touch</span>
      <h1 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight text-dark mb-2">
        Contact Us
      </h1>
      <p class="text-dark/60 text-sm sm:text-base max-w-2xl">
        Have questions about Code Camp, our community, or courses? Reach out—we'd love to hear from you.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-[minmax(180px,240px)_1fr] gap-6 md:gap-10 md:items-start">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:mb-0 mb-8">
        <a
          :href="`mailto:${contact.email}`"
          class="block p-6 bg-white border border-neutral-border rounded-xl no-underline text-inherit transition-all hover:border-accent-purple/40 hover:bg-neutral-gray hover:-translate-y-0.5"
          aria-label="Send email"
        >
          <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-purple/15 text-accent-purple text-base mb-4">
            <i class="fas fa-envelope" />
          </div>
          <h3 class="text-xs font-semibold tracking-wider uppercase text-accent-purple mb-1">Email</h3>
          <p class="text-[0.9375rem] font-semibold text-dark mb-1">{{ contact.email }}</p>
          <span class="text-xs text-dark/50">We typically respond within 24–48 hours</span>
        </a>
        <a
          :href="contact.websiteUrl"
          target="_blank"
          rel="noopener"
          class="block p-6 bg-white border border-neutral-border rounded-xl no-underline text-inherit transition-all hover:border-accent-purple/40 hover:bg-neutral-gray hover:-translate-y-0.5"
          aria-label="Visit website"
        >
          <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-purple/15 text-accent-purple text-base mb-4">
            <i class="fas fa-globe" />
          </div>
          <h3 class="text-xs font-semibold tracking-wider uppercase text-accent-purple mb-1">Website</h3>
          <p class="text-[0.9375rem] font-semibold text-dark mb-1">{{ contact.website }}</p>
          <span class="text-xs text-dark/50">Visit our main site</span>
        </a>
      </div>

      <div class="flex flex-col gap-6">
        <div class="p-6 bg-white border border-neutral-border rounded-xl overflow-hidden">
          <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-purple/15 text-accent-purple text-base mb-4">
            <i class="fas fa-map-marker-alt" />
          </div>
          <h3 class="text-xs font-semibold tracking-wider uppercase text-accent-purple mb-1">Location</h3>
          <address class="text-[0.9375rem] font-semibold text-dark not-italic leading-relaxed mb-1">
            {{ contact.addressLine1 }}<br />
            {{ contact.addressLine2 }}<br />
            {{ contact.city }}, Philippines
          </address>
          <span class="text-xs text-dark/50 block mb-4">Workflow Co-Working Space</span>
          <div class="mt-4 rounded overflow-hidden bg-white border border-neutral-border">
            <iframe
              :src="mapEmbedUrl"
              class="block w-full min-h-[380px] sm:min-h-[400px] md:min-h-[450px]"
              style="border:0"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Workflow Co-Working Space location map"
            />
            <a
              :href="mapDirectionsUrl"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center mt-2 text-[0.8125rem] text-accent-purple no-underline transition-colors hover:text-dark"
            >
              Open in Google Maps
              <i class="fas fa-external-link-alt ml-1 text-xs" />
            </a>
          </div>
        </div>

        <div class="p-6 sm:p-7 bg-white border border-neutral-border rounded-xl">
          <h2 class="text-lg sm:text-xl font-bold text-dark mb-1">Send us a message</h2>
          <p class="text-sm text-dark/60 mb-5">Fill out the form below and we'll get back to you soon.</p>
          <form class="space-y-4" @submit.prevent="onFormSubmit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label for="contact-name" class="block text-[0.8125rem] font-semibold text-dark/90 mb-1.5">Name</label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  class="w-full py-2.5 px-3.5 bg-white border border-neutral-border rounded-lg text-dark text-[0.9375rem] placeholder:text-dark/40 outline-none transition-colors focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20"
                />
              </div>
              <div>
                <label for="contact-email" class="block text-[0.8125rem] font-semibold text-dark/90 mb-1.5">Email</label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  class="w-full py-2.5 px-3.5 bg-white border border-neutral-border rounded-lg text-dark text-[0.9375rem] placeholder:text-dark/40 outline-none transition-colors focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20"
                />
              </div>
            </div>
            <div>
              <label for="contact-message" class="block text-[0.8125rem] font-semibold text-dark/90 mb-1.5">Message</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                name="message"
                placeholder="How can we help?"
                rows="5"
                required
                class="w-full py-2.5 px-3.5 min-h-[120px] resize-y bg-white border border-neutral-border rounded-lg text-dark text-[0.9375rem] placeholder:text-dark/40 outline-none transition-colors focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20"
              />
            </div>
            <button
              type="submit"
              class="inline-flex items-center py-2.5 px-5 bg-primary text-white font-bold text-sm border-0 rounded-full cursor-pointer transition-all hover:bg-secondary hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-purple/30"
            >
              Send Message
              <i class="fas fa-paper-plane ml-2 text-sm" />
            </button>
          </form>
        </div>
      </div>
    </div>

    <div class="mt-10 pt-8 border-t border-neutral-border">
      <h3 class="text-xs font-semibold tracking-wider uppercase text-accent-purple mb-4">Follow us</h3>
      <div class="flex gap-3">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          :aria-label="social.name"
          target="_blank"
          rel="noopener"
          class="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-purple/10 border border-accent-purple/20 text-dark/80 transition-colors hover:text-accent-purple hover:bg-accent-purple/15 hover:border-accent-purple/30"
        >
          <i :class="social.icon" />
        </a>
      </div>
    </div>

    <div class="mt-12 pt-8 border-t border-neutral-border">
      <p class="text-dark/60 text-sm mb-2">Related</p>
      <div class="flex flex-wrap gap-4">
        <NuxtLink to="/terms" class="text-sm text-accent-purple no-underline transition-colors hover:text-dark">Terms of Use</NuxtLink>
        <NuxtLink to="/privacy" class="text-sm text-accent-purple no-underline transition-colors hover:text-dark">Privacy Policy</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const contact = {
  email: 'info@techsavvies.space',
  website: 'www.techsavvies.space',
  websiteUrl: 'https://www.techsavvies.space',
  addressLine1: 'Workflow (Co-working Space)',
  addressLine2: '555 Don Anselmo Bernad Avenue',
  city: 'Ozamiz, Misamis Occidental'
}

const mapEmbedUrl =
  'https://www.google.com/maps?q=555+Don+Anselmo+Bernad+Avenue,+Ozamiz,+Misamis+Occidental,+Philippines&output=embed'
const mapDirectionsUrl =
  'https://www.google.com/maps/search/?api=1&query=555+Don+Anselmo+Bernad+Avenue,+Ozamiz,+Misamis+Occidental,+Philippines'

const socialLinks = [
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
  { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
  { name: 'GitHub', icon: 'fab fa-github', url: '#' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' }
]

const form = ref({ name: '', email: '', message: '' })

function onFormSubmit() {
  const { name, email, message } = form.value
  const subject = encodeURIComponent(`Contact from ${name || 'Visitor'} - TECH SAVVY`)
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
  window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
}
</script>
