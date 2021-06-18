<template>
  <div class="bg-gray-800">
    <div
      class="max-w-4xl mx-auto text-center py-12 px-2 sm:px-6 lg:py-16 lg:px-8"
    >
      <div class="flex flex-col place-items-center px-2">
        <h1
          class="
            text-center text-5xl
            sm:text-7xl
            tracking-tight
            font-extrabold
            text-indigo-400
          "
        >
          Jupyter Notebooks
          <span class="block text-indigo-100">
            <span class="inline text-indigo-400">
              <span class="block text-4xl sm:text-6xl text-indigo-100">
                to a Blog Within Minutes</span
              ></span
            >
          </span>
        </h1>
        <p
          class="
            mt-3
            px-12
            sm:px-0
            font-thin
            tracking-wider
            text-indigo-100
            sm:mt-5
            text-md
            sm:text-xl
            md:text-2xl
            sm:max-w-2xl
            sm:mx-auto
            md:mt-5
            lg:mx-0
          "
        >
          Quickly create a portfolio by turning Jupyter notebooks into beautiful
          blog posts. No coding required.
        </p>
      </div>
      <div class="mt-8 flex justify-center">
        <div class="inline-flex rounded-md shadow">
          <nuxt-link
            to="/register"
            class="
              w-full
              px-8
              py-3
              border border-transparent
              text-base
              font-medium
              rounded-md
              text-white
              bg-gradient-to-r
              from-pink-600
              to-indigo-600
              hover:from-indigo-600
              hover:to-pink-600
              border-none
              md:py-4
              md:text-lg
              md:px-10
            "
          >
            Start a Blog
          </nuxt-link>
        </div>
        <div class="ml-3 inline-flex">
          <nuxt-link
            to="/demo"
            class="
              w-full
              px-8
              py-3
              border border-transparent
              text-base
              font-medium
              rounded-md
              text-indigo-700
              bg-indigo-100
              hover:bg-indigo-200
              md:py-4
              md:text-lg
              md:px-10
            "
          >
            See Demo
          </nuxt-link>
        </div>
      </div>
      <h2 class="mt-6 text-indigo-100 font-medium text-lg">
        Have questions? Ask them
        <nuxt-link to="/feedback" class="text-indigo-500 italic"
          >here!</nuxt-link
        >
      </h2>
    </div>
    <div class="pb-20 bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-12">
        <div class="p-6 rounded-lg shadow-lg"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "landing",
};
</script>

<style>
</style>