import axios from '@/axios'

const state = {
    TMDB_CONFIGURATION: null
};

const getters = {
    TMDB_CONFIGURATION: state => {
        return state.TMDB_CONFIGURATION
    }
};

const mutations = {
    TMDB_CONFIGURATION: (state, configuration) => {
        return state.TMDB_CONFIGURATION = configuration
    }
};

const actions = {
    TMDB_CONFIGURATION({commit}) {     
        //themoviedb.org configuration data (images and files path e.t.c)
        return axios({
            method: 'GET',
            url: '/configuration',
            params: {
                api_key: process.env.VUE_APP_TMDB_KEY
            }
        })
        .then(({data}) => {

            commit('TMDB_CONFIGURATION', data)
        })
        .catch(e => {
            console.log(e)
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}