<template>
  <div class="entry-container">
    <div class="entry-details">
      <span class="enter-author"><strong> {{ comment.author }} </strong> has entered this contest</span>
      <a :href="postLink"><i class="material-icons">keyboard_arrow_right</i></a>
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
      postLink: function() {
        return `#/view-entry/${this.comment.author}/${this.comment.permlink}`
      }
    }
  }
</script>

<style scoped src='@/components/entered-contest/entered-contest.css'>
  
</style>
