<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item class="my-bread-title-color">{{oneTitle}}</el-breadcrumb-item>
    <el-breadcrumb-item class="my-bread-title-color">{{twoTitle}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "bread",
  props: {
    // 一级导航
    oneTitle: {
      type: String,
      required: true
    },
    // 二级导航
    twoTitle: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="less">
.my-bread {
  height: 45px;
  background-color: #9ddfbd;
  line-height: 45px;
  padding-left: 15px;
  border-radius: 4px;
  .el-breadcrumb__inner {
    color: #fff !important;
  }
}
</style>
