<template>
    <div class="stats-container">
        <i class="material-icons stat-option vote" :class="{ voted: voted }" @click=" (user) ? dialogVisible = true : ''">favorite</i> <span class="icon-label">{{ post.net_votes }}</span>
        <i class="material-icons stat-option">attach_money</i> <span class="icon-label">{{post.pending_payout_value.slice(0, -3) * 1 }}</span>
        <el-dialog title="Select Vote Percentage" :visible.sync="dialogVisible" width="65%">
            <div class="slider">
                <el-slider v-model="votePercentage" show-input>
                </el-slider>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false, vote($store.state.steemconnect.user.name, post.author, post.permlink, votePercentage * 100)">Confirm</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'post-options',
  data () {
    return {
      voted: false,
      dialogVisible: false,
      votePercentage: 100,
      voteCount: this.post.active_votes.length
    }
  },
  props: ['post'],
  methods: {
    vote (currentUser, author, permlink, weight) {
      this.$store.commit('setLoading', true)

      this.$steemconnect.vote(currentUser, author, permlink, weight, (err) => {
        (err) ? alert(err) : this.voted = true
        this.voteCount = this.post.active_votes.length
        this.voteCount++
        this.$store.commit('setLoading', false)
      })
    },
    checkVote: function () {
      for (let i = 0; i < this.post.active_votes.length; i++) {
        if (this.post.active_votes[i].voter === this.user.name) {
          this.voted = true
        }
      }
    }
  },
  computed: {
    ...mapGetters('steemconnect', ['user'])
  },
  mounted () {
    this.checkVote()
  }
}
</script>

<style src='@/components/post-options/post-options.css'></style>
