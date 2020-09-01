<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
          <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="goAddpage">添加商品</el-button>
      </el-col>
    </el-row>

    <!-- table表格区域 -->
    <el-table :data="goodslist" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="商品名称" prop="goods_name"></el-table-column>
      <el-table-column label="商品价格(元)" prop="goods_price" width="90px"></el-table-column>
      <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
      <el-table-column label="创建时间" prop="add_time" width="140px">
        <template v-slot="scope">{{scope.row.add_time | dateFormat}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeById(scope.row.goods_id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </el-card>
</template>

<script>
import { getGoodsList, removeById } from "network/users.js";
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      goodslist: [],
      total: 0
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      getGoodsList({ params: this.queryInfo }).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取商品列表失败");
        }
        console.log("获取商品列表");
        this.goodslist = res.data.goods;
        this.total = res.data.total;
      });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    removeById(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeById(id).then(res => {
            if (res.meta.status !== 200) {
              return this.$message.error("删除商品失败");
            }
            this.$message.success("删除商品成功");
            this.getGoodsList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    goAddpage() {
      this.$router.push("/goods/add");
    }
  }
};
</script>

<style>
</style>