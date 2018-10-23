<template>
    <el-row v-if="post.data" :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <!-- Post Container -->
            <h1 class="header" v-if="entry_method === 'post'"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">{{ post.data.title }}</h1>
            <div class="post-container">
                <post :postbody="post.data.body"></post>
                <div class="post-bar">
                    <div class="tags">
                        <el-tag v-for="(tag, index) in tags" :key="index">{{ tag }}</el-tag>
                    </div>
                    <postoptions :post="post.data" />
                </div>
            </div>
                <!-- Post Comments -->
                <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Comments</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" @submit.native.prevent>
                    <el-form-item prop="commentbody">
                        <markdownEditor v-model="ruleForm.commentbody" />
                    </el-form-item>
                    <el-form-item>
                        <button :disabled="!this.$store.state.steemconnect.user" @click="submitForm('ruleForm')" class="btn-fill">Create Comment</button>
                        <el-button @click="resetForm('ruleForm')">Reset</el-button>
                    </el-form-item>
                </el-form>
                <comment v-for="(comments, index) in post.comments" :key="index" :comment="comments" />
        </el-col>
    </el-row>
</template>

<script>
import dsteem from '@/mixins/dsteem.js'
import post from '@/components/post/post.vue'
import form from '@/mixins/form-actions.js'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import comment from '@/components/contest-comment/contest-comment.vue'
import postoptions from '@/components/post-options/post-options.vue'
import entriesService from '@/services/entries.js'

export default {
  name: 'view-entry',
  mixins: [dsteem, form],
  components: {
    markdownEditor,
    post,
    comment,
    postoptions
  },
  data () {
    return {
      entry_method: '',
      post: {
        author: null,
        data: null,
        permlink: null,
        comments: []
      },
      ruleForm: {
        commentBody: ''
      },
      rules: {
        commentbody: [{
          required: true,
          message: 'Please enter a comment',
          trigger: 'blur'
        }]
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
      this.getComments(this.post.author, this.post.permlink)
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
    },
    getComments (author, permlink) {
      this.getPostComments(author, permlink)
        .then(postComments => {
          postComments.forEach(comment => {
            this.getAccount(comment.author)
              .then(commentAuthorDetails => {
                commentAuthorDetails[0].json_metadata = JSON.parse(commentAuthorDetails[0].json_metadata)
                comment.authorDetails = commentAuthorDetails[0]
                this.post.comments.push(comment)
              })
          })
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitComment()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitComment () {
      this.$store.commit('setLoading', true)

      // Create JSON Metadata

      let jsonMetaData = {
        'app': 'contest-hero',
        'format': 'markdown',
        'contest-hero': {
          'type': 'entry_comment'
        },
        'tags': [this.tags[0]]
      }

      // Send comment via SteemConnect

      this.$steemconnect.comment(
        this.post.author,
        this.post.permlink,
        this.$store.state.steemconnect.user.name,
        this.post.permlink + Math.floor(Math.random() * 9000000000) + 1000000000,
        '',
        this.ruleForm.commentbody,
        jsonMetaData,
        (err) => {
          (err) ? alert('Sorry an error has occured, please try again later or alternatively please report this issue via Github') : this.getComments(this.post.author, this.post.permlink)
          this.$store.commit('setLoading', false)
          this.ruleForm.commentbody = ''
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
