<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <filterpanel @messageSent='onMessageSent' />
    </el-col>
    <el-col :span="24">
      <div class="card-container">
        <postcard v-on:change="this.isActive === true" v-for="(messages, index) in messages" :key="index" :post="messages" />
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
    this.getContests('utopian-io', 100).then(discussions => {
      this.messages = discussions
    })
  },
  methods: {
    onMessageSent: function (message) {
      this.messages = message.message
    }
  }
}
</script>

<style scoped src='@/pages/feed/feed.css'></style>
