<template>
  <el-card>
    <div id="main" style="width: 750px;height:400px;"></div>
  </el-card>
</template>

<script>
import echarts from "echarts";
import _ from "lodash";
import { getReports } from "network/users.js";
export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ]
      }
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    getReports().then(res => {
      if (res.meta.status !== 200) {
        return this.$message.error("获取数据失败");
      }
      const result = _.merge(res.data, this.options);
      myChart.setOption(result);
    });
  }
};
</script>

<style>
</style>