<template>
    <div class="flex flex-col">
        <nuxt-link v-if="post" :to="postLink" alt="Post Link" custom v-slot="{ navigate }">
            <div class="sm:px-0 flex flex-col cursor-pointer" @click="navigate" @keypress.enter="navigate" role="link">
                <div class="flex-1 p-6 flex flex-col justify-between">
                    <div class="flex-1 block mt-2">
                            <p
                                class="text-xl my-2 font-bold tracking-tight text-indigo-200"
                            >
                                {{ post.title }}
                            </p>
                            <p class="my-1 text-base text-indigo-100">
                                {{ post.description }}
                            </p>
                    </div>
                    <img
                        class="my-2 mx-auto max-h-48 bg-white opacity-80 rounded-md"
                        :src="imageSrc"
                        v-if="imageSrc"
                        alt="Thumbnail"
                    />
                    <div class="mt-6 flex items-center">
                        <div class="flex-shrink-0">
                            <nuxt-link :to="`/${post.user.name}`" custom v-slot="{ navigate }">
                                <div @click="navigate" @keypress.enter="navigate" role="link">
                                    <span class="sr-only">{{
                                        post.user.displayName
                                    }}</span>
                                    <thumbnail
                                        class="rounded-full h-8 w-8 lg:h-10 lg:w-10"
                                        :src="post.user.thumbnailUrl"
                                    />
                                </div>

                            </nuxt-link>
                        </div>
                <div class="ml-3">
                    <div class="text-sm font-medium text-indigo-300">
                        <nuxt-link
                            :to="`/${post.user.name}`"
                            class="hover:underline"
                        >
                            {{ post.user.displayName }}
                        </nuxt-link>
                    </div>
                    <div
                        v-if="readableDate"
                        class="flex space-x-1 text-sm text-indigo-200"
                    >
                        <time>
                            {{ readableDate }}
                        </time>
                    </div>
                </div>
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
import { getReadableDate } from '~/services/notebook'


export default {
    name: 'post-preview',
    props: ['post'],
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
            let d = getReadableDate(this.post.created)
            return d
        }
    },
}
</script>

<style>
</style>