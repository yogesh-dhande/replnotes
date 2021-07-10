<template>
    <article class="prose lg:prose-xl">
        <div v-markdown="text" v-if="text"></div>
    </article>
</template>

<script>
import marked from 'marked'

export default {
    name: 'markdown',
    props: ['text'],
    directives: {
        markdown: {
            bind: function (el, binding) {
                el.innerHTML = marked(binding.value)
            },
        },
    },
}
</script>

<style>
</style>