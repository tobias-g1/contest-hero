<template>
  <el-card class="box-card">
        <span>{{title}}</span>
    </el-card>
</template>

<script>
    export default {
        name: 'feed-item',
        props: {
            title: String
        }
    }
</script>

<style scoped>
.el-card {
        width: 33%;
    min-height: 100px;
    display: inline-flex;
    justify-content: center;
}
</style>

