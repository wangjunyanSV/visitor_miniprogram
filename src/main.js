import Vue from 'vue'
import App from './App'

import newRequest from './common/newRequest.js'
Vue.prototype.$newRequest = newRequest

import projectConfig from './common/Config.js'
Vue.prototype.$config = projectConfig

import apis from './common/API.js'
Vue.prototype.$apis = apis


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
