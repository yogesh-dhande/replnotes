<template>
  <section class="relative text-indigo-100">
    <div class="mx-auto px-4 sm:px-6">
      <div class="pt-32 pb-12 md:pt-40 md:pb-20">
        <div class="mx-auto text-center">
          <!-- Top image -->
          <!-- 404 content -->
          <h1 class="text-indigo-300 text-2xl sm:text-4xl mb-4">
            😢 <span v-if="error.message">{{ error.message }}</span>
            <span v-else>An error occurred.</span>
          </h1>
          <p class="text-lg sm:text-2xl">
            Head to
            <nuxt-link to="/" class="text-indigo-400 hover:text-indigo-500"
              >Home</nuxt-link
            >, or send us a
            <nuxt-link
              to="/contact"
              class="text-indigo-400 hover:text-indigo-500"
              >message</nuxt-link
            >
            to help us fix the issue..
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style>
</style>