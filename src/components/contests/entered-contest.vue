<template>
    <div class="entry-container">
        <img class="entry-image" src="https://i.cricketcb.com/stats/img/faceImages/8364.jpg" alt="">
        <div class="entry-details">
            <span class="enter-author"><strong>{{ comment.author }}</strong> has entered this comment</span>
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
        justify-content: center;
        flex-direction: row;
        align-items: center;
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
        box-shadow: -1px 2px 10px #d4d4d4;
    }
</style>
