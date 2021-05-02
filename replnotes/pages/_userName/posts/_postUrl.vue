<template>
    <div class="px-2 lg:px-12 py-2 lg:py-6 bg-gray-800 min-h-screen">
        <card
            class="py-6 px-12 max-w-6xl mx-auto text-indigo-200"
            v-if="post.id"
        >
            <h1 class="text-3xl lg:text-4xl font-extrabold my-6 tracking-tight">
                {{ post.title }}
            </h1>
            <div class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                    <router-link :to="`/${post.user.name}`">
                        <span class="sr-only">{{ post.user.displayName }}</span>
                        <thumbnail
                            class="rounded-full h-8 w-8 lg:h-10 lg:w-10"
                            :src="post.user.thumbnailUrl"
                        />
                    </router-link>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-indigo-300">
                        <router-link
                            :to="`/${post.user.name}`"
                            class="hover:underline"
                        >
                            {{ post.user.displayName }}
                        </router-link>
                    </p>
                    <div
                        v-if="readableDate"
                        class="flex space-x-1 text-sm text-indigo-200"
                    >
                        <time datetime="2020-03-16">
                            {{ readableDate }}
                        </time>
                    </div>
                </div>
            </div>
            <notebook
                class="my-6"
                :nbJson="nbJson"
                v-if="file"
                :key="updateCount"
            >
            </notebook>
            <div class="flex flex-row flex-wrap">
                <badge
                    class="mt-0 mb-2 ml-0 mr-2"
                    v-for="tag in post.tags"
                    :key="tag"
                    ><router-link
                        :to="`/${post.user.name}/posts/?tag=${tag}`"
                        class="italic hover:underline"
                    >
                        {{ tag }}</router-link
                    ></badge
                >
            </div>
        </card>
    </div>
</template>

<script>
import Notebook from '@/components/Notebook'
import Card from '@/components/Card'
import Badge from '@/components/Badge'
import Thumbnail from '@/components/Thumbnail'
import { readFile, parseAttachments, parseMagicMethods, downloadNotebook } from '~/services/notebook'

export default {
    name: 'post',
    asyncData(context) {
        console.log("async data for post called")
        return {
            userName: context.params.userName,
            postUrl: context.params.postUrl,
        }
    },
    components: {
        notebook: Notebook,
        card: Card,
        badge: Badge,
        thumbnail: Thumbnail,
    },
    data() {
        return {
            file: null,
            nbJson: {},
            post: {},
            updateCount: 0,
            listeners: [],
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            let params = to.params
            if (params.userName && params.postUrl) {
                if (vm.post.id) {
                    vm.updateDocumentTitle()
                    if (
                        vm.post.user.name != params.userName ||
                        vm.post.name != params.postUrl
                    ) {
                        vm.load()
                    }
                } else {
                    vm.load()
                }
            }
        })
    },
    computed: {
        readableDate() {
            try {
                let date = this.post.created.toDate()
                let year = date.getFullYear()
                let month = date.toLocaleString('default', { month: 'long' })
                let day = date.getDate()
                return `${month} ${day}, ${year}`
            } catch (error) {
                return null
            }
        },
    },
    methods: {
        load() {
            let listener = this.$postsCollection
                .where('user.name', '==', this.userName)
                .where('url', '==', this.postUrl)
                .onSnapshot((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        this.post = querySnapshot.docs[0].data()
                        this.file = null
                        downloadNotebook(this.post.file.url, async (file) => {
                            this.file = file
                            await this.handleFileChange()
                            this.updateDocumentTitle()
                        })
                    }
                })
            this.listeners.push(listener)
        },
        detachListeners() {
            if (this.listeners) {
                this.listeners.forEach((listener) => listener())
            }
        },
        async handleFileChange() {
            let text = await readFile(this.file)
            let content = JSON.parse(text)

            content.cells.forEach((cell) => {
                // parseMagicCommands
                parseMagicMethods(cell)

                if (cell.cell_type == 'markdown') {
                    parseAttachments(cell)
                }
                cell.source = cell.source.filter(this.parseMagicTags)
            })
            this.nbJson = content
            this.updateCount += 1
        },
        parseMagicTags(line) {
            let commands = line.split(':')
            let key = commands[0].trim().replace(' ', '').toLowerCase()
            if (key.includes('#title')) {
                return false
            } else if (key.includes('#url')) {
                return false
            } else if (key.includes('#description')) {
                return false
            } else if (key.includes('#tags')) {
                return false
            }
            return true
        },
        updateDocumentTitle() {
            document.title = this.post.title
            console.log(this.$fireModule.analytics.EventName)
            this.$fire.analytics.logEvent("view_post", this.post)
        },
    },
    beforeDestroy() {
        this.detachListeners()
    },
}
</script>

<style>
</style>