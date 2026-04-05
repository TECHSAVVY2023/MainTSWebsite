<script setup>
</script>

<template>
    <div class="lg:bg-gradient-to-l bg-gradient-to-b from-yellow-600 to-violet-800 h-screen flex lg:items-center lg:pt-0 pt-10 justify-center">
        <div class="lg:w-fit">
            <div class="rounded-full lg:w-fit mx-auto lg:flex lg:items-center lg:gap-20">
                <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/jhonDaveProfile.jpg" 
                class="lg:w-[490px] w-[270px] rounded-full object-center shadow-2xl lg:mx-0 mx-auto lg:border-[10px] border-4 border-white lg:order-2 order-1"/>
                <div class="lg:order-1 order-2">
                   <div class="typewriter text-white lg:text-7xl text-3xl lg:text-left text-center lg:mb-7 font-bold lg:mt-0 mt-5 mx-auto w-fit">
                    <h1 class="">Jhon Dave Pinatacan</h1>
                   </div>
                    <h2 class="tracking-tighter text-white lg:text-2xl lg:text-right text-center lg:w-full w-8/12 mx-auto">Front End Web Developer / Multimedia</h2>
                    <div class="w-fit rounded-3xl lg:mr-0 ml-auto mx-auto">
                        <ul class="mt-5 flex py-3">
                            <li>
                                <a href="https://www.facebook.com/johndave.pinatacan">
                                    <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/social-media-icons/facebooklogo-removebg-preview.png" 
                                    class="lg:w-[97px] w-[70px] hover:animate-bounce" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/">
                                    <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/social-media-icons/linkedInLogo-removebg-preview.png" 
                                    class="lg:w-[53px] w-[40px] hover:animate-bounce" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/_dabbeee_/">
                                    <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/social-media-icons/instagramLogo-removebg-preview.png" 
                                    class="lg:w-[53px] w-[40px] hover:animate-bounce ml-5" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</template>

<style>
.typewriter h1 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  /* letter-spacing: .15em; Adjust as needed */
  animation: 
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}

</style>