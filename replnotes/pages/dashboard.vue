<template>
    <div
        class="px-2 lg:px-12 py-2 lg:py-12 text-indigo-100 bg-gray-800 min-h-screen"
    >
        <div>
            <dl class="mx-12 mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div class="flex flex-col">
                    <div v-if="!editPosts">
                        <button
                            class="flex flex-row w-full py-6 justify-center items-center text-indigo-300 font-bold text-lg bg-gray-900 rounded-lg hover:bg-black mouse shadow transition ease-in duration-200 focus:outline-none"
                            @click="editPosts = true"
                        >
                            <div>
                                <svg
                                    class="h-8 w-8 mx-auto"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                            </div>

                            <div class="ml-3">Add a New Post</div>
                        </button>
                    </div>

                    <div v-else>
                        <create-post @cancel="editPosts = false"></create-post>
                    </div>
                </div>

                <div class="flex flex-col">
                    <div v-if="!editProfile">
                        <button
                            class="flex flex-row w-full py-6 justify-center items-center text-indigo-300 font-bold text-lg bg-gray-900 rounded-lg hover:bg-black mouse shadow transition ease-in duration-200 focus:outline-none"
                            @click="editProfile = true"
                        >
                            <div>
                                <svg
                                    class="h-8 w-8 mx-auto p-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <div class="ml-3">Edit Your Profile</div>
                        </button>
                    </div>

                    <div v-else>
                        <profile @cancel="editProfile = false" :currentUser="currentUser"></profile>
                    </div>
                </div>
                <nuxt-link :to="`/${currentUser.name}/posts`">
                    <div
                        class="text-center px-4 py-5 bg-gray-900 shadow hover:bg-black rounded-lg overflow-hidden sm:p-6"
                    >
                        <dt
                            class="text-md font-medium text-indigo-300 truncate"
                        >
                            Posts
                        </dt>
                        <dd class="mt-1 text-3xl font-semibold text-indigo-500">
                            {{ this.posts.length }}
                        </dd>
                    </div>
                </nuxt-link>

                <div
                    class="text-center text-indigo-300 px-4 py-5 bg-gray-900 shadow rounded-lg overflow-hidden sm:p-6"
                >
                    <dt class="text-md font-medium truncate text-indigo-300">
                        Storage
                    </dt>
                    <dd class="mt-1 text-3xl text-indigo-300">
                        <span class="font-base">{{ storageUsed.size }} </span
                        ><span class="text-2xl">{{ storageUsed.units }}</span>
                        /
                        <span class="font-bold text-indigo-500">100 </span>
                        <span class="text-2xl font-bold text-indigo-500"
                            >MB</span
                        >
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>

<script>
import CreatePost from '@/components/CreatePost'
import Profile from '@/components/Profile'
import { mapState } from 'vuex'

export default {
    name: 'dashboard',
    components: {
        'create-post': CreatePost,
        Profile,
    },
    middleware({ app, redirect }) {
      // If the user is not authenticated
      if (!app.$fire.auth.currentUser) {
        return redirect('/login?redirect=/dashboard')
      }
    },
    head() {
        return {
            title: "Dashboard. REPL Notes"
        }
    },
    data() {
        return {
            posts: [],
            listeners: [],
            editPosts: false,
            editProfile: false,
        }
    },
    computed: {
        ...mapState(['currentUser', 'readonly']),
        orderedPosts() {
            // most recent first
            return this.posts
                .slice()
                .sort((a, b) => b.created.seconds - a.created.seconds)
        },
        storageUsed() {
            if (this.readonly) {
                return this.formatBytes(this.readonly.totalStorageUsed, 1)
            }
            return this.formatBytes(0, 1)
        },
    },
    mounted() {
        this.attachListerners()
    },
    watch: {
        currentUser() {
            this.detachListeners()
            this.attachListerners()
        },
    },
    methods: {
        attachListerners() {
            if (this.currentUser.id) {
                let listener = this.$postsCollection
                    .where('user.id', '==', this.currentUser.id)
                    .onSnapshot((querySnapshot) => {
                        this.posts = []
                        querySnapshot.forEach((doc) => {
                            this.posts.push(doc.data())
                        })
                    })
                this.listeners.push(listener)
            }
        },
        detachListeners() {
            if (this.listeners) {
                this.listeners.forEach((listener) => listener())
            }
        },
        formatBytes(bytes, decimals = 2) {
            const k = 1024
            const dm = decimals < 0 ? 0 : decimals
            const sizes = [
                'Bytes',
                'KB',
                'MB',
                'GB',
                'TB',
                'PB',
                'EB',
                'ZB',
                'YB',
            ]

            if (bytes === 0)
                return {
                    size: 0,
                    units: sizes[0],
                }

            const i = Math.floor(Math.log(bytes) / Math.log(k))

            return {
                size: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
                units: sizes[i],
            }
        },
    },
    beforeDestroy() {
        this.detachListeners()
    },
}
</script>

<style>
</style>