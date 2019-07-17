<template>
  <div>
    <bread oneTitle="用户管理" twoTitle="用户列表"></bread>
    <!-- 搜索 -->
    <el-row :gutter="0" type="flex" class="row-bg my-el-row">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- table表格 -->
    <el-table :data="tableData" style="width: 100%" class="my-table" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>
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

    <!-- 分页 -->
    <el-row>
      <el-col :span="11">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="mypageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="mytotal"
          class="my-pagination"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 面包屑导航
import bread from "../../components/bread";
// 用户数据列表请求
import { users } from "../../api/http";
export default {
  name: "users",
  data() {
    return {
      // 搜索
      search: "",
      // 表格信息
      tableData: [],
      // 当前页码
      pagenum: 1,
      // 总条数
      mytotal: 0,
      // 每页显示条目个数
      mypageSize: 10
    };
  },
  methods: {
    // 点击容量
    handleSizeChange(val) {
      console.log(this.mytotal, val);
      // 判断条数是否足够
      if (val > this.mytotal) {
        return this.$notify({
          title: "警告",
          message: `总数据只有${this.mytotal}条`,
          type: "warning"
        });
      }
      this.mypageSize = val;
      this.pagenum = 1;
      this.getUserData();
    },
    // 点击页码
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserData();
    },
    // 请求用户列表数据
    getUserData() {
      users({
        query: this.search,
        pagenum: this.pagenum,
        pagesize: this.mypageSize
      }).then(res => {
        this.tableData = res.data.data.users;
        // 设置总条数
        this.mytotal = res.data.data.total;
      });
    }
  },
  components: {
    bread
  },
  created() {
    this.getUserData();
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
</style>
