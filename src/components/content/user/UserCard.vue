<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfoQuery" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialog">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表页 -->
      <el-table :data="this.$store.state.userlist" border stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <!-- 这里是父组件user的作用域，
            但是想要使用子组件el-table-column的数据，所以要用到作用域插槽-->
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 分配角色 -->

            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.$store.state.queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10, 20, 50]"
        :page-size="this.$store.state.queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.$store.state.total"
      ></el-pagination>
    </el-card>

    <!-- 对话框 -->
    <add-dialog :addDialogVisible.sync="addDialogVisible"></add-dialog>
    <edit-dialog :editDialogVisible.sync="editDialogVisible" :editInfoId="editInfoId"></edit-dialog>
    <set-role-dialog :setRoleDialogVisible.sync="setRoleDialogVisible" :userInfo="setRoleInfo"></set-role-dialog>
  </div>
</template>

<script>
import AddDialog from "../dialog/AddDialog";
import EditDialog from "../dialog/EditDialog";
import SetRoleDialog from "../dialog/SetRoleDialog";

// 网络请求方法
import { userStateChange, getUserList, removeUserById } from "network/users.js";
export default {
  components: {
    AddDialog,
    EditDialog,
    SetRoleDialog
  },

  computed: {
    // inputy与vuex的双向绑定
    queryInfoQuery: {
      get() {
        return this.$store.state.queryInfo.query;
      },
      set(newVal) {
        // 提交突变
        this.$store.commit("getQueryInfoQuery", newVal);
      }
    }
  },
  data() {
    return {
      addDialogVisible: false,
      editDialogVisible: false,
      editInfoId: null,
      setRoleDialogVisible: false,
      setRoleInfo: {}
    };
  },
  methods: {
    getUserList() {
      getUserList().then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取用户列表失败");
        }
        console.log("---------------------");
        console.log(res);
        // 注意！：通过props传递给子组件的属性，不能在子组件内部修改props中的属性值
        // 错误  this.userlist = res.data.users;
        // 错误  this.total = res.data.total;

        // 使用双向绑定
        // this.$emit("update:userlist", res.data.users);
        // this.$emit("update:total", res.data.total);
        // console.log(res);

        // 使用vuex

        this.$store.commit("getUserlist", res.data.users);
        this.$store.commit("getTotal", res.data.total);
      });
    },
    handleSizeChange(newSize) {
      let newSizeInfo = this.$store.state.queryInfo;
      console.log(newSizeInfo);
      newSizeInfo.pagesize = newSize;
      this.$store.commit("getQueryInfo", newSizeInfo);
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      // this.queryInfo.pagenum = newPage;
      let newPageInfo = this.$store.state.queryInfo;
      newPageInfo.pagenum = newPage;
      this.$store.commit("getQueryInfo", newPageInfo);
      this.getUserList();
    },
    userStateChange(userinfo) {
      userStateChange(userinfo).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("更新用户状态失败");
        }
        console.log(res);
        return this.$message.success("更新用户状态成功");
      });
    },
    showEditDialog(id) {
      console.log(id);
      this.editInfoId = id;
      this.editDialogVisible = true;
    },
    // 删除用户
    removeUserById(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(id);
          removeUserById(id).then(res => {
            if (res.meta.status !== 200) {
              return this.$message.error("删除用户失败");
            }
            this.$message({
              type: "success",
              message: "删除用户成功!"
            });
            this.$store.state.queryInfo.pagenum = 1;
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    setRole(userInfo) {
      this.setRoleDialogVisible = true;
      this.setRoleInfo = userInfo;
      console.log(this.setRoleInfo);
    },
    addUserDialog() {
      this.addDialogVisible = true;
      console.log(this.addDialogVisible);
    }
  }
};
</script>

<style>
</style>