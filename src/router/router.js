// 路由模块
// 导入路由模块
import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

// 登陆组件
import login from "../views/login/login.vue";
// 主页内容模块
import mainContent from "../views/mainContent/mainContent.vue";
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

export default router;
