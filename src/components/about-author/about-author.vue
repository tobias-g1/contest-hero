<template>
    <div class="author-container">

        <img v-bind:src="authorImage">
        <div class="author-details">
        <span class="author-name"> {{ authorName }} </span>
        <span> {{ authorBio }} </span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'about-author',
  props: {
    authorName: String,
    authorImage: String,
    authorBio: String
  }
}
</script>

<style scoped src='@/components/about-author/about-author.css'></style>
