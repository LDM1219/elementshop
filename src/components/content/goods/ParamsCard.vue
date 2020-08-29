<template>
  <div>
    <el-card>
      <el-alert title="注意：只允许为第三级的分类设置相关的参数" type="warning" :closable="false" show-icon></el-alert>

      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            v-model="selectedCateKeys"
            :options="catelist"
            :props="{ expandTrigger: 'hover', value:'cat_id',label:'cat_name',children:'children'}"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtnDisabled"
            @click="addDialogVisible=true"
          >添加参数</el-button>
          <el-table :data="manyTableData" border stripe>
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-tag
                  v-for="(item,index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="handleCloed(index,scope.row)"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeParams(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtnDisabled"
            @click="addDialogVisible=true"
          >添加属性</el-button>
          <el-table :data="onlyTableData" border stripe>
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-tag
                  v-for="(item,index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="handleCloed(index,scope.row)"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeParams(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数的对话框 -->
    <el-dialog
      :title="'添加'+titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改参数的对话框 -->
    <el-dialog
      :title="'修改'+titleText"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCateList,
  getCateAttributes,
  addParams,
  getEditAttr,
  editParams,
  removeParamsById,
  putAttr
} from "network/users.js";
export default {
  data() {
    return {
      catelist: [],
      // 级联选择框双向绑定到的数组
      selectedCateKeys: [],
      activeName: "many",
      manyTableData: [],
      onlyTableData: [],
      addDialogVisible: false,
      addForm: { attr_name: "" },
      addFormRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" }
        ]
      },
      editDialogVisible: false,
      editForm: { attr_name: "" },
      editFormRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true;
      }
      return false;
    },
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[[2]];
      }
      return null;
    },
    titleText() {
      if (this.activeName === "many") {
        return "动态参数";
      } else {
        return "静态属性";
      }
    }
  },
  created() {
    this.getCateList();
  },
  methods: {
    getCateList() {
      getCateList().then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取商品分类失败");
        }
        console.log(res);
        this.catelist = res.data.result;
      });
    },
    handleChange() {
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
        this.manyTableData = [];
        this.onlyTableData = [];
        return;
      }
      console.log(this.selectedCateKeys);
      this.getCateAttributes();
    },
    handleClick() {
      if (this.selectedCateKeys.length === 3) {
        this.getCateAttributes();
      }
    },
    getCateAttributes() {
      // 根据所选分类的ID和当前所处的面板，获取对应的参数
      getCateAttributes(this.cateId, { params: { sel: this.activeName } }).then(
        res => {
          if (res.meta.status !== 200) {
            return this.$message.error("获取参数列表失败");
          }
          res.data.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
            // 让每一行都有自己的inputVisible和inputValue，彼此之间互不干扰
            item.inputVisible = false;
            item.inputValue = "";
          });
          console.log(res.data);
          if (this.activeName === "many") {
            this.manyTableData = res.data;
          } else {
            this.onlyTableData = res.data;
          }
        }
      );
    },
    showEditDialog(id) {
      getEditAttr(id, this.cateId, {
        params: { attr_sel: this.activeName }
      }).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取参数信息失败");
        }
        this.editForm = res.data;
        this.editDialogVisible = true;
      });
    },

    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    addParams() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return;
        addParams(this.cateId, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        }).then(res => {
          if (res.meta.status !== 201) {
            return this.$message.error("添加参数失败");
          }
          this.$message.success("添加参数成功");
          this.addDialogVisible = false;
          this.getCateAttributes();
        });
      });
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    editParams() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return;
        editParams(this.cateId, this.editForm.attr_id, {
          attr_name: this.editForm.attr_name,
          attr_sel: this.activeName
        }).then(res => {
          if (res.meta.status !== 200) {
            return this.$message.error("修改参数失败");
          }
          this.$message.success("修改参数成功");
          this.editDialogVisible = false;
          this.getCateAttributes();
        });
      });
    },
    // 根据ID删除对应的参数
    removeParams(attr_id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeParamsById(this.cateId, attr_id).then(res => {
            console.log(res);
            if (res.meta.status !== 200) {
              return this.$message.error("删除参数失败");
            }
            this.$message({
              type: "success",
              message: "删除参数成功!"
            });

            this.getCateAttributes();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    saveAttrVals(row) {
      // 发起请求保存操作
      putAttr(this.cateId, row.attr_id, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(" ")
      }).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("修改参数项失败");
        }
        this.$message.success("修改参数项成功");
      });
    },
    handleInputConfirm(row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = "";
        row.inputVisible = false;
        return;
      }
      row.attr_vals.push(row.inputValue.trim());
      row.inputValue = "";
      row.inputVisible = false;
      this.saveAttrVals(row);
      console.log("ok");
    },
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // 删除对应的参数可选项
    handleCloed(index, row) {
      row.attr_vals.splice(index, 1);
      this.saveAttrVals(row);
    }
  }
};
</script>

<style scoped>
.cat_opt {
  margin: 15px 0;
}
.el-tag {
  margin-right: 10px;
}
.input-new-tag {
  width: 120px;
}
</style>