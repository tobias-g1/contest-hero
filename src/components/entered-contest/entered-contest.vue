<template>
  <div class="entry-container">
    <div class="entry-details">
      <div>
        <div class="author-image-container">
      <img class="author-image" :src="authorImage" alt="">
      </div>
       <span class="enter-author"><strong> {{ comment.author }} </strong> has entered this contest</span>
      </div>
      <router-link :to="postLink"><button class="btn btn-outline">View</button></router-link>
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
  computed: {
    postLink: function () {
      return `/view-entry/${this.comment.author}/${this.comment.permlink}`
    },
    authorImage: function () {
      return `https://steemitimages.com/u/${this.comment.author}/avatar`
    }
  }
}
</script>

<style scoped src='@/components/entered-contest/entered-contest.css'></style>
