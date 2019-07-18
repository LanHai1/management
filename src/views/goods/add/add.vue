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
    <el-tabs tab-position="left" style=" margin:20px">
      <el-tab-pane label="基本信息">
        <el-form
          label-position="top"
          class="myForm"
          :rules="rules"
          label-width="80px"
          :model="information"
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
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
              style="float:left;width:300px"
              placeholder="请选择商品分类"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>-->
      <el-tab-pane label="商品图片">
        <!-- 上传图片 -->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          style="float:left"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
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
export default {
  name: "add",
  data() {
    return {
      // 步骤条
      active: 0,
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
        goods_introduce: ""
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
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
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
    }
  },
  components: {
    quillEditor
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
