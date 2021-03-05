import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
})

instance.defaults.headers.common['Content-Type'] = 'application/json'
instance.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.VUE_APP_TMDB_TOKEN

export default instance
