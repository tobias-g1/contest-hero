<template>
  <el-container id="app">
    <el-header>
      <div class="logo-container"><span class="text-logo"><strong>Contest</strong> Hero</span></div>
      <div class="menu-options">
        <router-link to="/">Home</router-link>
        <router-link to="/create-contest">Create Contest</router-link>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<style>
  body {
    background: #FAFAFA;
    margin: 0;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  }
  
  h1 {
    font-weight: bold;
    font-size: 20px;
  }
  
  h2 {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  
  h3 {}
  
  h4 {}
  
  h5 {}
  
  .el-header {
    height: auto !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 25px 100px !important;
    background: white;
    box-shadow: -1px 2px 10px #29292912;
  }
  
  .el-main {
    color: #333;
    padding: 20px 100px !important;
  }
  
  body>.el-container {
    margin-bottom: 40px;
  }
  
  .logo-container {
    display: inline-flex;
  }
  
  .menu-options {
    display: inline-flex;
  }
  
  .text-logo {
    letter-spacing: 3px;
    text-transform: uppercase;
  }
</style>
