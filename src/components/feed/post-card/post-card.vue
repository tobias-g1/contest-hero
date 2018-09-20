<template>
    <el-card class="box-card">
        <img class="post-image" v-bind:src="image" alt="">
        <span> {{ post.title }} </span>
        <div class="post-options">
            <div class="post-item">{{ post.children }}</div>
            <div class="post-item">{{ post.net_votes }}</div>
            
        </div>
        <a v-bind:href="postLink">View</a>
    </el-card>
</template>

<script>
    export default {
        name: 'feed-item',
        props: {
            post: Object
        },
        computed: {
            image: function() {
                let profileImage = JSON.parse(this.post.json_metadata);
                profileImage = profileImage.image[0]
                return profileImage
            },
            postLink: function() {
                let postLink = `#/contest/${this.post.author}/${this.post.permlink}`
                return postLink;    
            }
        }
    }
</script>

<style scoped>
    .el-card {
        min-height: 100px;
        display: inline-flex;
        justify-content: center;
        text-align: center;
        padding: 15px;
        flex: 1;
        width: -webkit-fill-available;
        min-height: 265px;
        justify-content: center;
        display: flex;
        text-align: center;
    }
    
    .post-options {
        display: flex;
    }
    
    .post-option {
        display: inline-flex;
    }
    
    .post-image {
        max-width: 100%;
        display: flex;
    }
</style>

