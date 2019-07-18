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
    if (response.data.meta.status === 200) {
      // 数据获取成功提示
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

// 用户数据列表
export const users = ({ query = "", pagenum = 1, pagesize = 10 }) => {
  return http.get("users", {
    params: { query, pagenum, pagesize }
  });
};

// 添加用户
export const addUsers = ({ username, password, email, mobile }) => {
  return http.post("users", { username, password, email, mobile });
};

// 修改用户状态
export const userState = ({ uId, type }) => {
  return http.put(`users/${uId}/state/${type}`);
};

// 删除用户
export const deleteUser = ({ id }) => {
  return http.delete(`users/${id}`);
};

// 根据id查询用户
export const getByIdUser = ({ id }) => {
  return http.get(`users/${id}`);
};

// 修改用户信息
export const updateUserMsg = ({ id, email, mobile }) => {
  return http.put(`users/${id}`, {
    id,
    email,
    mobile
  });
};

// 所有权限列表
export const rights = ({ type }) => {
  return http.get(`rights/${type}`);
};

// 获取角色列表
export const roles = () => {
  return http.get("roles");
};

// 分配角色修改
export const role = ({ id, rid }) => {
  return http.put(`users/${id}/role`, { rid });
};

// 删除角色
export const deleteRole = ({ id }) => {
  return http.delete(`roles/${id}`);
};

// 添加角色
export const addRole = ({ roleName, roleDesc }) => {
  return http.post("roles", { roleName, roleDesc });
};

// 根据id查找角色
export const getByIdRole = ({ id }) => {
  return http.get(`roles/${id}`);
};

// 编辑提交角色
export const updateRole = ({ id, roleName, roleDesc }) => {
  return http.put(`roles/${id}`, {
    roleName,
    roleDesc
  });
};

// 商品列表数据
export const goods = ({ query, pagenum = 1, pagesize = 10 }) => {
  return http.get("goods", {
    params: { query, pagenum, pagesize }
  });
};

// 删除商品
export const deleteGood = ({ id }) => {
  return http.delete(`goods/${id}`);
};
