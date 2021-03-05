import axios from '@/axios'

const state = {
    TMDB_MOVIES: [],
    TMDB_MOVIE: null,
    TMDB_MOVIE_CREDITS: null,
    TMDB_MOVIE_IMAGES: null,
    TMDB_MOVIES_GENRES: null
};

const getters = {
    TMDB_MOVIES: state => {
        return state.TMDB_MOVIES
    },
    TMDB_MOVIE: state => {
        return state.TMDB_MOVIE
    },
    TMDB_MOVIE_CREDITS: state => {
        return state.TMDB_MOVIE_CREDITS
    },
    TMDB_MOVIE_IMAGES: state => {
        return state.TMDB_MOVIE_IMAGES
    },
    TMDB_MOVIES_GENRES: state => {
        return state.TMDB_MOVIES_GENRES
    }
};

const mutations = {
    TMDB_MOVIES: (state, configuration) => {
        return state.TMDB_MOVIES = configuration
    },
    TMDB_MOVIE: (state, configuration) => {
        return state.TMDB_MOVIE = configuration
    },
    TMDB_MOVIE_CREDITS: (state, configuration) => {
        return state.TMDB_MOVIE_CREDITS = configuration
    },
    TMDB_MOVIE_IMAGES: (state, configuration) => {
        return state.TMDB_MOVIE_IMAGES = configuration
    },
    TMDB_MOVIES_GENRES: (state, configuration) => {
        return state.TMDB_MOVIES_GENRES = configuration
    }
};

const actions = {
    TMDB_MOVIES({commit}, data) {
        return axios({
            method: 'GET',
            url: `/discover/${data.type}`,
            params: {
                sort_by: data.sort ? data.sort : null,
                primary_release_year: data.year ? data.year : null
            }
        })
        .then(({data}) => {

            commit('TMDB_MOVIES', [...data.results])
        })
    },
    TMDB_MOVIE({commit}, id) {
        return axios({
            method: 'GET',
            url: `/movie/${id}`
        })
        .then(({data}) => {

            commit('TMDB_MOVIE', data)
        })
    },
    TMDB_MOVIE_CREDITS({commit}, id) {
        return axios({
            method: 'GET',
            url: `/movie/${id}/credits`
        })
        .then(({data}) => {
            commit('TMDB_MOVIE_CREDITS', data)
        })
    },
    TMDB_MOVIE_IMAGES({commit}, id) {
        return axios({
            method: 'GET',
            url: `/movie/${id}/images`
        })
        .then(({data}) => {

            commit('TMDB_MOVIE_IMAGES', data)
        })
    },
    TMDB_MOVIES_GENRES({commit}) {     
        return axios({
            method: 'GET',
            url: '/genre/movie/list',
            params: {
                api_key: process.env.VUE_APP_TMDB_KEY
            }
        })
        .then(({data}) => {

            commit('TMDB_MOVIES_GENRES', data)
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