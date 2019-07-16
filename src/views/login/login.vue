<template>
  <div class="bg">
    <div class="form">
      <h1 class="title">用户登陆</h1>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="用户名" prop="user" :rules="[{ required: true, message: '用户名不能为空'}]">
          <el-input type="text" v-model.trim="ruleForm.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pass"
          :rules="[{ required: true, message: '密码不能为空'},{ min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }]"
        >
          <el-input type="password" v-model.trim="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            @keyup.13="submitForm('ruleForm')"
            class="submit"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 登陆请求
import { login } from "../../api/http";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        user: "",
        pass: ""
      }
    };
  },
  methods: {
    // 错误提示
    errPrompt(msg) {
      this.$notify.error({
        title: "错误",
        message: msg,
        duration: 2000
      });
    },
    // 提交数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 饿了么验证规则确定
        if (valid) {
          const { user, pass } = this.ruleForm;
          // 为空不发请求
          if (!user || !pass) return this.errPrompt("用户名或密码不能为空");
          login({
            username: user,
            password: pass
          })
            .then(res => {
              if (res.data.meta.status === 400) {
                // 重置用户输入
                this.ruleForm.user = "";
                this.ruleForm.pass = "";
                return this.errPrompt(res.data.meta.msg);
              }
              if (res.data.meta.status === 200) {
                // 本地存储 token
                window.localStorage.setItem("token", res.data.data.token);
                this.$router.push("/index");
                return;
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          this.errPrompt("输入错误,请按规则输入");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.bg {
  background-color: #263141;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  .title {
    font-size: 24px;
    font-weight: 600;
    padding: 20px 0 35px;
  }
  .form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;
    width: 500px;
    border-radius: 5px;
    background-color: #fff;
  }
  .submit {
    width: 100%;
  }
}
</style>
