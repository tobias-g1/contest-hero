<template>
 <el-main >
<div class="feed-wrapper">
  <el-row :gutter="20">
    <el-col :span="24">
      <filterpanel @messageSent='onMessageSent'/>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
      <div v-if="messages[0]" class="card-container">
        <postcard v-if="messages" v-for="(messages, index) in this.sortedFeed" :key="index" :post="messages"/>
      </div>
      <noposts v-else />
    </el-col>
  </el-row>
</div>
 </el-main>
</template>

<script>
import postcard from '@/components/post-card/post-card.vue'
import filterpanel from '@/components/filter-panel/filter-panel.vue'
import noposts from '@/components/no-post/no-post.vue'
import dsteem from '@/mixins/dsteem.js'

export default {
  name: 'feed',
  mixins: [dsteem],
  components: {
    postcard,
    filterpanel,
    noposts
  },
  data () {
    return {
      messages: [],
      sortMethod: 'asc'
    }
  },
  mounted () {
    this.$store.commit('setLoading', true)
  },
  computed: {
    sortedFeed: function () {
      return _.orderBy(this.messages, '_id', this.sortMethod)
    }
  },
  methods: {
    onMessageSent: function (message) {
      if (message.length === 0) {
        this.messages = []
      } else {
        this.messages = message.message
        if (message.sortedOrder === 'newest') {
          this.sortMethod = 'desc'
        } else if (message.sortedOrder === 'oldest') {
          this.sortMethod = 'asc'
        }
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
