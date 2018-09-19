<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <filteroptions/>
    </el-col>
    <el-col :span="18">
      <h1>All Contests</h1>
      <div class="grid-content">
        <el-row :gutter="20">
          <el-col v-for="(messages, index) in messages" :span="8" :key="index">
            <feeditem :post="messages" />
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  // @ is an alias to /src
  import feeditem from '@/components/feed/feed-item.vue'
  import filteroptions from '@/components/feed/filter-options.vue'
  import {
    Client
  } from 'dsteem'
  
  const client = new Client('https://api.steemit.com')
  
  export default {
    name: 'feed',
    components: {
      feeditem,
      filteroptions
    },
    data() {
      return {
        messages: [],
        imageTemp: 'https://e-fisiomedic.com/wp-content/uploads/2013/11/default-placeholder-1024x1024.png'
      }
    },
    mounted() {
      this.getPostsByTag();
    },
    methods: {
      getPostsByTag: function() {
        client.database.getDiscussions('created', {
          tag: 'utopian-io',
          limit: 100
        }).then(discussions => {
          this.messages = discussions
        })
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .el-col {
    border-radius: 4px;
  }
  
  .bg-purple-dark {
    background: #99a9bf;
  }
  
  .bg-purple {
    background: #d3dce6;
  }
  
  .bg-purple-light {
    background: #e5e9f2;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  
  .row-bg {
    padding: 10px 0;
  }
</style>
