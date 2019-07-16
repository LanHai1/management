import Vue from "vue";
// 配置axios
import axios from "axios";
// 配置基地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
Vue.prototype.$axios = axios;

// 克隆axios 基地址
const http = axios.create({
  baseURL: "http://localhost:8888/api/private/v1/"
  // 可以统一设置头 带token
  // headers: { "X-Custom-Header": "foobar" }
});

// 登陆
export const login = ({ username, password }) => {
  return http.post("login", {
    username,
    password
  });
};
