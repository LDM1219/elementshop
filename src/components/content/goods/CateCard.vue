<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>

      <tree-table
        class="treeTable"
        :data="this.$store.state.catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="#"
        border
        :show-row-hover="false"
      >
        <template v-slot:isok="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted===false"
            style="color:rgb(32,178,170)"
          ></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>
        <template v-slot:order="scope">
          <el-tag v-if="scope.row.cat_level===0" size="mini">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level===1" type="success" size="mini">二级</el-tag>
          <el-tag v-else type="warning" size="mini">三级</el-tag>
        </template>
        <template v-slot:operation="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditCateDialog(scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delet"
            size="mini"
            @click="removeCateById(scope.row.cat_id)"
          >删除</el-button>
        </template>
      </tree-table>

      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.$store.state.cateQueryInfo.pagenum"
        :page-size="this.$store.state.cateQueryInfo.pagesize"
        :page-sizes="[1,3,5,10,15,20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.$store.state.cateTotal"
      ></el-pagination>
    </el-card>

    <!-- 添加分类对话框 -->
    <add-cate-dialog
      :addCateDialogVisible.sync="addCateDialogVisible"
      :parentCateList="parentCateList"
    ></add-cate-dialog>
    <!-- 修改分类名称对话框 -->
    <edit-cate-dialog
      :editCateDialogVisible.sync="editCateDialogVisible"
      :cate_id="cat_id"
      :cate_name.sync="cat_name"
    ></edit-cate-dialog>
  </div>
</template>

<script>
import AddCateDialog from "../dialog/AddCateDialog";
import EditCateDialog from "../dialog/EditCateDialog";
import { getCateList, getCateListType, deleteCate } from "network/users.js";
export default {
  components: {
    AddCateDialog,
    EditCateDialog
  },
  data() {
    return {
      columns: [
        { label: "分类名称", prop: "cat_name" },
        {
          label: "是否有效",
          type: "template",
          template: "isok"
        },
        {
          label: "排序",
          type: "template",
          template: "order"
        },
        {
          label: "操作",
          type: "template",
          template: "operation"
        }
      ],
      addCateDialogVisible: false,
      parentCateList: [],
      editCateDialogVisible: false,
      cat_name: "",
      cat_id: null,
      removeId: 0
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    getCateList() {
      getCateList().then(res => {
        console.log("-----");
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("获取商品分类失败");
        }
        this.$store.state.catelist = res.data.result;
        this.$store.state.cateTotal = res.data.total;
      });
    },
    handleSizeChange(newPagesize) {
      this.$store.state.cateQueryInfo.pagesize = newPagesize;
      this.getCateList();
    },
    handleCurrentChange(newPagenum) {
      this.$store.state.cateQueryInfo.pagenum = newPagenum;
      this.getCateList();
    },
    showAddCateDialog() {
      getCateListType({ type: 2 }).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取商品数据失败");
        }
        console.log(res);
        this.parentCateList = res.data;
      });
      this.addCateDialogVisible = true;
    },
    showEditCateDialog(cate) {
      this.cat_name = cate.cat_name;
      this.cat_id = cate.cat_id;
      this.editCateDialogVisible = true;
    },
    removeCateById(id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCate(id).then(res => {
            if (res.meta.status !== 200) {
              return this.$message.error("删除分类失败");
            }
            this.$message({
              type: "success",
              message: "删除分类成功!"
            });
            this.getCateList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.treeTable {
  margin-top: 15px;
}
</style>