<template>
  <div>
    <breadcrumb :props-list="['用户管理','用户列表']"></breadcrumb>
    <user-card></user-card>
  </div>
</template>
<script>
import Breadcrumb from "../../common/nav/Breadcrumb";
import UserCard from "components/content/user/UserCard";
import { getUserList } from "network/users.js";
export default {
  name: "User",
  components: {
    Breadcrumb,
    UserCard
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      getUserList().then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取用户列表失败");
        }
        this.$store.commit("getUserlist", res.data.users);
        this.$store.commit("getTotal", res.data.total);
      });
    }
  }
};
</script>

<style>
</style>