<template>
  <div>
    <bread oneTitle="商品管理" twoTitle="商品列表"></bread>
    <div class="goodsMain">
      <!-- 搜索 -->
      <el-row :gutter="0" type="flex" class="row-bg my-el-row">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入内容" v-model.trim="query" clearable class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="searchGood"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple-light">
            <el-button type="success" plain @click="addLinkGood">添加商品</el-button>
          </div>
        </el-col>
        <!-- 分页 -->
        <el-col :span="17">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="my-pagination"
          ></el-pagination>
        </el-col>
      </el-row>
      <!-- 单个商品信息 -->
      <el-dialog title="商品详情" :visible.sync="oneGood">
        <el-form></el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="oneGood = false">取 消</el-button>
          <el-button type="primary" @click="oneGood = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- table表格 -->
      <el-table :data="tableData" style="width: 100%" border class="my-table">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="580"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>
        <el-table-column prop="add_time" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="openOneGood(scope.row.goods_id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteGoods(scope.row.goods_id)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// 面包屑导航
import bread from "../../components/bread";
import {
  // 商品列表数据
  goods,
  // 删除商品
  deleteGood,
  // 根据id查询商品
  getByIdGood
} from "../../api/http";
export default {
  name: "goods",
  data() {
    return {
      // 搜索
      query: "",
      // 表格信息
      tableData: [],
      // 当前页码
      pagenum: 1,
      // 每页显示条数
      pagesize: 10,
      // 总页数
      total: 0,
      // 单个商品区块
      oneGood: false
    };
  },
  methods: {
    // 页容量改变触发
    handleSizeChange(val) {
      // 判断条数是否足够
      if (val > this.total) {
        return this.$notify({
          title: "警告",
          message: `总数据只有${this.total}条`,
          type: "warning"
        });
      }
      this.pagesize = val;
      this.pagenum = 1;
      this.getGoods();
    },
    // 当前页改变触发
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getGoods();
    },
    // 获取商品列表
    getGoods() {
      const { query, pagenum, pagesize } = this;
      goods({
        query,
        pagenum,
        pagesize
      }).then(res => {
        // 处理时间格式
        res.data.data.goods.map(val => {
          val.add_time = this.$moment(val.add_time).format(
            "YYYY-DD-MM HH:mm:ss"
          );
        });
        this.tableData = res.data.data.goods;
        this.pagenum = +res.data.data.pagenum;
        this.total = res.data.data.total;
      });
    },
    // 删除商品
    deleteGoods(id) {
      this.$confirm("确定删除这个商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteGood({
            id
          }).then(res => {
            if (res.data.meta.status === 200) {
              this.getGoods();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 根据id查询商品
    openOneGood(id) {
      // 未完成
      getByIdGood({
        id
      }).then(res => {
        console.log(res);
        this.oneGood = true;
      });
    },
    // 查询商品
    searchGood() {
      const { query, pagenum, pagesize } = this;
      this.getGoods();
    },
    // 添加商品
    addLinkGood() {
      this.$router.push("goods/add");
    }
  },
  components: {
    bread
  },
  created() {
    this.getGoods();
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
.my-el-row {
  margin: 20px 0;
}
.my-pagination {
  float: right;
}
.my-table {
  border-radius: 4px;
}
.goodsMain {
  position: relative;
}
</style>
