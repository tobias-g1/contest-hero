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
      // Strip HTML from post to prevent images not being rendered correctly
      return this.postbody.replace(/<(?:.|\n)*?>/gm, '')
    }
  }
}
</script>
