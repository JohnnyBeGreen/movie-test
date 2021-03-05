const state = {
    //Отображает/неотображает модальное окно    
    MODAL_OPEN: false,
    /** 
     * Компонент с данными, передаваемый в модальное окно 
     * для отображения (может содержать объект данных, включая компонент и т.д.) 
    */
    MODAL_COMPONENT: null
};

const getters = {
    MODAL_OPEN: state => {
      return state.MODAL_OPEN
    },
    MODAL_COMPONENT: state => {
      return state.MODAL_COMPONENT
    }
};

const mutations = {
    MODAL_COMPONENT: (state, payload) => {
        return state.MODAL_COMPONENT = payload
    },
    MODAL_OPEN: state => {
      return state.MODAL_OPEN = true
    },
    MODAL_CLOSE: state => {
      return state.MODAL_OPEN = false
    }
};

const actions = {
  MODAL_OPEN({commit}, data) {
    commit('MODAL_OPEN')
    commit('MODAL_COMPONENT', data)
  },
  MODAL_CLOSE({commit}) {
    commit('MODAL_CLOSE')
    commit('MODAL_COMPONENT', null)
  }
};

export default {
    state,
    getters,
    mutations,
    actions
}