const axios = require('axios')

module.exports = async function getAppRoutes(userName) {
  const res = await axios.get(
    `${process.env.NUXT_ENV_FIREBASE_FUNCTIONS_URL}/getRoutes`,
    {
      params: {
        userName,
      },
    }
  )
  return res.data
}
