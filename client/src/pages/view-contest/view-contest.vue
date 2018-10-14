<template>
  <el-row v-if="post.data" :gutter="20">
    <el-col :xs="24" :sm="24" :md="15" :lg="16" :xl="16">

      <!-- Post Container -->
      <div class="header-row"><h1 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">{{ post.data.title }}</h1>

      <el-dropdown>
        <span class="el-dropdown-link" v-if="this.post.author === user.name">
               <span class="el-dropdown-link more-options">
          <i class="material-icons">more_vert</i>
               </span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="editLink">Edit Contest</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
      <div class="post-container">
        <post :postbody="post.data.body"></post>
        <div class="post-bar">
          <div class="tags">
            <el-tag v-for="(tag, index) in tags" :key="index">{{ tag }}</el-tag>
          </div>
          <postoptions :post="post.data" />
        </div>
      </div>
      <router-link :to="postLink" v-show="contestOpen"><button class="btn-fill enter-contest">Enter Contest</button></router-link>

      <!-- Winners -->
      <div class="winners-container" v-show="contest.winners">
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Winners</h1>
        <winners v-for="(winner, index) in contest.winners" :key="index" :winners="winner" />
      </div>

      <!-- Other Winners -->
      <div class="other-winners-container" v-show="contest.otherwinners">
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Other Winners</h1>
        <div class="other-winners-list-container">
          <otherwinners v-for="(otherwin, index) in contest.otherwin" :key="index" :otherWinners="otherwin" />
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

      <!-- Comments List -->
      <comment v-for="(comments, index) in post.comments" :key="index" :comment="comments" />
    </el-col>
    <el-col :xs="24" :sm="24" :md="9" :lg="8" :xl="8">

      <!-- Contest Deadline -->
      <h3 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> This contest closes in:</h3>
      <Countdown :deadline="contest.contestData.deadline"></Countdown>

      <!-- About Author -->
      <h3 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">About the Author</h3>
      <aboutauthor :authorBio="post.authorBio" :authorImage="post.authorImage" :authorName="post.author"></aboutauthor>

      <!-- Contest Entries -->
      <h3 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">Entries</h3>
      <noentries v-if="contest.entries.length === 0" />
      <entry v-else v-for="(entry, index) in contest.entries" :key="index" :comment="entry" />

    </el-col>
  </el-row>
</template>

<script>
import comment from '@/components/contest-comment/contest-comment.vue'
import aboutauthor from '@/components/about-author/about-author.vue'
import post from '@/components/post/post.vue'
import winners from '@/components/winners-panel/winners-panel.vue'
import otherwinners from '@/components/other-winners/other-winners.vue'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import form from '@/mixins/form-actions.js'
import dsteem from '@/mixins/dsteem.js'
import Countdown from 'vuejs-countdown'
import postoptions from '@/components/post-options/post-options.vue'
import entry from '@/components/entered-contest/entered-contest.vue'
import noentries from '@/components/no-entries/no-entries.vue'
import contestsService from '@/services/contests.js'
import entriesService from '@/services/entries.js'
import { mapGetters } from 'vuex'

export default {
  name: 'view-contest',
  mixins: [form, dsteem],
  components: {
    comment,
    markdownEditor,
    aboutauthor,
    Countdown,
    post,
    winners,
    otherwinners,
    postoptions,
    entry,
    noentries
  },
  data () {
    return {
      post: {
        author: null,
        authorImage: null,
        authorBio: null,
        data: null,
        permlink: null,
        comments: []
      },
      contest: {
        contestData: null,
        entries: [],
        winners: null,
        otherwin: null
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
  methods: {
    async getContestFromDB () {
      this.$store.commit('setLoading', true)
      this.post.author = this.$route.params.author
      this.post.permlink = this.$route.params.permlink
      const response = await contestsService.getContestByPermlink(this.post.permlink)
      this.contest.contestData = response.data.contests[0]
      const entries = await entriesService.getEntriesById(this.contest.contestData.id)
      this.contest.entries = entries.data.entries
    },
    loadContent () {
      this.loadPost(this.post.author, this.post.permlink)
        .then(discussions => {
          this.post.data = discussions[0]
        })
      this.$store.commit('setLoading', false)
    },
    getAuthorDetails (author) {
      this.getAccount(author)
        .then(authorDetails => {
          let userJson = JSON.parse(authorDetails[0].json_metadata)
          if (userJson !== undefined) {
            ('profile_image' in userJson.profile) ? this.post.authorImage = userJson.profile.profile_image : this.post.authorImage = require('@/assets/post-placeholder.png'),
            ('about' in userJson.profile) ? this.post.authorBio = userJson.profile.about : this.post.authorBio = 'This user has not added a bio'
          }
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
          'type': 'contest_comment'
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
  mounted () {
    this.getContestFromDB()
    this.loadContent()
    this.getAuthorDetails(this.post.author)
    this.getComments(this.post.author, this.post.permlink)
  },
  computed: {
    postLink: function () {
      return `/enter-contest/${this.contest.contestData.id}/${this.post.author}/${this.post.permlink}`
    },
    postJson: function () {
      return JSON.parse(this.post.data.json_metadata)
    },
    tags: function () {
      return this.postJson.tags
    },
    contestOpen: function () {
      if (new Date().toJSON().slice(0, 10).replace(/-/g, '/') >= this.contest.contestData.deadline) {
        return false
      } else {
        return true
      }
    },
    editLink: function () {
      return `/edit-contest/${this.post.author}/${this.post.permlink}`
    },
    ...mapGetters('steemconnect', ['user'])
  }
}
</script>

<style src="@/pages/view-contest/view-contest.css">

</style>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>
