<template>
  <article class="prose lg:prose-xl">
    <div v-if="text" v-markdown="text"></div>
  </article>
</template>

<script>
import marked from 'marked'

export default {
  name: 'Markdown',
  directives: {
    markdown: {
      bind(el, binding) {
        el.innerHTML = marked(binding.value)
      },
    },
  },
  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.prose p {
  color: #c7d2fe;
}

.prose strong {
  color: #a5b4fc;
}

.prose a code {
  color: #c7d2fe;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #e0e7ff;
}
</style>