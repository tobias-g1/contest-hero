<template>
    <div class="author-container">
        <img v-bind:src="authorImage">
        <span> {{ authorBio }} </span>
    </div>
</template>

<script>
    export default {
        name: 'about-author',
        props: {
            authorImage: String,
            authorBio: String
        }
    }
</script>

<style scoped>
    .author-container {
        display: inline-flex;
    }
    
    .author-container span {
        font-size: 14px;
        margin: 0 0 0 0.5rem;
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
