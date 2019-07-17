<template>
  <div>
    <bread oneTitle="商品管理" twoTitle="商品分类"></bread>
    <!-- 搜索 -->
    <el-row :gutter="0" type="flex" class="row-bg my-el-row">
      <el-col :span="1">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain>添加分类</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- table表格 -->
    <el-table :data="tableData" style="width: 100%" class="my-table">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row>
      <el-col :span="11">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          class="my-pagination"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 面包屑导航
import bread from "../../components/bread";
export default {
  name: "categories",
  data() {
    return {
      // 表格信息
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      // 当前页码
      currentPage4: 4
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  components: {
    bread
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
