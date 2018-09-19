<template>
    <div class="feed-item">
        <img v-bind:src="img" alt="">
        <h3>{{title}}</h3>
    </div>
</template>

<script>
    export default {
        name: 'feed-item',
        props: {
            title: String,
            img: String
        }
    }
</script>

<style scoped>
    .feed-item {
        background: white;
            width: 30%;
            display: inline-flex;
            flex-direction: column;
            min-width: 250px;
            margin-right: 15px;
    }

    .feed-item img {
    width: 65%;
    }
</style>

