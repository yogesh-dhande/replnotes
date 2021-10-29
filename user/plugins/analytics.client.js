import splitbee from '@splitbee/web'

export default ({ store }, inject) => {
  if (store.getters.isCustomDomain) {
    splitbee.init()
  } else {
    splitbee.init({
      // Only add replnotes.com token for subdomains
      token: '39GRO023ROKV',
    })
  }

  inject('splitbee', splitbee)
}
