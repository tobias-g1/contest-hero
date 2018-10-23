<template>
    <el-tooltip class="item" effect="dark" :content="text" placement="top">
        <i class="material-icons tool-tip"> help_outline</i>
    </el-tooltip>
</template>
<script>
export default {
  name: 'selected-winner',
  props: {
    text: String
  }
}
</script>
<style>

.tool-tip {
   vertical-align: middle;
   font-size: 22px;
   color: #606266;
}

</style>
