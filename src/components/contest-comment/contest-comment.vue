<template>
    <div class="comment-container">
        <img class="comment-image" :src="comment.profile.profile_image" alt="" v-on:error="setDefault">
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
      setDefault: function() {
      this.comment.profile.profile_image = require('@/assets/profile-placeholder.png')
    }
  }
}
</script>

<style src='@/components/contest-comment/contest-comment.css'></style>
