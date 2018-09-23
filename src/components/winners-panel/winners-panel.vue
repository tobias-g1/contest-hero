<template>
    <div class="winners-panel-container">

        <div class="winners-details">
            <img class="winners-medal" src="@/assets/medals/1st.png" alt="">
            <img class="winner-image" :src="winners.image" alt="">
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
  data () {
    return {

    }
  },
  computed: {
    adjustedPost: function () {}
  }
}
</script>

<style>
    .winners-panel-container {
        background: white;
        padding: 20px;
        border-radius: 5px;
        -webkit-box-shadow: rgba(0, 0, 0, 0.19) 0 0 8px 0;
        box-shadow: rgba(0, 0, 0, 0.19) 0 0 8px 0;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        margin: 15px;
    }

    .winners-details {
      display: flex;
    align-items: center;
}

    .winners-medal {
        height: 75px;
    }

    .position-text {
        display: inline-flex;
        padding: 0 20px;
    }

</style>
