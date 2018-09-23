<template>
  <div class="entry-container">
    <img class="entry-image" v-bind:src="userImage" alt="" v-on:error="imageLoadError">
    <div class="entry-details">
      <span class="enter-author"><strong>{{ comment.author }}</strong> has entered this contest</span>
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
      imageLoadError: function() {
        let userImage = 'https://www.wonderplugin.com/videos/demo-image0.jpg'
      },
    },
    computed: {
      userImage: function() {
        let userImage = ''
        if (this.comment.profile) {
          if ('profile_image' in this.comment.profile) {
            userImage = this.comment.profile.profile_image
          } else {
            userImage = "https://hlfppt.org/wp-content/uploads/2017/04/placeholder-768x576.png"
          }
          return userImage
        }
      }
    }
  }
</script>

<style scoped src='@/components/entered-contest/entered-contest.css'>
  
</style>
