
<template>
    <div class="auth-page">
        <span class="auth-message">Logging into contest hero</span>
        <span class="auth-details">You're being logged in, please wait a moment. </span>
    </div>
</template>

<script>
  export default {
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