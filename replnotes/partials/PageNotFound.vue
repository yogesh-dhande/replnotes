<template>
  <section class="relative text-indigo-100">
    <div class="mx-auto px-4 sm:px-6">
      <div class="pt-32 pb-12 md:pt-40 md:pb-20">
        <div class="mx-auto text-center">
          <!-- Top image -->
          <!-- 404 content -->
          <h1
            class="text-indigo-300 text-2xl sm:text-4xl mb-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            🔍 404 <span class="mx-3">|</span> That page doesn’t exist.
          </h1>
          <p
            class="text-lg sm:text-2xl"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Head to the
            <router-link
              to="/"
              class="
                text-indigo-500
                hover:text-indigo-600
                transition
                duration-150
                ease-in-out
              "
              >home page</router-link
            >, or try double-checking the URL.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>