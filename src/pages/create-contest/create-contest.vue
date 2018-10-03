
<template>
    <el-row :gutter="20">
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Create a contest </h1>
        <el-form :model="contestForm" :label-position="labelPosition" :rules="rules" ref="contestForm" @submit.native.prevent @keydown.enter.native.prevent="submitForm">
            <el-col :span="24">
                <el-form-item label="Contest Title" prop="title">
                    <el-input v-model="contestForm.title" placeholder="Enter a title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Deadline" required>
                    <el-form-item prop="deadline">
                        <el-date-picker type="date" placeholder="Select Deadline" :picker-options="pickerOptions" v-model="contestForm.deadline" style="width: 100%;" value-format="yyyy/MM/dd"></el-date-picker>
                    </el-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Contest Type" prop="type">
                    <el-select v-model="contestForm.type" placeholder="Select Type">
                        <el-option label="Writing" default value="ch-writing"></el-option>
                        <el-option label="Design" value="ch-design"></el-option>
                        <el-option label="Photo" value="ch-photo"></el-option>
                        <el-option label="Giveaway" value="ch-giveaways"></el-option>
                        <el-option label="Other" value="ch-other"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Contest Body" prop="body">
                    <markdownEditor v-model="contestForm.body" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Tags">
                    <div class="tags-container">
                        <el-tag :key="tags" v-for="tags in fixedTags" v-show="tags"> {{ tags }} </el-tag>
                        <el-tag :key="tag" v-for="tag in contestForm.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag, contestForm)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(contestForm)" @blur="handleInputConfirm(contestForm)" @submit.native.prevent>
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="(finalTags.length < 5)">+ New Tag</el-button>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <button :disabled="user = ''" @click="submitForm('contestForm')" class="btn-fill">Create Contest</button>
                    <el-button @click="resetForm('contestForm'), contestForm.dynamicTags = []">Reset</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import form from '@/mixins/form-actions.js'
import tags from '@/mixins/tags.js'
import { mapGetters } from 'vuex'

export default {
  name: 'create-contest',
  data () {
    return {
      labelPosition: 'top',
      inputVisible: false,
      inputValue: '',
      contestForm: {
        title: '',
        type: '',
        deadline: '',
        body: '',
        dynamicTags: []
      },
      rules: {
        title: [{
          required: true,
          message: 'Please enter a title',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: 'Please select a contest category',
          trigger: 'change'
        }],
        deadline: [{
          required: true,
          message: 'Please select a deadline',
          trigger: 'change'
        }],
        body: [{
          required: true,
          message: 'Please enter the body of your contest',
          trigger: 'blur'
        },
        {
          min: 150,
          message: 'Your contest body should be at least 150 characters',
          trigger: 'blur'
        }
        ]
      }
    }
  },
  components: {
    markdownEditor
  },
  mixins: [form, tags],
  computed: {
    fixedTags: function () {
      let fixedTags = ['contest-hero']

      fixedTags.push(this.contestForm.type)
      return fixedTags
    },
    finalTags: function () {
      return this.fixedTags.concat(this.contestForm.dynamicTags)
    },
    contestPermlink: function () {
      return this.contestForm.title.toLowerCase().replace(/[\s#/]/g, '-') + '-' + this.contestId
    },
    contestId: function () {
      return 'ch-xxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0
        var v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    postImages: function () {
      let images = this.contestForm.body.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|svg)/g)
      if (images !== null) {
        return images
      } else {
        return []
      }
    },
    adjustBody: function () {
      return this.contestForm.body + `<p class="ch-footer">*This contest was created on [contesthero.io](https://www.contesthero.io), you can view and enter this contest by clicking [here](https://www.contesthero.io/view-contest/${this.$store.state.steemconnect.user.name}/${this.contestPermlink})* </p>`
    },
    ...mapGetters('steemconnect', ['user'])
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createContest()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    createContest () {
      this.$store.commit('setLoading', true)

      // Parent author and parentPermLink not required for submitted a post to the blockchain

      let parentAuthor = ''
      let parentPermlink = this.finalTags[0]

      // Create JSON Metadata

      let jsonMetaData = {
        'tags': this.finalTags,
        'app': 'contest_hero',
        'image': this.postImages,
        'format': 'markdown',
        'contest_hero': {
          'type': 'contest',
          'deadline': this.contestForm.deadline,
          'contestId': this.contestId
        }
      }

      const operations = [
        ['comment',
          {
            parent_author: parentAuthor,
            parent_permlink: parentPermlink,
            author: this.$store.state.steemconnect.user.name,
            permlink: this.contestPermlink,
            title: this.contestForm.title,
            body: this.adjustBody,
            json_metadata: JSON.stringify(jsonMetaData)
          }
        ],
        ['comment_options', {
          author: this.$store.state.steemconnect.user.name,
          permlink: this.contestPermlink,
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
          (err) ? alert('Sorry an error has occured, please try again later or alternatively please report this issue via Github') : this.$router.push(`/view-contest/${this.$store.state.steemconnect.user.name}/${this.contestPermlink}`)
          this.$store.commit('setLoading', false)
        })
    }
  }
}
</script>

<style src="@/pages/create-contest/create-contest.css"></style>

<style>
    @import '~simplemde/dist/simplemde.min.css';
</style>
