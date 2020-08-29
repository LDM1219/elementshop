<template>
  <el-dialog
    title="分配角色"
    :visible.sync="visible"
    width="50%"
    @close="setRightDialogClosed"
    @open="setRightDialogopened"
  >
    <div>
      <p>当前的用户：{{this.userInfo.username}}</p>
      <p>当前的角色：{{this.userInfo.role_name}}</p>
      <span>分配新角色：</span>
      <el-select v-model="selectedRoleId" placeholder="请选择">
        <el-option v-for="item in roleslist" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
      </el-select>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelSetRoleDialog">取 消</el-button>
      <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUserList, getRolesList, saveRoleInfo } from "network/users.js";
export default {
  props: {
    userInfo: {
      type: Object,
      default: function() {
        return {};
      }
    },
    setRoleDialogVisible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      roleslist: [],
      selectedRoleId: "",
      visible: this.setRoleDialogVisible
    };
  },
  watch: {
    setRoleDialogVisible() {
      this.visible = this.setRoleDialogVisible;
    }
  },
  methods: {
    setRightDialogopened() {
      getRolesList().then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取角色列表失败");
        }
        this.roleslist = res.data;
      });
    },
    cancelSetRoleDialog() {
      this.$emit("update:setRoleDialogVisible", false);
    },
    setRightDialogClosed() {
      this.selectedRoleId = "";
      this.$emit("update:setRoleDialogVisible", false);
    },
    saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error("请选择要分配的角色");
      }
      saveRoleInfo(this.userInfo.id, this.selectedRoleId).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("更新角色失败");
        }
        this.$message.success("更新角色成功");
        this.getUserList();
        this.$emit("update:setRoleDialogVisible", false);
      });
    },
    getUserList() {
      getUserList().then(res => {
        if (res.meta.status !== 200)
          return this.$message.error("获取用户列表失败");
        this.$store.commit("getUserlist", res.data.users);
        this.$store.commit("getTotal", res.data.total);
      });
    }
  }
};
</script>

<style>
</style>