import './styles/index.scss'
import 'element-ui/packages/theme-chalk/lib/index.css'
import App from './App.vue'
import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import router from './router'
import Code from './components/e-code.vue'
import Demo from './components/e-demo.vue'
import Block from './components/e-block.vue'
import ElementExtension from 'src/index'

Vue.use(PiniaVuePlugin)
Vue.use(ElementExtension)

Vue.component('e-demo', Demo)
Vue.component('e-code', Code)
Vue.component('e-block', Block)

new Vue({
  pinia: createPinia(),
  render: h => h(App),
  router,
}).$mount('#app')

