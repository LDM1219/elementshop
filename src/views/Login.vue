<template>
  <div id="login">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/img/login.jpg" alt />
      </div>

      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="checkLogin">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    checkLogin() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;

        // 利用解构赋值获取data
        const { data: result } = await this.$http.post("login", this.loginForm);
        if (result.meta.status !== 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");
        console.log(result);
        window.sessionStorage.setItem("token", result.data.token);
        this.$router.push("./home");
      });
    }
  }
};
</script>

<style lang='less' scoped>
#login {
  background-color: pink;
  height: 100%;
}
.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  height: 300px;
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
}

.avatar_box {
  position: absolute;
  left: 50%;
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.el-button--primary {
  background-color: #ddca8b;
  border-color: #ddca8b;
}
.el-button--primary:hover {
  background-color: #ddca8b;
  opacity: 0.8;
  border-color: #ddca8b;
}
</style>