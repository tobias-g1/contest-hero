import Vue from 'vue'
import Router from 'vue-router'
import feed from './pages/feed/feed.vue'
import createcontest from './pages/create-contest/create-contest.vue'
import entercontest from './pages/enter-contest/enter-contest.vue'
import contest from './pages/view-contest/view-contest.vue'
import auth from './pages/auth/auth.vue'
import notfound from './pages/404/404.vue'
import viewentry from './pages/view-entry/view-entry.vue'
import editcontest from './pages/edit-contest/edit-contest.vue'
import selectwinner from './pages/select-winner/select-winner.vue'
import help from './pages/help/help.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: '/contests' },
    {
      path: '/contests',
      name: 'home',
      component: feed
    },
    {
      path: '/create-contest',
      name: 'create-contest',
      component: createcontest
    },
    {
      path: '/auth',
      name: 'auth',
      component: auth
    },
    {
      path: '/view-contest/:author/:permlink',
      name: 'contest',
      component: contest
    },
    {
      path: '/enter-contest/:contestId/:author/:permlink/',
      name: 'enter-contest',
      component: entercontest
    },
    {
      path: '/view-entry/:author/:permlink',
      name: 'view-entry',
      component: viewentry
    },
    {
      path: '/edit-contest/:author/:permlink',
      name: 'edit-contest',
      component: editcontest
    },
    {
      path: '/select-winner/:contestId/:author/:permlink',
      name: 'select-winner',
      component: selectwinner
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '*',
      name: 'not-found',
      component: notfound
    }
  ]
})
