<template>
  <div>
    <breadcrumb :props-list="['商品管理','商品分类']"></breadcrumb>
    <cate-card></cate-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/nav/Breadcrumb.vue";
import CateCard from "./CateCard.vue";
export default {
  name: "Cate",
  components: {
    Breadcrumb,
    CateCard
  }
};
</script>

<style>
</style>