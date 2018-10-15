<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
      <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> How to select your winners</h1>
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices velit vel volutpat auctor. Etiam nulla nulla, convallis a iaculis a, faucibus sit amet tortor. Vivamus risus massa, mollis sit amet ligula nec, Nulla nec pellentesque orci.
          Vestibulum dignissim leo commodo felis dignissim rhoncus. Phasellus vitae magna a nunc imperdiet commodo at eu turpis.</p>
      </div>
      <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Contest Entries</h1>
      <div class="entry-container">
        <entrycard @setPlace='setPlace' v-for="(entry, index) in contest.entries" :key="index" :entry="entry" />
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
      <div class="header-options">
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Your Winners</h1>
        <div> <button class="btn btn-outline" @click="showSelectionDialog = true">Randomise</button><button @click="setWinners()" class="btn btn-fill">Save</button></div>
      </div>
      <selectedwinner @deleteWinner='onDeleteWinner' v-for="(winner, index) in sortedWinners" :key="index" :winner="winner" />
    </el-col>
<el-dialog title="Randomise Winners" :visible.sync="showSelectionDialog" width="30%" v-if="showSelectionDialog === true">
  <span>Randomising your winners will remove your current selections, please select the amount of winners you would like to create below</span>
   <el-input-number style="display: block; margin-top: 15px;" v-model="randomCount" controls-position="right" :min="1" :max="100"></el-input-number>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="showSelectionDialog = false, getRandomWinners(randomCount)">Confirm</el-button>
  </span>
</el-dialog>

  </el-row>
</template>

<script>
import selectedwinner from '@/components/winner-selection/winner-selection.vue'
import entrycard from '@/components/entry-card/entry-card.vue'
import contestsService from '@/services/contests.js'
import entriesService from '@/services/entries.js'
import { mapGetters } from 'vuex'

export default {
  name: 'select-winner',
  components: {
    selectedwinner,
    entrycard
  },
  data () {
    return {
      contest: {
        author: null,
        permlink: null,
        contestId: null,
        data: null,
        entries: null
      },
      winners: [],
      showSelectionDialog: false,
      randomCount: 0
    }
  },
  computed: {
    sortedWinners: function () {
      return _.orderBy(this.winners, 'place', 'asc')
    },
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
    },
    setPlace (entry) {
      if (this.winners.filter(value => value.entry_details.permlink === entry.entry.permlink).length > 0) {

      } else {
        this.winners.push({
          'entry_details': entry.entry,
          'place': entry.place
        })
      }
    },
    onDeleteWinner (winner) {
      this.winners.splice(this.winners.findIndex(item => item.entry_details._id === 'winner._id'), 1)
    },
    async setWinners () {
      await contestsService.updateWinners({
        id: this.contest.data._id,
        winners: this.winners
      })
    },
    getRandomWinners (count) {
      this.winners = []
      let random = _.shuffle(this.contest.entries)
      let randomList = random.splice(0, count)
      randomList.forEach(element => {
        this.winners.push({
          'entry_details': element,
          'place': 1000
        })
      })
    }
  },
  mounted () {
    this.loadContent()
  }
}
</script>

<style scoped src='@/pages/select-winner/select-winner.css'>

</style>
