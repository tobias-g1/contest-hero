<template>
  <div class="prize-container">
    <span class="prize-value">{{ prize.value }}</span>
    <span class="prize-type"> {{ prize.type }}</span>
  </div>
</template>

<script>
export default {
  name: 'prize',
  props: {
    prize: Object
  }
}
</script>

<style scoped src='@/components/prize/prize.css'>

</style>
