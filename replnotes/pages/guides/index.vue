<template>
  <div>
    <div class="max-w-2xl lg:max-w-5xl px-8 md:px-12 lg:px-24 mx-auto">
      <h1
        class="
          text-center text-5xl
          sm:text-7xl
          tracking-tight
          font-extrabold
          text-indigo-400
          my-6
        "
      >
        Guides
      </h1>
      <h2
        class="
          sm:text-center
          text-xl
          md:text-2xl
          sm:text-3xl
          font-normal
          text-indigo-200
          my-6
        "
      >
        <p>
          Learn how to effectively use the REPL Notes platform to create a blog
          or a portfolio website using Jupyter notebooks.
        </p>
      </h2>
    </div>

    <div class="my-3 max-w-lg mx-auto grid gap-0 xl:grid-cols-3 xl:max-w-none">
      <card
        v-for="post in orderedPosts"
        :key="post.id"
        class="shadow-lg bg-gray-900 bg-opacity-25 hover:bg-opacity-50"
      >
        <nuxt-link
          v-if="post"
          v-slot="{ navigate }"
          :to="`guides/${post.url}`"
          alt="Post Link"
          custom
        >
          <div
            class="sm:px-0 flex flex-col cursor-pointer"
            role="link"
            @click="navigate"
            @keypress.enter="navigate"
          >
            <div class="flex-1 p-4 flex flex-col justify-between">
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
                v-if="post.thumbnail"
                class="my-2 mx-auto max-w-3/4 bg-white opacity-80 rounded-md"
                :src="post.thumbnail"
                alt="Thumbnail"
              />
            </div>
          </div>
        </nuxt-link>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const returnData = {
      postUrl: context.params.postUrl,
      posts: [],
    };

    const snap = await context.app.$postsCollection
      .where("user.name", "==", "blog")
      .get();

    if (!snap.empty) {
      returnData.posts = snap.docs.map((doc) => doc.data());
      returnData.user = returnData.posts[0].user;
    } else {
      context.error({ statusCode: 404 });
    }
    return returnData;
  },
  computed: {
    orderedPosts() {
      // most recent first
      return this.posts
        .filter((post) => post.created)
        .slice()
        .sort((a, b) => b.created.seconds - a.created.seconds);
    },
  },
};
</script>

<style>
</style>