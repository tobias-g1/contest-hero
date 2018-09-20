<template>
      <div class="comment-container">
                {{ body }} has entered this contest
            </div>
</template>

<script>
  
  export default {
    name: 'comment',
    components: {

    },
    props: {
        body: String
    }
    }
 
</script>

<style scoped>

    
    .comment-container {
        background: white;
        padding: 15px;
        margin-bottom: 10px;
    }
    
  
</style>
