import './styles/index.scss'
import 'element-ui/packages/theme-chalk/lib/index.css'
import 'src/styles/index.css'
import Element from 'element-ui'
import App from './App.vue'
import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import router from './router'
import Code from './components/e-code.vue'
import Demo from './components/e-demo.vue'
import CustomInput from './components/custom-input.vue'
import ElementPart from 'src/index'

Vue.use(PiniaVuePlugin)
Vue.use(ElementPart)
Vue.use(Element)

Vue.component('e-code', Code)
Vue.component('e-demo', Demo)
Vue.component(CustomInput.name, CustomInput)

new Vue({
  pinia: createPinia(),
  render: h => h(App),
  router,
}).$mount('#app')

