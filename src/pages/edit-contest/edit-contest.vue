<template>
    <el-row :gutter="20">
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Edit - {{ contest.title }}</h1>
        <el-form :model="contest" :label-position="labelPosition" :rules="rules" ref="contest" @submit.native.prevent @keydown.enter.native.prevent="submitForm">
            <el-col :span="24">
                <el-form-item label="Contest Title" prop="title">
                    <el-input v-model="contest.title" placeholder="Enter a title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Deadline" required>
                    <el-form-item prop="deadline">
                        <el-date-picker type="datetime" placeholder="Select Deadline" :picker-options="pickerOptions" v-model="contest.deadline" default-time="23:59:59" style="width: 100%;" value-format="yyyy/MM/dd HH:mm:ss"></el-date-picker>
                    </el-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Contest Type" prop="type">
                    <el-select v-model="contest.type" placeholder="Select Type">
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
                    <markdownEditor :configs="editorConfig" v-model="contest.body" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Tags">
                    <div class="tags-container">
                        <el-tag :key="tags" v-for="tags in contest.tags" v-show="tags"> {{ tags }} </el-tag>
                        <el-tag :key="tag" v-for="tag in contest.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag, contest)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(contestForm)" @blur="handleInputConfirm(contestForm)" @submit.native.prevent>
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="(contest.tags.length < 5)">+ New Tag</el-button>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <button :disabled="!this.$store.state.steemconnect.user" @click="submitForm('contest')" class="btn-fill">Create Contest</button>
                    <el-button @click="resetForm('contest'), contest.tags = []">Reset</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import form from '@/mixins/form-actions.js'
import tags from '@/mixins/tags.js'
import dsteem from '@/mixins/dsteem.js'
import { mapGetters } from 'vuex'

export default {
  name: 'edit-contest',
  data () {
    return {
      labelPosition: 'top',
      inputVisible: false,
      inputValue: '',
      contest: {
        author: '',
        permlink: '',
        title: '',
        type: '',
        deadline: '',
        body: '',
        tags: [],
        contestId: '',
        image: ''
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
      },
      editorConfig: {
        spellChecker: true
      }
    }
  },
  components: {
    markdownEditor
  },
  mixins: [form, tags, dsteem],
  computed: {
    ...mapGetters('steemconnect', ['user'])
  },
  mounted () {
    this.loadContest()
  },
  methods: {
    loadContest () {
      this.contest.author = this.$route.params.author
      this.contest.permlink = this.$route.params.permlink
      this.loadPost(this.contest.author, this.contest.permlink)
        .then(discussions => {
          let postJSON = (JSON.parse(discussions[0].json_metadata))
          this.contest.title = discussions[0].title
          this.contest.body = discussions[0].body
          this.contest.tags = postJSON.tags
          this.contest.deadline = postJSON.contest_hero.deadline
          this.contest.type = postJSON.tags[1]
          this.contest.image = postJSON.image
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editContest()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editContest () {
      this.$store.commit('setLoading', true)

      // Parent author and parentPermLink not required for submitted a post to the blockchain

      let parentAuthor = ''
      let parentPermlink = this.contest.tags[0]

      // Create JSON Metadata

      let jsonMetaData = {
        'tags': this.contest.tags,
        'app': 'contest_hero',
        'image': this.contest.images,
        'format': 'markdown',
        'contest_hero': {
          'type': 'contest',
          'deadline': this.contest.deadline,
          'contestId': this.contest.contestId
        }
      }

      const operations = [
        ['comment',
          {
            parent_author: parentAuthor,
            parent_permlink: parentPermlink,
            author: this.$store.state.steemconnect.user.name,
            permlink: this.contest.permlink,
            title: this.contest.title,
            body: this.contest.body,
            json_metadata: JSON.stringify(jsonMetaData)
          }
        ]
      ]

      // Send post via SteemConnect
      if (this.$store.state.steemconnect.user.name === this.contest.author) {
        this.$steemconnect.broadcast(
          operations,
          (err) => {
            (err) ? alert('Sorry an error has occured, please try again later or alternatively please report this issue via Github') : this.$router.push(`/view-contest/${this.$store.state.steemconnect.user.name}/${this.contest.permlink}`)
            this.$store.commit('setLoading', false)
          })
      } else {
        alert('You don\'t have permission to edit this contest')
        this.$router.push('/contests')
      }
    }
  }
}

</script>

<style src="@/pages/edit-contest/edit-contest.css"></style>

<style>
    @import '~simplemde/dist/simplemde.min.css';
</style>
