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
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>导航一
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>导航二
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>导航三
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
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
      loadingText: ""
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
          }, 2000);
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
    // 左侧菜单全选
    menus()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style scoped lang="less">
.my-header {
  min-width: 380px;
  .title {
    float: left;
    font-size: 24px;
    font-weight: 600;
    margin-left: 50px;
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
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.main {
  height: 100%;
}
</style>
