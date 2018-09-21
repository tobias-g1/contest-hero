import Vue from 'vue'
import Router from 'vue-router'
import feed from './pages/feed/feed.vue'
import createcontest from './pages/create-contest/create-contest.vue'
import entercontest from './pages/enter-contest/enter-contest.vue'
import contest from './pages/contest/contest.vue'
import notfound from './pages/404/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/feed' },
    {
      path: '/feed',
      name: 'home',
      component: feed
    },
    {
      path: '/create-contest',
      name: 'create-contest',
      component: createcontest
    },
    {
      path: '/contest/:author/:permlink',
      name: 'contest',
      component: contest
    },
    {
      path: '/enter-contest/:author/:permlink',
      name: 'enter-contest',
      component: entercontest
    },
    {
      path: '*',
      name: 'not-found',
      component: notfound
    }
  ]
})
