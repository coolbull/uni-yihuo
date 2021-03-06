import Vue from 'vue'
import App from './App'
import api from './plugin/api'
import './plugin/apimodel'
import tabBar from './pages/comp/tabbar'

Vue.component('tab-bar', tabBar)

Vue.config.productionTip = false
Vue.use(api)
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
