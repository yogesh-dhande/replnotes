export function isSubdomain(domain) {
  if (!domain) {
    return false
  }
  return domain.split('.')[1] === 'replnotes'
}

export function getSubdomain(domain) {
  return domain.split('.')[0]
}

async function getSiteFromSubdomain(context, domain) {
  let site = {}
  const snap = await context.$sitesCollection
    .where('domain', '==', domain)
    .get()

  if (snap.size > 0) {
    site = snap.docs[0].data() || {}
  }
  return site
}

async function getSiteFromCustomDomain(context, domain) {
  let site = {}
  const snap = await context.$sitesCollection
    .where('customDomain', '==', domain)
    .get()
  if (snap.size > 0) {
    site = snap.docs[0].data() || {}
  }
  return site
}

export async function getSiteFromRequest(context) {
  let incoming
  if (context.isStatic) {
    incoming = process.env.DOMAIN
  } else if (context.req && context.req.headers) {
    incoming = context.req.headers['apx-incoming-host']
  }
  if (!incoming) {
    incoming = 'yogesh.replnotes.com'
  }
  context.store.commit('SET_DOMAIN', incoming)
  if (isSubdomain(incoming)) {
    return await getSiteFromSubdomain(context, incoming)
  } else {
    return await getSiteFromCustomDomain(context, incoming)
  }
}
