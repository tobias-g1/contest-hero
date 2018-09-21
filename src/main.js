import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VueSimpleMarkdown from 'vue-simple-markdown'

import 'element-ui/lib/theme-chalk/index.css'
import 'vue-simple-markdown/dist/vue-simple-markdown.css'

Vue.use(ElementUI)
Vue.use(VueSimpleMarkdown)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
