<template>
    <div class="flex flex-col">
        <nuxt-link v-if="post" :to="postLink" alt="Post Link">
            <div class="sm:px-0 flex flex-col">
                <div class="flex-1 p-6 flex flex-col justify-between">
                    <div class="flex-1">
                        <a href="#" class="block mt-2">
                            <p
                                class="text-xl my-2 font-bold tracking-tight text-indigo-200"
                            >
                                {{ post.title }}
                            </p>
                            <p class="my-1 text-base text-indigo-100">
                                {{ post.description }}
                            </p>
                        </a>
                    </div>
                    <img
                        class="my-2 mx-auto max-h-48 bg-white opacity-80 rounded-md"
                        :src="imageSrc"
                        v-if="imageSrc"
                        alt="Thumbnail"
                    />
                    <div class="mt-6 flex items-center">
                        <div class="flex-shrink-0">
                            <nuxt-link :to="`/${post.user.name}`">
                                <span class="sr-only">{{
                                    post.user.displayName
                                }}</span>
                                <thumbnail
                                    class="rounded-full h-8 w-8 lg:h-10 lg:w-10 border border-indigo-300"
                                    :src="post.user.thumbnailUrl"
                                />
                            </nuxt-link>
                        </div>
                        <nuxt-link
                            :to="`/${post.user.name}`"
                            class="block ml-3 hover:text-indigo-50"
                        >
                            <div>
                                <p class="text-sm font-bold text-indigo-100">
                                    {{ post.user.displayName }}
                                </p>
                                <p
                                    v-if="readableDate"
                                    class="flex space-x-1 text-sm text-indigo-200"
                                >
                                    <time :datetime="readableDate">
                                        {{ readableDate }}
                                    </time>
                                </p>
                            </div>
                        </nuxt-link>
                    </div>
                    <div class="flex flex-row flex-wrap space-x-2 mt-6">
                        <badge
                            class="mt-0 mb-2 mx-0"
                            v-for="tag in post.tags"
                            :key="tag"
                            ><nuxt-link
                                :to="`/${post.user.name}/posts/?tag=${tag}`"
                                class="hover:underline"
                            >
                                {{ tag }}</nuxt-link
                            ></badge
                        >
                    </div>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import Badge from '@/components/Badge'
import Thumbnail from '@/components/Thumbnail'

export default {
    name: 'post-preview',
    props: ['post'],
    data() {
        return {
            localPost: this.post,
        }
    },
    components: { Badge, Thumbnail },
    computed: {
        imageSrc() {
            return this.post.thumbnail
        },
        postLink() {
            if (this.readableDate) {
                // post has not been created yet
                return this.post.user
                    ? `/${this.post.user.name}/posts/${this.post.url}`
                    : 'exampleLink'
            }
            return '#'
        },
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
    watch: {
        // post(newValue) {},
    },
}
</script>

<style>
</style>