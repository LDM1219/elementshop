<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb :props-list="['权限管理','权限列表']"></breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsList" border stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限管理"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level==='0'">一级</el-tag>
            <el-tag v-else-if="scope.row.level==='1'" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/nav/Breadcrumb";

export default {
  name: "Rights",
  components: {
    Breadcrumb
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