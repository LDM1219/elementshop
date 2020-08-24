<template>
  <div>
    <el-table :data="usersList" border stripe style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column
        v-for="(item,index) in labellist"
        :key="item.index"
        :prop="proplist[index]"
        :label="labellist[index]"
      ></el-table-column>
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ListTable",
  props: {
    usersList: {
      default: "",
      type: Array
    },
    labellist: {
      default: "",
      type: Array
    },
    proplist: {
      default: "",
      type: Array
    },
    tempLabellist: {
      default: "",
      type: Array
    }
  },
  methods: {
    async userStateChange(userinfo) {
      const url = `users/${userinfo.id}/state/${userinfo.mg_state}`;
      getData("put", url, 200).then(res => {
        if (!res) {
          userinfo.mg_state = !userInfo.mg_state;
          return this.$message.error("更新用户状态失败");
        }
        this.$message.success("更新用户状态成功");
      });
    }
  }
};
</script>

<style>
</style>