<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item,index) in propsList"
        :key="index"
        :class="[index===0?'firstitem':'']"
      >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      path: []
    };
  },
  props: {
    propsList: {
      type: Array,
      default: []
    }
  }
  //   created() {
  //     this.getPath();
  //     console.log(this.path);
  //   },
  //   methods: {
  //     getPath() {
  //       for (let i of this.propsList) {
  //         let pathObj = {};
  //         pathObj.path = i.path;
  //         this.path.push(pathObj);
  //       }
  //     }
  //   }
};
</script>

<style lang="less">
</style>