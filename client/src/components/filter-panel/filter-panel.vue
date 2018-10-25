<template>
<div class="feed-bar">
  <div class="filter-options">
    <span class="option" v-bind:class="[ activecategory === 'all' ? 'active' : '' ]" @click="getContests(), activecategory='all'">All Contests</span>
    <span class="option" v-bind:class="[ activecategory === 'writing' ? 'active' : '' ]" @click="getFilteredContests('writing'), activecategory='writing'">Writing Contests</span>
    <span class="option" v-bind:class="[ activecategory === 'design' ? 'active' : '' ]" @click="getFilteredContests('design'), activecategory='design'">Design Contests</span>
    <span class="option" v-bind:class="[ activecategory === 'photo' ? 'active' : '' ]" @click="getFilteredContests('photo'), activecategory='photo'">Photo Contests</span>
    <span class="option" v-bind:class="[ activecategory === 'giveway' ? 'active' : '' ]" @click="getFilteredContests('giveaway'), activecategory='giveway'">Giveaways</span>
    <span class="option" v-bind:class="[ activecategory === 'other' ? 'active' : '' ]" @click="getFilteredContests('other'), activecategory='other'">Other</span>
  </div>
    <el-select v-model="sortOrder" placeholder="Select Category">
                        <el-option label="Newest" default value="newest"></el-option>
                        <el-option label="Older" value="oldest"></el-option>
                    </el-select>
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
      sortOrder: 'newest'
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
        sortOrder: this.sortOrder
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
      const response = await contestsServices.getContests(this.sortOrder)
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
  },
  watch: {
    sortOrder () {
      (this.activecategory === 'all') ? this.getContests() : this.getFilteredContests(this.activecategory)
    }
  }
}
</script>

<style src='@/components/filter-panel/filter-panel.css'>

</style>
