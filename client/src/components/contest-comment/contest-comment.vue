<template>
  <div class="comment-container">
    <img class="comment-image" :src="commentProfileImage" alt="">
    <div class="comment-details">
      <span class="comment-author">{{ comment.author }}</span>
      <markdownpanel class="comment-body" :postbody="comment.body" />
      <postoptions :type="'comment'" :post="comment" />
    </div>
  </div>
</template>

<script>

import postoptions from '@/components/post-options/post-options.vue'
import markdownpanel from '@/components/markdown-panel/markdown-panel.vue'

export default {
  name: 'comment',
  components: {
    postoptions,
    markdownpanel
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
