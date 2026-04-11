<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-[#111] text-white">
    
    <!-- LEFT IMAGE -->
    <div
      class="w-full lg:w-1/2 h-[40vh] lg:h-auto bg-center bg-cover"
      style="background-image: url('https://www.indiewire.com/wp-content/uploads/2015/06/sadness-inside-out.jpg')"
    ></div>

    <!-- RIGHT CONTENT -->
    <div class="w-full lg:w-1/2 flex flex-col justify-between bg-[#222] p-6 sm:p-8 lg:p-10">
      
      <!-- HEADER -->
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="font-bold text-lg text-center sm:text-left">
          Majori Deganos
        </div>

        <nav class="flex flex-wrap justify-center sm:justify-end gap-4 font-bold text-sm sm:text-base">
          <a href="#" class="hover:text-red-400 transition">Home</a>
          <a href="#" class="hover:text-red-400 transition">Photo</a>
          <a href="#" class="hover:text-red-400 transition">About Me</a>
          <a href="#" class="hover:text-red-400 transition">Contact</a>
        </nav>
      </header>

      <!-- MAIN -->
      <main class="text-center lg:text-left mt-8 lg:mt-0">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Majori Deganos
        </h1>

        <p class="max-w-lg mx-auto lg:mx-0 leading-relaxed text-gray-300 text-sm sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
        </p>

        <div class="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button class="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded font-bold w-full sm:w-auto">
            Explore Now
          </button>

          <button class="bg-white text-gray-900 hover:bg-gray-200 transition px-6 py-3 rounded font-bold w-full sm:w-auto">
            Play Video
          </button>
        </div>
      </main>

      <!-- FOOTER -->
      <footer class="text-center lg:text-right text-sm opacity-70 mt-8">
        Page | 01
      </footer>
    </div>

  </div>
</template>