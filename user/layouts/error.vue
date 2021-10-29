<template>
  <div>
    <page-not-found v-if="error.statusCode === 404" />
    <section v-else class="relative text-indigo-100">
      <div class="mx-auto px-4 sm:px-6">
        <div class="pt-32 pb-12 md:pt-40 md:pb-20">
          <div class="mx-auto text-center">
            <h1 class="text-indigo-300 text-2xl sm:text-4xl mb-4">
              😢 {{ error.message }}
            </h1>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PageNotFound from '@/components/partials/PageNotFound.vue'

export default {
  components: { PageNotFound },
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>