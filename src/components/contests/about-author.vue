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

<style scoped>
    .author-container {
        display: inline-flex;

    }

    .author-name {
        font-weight: bold;
        font-size: 15px;
        display: flex;

    }

    .author-bio {
          font-size: 14px;
          display: flex;
    }
    
    .author-details {

      margin: 0 15px;
    }
    
    .author-container img {
        height: 50px;
        min-width: 50px;
        max-width: 50px;
        border: 2px solid white;
        border-radius: 50px;
        box-shadow: 0 0 10px 2px #0000001f;
    }
</style>
