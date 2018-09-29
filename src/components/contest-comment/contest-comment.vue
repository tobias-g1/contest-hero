<template>
  <div class="comment-container">
    <img class="comment-image" :src="profileImage" alt="" v-on:error="setDefault">
    <div class="comment-details">
      <span class="comment-author">{{ comment.author }} says:</span>
      <VueMarkdown class="comment-body" :source="comment.body"></VueMarkdown>
    </div>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  
  export default {
    name: 'comment',
    components: {
      VueMarkdown
    },
    props: {
      comment: Object
    },
    computed: {
      profileImage: function() {
        let userJSON = JSON.parse(this.comment.authorDetails.json_metadata)
        let profileImage;
         ('image' in userJSON) ? ((userJSON.profile.profile_image != undefined) ? profileImage = userJSON.profile.profile_image : profileImage = require('@/assets/post-placeholder.png')) : profileImage = require('@/assets/post-placeholder.png')
        return profileImage
      }
    },
    methods: {
      setDefault: function() {
        this.profileImage = require('@/assets/profile-placeholder.png')
      }
    }
  }
</script>

<style src='@/components/contest-comment/contest-comment.css'>
  
</style>
