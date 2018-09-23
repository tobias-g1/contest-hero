<template>
  <el-container id="app">
    <el-header>
      <router-link to="/">
        <div class="logo-container"><span class="text-logo"><strong>Contest</strong> Hero</span></div>
      </router-link>
      <div class="menu-options">
        <router-link to="/"><i class="material-icons">dashboard</i></router-link>
        <router-link to="/create-contest"><i class="material-icons">add_circle_outline</i></router-link>
      </div>
    </el-header>
    <div class="banner-pattern">
      <div class="about-banner"><span>Contest Hero helps you to find, create and enter the best contests on the Steem Blockchain</span></div>
    </div>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  body {
    background: #FAFAFA;
    margin: 0;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  }
  
  h1.header {
    font-weight: bold;
    font-size: 20px;
    text-transform: capitalize;
    margin: 20px 0;
  }
  
  h2.header {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin: 20px 0;
  }
  
  h3.header {
    margin: 20px 0;
  }
  
  a {
    word-wrap: break-word;
  }
  
  button {
    padding: 10px;
    border: 0;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-right: 10px;
  }
  
  .btn-fill {
    background: #FF1480;
    color: white;
  }
  
  .el-header {
    height: auto !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 25px 50px !important;
    background: white;
    box-shadow: 0 0 10px 2px #0000001f;
  }
  
  .el-header a {
    text-decoration: none;
  }
  
  .el-main {
    color: #333;
    padding: 20px 50px !important;
  }
  
  body>.el-container {
    margin-bottom: 40px;
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
  
  .small-circle {
    height: 15px;
    margin-right: 0.5rem;
  }
  
  .material-icons {
    color: #000000
  }
  
  .router-link-active {
    color: #000000;
  }
  
  .material-icons:hover {
    color: #FF1480;
  }
  
  .banner-pattern {
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #6710ff, #FF1480);
  }
  
  .about-banner {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.7' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
    min-height: 100px;
    color: white;
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    font-size: 18px;
    padding: 50px 15%;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: bold;
  }
</style>
