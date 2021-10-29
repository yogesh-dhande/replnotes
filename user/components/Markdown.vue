<template>
  <article
    v-if="text"
    v-markdown="text"
    class="prose sm:prose-lg lg:prose-xl text-indigo-200"
  ></article>
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

<style>
.prose p {
  color: #c7d2fe;
}

.prose strong {
  color: #a5b4fc;
}

.prose a code {
  color: #c7d2fe;
}

.prose code {
  color: #c7d2fe;
  padding: 3px 6px 3px 6px;
  margin: 0 3px 0 3px;
  border-radius: 0.5em;
  font-weight: 100;
  color: #c7d2fe;
  border: none;
  overflow-x: auto;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #e0e7ff;
}

.prose img {
  max-width: 100%;
  border-radius: 0.5em;
  background: white;
}

.prose video {
  max-width: 100%;
  border-radius: 0.5em;
}
</style>