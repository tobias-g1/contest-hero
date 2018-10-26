<template>
 <el-main>
  <el-row v-if="post.data" :gutter="20">
    <el-col :xs="24" :sm="24" :md="15" :lg="16" :xl="16">

      <!-- Post Container -->
      <div class="header-row"><h1 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">{{ post.data.title }}</h1>

      <el-dropdown v-if="user">
        <span class="el-dropdown-link" v-if="this.contest.contestData.author === user.name">
               <span class="el-dropdown-link more-options">
          <i class="material-icons">more_vert</i>
               </span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="editLink">Edit Contest</router-link>
          </el-dropdown-item>
             <el-dropdown-item>
            <router-link :to="selectWinnerLink">Choose Winners</router-link>
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
      <router-link :to="postLink" v-show="contestOpen"><button :disabled="(new Date().toJSON().slice(0, 10).replace(/-/g, '/') >= contest.contestData.deadline.slice(0, 10))" class="btn-fill enter-contest">Enter contest with a {{ contest.contestData.entry_method }} </button></router-link>

      <!-- Winners -->
      <div class="winners-container" v-if="contest.winners.length !== 0">
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Winners</h1>
       <winners v-for="(winner, index) in sortedWinners" :key="index" :winner="winner"/>
      </div>
      <!-- Post Comments -->
    <commentpanel :post="post" />
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
 </el-main>
</template>

<script>

import aboutauthor from '@/components/about-author/about-author.vue'
import post from '@/components/post/post.vue'
import winners from '@/components/winners-panel/winners-panel.vue'
import dsteem from '@/mixins/dsteem.js'
import Countdown from 'vuejs-countdown'
import postoptions from '@/components/post-options/post-options.vue'
import entry from '@/components/entered-contest/entered-contest.vue'
import noentries from '@/components/no-entries/no-entries.vue'
import contestsService from '@/services/contests.js'
import entriesService from '@/services/entries.js'
import commentpanel from '@/components/comment-panel/comment-panel.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'view-contest',
  mixins: [dsteem],
  components: {
    aboutauthor,
    Countdown,
    post,
    winners,
    postoptions,
    entry,
    noentries,
    commentpanel
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
      this.contest.winners = response.data.contests[0].winners
      const entries = await entriesService.getEntriesById(this.contest.contestData._id)
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
    }
  },
  mounted () {
    this.getContestFromDB()
    this.loadContent()
    this.getAuthorDetails(this.post.author)
  },
  computed: {
    postLink: function () {
      return `/enter-contest/${this.contest.contestData._id}/${this.post.author}/${this.post.permlink}`
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
    selectWinnerLink: function () {
      return `/select-winner/${this.contest.contestData._id}/${this.post.author}/${this.post.permlink}`
    },
    sortedWinners: function () {
      return _.orderBy(this.contest.winners, 'place', 'asc')
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
