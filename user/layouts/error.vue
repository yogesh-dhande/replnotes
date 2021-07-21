<template>
  <div>
    <page-not-found v-if="error.statusCode === 404" />
    <div v-else class="text-indigo-200">{{ error.message }}</div>
  </div>
</template>

<script>
import PageNotFound from '@/components/partials/PageNotFound.vue'

export default {
  components: { PageNotFound },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>