import Vue from 'vue'
import App from './App'
import store from './store'
import Message from './components/main'
require('./libs/loading')

Vue.config.productionTip = false

Vue.prototype.$message = Message
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
