<template>
  <div class="card">
    <span class="card-header" v-bind:style="imageBackground">
      <div v-bind:class="status === 'Open' ? 'contest_open' : 'contest_closed'" class="status-tag">{{ status }}</div>
      	<span class="card-title">
        	<a v-bind:href="postLink"><h3>{{ post.title }}</h3></a>
      	</span>
    </span>
    <span class="card-summary">
      <postoptions :post="post"/>
  <span class="contest-details">A {{ contestType }} contest created by {{ post.author }} </span>
  </span>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import postoptions from '@/components/post-options/post-options.vue'
  
  export default {
    name: 'post-card',
    props: {
      post: Object
    },
    components: {
      postoptions
    },
    data() {
      return {
        voteweight: 100
      }
    },
    computed: {
      postJSON: function() {
        return JSON.parse(this.post.json_metadata)
      },
      imageBackground: function() {
        let postImage;
        // Check if a post image can be found in the JSON metadata of post and if doesn't exist set a default
        if ('image' in this.postJSON) {
          (this.postJSON.image[0] != undefined) ? postImage = this.postJSON.image[0]: postImage = require('@/assets/post-placeholder.png')
        } else {
          postImage = require('@/assets/post-placeholder.png')
        }
        return `background-image: url(${postImage});`
      },
      postLink: function() {
        return `#/view-contest/${this.post.author}/${this.post.permlink}`
  
      },
      status: function() {
        if (new Date().toJSON().slice(0, 10).replace(/-/g, '/') >= this.postJSON.contest_hero.deadline) {
          return 'Complete'
        } else {
          return 'Open'
        }
      },
      contestType: function() {
        let contestType = 'writing'
        return contestType
      },
      ...mapGetters('steemconnect', ['user']),
    },
  }
</script>

<style scoped src='@/components/post-card/post-card.css'>
  
</style>
