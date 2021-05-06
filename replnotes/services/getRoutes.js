const axios = require('axios')

module.exports = async function getAppRoutes() {
    let res = await axios.get(
        `${process.env.NUXT_ENV_FIREBASE_FUNCTIONS_URL}/getRoutes`
    )
    return res.data
};