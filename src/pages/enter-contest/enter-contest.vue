
<template>
    <el-row :gutter="20">
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Enter contest </h1>
        <el-form :model="entryForm" :label-position="labelPosition" :rules="rules" ref="entryForm" class="demo-entry" @submit.native.prevent @keydown.enter.native.prevent="submitForm">
            <el-col :span="24">
                <el-form-item label="Entry Title" prop="title">
                    <el-input v-model="entryForm.title" placeholder="Enter a title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Entry Body" prop="body">
                    <markdownEditor v-model="entryForm.body" />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Tags">
                    <div class="tags-container">
                        <el-tag>Contest-Hero</el-tag>
                        <el-tag> {{ contestId }} </el-tag>
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
                    <button @click="submitForm('entryForm')" class="btn-fill">Enter Contest</button>
                    <el-button @click="resetForm('entryForm'), entryForm.dynamicTags = []">Reset</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import form from '@/mixins/form-actions.js'
import tags from '@/mixins/tags.js'
import {
  mapGetters
} from 'vuex'

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
      return ['test434343', this.contestId]
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
    ...mapGetters('steemconnect', ['user'])
  },
  methods: {
    setDetails () {
      this.contestAuthor = this.$route.params.author
      this.contestPermlink = this.$route.params.permlink
      this.contestId = this.$route.params.contestId
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
      let parentAuthor = ''
      let parentPermlink = this.finalTags[0]

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
            body: this.entryForm.body,
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
          (err) ? alert('Sorry an error has occured, please try again later or alternatively please report this issue via Github') : this.$router.push(`/view-entry/${this.$store.state.steemconnect.user.name}/${this.entryPermlink}`)
          this.$store.commit('setLoading', false)
        })
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
