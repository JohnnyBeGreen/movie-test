import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import tmdb_configuration from './modules/configuration/tmdb-configuration'
import tmdb_movies from './modules/movies/tmdb-movies'
import settings from './modules/settings/settings'

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    tmdb_configuration,
    tmdb_movies,
    settings
  }
})
