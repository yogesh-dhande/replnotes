const axios = require('axios')

module.exports = async function getAppRoutes() {
    console.log(process.env.NUXT_ENV_FIREBASE_FUNCTIONS_URL)
    let res = await axios.get(
        `${process.env.NUXT_ENV_FIREBASE_FUNCTIONS_URL}/getRoutes`
    )
    return res.data
};