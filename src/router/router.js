// 路由模块
// 导入路由模块
import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

// 登陆组件
import login from "../views/login/login.vue";
// 主页内容模块
import mainContent from "../views/mainContent/mainContent.vue";
// 用户管理组件
import users from "../views/users/users.vue";
// 权限管理/角色列表组件
import roles from "../views/roles/roles.vue";
// 权限管理/权限列表组件
import rights from "../views/rights/rights.vue";
// 商品管理/商品列表组件
import goods from "../views/goods/goods.vue";
// 商品管理/商品分类组件
import categories from "../views/categories/categories.vue";
// 商品管理/分类参数组件
import params from "../views/params/params.vue";
// 订单管理组件
import orders from "../views/orders/orders.vue";
// 数据报表组件
import reports from "../views/reports/reports.vue";

// 添加商品子组件
import add from "../views/goods/add/add.vue";
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
    redirect: "/index/users",
    // 设置路由元信息
    meta: {
      isValidation: true
    },
    // 子路由
    children: [
      // 用户管理
      {
        path: "users",
        component: users
      },
      // 权限管理/角色列表组件
      {
        path: "roles",
        component: roles
      },
      // 权限管理/权限列表组件
      {
        path: "rights",
        component: rights
      },
      // 商品管理/商品列表
      {
        path: "goods",
        component: goods,
        children: [{ path: "add", component: add }]
      },
      // 商品管理/商品分类
      {
        path: "categories",
        component: categories
      },
      // 商品管理/分类参数
      {
        path: "params",
        component: params
      },
      // 订单管理
      {
        path: "orders",
        component: orders
      },
      // 数据报表
      {
        path: "reports",
        component: reports
      }
    ]
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
