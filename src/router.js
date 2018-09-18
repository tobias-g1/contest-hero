import Vue from 'vue'
import Router from 'vue-router'
import feed from './pages/feed/feed.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: feed
    }
  ]
})
