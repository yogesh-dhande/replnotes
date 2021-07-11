export const state = () => ({
  siteOwner: {},
  currentUser: {},
})

export const getters = {
  userPostUrls(state) {
    if (!state.siteOwner.posts) {
      return []
    }
    return Object.values(state.siteOwner.posts).map((post) => {
      return post.url
    })
  },
  userTags(state) {
    if (!state.siteOwner.posts) {
      return []
    }
    const tagList = Object.values(state.siteOwner.posts).map((post) => {
      return post.tags
    })

    return [...new Set([].concat.apply([], tagList))]
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    // TODO: set siteOwner and siteOwner.posts if custom domain
    console.log(req.headers)
    const snap = await this.$usersCollection.where('name', '==', 'blog').get()

    if (snap.size > 0) {
      const siteOwner = snap.docs[0].data() || {}
      siteOwner.posts = []

      const postsSnap = await this.$postsCollection
        .where('user.name', '==', siteOwner.name)
        .get()

      if (postsSnap.size > 0) {
        postsSnap.forEach((doc) => {
          siteOwner.posts.push(doc.data())
        })
      }
      commit('SET_USER', siteOwner)
    }
  },
}

export const mutations = {
  SET_USER(state, val) {
    state.siteOwner = val
  },
}
