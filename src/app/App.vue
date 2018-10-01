<template>
  <el-container id="app">
    <el-header>
      <router-link to="/">
        <div class="logo-container"><span class="text-logo"><strong>Contest</strong> Hero</span></div>
      </router-link>
      <div class="menu-options" v-if="user">
        <router-link to="/"><i class="material-icons">dashboard</i></router-link>
        <router-link to="/create-contest"><i class="material-icons">add_circle_outline</i></router-link>
        <a class="nav-link" href="#" @click.prevent="$store.dispatch('steemconnect/logout')"><i class="material-icons">exit_to_app</i></a>
        <img class="user-image" :src="userImage" alt="">
      </div>
      <div class="menu-options" v-else>
        <a class="nav-link" :href="$steemconnect.getLoginURL()"><button class="btn btn-outline">Login</button></a>
      </div>
    </el-header>
    <aboutbanner v-show="!user" />
    <el-main>
      <ElementLoading :active="$store.state.isLoading" spinner="spinner" color="#FF1480" :is-full-screen="true" />
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import ElementLoading from 'vue-element-loading'
import aboutbanner from '@/components/about-banner/about-banner.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    ElementLoading,
    aboutbanner
  },
  data () {
    return {
      userProfileImage: this.userImage
    }
  },
  computed: {
    currentUserJSON: function () {
      return JSON.parse(this.user.account.json_metadata)
    },
    userImage: function () {
      let userImage;
      ('profile_image' in this.currentUserJSON.profile) ? userImage = this.currentUserJSON.profile.profile_image : userImage = require('@/assets/profile-placeholder.png')
      return userImage
    },
    ...mapGetters('steemconnect', ['user'])
  },
  async mounted () {
    // login
    await this.$store.dispatch('steemconnect/login')
  }
}
</script>

<style src='@/app/app.css'></style>
<style src='@/pages/shared/shared.css'></style>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  .material-icons {
    color: #000000;
    margin-left: 10px;
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
    align-items: center;
  }

  .el-header a {
    text-decoration: none;
    width: auto;
    height: fit-content;
  }

  .logo-container {
    display: inline-flex;
  }

  .menu-options {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
  }

  .text-logo {
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: 18px;
    padding-top: 2.5px;
  }

  .user-image {
    height: 35px;
    min-width: 35px;
    max-width: 35px;
    border: 2px solid white;
    border-radius: 50px;
    box-shadow: 0 0 10px 2px #f1f1f1;
    margin-left: 10px;
  }
</style>
