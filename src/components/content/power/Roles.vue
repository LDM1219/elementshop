<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb :props-list="['权限管理','角色列表']"></breadcrumb>
    <!-- 卡片区域 -->
    <roles-card></roles-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/nav/Breadcrumb";
import RolesCard from "components/content/power/RolesCard";

import { getRolesList } from "network/users.js";
export default {
  name: "Roles",
  components: {
    Breadcrumb,
    RolesCard
  },
  created() {
    this.getRolesList();
  },
  methods: {
    //   获取所有角色列表
    getRolesList() {
      getRolesList().then(res => {
        console.log("aaa");
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("获取权限列表失败");
        }
        this.$store.commit("getRoleslist", res.data);
      });
    }
  }
};
</script>

<style>
</style>