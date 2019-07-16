import Vue from "vue";
// 配置axios
import axios from "axios";
// 配置基地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
Vue.prototype.$axios = axios;

// 导入router
import router from "../router/router";

// 克隆axios 基地址
const http = axios.create({
  baseURL: "http://localhost:8888/api/private/v1/"
  // 可以统一设置头 带token
  // headers: { "X-Custom-Header": "foobar" }
});

// axios 拦截器
// 请求拦截器
http.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // 所有请求 携带token
    config.headers.Authorization = window.localStorage.getItem("token");
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  function(response) {
    // Do something with response data
    // 处理假token
    if (
      response.data.meta.msg == "无效token" &&
      response.data.meta.status === 400
    ) {
      // 提示
      new Vue().$message({
        showClose: true,
        message: "请登陆",
        type: "warning"
      });
      // 清楚假token
      window.localStorage.clear();
      // 重定向回登陆
      router.push("/login");
    }
    // 数据获取成功提示
    if (response.data.meta.status === 200) {
      new Vue().$message({
        showClose: true,
        message: response.data.meta.msg,
        type: "success",
        duration: 1000
      });
    }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// 登陆
export const login = ({ username, password }) => {
  return http.post("login", {
    username,
    password
  });
};

// 菜单
export const menus = () => {
  return http.get("menus");
};
