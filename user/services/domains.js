export function isSubdomain(domain) {
  return true
}

export function getSubdomain(domain) {
  return domain.split('.')[0]
}

async function getUserFromSubdomain(context, domain) {
  let user = {}
  const snap = await context.$usersCollection
    .where('name', '==', getSubdomain(domain))
    .get()

  if (snap.size > 0) {
    user = snap.docs[0].data() || {}
  }
  return user
}

async function getUserFromCustomDomain(context, domain) {
  let user = {}
  const snap = await context.$usersCollection
    .where('customDomain', '==', getSubdomain(domain))
    .get()
  if (snap.size > 0) {
    user = snap.docs[0].data() || {}
  }
  return user
}

export async function getUserFromRequest(context) {
  let incoming = context.req.headers['Apx-Incoming-Address']
  if (process.env.NODE_ENV === 'development') {
    incoming = 'blog.replnotes.com'
  }
  if (!incoming) {
    return {}
  }
  if (isSubdomain(incoming)) {
    return await getUserFromSubdomain(context, incoming)
  } else {
    return await getUserFromCustomDomain(context, incoming)
  }
}
