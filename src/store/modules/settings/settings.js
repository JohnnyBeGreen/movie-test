const state = {
    SETTINGS_IS_MOBILE: false
};

const getters = {
    SETTINGS_IS_MOBILE: state => {
      return state.SETTINGS_IS_MOBILE
    }
};

const mutations = {
    SETTINGS_IS_MOBILE: (state, payload) => {
      return state.SETTINGS_IS_MOBILE = payload
    }
};

const actions = {
  SETTINGS_IS_MOBILE({commit}, payload) {
    if (payload <= 480) {
      commit('SETTINGS_IS_MOBILE', true)
    } else {
      commit('SETTINGS_IS_MOBILE', false)
    }
  }
};

export default {
    state,
    getters,
    mutations,
    actions
}