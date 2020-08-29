<template>
  <!-- 添加参数的对话框 -->
  <el-dialog
    title="'添加'+titleText"
    :visible.sync="visible"
    width="50%"
    @close="addCateDialogClosed"
  >
    <!-- 内容主体区域 -->
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelAddCate">取 消</el-button>
      <el-button type="primary" @click="addCate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>