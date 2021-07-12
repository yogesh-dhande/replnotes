import { getUserFromRequest } from '~/services/domains'

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
  async nuxtServerInit({ commit }, context) {
    const siteOwner = await getUserFromRequest(context)
    if (!siteOwner.name) {
      context.error({ statusCode: 404 })
    }
    commit('SET_USER', siteOwner)

    const posts = []
    const postsSnap = await this.$postsCollection
      .where('user.name', '==', siteOwner.name)
      .get()

    if (postsSnap.size > 0) {
      postsSnap.forEach((doc) => {
        posts.push(doc.data())
      })
    }
    commit('SET_POSTS', posts)
  },
}

export const mutations = {
  SET_USER(state, val) {
    state.siteOwner = val
  },
  SET_POSTS(state, posts) {
    state.posts = posts
  },
}
