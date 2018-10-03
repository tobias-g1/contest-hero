<template>
  <div class="filter-options">
    <span class="option" v-bind:class="[ activecategory === 1 ? 'active' : '' ]" @click="getPostsByTag('contest-hero', 100), activecategory=1">All Contests</span>
    <span class="option" v-bind:class="[ activecategory === 2 ? 'active' : '' ]" @click="getPostsByTag('ch-writing', 100), activecategory=2">Writing Contests</span>
    <span class="option" v-bind:class="[ activecategory === 3 ? 'active' : '' ]" @click="getPostsByTag('ch-design', 100), activecategory=3">Design Contests</span>
    <span class="option" v-bind:class="[ activecategory === 4 ? 'active' : '' ]" @click="getPostsByTag('ch-photo', 100), activecategory=4">Photo Contests</span>
    <span class="option" v-bind:class="[ activecategory === 5 ? 'active' : '' ]" @click="getPostsByTag('ch-giveaway', 100), activecategory=5">Giveaways</span>
    <span class="option" v-bind:class="[ activecategory === 6 ? 'active' : '' ]" @click="getPostsByTag('ch-other', 100), activecategory=6">Other</span>
  </div>
</template>

<script>

import dsteem from '@/mixins/dsteem.js'

export default {
  name: 'filter-options',
  mixins: [dsteem],
  data () {
    return { activecategory: 1 }
  },
  methods: {
    getPostsByTag: function (tag, limit) {
      this.getContests(tag, limit, 'trending')
        .then(discussions => {
          let messages = []

          discussions.forEach(discussion => {
            let postJSON = JSON.parse(discussion.json_metadata)
            if ('contest_hero' in postJSON) {
              if (postJSON.contest_hero.type === 'contest') {
                messages.push(discussion)
              }
            }
          })
          this.$emit('messageSent', {
            message: messages
          })
        })
    }
  }
}
</script>

<style src='@/components/filter-panel/filter-panel.css'></style>
