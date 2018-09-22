<template>
    <div class="comment-container">
        <img class="comment-image" :src="comment.profile.profile_image" alt="">
        <div class="comment-details">
            <span class="comment-author">{{ comment.author }} says:</span>
            <span class="comment-body">{{ comment.body }}</span>
        </div>
    </div>
</template>

<script>
    import {
        Client
    } from 'dsteem'
    
    const client = new Client('https://api.steemit.com')
    
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

        }
    }
</script>

<style scoped>
    .comment-container {
        background: white;
        padding: 20px;
        margin-bottom: 15px;
        display: inline-flex;
        box-shadow: -1px 2px 10px #d4d4d4;
        width: -webkit-fill-available;
        border-radius: 5px;
    }
    
    .comment-details {
        padding-left: 10px;
    }
    
    .comment-author {
        display: block;
        font-weight: bold;
        font-size: 13px;
    }
    
    .comment-body {
        font-size: 14px;
    }
    
    .comment-image {
        border: 2px solid white;
        border-radius: 50px;
        height: 50px;
        box-shadow: -1px 2px 10px #d4d4d4;
    }
</style>
