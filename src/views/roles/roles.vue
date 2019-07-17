<template>
  <div>
    <bread oneTitle="权限管理" twoTitle="角色列表"></bread>
    <!-- 搜索 -->
    <el-row :gutter="0" type="flex" class="row-bg my-el-row">
      <el-col :span="1">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain>添加角色</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- table表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row v-for="level1 in props.row.children" :key="level1.id">
              <el-col :span="4">
                <el-tag class="level1-row" closable type>{{ level1.authName }}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <!-- 二级权限 -->
                <el-row v-for="level2 in level1.children" :key="level2.id">
                  <el-col :span="5">
                    <el-tag class="level2-row" closable type="success">{{ level2.authName }}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="19">
                    <!-- 三级菜单 -->
                    <el-tag
                      class="level3-row"
                      v-for="level3 in level2.children"
                      :key="level3.id"
                      closable
                      type="warning"
                    >{{ level3.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="props.row.children.length === 0">
              <el-col :span="24" style="text-align: center">没有分配权限</el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template>
          <!-- 编辑 -->
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <!-- 分配角色 -->
          <el-button type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 面包屑导航
import bread from "../../components/bread";
import {
  // 获取角色列表
  roles
} from "../../api/http";
export default {
  name: "roles",
  data() {
    return {
      // 搜索
      search: "",
      // 表格信息
      tableData: []
    };
  },
  components: {
    bread
  },
  created() {
    roles().then(res => {
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
.my-el-row,
.my-pagination {
  margin: 20px 0;
}

.my-table {
  border-radius: 4px;
}

.level3-row {
  margin: 0 15px 10px 0;
}
.level2-row,
.level1-row {
  margin-right: 5px;
}
</style>
