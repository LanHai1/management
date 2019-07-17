<template>
  <div>
    <bread oneTitle="权限管理" twoTitle="权限列表"></bread>
    <!-- table表格 -->
    <el-table :data="tableData" border style="width: 100%" class="my-table">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// 面包屑导航
import bread from "../../components/bread";
import {
  // 获取权限信息
  rights
} from "../../api/http";
export default {
  name: "rights",
  data() {
    return {
      // 表格信息
      tableData: []
    };
  },
  components: {
    bread
  },
  created() {
    rights({ type: "list" }).then(res => {
      // 处理数据
      res.data.data.map(val => {
        if (val.level == 0) {
          val.level = "一级";
        } else if (val.level == 1) {
          val.level = "二级";
        } else if (val.level == 2) {
          val.level = "三级";
        }
      });
      this.tableData = res.data.data;
    });
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
.my-table {
  margin: 20px 0;
  border-radius: 4px;
}
</style>
