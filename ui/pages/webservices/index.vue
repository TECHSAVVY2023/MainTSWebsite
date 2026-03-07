<template>
   <div
      class="min-h-screen w-full relative bg-gradient-to-br from-[#0f0620] via-[#180b36] to-[#120428] text-[#e9e0ff] cursor-default">
      <!-- Hero -->
      <section class="max-w-6xl mx-auto px-6 relative z-10 sticky-boundary">

         <div class="grid lg:grid-cols-[1fr_360px] gap-16 items-start">

            <!-- LEFT COLUMN (SCROLLS) -->
            <div>

               <!-- HERO -->
               <section class="py-28">
                  <h2 class="lg:text-6xl text-3xl font-extrabold leading-tight text-[#ebc2ff]">
                     Your website, fully managed one subscription.
                  </h2>

                  <p class="mt-4 text-[#d6c9e8] max-w-xl py-10">
                     We build, host, secure, and update your site. Add social media management anytime.
                     Choose modular services and get an instant quote local and international billing supported.
                  </p>

                  <div class="mt-6 flex flex-wrap gap-3">
                     <!-- Primary CTA -->
                     <button type="button" @click="scrollToSection('configurator')" class="
                           inline-flex items-center justify-center
                           px-5 py-3 rounded-md font-medium capitalize
                           bg-[#f6a304] text-[#180b36]
                           transition-all duration-300 ease-out transform
                           hover:scale-[1.06]
                           hover:shadow-[0_10px_30px_rgba(246,163,4,0.45)]
                           hover:brightness-105
                           active:scale-[0.98]
                        ">
                        Get your custom package
                     </button>

                     <!-- Secondary CTA -->
                     <button type="button" @click="scrollToSection('contact')" class="
                              inline-flex items-center justify-center
                              px-5 py-3 rounded-md font-medium capitalize
                              border border-[#f6a304] text-[#ebc2ff]
                              transition-all duration-300 ease-out transform
                              hover:scale-[1.04]
                              hover:bg-[#f6a304]/60
                              hover:text-[#180b36]
                              hover:shadow-[0_0_24px_rgba(246,163,4,0.35)]
                              active:scale-[0.98]
                           ">
                        Schedule a consultation
                     </button>
                  </div>

               </section>

               <!-- EVERYTHING YOU NEED -->
               <section id="services" class="lg:pt-20 pt-10">
                  <div class="py-8 text-center">
                     <h3 class="text-2xl font-semibold text-[#ebc2ff]">
                        Everything you need in one place
                     </h3>
                     <p class="mt-2 text-[#d6c9e8]">
                        Website creation, ongoing management, and social growth bundled and customizable.
                     </p>
                  </div>

                  <div class="mt-8 grid md:grid-cols-3 gap-6 text-center">

                     <!-- Website Creation -->
                     <div class="glass-card px-8 py-8 flex flex-col items-center
                        bg-gradient-to-br
                        from-white/10 via-white/5 to-transparent
                        hover:from-white/15 hover:via-white/10 hover:to-white/25
                        backdrop-blur-xl
                        transition-all duration-300 ease-out
                        hover:scale-[1.05]
                        hover:shadow-[0_0_40px_rgba(235,194,255,0.25)]">
                        <h4 class="font-semibold text-[#ebc2ff] mb-7">
                           Website Creation
                        </h4>

                        <p class="text-[#d6c9e8] text-sm w-11/12">
                           Custom or template-based sites, responsive and SEO-ready.
                        </p>

                        <!-- Icon pinned to bottom -->
                        <div class="mt-auto pt-6">
                           <div class="w-20 h-20 flex items-center justify-center text-[#f6a304]">
                              <IconWebsite class="w-20 h-20" />
                           </div>
                        </div>
                     </div>

                     <!-- Ongoing Management -->
                     <div class="glass-card px-8 py-8 flex flex-col items-center
                           bg-gradient-to-br
                           from-white/10 via-white/5 to-transparent
                           hover:from-white/15 hover:via-white/10 hover:to-white/25
                           backdrop-blur-xl
                           transition-all duration-300 ease-out
                           hover:scale-[1.05]
                           hover:shadow-[0_0_40px_rgba(235,194,255,0.25)]">
                        <h4 class="font-semibold text-[#ebc2ff] mb-7">
                           Ongoing Management
                        </h4>

                        <p class="text-[#d6c9e8] text-sm w-11/12">
                           Security updates, backups, edits, data analytics and uptime monitoring.
                        </p>

                        <div class="mt-auto pt-6">
                           <div class="w-20 h-20 flex items-center justify-center text-[#f6a304]">
                              <IconMaintenance class="w-20 h-20" />
                           </div>
                        </div>
                     </div>

                     <!-- Social Media -->
                     <div class="glass-card px-8 py-8 flex flex-col items-center
                           bg-gradient-to-br
                           from-white/10 via-white/5 to-transparent
                           hover:from-white/15 hover:via-white/10 hover:to-white/25
                           backdrop-blur-xl
                           transition-all duration-300 ease-out
                           hover:scale-[1.05]
                           hover:shadow-[0_0_40px_rgba(235,194,255,0.25)]">
                        <h4 class="font-semibold text-[#ebc2ff] mb-7">
                           Social Media Marketing Add-on
                        </h4>

                        <p class="text-[#d6c9e8] text-sm w-11/12">
                           Graphics, multimedia posting, and engagement to extend reach.
                        </p>

                        <div class="mt-auto pt-6">
                           <div class="w-20 h-20 flex items-center justify-center text-[#f6a304]">
                              <IconSocial class="w-20 h-20" />
                           </div>
                        </div>
                     </div>

                  </div>
               </section>

            </div>

            <!-- RIGHT COLUMN (STICKY) -->
            <aside class="glass-card quote-card sticky-quote lg:sticky px-10 py-6 lg:mt-56 mt-10">
               <h3 class="text-lg font-semibold text-[#ebc2ff]">
                  Example Quick Quote
               </h3>

               <div class="mt-4 space-y-2 text-sm text-[#d6c9e8]">
                  <div class="flex justify-between">
                     <span>Standard Site</span>
                     <span>₱25,000 / $500</span>
                  </div>
                  <div class="flex justify-between">
                     <span>Pro Maintenance</span>
                     <span>₱5,000 / $100</span>
                  </div>
                  <div class="flex justify-between">
                     <span>Posting + Design</span>
                     <span>₱6,000 / $120</span>
                  </div>

                  <div class="border-t border-[#ebc2ff22] pt-3 mt-3">
                     <div class="flex justify-between font-semibold text-[#e9e0ff]">
                        <span>Total First Month</span>
                        <span>₱36,000 / $720</span>
                     </div>
                     <div class="text-xs text-[#cfc4f0] mt-2 italic">
                        Monthly after first month: ₱11,000 / $220
                     </div>
                  </div>
               </div>
            </aside>

         </div>
      </section>

      <!-- HOW IT WORKS -->
      <section class="relative w-full bg-[#120428]/80 backdrop-blur-xl border-y border-[#ebc2ff]/10 my-10">
         <div class="max-w-6xl mx-auto px-6 pt-8 pb-12">
            <!-- Section title -->
            <h3 class="text-2xl font-bold text-[#ebc2ff] mb-10">
               How it works
            </h3>

            <!-- Steps -->
            <div class="grid md:grid-cols-3 gap-10 md:gap-0">

               <!-- Step 1 -->
               <div class="flex gap-6 md:pr-10 md:border-r md:border-[#ebc2ff]/15">
                  <div class="flex items-stretch">
                     <span class="text-5xl md:text-6xl font-extrabold text-[#f6a304] leading-none">
                        1
                     </span>
                  </div>
                  <div>
                     <h4 class="text-lg font-semibold text-[#e9e0ff]">
                        Pick your website
                     </h4>
                     <p class="mt-2 text-sm text-[#d6c9e8]">
                        Template, standard, or premium custom designs tailored to your business.
                     </p>
                  </div>
               </div>

               <!-- Step 2 -->
               <div class="flex gap-6 md:px-10 md:border-r md:border-[#ebc2ff]/15">
                  <div class="flex items-stretch">
                     <span class="text-5xl md:text-6xl font-extrabold text-[#f6a304] leading-none">
                        2
                     </span>
                  </div>
                  <div>
                     <h4 class="text-lg font-semibold text-[#e9e0ff]">
                        Choose maintenance
                     </h4>
                     <p class="mt-2 text-sm text-[#d6c9e8]">
                        Select a monthly plan that fits your support, updates, and growth needs.
                     </p>
                  </div>
               </div>

               <!-- Step 3 -->
               <div class="flex gap-6 md:pl-10">
                  <div class="flex items-stretch">
                     <span class="text-5xl md:text-6xl font-extrabold text-[#f6a304] leading-none">
                        3
                     </span>
                  </div>
                  <div>
                     <h4 class="text-lg font-semibold text-[#e9e0ff]">
                        Add social media marketing
                     </h4>
                     <p class="mt-2 text-sm text-[#d6c9e8]">
                        Optional graphics, posting, and engagement to extend your online reach.
                     </p>
                  </div>
               </div>

            </div>
         </div>
      </section>


      <!-- CONFIGURATOR -->
      <section id="configurator" class="max-w-6xl mx-auto px-6 lg:py-16 relative z-10">
         <!-- Header -->
         <div class="mb-10">
            <h3 class="text-3xl font-semibold text-[#ebc2ff]">
               Build your custom package
            </h3>
            <p class="mt-2 text-[#d6c9e8] max-w-2xl">
               Choose your website, management level, and add-ons. Pricing updates instantly.
               Available in Philippine Peso or US Dollar.
            </p>
         </div>

         <!-- Currency selector -->
         <div class="flex gap-4 mb-10">


            <!-- Dollar -->
            <button @click="currency = 'usd'" :class="currency === 'usd'
               ? 'border-[#f6a304] shadow-[0_0_24px_rgba(246,163,4,0.45)]'
               : 'border-[#ebc2ff]/20'" class="flex items-center gap-3 px-5 py-4 rounded-xl border
                  bg-[#120428]/60 backdrop-blur
                  transition-all duration-300">
               <span class="text-2xl font-semibold text-[#f6a304] leading-none">
                  $
               </span>

               <div class="text-left">
                  <div class="font-medium text-[#e9e0ff]">US Dollar</div>
                  <div class="text-xs text-[#d6c9e8]">International billing</div>
               </div>
            </button>
            <!-- Peso -->
            <button @click="currency = 'php'" :class="currency === 'php'
               ? 'border-[#f6a304] shadow-[0_0_24px_rgba(246,163,4,0.45)]'
               : 'border-[#ebc2ff]/20'" class="flex items-center gap-3 px-5 py-4 rounded-xl border
                  bg-[#120428]/60 backdrop-blur
                  transition-all duration-300">
               <span class="text-2xl font-semibold text-[#f6a304] leading-none">
                  ₱
               </span>

               <div class="text-left">
                  <div class="font-medium text-[#e9e0ff]">Philippine Peso</div>
                  <div class="text-xs text-[#d6c9e8]">Local billing</div>
               </div>
            </button>
         </div>

         <!-- MAIN GRID -->
         <div class="grid lg:grid-cols-3 gap-8">
            <!-- LEFT: OPTIONS -->
            <div class="lg:col-span-2 space-y-14">

               <!-- WEBSITE SETUP -->
               <div>
                  <h4 class="text-2xl font-semibold text-[#ebc2ff] mb-2">
                     Website setup
                  </h4>
                  <p class="text-xs italic font-light tracking-wider text-[#f7e4ff] mb-6">
                     Strategic digital foundation engineered for credibility, conversion, and long-term scalability.
                  </p>
                  <div class="grid md:grid-cols-3 gap-6">

                     <div v-for="opt in websiteOptions" :key="opt.key" @click="selected.website = opt.key" :class="[
                        'cursor-pointer rounded-2xl border px-7 py-8 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden backdrop-blur-xl flex flex-col h-full',

                        opt.key === 'authority'
                           ? 'border-[#D4AF37]/40'
                           : 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border-[#ebc2ff]/15',

                        selected.website === opt.key
                           ? 'border-yellow-500 shadow-[0_0_36px_rgba(246,163,4,0.35)]'
                           : ''
                     ]">

                        <!-- Gold Background -->
                        <div v-if="opt.key === 'authority'" class="absolute inset-0 -z-10 rounded-2xl" style="background:
                  linear-gradient(
                     135deg,
                     rgba(212,175,55,0.85) 0%,
                     rgba(255,215,0,0.65) 35%,
                     rgba(184,134,11,0.85) 70%,
                     rgba(120,90,20,0.9) 100%
                  );">
                        </div>

                        <!-- Shimmer -->
                        <div v-if="opt.key === 'authority'"
                           class="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                           <div class="premium-shimmer"></div>
                        </div>

                        <!-- Title -->
                        <div :class="opt.key === 'authority'
                           ? 'text-xl font-bold tracking-wide text-[#360238]'
                           : 'text-lg font-semibold tracking-wide text-[#e9e0ff]'">
                           {{ opt.title }}
                        </div>

                        <!-- Description -->
                        <p :class="opt.key === 'authority'
                           ? 'mt-3 text-sm text-black/80'
                           : 'mt-3 text-sm text-[#d6c9e8]'">
                           {{ opt.description }}
                        </p>

                        <!-- Features -->
                        <ul :class="opt.key === 'authority'
                           ? 'mt-6 pt-5 border-t border-black/20 text-sm space-y-2 text-black/80'
                           : 'mt-6 pt-5 border-t border-white/10 text-sm space-y-2 text-[#cfc4f0]'">
                           <li v-for="item in opt.includes" :key="item">
                              • {{ item }}
                           </li>
                        </ul>

                        <!-- Price -->
                        <div :class="opt.key === 'authority'
                           ? 'mt-auto pt-8 text-2xl font-bold tracking-tight text-[#360238]'
                           : 'mt-auto pt-6 text-xl font-semibold tracking-tight text-[#f6a304]'">
                           {{ displayPrice(opt) }}
                        </div>

                     </div>

                  </div>
               </div>


               <!-- MAINTENANCE -->
               <div>
                  <h4 class="text-2xl font-semibold text-[#ebc2ff] mb-2">
                     Website maintenance <span class="text-sm font-normal">(monthly)</span>
                  </h4>
                  <p class="text-xs italic font-light tracking-wider text-[#f7e4ff] mb-6">
                     Continuous performance refinement and small strategic tweaks; large-scale changes are quoted
                     separately.
                  </p>
                  <div class="grid md:grid-cols-3 gap-6">

                     <div v-for="opt in maintenanceOptions" :key="opt.key" @click="selected.maintenance = opt.key"
                        :class="[
                           'cursor-pointer rounded-2xl border px-6 py-7 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden backdrop-blur-xl flex flex-col h-full',

                           opt.key === 'priority'
                              ? 'border-[#D4AF37]/40'
                              : 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border-[#ebc2ff]/15',

                           selected.maintenance === opt.key
                              ? 'border-yellow-500 shadow-[0_0_36px_rgba(246,163,4,0.35)]'
                              : ''
                        ]">

                        <!-- Gold Background -->
                        <div v-if="opt.key === 'priority'" class="absolute inset-0 -z-10 rounded-2xl" style="background:
                  linear-gradient(
                     135deg,
                     rgba(212,175,55,0.85) 0%,
                     rgba(255,215,0,0.65) 35%,
                     rgba(184,134,11,0.85) 70%,
                     rgba(120,90,20,0.9) 100%
                  );">
                        </div>

                        <!-- Shimmer -->
                        <div v-if="opt.key === 'priority'"
                           class="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                           <div class="premium-shimmer"></div>
                        </div>

                        <div :class="opt.key === 'priority'
                           ? 'text-lg font-bold tracking-wide text-[#360238]'
                           : 'text-lg font-semibold tracking-wide text-[#e9e0ff]'">
                           {{ opt.title }}
                        </div>

                        <p :class="opt.key === 'priority'
                           ? 'mt-3 text-sm text-black/80'
                           : 'mt-3 text-sm text-[#d6c9e8]'">
                           {{ opt.description }}
                        </p>

                        <ul :class="opt.key === 'priority'
                           ? 'mt-6 pt-5 border-t border-black/20 text-sm space-y-2 text-black/80'
                           : 'mt-6 pt-5 border-t border-white/10 text-sm space-y-2 text-[#cfc4f0]'">
                           <li v-for="item in opt.includes" :key="item">
                              • {{ item }}
                           </li>
                        </ul>

                        <div :class="opt.key === 'priority'
                           ? 'mt-auto pt-8 text-xl font-bold tracking-tight text-[#360238]'
                           : 'mt-auto pt-6 text-lg font-semibold tracking-tight text-[#f6a304]'">
                           {{
                              currency === 'usd'
                                 ? `$${maintenancePrice(opt, 'usd')}`
                                 : `₱${maintenancePrice(opt, 'local')}`
                           }}
                        </div>

                     </div>

                  </div>
               </div>


               <!-- MULTIMEDIA -->
               <div>
                  <h4 class="text-2xl font-semibold text-[#ebc2ff] mb-2">
                     Multimedia Support <span class="text-sm font-normal">(monthly)</span>
                  </h4>
                  <p class="text-xs italic font-light tracking-wider text-[#f7e4ff] mb-6">
                     Content production, paid advertising, and full-scale marketing campaigns are quoted separately.
                  </p>
                  <div class="grid md:grid-cols-3 gap-6">

                     <div v-for="opt in socialOptions" :key="opt.key" @click="selected.social = opt.key" :class="[
                        'cursor-pointer rounded-2xl border px-7 py-8 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden backdrop-blur-xl flex flex-col h-full',

                        opt.key === 'executive'
                           ? 'border-[#D4AF37]/40'
                           : 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border-[#ebc2ff]/15',

                        selected.social === opt.key
                           ? 'border-yellow-500 shadow-[0_0_36px_rgba(246,163,4,0.35)]'
                           : ''
                     ]">

                        <!-- Gold Background -->
                        <div v-if="opt.key === 'executive'" class="absolute inset-0 -z-10 rounded-2xl" style="background:
                  linear-gradient(
                     135deg,
                     rgba(212,175,55,0.85) 0%,
                     rgba(255,215,0,0.65) 35%,
                     rgba(184,134,11,0.85) 70%,
                     rgba(120,90,20,0.9) 100%
                  );">
                        </div>

                        <!-- Shimmer -->
                        <div v-if="opt.key === 'executive'"
                           class="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                           <div class="premium-shimmer"></div>
                        </div>

                        <div :class="opt.key === 'executive'
                           ? 'text-xl font-bold tracking-wide text-[#360238]'
                           : 'text-lg font-semibold tracking-wide text-[#e9e0ff]'">
                           {{ opt.title }}
                        </div>

                        <p :class="opt.key === 'executive'
                           ? 'mt-3 text-sm text-black/80'
                           : 'mt-3 text-sm text-[#d6c9e8]'">
                           {{ opt.description }}
                        </p>

                        <ul :class="opt.key === 'executive'
                           ? 'mt-6 pt-5 border-t border-black/20 text-sm space-y-2 text-black/80'
                           : 'mt-6 pt-5 border-t border-white/10 text-sm space-y-2 text-[#cfc4f0]'">
                           <li v-for="item in opt.includes" :key="item">
                              • {{ item }}
                           </li>
                        </ul>

                        <div :class="opt.key === 'executive'
                           ? 'mt-auto pt-8 text-2xl font-bold tracking-tight text-[#360238]'
                           : 'mt-auto pt-6 text-xl font-semibold tracking-tight text-[#f6a304]'">
                           {{ displayPrice(opt, true) }}
                        </div>

                     </div>

                  </div>
               </div>

            </div>


            <!-- RIGHT: SUMMARY (HEIGHT MATCH + STICKY CONTENT) -->
            <aside class="relative lg:col-span-1">

               <!-- Height anchor -->
               <div class="lg:h-full">

                  <!-- Sticky content -->
                  <div class="
                        lg:sticky
                        lg:top-1/3
                        lg:-translate-y-1/2
                        lg:mt-56
                        rounded-xl
                        border border-[#ebc2ff]/20
                        p-6
                        bg-[#120428]/70
                        backdrop-blur-xl
                        shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                        transition-all
                        ">
                     <h4 class="text-lg font-semibold text-[#ebc2ff]">
                        Quote summary
                     </h4>

                     <div class="mt-4 space-y-3 text-sm text-[#d6c9e8]">
                        <div class="flex justify-between">
                           <span>Website setup</span>
                           <span>{{ formatCurrency(totalSetupLocal, totalSetupUSD) }}</span>
                        </div>

                        <div class="flex justify-between">
                           <span>Maintenance (monthly)</span>
                           <span>{{ formatCurrency(totalMaintenanceLocal, totalMaintenanceUSD) }}</span>
                        </div>

                        <div class="flex justify-between">
                           <span>Social (monthly)</span>
                           <span>{{ formatCurrency(totalSocialLocal, totalSocialUSD) }}</span>
                        </div>

                        <!-- One-time payment breakdown -->
                        <div v-if="billing === 'one-time'" class="border-t border-[#ebc2ff]/15 pt-3 space-y-2">
                           <div class="flex justify-between font-semibold text-[#e9e0ff]">
                              <span>1st month</span>
                              <span>{{ formatCurrency(firstMonthLocal, firstMonthUSD) }}</span>
                           </div>
                           <div class="text-xs text-[#cfc4f0]">
                              (Website setup only)
                           </div>

                           <div class="flex justify-between font-semibold text-[#e9e0ff] pt-2">
                              <span>2nd month onwards</span>
                              <span>{{ formatCurrency(fourthMonthOnwardsLocal, fourthMonthOnwardsUSD) }}</span>
                           </div>
                           <div class="text-xs text-[#cfc4f0]">
                              (Maintenance + Social)
                           </div>
                        </div>

                        <!-- Split payment breakdown -->
                        <div v-if="billing === 'split'" class="border-t border-[#ebc2ff]/15 pt-3 space-y-2">
                           <div class="flex justify-between font-semibold text-[#e9e0ff]">
                              <span>1st month</span>
                              <span>{{ formatCurrency(firstMonthLocal, firstMonthUSD) }}</span>
                           </div>
                           <div class="text-xs text-[#cfc4f0]">
                              (1/3 of website setup)
                           </div>

                           <div class="flex justify-between font-semibold text-[#e9e0ff] pt-2">
                              <span>2nd - 3rd month</span>
                              <span>{{ formatCurrency(secondThirdMonthLocal, secondThirdMonthUSD) }}</span>
                           </div>
                           <div class="text-xs text-[#cfc4f0]">
                              (1/3 setup + Maintenance + Social)
                           </div>

                           <div class="flex justify-between font-semibold text-[#e9e0ff] pt-2">
                              <span>4th month onwards</span>
                              <span>{{ formatCurrency(fourthMonthOnwardsLocal, fourthMonthOnwardsUSD) }}</span>
                           </div>
                           <div class="text-xs text-[#cfc4f0]">
                              (Maintenance + Social only)
                           </div>
                        </div>

                        <!-- Payment options -->
                        <div class="pt-10">
                           <div class="text-xs uppercase tracking-wide text-[#cfc4f0] mb-2">
                              Payment option
                           </div>

                           <div class="flex gap-2">
                              <!-- One-time -->
                              <button @click="billing = 'one-time'" class="
                                 flex-1 px-3 py-2 rounded-md text-sm font-medium
                                 transition-all duration-200
                                 border
                                 " :class="billing === 'one-time'
                                    ? 'bg-[#f6a304] text-[#180b36] border-[#f6a304] shadow-[0_0_18px_rgba(246,163,4,0.45)]'
                                    : 'border-[#ebc2ff]/20 text-[#e9e0ff] hover:bg-white/5'">
                                 One-time
                              </button>

                              <!-- Split -->
                              <button @click="billing = 'split'" class="
                                 flex-1 px-3 py-2 rounded-md text-sm font-medium
                                 transition-all duration-200
                                 border
                                 " :class="billing === 'split'
                                    ? 'bg-[#f6a304] text-[#180b36] border-[#f6a304] shadow-[0_0_18px_rgba(246,163,4,0.45)]'
                                    : 'border-[#ebc2ff]/20 text-[#e9e0ff] hover:bg-white/5'">
                                 Split (3 months)
                              </button>
                           </div>

                           <!-- Helper text -->
                           <p class="mt-2 text-[11px] text-[#cfc4f0] leading-snug">
                              Split option divides website setup into 3 equal monthly payments.
                           </p>
                        </div>

                     </div>

                     <div class="mt-6 flex flex-col gap-3">
                        <button @click="goToContactWithPackage"
                           class="px-4 py-2 rounded-md bg-[#f6a304] text-[#180b36] font-medium text-center transition hover:brightness-110 ">
                           Get this package
                        </button>

                     </div>
                  </div>

               </div>
            </aside>
         </div>
      </section>

      <!-- Contact Form -->
      <section id="contact" ref="contactSection" class="max-w-3xl mx-auto px-6 lg:py-20 py-10 relative z-10">
         <div class="text-center mb-10">
            <h3 class="text-3xl font-semibold text-[#ebc2ff]">
               Request a Proposal
            </h3>
            <p class="mt-3 text-[#d6c9e8] max-w-xl mx-auto">
               Tell us about your project and we’ll get back to you with a tailored proposal,
               pricing breakdown, and timeline.
            </p>
         </div>

         <form @submit.prevent="submitForm" class="glass-card p-8 space-y-5">

            <!-- Name + Email -->
            <div class="grid sm:grid-cols-2 gap-4">
               <input v-model="form.name" required placeholder="Full name"
                  class="input-field focus:ring-1 focus:ring-[#f6a304]/40 placeholder:text-[#d6c9e8] placeholder:opacity-70" />

               <input v-model.trim="form.email" type="email" inputmode="email" required placeholder="Email address"
                  class="input-field focus:ring-1 focus:ring-[#f6a304]/40" />

            </div>

            <!-- Business -->
            <input v-model="form.business" required placeholder="Business name or website"
               class="input-field w-full focus:ring-1 focus:ring-[#f6a304]/40 placeholder:text-[#d6c9e8] placeholder:opacity-70" />

            <!-- Interest -->
            <div class="relative">
               <select v-model="form.interest" required class="
                     input-field
                     w-full
                     appearance-none
                     bg-[#1a0f36]
                     pr-12
                     cursor-pointer
                     transition-all duration-200
                     focus:ring-1 focus:ring-[#f6a304]/50
                     focus:border-[#f6a304]/60
                  " :class="form.interest
                     ? 'text-[#ebc2ff]'
                     : 'text-[#d6c9e8] opacity-60'">
                  <!-- Placeholder -->
                  <option value="" disabled hidden>
                     What are you interested in?
                  </option>

                  <!-- Options -->
                  <option value="website" class="bg-[#120428] text-[#e9e0ff]">
                     Website + Management
                  </option>

                  <option value="social" class="bg-[#120428] text-[#e9e0ff]">
                     Social Media Management
                  </option>

                  <option value="both" class="bg-[#120428] text-[#e9e0ff]">
                     Website + Social Media
                  </option>
               </select>

               <!-- Dropdown arrow -->
               <div class="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg class="w-4 h-4 transition-colors duration-200"
                     :class="form.interest ? 'text-[#ebc2ff]' : 'text-[#9a8fc0]'" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
               </div>
            </div>


            <!-- Message -->
            <textarea v-model="form.message" rows="8" minlength="20" required
               placeholder="Briefly describe your goals, timeline, or any specific requirements"
               class="input-field message-textarea w-full resize-none overflow-y-auto focus:ring-1 focus:ring-[#f6a304]/40 placeholder:text-[#d6c9e8] placeholder:opacity-70"></textarea>

            <!-- Anti Bot Field -->
            <input v-model="form.company" type="text" tabindex="-1" autocomplete="off" class="hidden" />

            <!-- Consent -->
            <div class="flex items-start">
               <label class="
                     flex items-start gap-3
                     cursor-pointer
                     select-none
                     origin-left
                     transition-all duration-300 ease-out
                  " :class="form.terms
                     ? 'text-[#f6a304] scale-[1.03] font-bold'
                     : 'text-[#e9e0ff]'">
                  <!-- Checkbox -->
                  <input v-model="form.terms" type="checkbox" required class="
                     mt-1
                     h-5 w-5
                     rounded
                     accent-[#f6a304]
                     transition-all duration-300
                     focus:ring-2 focus:ring-[#f6a304]/40
                     checked:scale-100
                     " />
                  <!-- Text -->
                  <span class="
                     leading-snug
                     transition-all duration-300
                     " :class="form.terms
                        ? 'tracking-wide'
                        : 'tracking-normal'">
                     I agree to be contacted regarding my request.
                  </span>
               </label>
            </div>


            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
               <button type="submit" :disabled="submitting" class="flex-1 px-5 py-3 rounded-md font-semibold transition-all duration-300
                  bg-[#f6a304] text-[#180b36]
                  hover:shadow-[0_0_24px_rgba(246,163,4,0.45)]
                  disabled:opacity-60 disabled:cursor-not-allowed">
                  <span v-if="!submitting">Send request</span>
                  <span v-else>Sending…</span>
               </button>



               <button type="button" @click="resetForm" class="px-5 py-3 rounded-md
               border border-[#ebc2ff33]
               text-[#e9e0ff]
               transition-all duration-300
               hover:bg-white/5">
                  Reset
               </button>
            </div>

            <!-- Success message -->
            <div v-if="submitted" class="pt-2 text-sm text-[#9ef08a]">
               Thank you — we’ll reach out within 1–2 business days.
            </div>

            <!-- Error message -->
            <div v-if="submitError" class="text-sm text-red-400">
               {{ submitError }}
            </div>

         </form>

         <!-- Overlay -->
         <div v-if="overlay.visible"
            class="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur">
            <div class="bg-[#120428] border border-[#ebc2ff]/20 rounded-xl p-8 w-72 text-center">

               <!-- Loading -->
               <div v-if="overlay.state === 'loading'">
                  <div
                     class="mx-auto h-10 w-10 border-4 border-[#f6a304]/30 border-t-[#f6a304] rounded-full animate-spin">
                  </div>
                  <p class="mt-4 text-sm text-[#e9e0ff]">Sending…</p>
               </div>

               <!-- Success -->
               <div v-if="overlay.state === 'success'">
                  <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-[#9ef08a]/20">
                     <svg viewBox="0 0 24 24" class="h-8 w-8 text-[#9ef08a]" fill="none" stroke="currentColor"
                        stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                     </svg>
                  </div>
                  <p class="mt-4 font-semibold text-[#9ef08a]">
                     Successfully sent
                  </p>
               </div>

               <!-- Error -->
               <div v-if="overlay.state === 'error'">
                  <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-500/20">
                     <svg viewBox="0 0 24 24" class="h-8 w-8 text-red-400" fill="none" stroke="currentColor"
                        stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </div>

                  <p class="mt-4 font-semibold text-red-400">
                     {{ overlay.message || 'Something went wrong. Please email us directly at info@techsavvies.space' }}
                  </p>
               </div>

            </div>
         </div>

      </section>


      <!-- Footer -->
      <footer class="mt-12 relative z-10 px-6 pb-12">
         <div
            class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#cfc4f0]">
            <div>© <strong class="text-[#ebc2ff]">TECHSAVVY</strong> | Web Development & Management Subscription
            </div>
            <div>Contact Us: <a href="mailto:info@techsavvies.space"
                  class="underline text-[#ebc2ff] font-bold">info@techsavvies.space</a></div>
         </div>
      </footer>
   </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import IconWebsite from '@/components/icons/IconWebsite.vue'
import IconMaintenance from '@/components/icons/IconMaintenance.vue'
import IconSocial from '@/components/icons/IconSocial.vue'

function scrollToSection(id) {
   nextTick(() => {
      const el = document.getElementById(id)
      if (!el) return

      el.scrollIntoView({
         behavior: 'smooth',
         block: 'start'
      })
   })
}

// Dollar to Peso conversion rate (scalable)
// Change this rate to update all PHP prices automatically
const DOLLAR_RATE = 58.01

function goToContactWithPackage() {
   let billingBreakdown = ''

   if (billing.value === 'one-time') {
      billingBreakdown = `
Payment option: One-time payment for website setup

Billing breakdown:
• 1st month: ${formatCurrency(firstMonthLocal.value, firstMonthUSD.value)} (Website setup only)
• 2nd month onwards: ${formatCurrency(fourthMonthOnwardsLocal.value, fourthMonthOnwardsUSD.value)} (Maintenance + Social)
`
   } else {
      billingBreakdown = `
Payment option: Split into 3 monthly payments

Billing breakdown:
• 1st month: ${formatCurrency(firstMonthLocal.value, firstMonthUSD.value)} (1/3 of website setup)
• 2nd - 3rd month: ${formatCurrency(secondThirdMonthLocal.value, secondThirdMonthUSD.value)} (1/3 setup + Maintenance + Social)
• 4th month onwards: ${formatCurrency(fourthMonthOnwardsLocal.value, fourthMonthOnwardsUSD.value)} (Maintenance + Social only)
`
   }

   form.value.message = `
Selected package summary:

Website setup: ${formatCurrency(totalSetupLocal.value, totalSetupUSD.value)}
Maintenance (monthly): ${formatCurrency(totalMaintenanceLocal.value, totalMaintenanceUSD.value)}
Social (monthly): ${formatCurrency(totalSocialLocal.value, totalSocialUSD.value)}

${billingBreakdown}
Please contact me with the next steps.
`.trim()

   scrollToSection('contact')
}

const websiteOptions = [
   {
      key: 'foundation',
      title: 'Foundation Site',
      description: 'Professional online presence built for credibility and clarity.',
      includes: [
         '3–5 structured core pages',
         'Conversion-ready layout architecture',
         'Mobile-first responsive design',
         'Basic SEO framework setup',
         'Inquiry / lead form integration',
         'Performance-optimized deployment'
      ],
      price_usd: 450,
      price_local: Math.round(450 * DOLLAR_RATE / 100) * 100
   },
   {
      key: 'growth',
      title: 'Growth Site',
      description: 'Built to convert visitors into leads with strategic UX structure.',
      recommended: true,
      includes: [
         'Everything in Foundation',
         'Conversion-focused page hierarchy',
         'Custom UI sections & brand styling',
         'Lead capture flow logic',
         'Analytics & tracking integration',
         'CMS-ready expandable structure'
      ],
      price_usd: 750,
      price_local: Math.round(750 * DOLLAR_RATE / 100) * 100
   },
   {
      key: 'authority',
      title: 'Authority Platform',
      description: 'High-impact digital platform engineered for brand leadership.',
      premium: true,
      includes: [
         'Everything in Growth',
         'Advanced UI interactions & polish',
         'Scalable architecture for expansion',
         'Content / event-ready structure',
         'Premium brand-level design refinement',
         'Future feature integration-ready build'
      ],
      price_usd: 1200,
      price_local: Math.round(1200 * DOLLAR_RATE / 100) * 100
   }
]

const maintenanceOptions = [
   {
      key: 'care',
      title: 'Care Plan',
      description: 'Ongoing protection and stability for your digital presence.',
      multiplier: 1, // base level
      includes: [
         'Security & dependency updates',
         'Performance monitoring',
         'Uptime supervision',
         'Up to 2 minor content adjustments',
         'Monthly system health check'
      ]
   },
   {
      key: 'optimize',
      title: 'Optimize Plan',
      description: 'Continuous refinement to improve performance and conversions.',
      recommended: true,
      multiplier: 1.6,
      includes: [
         'Everything in Care',
         'UX & layout refinement adjustments',
         'SEO health review',
         'Conversion improvement tweaks',
         'Monthly strategic recommendation'
      ]
   },
   {
      key: 'priority',
      title: 'Priority Plan',
      description: 'Embedded digital support with proactive strategy.',
      premium: true,
      multiplier: 2.4,
      includes: [
         'Everything in Optimize',
         'Priority turnaround support',
         'Reasonable ongoing adjustments (fair-use)',
         'Quarterly performance review',
         'Direct support channel'
      ]
   }
]

const socialOptions = [
   {
      key: 'monitor',
      title: 'Community Monitor',
      description: 'Professional oversight of your existing social presence.',
      includes: [
         'Account monitoring (5 days/week)',
         'Comment & DM moderation',
         'Basic audience interaction (replies only)',
         'Post scheduling (client-provided content)',
         'Monthly activity summary'
      ],
      price_usd: 150,
      price_local: Math.round(150 * DOLLAR_RATE / 100) * 100
   },
   {
      key: 'manage',
      title: 'Active Management',
      description: 'Structured management with light content coordination.',
      recommended: true,
      includes: [
         'Everything in Monitor',
         'Caption refinement & formatting',
         'Hashtag formatting & optimization',
         'Light engagement strategy (non-aggressive)',
         'Content calendar coordination (client assets)'
      ],
      price_usd: 280,
      price_local: Math.round(280 * DOLLAR_RATE / 100) * 100
   },
   {
      key: 'executive',
      title: 'Executive Presence',
      description: 'High-level brand presence management with premium oversight.',
      premium: true,
      includes: [
         'Everything in Active Management',
         'Multi-platform oversight (up to 3)',
         'Reputation monitoring & escalation',
         'Quarterly brand positioning review',
         'Priority response handling',
         'Basic performance interpretation (no guarantees)'
      ],
      price_usd: 450,
      price_local: Math.round(450 * DOLLAR_RATE / 100) * 100
   }
]

// Reactive state
const currency = ref('usd') // 'php' | 'usd' | 'both'

const selected = ref({
   website: websiteOptions[0].key,
   maintenance: 'care',
   social: socialOptions[0].key
})
const billing = ref('one-time') // 'split' | 'one-time'

// Form state
const form = ref({ name: '', email: '', business: '', interest: '', message: '', terms: false })
const submitting = ref(false)
const submitted = ref(false)
const submitError = ref('')

// Helpers (existing)
function findOption(list, key) {
   return list.find((i) => i.key === key) || list[0]
}

function displayPrice(opt, monthly = false) {
   if (currency.value === 'php') return `₱${monthly ? opt.price_local : opt.price_local}`
   if (currency.value === 'usd') return `$${monthly ? opt.price_usd : opt.price_usd}`
   // both
   return `₱${monthly ? opt.price_local : opt.price_local} / $${monthly ? opt.price_usd : opt.price_usd}`
}

const selectedWebsite = computed(() => {
   return websiteOptions.find(w => w.key === selected.value.website)
      || websiteOptions[0]
})

const baseMaintenanceUSD = computed(() => {
   const setup = selectedWebsite.value?.price_usd || 0
   return (setup * 0.7) / 4
})

const baseMaintenanceLocal = computed(() => {
   const setup = selectedWebsite.value?.price_local || 0
   return (setup * 0.7) / 4
})

function maintenancePrice(opt, currencyType = 'usd') {
   const base = currencyType === 'usd'
      ? baseMaintenanceUSD.value
      : baseMaintenanceLocal.value

   const price = base * opt.multiplier

   return Number.isFinite(price) ? Math.round(price) : 0
}


const totalSetupLocal = computed(() => findOption(websiteOptions, selected.value.website).price_local)
const totalSetupUSD = computed(() => findOption(websiteOptions, selected.value.website).price_usd)

const totalMaintenanceLocal = computed(() => {
   const opt = findOption(maintenanceOptions, selected.value.maintenance)
   return maintenancePrice(opt, 'local')
})

const totalMaintenanceUSD = computed(() => {
   const opt = findOption(maintenanceOptions, selected.value.maintenance)
   return maintenancePrice(opt, 'usd')
})

const totalSocialLocal = computed(() => findOption(socialOptions, selected.value.social).price_local)
const totalSocialUSD = computed(() => findOption(socialOptions, selected.value.social).price_usd)

// Recurring monthly after setup (starts from 2nd month onwards)
const recurringLocal = computed(() => totalMaintenanceLocal.value + totalSocialLocal.value)
const recurringUSD = computed(() => totalMaintenanceUSD.value + totalSocialUSD.value)

// Split payment calculations (website setup divided into 3 months)
const splitMonths = 3
const splitSetupLocal = computed(() => Math.round(totalSetupLocal.value / splitMonths / 100) * 100)
const splitSetupUSD = computed(() => Math.round(totalSetupUSD.value / splitMonths))

// First month: website setup only (or 1/3 if split)
const firstMonthLocal = computed(() => {
   if (billing.value === 'split') {
      return splitSetupLocal.value
   }
   return totalSetupLocal.value
})

const firstMonthUSD = computed(() => {
   if (billing.value === 'split') {
      return splitSetupUSD.value
   }
   return totalSetupUSD.value
})

// 2nd-3rd month (split only): remaining website setup + maintenance/social
const secondThirdMonthLocal = computed(() => splitSetupLocal.value + recurringLocal.value)
const secondThirdMonthUSD = computed(() => splitSetupUSD.value + recurringUSD.value)

// 4th month onwards (or 2nd month for one-time): maintenance/social only
const fourthMonthOnwardsLocal = computed(() => recurringLocal.value)
const fourthMonthOnwardsUSD = computed(() => recurringUSD.value)

function formatCurrency(local, usd) {
   if (currency.value === 'php') return `₱${local.toLocaleString()}`
   if (currency.value === 'usd') return `$${usd.toLocaleString()}`
   return `₱${local.toLocaleString()} / $${usd.toLocaleString()}`
}

function looksLikeGibberish(text) {
   if (!text) return true

   const letters = text.replace(/[^a-zA-Z]/g, '')

   // If there are no letters at all, it's invalid
   if (letters.length === 0) return true

   const uniqueRatio = new Set(letters).size / letters.length

   return (
      letters.length < 2 ||        // too short
      uniqueRatio < 0.35 ||        // low character diversity
      /(.)\1{4,}/.test(text)       // repeated characters (aaaaa)
   )
}

const overlay = ref({
   visible: false,
   state: 'loading', // loading | success | error
   message: '',
})

async function submitForm() {
   if (submitting.value || submitted.value) return

   submitError.value = ''
   submitting.value = true

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

   if (!emailRegex.test(form.value.email)) {
      submitError.value = 'Please enter a valid email address.'
      submitting.value = false
      return
   }

   if (looksLikeGibberish(form.value.name.trim())) {
      submitError.value = 'Please enter a real name.'
      submitting.value = false
      return
   }

   const MIN_MESSAGE_LENGTH = 20

   if (form.value.message.trim().length < MIN_MESSAGE_LENGTH) {
      submitError.value =
         'Please provide more details about your project (at least 20 characters).'
      submitting.value = false
      return
   }


   const payload = {
      name: form.value.name.trim(),
      email: form.value.email.trim(),
      business: form.value.business?.trim() || '',
      interest: form.value.interest,
      message: form.value.message.trim(),
      company: form.value.company || '',
      billing_option: billing.value,
   }

   try {
      const config = useRuntimeConfig()

      overlay.value.visible = true
      overlay.value.state = 'loading'
      overlay.value.message = ''

      await $fetch(`${config.public.apiBase}/contact/`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: payload,
      })

      submitted.value = true
      overlay.value.state = 'success'

      setTimeout(() => {
         overlay.value.visible = false
         resetForm()
         submitted.value = false
         submitting.value = false
      }, 3000)
   } catch (error) {
      submitting.value = false

      overlay.value.visible = true
      overlay.value.state = 'error'

      // Rate limit (429)
      if (error?.status === 429) {
         overlay.value.message =
            error?.data?.error ||
            'You have recently submitted a request. Please wait a few minutes before trying again.'
      }

      // Validation errors (400)
      else if (error?.status === 400 && error?.data?.errors) {
         overlay.value.message =
            Object.values(error.data.errors)?.[0]?.[0] ||
            'Invalid input. Please review your message.'
      }

      // Fallback
      else {
         overlay.value.message =
            'Something went wrong. Please try again or contact us directly.'
      }

      // Auto-close error overlay
      setTimeout(() => {
         overlay.value.visible = false
      }, 3500)
   }

}

function resetForm() {
   form.value = {
      name: '',
      email: '',
      business: '',
      interest: '',
      message: '',
      company: '',
      terms: false
   }
}


</script>

<style scoped>
.checkmark-circle {
   stroke: #9ef08a;
   stroke-width: 3;
   stroke-dasharray: 166;
   stroke-dashoffset: 166;
   animation: draw-circle 0.6s ease-out forwards;
}

.checkmark-check {
   stroke: #9ef08a;
   stroke-width: 4;
   stroke-linecap: round;
   stroke-linejoin: round;
   stroke-dasharray: 48;
   stroke-dashoffset: 48;
   animation: draw-check 0.4s ease-out 0.6s forwards;
}

@keyframes draw-circle {
   to {
      stroke-dashoffset: 0;
   }
}

@keyframes draw-check {
   to {
      stroke-dashoffset: 0;
   }
}

/* Custom scrollbar for textarea */
.message-textarea::-webkit-scrollbar {
   width: 6px;
}

.message-textarea::-webkit-scrollbar-track {
   background: transparent;
}

.message-textarea::-webkit-scrollbar-thumb {
   background-color: rgba(235, 194, 255, 0.35);
   border-radius: 9999px;
}

.message-textarea:hover::-webkit-scrollbar-thumb {
   background-color: rgba(246, 163, 4, 0.6);
}

/* Firefox */
.message-textarea {
   scrollbar-width: thin;
   scrollbar-color: rgba(235, 194, 255, 0.45) transparent;
}

/* Sticky behavior */
@media (min-width: 1024px) {
   .sticky-quote {
      position: sticky;
      top: 120px;
      align-self: flex-start;
   }
}

/* Quote sizing */
.quote-card {
   max-width: 360px;
}

/* Reduce visual dominance of quote on scroll */
@media (min-width: 1024px) {
   .quote-card {
      opacity: 0.95;
   }
}

/* ==============================
   MOBILE FALLBACK
   ============================== */
@media (max-width: 1023px) {
   .sticky-quote {
      position: relative;
      top: auto;
      max-width: 100%;
   }
}

/* Glassmorphism surfaces */
.glass-card {
   border-radius: 12px;
   backdrop-filter: blur(16px) saturate(120%);
   border: 1px solid rgba(235, 194, 255, 0.08);
   box-shadow: 0 6px 24px rgba(8, 6, 20, 0.55);
}

/* Inputs */
.input-field {
   background: transparent;
   border: 1px solid rgba(235, 194, 255, 0.1);
   padding: 0.6rem 0.75rem;
   border-radius: 8px;
   color: #f1eafd;
}

/* Responsive tweaks */
@media (max-width: 768px) {
   .glass-card {
      padding: 1rem;
      border-radius: 10px;
   }

   header {
      padding-left: 1rem;
      padding-right: 1rem;
   }
}

/* small accessibility & visual polish */
a {
   text-decoration: none;
}

.premium-shimmer {
   position: absolute;
   top: -100%;
   left: -100%;
   width: 200%;
   height: 200%;
   background: linear-gradient(115deg,
         rgba(255, 255, 255, 0) 30%,
         rgba(255, 255, 255, 0.25) 45%,
         rgba(255, 255, 255, 0.05) 55%,
         rgba(255, 255, 255, 0) 70%);
   transform: rotate(25deg);
   opacity: 0;
}

.cursor-pointer:hover .premium-shimmer {
   animation: shimmerSweep 1.6s ease forwards;
   opacity: 1;
}

@keyframes shimmerSweep {
   0% {
      transform: translateX(-60%) translateY(-60%) rotate(25deg);
   }

   100% {
      transform: translateX(60%) translateY(60%) rotate(25deg);
   }
}
</style>