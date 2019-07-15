import Vue from "vue";
import App from "./App.vue";

// 导入路由模块
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入饿了么模块
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 配置axios
import axios from "axios";
// 配置基地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
Vue.prototype.$axios = axios;

// 登陆组件
import login from "./views/login/login.vue";
// 主页内容模块
import mainContent from "./views/mainContent/mainContent.vue";
const routes = [
  {
    path: "/",
    // 重定向
    redirect: "/login"
  },
  {
    // 登陆页面
    path: "/login",
    component: login
  },
  {
    // 主页
    path: "/index",
    component: mainContent
  }
];

const router = new VueRouter({
  routes
});

Vue.config.productionTip = false;

// 全局样式
import "./assets/css/reset.css";

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
