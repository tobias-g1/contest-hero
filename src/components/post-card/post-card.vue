<template>
  <div class="card">
    <span class="card-header" v-bind:style="imageBackground">
                <div v-bind:class='modifiers' class="status-tag">{{ status }}</div>
        				<span class="card-title">
        				<a v-bind:href="postLink"><h3>{{ post.title }}</h3></a>
        				</span>
    </span>
    <span class="card-summary">
        			<div class="post-stats">
              <div class="stats-item">
      <i class="material-icons">message</i> <span>{{ post.children }}</span>
  </div>
  <div class="stats-item">
    <i class="material-icons">thumb_up</i> <span>{{ post.net_votes }}</span>
  </div>
  </div>
  <span class="contest-details">A {{ contestType }} contest created by {{ post.author }} </span>

  </span>
  </div>
</template>

<script>
export default {
  name: 'feed-item',
  props: {
    post: Object
  },
  data () {
    return {
      modifiers: {
        'contest--open': true,
        'contest--closed': false
      }
    }
  },
  computed: {
    imageBackground: function () {
      
      let postImage = JSON.parse(this.post.json_metadata)

      // Check if a post image can be found in the JSON metadata of post and if doesn't exist set a default

      if ('image' in postImage) {
        postImage = postImage.image[0]
      } else {
        postImage = 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder-768x576.png'
      }

      let imageBackground = `background-image: url(${postImage});`

      return imageBackground
    },
    postLink: function () {
      let postLink = `#/view-contest/${this.post.author}/${this.post.permlink}`
      return postLink
    },
    status: function () {
      let status = 'open'
      return status
    },
    contestType: function () {
      let contestType = 'writing'
      return contestType
    }
  }
}
</script>

<style scoped src='@/components/post-card/post-card.css'></style>
