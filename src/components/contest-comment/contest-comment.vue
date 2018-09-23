<template>
    <div class="comment-container">
        <img class="comment-image" :src="comment.profile.profile_image" alt="" v-on:error="imageLoadError">
        <div class="comment-details">
            <span class="comment-author">{{ comment.author }} says:</span>
            <span class="comment-body">{{ comment.body }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'comment',
        components: {
    
        },
        props: {
            comment: Object
        },
        computed: {
    
        },
        methods: {
            imageLoadError: function() {
                this.comment.profile.profile_image = 'https://www.wonderplugin.com/videos/demo-image0.jpg'
            }
        }
    }
</script>

<style scoped src='@/components/contest-comment/contest-comment.css'></style>