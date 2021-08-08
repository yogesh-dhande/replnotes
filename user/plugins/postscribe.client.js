import postscribe from 'postscribe'

export default (_, inject) => {
  inject('postscribe', (elementId, scriptCode) => {
    postscribe(elementId, scriptCode)
  })
}
