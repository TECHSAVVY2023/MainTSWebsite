<template>
  <div class="bg-gray-100 min-h-screen flex items-center">
    
    <div class="max-w-7xl mx-auto w-full px-6 lg:px-20">
      <div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

        <!-- TEXT CONTENT -->
        <div class="max-w-lg text-center lg:text-left">
          <h4 class="text-lg text-gray-700 mb-2">Hi</h4>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            I'm <span class="text-orange-500">Shena</span>
          </h1>

          <h2 class="text-xl sm:text-2xl lg:text-3xl text-gray-800 mb-4">
            a Frontend Developer
          </h2>

          <p class="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dolorem eum laudantium, unde voluptatum nemo non exercitationem neque ab delectus voluptas asperiores.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button class="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition w-full sm:w-auto">
              Hire Me
            </button>

            <button class="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition w-full sm:w-auto">
              Experience
            </button>
          </div>
        </div>

        <!-- IMAGE -->
        <div class="w-[220px] sm:w-[280px] lg:w-[350px] h-[300px] sm:h-[380px] lg:h-[450px] rounded-[50%/60%] overflow-hidden shadow-lg">
          <img
            src="/img/Shena.jpg"
            alt="Profile Image"
            class="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>

  </div>
</template>