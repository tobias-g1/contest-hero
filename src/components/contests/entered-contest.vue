<template>
    <div class="entry-container">
        <img class="entry-image" :src="comment.profile.profile_image" alt="" v-on:error="imageLoadError">
        <div class="entry-details">
            <span class="enter-author"><strong>{{ comment.author }}</strong> has entered this contest</span>
            <i class="material-icons">keyboard_arrow_right</i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'entered-contest',
        components: {
    
        },
        props: {
            comment: Object
        },
        methods: {
            imageLoadError: function() {
                this.comment.profile.profile_image = 'https://www.wonderplugin.com/videos/demo-image0.jpg'
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    .entry-container {
        background: white;
        padding: 20px;
        margin-bottom: 15px;
        display: inline-flex;
        box-shadow: -1px 2px 10px #d4d4d4;
        width: -webkit-fill-available;
        border-radius: 5px;
    }
    
    .entry-details {
        padding-left: 10px;
        display: inline-flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }
    
    .entry-author {
        display: block;
        font-weight: bold;
        font-size: 13px;
    }
    
    .entry-image {
        border: 2px solid white;
        border-radius: 50px;
        height: 50px;
        min-width: 50px;
        max-width: 50px;
        box-shadow: -1px 2px 10px #d4d4d4;
    }
</style>
