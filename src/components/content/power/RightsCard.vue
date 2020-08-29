<template>
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
</template>

<script>
export default {
  props: {
    rightsList: {
      default: function() {
        return [];
      },
      type: Array
    }
  }
};
</script>

<style>
</style>