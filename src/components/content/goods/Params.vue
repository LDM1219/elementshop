<template>
  <div>
    <breadcrumb :props-list="['商品管理','参数列表']"></breadcrumb>
    <params-card></params-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/nav/Breadcrumb.vue";
import ParamsCard from "./ParamsCard.vue";
export default {
  components: {
    Breadcrumb,
    ParamsCard
  }
};
</script>

<style>
</style>