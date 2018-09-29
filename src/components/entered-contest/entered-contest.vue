<template>
  <div class="entry-container">
    <img class="entry-image" :src="profileImage" alt="" @error="setDefault">
    <div class="entry-details">
      <span class="enter-author"><strong> {{ comment.author }} </strong> has entered this contest</span>
      <i class="material-icons">keyboard_arrow_right</i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'entered-contest',
    components: {
  
    },
    props: {
      comment: Object
    },
    methods: {
       setDefault: function() {
        this.profileImage = require('@/assets/profile-placeholder.png')
      }
    },
    computed: {
      profileImage: function() {
        let userJSON = JSON.parse(this.comment.authorDetails.json_metadata)
        let profileImage;
        ('image' in userJSON) ? ((userJSON.profile.profile_image != undefined) ? profileImage = userJSON.profile.profile_image : profileImage = require('@/assets/post-placeholder.png')) : profileImage = require('@/assets/post-placeholder.png')
        return profileImage
      }
    }
  }
</script>

<style scoped src='@/components/entered-contest/entered-contest.css'>
  
</style>
