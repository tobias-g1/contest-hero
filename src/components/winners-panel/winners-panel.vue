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
export default {
  name: 'winner-panel',
  props: {
    winners: Object
  }
}
</script>

<style src='@/components/winners-panel/winners-panel.css'></style>
