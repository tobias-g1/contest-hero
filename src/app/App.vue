<template>
  <el-container id="app">
    <el-header>
      <router-link to="/">
        <div class="logo-container"><span class="text-logo"><strong>Contest</strong> Hero</span></div>
      </router-link>
      <div class="menu-options">
        <a class="nav-link" href="#" @click.prevent="$store.dispatch('steemconnect/logout')" v-if="user">Logout</a>
        <a class="nav-link" :href="$steemconnect.getLoginURL()" v-else>Login</a>
        <router-link to="/"><i class="material-icons">dashboard</i></router-link>
        <router-link to="/create-contest"><i class="material-icons">add_circle_outline</i></router-link>
      </div>
    </el-header>
    <aboutbanner/>
    <el-main>
      <ElementLoading :active="$store.state.isLoading" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true" />
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  import ElementLoading from 'vue-element-loading'
  import aboutbanner from '@/components/about-banner/about-banner.vue'
  import {
    mapGetters
  } from 'vuex'
  
  export default {
    name: 'app',
    components: {
      ElementLoading,
      aboutbanner
    },
    computed: {
      ...mapGetters('steemconnect', ['user']),
    },
    async mounted() {
      // login
      await this.$store.dispatch('steemconnect/login')
    }
  }
</script>

<style src='@/app/app.css'>
   
</style>

<style src='@/pages/shared/shared.css'>
  
</style>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  .material-icons {
    color: #000000
  }
  
  .router-link-active {
    color: #000000;
  }
  
  .material-icons:hover {
    color: #FF1480;
  }
  
  .el-header {
    height: auto !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 25px 50px !important;
    background: white;
    box-shadow: 0 0 10px 2px #f1f1f1;
  }
  
  .el-header a {
    text-decoration: none;
  }
  
  .logo-container {
    display: inline-flex;
  }
  
  .menu-options {
    display: inline-flex;
    justify-content: space-between;
    width: 60px;
  }
  
  .text-logo {
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: 18px;
    padding-top: 2.5px;
  }
</style>