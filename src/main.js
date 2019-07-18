import Vue from "vue";
import App from "./App.vue";

// 导入路由模块
import router from "./router/router";

// 导入饿了么模块
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 处理时间插件
import moment from "moment";
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

// 全局样式
import "./assets/css/reset.css";

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
