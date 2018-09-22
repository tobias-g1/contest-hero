<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <filterpanel @messageSent='onMessageSent' />
    </el-col>
    <el-col :span="24">
      <div class="card-container">
        <postcard v-for="(messages, index) in messages" :key="index" :post="messages" />
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
      this.getAllContests();
    },
    methods: {
      onMessageSent: function(message) {
        this.messages = message.message
      },
      getAllContests: function() {
        client.database.getDiscussions('active', {
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
.card-container {
  max-width: 1100px;
  margin: 0 auto;
}
</style>
