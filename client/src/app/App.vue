<template>
  <el-container id="app">
    <el-header>
      <router-link to="/">
        <div class="logo-container"><span class="text-logo"><strong>Contest</strong> Hero</span><span class="status-tag">Beta</span></div>
      </router-link>
      <div class="menu-options" v-if="user">
          <el-tooltip class="item" effect="dark" content="Feed" placement="bottom-start">
        <router-link to="/"><i class="material-icons">dashboard</i></router-link>
          </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Add Contest" placement="bottom-start">
        <router-link to="/create-contest"><i class="material-icons">add_circle_outline</i></router-link>
            </el-tooltip>
        <img class="user-image" :src="userImage" alt="">
        <el-dropdown>
      <span class="el-dropdown-link">
      <i class="material-icons"> keyboard_arrow_down</i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><a class="nav-link" href="https://discord.gg/ZscukvW" target="_blank">Chat on Discord</a></el-dropdown-item>
        <el-dropdown-item><a class="nav-link" href="#" @click.prevent="$steemconnect.follow(user.name, 'contest-hero')">Follow Contest Hero</a></el-dropdown-item>
        <el-dropdown-item><a class="nav-link" href="https://github.com/tobias-g1/contest-hero/issues/new" target="_blank">Report an Issue</a></el-dropdown-item>
        <el-dropdown-item> <a class="nav-link" href="#" @click.prevent="$store.dispatch('steemconnect/logout')">Log out</a></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      </div>
      <div class="menu-options" v-else>
         <a class="sign-up" target="_blank" href="https://signup.steemit.com/?ref=contesthero">Sign up</a>
        <a class="nav-link" :href="$steemconnect.getLoginURL()"><button class="btn btn-fill login">Login</button></a>
      </div>
    </el-header>
    <aboutbanner v-show="!user" />

      <ElementLoading :active="$store.state.isLoading" spinner="spinner" color="#FF1480" :is-full-screen="true" />
      <router-view/>

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
  computed: {
    userImage: function () {
      return `https://steemitimages.com/u/${this.user.name}/avatar`
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
</style>
