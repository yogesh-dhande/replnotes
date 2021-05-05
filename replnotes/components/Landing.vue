<template>
  <div class="bg-gray-800">
    <div
      class="max-w-4xl mx-auto text-center py-12 px-2 sm:px-6 lg:py-16 lg:px-8"
    >
      <div class="flex flex-col place-items-center">
        <h1
          class="text-4xl tracking-tight font-extrabold text-indigo-100 sm:text-5xl md:text-6xl"
        >
          Transform your
          <span class="block xl:inline text-indigo-500">
            Jupyter notebooks
          </span>
          into a
          <span class="inline text-indigo-100"> blog</span>
        </h1>
        <p
          class="mt-3 text-lg font-thin tracking-wider text-indigo-100 sm:mt-5 sm:text-xl sm:max-w-xl sm:mx-auto md:mt-5 md:text-2xl lg:mx-0"
        >
          Quickly create a portfolio by turning
          <span class="block md:inline"
            >Jupyter notebooks into beautiful blog posts</span
          >
        </p>
      </div>
      <div class="mt-8 flex justify-center">
        <div class="inline-flex rounded-md shadow">
          <nuxt-link
            to="/register"
            class="w-full px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-indigo-600 hover:to-pink-600 border-none md:py-4 md:text-lg md:px-10"
          >
            Get started
          </nuxt-link>
        </div>
        <div class="ml-3 inline-flex">
          <nuxt-link
            to="/demo"
            class="w-full px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
          >
            See Demo
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="pb-20 bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-12">
        <div class="p-6 rounded-lg shadow-lg">
          <img
            class="hidden lg:block relative rounded-lg shadow-xl"
            src="./../assets/demo-lg-new.gif"
            alt="App Demo Gif"
          />
          <img
            class="lg:hidden relative rounded-lg shadow-xl"
            src="./../assets/demo-sm-new.gif"
            alt="App Demo Gif"
          />
        </div>
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