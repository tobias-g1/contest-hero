<template>
    <div class="comment-panel">
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
        <comment v-for="(comment, index) in sortedComments" :key="index" :comment="comment" />
    </div>
</template>

<script>
import dsteem from '@/mixins/dsteem.js'
import form from '@/mixins/form-actions.js'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import comment from '@/components/contest-comment/contest-comment.vue'
import postoptions from '@/components/post-options/post-options.vue'

export default {
  name: 'comment-panel',
  mixins: [dsteem, form],
  components: {
    markdownEditor,
    comment,
    postoptions
  },
  props: {
    post: Object
  },
  data () {
    return {
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
    this.getComments(this.post.author, this.post.permlink)
  },
  methods: {
    // Get comments from the blockchain
    getComments (author, permlink) {
      this.post.comments = []
      this.getPostComments(author, permlink)
        .then(postComments => {
          postComments.forEach(comment => {
            this.getAccount(comment.author)
              .then(commentAuthorDetails => {
                commentAuthorDetails[0].json_metadata = JSON.parse(commentAuthorDetails[0].json_metadata)
                comment.authorDetails = commentAuthorDetails[0]
                this.getActiveVotes(comment.author, comment.permlink)
                  .then(activeVotes => {
                    comment.active_votes = activeVotes
                    this.post.comments.push(comment)
                  })
              })
          })
        })
    },
    // Form Logic
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
        this.post.permlink + Math.floor(Math.random() * 30004340),
        '',
        this.ruleForm.commentbody,
        jsonMetaData,
        (err) => {
          (err) ? this.$notify({ title: 'Error', message: 'Something went wrong, your comment could not be submitted', type: 'success' }) : this.getComments(this.post.author, this.post.permlink)
          this.$store.commit('setLoading', false)
          this.$notify({ title: 'Success', message: 'Your comment was successful', type: 'success' })
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
    },
    sortedComments: function () {
      return _.orderBy(this.post.comments, 'created', 'desc')
    }
  }
}
</script>

<style src="@/components/comment-panel/comment-panel.css">

</style>
