<template>
  <div class="filter-options">
    <span class="option" v-bind:class="[ activecategory === 1 ? 'active' : '' ]" @click="getPostsByTag('utopian-io', 100), activecategory=1">All Contests</span>
    <span class="option" v-bind:class="[ activecategory === 2 ? 'active' : '' ]" @click="getPostsByTag('steem', 100), activecategory=2">Writing Contests</span>
    <span class="option" v-bind:class="[ activecategory === 3 ? 'active' : '' ]" @click="getPostsByTag('writing', 100), activecategory=3">Design Contests</span>
    <span class="option" v-bind:class="[ activecategory === 4 ? 'active' : '' ]" @click="getPostsByTag('news', 100), activecategory=4">Photo Contests</span>
    <span class="option" v-bind:class="[ activecategory === 5 ? 'active' : '' ]" @click="getPostsByTag('bitcon', 100), activecategory=5">Giveaway Contests</span>
    <span class="option" v-bind:class="[ activecategory === 6 ? 'active' : '' ]" @click="getPostsByTag('animals', 100), activecategory=6">Other</span>
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
      this.getContests(tag, limit)
        .then(discussions => {
          this.$emit('messageSent', {
            message: discussions
          })
        })
    }
  }
}
</script>

<style src='@/components/filter-panel/filter-panel.css'></style>
