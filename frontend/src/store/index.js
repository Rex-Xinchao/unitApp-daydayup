import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    SET_USER: (state, data) => {
      state.user = data
    }
  },
  getters: {
    user: (state) => {
      return state.user
    }
  },
  actions: {
    setUser({ commit }, data) {
      commit('SET_USER', data)
    }
  }
})

export default store
