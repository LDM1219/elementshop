<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/img/shoplogo.png" alt="后台logo" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCol?'64px':'200px'">
        <div class="toggle-button" @click="toggleCol">| | |</div>
        <el-menu
          background-color="rgb(207, 167, 167)"
          text-color="#fff"
          active-text-color="rgb(146, 79, 233)"
          unique-opened
          :collapse="isCol"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + '' " v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subItem.path + ''"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      iconObj: {
        "125": "el-icon-user-solid",
        "103": "el-icon-s-help",
        "101": "el-icon-s-goods",
        "102": "el-icon-s-order",
        "145": "el-icon-s-marketing"
      },
      isCol: false,
      activePath: ""
    };
  },
  created() {
    this.getMenuList();

    //获取当前活跃路由并赋值给activePath
    //console.log(this.$route.path);
    this.activePath = this.$route.path;
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return $message.error(res.meta.msg);
      this.menuList = res.data;
      console.log(res);
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCol() {
      this.isCol = !this.isCol;
    }
    // 保存连接的激活状态
    // saveNavState(activePath) {
    //   console.log(window.sessionStorage);
    //   window.sessionStorage.setItem("activePath", activePath);
    // }
  }
};
</script>

<style lang='less' scope>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(209, 147, 147);
  // background-color: rgb(146, 79, 233);
  div {
    display: flex;
    align-items: center;
    span {
      padding-left: 20px;
      font-size: 1.5em;
      color: #fff;
    }
  }
  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
}
.el-aside {
  background-color: rgb(207, 167, 167);
  .el-menu {
    border-right: none;
  }
  .toggle-button {
    background-color: rgb(207, 167, 167);
    font-size: 10px;
    color: #fff;
    text-align: center;
    line-height: 24px;
  }
}
.el-main {
  background-color: rgb(226, 210, 210);
}
</style>