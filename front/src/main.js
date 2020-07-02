import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.$http = axios

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
