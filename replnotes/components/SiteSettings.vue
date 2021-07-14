<template>
  <card class="mx-auto shadow items-center bg-gray-900 text-indigo-200">
    <h2 class="mb-3 py-2 text-xl font-bold">Customize Your Website</h2>
    <text-input
      v-model="title"
      label="Home page heading"
      class="mt-3"
    ></text-input>
    <text-area-input
      v-model="description"
      label="Home page sub-heading"
      class="mt-3"
    ></text-area-input>
    <div class="mt-3">
      <label for="customDomain">Custom Domain</label>
      <div id="customDomain" class="flex items-center">
        <text-input
          v-model="customDomain"
          placeholder="mydomain.com"
          class="w-full"
        ></text-input>
        <icon-button @click="refreshDomainStatus">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
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
        <button
          v-if="customDomain !== site.customDomain"
          class="
            px-3
            py-1
            bg-indigo-600
            hover:bg-indigo-700
            text-indigo-100
            font-medium
            rounded
          "
          @click="addCustomDomain"
        >
          Save
        </button>
      </div>
      <p
        v-if="status"
        class="text-xs p-1"
        :class="{
          'text-green-500': status.is_resolving,
          'text-pink-500': !status.is_resolving,
        }"
      >
        {{ status.status_message }}
      </p>
      <div v-if="!status.is_resolving" class="text-sm p-1">
        <p class="mt-3">
          To connect a custom domain to your blog, point an A record at
          {{ ipAddress }} in your domain registrar's or DNS host's dashboard.
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
          @save="(val) => (navbar[i] = val)"
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
import { mapState } from 'vuex'
export default {
  props: {
    site: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: this.site ? this.site.title : '',
      description: this.site ? this.site.description : '',
      customDomain: this.site ? this.site.customDomain : '',
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
      status: '',
      isLoading: false,
      errors: [],
    }
  },
  computed: {
    ...mapState(['token']),
    localSite() {
      return {
        title: this.title,
        description: this.description,
        navbar: this.navbar,
        customDomain: this.customDomain,
      }
    },
    ipAddress() {
      return process.env.NUXT_ENV_PROXY_CLUSTER_IP
    },
  },
  methods: {
    async save() {
      try {
        this.isLoading = true
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
    refreshDomainStatus() {
      this.status = {
        dns_pointed_at: '165.227.25.132',
        has_ssl: true,
        id: 809,
        incoming_address: 's10.fileshare.page',
        is_resolving: false,
        ssl_active_from: '2021-03-16T22:13:02',
        ssl_active_until: '2021-06-14T22:13:02',
        status: 'ACTIVE_SSL',
        status_message: 'Active with SSL',
        target_address: 'filesharepage.vercel.app',
        target_ports: '443',
      }
    },
    async addCustomDomain() {
      await this.$addCustomDomain(this.customDomain, this.token)
      this.refreshDomainStatus()
    },
  },
}
</script>

<style>
</style>