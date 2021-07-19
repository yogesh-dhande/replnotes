<template>
  <div
    class="px-2 lg:px-12 py-2 lg:py-12 text-indigo-100 bg-gray-800 min-h-screen"
  >
    <div class="max-w-3xl mx-auto">
      <dl class="mx-12 mt-5 grid grid-cols-1 gap-5 lg:grid-cols-1">
        <div
          v-if="!isPaidAccount"
          class="
            text-center text-indigo-300
            px-4
            py-5
            bg-gray-900 bg-opacity-50
            shadow
            rounded-lg
            overflow-hidden
            sm:p-6
          "
        >
          <dt class="text-md font-medium truncate text-indigo-300">Storage</dt>
          <dd class="mt-1 text-3xl text-indigo-300">
            <span class="font-base">{{ storageUsed.size }} </span
            ><span class="text-2xl">{{ storageUsed.units }}</span>
            /
            <span class="font-bold text-indigo-500">100 </span>
            <span class="text-2xl font-bold text-indigo-500">MB</span>
          </dd>
        </div>
        <div
          class="
            flex flex-row
            w-full
            px-12
            py-6
            justify-between
            items-center
            text-indigo-300
            font-bold
            text-lg
            bg-gray-900 bg-opacity-50
            rounded-lg
            hover:bg-opacity-100
            hover:
            cursor-pointer
            mouse
            shadow
            transition
            ease-in
            duration-200
            focus:outline-none
          "
          @click="$router.push('/profile')"
        >
          <div>Profile</div>
          <icon-button @click="$router.push('/profile')">
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
        </div>
        <div
          class="
            w-full
            px-12
            py-6
            justify-center
            items-center
            text-indigo-300
            font-bold
            text-lg
            bg-gray-900 bg-opacity-50
            rounded-lg
            hover:bg-opacity-100
            mouse
            shadow
            transition
            ease-in
            duration-200
            focus:outline-none
          "
        >
          <div class="flex flex-row justify-between">
            <div class="flex space-x-2">
              <div>Blog Settings</div>
            </div>
            <div>
              <icon-button @click="$router.push('/site')">
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
            </div>
          </div>
          <a
            :href="siteLink"
            target="_blank"
            class="
              text-pink-500
              rounded
              shadow
              bg-opacity-100
              hover:underline
              cursor-pointer
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline ml-1 mb-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            {{ siteLink }}
          </a>
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
        </div>

        <div
          class="
            bg-gray-900
            py-6
            bg-opacity-50
            shadow
            rounded-lg
            overflow-hidden
          "
        >
          <div class="flex flex-row justify-between items-center px-12">
            <div
              class="text-center text-2xl font-medium text-indigo-300 truncate"
            >
              <h2>
                {{ this.posts.length }}
                <span v-if="this.posts.length === 1">Post</span
                ><span v-else>Posts</span>
              </h2>
            </div>

            <button
              class="
                flex flex-row
                py-2
                px-3
                justify-center
                items-center
                text-indigo-100
                font-bold
                bg-indigo-600
                hover:bg-indigo-700
                rounded-lg
                hover:bg-opacity-100
                mouse
                shadow
                transition
                ease-in
                duration-200
                focus:outline-none
              "
              @click="$router.push('/posts')"
            >
              New Post
            </button>
          </div>

          <div
            class="flex px-12 py-8 rounded justify-between"
            :post="post"
            v-for="post in orderedPosts"
            :key="post.id"
          >
            <div>
              <h2>{{ post.title }}</h2>
              <h3
                class="
                  text-sm text-indigo-300
                  hover:text-indigo-400
                  hover:underline
                  cursor-pointer
                "
              >
                {{ `${siteLink}/posts/${post.url}` }}
              </h3>
            </div>
            <div>
              <icon-button @click="$router.push(`/posts/${post.url}`)">
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
              <confirmed-delete
                :errors="errors"
                @click="() => deletePost(post.id)"
                @clear="clearErrors"
              >
                <template #message>
                  <div class="mx-4">
                    <p class="text-sm text-gray-600">
                      Are you sure you want to delete this post? This action
                      cannot be be undone.
                    </p>
                  </div>
                </template>
              </confirmed-delete>
            </div>
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import CreatePost from "@/components/CreatePost";
import Profile from "@/components/Profile";
import { mapState, mapGetters } from "vuex";
import SiteSettings from "@/components/SiteSettings.vue";

export default {
  name: "dashboard",
  components: {
    "create-post": CreatePost,
    Profile,
    SiteSettings,
  },
  middleware: ["auth"],
  head() {
    return this.$createSEOMeta({
      title: "Dashboard. REPL Notes",
      noIndex: true,
    });
  },
  data() {
    return {
      listeners: [],
      editPosts: false,
      errors: [],
    };
  },
  computed: {
    ...mapState(["currentUser", "readonly", "posts"]),
    ...mapGetters(["siteDomain", "customDomain", "isPaidAccount"]),
    orderedPosts() {
      // most recent first
      return this.posts
        .filter((post) => post.created)
        .slice()
        .sort((a, b) => b.created.seconds - a.created.seconds);
    },
    storageUsed() {
      if (this.readonly) {
        return this.formatBytes(this.readonly.totalStorageUsed, 1);
      }
      return this.formatBytes(0, 1);
    },
    siteLink() {
      return this.customDomain ? this.customDomain : this.siteDomain;
    },
  },
  methods: {
    formatBytes(bytes, decimals = 2) {
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      if (bytes === 0)
        return {
          size: 0,
          units: sizes[0],
        };

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return {
        size: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
        units: sizes[i],
      };
    },
    async deletePost(postId) {
      try {
        await this.$postsCollection.doc(postId).delete();
        this.$router.go(); // Refresh the page
      } catch (error) {
        console.log(error);
        this.errors.push(error.message);
      }
    },
    clearErrors() {
      this.errors = [];
    },
    edit() {
      this.editMode = true;
    },
    cancelEdit() {
      this.editMode = false;
    },
  },
};
</script>

<style>
</style>