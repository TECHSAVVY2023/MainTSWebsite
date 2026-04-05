<template>
  <div 
    class="relative font-roboto text-[#1a0533] min-h-screen flex overflow-hidden bg-white"
  >
    <template v-if="!showAllContent">
      <!-- ── Sidebar ────────────────────────────────────────────── -->
      <aside class="hidden lg:flex w-72 h-screen flex-col bg-white border-r border-violet-100 p-6 z-40 shrink-0">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-12 px-2 group cursor-pointer" @click="activeView = 'Hub'">
          <div class="w-12 h-12 flex items-center justify-center transition-all duration-300">
            <img :src="logoUrl" alt="Logo" class="h-8 w-auto object-contain" />
          </div>
          <span class="font-black text-2xl text-[#1a0533] uppercase tracking-tighter">TechSavvy</span>
        </div>

        <!-- Primary Action -->
        <button
          @click="handleNewContent"
          class="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-bold uppercase tracking-widest bg-emerald-500 text-white transition-all duration-300 mb-10 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
        >
          <i class="fas fa-star text-xs" /> Share Update
        </button>

        <!-- Navigation Menu -->
        <nav class="flex-1 space-y-1.5 overflow-y-auto pr-1 custom-scrollbar">
          <p class="text-[11px] font-black text-[#1a0533]/50 uppercase tracking-[0.25em] px-4 mb-5">Community Center</p>
          <template v-for="item in navItems" :key="item.label">
            <button
              @click="item.action ? item.action() : null"
              class="w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 group relative"
              :class="item.active ? 'bg-violet-600 text-white shadow-xl' : 'text-[#1a0533]/60 hover:bg-violet-50 hover:text-violet-600'"
            >
              <div class="flex items-center gap-3.5">
                <i :class="[item.icon, item.active ? 'text-white' : 'text-violet-400 group-hover:text-violet-600']" class="text-sm transition-colors" />
                <span class="text-[13px] font-bold uppercase tracking-wider transition-colors">{{ item.label }}</span>
              </div>
              <div v-if="item.active" class="absolute right-2 w-1.5 h-6 rounded-full bg-violet-600" />
            </button>
          </template>
        </nav>

        <!-- Promo Card (Sidebar Bottom) -->
        <div class="mt-8 pt-8 border-t border-violet-100">
          <div class="bg-violet-50 border-2 border-violet-100 rounded-[2.5rem] p-8 text-center relative overflow-hidden group">
             <div class="w-16 h-16 bg-white border border-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <i class="fas fa-mobile-alt text-violet-600 text-2xl" />
             </div>
             <h4 class="text-[13px] font-black uppercase text-[#1a0533] mb-2 tracking-tight">Get Mobile App</h4>
             <p class="text-[10px] text-[#1a0533]/70 font-bold uppercase tracking-wide leading-relaxed mb-6  px-2">Experience the community on your device</p>
             <div class="flex justify-center gap-4">
                <i class="fab fa-apple text-green-600 text-xl hover:text-violet-600 cursor-pointer transition-all hover:scale-110" />
                <i class="fab fa-google-play text-green-600 text-xl hover:text-violet-600 cursor-pointer transition-all hover:scale-110" />
             </div>
          </div>
        </div>
      </aside>

      <!-- ── Main Content Area ──────────────────────────────────── -->
      <div class="flex-1 flex flex-col h-screen overflow-hidden relative z-10 bg-white">
        
        <!-- Top Bar -->
        <header class="h-24 flex items-center justify-between px-10 bg-white border-b border-violet-100 shrink-0 z-30">
          <div class="flex items-center gap-8 flex-1">
            <button
              @click="drawerOpen = true"
              class="lg:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-transform"
            >
              <i class="fas fa-bars text-lg" />
            </button>
            <div class="relative w-full max-w-xl group">
              <i class="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-violet-400 group-focus-within:text-violet-600 transition-colors z-10" />
              <input
                v-model="contentSearch"
                type="text"
                placeholder="Search community highlights..."
                class="w-full h-12 pl-12 pr-6 rounded-xl bg-white border-2 border-violet-100 focus:border-violet-400 focus:ring-4 focus:ring-violet-600/5 transition-all outline-none text-sm font-bold uppercase tracking-widest text-[#1a0533] placeholder:text-violet-300"
              />
            </div>
          </div>

          <div class="flex items-center gap-4 ml-6">
            <button class="w-12 h-12 flex items-center justify-center rounded-xl text-violet-200 hover:text-violet-600 hover:bg-violet-50 transition-all">
              <i class="far fa-bell text-lg" />
            </button>
            <button class="w-12 h-12 flex items-center justify-center rounded-xl text-violet-200 hover:text-violet-600 hover:bg-violet-50 transition-all mr-2">
              <i class="fas fa-cog text-lg" />
            </button>
              <button @click="handleLogout" class="w-12 h-12 flex items-center justify-center rounded-xl text-violet-200 hover:text-violet-600 hover:bg-violet-50 transition-all mr-2">
              <i class="fas fa-sign-out-alt text-lg" />
            </button>
            
            <div class="h-8 w-px bg-violet-100 mx-2 hidden sm:block" />
            
            <div class="flex items-center gap-4 pl-2 cursor-pointer group" @click="activeView = 'Profile'">

              <div class="relative transition-transform duration-300">
                <img v-if="profileImage" :src="profileImage" alt="Profile"
                  class="w-12 h-12 rounded-xl border border-violet-100 object-cover"
                  @error="handleImageError" />
                <div v-else class="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center">
                  <span class="text-white text-sm font-black">{{ userInitials }}</span>
                </div>
                <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-[3px] border-white" />
              </div>
              <div class="hidden sm:block">

                
                <div class="lg:mt-1">
                
                    <p class="text-left text-sm font-black text-[#1a0533] uppercase group-hover:text-violet-600 transition-colors leading-none">{{ user?.name || 'User' }}</p>
                <p class="text-[9px] font-bold tracking-widest text-violet-400">
           
                
                {{ user?.email || 'User' }}
                </p>
                 
                </div>
              </div>
              
            </div>
          </div>
        </header>

        <!-- Main Content (Scrollable) -->
        <main class="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
          
          <template v-if="activeView === 'Hub'">
            <!-- Hub / Overview -->
            <div class="space-y-16">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600 mb-6">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span class="text-[10px] font-black uppercase tracking-widest text-white">Season 4 Analytics</span>
                  </div>
                  <h1 class="font-black text-[#1a0533] leading-none text-5xl uppercase tracking-tighter">
                    Stats <span class="text-violet-600">Overview</span>.
                  </h1>
                </div>
                <div class="flex items-center p-1.5 bg-violet-50 border border-violet-100 rounded-2xl">
                  <button class="px-8 h-11 flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-blue-600/20">
                    <i class="fas fa-th-large" /> Grid View
                  </button>
                </div>
              </div>

              <!-- Flat Stats -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div
                  v-for="(stat, idx) in statCards" :key="stat.label"
                  class="group relative bg-white border border-transparent hover:border-violet-100 rounded-[2.5rem] p-8 transition-colors duration-300 cursor-pointer overflow-hidden border border-violet-50"
                  :class="stat.borderClass"
                >
                  <div class="mb-10 flex items-center justify-between">
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-105" :class="[stat.iconBg, stat.iconText, stat.iconBorder]">
                      <i :class="stat.icon" class="text-lg" />
                    </div>
                    <i class="fas fa-ellipsis-h text-violet-200" />
                  </div>
                  <h3 class="text-3xl font-black uppercase tracking-tight text-[#1a0533] leading-none mb-2">{{ stat.value }}</h3>
                  <p class="text-[10px] font-black uppercase tracking-[0.3em]" :class="stat.labelText">{{ stat.label }}</p>
                </div>
              </div>

              <!-- Charts Removed as per request -->
            </div>
          </template>

          <template v-else-if="activeView === 'Profile'">
            <div class="w-11/12 mx-auto space-y-10 w-full relative mb-12">
               
               <!-- LOADING STATE -->
               <div v-if="loadingMember" class="bg-white border border-violet-100 rounded-[3.5rem] p-16 text-center flex flex-col items-center justify-center min-h-[50vh]">
                  <div class="w-12 h-12 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin mb-6"></div>
                  <h3 class="text-xs font-black uppercase text-violet-400 tracking-[0.3em]">Syncing Member Data...</h3>
               </div>

               <!-- ERROR STATE -->
               <div v-else-if="memberError || !member" class="bg-red-50 border border-red-100 rounded-[3.5rem] p-16 text-center min-h-[50vh] flex flex-col items-center justify-center">
                  <i class="fas fa-exclamation-circle text-red-400 text-4xl mb-4"></i>
                  <h3 class="text-[13px] font-black uppercase text-red-500 tracking-wider">Member Details Unavailable</h3>
               </div>

               <!-- PROFILE CONTENT -->
               <div v-else class="space-y-8">
                 
                 <!-- TOP CARD: Identity & Quick Stats -->
                 <div class="bg-white border border-violet-100 rounded-[3.5rem] p-10 lg:p-14 relative overflow-hidden flex flex-col lg:flex-row gap-10 lg:gap-7 items-center lg:items-start group">
                    <div class="absolute -top-40 -right-40 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-60 z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
                    
                    <!-- Portrait -->
                    <div class="shrink-0 relative z-10 perspective w-48 h-48 lg:w-56 lg:h-56">
                      <div class="relative w-full h-full mx-auto transition-transform duration-500 transform-style-3d group-hover:rotate-y-180 cursor-pointer">
                        <div class="absolute w-full h-full backface-hidden rounded-[2.5rem] border-[6px] border-white shadow-[0_20px_40px_-15px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 overflow-hidden bg-violet-50 flex items-center justify-center">
                          <img v-if="member.profilePicture" :src="cleanImageUrl(member.profilePicture)" class="h-full w-full object-cover object-[50%_35%] rounded-[2rem]" />
                        </div>
                      </div>
                    </div>

                    <!-- Main Info -->
                    <div class="flex-1 text-center lg:text-left relative z-10 py-2 w-full">
                       <div class="lg:items-center gap-4 mb-4">
                         <h1 class="text-4xl lg:text-5xl font-black uppercase text-[#1a0533] tracking-tighter leading-none">{{ fullName || 'No Name Provided' }}</h1>
                       </div>
                       
                       <p class="text-[11px] font-black tracking-[0.3em] uppercase text-violet-400 mb-8">{{ member.email }}</p>

                       <div class="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4">
                          <div class="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-3">
                             <i class="fas fa-star text-sm w-4 text-center"></i>
                             <div class="flex flex-col text-left">
                               <span class="text-[8px] font-black uppercase tracking-widest leading-none opacity-80 mb-0.5">Credit Points</span>
                               <span class="text-[14px] font-black leading-tight">{{ totalPoints }}</span>
                             </div>
                          </div>
                          
                          <div class="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center gap-3">
                             <i class="fas fa-id-card text-sm w-4 text-center"></i>
                             <div class="flex flex-col text-left">
                               <span class="text-[8px] font-black uppercase tracking-widest leading-none opacity-80 mb-0.5">Community ID</span>
                               <span class="text-[14px] font-black leading-tight">{{ member.idNumber || 'N/A' }}</span>
                             </div>
                          </div>

                          <div class="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center gap-3">
                             <i class="fas fa-calendar-alt text-sm w-4 text-center"></i>
                             <div class="flex flex-col text-left">
                               <span class="text-[8px] font-black uppercase tracking-widest leading-none opacity-80 mb-0.5">Member Since</span>
                               <span class="text-[14px] font-black leading-tight">YYYY</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <!-- TWO-COL GRID FOR DETAILS -->
                 <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <!-- Contact & Web -->
                    <div class="border border-violet-100 rounded-[3rem] p-8 lg:p-10 relative overflow-hidden group">
                       <h4 class="text-xs font-black uppercase text-[#1a0533] tracking-[0.2em] mb-8 flex items-center gap-3"><i class="fas fa-address-book text-violet-400"></i> Contact Details</h4>
                       
                       <div class="space-y-3 relative z-10">
                          <div class="bg-white border border-transparent hover:border-violet-100 rounded-2xl p-4 flex items-center justify-between group/item transition-colors">
                            <span class="text-[10px] font-black uppercase tracking-widest text-violet-900">Birthdate</span>
                            <input v-model="member.birthdate" class="bg-transparent text-[13px] font-bold text-[#1a0533] text-right outline-none w-1/2 cursor-help" @mouseenter="hover.birthdate = true" @mouseleave="hover.birthdate = false" />
                          </div>
                          <div class="bg-white border border-transparent hover:border-violet-100 rounded-2xl p-4 flex items-center justify-between group/item transition-colors">
                            <span class="text-[10px] font-black uppercase tracking-widest text-violet-900">Mobile Number</span>
                            <input v-model="member.mobile" class="bg-transparent text-[13px] font-bold text-[#1a0533] text-right outline-none w-1/2 cursor-help" @mouseenter="hover.mobile = true" @mouseleave="hover.mobile = false" />
                          </div>
                          <div class="bg-white border border-transparent hover:border-violet-100 rounded-2xl p-4 flex items-center justify-between group/item transition-colors">
                            <span class="text-[10px] font-black uppercase tracking-widest text-violet-900">Primary Email</span>
                            <input v-model="member.email" class="bg-transparent text-[13px] font-bold text-[#1a0533] text-right outline-none w-1/2 cursor-help truncate" @mouseenter="hover.email = true" @mouseleave="hover.email = false" />
                          </div>
                          <div class="bg-white border border-transparent hover:border-violet-100 rounded-2xl p-4 flex items-center justify-between group/item transition-colors">
                            <span class="text-[10px] font-black uppercase tracking-widest text-violet-900">Website</span>
                            <span class="text-[13px] font-bold text-violet-600 hover:underline cursor-pointer text-right truncate pl-4">{{ member.website || '--' }}</span>
                          </div>
                       </div>
                    </div>

                    <!-- Earnings & Achievements -->
                    <div class="border border-green-100 rounded-[3rem] p-8 lg:p-10 relative">
                       <h4 class="text-xs font-black uppercase text-[#1a0533] tracking-[0.2em] mb-8 flex items-center gap-3"><i class="fas fa-trophy text-violet-400"></i> Credit Points</h4>

                       
                       
                       <div class="grid grid-cols-2 gap-3 relative z-10">
                          <div v-if="!member.role?.includes('Founder') || member.role?.includes('Co-Founder')" class="bg-white border border-transparent hover:border-violet-100 rounded-2xl p-5 text-center transition-colors">
                             <p class="text-[9px] font-black uppercase tracking-widest text-violet-400 mb-2">Project Points</p>
                             <p class="text-2xl font-black text-[#1a0533]">PHP {{ member.gcashPoints || 0 }}</p>
                          </div>
                          
                          <div v-if="!member.role?.includes('Founder') || member.role?.includes('Co-Founder')" class="bg-white border border-transparent hover:border-violet-100 rounded-2xl p-5 text-center transition-colors">
                             <p class="text-[9px] font-black uppercase tracking-widest text-violet-400 mb-2">Honorariums</p>
                             <p class="text-2xl font-black text-[#1a0533]">PHP {{ member.honorariumPoints || 0 }}</p>
                          </div>
                          
                          <div v-if="member.role?.includes('Founder') && !member.role?.includes('Co-Founder')" class="bg-green-100 border border-green-100 rounded-2xl p-6 text-center col-span-2 shadow-sm">
                             <p class="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 mb-3 flex justify-center items-center gap-2"><i class="fas fa-users"></i> Community Role</p>
                             <p class="text-sm font-black text-green-900 uppercase tracking-wide">President & Share Holder (75%)</p>
                          </div>
                          <div v-if="member.role?.includes('Founder') && !member.role?.includes('Co-Founder')" class="bg-white border border-transparent hover:border-violet-100 rounded-2xl p-5 text-center transition-colors">
                             <p class="text-[9px] font-black uppercase tracking-widest text-violet-400 mb-2">Team Assets</p>
                             <p class="text-xl font-black text-[#1a0533]">25%</p>
                          </div>
                          <div v-if="member.role?.includes('Founder') && !member.role?.includes('Co-Founder')" class="bg-white border border-transparent hover:border-violet-100 rounded-2xl p-5 text-center transition-colors">
                             <p class="text-[9px] font-black uppercase tracking-widest text-violet-400 mb-2">Partners</p>
                             <p class="text-xl font-black text-[#1a0533]">3</p>
                          </div>

                        

                          <div v-if="!member.role?.includes('Founder') || member.role?.includes('Co-Founder')" class="bg-white border border-transparent hover:border-violet-100 rounded-2xl p-5 text-center transition-colors col-span-2 sm:col-span-1">
                             <p class="text-[9px] font-black uppercase tracking-widest text-violet-400 mb-2">Annual Bonus</p>
                             <p class="text-2xl font-black text-green-500">$ {{ member.bonusPoints || 0 }}</p>
                          </div>
                          
                          <div class="bg-white border border-transparent hover:border-violet-100 rounded-2xl p-5 text-center transition-colors">
                             <p class="text-[9px] font-black uppercase tracking-widest text-violet-400 mb-2">Projects</p>
                             <p class="text-xl sm:text-2xl font-black text-[#1a0533]">{{ member.numberOfProjects || 0 }}</p>
                          </div>
                          <div v-if="!member.role?.includes('Founder') || member.role?.includes('Co-Founder')" class="bg-white border border-transparent hover:border-violet-100 rounded-2xl p-5 text-center transition-colors hidden sm:block">
                             <p class="text-[9px] font-black uppercase tracking-widest text-violet-400 mb-2">Vouchers</p>
                             <p class="text-xl font-black text-[#1a0533]">{{ member.voucherPoints || 0 }}</p>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </template>

          <template v-else-if="activeView === 'Library'">
            <!-- CMS Table (Library Feed) -->
            <div class="space-y-8">
               <div class="flex items-center justify-between px-2">
                 <h2 class="text-xs font-black uppercase tracking-[0.3em] text-violet-300">Community Highlights</h2>
                 <button @click="handleNewContent" class="text-[11px] font-bold text-violet-600 uppercase tracking-widest hover:underline">+ New Highlight</button>
              </div>
              <div class="bg-white border border-violet-100 rounded-[3rem] overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                      <thead class="bg-violet-50 border-b border-violet-100">
                        <tr>
                          <th class="text-left py-6 px-10 text-[10px] font-black text-violet-300 uppercase tracking-widest">Topic</th>
                          <th class="text-left py-6 px-8 text-[10px] font-black text-violet-300 uppercase tracking-widest">Category</th>
                          <th class="text-left py-6 px-8 text-[10px] font-black text-violet-300 uppercase tracking-widest">Modified</th>
                          <th class="text-right py-6 pr-10 text-[10px] font-black text-violet-300 uppercase tracking-widest">Manage</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-violet-50">
                        <tr v-for="item in recentContentItems" :key="item.id" class="group hover:bg-violet-50/50 transition-colors">
                          <td class="py-5 px-10">
                             <span class="text-sm font-black text-[#1a0533] uppercase group-hover:text-violet-600 transition-colors">{{ item.title }}</span>
                          </td>
                          <td class="py-5 px-8">
                             <span class="text-[10px] font-black text-violet-400 uppercase border border-violet-100 px-3 py-1 rounded-xl">{{ getPrimaryCategory(item.filters) }}</span>
                          </td>
                          <td class="py-5 px-8 text-[11px] font-bold text-gray-400 uppercase">{{ formatItemDate(item.created_at) }}</td>
                          <td class="py-5 pr-10 text-right">
                             <button @click="handleEdit(item)" class="text-violet-200 hover:text-violet-600 transition-colors"><i class="fas fa-edit mr-4" /></button>
                             <button @click="handleDelete(item.id)" class="text-violet-200 hover:text-red-500 transition-colors"><i class="fas fa-trash-alt" /></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="activeView === 'Drive'">
            <!-- Asset Drive Section (Google Drive Style) -->
            <div class="space-y-12">
               <div class="flex items-center justify-between px-2">
                 <h2 class="text-xs font-black uppercase tracking-[0.3em] text-violet-300">My Community Assets</h2>
                 <div class="flex gap-4">
                    <button class="px-6 py-2.5 rounded-xl border-2 border-violet-50 text-violet-600 font-black uppercase tracking-widest text-[10px]">Folder</button>
                    <button class="px-6 py-2.5 rounded-xl bg-violet-600 text-white font-black uppercase tracking-widest text-[10px]">Upload Asset</button>
                 </div>
              </div>

               <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div v-for="(folder, fidx) in ['Images', 'Tech Documents', 'Project Clips', 'Workshop Assets']" :key="folder"
                     class="bg-white border border-violet-100 rounded-[2.5rem] p-8 cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:border-transparent overflow-hidden relative"
                     :class="[
                        fidx % 4 === 0 ? 'hover:bg-emerald-50' : 
                        fidx % 4 === 1 ? 'hover:bg-amber-50' :
                        fidx % 4 === 2 ? 'hover:bg-sky-50' : 'hover:bg-rose-50'
                     ]"
                  >
                     <div class="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white transition-colors"
                        :class="[
                           fidx % 4 === 0 ? 'text-emerald-500' : 
                           fidx % 4 === 1 ? 'text-amber-500' :
                           fidx % 4 === 2 ? 'text-sky-500' : 'text-rose-500'
                        ]"
                     >
                        <i class="fas fa-folder text-xl" />
                     </div>
                     <h4 class="text-[15px] font-black uppercase text-[#1a0533] leading-none mb-1.5">{{ folder }}</h4>
                     <p class="text-[9px] font-bold text-violet-300 uppercase">12 Items Shared</p>
                  </div>
               </div>

               <div class="bg-white border border-violet-100 rounded-[3rem] p-10 overflow-hidden">
                  <h4 class="text-xs font-black uppercase text-[#1a0533] mb-8">Recent Files</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                     <div v-for="i in 5" :key="i" class="bg-violet-50 p-4 rounded-3xl border border-transparent hover:border-violet-200 transition-colors">
                        <div class="aspect-square bg-white border border-violet-100 rounded-2xl flex items-center justify-center mb-4 text-violet-300">
                           <i class="fas text-3xl" :class="i % 2 === 0 ? 'fa-file-pdf' : 'fa-image'" />
                        </div>
                        <h5 class="text-[10px] font-black uppercase text-[#1a0533] truncate mb-1">Asset_Module_0{{ i }}.dat</h5>
                        <p class="text-[8px] font-bold text-violet-300 uppercase">2.4 MB</p>
                     </div>
                  </div>
               </div>
            </div>
          </template>

          <template v-else-if="activeView === 'Directory'">
            <!-- Member Directory -->
            <div class="space-y-8">
               <div class="flex items-center justify-between px-2">
                 <h2 class="text-xs font-black uppercase tracking-[0.3em] text-violet-300">{{ user?.email === 'jorenleeluna24@gmail.com' ? 'Global Member directory' : 'Community Members' }}</h2>
              </div>
              <div class="bg-white border border-violet-100 rounded-[3rem] p-4 lg:p-10">
                <SuperAdminDashboardMembersList :isAdmin="user?.email === 'jorenleeluna24@gmail.com'" />
              </div>
            </div>
          </template>

        </main>
      </div>

      <!-- ── Mobile Drawer ────────────────────────────────────── -->
      <Teleport to="body">
        <Transition name="overlay">
          <div v-if="drawerOpen" class="fixed inset-0 z-[150] bg-[#1a0533]/20 lg:hidden" @click="drawerOpen = false" />
        </Transition>
        <Transition name="drawer">
          <aside v-if="drawerOpen" class="fixed top-3 left-3 bottom-3 w-80 z-[160] bg-white border border-violet-100 rounded-[3rem] flex flex-col lg:hidden shadow-2xl">
            <div class="p-8 h-full flex flex-col">
              <div class="flex items-center justify-between mb-12">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 flex items-center justify-center translate-x-[-4px]">
                    <img :src="logoUrl" alt="Logo" class="h-7 w-auto" />
                  </div>
                  <span class="font-black text-xl text-[#1a0533] uppercase tracking-tighter leading-none">TechSavvy</span>
                </div>
                <button @click="drawerOpen = false" class="text-violet-200 hover:text-violet-600 group"><i class="fas fa-times text-lg" /></button>
              </div>

              <nav class="flex-1 space-y-3">
                <template v-for="item in navItems" :key="item.label">
                  <button @click="item.action ? item.action() : null" class="w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all" :class="item.active ? 'bg-violet-600 text-white' : 'text-violet-300'">
                    <div class="flex items-center gap-4">
                      <i :class="item.icon" />
                      <span class="text-[12px] font-extrabold uppercase">{{ item.label }}</span>
                    </div>
                  </button>
                </template>
              </nav>

              <button @click="handleLogout" class="mt-8 flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-50 text-red-500 font-black uppercase tracking-widest text-[10px]">
                <i class="fas fa-power-off" /> Sign out
              </button>
            </div>
          </aside>
        </Transition>
      </Teleport>

      <!-- Modals (Flat) -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showDeleteModal" class="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div class="absolute inset-0 bg-[#1a0533]/20 backdrop-blur-3xl" @click="showDeleteModal = false" />
            <div class="relative bg-white border-2 border-violet-100 rounded-[3.5rem] p-12 max-w-sm w-full text-center animate-in zoom-in-95 duration-500">
              <div class="mx-auto w-24 h-24 rounded-3xl bg-red-50 flex items-center justify-center mb-8">
                <i class="fas fa-trash-alt text-red-400 text-3xl" />
              </div>
              <h3 class="text-3xl font-black text-[#1a0533] uppercase tracking-tighter mb-4">Delete Post.</h3>
              <p class="text-[10px] text-violet-300 font-bold uppercase tracking-widest mb-10">This update will be removed <br/> from the community feed.</p>
              <div class="flex gap-4">
                <button @click="showDeleteModal = false" class="flex-1 py-4 rounded-xl bg-violet-50 text-violet-700 font-black uppercase text-[10px]">Keep</button>
                <button @click="confirmDeleteItem" class="flex-1 py-4 rounded-xl bg-red-500 text-white font-black uppercase text-[10px]">Delete</button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showLogoutModal" class="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div class="absolute inset-0 bg-[#1a0533]/20 backdrop-blur-3xl" @click="showLogoutModal = false" />
            <div class="relative bg-white border-2 border-violet-100 rounded-[3.5rem] p-12 max-w-sm w-full text-center animate-in zoom-in-95 duration-500">
              <div class="mx-auto w-24 h-24 rounded-3xl bg-violet-50 flex items-center justify-center mb-8">
                <i class="fas fa-sign-out-alt text-violet-700 text-3xl" />
              </div>
              <h3 class="text-3xl font-black text-[#1a0533] uppercase tracking-tighter mb-4">Log Out</h3>
              <p class="text-[10px] text-violet-300 font-bold uppercase tracking-widest mb-10">Are you sure you want <br/> to log out?</p>
              <div class="flex gap-4">
                <button @click="showLogoutModal = false" class="flex-1 py-4 rounded-xl bg-violet-50 text-violet-700 font-black uppercase text-[10px]">Close</button>
                <button @click="confirmLogout" class="flex-1 py-4 rounded-xl bg-violet-600 text-white font-black uppercase text-[10px]">Yes</button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

    </template>
    <template v-else>
      <CreateContent @close="showAllContent = false" />
    </template>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import moment from 'moment'
import { ref, computed, onMounted, reactive, watch, nextTick } from 'vue'
import type { CmsRaw } from '~/composables/useDashboardCmsList'

// ── Views Management ────────────────────────────────────────────
const activeView = ref('Profile')

// ── Navigation ──────────────────────────────────────────────────
const navItems = computed(() => [

  { label: 'My Profile', icon: 'fas fa-user-circle', active: activeView.value === 'Profile', action: () => { activeView.value = 'Profile'; drawerOpen.value = false } },
  { label: 'Library Feed', icon: 'fas fa-newspaper', active: activeView.value === 'Library', action: () => { activeView.value = 'Library'; drawerOpen.value = false } },
  { label: 'My Assets', icon: 'fas fa-folder-open', active: activeView.value === 'Drive', action: () => { activeView.value = 'Drive'; drawerOpen.value = false } },
  { label: 'Members', icon: 'fas fa-users', active: activeView.value === 'Directory', action: () => { activeView.value = 'Directory'; drawerOpen.value = false } },

    { label: 'Community Stats', icon: 'fas fa-th-large', active: activeView.value === 'Stats', action: () => { activeView.value = 'Stats'; drawerOpen.value = false } },
].filter(item => {
  if (item.label === 'Members' && user.value?.email !== 'jorenleeluna24@gmail.com') return false
  return true
}))

// ── Refs & Auth ─────────────────────────────────────────────────
const showAllContent = ref(false)
const contentFormRef = ref<InstanceType<typeof ContentFormAndList> | null>(null)


const { user, setAuth, logout } = useAuth()
const { logoUrl } = useAppLogo()

const {
  allItems,
  loadingItems,
  fetchItems,
  getFiltersText,
  getPrimaryCategory,
  formatItemDate
} = useDashboardCmsList()

// ── UI States ───────────────────────────────────────────────────
const drawerOpen = ref(false)
const currentTime = ref('')
const currentDate = ref('')
const greeting = ref('')
const showLogoutModal = ref(false)
const showDeleteModal = ref(false)
const pendingDeleteId = ref<number | null>(null)
const profileImage = ref<string | null>(null)
const contentSearch = ref('')
const showContentForm = ref(false)
const coreMembersCount = ref(0)

const vibrantColorClasses = ['bg-emerald-500', 'bg-amber-500', 'bg-sky-500', 'bg-rose-500', 'bg-violet-600']

// ── Profile Mod Stats / Member ──────────────────────────────────
const dollarConversion = ref(60)
const loadingMember = ref(true)
const memberError = ref(false)
const member = ref<any>(null)

const hover = reactive({
  id: false,
  mobile: false,
  email: false,
  birthdate: false,
})

const techSavvyLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png",
)
const workflowLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png",
)

const fullName = computed(() =>
  [member.value?.firstname, member.value?.middlename, member.value?.lastname]
    .filter(Boolean)
    .join(" "),
)

const totalPoints = computed(
  () =>
    Number(member.value?.gcashPoints || 0) +
    Number((member.value?.bonusPoints || 0) * dollarConversion.value) +
    Number(member.value?.voucherPoints || 0) +
    Number(member.value?.honorariumPoints || 0),
)

function cleanImageUrl(url: string) {
  if (!url) return ''
  return url.match(/^.*\.(jpg|jpeg|png|gif|webp)/i)?.[0] || url
}
const userInitials = computed(() => {
  const name = user.value?.name || 'USER'
  const parts = name.split(' ')
  return parts.length >= 2
    ? (parts[0]![0]! + parts[1]![0]!).toUpperCase()
    : name.substring(0, 2).toUpperCase()
})

const updateTime = () => {
  const now = moment()
  currentTime.value = now.format('hh:mm:ss A')
  currentDate.value = now.format('dddd, MMM DD, YYYY')
  const h = now.hour()
  greeting.value = h < 12 ? 'Morning' : h < 18 ? 'Afternoon' : 'Evening'
}

// ── Core Stats ──────────────────────────────────────────────────
const newsCount = computed(() =>
  allItems.value.filter(i => {
    const f = getFiltersText(i.filters)
    if (!f.trim()) return true
    return ['News', 'Events', 'Announcements'].some(c => f.toLowerCase().includes(c.toLowerCase()))
  }).length
)
const coursesCount = computed(() => allItems.value.filter(i => getFiltersText(i.filters).toLowerCase().includes('course')).length)
const projectsCount = computed(() => allItems.value.filter(i => getFiltersText(i.filters).toLowerCase().includes('project')).length)
const pendingCount = computed(() => allItems.value.filter(i => i.approval_status === 'pending').length)

const statCards = computed(() => [
  { 
    label: 'Core Members', 
    value: coreMembersCount.value, 
    icon: 'fas fa-users-cog',
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-600',
    iconBorder: 'border-emerald-100',
    borderClass: 'hover:border-emerald-200',
    labelText: 'text-emerald-600'
  },
  { 
    label: 'Courses', 
    value: coursesCount.value, 
    icon: 'fas fa-graduation-cap',
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-600',
    iconBorder: 'border-amber-100',
    borderClass: 'hover:border-amber-200',
    labelText: 'text-amber-600'
  },
  { 
    label: 'Partners & Collaborators', 
    value: assetsCount.value, 
    icon: 'fas fa-handshake',
    iconBg: 'bg-sky-50',
    iconText: 'text-sky-600',
    iconBorder: 'border-sky-100',
    borderClass: 'hover:border-sky-200',
    labelText: 'text-sky-600'
  },
  { 
    label: 'Sponsors', 
    value: pendingCount.value, 
    icon: 'fas fa-crown',
    iconBg: 'bg-rose-50',
    iconText: 'text-rose-600',
    iconBorder: 'border-rose-100',
    borderClass: 'hover:border-rose-200',
    labelText: 'text-rose-600'
  }
])

// Placeholder assets count
const assetsCount = ref(0)

const filteredContentItems = computed(() => {
  const q = contentSearch.value.trim().toLowerCase()
  if (!q) return allItems.value
  return allItems.value.filter(i =>
    i.title?.toLowerCase().includes(q) ||
    getFiltersText(i.filters).toLowerCase().includes(q)
  )
})

const recentContentItems = computed(() => filteredContentItems.value.slice(0, 8))

// ── Handlers ────────────────────────────────────────────────────
function handleEdit (item: CmsRaw) {
  drawerOpen.value = false
  showContentForm.value = true
  nextTick(() => { contentFormRef.value?.editPost(item) })
}

function handleNewContent () {
  drawerOpen.value = false
  showContentForm.value = true
  nextTick(() => { contentFormRef.value?.openNewContentForm() })
}

function handleDelete (id: number) {
  pendingDeleteId.value = id
  showDeleteModal.value = true
}

async function confirmDeleteItem () {
  if (!pendingDeleteId.value || !useDashboardCmsList().apiBase) return
  try {
    await $fetch(`${useDashboardCmsList().apiBase}/techsavvy_app/cms/delete/${pendingDeleteId.value}/`, { method: 'DELETE' })
    showDeleteModal.value = false
    pendingDeleteId.value = null
    await fetchItems()
    contentFormRef.value?.loadPosts()
  } catch { /* silent */ }
}

function handleLogout () { showLogoutModal.value = true }
function confirmLogout () { showLogoutModal.value = false; logout() }
function handleImageError () { profileImage.value = null }

onMounted(() => {
  const urlToken = new URLSearchParams(window.location.search).get('token')
  if (urlToken) {
    setAuth(urlToken)
    window.history.replaceState({}, '', '/dashboard')
  } else {
    useAuth().init()
  }
  updateTime()
  setInterval(updateTime, 1000)
  if (user.value?.image) profileImage.value = user.value.image
  fetchItems()
  fetchMembersCount()
})

const fetchMembersCount = async () => {
  try {
    const config = useRuntimeConfig()
    const membersList = await $fetch<any[]>(`${config.public.apiBase}/techsavvy_members/member/list/`)
    coreMembersCount.value = Array.isArray(membersList) ? membersList.length : 0

    // Check if user exists in member list
    if (membersList && user.value?.email) {
      const currentMember = membersList.find(m => m.email === user.value?.email)
      
      if (!currentMember) {
        // Not found in community members - enforce unauthorized redirect
        logout()
        return
      }
      
      member.value = currentMember
    } else if (!user.value?.email) {
      logout()
      return
    }
  } catch (e) {
    console.error('Failed to fetch members count', e)
    memberError.value = true
  } finally {
    loadingMember.value = false
  }
}


watch(() => user.value?.image, (img) => { if (img) profileImage.value = img })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

.font-roboto {
  font-family: 'Roboto', sans-serif !important;
}

.custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }

.modal-enter-active, .modal-leave-active { transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.98); }

.overlay-enter-active, .overlay-leave-active { transition: opacity 0.4s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }

.drawer-enter-active, .drawer-leave-active { transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1); }
.drawer-enter-from, .drawer-leave-to { transform: translateX(-100%); }

.form-slide-enter-active, .form-slide-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.form-slide-enter-from, .form-slide-leave-to { opacity: 0; transform: translateY(20px); }

@keyframes animate-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoom-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
