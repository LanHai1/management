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
    redirect: "/index"
  },
  {
    // 登陆页面
    path: "/login",
    component: login
  },
  {
    // 主页
    path: "/index",
    component: mainContent,
    // 设置路由元信息
    meta: {
      isValidation: true
    }
  }
];

const router = new VueRouter({
  routes
});

// 路由前置守卫
/**
 * to:
 * from:
 * next
 */

router.beforeEach((to, from, next) => {
  // 主页
  if (to.meta.isValidation) {
    // 判断本地是否存在token
    if (window.localStorage.getItem("token")) {
      next();
    } else {
      new Vue().$message({
        showClose: true,
        message: "请登陆",
        type: "warning"
      });
      router.push("/login");
    }
  } else {
    next();
  }
});

export default router;