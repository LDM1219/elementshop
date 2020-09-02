<template>
  <div>
    <breadcrumb :props-list="['数据统计','数据报表']"></breadcrumb>
    <report-card></report-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/nav/Breadcrumb.vue";
import ReportCard from "./ReportCard.vue";
export default {
  components: {
    Breadcrumb,
    ReportCard
  }
};
</script>

<style>
</style>