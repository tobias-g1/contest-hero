<template>
    <div>
        <VueMarkdown :source="adjustedPost"></VueMarkdown>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'post',
  props: {
    postbody: String
  },
  components: { VueMarkdown },
  computed: {
    adjustedPost: function () {
      let body = this.postbody

      // Remove contest hero contest footer link from post when viewing on contest hero

      body = body.replace(/<p class="ch-footer">.*<\/p>/gm, '')

      // Remove html from post prior to rendering, this was implemented to prevent issues seen previously when trying to render the post

      return body.replace(/<(?:.|\n)*?>/gm, '')
    }
  }
}
</script>
