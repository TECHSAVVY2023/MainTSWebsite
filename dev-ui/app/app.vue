<template>
  <NuxtPage />
</template>

<style>
/* Section wires - must stay behind content on all pages */
.section-wires {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.55;
  z-index: 0;
}
/* Content layer - always above wires, creates stacking context */
.section-content-layer {
  position: relative;
  z-index: 10;
  isolation: isolate;
}
.section-wires-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* Wire animation */
.section-wire {
  stroke-dasharray: 30 60;
  stroke-dashoffset: 0;
  animation: section-wire-flow 4s linear infinite;
}
.section-wire-2 { animation-delay: -0.7s; }
.section-wire-3 { animation-delay: -1.4s; }
.section-wire-4 { animation-delay: -2.1s; }
.section-wire-5 { animation-delay: -2.8s; }
.section-wire-6 { animation-delay: -3.5s; }
@keyframes section-wire-flow {
  to { stroke-dashoffset: -90; }
}
/* Section title card - same bg as main, covers wires, invisible */
.section-title-card {
  background: #14082E;
  padding: 1rem 1.5rem;
  width: fit-content;
  max-width: 100%;
  border: none;
  box-shadow: none;
  outline: none;
}
</style>
