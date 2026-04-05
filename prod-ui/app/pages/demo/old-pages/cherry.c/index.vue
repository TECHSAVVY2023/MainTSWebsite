<script setup>
</script>

<template>
    <div class="bg-gradient-to-tr from-red-300 to-indigo-700 h-screen flex lg:items-center lg:pt-0 pt-10 justify-center">
        <div class="lg:w-fit">
            <div class="rounded-full lg:w-fit mx-auto lg:flex lg:items-center lg:gap-20">
                <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/cherryProfile.jpg" 
                    class="lg:w-[430px] w-[300px] lg:h-[430px] rounded-full border-[10px] object-center shadow-2xl lg:mx-0 mx-auto"/>
                <div>
                   <div class="typewriter text-white lg:text-8xl text-3xl lg:text-left text-center lg:mb-7 font-bold lg:mt-0 mt-5 w-fit mx-auto">
                    <h1 class="tracking-tighter">Cherry Cabanes</h1>
                   </div>
                    <h2 class="tracking-tighter text-white lg:text-xl lg:text-left text-center">
                        <span class="lg:flex block">
                            IT Specialists / Dev | Financial Data Analyst 
                        </span>
                    </h2>
                    <div class="shadow-2xl w-fit rounded-3xl lg:mx-0 mx-auto">
                        <ul class="mt-5 flex py-3 pl-5 lg:pr-9 pr-8">
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=100008633017630">
                                    <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/social-media-icons/facebooklogo-removebg-preview.png" 
                                    class="lg:w-[90px] w-[70px] hover:animate-bounce" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/cherry-cabanes-8260a9266/">
                                    <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/social-media-icons/linkedInLogo-removebg-preview.png" 
                                    class="lg:w-[50px] w-[40px] hover:animate-bounce" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/_cherrymae22/">
                                    <img src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/jo/social-media-icons/instagramLogo-removebg-preview.png" 
                                    class="lg:w-[50px] w-[40px] hover:animate-bounce ml-5" />
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
  padding-right: 5px;
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