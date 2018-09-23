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

<style scoped src='@/components/entered-contest/entered-contest.css'></style>
