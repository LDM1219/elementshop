<template>
  <!-- 添加分类的对话框 -->
  <el-dialog title="添加分类" :visible.sync="visible" width="50%" @close="addCateDialogClosed">
    <!-- 内容主体区域 -->
    <el-form
      :model="addCateForm"
      :rules="addCateFormRules"
      ref="addCateFormRef"
      label-width="110px"
    >
      <el-form-item label="分类名称:" prop="cat_name">
        <el-input v-model="addCateForm.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类:">
        <el-cascader
          v-model="selectedKeys"
          :options="parentCateList"
          :props="{expandTrigger: 'hover',value:'cat_id',label: 'cat_name',children: 'children',checkStrictly:'true' }"
          @change="parentCateChanged"
          clearable
        ></el-cascader>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelAddCate">取 消</el-button>
      <el-button type="primary" @click="addCate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getCateList, addCate } from "network/users.js";

export default {
  props: {
    addCateDialogVisible: {
      default: false,
      type: Boolean
    },
    parentCateList: {
      default: function() {
        return [];
      },
      type: Array
    }
  },
  data() {
    return {
      visible: this.addCateDialogVisible,

      addCateForm: {
        // 将要添加的分类的名称
        cat_name: "",
        cat_pid: 0,
        cat_level: 0
      },
      // 添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },

      //   选中的父级分类的ID数组
      selectedKeys: []
    };
  },
  watch: {
    addCateDialogVisible() {
      this.visible = this.addCateDialogVisible;
    }
  },
  methods: {
    addCateDialogClosed() {
      this.$emit("update:addCateDialogVisible", false);
      this.$refs.addCateFormRef.resetFields();
      this.selectedKeys = [];
      this.addCateForm.cat_level = 0;
      this.addCateForm.cat_pid = 0;
    },
    cancelAddCate() {
      this.$emit("update:addCateDialogVisible", false);
    },

    parentCateChanged() {
      console.log(this.selectedKeys);
      if (this.selectedKeys.length > 0) {
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ];
        this.addCateForm.cat_level = this.selectedKeys.length;
        return;
      } else {
        this.addCateForm.cat_pid = 0;
        this.addCateForm.cat_level = 0;
      }
    },
    addCate() {
      console.log(this.addCateForm);
      this.$refs.addCateFormRef.validate(valid => {
        if (!valid) return;
        addCate(this.addCateForm).then(res => {
          if (res.meta.status !== 201) {
            return this.$message.error("添加分类失败");
          }
          this.$message.success("添加分类成功");
          this.$emit("update:addCateDialogVisible", false);

          //   重新获取商品分类
          getCateList().then(res => {
            if (res.meta.status !== 200) {
              return this.$message.error("获取商品分类失败");
            }
            this.$store.state.catelist = res.data.result;
            this.$store.state.cateTotal = res.data.total;
          });
        });
      });
    }
  }
};
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>