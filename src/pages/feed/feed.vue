<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <filterpanel @messageSent='onMessageSent' @click.native="$store.commit('setLoading', true)" />
    </el-col>
    <el-col :span="24">
      <div class="card-container">
        <postcard v-for="(messages, index) in messages" :key="index" :post="messages" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import postcard from '@/components/post-card/post-card.vue'
import filterpanel from '@/components/filter-panel/filter-panel.vue'
import dsteem from '@/mixins/dsteem.js'

export default {
  name: 'feed',
  components: {
    postcard,
    filterpanel
  },
  mixins: [dsteem],
  data () {
    return {
      messages: []
    }
  },
  mounted () {
    this.$store.commit('setLoading', true)
    this.getContests('test434343', 100).then(discussions => {
      discussions.forEach(discussion => {
        let postJSON = JSON.parse(discussion.json_metadata)
        if ('app' in postJSON) {
          if (postJSON.app === 'contest_hero') {
            if (postJSON.contest_hero.type === 'contest') {
              this.messages.push(discussion)
            }
          }
        }
      })
    })
  },
  methods: {
    onMessageSent: function (message) {
      this.messages = message.message
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
