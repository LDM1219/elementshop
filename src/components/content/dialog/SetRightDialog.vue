<template>
  <el-dialog title="分配权限" :visible.sync="visible" width="50%" @close="setRightDialogClosed">
    <!-- 树形主体区域 -->
    <el-tree
      :data="rightslist"
      :props="treeProps"
      show-checkbox
      default-expand-all
      :default-checked-keys="defKeys"
      node-key="id"
      ref="treeRef"
    ></el-tree>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelSetRightDialog">取 消</el-button>
      <el-button type="primary" @click="allotRights">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRightsList, allotRights, getRolesList } from "network/users.js";
export default {
  data() {
    return {
      visible: this.setRightDialogVisible,
      treeProps: {
        label: "authName",
        children: "children"
      }
    };
  },
  watch: {
    setRightDialogVisible() {
      this.visible = this.setRightDialogVisible;
    }
  },
  props: {
    setRightDialogVisible: {
      default: false,
      type: Boolean
    },
    rightslist: {
      default: function() {
        return [];
      },
      type: Array
    },
    defKeys: {
      default: function() {
        return [];
      },
      type: Array
    },
    roleId: ""
  },
  methods: {
    cancelSetRightDialog() {
      this.$emit("update:setRightDialogVisible", false);
    },
    setRightDialogClosed() {
      this.$emit("update:setRightDialogVisible", false);
    },
    allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];
      const idStr = keys.join(",");
      allotRights(this.roleId, idStr).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("分配权限失败");
        }
        this.$message.success("分配权限成功");
        this.getRolesList();
        this.$emit("update:setRightDialogVisible", false);
      });
    },
    getRolesList() {
      getRolesList().then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取权限列表失败");
        }
        this.$store.commit("getRoleslist", res.data);
      });
    }
  }
};
</script>

<style>
</style>