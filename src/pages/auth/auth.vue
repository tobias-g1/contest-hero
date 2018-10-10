
<template>
  <div id="auth">
    <div class="auth-container">
      <h1>Logging In</h1>
      <span> We are logging you into Contest Hero now, it shouldn't take more than a few seconds...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'auth',
  async mounted () {
    let accessToken = this.$route.query['access_token']
    if (accessToken) {
      localStorage.setItem('access_token', accessToken)
      await this.$store.dispatch('steemconnect/login')
      this.$router.push('/')
    }
  }
}
</script>

<style src='@/pages/auth/auth.css'>
