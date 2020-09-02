<template>
  <div>
    <breadcrumb :props-list="['订单管理','订单列表']"></breadcrumb>
    <order-card></order-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/nav/Breadcrumb.vue";
import OrderCard from "./OrderCard.vue";
export default {
  components: {
    Breadcrumb,
    OrderCard
  }
};
</script>

<style>
</style>