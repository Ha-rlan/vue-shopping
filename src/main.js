import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from "axios";
import qs from "qs";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$qs = qs;
Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://localhost:8080/"//部署到服务器上的时候记得修改
axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
