<template>
    <div class="px-12 mt-6">
        <url-slug-input
            class="mt-3"
            prefix="URL"
            v-model="url"
            @change="preview"
        ></url-slug-input>
        <notebook :file="file" :key="updateCount" v-if="file" />
    </div>
</template>

<script>
import URLSlugInput from '@/components/URLSlugInput'
import Notebook from '@/components/Notebook'
import { downloadFileFromUrl } from '~/services/notebook'

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
            file: null,
        }
    },
    methods: {
        preview() {
            downloadFileFromUrl(this.url, (file) => {
                this.file = file
                this.updateCount += 1
            })
        },
    },
}
</script>

<style>
</style>