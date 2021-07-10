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

<style>
</style>