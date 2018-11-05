import Vue from 'vue'
import App from './app/App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import store from './store'
import VueLodash from 'vue-lodash'
import VueAnalytics from 'vue-analytics'

Vue.use(ElementUI, { locale })
Vue.use(VueLodash)
Vue.use(require('vue-moment'))

Vue.use(VueAnalytics, {
  id: 'UA-127982839-1',
  checkDuplicatedScript: true,
  router
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
