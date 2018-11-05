<template>
 <el-main>
    <el-row v-if="post.data" :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <!-- Post Container -->
            <h1 class="header" v-if="entry_method === 'post'"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">{{ post.data.title }}</h1>
            <div class="post-container">
                <markdownpanel :postbody="post.data.body" />
                <div class="post-bar">
                    <div class="tags">
                        <el-tag v-for="(tag, index) in tags" :key="index">{{ tag }}</el-tag>
                    </div>
                    <postoptions :type="'full'" :post="post.data" />
                </div>
            </div>
            <commentpanel :post="post"/>
        </el-col>
    </el-row>
 </el-main>
</template>

<script>

import markdownpanel from '@/components/markdown-panel/markdown-panel.vue'
import dsteem from '@/mixins/dsteem.js'
import entriesService from '@/services/entries.js'
import commentpanel from '@/components/comment-panel/comment-panel.vue'
import postoptions from '@/components/post-options/post-options.vue'

export default {
  name: 'view-entry',
  mixins: [dsteem],
  components: {
    commentpanel,
    postoptions,
    markdownpanel
  },
  data () {
    return {
      entry_method: '',
      post: {
        author: null,
        data: null,
        permlink: null,
        comments: []
      }
    }
  },
  mounted () {
    this.loadContent()
  },
  methods: {
    async loadContent () {
      this.$store.commit('setLoading', true)
      this.post.author = this.$route.params.author
      this.post.permlink = this.$route.params.permlink
      const entries = await entriesService.getEntriesByPermlink(this.post.permlink)
      this.entry_method = entries.data.entries[0].entry_method
      if (this.entry_method === 'post') {
        this.getPostBlockchain()
      } else {
        this.getSingleCommentBlockchain()
      }
      this.$store.commit('setLoading', false)
    },
    getPostBlockchain () {
      this.loadPost(this.post.author, this.post.permlink)
        .then(discussions => {
          this.post.data = discussions[0]
        })
    },
    getSingleCommentBlockchain () {
      this.getSingleComment(this.post.author, this.post.permlink)
        .then(discussions => {
          this.post.data = discussions[0]
        })
    }
  },
  computed: {
    postJson: function () {
      return JSON.parse(this.post.data.json_metadata)
    },
    tags: function () {
      return this.postJson.tags
    }

  }
}
</script>

<style src="@/pages/view-entry/view-entry.css">

</style>
