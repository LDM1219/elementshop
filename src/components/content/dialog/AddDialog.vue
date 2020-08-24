<template>
  <!-- 添加用户的对话框 -->
  <el-dialog title="添加用户" :visible.sync="visible" width="50%" @close="addDialogClosed">
    <!-- 内容主体区域 -->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelAddUser">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUserList } from "network/users.js";
export default {
  // props: {
  //   addDialogVisible: {
  //     default: false,
  //     type: Boolean
  //   }
  // },
  props: ["addDialogVisible"],
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
      //添加用户的表单数据
      addForm: { username: "", password: "", email: "", mobile: "" },
      //添加表单的验证规则
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobil, trigger: "blur" }
        ]
      },
      visible: this.addDialogVisible
    };
  },
  watch: {
    // 监听addDialogVisible的变化，并赋值给dialog组件的visible
    addDialogVisible() {
      this.visible = this.addDialogVisible;
    }
  },
  methods: {
    // dialog对话框的关闭
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
      this.$emit("update:addDialogVisible", false);
    },
    cancelAddUser() {
      this.$emit("update:addDialogVisible", false);
    },
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        // valid为true，可以发送网络请求添加新用户
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status != 201) {
          this.$message.error("添加用户失败");
        }
        this.$message.success("添加用户成功");
        // 隐藏添加用户对话框
        this.$emit("update:addDialogVisible", false);
        // 重新获取用户数据列表
        this.getUserList();
      });
    },
    getUserList() {
      getUserList("get", "users", this.$store.state.queryInfo).then(res => {
        if (res.meta.status !== 200)
          return this.$message.error("获取用户列表失败");

        // 注意！：通过props传递给子组件的属性，不能在子组件内部修改props中的属性值
        // 错误  this.userlist = res.data.users;
        // 错误  this.total = res.data.total;

        // 使用双向绑定
        // this.$emit("update:userlist", res.data.users);
        // this.$emit("update:total", res.data.total);

        console.log("-------");
        this.$store.commit("getUserlist", res.data.users);
        this.$store.commit("getTotal", res.data.total);
        console.log(res);
      });
    }
  }
};
</script>

<style>
</style>