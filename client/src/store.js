import Vue from 'vue'
import Vuex from 'vuex'
import VueSteemConnect from 'vue-steemconnect'

Vue.use(VueSteemConnect, {
  baseURL: 'https://steemconnect.com',
  app: 'contest-hero.app',
  callbackURL: 'https://www.contesthero.io/auth',
  scope: ['vote', 'comment', 'comment_options', 'custom_json']
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  modules: {
    steemconnect: Vue.SteemConnectStore
  },
  mutations: {
    setLoading: function (state, setting) {
      state.isLoading = setting
    }
  }
})
