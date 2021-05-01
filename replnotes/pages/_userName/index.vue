<template>
    <div
        v-if="user"
        class="px-2 lg:px-12 py-2 lg:py-12 bg-gray-800 min-h-screen"
    >
        <window class="px-12 sm:mx-24">
            <template
                v-slot:top-right
                v-if="currentUser.id == user.id && !editMode"
            >
                <icon-button @click="editMode = true">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                </icon-button>
            </template>
            <template v-slot:body>
                <about :user="user" :key="user.id" v-if="!editMode" />
                <profile
                    class="max-w-xl"
                    v-else
                    @save="editMode = false"
                    @cancel="editMode = false"
                    :currentUser="user"
                />
            </template>
        </window>
    </div>
</template>

<script>
import About from '@/components/About'
import Profile from '@/components/Profile'
import Window from '@/components/Window'
import IconButton from '@/components/IconButton'
import { mapState } from 'vuex'

export default {
    name: 'user-home',
    components: {
        About,
        Profile,
        Window,
        IconButton,
    },
    asyncData(context) {
        return {
            userName: context.params.userName,
        }
    },
    data() {
        return {
            user: null,
            listeners: [],
            editMode: false,
        }
    },
    computed: {
        ...mapState(['currentUser']),
    },
    mounted() {},
    methods: {
        load() {
            let listener = this.$usersCollection
                .where('name', '==', this.userName)
                .onSnapshot((querySnapshot) => {
                    if (querySnapshot.size > 0) {
                        this.user = querySnapshot.docs[0].data()
                        this.updateDocumentTitle()
                    } else {
                        // TODO push router to 404
                        this.$router.push('/404')
                    }
                })
            this.listeners.push(listener)
        },
        detachListeners() {
            if (this.listeners) {
                this.listeners.forEach((listener) => listener())
            }
        },
        updateDocumentTitle() {
            document.title = this.user.displayName
            this.$fire.analytics.logEvent("view_user_home", this.user)
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            let params = to.params
            if (params.userName) {
                if (vm.user) {
                    vm.updateDocumentTitle()
                    if (vm.user.name != params.userName) {
                        vm.load()
                    }
                } else {
                    vm.load()
                }
            }
        })
    },

    beforeDestroy() {
        this.detachListeners()
    },
}
</script>

<style>
</style>