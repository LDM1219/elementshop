<template>
  <div>
    <list-table v-bind="$attrs">
      <el-table-column type="index" label="#"></el-table-column>
    </list-table>
  </div>
</template>

<script>
import ListTable from "./ListTable";
export default {
  name: "Card",
  components: {
    ListTable
  }
};
</script>

<style>
</style>