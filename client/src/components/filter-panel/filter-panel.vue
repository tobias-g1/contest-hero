<template>
  <div class="feed-bar">
    <div class="filter-options">
      <span class="option" v-bind:class="[ activecategory === 'all' ? 'active' : '' ]" @click="getContests(), activecategory='all'">All Contests</span>
      <span class="option" v-bind:class="[ activecategory === 'writing' ? 'active' : '' ]" @click="getFilteredContests('writing'), activecategory='writing'">Writing</span>
      <span class="option" v-bind:class="[ activecategory === 'design' ? 'active' : '' ]" @click="getFilteredContests('design'), activecategory='design'">Design</span>
      <span class="option" v-bind:class="[ activecategory === 'photo' ? 'active' : '' ]" @click="getFilteredContests('photo'), activecategory='photo'">Photo</span>
      <span class="option" v-bind:class="[ activecategory === 'giveway' ? 'active' : '' ]" @click="getFilteredContests('giveaway'), activecategory='giveway'">Giveaways</span>
      <span class="option" v-bind:class="[ activecategory === 'other' ? 'active' : '' ]" @click="getFilteredContests('other'), activecategory='other'">Other</span>
    </div>
    <div class="options-wrapper">
    <el-select class="feed-dropdown" v-model="sortOrder" placeholder="Select Category">
      <el-option label="Newest Contests" default value="newest"></el-option>
      <el-option label="Oldest Contests" value="oldest"></el-option>
    </el-select>
    <el-select class="feed-dropdown" v-model="prizeFilter" placeholder="Select Prize">
      <el-option label="Any Prize" default value="any"></el-option>
      <el-option label="STEEM" default value="STEEM"></el-option>
      <el-option label="SBD" default value="SBD"></el-option>
      <el-option label="Steem Monsters" default value="Steem Monsters"></el-option>
      <el-option label="Other" default value="Other"></el-option>
      <el-option label="None" default value="None"></el-option>
    </el-select>
    </div>
  </div>
</template>

<script>
import contestsServices from '@/services/contests.js'
import dsteem from '@/mixins/dsteem.js'

export default {
  name: 'filter-options',
  data () {
    return {
      activecategory: 'all',
      sortOrder: 'newest',
      prizeFilter: 'any'
    }
  },
  mixins: [dsteem],
  mounted () {
    this.getContests()
  },
  methods: {
    async getFilteredContests (category) {
      const response = await contestsServices.getContestsByCategory({
        category: category,
        sortOrder: this.sortOrder,
        prize: this.prizeFilter
      })
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
    },
    async getContests (category) {
      const response = await contestsServices.getContests({
        sortOrder: this.sortOrder,
        prize: this.prizeFilter
      })
      let messages = []
      response.data.contests.forEach((contest, index) => {
        this.loadPost(contest.author, contest.permlink)
          .then(discussions => {
            contest.blockchain = discussions[0]
            messages.push(contest)
          })
      })
      this.$emit('messageSent', {
        message: messages,
        sortedOrder: this.sortOrder
      })
    }
  },
  computed: {
    filterOptions: function () {
      return `${this.sortOrder}||${this.prizeFilter}`
    }
  },
  watch: {
    filterOptions () {
      (this.activecategory === 'all') ? this.getContests() : this.getFilteredContests(this.activecategory)
    }
  }
}
</script>

<style src='@/components/filter-panel/filter-panel.css'>

</style>
