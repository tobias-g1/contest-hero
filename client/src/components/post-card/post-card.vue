<template>
  <div class="card" v-if="post.blockchain">
    <span class="card-header" :style="imageBackground">
      <div class="author-image-container">
      <img class="author-image" :src="authorImage" alt="">
      </div>
      <span class="card-title">
          <router-link :to="postLink"><h3>{{ post.title }} </h3></router-link>
          </span>
    </span>
    <span class="card-summary">
      <postoptions :post="post.blockchain"/>
      <div>
<span class="contest">{{ post.category }}</span>
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
      return JSON.parse(this.post.blockchain.json_metadata)
    },
    postLink: function () {
      return `/view-contest/${this.post.author}/${this.post.permlink}`
    },
    status: function () {
      if (new Date().toJSON().slice(0, 10).replace(/-/g, '/') >= this.post.deadline) {
        return 'Complete'
      } else {
        return 'Live'
      }
    },
    authorImage: function () {
      return `https://steemitimages.com/u/${this.post.author}/avatar`
    },
    imageBackground: function () {
      let image;
      (this.postJSON.image[0] === undefined) ? image = require('@/assets/post-placeholder.png') : image = this.postJSON.image[0]
      return `background-image: url(${image});`
    },
    ...mapGetters('steemconnect', ['user'])
  }
}
</script>

<style scoped src='@/components/post-card/post-card.css'></style>
