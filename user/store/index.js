import { getSiteFromRequest, isSubdomain } from '~/services/domains'

export const state = () => ({
  siteOwner: {},
  site: {},
  currentUser: {},
  readonly: {},
  domain: null,
})

export const getters = {
  post(state) {
    return (url) => {
      const posts = state.posts.filter((post) => post.url === url)
      return posts.length > 0 ? posts[0] : {}
    }
  },
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
  isPaidAccount(state) {
    return state.readonly.plan === 'paid'
  },
  isCustomDomain(state) {
    return !isSubdomain(state.domain)
  },
}

export const actions = {
  async nuxtServerInit({ commit }, context) {
    const site = await getSiteFromRequest(context)
    if (site.uid) {
      commit('SET_SITE', site)

      const posts = []

      const [postsSnap, readonlySnap, userSnap] = await Promise.all([
        this.$postsCollection.where('user.id', '==', site.uid).get(),
        this.$readonlyCollection.doc(site.uid).get(),
        this.$usersCollection.doc(site.uid).get(),
      ])

      if (postsSnap.size > 0) {
        postsSnap.forEach((doc) => {
          posts.push(doc.data())
        })
      }
      commit('SET_POSTS', posts)
      commit('SET_READONLY_DATA', readonlySnap.data())
      commit('SET_USER', userSnap.data())
    }
  },
}

export const mutations = {
  SET_USER(state, val) {
    state.siteOwner = val
  },
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  SET_SITE(state, site) {
    state.site = site
  },
  SET_READONLY_DATA(state, data) {
    state.readonly = data
  },
  SET_DOMAIN(state, domain) {
    state.domain = domain
  },
}
