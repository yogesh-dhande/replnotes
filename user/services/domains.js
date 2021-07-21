export function isSubdomain(domain) {
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
  const incoming =
    context.req.headers['Apx-Incoming-Address'] || 'blog.replnotes.com'
  if (isSubdomain(incoming)) {
    return await getSiteFromSubdomain(context, incoming)
  } else {
    return await getSiteFromCustomDomain(context, incoming)
  }
}
