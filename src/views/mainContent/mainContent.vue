<template>
  <el-container
    class="main"
    v-loading="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-header class="my-header">
      <el-row>
        <el-col :span="12">
          <h1 class="title">电商后台管理系统</h1>
        </el-col>
        <el-col :span="12">
          <i
            class="el-icon-circle-close icon-close"
            :class="{'el-icon-error':isColse}"
            @mouseenter="isColse=true"
            @mouseleave="isColse=false"
            @click="logout"
          ></i>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-main">
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo my-menu"
          background-color="#364351"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu
            class="my-menu-li"
            v-for="(oneMenu, index) in menuList"
            :key="index"
            :index="''+index"
          >
            <template slot="title">
              <div class="my_title_ul">
                <span v-if="oneMenu.id === 125">
                  <i class="el-icon-user"></i>
                </span>
                <span v-else-if="oneMenu.id === 103">
                  <i class="el-icon-lock"></i>
                </span>
                <span v-else-if="oneMenu.id === 101">
                  <i class="el-icon-goods"></i>
                </span>
                <span v-else-if="oneMenu.id === 102">
                  <i class="el-icon-shopping-bag-1"></i>
                </span>
                <span v-else-if="oneMenu.id === 145">
                  <i class="el-icon-pie-chart"></i>
                </span>
                {{oneMenu.authName}}
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(towMenu, index) in oneMenu.children"
                :key="index"
                :index="'/index/'+towMenu.path"
                class="my_menu-item"
              >
                <i class="el-icon-copy-document"></i>
                {{towMenu.authName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 菜单权限结构
import { menus } from "../../api/http";
export default {
  name: "mainContent",
  data() {
    return {
      // 退出鼠标移入样式
      isColse: false,
      // 加载
      loading: false,
      // 加载文字
      loadingText: "",
      // 左边导航列表
      menuList: []
    };
  },
  methods: {
    // 退出
    logout() {
      this.$confirm("此操作将退出登陆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 清除token
          window.localStorage.removeItem("token");
          // 退出延迟
          this.loading = true;
          this.loadingText = "正在退出";
          window.setTimeout(() => {
            this.$message({
              type: "success",
              message: "退出成功",
              duration: 2000
            });
            // 跳转回登陆页面
            this.$router.push("/login");
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
            duration: 1000
          });
        });
    }
  },
  created() {
    // 左侧菜单
    menus()
      .then(res => {
        this.menuList = res.data.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style scoped lang="less">
.my-header {
  min-width: 480px;
  .title {
    float: left;
    font-size: 24px;
    font-weight: 600;
    margin-left: 50px;
    color: #fff;
  }
  .icon-close {
    float: right;
    font-size: 24px;
    line-height: 60px;
    margin-right: 50px;
    cursor: pointer;
  }
}
.el-header,
.el-footer {
  background-color: #668c8c;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #6a7b8c;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #75a98f;
  color: #333;
  text-align: center;
}

.main {
  height: 100%;
}

.my-menu {
  overflow: hidden;
}

.el-menu {
  border-right: 0;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
}
.my_title_ul {
  font-size: 14px;
  margin-left: -70px;
}
.my-main {
  min-width: 480px;
}
</style>
