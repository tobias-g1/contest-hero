<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <filterpanel @messageSent='onMessageSent' @click.native="$store.commit('setLoading', true)" />
    </el-col>
    <el-col :span="24">
      <div v-if="messages[0]" class="card-container">
        <postcard v-for="(messages, index) in messages" :key="index" :post="messages" />
      </div>
      <noposts v-else />
    </el-col>
  </el-row>
</template>

<script>
import postcard from '@/components/post-card/post-card.vue'
import filterpanel from '@/components/filter-panel/filter-panel.vue'
import dsteem from '@/mixins/dsteem.js'
import noposts from '@/components/no-post/no-post.vue'

export default {
  name: 'feed',
  components: {
    postcard,
    filterpanel,
    noposts
  },
  mixins: [dsteem],
  data () {
    return {
      messages: []
    }
  },
  mounted () {
    this.$store.commit('setLoading', true)
    this.getContests('contest-hero', 100, 'trending').then(discussions => {
      if (discussions.length === 0) {
        this.messages = []
      }
      discussions.forEach(discussion => {
        let postJSON = JSON.parse(discussion.json_metadata)
        if ('contest_hero' in postJSON) {
          if (postJSON.contest_hero.type === 'contest') {
            this.messages.push(discussion)
          } else {
 this.$store.commit('setLoading', false)
          }
        } else {
 this.$store.commit('setLoading', false)
        }
      })
    })
  },
  methods: {
    onMessageSent: function (message) {
      if (message.length === 0) {
        this.messages = []
      } else {
        this.messages = message.message
      }
    }
  },
  watch: {
    messages () {
      this.$store.commit('setLoading', false)
    }
  }
}
</script>

<style scoped src='@/pages/feed/feed.css'>

</style>
