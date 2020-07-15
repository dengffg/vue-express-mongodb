import Vue from 'vue'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import App from './App.vue'
import router from './router'
import http from './http'

Vue.use(VueRouter)

Vue.use(ElementUI)
Vue.prototype.$http = http


Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadUrl: () => Vue.prototype.$http.defaults.baseURL+'/upload'
  },
  methods: {
    getAuthorization() {
      return {
        Authorization: `Bearer ${localStorage.token}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
