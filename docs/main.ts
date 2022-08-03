import './styles/index.scss'
import 'element-ui/packages/theme-chalk/lib/base.css'
import App from './App.vue'
import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import router from './router'
import Code from './components/s-code.vue'
import Demo from './components/s-demo.vue'
import Block from './components/s-block.vue'

Vue.use(PiniaVuePlugin)

Vue.component('s-demo', Demo)
Vue.component('s-code', Code)
Vue.component('s-block', Block)

new Vue({
  pinia: createPinia(),
  render: h => h(App),
  router,
}).$mount('#app')

