<template>
    <div class="winners-panel-container">
    
        <div class="winners-details">
            <img class="winners-medal" src="@/assets/medals/1st.png" alt="">
            <img class="winners-image" src="@/assets/gradient-circle.png" alt="">
            <span class="position-text">{{ winners.author }} was chosen in {{ winners.place }} place</span>
        </div>
        <button class="btn btn-outline">View</button>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    
    export default {
        name: 'winner-panel',
        props: {
            winners: Object
        },
        data() {
            return {
    
            }
        },
        computed: {
            adjustedPost: function() {}
        }
    }
</script>

<style>
    .winners-panel-container {
        background: white;
        padding: 20px;
        border-radius: 5px;
        -webkit-box-shadow: 0 0 10px 2px #f1f1f1;
        box-shadow: 0 0 10px 2px #f1f1f1;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .winners-details {
        display: flex;
        align-items: center;
    }
    
    .winners-medal {
        height: 65px;
    }

    .winners-image {
            width: 50px;
    margin-left: 20px;
    border: 2px solid white;
    }
    
    .position-text {
        display: inline-flex;
        padding: 0 20px;
    }
</style>
