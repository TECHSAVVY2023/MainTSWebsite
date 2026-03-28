<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to Home" />
    <main class="bg-neutral-gray pt-8 pb-20 sm:pt-12 sm:pb-24 md:pt-16 md:pb-32 relative overflow-hidden flex flex-col">
      <SectionWires gradient-id-prefix="swg-terms" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative flex-1 flex flex-col">
          <LegalPageHeader
            label="Legal"
            title="Terms of Use"
            subtitle="Please read these terms carefully before using our services."
            last-updated="Last updated: March 3, 2025"
          />
          <LegalAccordionSection
            :sections="sections"
            :open-sections="openSectionsArray"
            body-id-prefix="terms-body"
            @toggle="accordion.toggleSection"
            @expand-all="accordion.expandAll"
          />
          <LegalContactCta message="If you have any questions about these Terms of Use, please contact us." />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { sections, accordion, openSectionsArray } = useTermsPage()
</script>
