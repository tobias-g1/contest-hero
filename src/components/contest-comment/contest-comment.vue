<template>
    <div class="comment-container">
        <img class="comment-image" :src="comment.profile.profile_image" alt="" v-on:error="imageLoadError">
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

  },
  methods: {
    imageLoadError: function () {
      this.comment.profile.profile_image = 'https://www.wonderplugin.com/videos/demo-image0.jpg'
    }
  }
}
</script>

<style src='@/components/contest-comment/contest-comment.css'></style>
