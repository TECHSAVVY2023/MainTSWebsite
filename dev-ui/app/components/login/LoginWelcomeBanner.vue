<template>
  <aside class="flex-shrink-0 lg:w-[55%] relative overflow-hidden flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-16 bg-gradient-to-b from-violet via-violet-dark to-violet-dark">
    <div class="absolute inset-0 bg-[linear-gradient(rgba(181,163,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(181,163,255,0.03)_1px,transparent_1px)] bg-[length:48px_48px] pointer-events-none" aria-hidden="true" />
    <SectionWires gradient-id-prefix="wire-grad" />
    <div class="absolute rounded-full blur-[80px] opacity-40 pointer-events-none w-80 h-80 bg-[radial-gradient(circle,rgba(181,163,255,0.35)_0%,transparent_70%)] -bottom-[10%] -right-[5%]" aria-hidden="true" />
    <div class="absolute rounded-full blur-[80px] opacity-40 pointer-events-none w-60 h-60 bg-[radial-gradient(circle,rgba(255,215,74,0.2)_0%,transparent_70%)] top-[20%] -left-[5%]" aria-hidden="true" />
    <div class="relative z-10 max-w-[28rem] p-8 sm:p-9 rounded-xl bg-[rgba(35,21,89,0.95)] backdrop-blur-[20px] border border-accent-purple/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <p class="text-xs font-semibold tracking-[0.15em] uppercase text-accent-purple mb-2">Welcome</p>
      <h1 class="text-[#F7F5FC] text-[1.75rem] font-bold tracking-[-0.02em] leading-tight mb-4">
        <span class="block font-medium text-white/90 text-lg sm:text-xl">Welcome to</span>
        <span class="block text-3xl sm:text-[2.5rem] font-extrabold bg-gradient-to-r from-accent-purple to-accent-gold bg-clip-text text-transparent">TECHSAVVY</span>
      </h1>
      <p class="text-white/92 text-[0.9375rem] sm:text-base leading-relaxed">
        Code · Create · Connect. Join our growing IT community in Misamis Occidental and grow with aspiring developers.
      </p>
    </div>
  </aside>
</template>
