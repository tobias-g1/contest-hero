<template>
  <el-main>
    <el-row :gutter="20" v-if="contest.contestData">
      <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Edit - {{ contest.title }}</h1>
      <el-form :model="contest" :label-position="labelPosition" :rules="rules" ref="contest" @submit.native.prevent @keydown.enter.native.prevent="submitForm">
        <el-col :span="12">
          <el-form-item prop="title">
            <span slot="label">Title<tooltip :text="'Use the title to help your contest stand out from the crowd.'" /></span>
            <el-input v-model="contest.title" placeholder="Enter a title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="category">
            <span slot="label">Category<tooltip :text="'Each contest is sorted into a category to make it easier to find.'" /></span>
            <el-select v-model="contest.contestData.category" placeholder="Select Category">
              <el-option label="Writing" default value="writing"></el-option>
              <el-option label="Design" value="design"></el-option>
              <el-option label="Photo" value="photo"></el-option>
              <el-option label="Giveaway" value="giveaway"></el-option>
              <el-option label="Other" value="other"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required>
            <span slot="label">Deadline<tooltip :text="'Use this to configure when your contest will end, when the deadline reaches the end, no more entries can be made.'" /></span>
            <el-form-item prop="deadline">
              <el-date-picker type="datetime" placeholder="Select Deadline" :picker-options="pickerOptions" v-model="contest.deadline" default-time="23:59:59" style="width: 100%;" value-format="yyyy/MM/dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="entry_method">
            <span slot="label">Entry Type<tooltip :text="'Select how contestants will enter your contest. Comment\'s are perfect for giveways. Only comments made via Contest Hero will be shown in your entries.'" /></span>
            <el-select v-model="contest.entry_method" placeholder="Select Entry Method">
              <el-option label="Post" default value="post"></el-option>
              <el-option label="Comment" value="comment"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="body">
            <span slot="label">Body<tooltip :text="'Don\'t forget to mention the prize and any additional steps to enter.'" /></span>
            <markdownEditor :configs="editorConfig" v-model="contest.body" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <span slot="label">Tags<tooltip :text="'Choose up to 4 tags that will help your contest stand out.'" /></span>
            <div class="tags-container">
              <el-tag> {{ contest.tags[0] }} </el-tag>
              <el-tag :key="tag" v-for="tag in contest.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag, contest)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(contest)" @blur="handleInputConfirm(contest)" @submit.native.prevent>
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="(contest.dynamicTags.length < 4)">+ New Tag</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <button :disabled="!this.$store.state.steemconnect.user" @click="submitForm('contest')" class="btn-fill submit">Edit Contest</button>
            <el-button @click="resetForm('contest'), contest.dynamicTags = []">Reset</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-main>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import form from '@/mixins/form-actions.js'
import tags from '@/mixins/tags.js'
import dsteem from '@/mixins/dsteem.js'
import contestsService from '@/services/contests.js'
import { mapGetters } from 'vuex'
import tooltip from '@/components/tooltip/tooltip.vue'

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
        body: '',
        tags: [],
        deadline: '',
        category: '',
        entry_method: '',
        dynamicTags: [],
        contestId: '',
        images: null,
        contestData: null
      },
      rules: {
        title: [{
          required: true,
          message: 'Please enter a title',
          trigger: 'blur'
        }],
        category: [{
          required: true,
          message: 'Please select a contest category',
          trigger: 'change'
        }],
        deadline: [{
          required: true,
          message: 'Please select a deadline',
          trigger: 'change'
        }],
        entry_method: [{
          required: true,
          message: 'Please select an entry method',
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
    markdownEditor,
    tooltip
  },
  mixins: [form, tags, dsteem],
  computed: {
    postImages: function () {
      let images = this.contest.body.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|svg)/g)
      if (images !== null) {
        return images
      } else {
        return []
      }
    },
    finalTags: function () {
      let finalTags = this.contest.dynamicTags
      finalTags.unshift(this.contest.tags[0])
      return finalTags
    },
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
          this.contest.image = postJSON.image
          this.contest.dynamicTags = this.contest.tags.slice(1, 4)
        })
      this.getContestFromDB()
    },
    async getContestFromDB () {
      const response = await contestsService.getContestByPermlink(this.contest.permlink)
      this.contest.contestData = response.data.contests[0]
      this.contest.deadline = response.data.contests[0].deadline
      this.contest.category = response.data.contests[0].category
      this.contest.entry_method = response.data.contests[0].entry_method
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
    async editContestDB () {
      try {
        await contestsService.editContest({
          access_token: localStorage.getItem('access_token'),
          id: this.contest.contestData._id,
          title: this.contest.title,
          author: this.$store.state.steemconnect.user.name,
          deadline: this.contest.deadline,
          category: this.contest.category,
          body: this.contest.body,
          entry_method: this.contest.entry_method
        })
        this.$notify({ title: 'Success', message: 'Your contest has been editted', type: 'success' })
        this.$router.push(`/view-contest/${this.$store.state.steemconnect.user.name}/${this.contest.permlink}`)
      } catch (err) {
        console.log(err)
        this.$notify({ title: 'Error', message: 'Something went wrong', type: 'error' })
      }
      this.$store.commit('setLoading', false)
    },
    editContest () {
      this.$store.commit('setLoading', true)

      // Parent author and parentPermLink not required for submitted a post to the blockchain

      let parentAuthor = ''
      let parentPermlink = this.contest.tags[0]

      // Create JSON Metadata

      let jsonMetaData = {
        'tags': this.finalTags,
        'app': 'contest_hero',
        'image': this.postImages,
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
            (err) ? this.$notify({ title: 'Error', message: 'Something went wrong', type: 'error' }) : this.editContestDB()
          })
      } else {
        this.$notify({ title: 'Error', message: 'Something went wrong', type: 'error' })
        this.$router.push('/contests')
      }
    }
  }
}
</script>
<style src="@/pages/edit-contest/edit-contest.css">

</style>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>
