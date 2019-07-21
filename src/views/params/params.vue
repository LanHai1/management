<template>
  <div>
    <bread oneTitle="商品管理" twoTitle="分类参数"></bread>
    <!-- 提示 -->
    <el-alert title="注意:只允许为第三级分类设置相关参数!" class="my-alert" type="warning" show-icon></el-alert>
    <!-- 商品分类 -->
    <el-row class="my-fl">
      <el-col :span="6">
        请选择商品分类:
        <el-cascader
          placeholder="请选择商品分类"
          v-model="value"
          :options="options"
          expand-trigger="hover"
          :props="{ label: 'cat_name', value: 'cat_id' }"
          @change="handleChange"
          filterable
        ></el-cascader>
      </el-col>
    </el-row>
    <!-- tabs切换 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first">
        <el-row>
          <el-col :span="2">
            <el-button
              type="primary"
              class="my-button"
              :disabled="tableData.length==0?true:false"
            >添加动态参数</el-button>
          </el-col>
        </el-row>
        <!-- 动态参数表格 -->
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          class="my-table"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals.split(',')"
                closable
                :disable-transitions="false"
                @close="myTagHandleClose(tag)"
                class="my-tag"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="taginputVisible"
                v-model="taginputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="myTagHandleInputConfirm"
                @blur="myTagHandleInputConfirm"
                style="margin-top:20px"
              ></el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="myTagShowInput"
              >+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="attr_name" label="商品参数" width="320"></el-table-column>
          <el-table-column property="name" label="操作">
            <template>
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="1">
        <el-row>
          <el-col :span="2">
            <el-button
              type="primary"
              class="my-button"
              :disabled="tableData.length==0?true:false"
            >添加静态参数</el-button>
          </el-col>
        </el-row>
        <!-- 静态参数表格 -->
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          class="my-table"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="attr_name" label="属性名称" width="320"></el-table-column>
          <el-table-column property="attr_vals" label="属性值" width="320"></el-table-column>
          <el-table-column property="name" label="操作">
            <template>
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 面包屑导航
import bread from "../../components/bread";
import {
  // 商品分类数据列表
  categories,
  // 分类参数管理参数列表
  categoriesList
} from "../../api/http";

export default {
  name: "params",
  components: {
    bread
  },
  created() {
    // 商品分类数据列表
    categories({ type: [1, 2, 3] }).then(res => {
      this.options = res.data.data;
    });
  },
  data() {
    return {
      // tabs
      activeName: "first",
      value: [],
      options: [],
      // 选中分类id
      categoriesId: undefined,
      // 表格数据
      tableData: [],
      // tag
      tagdynamicTags: ["标签一", "标签二", "标签三"],
      taginputVisible: false,
      taginputValue: "",
      currentRow: null
    };
  },
  methods: {
    // 分类改变
    handleChange(value) {
      this.categoriesId = value[value.length - 1];
      this.activeName = "first";
      this.getMany({ id: this.categoriesId, sel: "many" });
    },
    // 获取动态/静态参数
    getMany({ id, sel }) {
      categoriesList({ id, sel }).then(res => {
        if (res.data.meta.status == 200) {
          this.tableData = res.data.data;
        }
      });
    },
    // tabs点击事件
    handleClick(tab) {
      if (tab.index == 0) {
        this.tableData = [];
        this.getMany({ id: this.categoriesId, sel: "many" });
      }
      if (tab.index == 1) {
        this.tableData = [];
        this.getMany({ id: this.categoriesId, sel: "only" });
      }
    },
    // tag
    myTagHandleClose(tag) {
      this.tagdynamicTags.splice(this.tagdynamicTags.indexOf(tag), 1);
    },

    myTagShowInput() {
      this.taginputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    myTagHandleInputConfirm() {
      console.log(1);
      let inputValue = this.taginputValue;
      if (inputValue) {
        this.tagdynamicTags.push(inputValue);
      }
      this.taginputVisible = false;
      this.taginputValue = "";
    }
  }
};
</script>

<style scoped lang="less">
.my-alert {
  margin: 20px 0 0 0;
}
.my-button {
  margin: 8px 0 20px 0;
}
.my-table {
  border-radius: 4px;
}
.my-fl {
  margin: 20px 0 0 0;
}
.my-tag {
  margin-right: 20px;
}
</style>
