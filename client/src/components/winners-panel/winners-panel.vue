<template>
  <div class="winner-card-container">
        <div class="winner-details-wrapper">
            <div class="winner-image-container">
                <img class="winner-image" :src="selectedProfileImage" alt="">
                <img v-if="medal" class="user-medal" :src="medal">
            </div>
            <div class="winner-selection-details">
                <span class="winner-text">{{ winner.entry_details.author }}</span>
                <span class="title-text">{{ winner.entry_details.title }}</span>
            </div>
                </div>
<router-link :to="winnerLink"><button class="btn btn-outline">View Entry</button></router-link>

  </div>
</template>

<script>
export default {
  name: 'winner',
  props: {
    winner: Object
  },
  computed: {
    selectedProfileImage: function () {
      return `https://steemitimages.com/u/${this.winner.entry_details.author}/avatar`
    },
    winnerLink: function () {
      return `/view-entry/${this.winner.entry_details.author}/${this.winner.entry_details.permlink}`
    },
    medal: function () {
      let medal

      switch (this.winner.place) {
        case 1:
          medal = require('@/assets/medals/1st.png')
          break
        case 2:
          medal = require('@/assets/medals/2nd.png')
          break
        case 3:
          medal = require('@/assets/medals/3rd.png')
          break
        case 1000:
          medal = null
          break
      }
      return medal
    }
  }
}
</script>

<style src='@/components/winners-panel/winners-panel.css'></style>
