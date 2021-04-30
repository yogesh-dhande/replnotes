<template>
    <div class="bg-yellow-200 my-6">
        <div class="max-w-7xl mx-auto py-3 px-8">
            <div class="flex flex-col sm:flex-row justify-between flex-wrap">
                <div class="flex items-center">
                    <span class="p-2 rounded-lg bg-yellow-400">
                        <!-- Heroicon name: outline/speakerphone -->
                        <svg
                            class="h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </span>
                    <p class="ml-3 font-medium text-yellow-800">
                        <span>
                            Please check your email for a verification link
                            before creating posts.
                        </span>
                    </p>
                </div>
                <div class="mt-2 text-center mx-auto lg:mr-0 lg:mt-0">
                    <button
                        @click="sendEmail"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                    >
                        Resend Verification Email
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'verify-email',
    data() {
        return {
            verificationInterval: null,
        }
    },
    methods: {
        sendEmail() {
            this.$fire.auth.currentUser.sendEmailVerification({
                url: `${process.env.NUXT_ENV_BASE_URL}/dashboard`,
            })
        },
    },
    mounted() {
        this.verificationInterval = setInterval(() => {
            console.log('checking email verification')
            this.$fire.auth.currentUser.reload().then(() => {
                if (this.$fire.auth.currentUser.emailVerified) {
                    clearInterval(this.verificationInterval)
                    this.$store.commit(
                        'setEmailVerified',
                        this.$fire.auth.currentUser.emailVerified
                    )
                }
            })
        }, 1000)
    },
}
</script>

<style>
</style>