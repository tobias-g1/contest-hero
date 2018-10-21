<template>
    <div id="main">
        <div class="not-found-container">
            <h1>404 Page not found</h1>
            <span>Sorry, the page you requested cannot be found, This might be because you have typed the web address incorrectly, or
    the page you were looking for may have been moved, updated or deleted.
    </span>
        <router-link to="/contests/"><button class="btn btn-outline">View Contests</button></router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: '404'
}
</script>

<style src='@/pages/404/404.css'>

</style>
