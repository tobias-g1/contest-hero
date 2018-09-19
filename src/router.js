import Vue from 'vue'
import Router from 'vue-router'
import feed from './pages/feed/feed.vue'
import createcontest from './pages/create-contest.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: feed
    },
    {
      path: '/create-contest',
      name: 'create-contest',
      component: createcontest
    }
  ]
})
