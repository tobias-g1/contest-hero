<template>
<div class="post-card">
        <img class="post-image" v-bind:src="image" alt="">
        <span> {{ post.title }} </span>
        <div class="post-options">
            <div class="post-item">{{ post.children }}</div>
            <div class="post-item">{{ post.net_votes }}</div>
        </div>
        <a v-bind:href="postLink">View</a>
</div>
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

.post-card {
    background: white;
    padding: 15px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px #06011e33;
    width: 27%;
    margin: 13px;
    vertical-align: middle;
    height: 200px;
}

    
    .post-options {
        display: flex;
    }
    
    .post-option {
        display: inline-flex;
    }
    
    .post-image {
           max-width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    max-height: 55%;
    border-radius: 5px;
}

</style>

