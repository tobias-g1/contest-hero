<template>
  <div class="filter-options">
    <span class="option" v-bind:class="[ activecategory === 1 ? 'active' : '' ]" @click="getContests(), activecategory=1">All Contests</span>
    <span class="option" v-bind:class="[ activecategory === 2 ? 'active' : '' ]" @click="getFilteredContests('writing'), activecategory=2">Writing Contests</span>
    <span class="option" v-bind:class="[ activecategory === 3 ? 'active' : '' ]" @click="getFilteredContests('design'), activecategory=3">Design Contests</span>
    <span class="option" v-bind:class="[ activecategory === 4 ? 'active' : '' ]" @click="getFilteredContests('photo'), activecategory=4">Photo Contests</span>
    <span class="option" v-bind:class="[ activecategory === 5 ? 'active' : '' ]" @click="getFilteredContests('giveaway'), activecategory=5">Giveaways</span>
    <span class="option" v-bind:class="[ activecategory === 6 ? 'active' : '' ]" @click="getFilteredContests('other'), activecategory=6">Other</span>
  </div>
</template>

<script>
import contestsServices from '@/services/contests'
import dsteem from '@/mixins/dsteem.js'

export default {
  name: 'filter-options',
  data () {
    return {
      activecategory: 1
    }
  },
  mixins: [dsteem],
  methods: {
    async getFilteredContests (category) {
      const response = await contestsServices.getContestsByCategory(category)
      let messages = []
      response.data.contests.forEach((contest, index) => {
        this.loadPost(contest.author, contest.permlink)
          .then(discussions => {
            contest.blockchain = discussions[0]
            messages.push(contest)
          })
      })
      this.$emit('messageSent', {
        message: response.data.contests
      })
    },
    async getContests (category) {
      const response = await contestsServices.getContests(category)
      let messages = []
      response.data.contests.forEach((contest, index) => {
        this.loadPost(contest.author, contest.permlink)
          .then(discussions => {
            contest.blockchain = discussions[0]
            messages.push(contest)
          })
      })
      this.$emit('messageSent', {
        message: messages
      })
    }
  }
}
</script>

<style src='@/components/filter-panel/filter-panel.css'>

</style>
