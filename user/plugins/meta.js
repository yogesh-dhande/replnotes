export default ({ route, store }, inject) => {
  function createSEOMeta(data) {
    const name = store.state.siteOwner.name
      ? store.state.siteOwner.displayName
      : store.state.siteOwner.name
    if (!data.title) {
      data.title =
        store.state.site && store.state.site.title
          ? store.state.site.title
          : name + "'s Posts"
    }

    if (!data.description) {
      data.description =
        store.state && store.state.description
          ? store.state.description
          : name + "'s Posts"
    }

    if (!data.image) {
      data.image = store.state.siteOwner.photoUrl
    }

    const pageUrl = process.env.NUXT_ENV_BASE_URL + route.fullPath

    const meta = {
      title: data.title,
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        { hid: 'og:title', property: 'og:title', content: data.title },
        {
          hid: 'og:url',
          property: 'og:url',
          content: pageUrl,
        },
      ],
    }

    if (data.canonical) {
      meta.link = [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: pageUrl,
        },
      ]
    }

    if (data.description) {
      meta.meta.push({
        hid: 'description',
        name: 'description',
        content: data.description,
      })

      meta.meta.push({
        hid: 'og:description',
        property: 'og:description',
        content: data.description,
      })
    }

    if (data.image) {
      meta.meta.push({
        hid: 'og:image',
        property: 'og:image',
        content: data.image,
      })
      meta.meta.push({
        hid: 'twitter:image',
        name: 'twitter:image',
        content: data.image,
      })
    }

    if (data.noIndex) {
      meta.meta.push({
        name: 'robots',
        content: 'noindex',
      })
    }

    return meta
  }

  inject('createSEOMeta', createSEOMeta)
}
