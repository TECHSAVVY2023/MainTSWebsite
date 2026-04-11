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
    <a href="/" class="fixed z-[100] lg:top-10 bottom-5  h-fit lg:left-8 left-3 bg-violet-400 text-white hover:text-black font-bold px-3 py-2 rounded-xl border-4 border-white hover:animate-bounce 
      hover:cursor-pointer shadow-2xl text-xs">
      <i class="fa fa-home mr-5"></i> Back to Home 
      </a>


    <div class="bg-[#17132B]">
      <div class=" relative mt-0 bg-gradient-to-bl from-[#17132B] via-[#17132B] lg:to-[#17132B] to-[#17132B] lg:pb-2 z-20 cursor-default">
        <div class=" absolute mt-0 mr-0 w-full z-10 flex">
          <img :src="glossy" class="lg:w-4/6 w-full mx-auto mr-0" />
        </div>
      </div>
      <div class="flex items-center w-fit mx-auto gap-5 pt-[30px] lg:pb-1">
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
            <div class="text-[#ffffff] font-semibold w-11/12 text-center mx-auto lg:mb-10 mb-3 lg:mt-3">
              <span class="lg:text-2xl">Meet the </span>
              <span class="lg:text-6xl text-3xl uppercase font-black lg:pb-0 pb-3 lg:whitespace-normal whitespace-nowrap"> Hall of Sponsors </span>
            </div>
  
            <div class="lg:flex w-11/12 mx-auto lg:mb-10">
              <div class="lg:w-4/12">
                <div class="shadow-lg lg:px-5 px-2 py-5 lg:w-11/12 mx-auto  mb-5 lg:border-4 border border-[#E5E4E2] lg:bg-[#ffffff15] bg-[#00000083]">
                  <p class="lg:text-left text-center text-white font-bold uppercase">Diamond Sponsors <i class="fa fa-diamond"></i>
                  </p>
                  <ul class=" lg:gap-10 gap-5 w-full justify-center">
                    <li class="text-white font-bold">
                      <div class="bg-white w-full h-1 lg:my-5 my-3"></div>
                    </li>
                    <li class="mb-3 bg-gray-800 lg:bg-transparent">
                      <div class="flex lg:w-4/12 w-full pt-1 pb-3 px-4 rounded-3xl">
                        <p class="font-bold uppercase text-white text-center whitespace-nowrap"> Jo Renlee <span class="text-[#18FF82]">Luna</span>
                        </p>
                      </div>
                      <div class=" w-full">
                        <div class="border-2 shadow flex">
                          <div class="w-full relative flex lg:text-sm text-xs items-center">
                            <div class="flex w-full text-center justify-center bg-[#E5E4E2] text-black font-bold py-0.5"> Senior Full Stack Developer </div>
                            <div class="flex text-center lg:whitespace-nowrap px-3 justify-center bg-violet-600 text-white font-bold py-0.5"> Core Member </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="lg:px-5 px-2 py-5 lg:w-11/12 mx-auto  mb-5 lg:border-4 border border-[#FFD700] lg:bg-[#ffffff15] bg-[#00000083]">
                  <p class="lg:text-left text-center text-white font-bold uppercase">Gold Sponsors <i class="fa fa-medal text-[#FFD700]"></i>
                  </p>
                  <ul class=" lg:gap-10 gap-5 w-full justify-center">
                    <li class="text-white font-bold">
                      <div class="bg-white w-full h-1 lg:my-5 my-3"></div>
                    </li>
                    <li class="mb-3 bg-gray-800 lg:bg-transparent">
                      <div class="flex lg:w-4/12 w-full pt-1 pb-3 px-4 rounded-3xl">
                        <p class="font-bold uppercase text-white text-center whitespace-nowrap"> Michael Earvin <span class="text-[#18FF82]">Tia</span>
                        </p>
                      </div>
                      <div class=" w-full">
                        <div class="border-2 shadow flex">
                          <div class="w-full relative flex lg:text-sm text-xs items-center">
                            <div class="w-full text-center justify-center bg-[#FFD700] text-black font-bold py-0.5"> Front End Developer </div>
                            <div class="flex text-center lg:whitespace-nowrap px-3 justify-center bg-violet-600 text-white font-bold py-0.5"> Core Member </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="lg:px-5 px-2 py-5 lg:w-11/12 mx-auto lg:border-4 border border-[#CD7F32] lg:bg-[#ffffff15] bg-[#00000083]">
                  <p class="lg:text-left text-center text-white font-bold uppercase">Bronze Sponsors <i class="fa fa-medal text-[#CD7F32]"></i>
                  </p>
                  <ul class=" lg:gap-10 gap-5 w-full justify-center">
                    <li class="text-white font-bold">
                      <div class="bg-white w-full h-1 lg:my-5 my-3"></div>
                    </li>
                    <li class="mb-3 bg-gray-800 lg:bg-transparent">
                      <div class="flex lg:w-4/12 w-full pt-1 pb-3 px-4 rounded-3xl">
                        <p class="font-bold uppercase text-white text-center whitespace-nowrap"> Joshua <span class="text-[#18FF82]">Vicente</span>
                        </p>
                      </div>
                      <div class=" w-full">
                        <div class="border-2 shadow flex">
                            <div class="w-full relative flex lg:text-sm text-xs items-center">
                            <div class="w-full text-center justify-center bg-[#CD7F32] text-white font-bold py-0.5"> Web Developer </div>
                            <div class="flex text-center lg:whitespace-nowrap px-3 justify-center bg-violet-600 text-white font-bold py-0.5"> Core Member </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="mb-3 bg-gray-800 lg:bg-transparent">
                      <div class="flex lg:w-4/12 w-full pt-1 pb-3 px-4 rounded-3xl">
                        <p class="font-bold uppercase text-white text-center whitespace-nowrap"> Kaita <span class="text-[#18FF82]">Ostia</span>
                        </p>
                      </div>
                      <div class=" w-full">
                        <div class="border-2 shadow flex">
                            <div class="w-full relative flex lg:text-sm text-xs items-center">
                            <div class="w-full text-center justify-center bg-[#CD7F32] text-white font-bold py-0.5"> Front End Developer </div>
                            <div class="flex text-center lg:whitespace-nowrap px-3 justify-center bg-violet-600 text-white font-bold py-0.5"> Core Member </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="lg:my-0 my-10 flex items-center lg:w-5/12 lg:px-5 py-2 text-white text-xs lg:border-l-4 lg:ml-10 lg:border shadow-lg border-y-2">
               <div>
                <p class="lg:mt-0 mt-5 mb-8 font-bold uppercase text-center lg:w-11/12 mx-auto"> 
                  <span class="lg:flex block w-fit mx-auto">Sponsorship Opportunity for Community</span>
                  <span class="lg:flex block w-fit mx-auto"> TECH SAVVY CODE CAMP</span>
                
                </p>
                <div class="">
                  <p class="mb-5">We are excited to offer your organization the opportunity to partner with <span class="font-bold">Tech Savvy Code Camp community</span>empowering the next generation of coders, developers, and tech enthusiasts in Misamis Occidental, Philippines.</p>
                  <p class="mb-2">At <span class="font-bold">Tech Savvy Code Camp</span>, we provide hands-on coding sessions that help individuals of all ages develop the technical skills needed for success in today’s tech-driven world. We are seeking sponsorship to help fund: </p>
                  <ul class="list-disc ml-10 mb-5 mt-3">
                    <li class="font-bold mb-2">
                      <span>Purchasing Laptop Devices and Learning Materials</span>
                      <!-- <span>  Access to technology is crucial for our participants to engage fully in the coding sessions. Many of our members do not have their own laptops or the necessary tools to take full advantage of the learning opportunities. With your support, we aim to purchase laptops and other essential learning materials (such as coding textbooks, software licenses, and online resources) to ensure that every participant has the tools they need to succeed.</span> -->
                    </li>
                    <li class="font-bold mb-2">
                      <span>Onsite Coding Sessions | Buy us Coffee</span>
                      <!-- <span>
                        A positive and engaging learning environment can make a huge difference in the success of our coding sessions. By sponsoring onsite refreshments, such as coffee and light snacks, you will help create a welcoming and energized atmosphere for our attendees. The simple act of providing coffee during these sessions helps foster collaboration, networking, and a sense of community among participants.
                    </span> -->
                    </li>
                    <li class="font-bold mb-2">
                      <span>Future Community Activities and Website Features</span>
                      <!-- <span>
                        In addition to the ongoing coding sessions, we are planning future community events, such as hackathons, workshops, and tech talks, to continue building a thriving learning ecosystem. Additionally, we are in the process of developing a website that will host coding resources, showcase projects, and provide a platform for community engagement. Your sponsorship would directly contribute to the development of these activities and features, creating lasting value for our growing community.
                    </span>   -->
                    </li>
                  </ul>
                  <p class="font-bold mb-3">Sponsorship Benefits:</p>
                  <p class="mb-5">Your organization will receive visibility through our event banners, online marketing, and social media, ensuring your brand is recognized as a key partner in advancing tech education in our community.</p>
                  <p class="mb-5">We would love to discuss how we can tailor this sponsorship to suit your needs. Please contact us at <span class="font-bold">info@techsavvies.space</span> to learn more about how you can become an integral part of this initiative. </p>
                  <p class="mb-14">Thank you for considering this opportunity to make a meaningful impact on the future of aspiring coders and the tech community. </p>
                  <p>Sincerely,</p>
                  <p class="font-bold mb-5">Tech Savvy Team</p>
                </div>
               </div>
              </div>
              <div class="lg:w-3/12 lg:px-5 py-5 text-white text-sm lg:ml-10  shadow lg:border-0 border border-[#ffffff0f] lg:mb-0 mb-10 lg:mt-0 mt-5">
                <p class="mb-5 font-bold uppercase text-center  border-white"> Online Bank Transfer</p>
                <p class="text-center font-bold mt-5 lg:text-lg text-sm my-3">Be our Sponsors!</p>
                <p class="text-center mb-3"> Scan the QR Code:</p>
         <div>
            <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/BPI.png" class="lg:max-w-[300px] w-11/12 mx-auto" />
         </div>

      

         <p class="text-center font-bold mt-5 lg:text-lg text-sm lg:mb-0 mb-3">Thank you for your support!</p>
         <p class="text-center">Email and send your receipt to <span class="font-bold text-red-200">info@techsavvies.space</span></p>
         <p class="italic mt-4 text-center lg:text-sm text-xs xl:w-10/12 lg:w-9/12 w-8/12 mx-auto lg:mt-20 tracking-widest">"Empower the next generation of coders in Misamis Occidental"</p>
              </div>
            </div>


            <div class="lg:flex w-11/12 mx-auto text-white gap-5 shadow-lg text-xs mb-10 lg:px-7 px-3 lg:py-10 pt-7 pb-3 border-2 border-gray-800">
              <div class="lg:w-6/12 lg:mb-0 mb-10">
                <p class="lg:font-bold uppercase mb-4 text-green-400 lg:text-lg text-base">Sponsorship Benefits:</p>

                
                <p class="italic mb-3">Your contribution helps foster innovation, creativity, and growth in our field.</p>
<p class="italic lg:mb-5 mb-3">By sponsoring our community initiatives, you will receive:</p>

<ul class="lg:list-disc lg:ml-7">
  <li class="lg:mb-7 mb-3"><span class="font-bold text-green-400 text-sm">Visibility and Brand Recognition</span>: Your brand will be prominently featured in our event banners, online marketing campaigns, and social media channels, establishing your company as a key partner in advancing tech education in our community.</li>
  <li class="lg:mb-7 mb-3"><span class="font-bold text-green-400 text-sm">Community Impact</span>: Your sponsorship directly contributes to providing accessible tech education and coding resources for individuals who otherwise might not have the opportunity to learn.</li>
  <li class="lg:mb-7 mb-3"><span class="font-bold text-green-400 text-sm">Exclusive Acknowledgment</span>: Sponsors will receive recognition in event materials, newsletters, and during on-site activities, further cementing your role in shaping the future of tech education.</li>
</ul>


              </div>
              <div class="lg:w-full lg:border-l-4 border-violet-900 lg:pl-10">
                <p class="lg:font-bold uppercase mb-4 text-green-400 lg:text-lg text-base ">Individual Sponsorship Levels:</p>
<p class="italic mb-3 ">We also offer various sponsorship options for individuals who wish to support our cause at different levels. Whether you're an aspiring tech enthusiast, a local entrepreneur, or simply passionate about empowering others, we have a tailored option for you:</p>

<ul class="lg:list-disc lg:ml-8 ">
  <li class="mb-4"><span class="font-bold text-green-400 text-sm">Starter Sponsor (Below ₱5,000)</span>: Your name will be featured on the Hall of Sponsors page on our website.</li>
  <li class="mb-4"><span class="font-bold text-green-400 text-sm">Bronze Sponsor (₱5,000+)</span>: Includes your name or business listed on event materials, our website, and social media shout-outs.
  </li>
  <li class="mb-4"><span class="font-bold text-green-400 text-sm">Silver Sponsor (₱10,000+)</span>: Includes all Bronze Sponsor benefits, plus your logo featured on event banners, our website, and social media shout-outs.</li>
<li class="mb-4"><span class="font-bold text-green-400 text-sm">Gold Sponsor (₱20,000+)</span>: Includes Silver Sponsor benefits, plus logo featured on event banners, our website, social media shout-outs and dedicated social media posts and acknowledgment during coding sessions.</li>
<li class="mb-4"><span class="font-bold text-green-400 text-sm">Platinum Sponsor (₱50,000+)</span>: Includes all Gold benefits, plus exclusive mentions in our newsletters and a special thank-you plaque at events.</li>
<li class="mb-4"><span class="font-bold text-green-400 text-sm">Diamond Sponsor (₱100,000+)</span>: Includes all Platinum Sponsor benefits, plus prominent logo placement at the event, exclusive branding opportunities, a featured article in our newsletter, with personalized recognition and VIP advantage 3 years service website.</li>
</ul>

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
                  <span class="block lg:text-sm text-xs lg:text-left text-center"></span>
                </div>
                <div class="text-[#EEEAFF] lg:text-sm text-xs lg:text-left text-center lg:w-full w-7/12 lg:mx-0 mx-auto">
                  <span>Through Social Media Page </span>
                  <a href="https://www.facebook.com/TechSavvyCodeCamp" target="_blank" class="font-bold mr-1 hover:cursor-pointer	text-[#B5A3FF] hover:text-white whitespace-nowrap">fb.com/TechSavvyCodeCamp</a>
                </div>
              </div>
              <div class="lg:pt-0 pt-10">
                <div class="text-[#fff] font-semibold tracking-tighter lg:text-2xl text-lg lg:text-left text-center"> Join the <span class="font-bold lg:text-4xl text-xl text-[#B5A3FF]"> Code Camp 2025 </span>
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
            <div class="text-[#fff] font-semibold text-sm text-center mx-auto pt-10 lg:pb-10 pb-4 block">    TECH SAVVY © 2025</div>
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