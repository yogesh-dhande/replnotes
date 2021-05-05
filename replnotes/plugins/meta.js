export default async ({ route }, inject) => {
    function createSEOMeta(data) {
        let meta = {
            title: data.title,
            meta: [
                { hid: "og:title", property: "og:title", content: data.title },
                {
                    hid: "og:url",
                    property: "og:url",
                    content: process.env.NUXT_ENV_BASE_URL + route.fullPath,
                    }
            ],
        }

        if (data.description) {
            meta.meta.push(
                { hid: "description", name: "description", content: data.description },
            )

            meta.meta.push({
                hid: "og:description",
                property: "og:description",
                content: data.description,
                }
            )
        }

        if (data.image) {
            meta.meta.push(
                { hid: "og:image", property: "og:image", content: data.image },
            )
        }
        return meta
    }

    inject('createSEOMeta', createSEOMeta)
  }