<template>
    <div class="my-3 max-w-lg mx-auto grid gap-0 xl:grid-cols-3 xl:max-w-none">
        <div
            class="flex flex-col"
            v-for="(postList, i) in postsColumns"
            :key="i"
        >
            <post-list-item
                class="mt-6"
                :post="post"
                v-for="post in postList"
                :key="post.id"
            >
            </post-list-item>
        </div>
    </div>
</template>

<script>
import PostListItem from '@/components/PostListItem'

export default {
    name: 'post-list',
    props: ['posts'],
    data() {
        return {
            numCols: 3,
        }
    },
    components: {
        'post-list-item': PostListItem,
    },
    computed: {
        postsColumns() {
            let indexes = [...Array(this.numCols).keys()]
            return indexes.map((i) =>
                this.posts.filter((_, j) => j % this.numCols === i)
            )
        },
    },
}
</script>

<style>
</style>