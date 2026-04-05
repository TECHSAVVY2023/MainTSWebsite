<template>
<div class="bg-[#0f1118] text-white font-[Poppins] scroll-smooth">

<!-- NAVBAR -->
<nav class="fixed top-0 w-full z-50 bg-[#0f1118] py-4">
  <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">

    <a href="#home" class="text-2xl font-bold flex items-center gap-2">
      <i class="fa-solid fa-user-circle text-[#ffb400]" />
      Neil
    </a>

    <ul class="hidden md:flex items-center gap-6">
      <li v-for="link in navLinks" :key="link.href">
        <a
          :href="link.href"
          class="text-sm font-medium uppercase tracking-wide hover:text-[#ffb400] transition"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>

    <button class="md:hidden text-2xl" @click="menuOpen = !menuOpen">
      <i class="fa-solid fa-bars"/>
    </button>
  </div>

  <!-- Mobile Menu -->
  <div
    v-if="menuOpen"
    class="md:hidden flex flex-col items-center gap-4 py-4 border-t border-white/10"
  >
    <a
      v-for="link in navLinks"
      :key="link.href"
      :href="link.href"
      class="text-sm font-medium uppercase tracking-wide hover:text-[#ffb400]"
      @click="menuOpen=false"
    >
      {{ link.label }}
    </a>
  </div>
</nav>


<!-- HERO -->
<section id="home" class="pt-20 min-h-screen flex items-center">
  <div class="max-w-6xl mx-auto px-6 w-full">
    <div class="flex flex-col-reverse lg:flex-row items-center gap-10">

      <div class="lg:w-1/2 text-center lg:text-left">
        <p class="text-[#ffb400] text-xl mb-2">Hello, I'm</p>

        <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-4 text-[#ffb400]">
          Neil Martin <br>
          Molina
        </h1>

        <h4 class="text-2xl text-gray-400 mb-8">Developer</h4>
      </div>

      <div class="lg:w-1/2">
        <img
          src="/media/me/Neil PFP.png"
          class="w-full rounded-xl grayscale hover:grayscale-0 transition duration-500"
        >
      </div>

    </div>
  </div>
</section>


<!-- ABOUT -->
<section id="about" class="py-24">
  <div class="max-w-6xl mx-auto px-6">

    <div class="relative text-center mb-16">
      <span class="absolute inset-0 flex justify-center items-center text-[5rem] font-black text-white/5 uppercase pointer-events-none select-none">
        About Me
      </span>

      <h2 class="relative z-10 text-3xl font-bold uppercase after:block after:w-[60px] after:h-[3px] after:bg-[#ffb400] after:mx-auto after:mt-3">
        About Me
      </h2>
    </div>

    <div class="flex flex-col lg:flex-row items-center gap-12">

      <div class="lg:w-5/12">
        <img
          src="/media/me/Neil Pfp 24 07 21 ver 3 complete.png"
          class="w-full rounded-xl shadow-2xl grayscale"
        >
      </div>

      <div class="lg:w-7/12">
        <h3 class="text-3xl font-semibold mb-1">
          Hi There! I'm Neil Martin Molina
        </h3>

        <p class="text-[#ffb400] text-lg font-medium mb-5">
          Developer
        </p>

        <p class="text-lg text-white/80 mb-6">
          I am a developer focused on coding and an avid video game enthusiast.
        </p>

        <ul class="space-y-3 text-sm">
          <li
            v-for="info in aboutInfo"
            :key="info.label"
            class="flex"
          >
            <strong class="w-28 font-medium">{{ info.label }}</strong>
            <span class="text-gray-400">: {{ info.value }}</span>
          </li>
        </ul>

      </div>
    </div>
  </div>
</section>


<!-- SKILLS -->
<section id="skills" class="py-24">
<div class="max-w-6xl mx-auto px-6">

<div class="relative text-center mb-16">

<span class="absolute inset-0 flex justify-center items-center text-[5rem] font-black text-white/5 uppercase pointer-events-none">
Skills
</span>

<h2 class="relative z-10 text-3xl font-bold uppercase after:block after:w-[60px] after:h-[3px] after:bg-[#ffb400] after:mx-auto after:mt-3">
Skills
</h2>

</div>


<!-- CORE -->

<div class="mb-10 bg-[#161922] rounded-2xl p-10 text-center">

<h3 class="text-xl font-semibold mb-8">
Core
</h3>

<div class="flex justify-center flex-wrap gap-8">

<img
v-for="skill in coreSkills"
:key="skill.alt"
:src="skill.src"
:alt="skill.alt"
class="h-[75px] object-contain hover:scale-110 transition"
/>

</div>
</div>


<!-- FAMILIAR -->

<div class="bg-[#161922] rounded-2xl p-10 text-center">

<h3 class="text-xl font-semibold mb-8">
Familiar / Academic
</h3>

<div class="overflow-hidden py-5">

<div class="flex gap-10 animate-[scrollLeft_35s_linear_infinite] hover:[animation-play-state:paused]">

<template v-for="set in 3" :key="set">

<img
v-for="skill in familiarSkills"
:key="`${set}-${skill.alt}`"
:src="skill.src"
:alt="skill.alt"
class="h-[75px] object-contain hover:scale-110 transition"
/>

</template>

</div>
</div>
</div>

</div>
</section>


<!-- PROJECTS -->

<section id="projects" class="py-24">

<div class="max-w-6xl mx-auto px-6">

<div class="relative text-center mb-16">

<span class="absolute inset-0 flex justify-center items-center text-[5rem] font-black text-white/5 uppercase pointer-events-none">
Projects
</span>

<h2 class="relative z-10 text-3xl font-bold uppercase after:block after:w-[60px] after:h-[3px] after:bg-[#ffb400] after:mx-auto after:mt-3">
Projects
</h2>

</div>


<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<div
v-for="project in projects"
:key="project.title"
class="relative rounded-[20px] overflow-hidden h-[250px] group"
>

<img
:src="project.img"
class="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-50"
/>

<div class="absolute inset-0 bg-gradient-to-t from-[#0f1118] via-[#0f1118]/90 to-[#0f1118]/80 flex flex-col justify-end p-6 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition">

<h3 class="text-xl font-bold mb-2">
{{ project.title }}
</h3>

<p class="text-sm text-white/80 mb-3 line-clamp-3">
{{ project.desc }}
</p>

<div class="flex flex-wrap gap-2 mb-3">

<span
v-for="tag in project.tags"
:key="tag"
class="bg-[#ffb400]/15 text-[#ffb400] text-xs px-3 py-1 rounded-full uppercase"
>
{{ tag }}
</span>

</div>

<a
v-if="project.link"
:href="project.link"
target="_blank"
class="inline-flex items-center gap-2 bg-[#ffb400] text-black font-semibold text-sm px-5 py-2 rounded-full hover:bg-[#e5a200] hover:translate-x-1 transition"
>

View Project
<i class="fa-solid fa-arrow-right text-sm"/>

</a>

</div>

</div>

</div>
</div>
</section>


<!-- FOOTER -->

<footer class="bg-[#0f1118] border-t border-[#ffb400]/10 py-20">

<div class="max-w-6xl mx-auto px-6 text-center">

<h4 class="font-semibold text-xl uppercase tracking-wide mb-10">
Reach out to me in these platforms
</h4>

<div class="flex justify-center gap-8 my-10">

<a
href="https://www.tiktok.com/@nlmrtnmlna"
class="w-[60px] h-[60px] rounded-full flex items-center justify-center text-[26px] bg-gradient-to-br from-[#00f2ea] to-[#ff0050] hover:-translate-y-2 hover:shadow-lg transition"
>
<i class="fa-brands fa-tiktok"/>
</a>

<a
href="https://www.instagram.com/nlmrtnmlina/"
class="w-[60px] h-[60px] rounded-full flex items-center justify-center text-[26px] bg-gradient-to-br from-[#405de6] via-[#833ab4] to-[#fd1d1d] hover:-translate-y-2 hover:shadow-lg transition"
>
<i class="fa-brands fa-instagram"/>
</a>

</div>

<p class="text-gray-400 text-sm mt-10 pt-6 border-t border-white/5">
© 2026 Neil Martin Molina. All rights reserved.
</p>

</div>
</footer>

</div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  
  const menuOpen = ref(false)
  
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
  ]
  
  const aboutInfo = [
    { label: 'Birthday', value: 'July 02, 2004' },
    { label: 'Email', value: 'neilmartinmolina@gmail.com' },
    { label: 'From', value: 'Philippines' },
    { label: 'Language', value: 'Bisaya, English' },
    { label: 'Freelance', value: 'Not Available at the moment' },
  ]
  
  const coreSkills = [
    { src: '/media/languagelogo/HTML5.png', alt: 'HTML5' },
    { src: '/media/languagelogo/CSS3.png', alt: 'CSS3' },
    { src: '/media/languagelogo/javascriptlogo.png', alt: 'JavaScript' },
    { src: '/media/languagelogo/Bootstrap.png', alt: 'Bootstrap' },
  ]
  
  const familiarSkills = [
    { src: '/media/languagelogo/GitHub.png', alt: 'GitHub' },
    { src: '/media/languagelogo/Git.png', alt: 'Git' },
    { src: '/media/languagelogo/Java.png', alt: 'Java' },
    { src: '/media/languagelogo/Python.png', alt: 'Python' },
    { src: '/media/languagelogo/C.png', alt: 'C' },
    { src: '/media/languagelogo/C++.png', alt: 'C++' },
    { src: '/media/languagelogo/Tailwind CSS.png', alt: 'Tailwind CSS' },
  ]
  
  const projects = [
    {
      title: 'Old Web Profile',
      desc: 'My first attempt at building a personal portfolio website. A learning experience in web design and development.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      img: '/media/projects/project1.png',
      link: null,
    },
    {
      title: 'Unofficial Ipil Website',
      desc: 'An LGU ish style website I made for midterms',
      tags: ['HTML', 'CSS', 'JavaScript'],
      img: '/media/projects/project2.png',
      link: 'https://blwncttn.github.io/MidTermMolina/index.html',
    },
    {
      title: 'Pixel Knight Saga (WIP)',
      desc: 'Web-based game made with simple HTML Canvas and PhaserJS',
      tags: ['HTML', 'CSS', 'JavaScript', 'PhaserJS'],
      img: '/media/projects/project3.png',
      link: null,
    },
  ]
  </script>
  