import Vue from 'vue'
import App from './app/App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import store from './store'

Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
