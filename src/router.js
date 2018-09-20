import Vue from 'vue'
import Router from 'vue-router'
import feed from './pages/feed/feed.vue'
import createcontest from './pages/create-contest/create-contest.vue'
import notfound from './pages/404/404.vue'

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
    },
    {
      path: '*',
      name: 'not-found',
      component: notfound
    }
  ]
})
