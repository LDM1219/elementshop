<template>
  <div>
    <breadcrumb :props-list="['商品管理','商品列表']"></breadcrumb>
    <list-card></list-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/nav/Breadcrumb.vue";
import ListCard from "./ListCard.vue";
export default {
  components: {
    Breadcrumb,
    ListCard
  }
};
</script>

<style>
</style>