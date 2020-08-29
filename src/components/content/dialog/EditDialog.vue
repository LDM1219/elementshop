<template>
  <el-dialog
    title="修改用户"
    :visible.sync="visible"
    width="50%"
    @close="editDialogClosed"
    :editDialogVisible="editDialogVisible"
    @open="getUserById(getId)"
  >
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelEditDialogVisible">取 消</el-button>
      <el-button type="primary" @click="putEditUserInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUserList, queryUserById, editUserInfo } from "network/users.js";
export default {
  props: {
    editInfoId: {
      default: null,
      type: Number
    },
    editDialogVisible: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    getId() {
      return this.editInfoId;
    }
  },
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    // 验证手机号的规则
    var checkMobil = (rule, value, callback) => {
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号码"));
    };
    return {
      editForm: { email: "", mobile: "" },
      //添加表单的验证规则
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobil, trigger: "blur" }
        ]
      },
      visible: this.editDialogVisible
    };
  },
  watch: {
    editDialogVisible() {
      this.visible = this.editDialogVisible;
    }
  },

  methods: {
    editDialogClosed() {
      this.$emit("update:editDialogVisible", false);
    },
    cancelEditDialogVisible() {
      this.$emit("update:editDialogVisible", false);
    },
    putEditUserInfo() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return;
        editUserInfo(
          this.editInfoId,
          this.editForm.email,
          this.editForm.mobile
        ).then(res => {
          if (res.meta.status !== 200) {
            return this.$message.error("更新用户信息失败");
          }
          this.$emit("update:editDialogVisible", false);
          this.getUserList();
          this.$message.success("更新用户信息成功");
        });
      });
    },
    getUserById(id) {
      console.log("++++++");
      queryUserById(id).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取用户信息失败");
        }
        this.editForm = res.data;
      });
    },
    getUserList() {
      getUserList().then(res => {
        if (res.meta.status !== 200)
          return this.$message.error("获取用户列表失败");
        this.$store.commit("getUserlist", res.data.users);
        this.$store.commit("getTotal", res.data.total);
      });
    }
  }
};
</script>

<style>
</style>