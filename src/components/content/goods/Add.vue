<template>
  <div>
    <breadcrumb :props-list="['商品管理','添加商品']"></breadcrumb>
    <add-card></add-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/nav/Breadcrumb.vue";
import AddCard from "./AddCard.vue";
export default {
  components: {
    Breadcrumb,
    AddCard
  }
};
</script>

<style>
</style>