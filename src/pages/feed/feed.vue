<template>
  <div class="feed">
    <div class="filter-options">
      <h3>Contests</h3>
          <ul>
            <li>Option</li>
            <li>Option</li>
            <li>Option</li>
            <li>Option</li>
            <li>Option</li>
            <li>Option</li>
          </ul>
    </div>
    <div class="posts-container">
      <feeditem v-for="(messages, index) in messages" :key="index" :title="messages.title" :img="imageTemp" />
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import feeditem from '@/components/feed/feed-item.vue'
  import {
    Client
  } from 'dsteem'
  
  const client = new Client('https://api.steemit.com')
  
  export default {
    name: 'feed',
    components: {
      feeditem
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
  .feed {
    width: 100%;
    display: inline-flex;
  }
  
  .filter-options {
    width: 30%;
  }
  
  .posts-container {
    width: 66%;
  }
</style>
