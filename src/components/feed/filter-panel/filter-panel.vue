<template>
  <div class="filter-options">
    <span class="option" v-bind:class="[ activecategory === 1 ? 'active' : '' ]" @click="getPostsByTag('utopian-io'), activecategory=1">All Contests</span>
    <span class="option" v-bind:class="[ activecategory === 2 ? 'active' : '' ]" @click="getPostsByTag('steem'), activecategory=2">Writing Contests</span>
    <span class="option" v-bind:class="[ activecategory === 3 ? 'active' : '' ]" @click="getPostsByTag('writing'), activecategory=3">Design Contests</span>
    <span class="option" v-bind:class="[ activecategory === 4 ? 'active' : '' ]" @click="getPostsByTag('news',activecategory=4)">Video Contests</span>
    <span class="option" v-bind:class="[ activecategory === 5 ? 'active' : '' ]" @click="getPostsByTag('bitcoin',activecategory=5)">Photo Contests</span>
    <span class="option" v-bind:class="[ activecategory === 6 ? 'active' : '' ]" @click="getPostsByTag('animals', activecategory=6)">Other Contests</span>
  </div>
</template>

<script>
  import {
    Client
  } from 'dsteem'
  
  const client = new Client('https://api.steemit.com')
  
  export default {
    name: 'filter-options',
    data() {
      return { activecategory: 1 }
    },
    methods: {
      getPostsByTag: function(tag) {

        client.database.getDiscussions('active', {
          tag: tag,
          limit: 100
        }).then(discussions => {
          this.$emit('messageSent', {
            message: discussions
          })
        })
      }
    }
  }
</script>

<style>

.filter-options {
  text-align: center;
  margin-bottom: 15px;
}
  
  .option {
    display: inline-flex;
    padding: 15px;
    border-radius: 5px;
    font-weight: 500;
    cursor: pointer;
    font-size: 15px;
  }
  
  .active {
   background: #FF1480;
    color: white;
    font-weight: bold;
  }
</style>


