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
export default {
  name: 'other-winner-panel',
  props: {
    otherWinners: Object
  },
  data () {
    return {

    }
  }
}
</script>
<style src='@/components/other-winners/other-winners.css'>
