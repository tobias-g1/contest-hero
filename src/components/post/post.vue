<template>
    <div class="post-container">
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
            adjustedPost: function() {
              let adjustedPost = this.postbody

              // Strip HTML from post to prevent images not being rendered correctly

              adjustedPost = adjustedPost.replace(/<(?:.|\n)*?>/gm, '');

              return adjustedPost
            }
        }
    }
</script>

