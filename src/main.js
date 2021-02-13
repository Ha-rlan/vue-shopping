import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";
import VueResource from "vue-resource"

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.prototype.$http = axios;

//配置请求的根路径
axios.defaults.baseURL ="";

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
