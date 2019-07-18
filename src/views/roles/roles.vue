<template>
  <div>
    <bread oneTitle="权限管理" twoTitle="角色列表"></bread>
    <!-- 搜索 -->
    <el-row :gutter="0" type="flex" class="row-bg my-el-row">
      <el-col :span="1">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain @click="addRole = true">添加角色</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- table表格 -->
    <el-table :data="tableData" style="width: 100%" class="my-table">
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
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button type="primary" icon="el-icon-edit" @click="getByIdRoles(scope.row.id)" circle></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteRoles(scope.row.id,scope.row.roleName)"
          ></el-button>
          <!-- 分配角色 -->
          <el-button type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addRole">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
          :rules="[
      { required: true, message: '请输入角色名称'}
    ]"
        >
          <el-input type="text" v-model.trim="numberValidateForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="roleDesc"
          :rules="[
      { required: true, message: '请输入角色描述'}
    ]"
        >
          <el-input type="text" v-model.trim="numberValidateForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float:right">
            <el-button type="primary" @click="submitFormRole('numberValidateForm')">确定</el-button>
            <el-button @click="resetFormRole('numberValidateForm')">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改角色 -->
    <el-dialog title="修改角色" :visible.sync="updateRole">
      <el-form
        :model="updateValidateForm"
        ref="updateValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
          :rules="[
      { required: true, message: '请输入角色名称'}
    ]"
        >
          <el-input type="text" v-model.trim="updateValidateForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="roleDesc"
          :rules="[
      { required: true, message: '请输入角色描述'}
    ]"
        >
          <el-input type="text" v-model.trim="updateValidateForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float:right">
            <el-button type="primary" @click="updatesubmitFormRole('updateValidateForm')">确定</el-button>
            <el-button @click="resetFormRole('updateValidateForm')">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 面包屑导航
import bread from "../../components/bread";
import {
  // 获取角色列表
  roles,
  // 删除角色
  deleteRole,
  // 添加角色
  addRole,
  // 根据id查询角色
  getByIdRole,
  // 编辑提交角色
  updateRole
} from "../../api/http";
export default {
  name: "roles",
  data() {
    return {
      // 搜索
      search: "",
      // 表格信息
      tableData: [],
      // 添加角色
      addRole: false,
      numberValidateForm: {
        // 角色名称
        roleName: "",
        // 角色描述
        roleDesc: ""
      },
      // 更新角色
      updateRole: false,
      updateValidateForm: {
        // 角色名称
        roleName: "",
        // 角色描述
        roleDesc: "",
        id: undefined
      }
    };
  },
  components: {
    bread
  },
  created() {
    this.getroles();
  },
  methods: {
    // 获取角色信息
    getroles() {
      roles().then(res => {
        this.tableData = res.data.data;
      });
    },
    // 删除角色
    deleteRoles(id, roleName) {
      this.$confirm(`确定删除${roleName}角色吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRole({ id }).then(res => {
            if (res.data.meta.status === 200) {
              this.getroles();
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
    // 添加角色
    submitFormRole(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { roleName, roleDesc } = this.numberValidateForm;
          addRole({ roleName, roleDesc }).then(res => {
            if (res.data.meta.status === 201) {
              this.getroles();
              this.addRole = false;
            }
          });
        } else {
          // 提示输入错误
          this.$notify({
            title: "提示",
            message: "请按照要求填写",
            position: "top-left",
            duration: 2000
          });
          return false;
        }
      });
    },
    // 取消添加/更新角色 重置
    resetFormRole(formName) {
      this.$refs[formName].resetFields();
      this.addRole = false;
      this.updateRole = false;
    },
    // 根据id查询角色
    getByIdRoles(id) {
      getByIdRole({ id }).then(res => {
        if (res.data.meta.status === 200) {
          const { roleName, roleDesc, roleId } = res.data.data;
          this.updateValidateForm = { roleName, roleDesc, id: roleId };
          this.updateRole = true;
        }
      });
    },
    // 更新角色
    updatesubmitFormRole(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { id, roleName, roleDesc } = this.updateValidateForm;
          updateRole({ id, roleName, roleDesc }).then(res => {
            if (res.data.meta.status === 200) {
              this.getroles();
              this.updateRole = false;
            }
          });
        } else {
          // 提示输入错误
          this.$notify({
            title: "提示",
            message: "请按照要求填写",
            position: "top-left",
            duration: 2000
          });
          return false;
        }
      });
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

.level3-row {
  margin: 0 15px 10px 0;
}
.level2-row,
.level1-row {
  margin-right: 5px;
}
</style>
