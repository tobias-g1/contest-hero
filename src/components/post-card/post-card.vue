<template>
  <div class="card">
    <span class="card-header" v-bind:style="imageBackground">
      <div class="author-image-container">
      <img class="author-image" :src="authorImage" alt="">
      </div>
      <span class="card-title">
          <router-link :to="postLink"><h3>{{ post.title }} </h3></router-link>
          </span>
    </span>
    <span class="card-summary">
      <postoptions :post="post"/>
      <div>
<span class="contest">{{ contestType }}</span>
 <el-tag v-bind:class="status === 'Live' ? 'contest_open' : 'contest_closed'" size="small">{{ status }}</el-tag>
 </div>
  </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import postoptions from '@/components/post-options/post-options.vue'

export default {
  name: 'post-card',
  props: {
    post: Object
  },
  components: {
    postoptions
  },
  data () {
    return {
      voteweight: 100
    }
  },
  computed: {
    postJSON: function () {
      return JSON.parse(this.post.json_metadata)
    },
    imageBackground: function () {
      let postImage
      // Check if a post image can be found in the JSON metadata of post and if doesn't exist set a default
      if ('image' in this.postJSON) {
        (this.postJSON.image[0] !== undefined) ? postImage = this.postJSON.image[0] : postImage = require('@/assets/post-placeholder.png')
      } else {
        postImage = require('@/assets/post-placeholder.png')
      }
      return `background-image: url(${postImage});`
    },
    postLink: function () {
      return `/view-contest/${this.post.author}/${this.post.permlink}`
    },
    status: function () {
      if (new Date().toJSON().slice(0, 10).replace(/-/g, '/') >= this.postJSON.contest_hero.deadline) {
        return 'Complete'
      } else {
        return 'Live'
      }
    },
    contestType: function () {
      return this.postJSON.tags[1].slice(3, 20)
    },
    authorImage: function () {
      return `https://steemitimages.com/u/${this.post.author}/avatar`
    },
    ...mapGetters('steemconnect', ['user'])
  }
}
</script>

<style scoped src='@/components/post-card/post-card.css'></style>
