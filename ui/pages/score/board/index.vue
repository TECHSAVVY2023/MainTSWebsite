<script setup>

    const glossy = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/Vector1.png")
    const techSavvyLogo = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png")
    const workflowLogo = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png")

    const codeCampBanner2024 = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo1W.png")
    const codeCampBanner2024B = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo3S.png")
    const codeCampBanner2024C = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo3W.png")

    const jorenleeLuna = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/jorenleeluna/profile.jpg")

    const workflowHighlight = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/WorkflowHighlight-1.jpg")
    const googleZamPenMorning = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/googleZamPenMorning.jpg")
    const googleCDO = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/googleCDO.jpg")
    const techSavvyPioneers = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/TechSavvyPioneers.jpg")
    const gDGCebu = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/GDGCebu.jpg")
    const gDGCebuMerch = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/GDGCebuMerch.jpg")

    const graphixMind = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/graphixMind.jpg")
    const iLuvTV = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/iLuvTV.jpg")
    const lunatronix = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/lunatronix.png")


    const dotsWhite = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/circle-dots-white.png") 
    const dotsBlack = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/circle-dots1.png")

    const lines = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/Group8.png")
    const bgPattern = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/Group7.png")
    const sponsorBG = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/SponsorBG.png")
</script>


<template>
    <div>
      <a href="/" class="fixed z-[100] lg:top-10 bottom-5 h-fit lg:left-8 left-3 bg-violet-400 text-white hover:text-black font-bold px-3 py-2 rounded-xl border-4 border-white hover:animate-bounce 
      hover:cursor-pointer shadow-2xl text-xs">
      <i class="fa fa-home mr-5"></i> Back to Home 
      </a>


      
        <div class="bg-[#17132B]">
           
   <div class=" relative mt-0 bg-gradient-to-bl from-[#17132B] via-[#17132B] lg:to-[#17132B] to-[#17132B] lg:pb-2 z-20 cursor-default">
      
    
    <div class=" absolute mt-0 mr-0 w-full z-10 flex">
         <img :src="glossy" class="lg:w-4/6 w-full mx-auto mr-0" />
      </div>

   </div>
   <div class="flex items-center w-fit mx-auto gap-5 lg:pt-[30px] pt-[40px] lg:pb-1 pb-[20px]">
                    <div class="">
                      <img :src="techSavvyLogo" class="lg:w-[120px] w-[70px] mx-auto" />
                    </div>
                    <div class="">
                      <img :src="workflowLogo" class="lg:w-[85px] w-[50px] mx-auto" />
                    </div>
                  </div>
   
   
   <div class="w-full flex cursor-default z-10">
    
      <div class="w-full mx-auto lg:py-0 py-2 overflow-hidden">
         <div class="absolute mt-10 mr-0 w-full h-full z-10 flex overflow-hidden">
            <img
               :src="dotsWhite"
               class="w-auto h-1/6 mx-auto -mr-14 my-10 opacity-20 lg:hidden"
               />
         </div>
         <div class="absolute lg:mt-0 mt-40 mr-0 w-full h-full z-10 flex overflow-hidden">
            <img
               :src="dotsWhite"
               class="lg:h-fit w-auto h-1/3 mx-auto lg:-ml-96 -ml-24 lg:my-0 my-36 opacity-20"
               />
         </div>
         <div class="absolute lg:mt-0 mt-44 mr-0 w-full h-full z-10 flex overflow-hidden">
            <img
               :src="dotsWhite"
               class="lg:h-2/6 w-auto h-2/6 mx-auto lg:-mr-16 -mr-44 lg:my-0 my-96 opacity-20"
               />
         </div>
         <div class="relative z-50">
            <div class="text-[#ffffff] font-semibold w-11/12 text-center mx-auto lg:mb-3 mt-3">
               <span class="lg:text-2xl">Meet the </span>
               <span class="lg:text-6xl text-3xl uppercase font-black">
               Milestone Achievers
               </span>
            </div>
            <div class="text-white font-semibold uppercase mb-10 w-11/12 text-center mx-auto">
               <sup class="font-light lg:text-base text-[10px] ml-3">
                    Top 10 Code Camp Participants :  Season 1 to 2
               </sup>
            </div>
            <div class="w-11/12 mx-auto mb-10">
               <ul class=" lg:gap-10 gap-5 w-full justify-center">

               <li class="text-white font-bold mt-10">
    
    <p class="lg:text-left text-center">Full Stack Completer</p>
    <div class="bg-white w-full h-1 lg:my-5 my-3">

    </div>
</li>
               <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl  ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                           Dondell   <span class="text-[#18FF82]">Batac</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-full">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>


                  <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl  ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                          Johannes   <span class="text-[#18FF82]">Remotigue</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-full">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>


                  <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl  ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                        John Henry    <span class="text-[#18FF82]">Joromat</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-full">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>



                

                  <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl  ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                        Tese    <span class="text-[#18FF82]">Apsie</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-full">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>



                  <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl  ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                           Kharen <span class="text-[#18FF82]">Villalva</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-full">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>
                  <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl   ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                           Jomari Carl <span class="text-[#18FF82]">Naguit</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-full">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>

<li class="text-white font-bold mt-10 border-t-2 pt-4">
    
    <p>Front End Completer</p>
    <div class="bg-white w-full h-1 my-5">

    </div>
</li>

                  
                  <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl   ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                           PEARL MAURINE <span class="text-[#18FF82]">SAHULGA</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex w-3/12">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-1/12">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>
                  <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl   ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                        Samantha Nicole  <span class="text-[#18FF82]">Bayaga</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex lg:w-4/12 w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-1/12">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>


                  <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl   ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                        Rodjane  <span class="text-[#18FF82]">Abayan</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex w-1/12">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-1/12">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>


                  <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl   ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                       Milagros Daño  <span class="text-[#18FF82]">Maghinay</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-full">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex w-1/12">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-1/12">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>


                  
                  <li class="text-white font-bold mt-10 border-t-2 pt-5">
    
    <p>UI/UX in Progress</p>
    <div class="bg-white w-full h-1 my-5">

    </div>
</li>




                  <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl   ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                    Adyline  <span class="text-[#18FF82]">Cabanilla</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-5/12">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-2/12">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex w-1/12">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-1/12">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>




                  <li class="mb-3 lg:flex bg-gray-800 lg:bg-transparent">
                     <div class="flex lg:w-4/12 w-full pt-3 pb-3 px-4 rounded-3xl   ">
                        <p class="font-bold uppercase lg:pt-2 text-white text-center">
                        Fretzie   <span class="text-[#18FF82]">Sarona</span>
                        </p>
                     </div>
                     <div class=" w-full">
                        <p class="text-green-100 text-center text-xs mb-2">
                           Road Map Completion
                        </p>
                        <div class="border-2 shadow flex">
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 UI/UX
                              </div>
                              <div class="bg-pink-300 h-5 flex w-2/12">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Front End
                              </div>
                              <div class="bg-red-400 h-5 flex w-1/12">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Back End
                              </div>
                              <div class="bg-green-700 h-5 flex w-1/12">
                              </div>
                           </div>
                           <div class="w-full relative">
                              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white py-0.5 lg:text-xs text-[8px] text-center justify-center">
                                 Dev Ops
                              </div>
                              <div class="bg-green-900 h-5 flex w-1/12">
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>


                 


               </ul>
            </div>
         </div>
        
      </div>
   </div>
  


   <div class="bg-black cursor-default overflow-hidden relative">
        <div class="absolute lg:mt-0 mt-14 mr-0 w-full z-10 overflow-hidden lg:block md:hidden block">
          <img :src="dotsWhite" class="lg:w-1/6 lg:h-2/6 w-5/6 h-auto mx-auto lg:-mr-16 -mr-24 lg:my-10 my-0 opacity-5" />
        </div>
        <div class="absolute lg:mt-0 mt-80 mr-0 w-full z-10 overflow-hidden lg:block md:hidden block">
          <img :src="dotsWhite" class="lg:w-1/5 lg:h-auto w-1/2 h-auto mx-auto lg:-ml-16 -ml-14 lg:my-20 my-0 opacity-[.07]" />
        </div>
        <div class="absolute lg:mt-0 mt-44 mr-0 w-full z-10 overflow-hidden lg:block md:hidden block">
          <img :src="dotsWhite" class="lg:w-1/5 lg:h-auto w-full h-3/6 mx-auto lg:mr-80 mr-0 lg:my-40 opacity-10" />
        </div>
        <div class="relative z-50 w-11/12 mx-auto lg:flex lg:pt-7 pt-16">
          <div class="lg:w-full w-10/12 mx-auto lg:flex items-center">
            <div class="lg:mr-32 md:mb-10 mb-20 lg:ml-auto">
              <div class="text-[#EEEAFF] text-sm text-center">
                <img :src="codeCampBanner2024B" class="lg:w-[300px] w-[240px] lg:mt-7 -mb-20 -mt-10 font-bold rounded-md lg:mx-0 mx-auto" />
                <span class="block"> For more inquiries email us at <span class="block font-bold text-[#B5A3FF] hover:text-white"> info@techsavvies.space </span>
                </span>
              </div>
            </div>
          </div>
          <div class="w-full justify-center flex items-center lg:mr-32 lg:pb-1 pb-10">
            <div class="">
              <div class="lg:mb-10 mb-7">
                <div class="text-[#EEEAFF] font-bold lg:text-4xl text-2xl lg:text-left text-center"> Contact Us </div>
                <div class="text-[#EEEAFF]">
                  <span class="block lg:text-sm text-xs lg:text-left text-center">  </span> 
                 
                </div>
                <div class="text-[#EEEAFF] lg:text-sm text-xs lg:text-left text-center lg:w-full w-7/12 lg:mx-0 mx-auto">
                  <span>Through Social Media Page </span>
                  <a href="https://www.facebook.com/TechSavvyCodeCamp" target="_blank" class="font-bold mr-1 hover:cursor-pointer	text-[#B5A3FF] hover:text-white whitespace-nowrap">fb.com/TechSavvyCodeCamp</a>
                </div>
              
              </div>
              <div class="lg:pt-0 pt-10">
                <div class="text-[#fff] font-semibold tracking-tighter lg:text-2xl text-lg lg:text-left text-center"> Join the<span class="font-bold lg:text-4xl text-xl text-[#B5A3FF]"> Code Camp 2024 </span>
                </div>
                <div class="text-[#fff] lg:text-sm text-xs lg:flex">
                  <div class="lg:inline-block block lg:text-left text-center lg:w-full w-10/12 mx-auto"> Join the Community and Connect with other Aspiring IT Developers <span class="block">in Misamis Occidental</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-black w-full pt-14 cursor-default">
          <div class="lg:flex lg:w-9/12 mx-auto">
            <div class="text-[#fff] font-semibold text-sm text-center mx-auto pt-10 lg:pb-10 pb-4 block">    TECH SAVVY © 2025 </div>
            <div class="flex w-fit lg:gap-5 gap-2 mx-auto lg:pt-5 md:pt-6 pb-10">
              <div class=" bg-black w-[58px] h-[58px] rounded-full mx-auto lg:border-none border-2 border-white">
                <img :src="techSavvyLogo" class="w-[58px] mx-auto bg-[#320d39] rounded-full px-1.5" />
              </div>
              <div class="bg-[#084725] w-[55px] h-[55px] rounded-full mx-auto lg:border-none border-2 border-white">
                <img :src="workflowLogo" class="w-[33px] mt-3 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
    </div>
</template>