<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb :props-list="['权限管理','权限列表']"></breadcrumb>

    <!-- 卡片视图 -->
    <rights-card :rightsList="rightsList"></rights-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/nav/Breadcrumb";
import RightsCard from "./RightsCard";
export default {
  name: "Rights",
  components: {
    Breadcrumb,
    RightsCard
  },
  data() {
    return {
      // 权限列表
      rightsList: []
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    //   获取所有权限列表
    async getRightsList() {
      const { data: res } = await this.$http.get("rights/list");
      if (res.meta.status !== 200) {
        return this.$message.error("获取权限列表失败");
      }
      this.rightsList = res.data;
      console.log(this.rightsList);
    }
  }
};
</script>

<style>
</style>