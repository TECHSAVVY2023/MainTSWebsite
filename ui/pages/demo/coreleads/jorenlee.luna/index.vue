<script setup>
  const profile = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/jorenleeluna.jpg")
import { useHead } from '#imports'

useHead({
  title: 'Jo Renlee Luna'
})

  const fullstackSkills = ref({
    uiuxSkills: [
        {
            category: "Figma",
            percentage: 80,
            color: "#ef4444"
        },
        {
            category: "Canva",
            percentage: 98,
            color: "#a78bfa"
        },
        {
            category: "Photoshop",
            percentage: 80,
            color: "#4338ca"
        },
        {
            category: "Illustrator",
            percentage: 40,
            color: "#f97316"
        },
        {
            category: "After Effects",
            percentage: 30,
            color: "#6d28d9"
        },
        {
            category: "Premiere Pro",
            percentage: 35,
            color: "#581c87"
        }
    ],
    frontendSkills: [
        {
            category: "HTML",
            percentage: 98,
            color: "#ea580c",
            secondColor: "#ea580c"
        },
        {
            category: "CSS/SASS",
            percentage: 97,
            color: "#264de4",
            secondColor: "#cc6699"
        },
        {
            category: "TailwindCSS",
            percentage: 98,
            color: "#0284c7",
            secondColor: "#0284c7"
        },
        {
            category: "Javascript",
            percentage: 85,
            color: "#facc15",
            secondColor: "#facc15"
        },
        {
            category: "Typescript",
            percentage: 85,
            color: "#1d4ed8",
            secondColor: "#1d4ed8"
        },
        {
            category: "NodeJS",
            percentage: 80,
            color: "#22c55e",
            secondColor: "#22c55e"
        },
        {
            category: "Angular",
            percentage: 60,
            color: "#ef4444",
            secondColor: "#ef4444"
        },
        {
            category: "Vue",
            percentage: 90,
            color: "#22c55e",
            secondColor: "#22c55e"
        },
        {
            category: "Nuxt3",
            percentage: 80,
            color: "#34d399",
            secondColor: "#34d399"
        },
        {
            category: "React",
            percentage: 70,
            color: "#0284c7",
            secondColor: "#0284c7"
        },
        {
            category: "Next.js",
            percentage: 75,
            color: "#0f172a",
            secondColor: "#0f172a"
        },

    ],
    backendSkills: [
        {
            category: "Python",
            percentage: "89",
            color: "#facc15"
        },
        {
            category: "Django",
            percentage: "78",
            color: "#059669"
        },
        {
            category: "Fast API",
            percentage: "60",
            color: "#047857"
        },
        {
            category: "Flask",
            percentage: "20",
            color: "#1e293b"
        },
        {
            category: "Laravel",
            percentage: "45",
            color: "#ef4444"
        },
        {
            category: "PHP",
            percentage: "70",
            color: "#4f46e5"
        },
        {
            category: "Firebase",
            percentage: "60",
            color: "#f59e0b"
        },
        {
            category: "PostgreSQL",
            percentage: "80",
            color: "#0064a5"
        },
        {
            category: "MySQL",
            percentage: "80",
            color: "#f29111"
        },
        {
            category: "MongoDB",
            percentage: "70",
            color: "#3FA037"
        }
    ],
    devOpsSkills: [
        {
            category: "Git",
            percentage: "97",
            color: "#f1502f"
        },
        {
            category: "Azure",
            percentage: "60",
            color: "#0ea5e9"
        },
        {
            category: "Digital Ocean",
            percentage: "80",
            color: "#4f46e5"
        },
        {
            category: "AWS",
            percentage: "34",
            color: "#ea580c"
        },
        {
            category: "Google Cloud",
            percentage: "20",
            color: "#fde047"
        }
    ]
  })
  const projectsList = ref([
  {
    imageSampleURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtF3H16v-eXR_dP1Ej_DvqmSblbU-lDkVJnACoVLAjOGugTnmNRVhr7mRzSKXdYO2XbJE&usqp=CAU",
    projectTitle: "La Salle University - Ozamiz",
    projectDescription: "University Website",
    websiteLink: "lsu.edu.ph",
    subDescription: "",
    backgroundColor: "#fff",
    borderColor: "#fff"
  },
  {
    imageSampleURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQabi9suu1V1zYSpX91IHg9DYYRYlp6yNKgrg&s",
    projectTitle: "Buscaolas",
    projectDescription: "Weather Forecast | Surfcams",
    subDescription: "",
    websiteLink: "buscaolas.cl/",
    backgroundColor: "#fff",
    borderColor: "#fff"
  },
  {
    imageSampleURL: "https://nestcasa.com/cdn/shop/files/nest-casa-logo_1600x.png?v=1738959797",
    projectTitle: "Nestcasa",
    subDescription: "",
    projectDescription: "Ecommerce Website",
    websiteLink: "nestcasa.com",
    backgroundColor: "#fff",
    borderColor: "#fff"
  },
  {
    imageSampleURL: "https://kokorofoods.cl/img/logo-nav.svg",
    projectTitle: "Kokorofoods",
    projectDescription: "Ecommerce Website",
    subDescription: "",
    websiteLink: "kokorofoods.cl",
    backgroundColor: "#fff",
    borderColor: "#fff"
  },
  {
    imageSampleURL: "https://favori.ph/cdn/shop/files/favori-logo2-01.png?v=1703034039&width=600",
    projectTitle: "Favori PH",
    projectDescription: "Ecommerce Website",
    subDescription: "",
    websiteLink: "favori-web.vercel.app",
    backgroundColor: "#fff",
    borderColor: "#fff"
  },
  {
    imageSampleURL: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Korea_University_Global_Symbol.svg/1200px-Korea_University_Global_Symbol.svg.png",
    projectTitle: "Korea University",
    subDescription: "(contributed FrontEnd Designs last 2019)",
    projectDescription: "University Website",
    websiteLink: "korea.edu",
    backgroundColor: "#fff",
    borderColor: "#fff"
  },

  ])
  const certsSeminarsWorkshops = ref([
    {
        eventName: "PhilNITS Certified IT Passport",
        eventDescription: "Examinee",
        eventDate: "2017 April"
    },
    {
        eventName: "CCNA Routing and Switching Certification",
        eventDescription: "Organizer",
        eventDate: "2015 November"
    },
    {
        eventName: "5th ICT Youth Convention: EDUCATION. ENVIRONMENT. ENTERTAINMENT",
        eventDescription: "Participant",
        eventDate: "Academic Year 2013 to 2014 February to March"
    },
    {
        eventName: "6th ICT Youth Convention: INVENT. INNOVATE. INFORM",
        eventDescription: "Participant",
        eventDate: "Academic Year 2014 to 2015 February to March"
    },
    {
        eventName: "7th ICT Youth Convention: I.T. IN BUSINESS. BUSINESS IN I.T.",
        eventDescription: "Organizer/Facilitator and Participant, La Salle University",
        eventDate: "Academic Year 2015 to 2016 February to March"
    },
    {
        eventName: "8th ICT Youth Convention: ICT TO INFINITY",
        eventDescription: "Organizer/Facilitator and Participant, La Salle University",
        eventDate: "Academic Year 2016 to 2017 February to March"
    },
    {
        eventName: "Learning How to Make Devices for The Internet of Things Workshop",
        eventDescription: "Facilitator/Participant, La Salle University",
        eventDate: "2017 February"
    },  
    {
        eventName: "Python Programming Workshop",
        eventDescription: "Participant, Capitol University Cagayan de Oro City",
        eventDate: "2015 September"
    },
    {
        eventName: "1st Student Leaders’ Academy (Seminar)",
        eventDescription: "Participant at La Salle University",
        eventDate: "2015 July"
    },
    {
        eventName: "Social Media and SEO",
        eventDescription: "Turning the Tides Through the Digital Age at LSU-Ozamiz",
        eventDate: "2015 September"
    },
    {
        eventName: "Dynamic Web App Integration Featuring Laravel and VueJS",
        eventDescription: "11th ICT Youth Convention Speaker at La Salle University Ozamiz.",
        eventDate: "2020 February"
    },
    {
        eventName: "Google Developer Group DevFest Zamboanga Peninsula",
        eventDescription: "Google Developer Group Devfest",
        eventDate: "2023 December"
    },
    {
        eventName: "Google I/O Extended CDO Google Developer Group Cagayan De Oro",
        eventDescription: "Google Developer Group I/O",
        eventDate: "2023 August"
    },
    {
        eventName: "AWS Cloud Migration Globe Telecom Philippines",
        eventDescription: "Globe Business",
        eventDate: "2023 April"
    },
    {
        eventName: "SMEC Cybersecurity Summit",
        eventDescription: "De La Salle Taft Manila",
        eventDate: "2024 April"
    },
    {
        eventName: "Python Conference Philippines PyCon Asia",
        eventDescription: "PyCon APAC",
        eventDate: "2024 February"
    },
    {
        eventName: "Google Developer Group DevFest Singapore",
        eventDescription: "Google Developer Group Devfest Cloud",
        eventDate: "2023 November"
    },
 

  ])
  const educationalBackground = ref([
    {
        degreeCourse: "High School | Major in Cisco Networking",
        schoolUniversity: "Ozamiz City School of Arts and Trades, Misamis Occidental  ",
        academicYear: "2009 June to 2013 March"
    },
    {
        degreeCourse: "Bachelor of Science in Information Technology",
        schoolUniversity: "La Salle University – Ozamiz City Misamis Occidental",
        academicYear: "2013 June to 2017 July"
    }
  ])
</script>
<template>
  <div>
    <div class="bg-[#17132B] min-h-screen">
      <div class="w-full py-5 bg-[#39136e]">
          <div class="md:flex items-center mx-auto md:w-fit w-11/12 lg:gap-10 gap-3">
            <div class="lg:w-full md:w-fit w-4/12 mx-auto md:mb-0 mb-3">
              <img :src="profile" class="rounded-full lg:w-[160px] md:w-[150px] w-[100px] lg:ml-auto lg:mr-0 mx-auto shadow-2xl border-white lg:border-4 border-2" />
            </div>
            <div class="w-full flex items-center justify-center lg:mt-5 md:mt-3">
                <div class="md:text-left text-center">
                    <div class="md:flex block items-end lg:whitespace-nowrap text-[#ffffff] font-semibold w-fit mx-auto lg:text-center">
                        <span class="md:flex block lg:text-xl text-xs md:mr-2"> Hi, I'm </span>
                        <span class="md:flex block lg:text-3xl text-lg uppercase font-black whitespace-nowrap lg:leading-none leading-tight"> Jo Renlee Luna </span>
                    </div>
                    <div class="text-white font-semibold uppercase lg:w-full 
                        text-center mx-auto leading-none">
                        <span class="font-light lg:text-base text-xs whitespace-nowrap"> Fullstack Developer / University Webmaster </span>
                    </div>
                    <div>
                        <div class="w-fit rounded-3xl mx-auto">
                            <ul class="flex pt-3 pl-5 lg:pr-9 pr-5 gap-3">
                                <!-- <li>
                                    <a href="https://www.facebook.com/profile.php?id=100008633017630">
                                        <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/social-media-icons/facebooklogo-removebg-preview.png" 
                                        class="lg:w-[50px] w-[70px] hover:animate-bounce" />
                                    </a>
                                </li> -->
                                <!-- <li>
                                    <a href="https://www.instagram.com/_cherrymae22/">
                                        <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/social-media-icons/instagramLogo-removebg-preview.png" 
                                        class="lg:w-[30px] w-[40px] hover:animate-bounce ml-2.5" />
                                    </a>
                                </li> -->
                                <!-- <li>
                                    <a href="https://www.linkedin.com/in/jo-renlee-luna-2b6ab5157/">
                                        <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/social-media-icons/linkedInLogo-removebg-preview.png" 
                                        class="lg:w-[30px] w-[40px] hover:animate-bounce" />
                                    </a>
                                </li> -->
                                <li>
                                    <a href="https://github.com/jorenlee">
                                        <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/social-media-icons/githubLogo.png" 
                                        class="lg:w-[34.5px] md:w-[26px] w-[30px] hover:animate-bounce bg-white rounded-full border" />
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:jorenleeluna24@gmail.com">
                                        <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/social-media-icons/googleMailLogo.png" 
                                        class="lg:w-[35px] md:w-[26px] w-[30px] hover:animate-bounce bg-white rounded-full" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
      <div class="w-full lg:pt-5 pt-3 pb-5 justify-center text-center">
        <p class="flex items-center text-[#ffffff] lg:text-4xl text-xl uppercase font-black justify-center">
            Dev Skills   
        </p>
       <p class="lg:flex block text-white text-center justify-center w-fit text-xs mx-auto font-light">
            <!-- <span class="lg:flex block mx-auto w-fit">Updated as of <span class="font-bold lg:mx-1.5">December 2024</span>
       
            </span> -->
            <span class="mx-auto w-fit mr-1"> Programming Languages,</span>
            <span class="mx-auto w-fit"> Open Source Frameworks</span>
       </p>
      </div>
      <div class="lg:flex text-white lg:w-11/12 w-full mx-auto lg:gap-10 shadow-2xl lg:px-5
       lg:py-10 py-3 lg:border-t-4 lg:border-b-0 border-y-4
      border-violet-950 lg:border bg-[#1d1837]">
            <div class="w-full lg:shadow-none shadow-lg lg:border-b-0 border-b lg:mb-0 mb-1">
                <p class="lg:border-b-4 lg:py-2 py-3 text-center font-bold lg:bg-none 
             text-[#fff] lg:capitalize uppercase">UI/UX & Multimedia</p>
                <div class="lg:px-0 px-5 lg:pb-0 pb-3">
                    <div class="lg:flex lg:my-5 my-2" 
                    v-for="(j,i) in fullstackSkills.uiuxSkills" 
                    :key="i">
                        <p class="w-4/12 mr-5 whitespace-nowrap lg:text-xs text-[10px]">
                            {{ j.category }}
                        </p>
                        <p class="flex lg:h-5 h-3 bg-white w-full border-2 border-white">
                            <span 
                            :style="`width: ${j.percentage}%;
                                background-color: ${j.color}`
                                "
                            class="
                           h-full flex"></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-full lg:shadow-none shadow-lg lg:border-b-0 border-b lg:mb-0 mb-1">
                <p class="lg:border-b-4 lg:py-2 py-3 text-center font-bold lg:bg-none text-[#fff] 
                lg:capitalize uppercase">Frontend Dev</p>
                <div class="lg:px-0 px-5 lg:pb-0 pb-3">
                    <div class="lg:flex lg:my-5 my-2" 
                    v-for="(j,i) in fullstackSkills.frontendSkills" 
                    :key="i">
                        <p class="mr-5 w-4/12 whitespace-nowrap lg:text-xs text-[10px]">
                            {{ j.category }}
                        </p>
                        <p class="flex lg:h-5 h-3 bg-white w-full border-2 border-white">
                            <!-- background-image: linear-gradient( to right, ${j.color}, ${j.secondColor}); -->
                            <span 
                            :style="`width: ${j.percentage}%;
                                background-color: ${j.color};
                                background-image: repeating-linear-gradient(
                                    -50deg,
                                    transparent,
                                    transparent 35px,
                                    ${j.secondColor} 35px,
                                    ${j.secondColor} 60px
                                );
                                `"
                            class="
                           h-full flex"></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-full lg:shadow-none shadow-lg lg:border-b-0 border-b lg:mb-0 mb-1">
                <p class="lg:border-b-4 lg:py-2 py-3 text-center font-bold 
                lg:bg-none text-[#fff] lg:capitalize uppercase">Backend Dev</p>
                <div class="lg:px-0 px-5 lg:pb-0 pb-3">
                    <div class="lg:flex lg:my-5 my-2" 
                    v-for="(j,i) in fullstackSkills.backendSkills" 
                    :key="i">
                        <p class="w-4/12 mr-5 whitespace-nowrap lg:text-xs text-[10px]">
                            {{ j.category }}
                        </p>
                        <p class="flex lg:h-5 h-3 bg-white w-full border-2 border-white">
                            <span 
                            :style="`width: ${j.percentage}%;
                                background-color: ${j.color}`"
                            class="
                           h-full flex"></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-full lg:shadow-none shadow-lg lg:border-b-0 lg:mb-0 mb-1">
                <p class="lg:border-b-4 lg:py-2 py-3 text-center font-bold lg:bg-none text-[#fff] lg:capitalize uppercase">DevOps</p>
                <div class="lg:px-0 px-5 lg:pb-0 pb-3">
                    <div class="lg:flex lg:my-5 my-2" 
                    v-for="(j,i) in fullstackSkills.devOpsSkills" 
                    :key="i">
                        <p class="w-4/12 mr-5 whitespace-nowrap lg:text-xs text-[10px]">
                            {{ j.category }}
                        </p>
                        <p class="flex lg:h-5 h-3 bg-white w-full border-2 border-white" tooltip="">
                            <span 
                            :style="`width: ${j.percentage}%;
                                background-color: ${j.color}`"
                            class="
                           h-full flex"></span>
                        </p>
                    </div>
                </div>
            </div>
            
      </div>

      <div class="bg-[#09291cbe] w-full lg:pt-10 pt-7 lg:pb-5 justify-center text-center">
        <p class="flex items-center text-[#ffffff] lg:text-4xl text-xl uppercase font-black justify-center">
            PROJECTS
        </p>
       <p class="lg:flex block text-white text-center justify-center w-fit text-xs mx-auto font-light">
            <span class="lg:flex block mx-auto w-fit">Top Latest Works | Web Experience</span>
       </p>
      </div>
      <div class="bg-[#09291cbe] lg:pb-10">
        <div class="grid lg:grid-cols-6 md:grid-cols-2 md:gap-x-5 text-white w-11/12 mx-auto lg:gap-5 lg:shadow-2xl lg:px-5
      lg:border-[#0b4b31be] lg:border lg:bg-[#0b4b31be]  py-5">
            <a 
                :href="'https://' + j.websiteLink"
                v-for="(j) in projectsList" :key="j"
                class=" lg:shadow-none lg:mb-0
                lg:rounded-none rounded-tr-3xl rounded-bl-3xl
                  shadow-2xl cursor-pointer
                  lg:border-4 border-b-2
                  lg:block flex gap-x-3 mb-2
                  lg:border-[#fff]
                  hover:border-[#e8c838] border-[#d4b83c] 
                  "
                  >
                <div class="lg:h-[100px] h-[80px] bg-[#ffffff] lg:w-full w-3/12 lg:rounded-none rounded-tr-3xl rounded-bl-3xl lg:border-0 border-4 border-green-900">
                    <img :src="j.imageSampleURL" class="w-full mx-auto lg:h-[100px] h-[75px] px-1 lg:rounded-none rounded-3xl py-2
                        object-contain lg:pb-1 lg:px-5"/>
                </div>
                <div class="flex items-center lg:justify-center lg:px-2">
                    <div class="lg:pt-5 px-2 pb-1 h-fit">
                        <p class="text-xs lg:text-center font-bold lg:uppercase">{{ j.projectTitle }}</p>
                        <p class="text-sm lg:text-center font-bold">{{ j.websiteLink }}</p>
                        <p class="text-xs lg:text-center mx-auto">{{ j.projectDescription }}</p>
                        <p class="text-[10px] lg:text-center mx-auto hover:text-white lg:text-[#0b4b31be]">{{ j.subDescription }}</p>
                    </div>
                </div>
            </a>            
      </div>
    </div>
    <!-- <div class=" bg-[#14128a2e] text-white shadow-2xl">
        <div class="w-full lg:py-10 py-5 mb-2 lg:bg-none lg:bg-[#19192d2e] bg-[#6967c02e]">
            <p class="w-11/12 mx-auto text-center flex items-center lg:text-4xl text-sm uppercase font-black justify-center">
                CERTIFICATIONS / SEMINARS / WORKSHOPS ATTENDED
            </p>
        <p class="lg:flex block w-fit text-xs mx-auto font-light ">
                <span class="lg:flex block mx-auto w-fit">Participant . Organizer . Speaker . Sponsorship</span>
        </p>
        </div>
        <div class="mx-auto w-11/12">
            <div class="lg:grid grid-cols-3 pb-10 gap-x-10 gap-y-5 ">
                <div   
                    v-for="(j, i) in certsSeminarsWorkshops" :key="i"
                    class="lg:bg-[#261b3a27] bg-[#4a317927] lg:shadow-xl shadow-2xl">
                    <div class="py-3 lg:px-5 px-2 lg:mb-0 mb-2">
                        <div class="">
                            <p class="text-xs font-bold lg:uppercase">{{ j.eventName }}</p>
                            <p class="text-xs font-light">{{ j.eventDescription }}</p>
                            <p class="text-xs mx-auto">{{ j.eventDate }}</p>
                        </div>
                    </div>
                </div>            
        </div>
        </div>
    </div> -->
   
    <div class="bg-[#07132c] text-white shadow-2xl">
        <div class="w-full lg:py-10 py-5">
            <p class="flex items-center lg:text-4xl text-xl uppercase font-black justify-center ">
                Education  
            </p>
        <p class="lg:flex block w-fit text-xs mx-auto font-light ">
                <span class="lg:flex block mx-auto w-fit">Major | Degree</span>
        </p>
        </div>
        <div class="mx-auto w-11/12">
            <div class="lg:grid grid-cols-3 lg:pb-10 pb-2 gap-x-10 gap-y-5 ">
                <div 
                    
                    v-for="(j, i) in educationalBackground" :key="i"
                    class="lg:bg-[#261b3a27] bg-[#17205a7e] shadow-xl">
                    <div class="py-3 lg:px-5 px-3 lg:mb-0 mb-3">
                        <div class="">
                    
                            <p class="text-xs font-bold lg:uppercase capitalize">{{ j.degreeCourse }}</p>

                            <p class="text-xs font-light">{{ j.schoolUniversity }}</p>
                            
                        
                            <p class="text-xs mx-auto">{{ j.academicYear }}</p>
                        
                        
                        </div>
                    </div>
                </div>            
        </div>
        </div>
    </div>
    </div>
        <div class="bg-[#17132B] text-white text-xs text-center p-3 shadow border-t-4 border-violet-900">
            Copyright  © jorenlee.luna
        </div>
    </div>
</template>