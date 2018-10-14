<template>
 <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="15" :lg="16" :xl="16">
         <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Select a winner</h1>
    </el-col>
 </el-row>

</template>

<script>

import contestsService from '@/services/contests.js'
import entriesService from '@/services/entries.js'
import { mapGetters } from 'vuex'

export default {
  name: 'select-winner',
  data () {
    return {
      contest: {
        author: null,
        permlink: null,
        contestId: null,
        data: null,
        entries: null
      }
    }
  },
  computed: {
    ...mapGetters('steemconnect', ['user'])
  },
  methods: {
    loadContent () {
      this.contest.author = this.$route.params.author
      this.contest.permlink = this.$route.params.permlink
      this.contest.contestId = this.$route.params.contestId
      this.getContestInfo()
    },
    async getContestInfo () {
      const response = await contestsService.getContestByPermlink(this.contest.permlink)
      this.contest.data = response.data.contests[0]
      const entries = await entriesService.getEntriesById(this.contest.contestId)
      this.contest.entries = entries.data.entries
    }
  },
  mounted () {
    this.loadContent()
  }
}
</script>

<style scoped src='@/pages/select-winner/select-winner.css'></style>
