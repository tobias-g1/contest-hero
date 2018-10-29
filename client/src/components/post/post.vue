<template>
    <div>
      <div vih> <div v-html="adjustedPost"></div> </div>
    </div>
</template>

<script>

import marked from 'marked'

export default {
  name: 'post',
  props: {
    postbody: String
  },
  computed: {
    adjustedPost: function () {
      let body = this.postbody

      // Remove contest hero contest footer link from post when viewing on contest hero

      body = body.replace(/<p class="ch-footer">.*<\/p>/gm, '')

      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: true,
        sanitize: false,
        smartLists: true,
        smartypants: true
      })
      return marked(body)
    }
  }
}

</script>
