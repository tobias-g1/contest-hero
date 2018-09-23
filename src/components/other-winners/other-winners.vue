<template>
    <div class="other-winners-panel-container">
        <div class="otherwinners-details">
            <img class="other-winner-image" src="ithe.image" alt="">
            <span class="other-winner-author">{{ otherWinners.author }} </span>
        </div>
        <button class="btn btn-outline">View</button>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    
    export default {
        name: 'other-winner-panel',
        props: {
            otherWinners: Object
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
    .other-winners-panel-container {
        background: white;
        padding: 20px;
        border-radius: 5px;
        -webkit-box-shadow: 0 0 10px 2px #f1f1f1;
        box-shadow: 0 0 10px 2px #f1f1f1;
        display: inline-flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        margin: 15px;
        flex-direction: row;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin: 10px;
        min-width: 223px;
    }
    
    .other-winners-details {
        display: flex;
        align-items: center;
    }
    
    .other-winner-author {
        display: inline-flex;
        padding: 0 20px;
    }
</style>


