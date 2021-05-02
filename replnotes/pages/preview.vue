<template>
    <div class="px-12 mt-6">
        <url-slug-input
            class="mt-3"
            prefix="URL"
            v-model="url"
            @change="preview"
        ></url-slug-input>
        <notebook :nbJson="nbJson" :key="updateCount" v-if="nbJson" />
    </div>
</template>

<script>
import URLSlugInput from '@/components/URLSlugInput'
import Notebook from '@/components/Notebook'
import { getNbJsonFromUrl } from '~/services/notebook'

export default {
    name: 'url-preview',
    components: {
        'url-slug-input': URLSlugInput,
        Notebook,
    },
    data() {
        return {
            url: null,
            updateCount: 0,
            nbJson: null,
        }
    },
    methods: {
        async preview() {
            this.nbJson = await getNbJsonFromUrl(this.url)
        },
    },
}
</script>

<style>
</style>