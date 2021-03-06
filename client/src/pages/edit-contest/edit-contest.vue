
<template>
 <el-main>
    <el-row :gutter="20">
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Edit Contest - {{ contestForm.title }} </h1>
        <el-form :model="contestForm" :label-position="labelPosition" :rules="rules" ref="contestForm" @submit.native.prevent @keydown.enter.native.prevent="submitForm">
            <el-col :span="12">
                <el-form-item prop="title">
                  <span slot="label">Title<tooltip :text="'Use the title to help your contest stand out from the crowd'" /></span>
                    <el-input v-model="contestForm.title" placeholder="Enter a title"></el-input>
                </el-form-item>
            </el-col>
                    <el-col :span="12">
                <el-form-item  prop="category">
                   <span slot="label">Category<tooltip :text="'Each contest is sorted into a category to make it easier to find'" /></span>
                    <el-select v-model="contestForm.category" placeholder="Select Category">
                        <el-option label="Writing" default value="writing"></el-option>
                        <el-option label="Design" value="design"></el-option>
                        <el-option label="Photo" value="photo"></el-option>
                        <el-option label="Giveaway" value="giveaway"></el-option>
                        <el-option label="Other" value="other"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <el-form-item required>
                   <span slot="label">Deadline<tooltip :text="'Use this to configure when your contest will end, when the deadline reaches the end, no more entries can be made.'" /></span>
                    <el-form-item prop="deadline">
                        <el-date-picker type="datetime" placeholder="Select Deadline" :picker-options="pickerOptions" v-model="contestForm.deadline" default-time="23:59:59" style="width: 100%;" value-format="yyyy/MM/dd HH:mm:ss"></el-date-picker>
                    </el-form-item>
                </el-form-item>
            </el-col>
                        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <el-form-item prop="entry_method">
                   <span slot="label">Entry Type<tooltip :text="'Select how contestants will enter your contest. Comment\'s are perfect for giveways. Only comments made via Contest Hero will be shown in your entries.'" /></span>
                    <el-select v-model="contestForm.entry_method" placeholder="Select Entry Method">
                        <el-option label="Post" default value="post"></el-option>
                        <el-option label="Comment" value="comment"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                  <el-form-item prop="prize_type" required>
                   <span slot="label">Prize Type<tooltip :text="'Select the prize type of your contest, the prize type is used to filter contests on the contest feed.'" /></span>
                        <el-select v-model="contestForm.prize_type" placeholder="Select Prize Type">
                        <el-option label="STEEM" default value="STEEM"></el-option>
                        <el-option label="SBD" value="SBD"></el-option>
                        <el-option label="Steem Monsters" value="Steem Monsters"></el-option>
                        <el-option label="Other" value="Other"></el-option>
                        <el-option label="None" value="None"></el-option>
                    </el-select>
                    </el-form-item>
            </el-col>
                   <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
              <el-form-item :required="contestForm.prize_type !== 'None'" prop="prize_value">
                  <span slot="label">Prize Value<tooltip :text="'Use the prize value to indicate what your winner will receive. If you\'re offering a Steem Monsters card, simply write the card name. If you plan to reward multiple winners, you can enter the total prize pool here.'" /></span>
                    <el-input :disabled="contestForm.prize_type === 'None'" :type="(contestForm.prize_type === 'SBD' || contestForm.prize_type === 'STEEM') ? 'number' : 'text'" v-model="contestForm.prize_value" placeholder="Enter a prize value"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-form-item prop="body">
                   <span slot="label">Body<tooltip :text="'Don\'t forget to mention the prize and any additional steps to enter.'" /></span>
                    <markdownEditor :configs="editorConfig" v-model="contestForm.body" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item>
                   <span slot="label">Tags<tooltip :text="'Choose up to 4 tags that will help your contest stand out.'" /></span>
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
                    <button :disabled="!this.$store.state.steemconnect.user" @click="submitForm('contestForm')" class="btn-fill submit">Edit Contest</button>
                    <el-button @click="resetForm('contestForm'), contestForm.dynamicTags = []">Reset</el-button>
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
import contest from '@/mixins/contest.js'
import dsteem from '@/mixins/dsteem.js'
import contestsService from '@/services/contests.js'
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
        id: ''
      },
      contestForm: {
        title: '',
        category: '',
        deadline: '',
        body: '',
        entry_method: '',
        dynamicTags: [],
        prize_type: '' || '',
        prize_value: '' || '',
        image: '',
        tags: ''
      }
    }
  },
  components: {
    markdownEditor,
    tooltip
  },
  mixins: [form, tags, dsteem, contest],
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
          this.contestForm.title = discussions[0].title
          this.contestForm.body = discussions[0].body
          this.contestForm.image = postJSON.image
          this.contestForm.dynamicTags = postJSON.tags.slice(1, 4)
        })
      this.getContestFromDB()
    },
    async getContestFromDB () {
      const response = await contestsService.getContestByPermlink(this.contest.permlink)
      this.contest.id = response.data.contests[0]._id
      this.contestForm.deadline = response.data.contests[0].deadline
      this.contestForm.category = response.data.contests[0].category
      this.contestForm.entry_method = response.data.contests[0].entry_method
      this.contestForm.prize_type = response.data.contests[0].prize.type
      this.contestForm.prize_value = response.data.contests[0].prize.value
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
          id: this.contest.id,
          title: this.contestForm.title,
          author: this.$store.state.steemconnect.user.name,
          deadline: this.contestForm.deadline,
          category: this.contestForm.category,
          body: this.contestForm.body,
          entry_method: this.contestForm.entry_method,
          prize: {
            type: this.contestForm.prize_type,
            value: this.contestForm.prize_value
          }
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
            title: this.contestForm.title,
            body: this.contestForm.body,
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
