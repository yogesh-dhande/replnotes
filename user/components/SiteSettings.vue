<template>
  <card class="mx-auto shadow items-center bg-gray-900 text-indigo-200">
    <h2 class="mb-3 py-2 text-xl font-bold">Customize Your Website</h2>
    <text-input
      v-model="title"
      label="Home page heading"
      class="mt-3"
      @input="clearErrors"
    ></text-input>
    <text-area-input
      v-model="description"
      label="Home page sub-heading"
      class="mt-3"
      @input="clearErrors"
    ></text-area-input>
    <div v-if="!isPaidAccount" class="text-sm mt-3">
      <nuxt-link
        to="/plans"
        class="
          px-3
          py-1
          bg-indigo-600
          hover:bg-indigo-700
          rounded
          shadow
          text-indigo-100
        "
        >Upgrade</nuxt-link
      >
      to the paid plan to add a custom domain to your blog.
    </div>
    <div v-else>
      <text-input
        v-model="customDomain"
        placeholder="mydomain.com"
        label="Custom Domain"
        class="w-full mt-3"
        @input="clearErrors"
      ></text-input>
      <div class="flex flex-row items-center">
        <icon-button @click="refreshDomainStatus">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </icon-button>
        <p
          class="text-xs p-1"
          :class="{
            'text-green-500': status.is_resolving,
            'text-pink-500': !status.is_resolving,
          }"
        >
          {{ status.status_message }}
        </p>
      </div>

      <div
        v-if="!status.is_resolving || customDomain !== site.customDomain"
        class="text-sm p-1"
      >
        <p class="mt-3">
          To connect a custom domain to your blog, point an A record at
          <span class="bg-gray-600 px-2 rounded">{{ ipAddress }}</span> in your
          domain registrar's or DNS host's dashboard.
        </p>

        <p class="mt-3">Links to some guides on some domain providers.</p>

        <a
          href="https://www.godaddy.com/help/add-an-a-record-19238"
          class="text-indigo-400 hover:text-indigo-600 underline"
          target="_blank"
          >Go Daddy</a
        >
        <a
          href="https://www.namecheap.com/support/knowledgebase/article.aspx/434/2237/how-do-i-set-up-host-records-for-a-domain/"
          class="text-indigo-400 hover:text-indigo-600 underline inline ml-3"
          target="_blank"
          >Namecheap</a
        >
        <a
          href="https://support.google.com/domains/answer/3290350#zippy=%2Chost-name"
          class="text-indigo-400 hover:text-indigo-600 underline inline ml-3"
          target="_blank"
          >Google</a
        >
      </div>
    </div>

    <label for="navbar-builder" class="block mt-6 px-2">Navigation Menu</label>
    <div id="navbar-builder" class="flex flex-col space-y-3">
      <div v-for="(navItem, i) in navbar" :key="i" class="mt-3">
        <nav-item-builder
          v-bind="navItem"
          @delete="() => navbar.splice(i, 1)"
          @save="(val) => saveNavItem(val, i)"
        ></nav-item-builder>
      </div>
      <button
        class="
          px-3
          py-1
          bg-indigo-600
          hover:bg-indigo-700
          text-indigo-100
          font-medium
          rounded
        "
        @click="addNavItem"
      >
        Add a link
      </button>
    </div>
    <save-cancel
      class="my-3"
      :is-loading="isLoading"
      :errors="errors"
      @save="save"
      @cancel="cancel"
    />
  </card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    site: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: this.site && this.site.title ? this.site.title : '',
      description:
        this.site && this.site.description ? this.site.description : '',
      customDomain:
        this.site && this.site.customDomain ? this.site.customDomain : '',
      navbar:
        this.site && this.site.navbar
          ? this.site.navbar
          : [
              {
                label: 'Home',
                external: false,
                url: '/',
              },
              {
                label: 'About',
                external: false,
                url: '/about',
              },
            ],
      status: {},
      isLoading: false,
      errors: [],
    }
  },
  computed: {
    ...mapState(['token']),
    ...mapGetters(['isPaidAccount']),
    localSite() {
      return {
        title: this.title,
        description: this.description,
        navbar: this.navbar,
      }
    },
    ipAddress() {
      return process.env.NUXT_ENV_PROXY_CLUSTER_IP
    },
  },
  mounted() {
    this.refreshDomainStatus()
  },
  methods: {
    async save() {
      try {
        this.isLoading = true
        if (
          this.customDomain !== this.site.customDomain &&
          this.isPaidAccount
        ) {
          this.addCustomDomain()
        }
        await this.$sitesCollection.doc(this.site.id).update({
          site: this.localSite,
        })
        this.cancel()
      } catch (error) {
        this.errors.push(error.message)
      } finally {
        this.isLoading = false
      }
    },
    cancel() {
      this.$emit('cancel')
    },
    clearErrors() {
      this.erros = []
    },
    addNavItem() {
      this.navbar.push({
        label: 'Home',
        external: false,
        url: '/',
      })
    },
    saveNavItem(val, index) {
      this.navbar[index] = val
      this.clearErrors()
    },
    async refreshDomainStatus() {
      try {
        const res = await this.$getCustomDomainStatus(
          this.customDomain,
          this.token
        )
        this.status = res.data
      } catch (error) {
        this.status = {
          status_message: error.message,
        }
      }
    },
    async addCustomDomain() {
      await this.$addCustomDomain(
        this.customDomain,
        this.site.customDomain,
        this.token
      )
      this.refreshDomainStatus()
    },
    async deleteDomain() {
      await this.$addCustomDomain('', this.token)
    },
  },
}
</script>

<style>
</style>