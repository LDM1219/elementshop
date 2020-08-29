<template>
  <el-dialog title="修改分类名称：" :visible.sync="visible" width="50%" @close="editCateDialogClosed">
    <el-form label-width="110px">
      <el-form-item label="分类名称:">
        <el-input v-model="getcatname"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelEditCate">取 消</el-button>
      <el-button type="primary" @click="editCate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editCate, getCateList } from "network/users.js";
export default {
  data() {
    return {
      visible: this.editCateDialogVisible
    };
  },
  computed: {
    getcatname: {
      get() {
        return this.cate_name;
      },
      set(newVal) {
        this.$emit("update:cate_name", newVal);
      }
    }
  },
  props: {
    cate_name: "",
    cate_id: "",
    editCateDialogVisible: {
      default: false,
      type: Boolean
    }
  },

  watch: {
    editCateDialogVisible() {
      this.visible = this.editCateDialogVisible;
    }
  },

  methods: {
    cancelEditCate() {
      this.$emit("update:editCateDialogVisible", false);
    },
    editCateDialogClosed() {
      this.$emit("update:editCateDialogVisible", false);
    },
    editCate() {
      editCate(this.cate_id, this.cate_name).then(res => {
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("修改商品名称失败");
        }
        this.$emit("update:editCateDialogVisible", false);
        this.$message.success("修改商品名称成功");
        //   重新获取商品分类
        getCateList().then(res => {
          if (res.meta.status !== 200) {
            return this.$message.error("获取商品分类失败");
          }
          this.$store.state.catelist = res.data.result;
          this.$store.state.cateTotal = res.data.total;
        });
      });
    }
  }
};
</script>

<style>
</style>