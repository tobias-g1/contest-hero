import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  mutations: {
    setLoading: function (state, setting) {
      state.isLoading = setting
    },
    actions () {

    }
  }
})
