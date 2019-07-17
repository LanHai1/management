<template>
  <div v-loading="loading">
    <bread oneTitle="用户管理" twoTitle="用户列表"></bread>
    <!-- 搜索 -->
    <el-row :gutter="0" type="flex" class="row-bg my-el-row">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容" v-model.trim="search" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain @click="dialogVisible = true">添加用户</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 添加用户组件 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form
        :label-position="labelPosition"
        :rules="rules"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input placeholder="请输入邮箱" v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input placeholder="请输入电话" v-model="formLabelAlign.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="120px">
          <el-input :disabled="true" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserMsg">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="distribution">
      <el-form :model="distForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="当前用户" label-width="120px">{{distForm.username}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="请选择角色" label-width="120px">
              <el-select v-model="distForm.region" placeholder="请选择角色">
                <el-option
                  v-for="(item, index) in distForm.option"
                  :key="index"
                  :label="item.roleName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="distribution = false">取 消</el-button>
        <el-button type="primary" @click="roleDist">确 定</el-button>
      </div>
    </el-dialog>

    <!-- table表格 -->
    <el-table :data="tableData" style="width: 100%" class="my-table" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="userStateChange(scope.row.id,scope.row.mg_state)"
            v-model="scope.row.mg_state"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button type="primary" icon="el-icon-edit" @click="queryUser(scope.row.id)" circle></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteRemoveUser(scope.row.id,scope.row.username)"
          ></el-button>
          <!-- 分配角色 -->
          <el-button
            type="success"
            icon="el-icon-check"
            @click="openDist(scope.row.username,scope.row.role_name,scope.row.id)"
            circle
          ></el-button>
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

import {
  // 用户数据列表请求
  users,
  // 添加用户请求
  addUsers,
  // 修改用户状态
  userState,
  // 删除用户
  deleteUser,
  // 查询单个用户
  getByIdUser,
  // 更新用户信息
  updateUserMsg,
  // 获取角色列表
  roles,
  // 分配角色
  role
} from "../../api/http";
export default {
  name: "users",
  data() {
    return {
      // 添加用户
      dialogVisible: false,
      labelPosition: "right",
      formLabelAlign: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 分配角色
      distribution: false,
      distForm: {
        username: "",
        region: "",
        option: [],
        id: undefined
      },
      // 正则匹配
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      // 搜索
      search: "",
      // 表格信息
      tableData: [],
      // 当前页码
      pagenum: 1,
      // 总条数
      mytotal: 0,
      // 每页显示条目个数
      mypageSize: 10,
      // 加载效果
      loading: false,
      // 修改数据
      dialogFormVisible: false,
      // 单个用户信息
      form: {
        username: "",
        email: "",
        mobile: "",
        id: undefined
      }
    };
  },
  methods: {
    // 点击容量
    handleSizeChange(val) {
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
    },
    // 用户搜索
    searchUsers() {
      this.getUserData();
    },
    // 添加用户确定关闭?
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 添加用户
    addUser() {
      const { username, password, email, mobile } = this.formLabelAlign;
      if (!username || !password) {
        return this.$notify({
          title: "提示",
          message: "请按照输入提示输入信息",
          position: "bottom-left",
          duration: 2000
        });
      }
      addUsers({ username, password, email, mobile }).then(res => {
        this.loading = true;
        // 创建成功
        if (res.data.meta.status === 201) {
          // 延时加载
          setInterval(() => {
            this.loading = false;
          }, 1000);
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          });
          this.dialogVisible = false;
          this.formLabelAlign.username = "";
          this.formLabelAlign.password = "";
          this.formLabelAlign.email = "";
          this.formLabelAlign.mobile = "";
          // 重新获取数据
          this.getUserData();
          return;
        }
        // 创建失败 用户名已存在
        this.$message.error(res.data.meta.msg);
        this.loading = false;
      });
    },
    // 用户状态
    userStateChange(uId, type) {
      uId = +uId;
      userState({ uId, type }).then(res => {
        if (res.data.meta.status !== 200) {
          this.$message({
            showClose: true,
            message: "设置状态错误",
            type: "error"
          });
        }
      });
    },
    // 删除用户
    deleteRemoveUser(id, username) {
      this.$confirm(`确定删除用户“${username}”吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser({ id }).then(res => {
            if (res.data.meta.status === 200) {
              // 重新获取用户列表
              this.getUserData();
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
    // 根据id查询用户信息
    queryUser(id) {
      // 根据id查询用户信息
      getByIdUser({ id }).then(res => {
        let { username, email, mobile, id } = res.data.data;
        this.form = { username, email, mobile, id };
        this.dialogFormVisible = true;
      });
    },
    // 修改用户信息
    updateUserMsg() {
      updateUserMsg(this.form).then(res => {
        // 更新成功
        if (res.data.meta.status === 200) {
          this.dialogFormVisible = false;
        }
        // 重新获取数据
        this.getUserData();
      });
    },
    // 分配角色渲染
    openDist(username, role_name, id) {
      this.distForm.username = username;
      this.distForm.region = role_name;
      this.distForm.id = id;
      this.distribution = true;
      roles().then(res => {
        this.distForm.option = res.data.data;
      });
    },
    // 修改分配角色
    roleDist() {
      const { id, region } = this.distForm;
      role({ id, rid: region }).then(res => {
        if (res.data.meta.status === 200) {
          // 优化渲染 不重新请求 失败
          // this.distForm.option.find(val => {
          //   if (val.id === res.data.data.rid) {
          //     this.distForm.region = val.roleName;
          //     this.distribution = false;
          //   }
          // });
          this.getUserData();
          this.distribution = false;
        }
      });
    }
  },
  components: {
    bread
  },
  created() {
    this.getUserData();
  },
  watch: {
    tableData: {
      deep: true,
      handler(val) {
        // 深度监听是否获取到用户数据
        if (val.length === 0) {
          this.$message.error("无此用户!");
        }
      }
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
.my-el-row,
.my-pagination {
  margin: 20px 0;
}
.my-table {
  border-radius: 4px;
}
</style>
