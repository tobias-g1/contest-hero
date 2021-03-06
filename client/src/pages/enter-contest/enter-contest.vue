<template>
 <el-main>
    <el-row :gutter="20">
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Enter contest </h1>
        <el-form :model="entryForm" :label-position="labelPosition" :rules="rules" ref="entryForm" class="demo-entry" @submit.native.prevent @keydown.enter.native.prevent="submitForm">
            <el-col v-if="contestData.entry_method === 'post' " :span="24">
                <el-form-item label="Entry Title" prop="title">
                    <el-input v-model="entryForm.title" placeholder="Enter a title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Entry Body" prop="body">
                    <markdownEditor v-model="entryForm.body" />
                </el-form-item>
            </el-col>
            <el-col v-if="contestData.entry_method === 'post'" :span="24">
                <el-form-item label="Tags">
                    <div class="tags-container">
                        <el-tag>{{ fixedTags[0] }}</el-tag>
                        <el-tag :key="tag" v-for="tag in entryForm.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag, entryForm)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(entryForm)" @blur="handleInputConfirm(entryForm)">
                        </el-input>
                        <el-button v-else class="button-new-tag" v-show="(finalTags.length < 5)" size="small" @click="showInput">+ New Tag</el-button>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <button :disabled="!this.$store.state.steemconnect.user" @click="submitForm('entryForm')" class="btn-fill submit">Enter Contest</button>
                    <el-button @click="resetForm('entryForm'), entryForm.dynamicTags = []">Reset</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>
 </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import form from '@/mixins/form-actions.js'
import tags from '@/mixins/tags.js'
import entriesService from '@/services/entries.js'
import contestsService from '@/services/contests.js'

export default {
  name: 'enter-contest',
  data () {
    return {
      labelPosition: 'top',
      inputVisible: false,
      inputValue: '',
      contestAuthor: '',
      contestPermlink: '',
      contestId: '',
      contestData: null,
      entryForm: {
        title: '',
        body: '',
        dynamicTags: []
      },
      rules: {
        title: [{
          required: true,
          message: 'Please enter your contest title',
          trigger: 'blur'
        }],
        body: [{
          required: true,
          message: 'Please enter your entry body',
          trigger: 'blur'
        }]
      }
    }
  },
  components: {
    markdownEditor
  },
  mixins: [form, tags],
  computed: {
    entryPermlink: function () {
      return this.entryForm.title.toLowerCase().replace(/[\s#/]/g, '-') + '-' + Math.floor(Math.random() * 9000000000) + 1000000000
    },
    fixedTags: function () {
      return ['contest-hero']
    },
    finalTags: function () {
      return this.fixedTags.concat(this.entryForm.dynamicTags)
    },
    postImages: function () {
      let images = this.entryForm.body.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|svg)/g)
      if (images !== null) {
        return images
      } else {
        return []
      }
    },
    adjustBody: function () {
      return this.entryForm.body + `<div><sub>This contest was created on <a  href="https://contesthero.io">Contest Hero</a> you can view and enter this contest by clicking <a target="blank_" href="https://www.contesthero.io/view-contest/${this.contestAuthor}/${this.contestPermlink}">here</a></sub></div>`
    },
    ...mapGetters('steemconnect', ['user'])
  },
  methods: {
    setDetails () {
      this.contestAuthor = this.$route.params.author
      this.contestPermlink = this.$route.params.permlink
      this.contestId = this.$route.params.contestId
      this.getContestInfo()
    },
    async getContestInfo () {
      const response = await contestsService.getContestByPermlink(this.contestPermlink)
      this.contestData = response.data.contests[0]
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createEntryPost()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    createEntryPost () {
      this.$store.commit('setLoading', true)

      // Parent author and parentPermLink not required for submitted a post to the blockchain

      let parentAuthor
      let parentPermlink

      switch (this.contestData.entry_method) {
        case 'post':
          parentAuthor = ''
          parentPermlink = this.finalTags[0]
          break
        case 'comment':
          parentAuthor = this.contestAuthor
          parentPermlink = this.contestPermlink
          break
      }

      // Create JSON Metadata
      let jsonMetaData = {
        'tags': this.finalTags,
        'app': 'contest_hero',
        'format': 'markdown',
        'image': this.postImages,
        'contest_hero': {
          'type': 'contest_entry',
          'parent_contest_permlink': this.contestPermlink,
          'parent_contest_author': this.contestAuthor
        }
      }

      const operations = [
        ['comment',
          {
            parent_author: parentAuthor,
            parent_permlink: parentPermlink,
            author: this.$store.state.steemconnect.user.name,
            permlink: this.entryPermlink,
            title: this.entryForm.title,
            body: this.adjustBody,
            json_metadata: JSON.stringify(jsonMetaData)
          }
        ],
        ['comment_options', {
          author: this.$store.state.steemconnect.user.name,
          permlink: this.entryPermlink,
          max_accepted_payout: '1000000.000 SBD',
          percent_steem_dollars: 10000,
          allow_votes: true,
          allow_curation_rewards: true,
          extensions: [
            [0, {
              beneficiaries: [
                { account: 'contest-hero', weight: 1000 }
              ]
            }]
          ]
        }]
      ]

      // Send post via SteemConnect
      this.$steemconnect.broadcast(
        operations,
        (err) => {
          if (err) {
            alert('Sorry an error has occured, please try again later or alternatively please report this issue via Github')
          } else {
            this.addEntry()
          }
        })
    },
    async addEntry () {
      try {
        await entriesService.createEntry({
          access_token: localStorage.getItem('access_token'),
          title: this.entryForm.title,
          author: this.user.name,
          permlink: this.entryPermlink,
          body: this.entryForm.body,
          entry_method: this.contestData.entry_method,
          parent_contest: {
            id: this.contestId,
            permlink: this.contestPermlink,
            author: this.contestAuthor
          }
        })
        this.$notify({ title: 'Success', message: 'You have successfully entered this contest', type: 'success' })
        this.$router.push(`/view-entry/${this.$store.state.steemconnect.user.name}/${this.entryPermlink}`)
      } catch (err) {
        console.log(err)
        this.$notify({ title: 'Error', message: 'Something went wrong', type: 'error' })
      }
      this.$store.commit('setLoading', false)
    }
  },
  mounted () {
    this.setDetails()
  }
}
</script>

<style src="@/pages/enter-contest/enter-contest.css">

</style>

<style>
    @import '~simplemde/dist/simplemde.min.css';
</style>
