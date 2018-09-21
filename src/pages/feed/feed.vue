<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <filterpanel @messageSent='onMessageSent' />
    </el-col>
    <el-col :span="20">
  
      <h1> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> All Contests</h1>
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
  .about-banner {
    background-color: #ff1480;
    height: 200px;
    color: white;
    text-align: center;
    background-image: url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' hei…6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E);
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 18px;
    padding: 0px 150px;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: bold;
  }
</style>
