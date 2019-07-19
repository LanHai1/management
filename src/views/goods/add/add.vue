<template>
  <div class="addMain" align-center>
    <!-- 提示 -->
    <el-alert title="添加商品信息" type="info" close-text="知道了"></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active" :space="200" finish-status="success" style="margin:20px 0 0 106px">
      <el-step class="is-process-my" title="基本信息"></el-step>
      <!-- <el-step class="is-process-my" title="商品参数"></el-step>
      <el-step class="is-process-my" title="商品属性"></el-step>-->
      <el-step class="is-process-my" title="商品图片"></el-step>
      <el-step class="is-process-my" title="商品内容"></el-step>
    </el-steps>
    <!-- tabs -->
    <el-tabs tab-position="left" @tab-click="tabsClick" v-model="activeName" style="margin:20px">
      <el-tab-pane label="基本信息" name="first">
        <el-form
          label-position="top"
          class="myForm"
          :rules="rules"
          label-width="80px"
          :model="information"
          ref="information"
        >
          <el-form-item label="商品名称" prop="goods_name">
            <el-input class="my-input" v-model.trim="information.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input class="my-input" v-model.trim.number="information.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input class="my-input" v-model.trim.number="information.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input class="my-input" v-model.trim.number="information.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              v-model="information.goods_cat"
              :options="options"
              expand-trigger="hover"
              :props="{ label: 'cat_name', value: 'cat_id' }"
              @change="handleChange"
              style="float:left;width:300px"
              placeholder="试试搜索"
              filterable
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>-->
      <el-tab-pane label="商品图片" name="second">
        <!-- 上传图片 -->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          style="float:left"
          :file-list="information.pics"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="third">
        <el-button type="primary" class="btn-tj-my">添加商品</el-button>
        <!-- 富文本 -->
        <quillEditor v-model="information.goods_introduce"></quillEditor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 富文本编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

import {
  // 商品数据列表
  categories
} from "../../../api/http";

export default {
  name: "add",
  data() {
    return {
      // 步骤条
      active: 0,
      // tabs
      activeName: "first",
      // 表单验证
      isFormOk: true,
      // 基本信息
      information: {
        // 商品名称
        goods_name: "",
        // 商品价格
        goods_price: "",
        // 商品重量
        goods_weight: "",
        // 商品数量
        goods_number: "",
        // 商品分类
        goods_cat: [],
        // 介绍
        goods_introduce: "",
        // 商品图片
        pics: []
      },
      // 正则
      rules: {
        goods_name: [{ required: true, message: "商品名称不能为空" }],
        goods_price: [
          { required: true, message: "商品价格不能为空" },
          { type: "number", message: "商品价格必须为数字值" }
        ],
        goods_weight: [
          { required: true, message: "商品重量不能为空" },
          { type: "number", message: "商品重量必须为数字值" }
        ],
        goods_number: [
          { required: true, message: "商品数量不能为空" },
          { type: "number", message: "商品数量必须为数字值" }
        ],
        goods_cat: [{ required: true, message: "商品分类不能为空" }]
      },
      // 商品分类
      options: [],
      // 上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      // 富文本编辑器
      content: {
        ops: []
      }
    };
  },
  methods: {
    // 商品分类
    handleChange(value) {
      console.log(value);
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(this.dialogImageUrl);
    },
    // tab 点击事件
    tabsClick(val) {
      // 步骤条和tab联动
      this.active = +val.index;
      // 表单验证
      this.submitGoods("information");
      if (!this.isFormOk) {
        this.$notify({
          title: "提示",
          message: "商品基本信息请按要求填写",
          position: "top-left",
          duration: 5000
        });
        this.active = 0;
      }
    },
    // 商品表单验证
    submitGoods(formName) {
      this.$refs[formName].validate(valid => {
        // 未按要求输入
        if (valid) {
          this.isFormOk = true;
        } else {
          this.isFormOk = false;
          return false;
        }
      });
    }
  },
  components: {
    quillEditor
  },
  created() {
    // 获取商品分类列表
    categories({ type: [1, 2, 3] }).then(res => {
      this.options = res.data.data;
    });
  }
};
</script>

<style scoped lang="less">
.addMain {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #6e9480;
}
.is-process-my {
  text-align: left;
}
.my-input {
  width: 900px;
  float: left;
}
.el-form-item {
  margin-bottom: 20px;
}

.btn-tj-my {
  margin-bottom: 20px;
}
</style>
