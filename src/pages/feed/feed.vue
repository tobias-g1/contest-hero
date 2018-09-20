<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <filterpanel/>
    </el-col>
    <el-col :span="18">
      <h1> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> All Contests</h1>
      <div class="grid-content">
        <el-row :gutter="20">
          <el-col v-for="(messages, index) in messages" :span="8" :key="index">
            <postcard :post="messages" />
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  // @ is an alias to /src
  import postcard from '@/components/feed/post-card/post-card.vue'
  import filterpanel from '@/components/feed/filter-panel/filter-panel.vue'
  import {
    Client
  } from 'dsteem'
  
  const client = new Client('https://api.steemit.com')
  
  export default {
    name: 'feed',
    components: {
      postcard,
      filterpanel
    },
    data() {
      return {
        messages: []
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
  
</style>
