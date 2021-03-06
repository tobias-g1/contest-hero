<template>

  <!-- Post Controls -->

  <div v-if="post.active_votes" class="stats-container">
    <i class="material-icons stat-option vote vote-pulse" :class="{ voted: voted }" @click=" (user) ? dialogVisible = true : ''">favorite</i> <span class="icon-label">{{ post.active_votes.length }}</span>
    <i class="material-icons stat-option">attach_money</i> <span class="icon-label">{{ payout.toString().slice(0, 4) }}</span>
    <i v-if="type !== 'comment'" @click="(user) ? resteemVisible = true : ''" class="material-icons stat-option reblog vote-pulse">repeat</i>
    <p class="time-since" v-if="type === 'full' || type === 'comment'">{{ post.created | moment("from", "now", true) }} ago</p>

    <!-- Voting Dialog -->

    <el-dialog title="Select Vote Percentage" :visible.sync="dialogVisible" width="65%" v-if="dialogVisible === true">
      <div class="slider">
        <el-slider v-model="votePercentage" show-input>
        </el-slider>
      </div>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="dialogVisible = false, vote($store.state.steemconnect.user.name, post.author, post.permlink, votePercentage * 100)">Confirm</el-button>
            </span>
    </el-dialog>

        <!-- Confirm Resteem Dialog -->

            <el-dialog title="Confirm Reblog" :visible.sync="resteemVisible" width="50%" v-if="resteemVisible === true">
              <p>This post will appear on your feed on other Steem sites. This action cannot be reversed.</p>
      <span slot="footer" class="dialog-footer">
              <el-button @click="resteemVisible = false">Cancel</el-button>
              <el-button type="primary" @click="resteemVisible = false, reblog($store.state.steemconnect.user.name, post.author, post.permlink)">Confirm</el-button>
            </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'post-options',
  data () {
    return {
      dialogVisible: false,
      resteemVisible: false,
      votePercentage: 100,
      voteCount: this.post.active_votes.length
    }
  },
  props: {
    post: Object,
    type: String
  },
  computed: {
    ...mapGetters('steemconnect', ['user']),
    voted: function () {
      let voted
      if (this.user) {
        this.post.active_votes.forEach(vote => {
          if (vote.voter === this.user.name) {
            voted = true
          }
        })
        return voted
      }
    },
    payout: function () {
      let postCreationDate = moment(this.post.created)._d
      let currentDate = moment()._d
      let timesince = moment(currentDate).diff(postCreationDate, 'minutes')
      if (timesince > 10080) {
        return parseFloat(this.post.curator_payout_value) + parseFloat(this.post.total_payout_value)
      } else {
        return this.post.pending_payout_value
      }
    }
  },
  methods: {
    vote (currentUser, author, permlink, weight) {
      this.$store.commit('setLoading', true)
      this.$steemconnect.vote(currentUser, author, permlink, weight, (err) => {
        (err) ? this.$notify({
          title: 'Error',
          message: 'Sorry, there was an error with your vote.',
          type: 'error'
        }) : this.voted = true
        this.voteCount = this.post.active_votes.length
        this.voteCount++
        this.$store.commit('setLoading', false)
        this.$notify({
          title: 'Success',
          message: 'Your vote has been cast successfully',
          type: 'success'
        })
      })
    },
    reblog (currentUser, author, permlink) {
      this.$store.commit('setLoading', true)
      this.$steemconnect.reblog(currentUser, author, permlink, (err) => {
        (err) ? this.$notify({
          title: 'Error',
          message: 'Sorry, there was an error reblogging this post',
          type: 'error'
        }) : this.$notify({
          title: 'Success',
          message: 'You have successfully reblogged this post',
          type: 'success'
        })
        this.$store.commit('setLoading', false)
      })
    }
  }
}
</script>

<style src='@/components/post-options/post-options.css'>

</style>
