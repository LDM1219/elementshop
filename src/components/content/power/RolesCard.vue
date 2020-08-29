<template>
  <div>
    <el-card>
      <!-- 添加角色 -->
      <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>

      <el-table :data="this.$store.state.roleslist" border stripe style="width: 100%">
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              :class="['bdbottom',index1===0?'bdtop':'','vcenter']"
              v-for="(item1,index1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2,index2) in item1.children"
                  :key="item2.id"
                  :class="[index2===0?'':'bdtop','vcenter']"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="(item3) in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeRightById(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="280px">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>

            <!-- 删除按钮 -->

            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>

            <!-- 分配权限 -->
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 对话框 -->
    <set-right-dialog
      :setRightDialogVisible.sync="setRightDialogVisible"
      :rightslist="rightslist"
      :defKeys="defKeys"
      :roleId="roleId"
    ></set-right-dialog>
  </div>
</template>

<script>
import setRightDialog from "../dialog/SetRightDialog";
import { getRightsList } from "network/users.js";
export default {
  data() {
    return {
      setRightDialogVisible: false,
      roleId: null,
      defKeys: [],
      rightslist: []
    };
  },
  components: {
    setRightDialog
  },
  methods: {
    showSetRightDialog(role) {
      this.roleId = role.id;
      this.rightslist = [];
      this.defKeys = [];
      getRightsList().then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取用户权限失败");
        }
        this.rightslist = res.data;
        this.getLeafKeys(role, this.defKeys);
        this.setRightDialogVisible = true;
      });
    },
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach(item => this.getLeafKeys(item, arr));
    }
  }
};
</script>

<style lang='less' scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>