import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {},
  getters: {
    user: (state) => {
      return state.user
    }
  },
  actions: {}
})

export default store
