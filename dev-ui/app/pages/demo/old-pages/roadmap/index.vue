<script setup>
  const glossy = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/Vector1.png")
  const techSavvyLogo = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png")
  const workflowLogo = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png")

  const dotsWhite = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/circle-dots-white.png")

  const data = [
    {
        category_title: "UI | UX",
        category_description: "Figma, Photoshop",
        course_topics: [
            {
                video_link: "https://www.youtube.com/embed/qz0aGYrrlhU",
                video_title: "HTML Tutorial for Beginners: HTML Crash Course",
                video_description: "JRL",
                video_updated_date: "January 2025",
            },
            {
                video_link: "https://www.youtube.com/embed/qz0aGYrrlhU",
                video_title: "HTML Tutorial for Beginners: HTML Crash Course",
                video_description: "JRL",
                video_updated_date: "January 2025",
            },
            {
                video_link: "https://www.youtube.com/embed/qz0aGYrrlhU",
                video_title: "HTML Tutorial for Beginners: HTML Crash Course",
                video_description: "JRL",
                video_updated_date: "January 2025",
            }
        ]
    },
    {
        category_title: "Front-End Dev",
        category_description: "Figma, Photoshop",
        course_topics: [
            {
                video_link: "videolink",
                video_title: "video_title",
                video_description: "video_description"
            },
            {
                video_link: "videolink",
                video_title: "video_title",
                video_description: "video_description"
            },
            {
                video_link: "videolink",
                video_title: "video_title",
                video_description: "video_description"
            }
        ]
    },
    {
        category_title: "Back-End Dev",
        category_description: "Figma, Photoshop",
        course_topics: [
            {
                video_link: "videolink",
                video_title: "video_title",
                video_description: "video_description"
            },
            {
                video_link: "videolink",
                video_title: "video_title",
                video_description: "video_description"
            },
            {
                video_link: "videolink",
                video_title: "video_title",
                video_description: "video_description"
            }
        ]
    },
    {
        category_title: "DevOps",
        category_description: "Figma, Photoshop",
        course_topics: [
            {
                video_link: "videolink",
                video_title: "video_title",
                video_description: "video_description"
            },
            {
                video_link: "videolink",
                video_title: "video_title",
                video_description: "video_description"
            },
            {
                video_link: "videolink",
                video_title: "video_title",
                video_description: "video_description"
            }
        ]
    },
    {
        category_title: "Full Stack Dev Completion E-Certificate",
        category_description: "",
        course_topics: []
    }
]

</script>
<template>
  <div>
    <a href="/" class="fixed z-[100] lg:bottom-10 bottom-5 h-fit lg:right-8 right-3 bg-violet-400 text-white hover:text-black font-bold px-3 py-2 rounded-xl border-4 border-white hover:animate-bounce 
      hover:cursor-pointer shadow-2xl text-xs">
      <i class="fa fa-home mr-5"></i> Back to Home </a>
    <div class="bg-[#17132B]">
      <div class=" relative mt-0 bg-gradient-to-bl from-[#17132B] via-[#17132B] lg:to-[#17132B] to-[#17132B] lg:pb-2 z-20 cursor-default">
        <div class=" absolute mt-0 mr-0 w-full z-10 flex">
          <img :src="glossy" class="lg:w-4/6 w-full mx-auto mr-0" />
        </div>
      </div>
      <div class="flex items-center w-fit mx-auto gap-5 lg:pt-[30px] pt-[40px] lg:pb-0 pb-[20px]">
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
            <img :src="dotsWhite" class="w-auto h-1/6 mx-auto -mr-14 my-10 opacity-20 lg:hidden" />
          </div>
          <div class="absolute lg:mt-0 mt-40 mr-0 w-full h-full z-10 flex overflow-hidden">
            <img :src="dotsWhite" class="lg:h-fit w-auto h-1/3 mx-auto lg:-ml-96 -ml-24 lg:my-0 my-36 opacity-20" />
          </div>
          <div class="absolute lg:mt-0 mt-44 mr-0 w-full h-full z-10 flex overflow-hidden">
            <img :src="dotsWhite" class="lg:h-2/6 w-auto h-2/6 mx-auto lg:-mr-16 -mr-44 lg:my-0 my-96 opacity-20" />
          </div>
          <div class="relative z-50">
            <div class="text-[#ffffff] font-semibold w-11/12 text-center mx-auto lg:mb-3 mt-3">
              <span class="lg:text-2xl">Milestone </span>
              <span class="lg:text-6xl text-3xl uppercase font-black"> Roadmap </span>
            </div>
            <div class="text-white font-semibold uppercase mb-10 w-11/12 text-center mx-auto">
              <sup class="font-light lg:text-base text-[10px] flex items-center justify-center"> 
                UI/UX <i class="fa fa-circle text-[5px] mx-2"></i> 
                Front-End <i class="fa fa-circle text-[5px] mx-2"></i> 
                Back-End <i class="fa fa-circle text-[5px] mx-2"></i> 
                DevOps </sup>
                <p class="normal-case font-thin italic">"Thanks to the <span class="font-bold">original</span> content and videos contributed by each mentor and core member of the community.""</p>
            </div>
            <div class="w-11/12 mx-auto mb-10">
              <div class="lg:gap-10 gap-5 w-full justify-center text-white">
                <div class="">
                    <div class="pb-10" 
                        :class="i === 4 ? '' :'border-l-4 border-green-700'" 
                        v-for="(j,i) in data" :key="i">
                        <div class=" bg-white text-center  rounded-full 
                        w-[40px] h-[40px] font-bold text-lg border-4 border-green-500
                         text-green-700" 
                         :class="i === 4 ? '-ml-[18px]' :'-ml-6 py-0.5'" 
                         >
                         <span v-if="i === 4">
                            <i class="fa fa-check text-2xl"></i>
                        </span>
                         <span v-else>{{ i + 1 }}</span>
                        </div>
                        <div class="pl-2" :class="i === 4 ? '-mt-7 ml-9' :'-mt-8 ml-7'" >
                           <div class="font-bold"> {{ j.category_title }} </div>
                           <div>
                                {{ j.category_description }}
                           </div>
                        </div>
                        <div class="flex ml-5 gap-5 px-2 py-5">
                            <div v-for="(j,i) in j.course_topics" :key="i"
                                class="border-4 border-green-500 rounded-2xl shadow-lg w-full">
                                <div class="block w-full shadow-lg h-[200px]">
                                    <iframe width="100%" height="100%" :src="j.video_link" :title="
                                        video_title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen class="rounded-2xl"></iframe>
                                </div>
                                <div class="block w-full px-3 py-2 bg-green-800 rounded-bl-xl
                                rounded-br-xl">
                                   <div class="uppercase mb-2 text-xs">
                                    <i class="fa fa-tag text-green-500"></i>
                                    {{ j.video_title }}
                                   </div>
                                    <!-- 
                                    <div class="normal-case mb-2 px-3">
                                        
                                        <i class="fa fa-calendar text-green-500"></i>
                                        Updated: {{ j.video_updated_date }}
                                    </div>
                                    -->
                                   
                                   <div class="border w-fit ml-auto px-2 rounded-lg bg-green-800 text-white
                                   -mb-5 font-bold text-sm">
                                   <i class="fa fa-video-camera text-green-500"></i>

                                    Mentor : {{ j.video_description }}
                                   </div>
                                 
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                <span class="block"> For more inquiries email us at <span class="block font-bold text-[#B5A3FF] hover:text-white"> admin@techsavvies.space </span>
                </span>
              </div>
            </div>
          </div>
          <div class="w-full justify-center flex items-center lg:mr-32 lg:pb-1 pb-10">
            <div class="">
              <div class="lg:mb-10 mb-7">
                <div class="text-[#EEEAFF] font-bold lg:text-4xl text-2xl lg:text-left text-center"> Contact Us </div>
                <div class="text-[#EEEAFF]">
                  <span class="block lg:text-sm text-xs lg:text-left text-center"></span>
                </div>
                <div class="text-[#EEEAFF] lg:text-sm text-xs lg:text-left text-center lg:w-full w-7/12 lg:mx-0 mx-auto">
                  <span>Through Social Media Page </span>
                  <a href="https://www.facebook.com/TechSavvyCodeCamp" target="_blank" class="font-bold mr-1 hover:cursor-pointer	text-[#B5A3FF] hover:text-white whitespace-nowrap">fb.com/TechSavvyCodeCamp</a>
                </div>
              </div>
              <div class="lg:pt-0 pt-10">
                <div class="text-[#fff] font-semibold tracking-tighter lg:text-2xl text-lg lg:text-left text-center"> Join the <span class="font-bold lg:text-4xl text-xl text-[#B5A3FF]"> Code Camp 2024 </span>
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
            <div class="text-[#fff] font-semibold text-sm text-center mx-auto pt-10 lg:pb-10 pb-4 block"> ©2024 TECH SAVVY </div>
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