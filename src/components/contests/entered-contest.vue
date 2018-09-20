<template>
      <div class="entry-container">
                {{ author }} has entered this contest
            </div>
</template>

<script>
  
  export default {
    name: 'entered-contest',
    components: {

    },
    props: {
        author: String
    }
    }
 
</script>

<style scoped>

    
    .entry-container {
        background: white;
        padding: 15px;
        margin-bottom: 10px;
    }
    
  
</style>
