<template>
  <div class="comment-container">
    <img class="comment-image" :src="commentProfileImage" alt="">
    <div class="comment-details">
      <span class="comment-author">{{ comment.author }}</span>
      <VueMarkdown class="comment-body" :source="comment.body"></VueMarkdown>
      <postoptions :type="'comment'" :post="comment" />
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import postoptions from '@/components/post-options/post-options.vue'

export default {
  name: 'comment',
  components: {
    VueMarkdown,
    postoptions
  },
  props: {
    comment: Object
  },
  computed: {
    commentProfileImage: function () {
      return `https://steemitimages.com/u/${this.comment.author}/avatar`
    }
  }
}
</script>

<style src='@/components/contest-comment/contest-comment.css'></style>
