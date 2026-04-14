<template>
  <div class="relative flex w-full items-center justify-center bg-violet-600 px-5 py-7 sm:px-10 sm:py-10 lg:px-10 lg:py-16 xl:px-16">
    <!-- Decorative background elements -->
    <div>
      <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:32px_32px]" aria-hidden="true" />

    <div class="relative z-10 mx-auto w-full max-w-sm">
      <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-1.5 lg:mb-8">
        <span class="h-2 w-2 shrink-0 rounded-full bg-amber-400 animate-pulse" />
        <span class="text-[9px] font-black uppercase tracking-[0.18em] text-white sm:text-[10px] sm:tracking-[0.2em]">Community Access</span>
      </div>

      <h1 class="mb-3 font-black leading-[0.95] tracking-tighter text-white sm:mb-4 lg:mb-6 text-[1.85rem] sm:text-[2.15rem] xl:text-[3.5rem]">
        WELCOME<br />
        <span class="bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
          BACK.
        </span>
      </h1>

      <p class="mb-2 text-xs font-semibold tracking-wide text-violet-200 sm:mb-3 sm:text-sm xl:text-base">
        Code · Create · Connect
      </p>

      <p class="mb-4 max-w-[22rem] text-sm leading-relaxed text-white/85 sm:mb-5 lg:mb-12 xl:text-base">
        Join our growing IT community in Misamis Occidental and grow with aspiring developers.
      </p>

      <!-- Feature list: tighter on small screens -->
      <div class="space-y-2 sm:space-y-4">
        <div class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-sm shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:gap-4 sm:px-4 sm:py-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300 sm:h-10 sm:w-10">
            <i class="fas fa-project-diagram text-xs sm:text-sm" />
          </div>
          <div class="min-w-0">
            <p class="text-[11px] font-bold uppercase leading-tight tracking-widest text-white sm:text-xs">Real-world Projects</p>
            <p class="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-white/60 sm:text-[10px]">Build meaningful software</p>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-sm shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:gap-4 sm:px-4 sm:py-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sky-400 sm:h-10 sm:w-10">
            <i class="fas fa-users text-xs sm:text-sm" />
          </div>
          <div class="min-w-0">
            <p class="text-[11px] font-bold uppercase leading-tight tracking-widest text-white sm:text-xs">Community Center</p>
            <p class="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-white/60 sm:text-[10px]">Connect with fellow IT enthusiasts</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
