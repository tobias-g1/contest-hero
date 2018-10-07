<template>
    <div class="author-container">
        <img :src="authorImage" @error="setDefault">
        <div class="author-details">
        <span class="author-name"> {{ authorName }} </span>
        <span class="author-bio "> {{ authorBio }} </span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'about-author',
  props: {
    authorName: String,
    authorBio: String
  },
  computed: {
    authorImage: function () {
      return `https://steemitimages.com/u/${this.authorName}/avatar`
    }
  }
}
</script>

<style scoped src='@/components/about-author/about-author.css'></style>
