<template>
  <el-container id="app">
    <el-header>
       <router-link to="/"><div class="logo-container"><span class="text-logo"><strong>Contest</strong> Hero</span></div></router-link>
      <div class="menu-options">
        <router-link to="/"><i class="material-icons">dashboard</i></router-link>
        <router-link to="/create-contest"><i class="material-icons">add_circle_outline</i></router-link>
      </div>
    </el-header>
       <div class="about-banner"><span>Contest Hero helps you to find, create and enter the best contests on the Steem Blockchain</span></div>
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
  
  button {
    padding: 10px;
    border: 0;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .btn-fill {
    background: linear-gradient(45deg, #FF1480, #CC59D5);
    color: white;
  }
  
  .el-header {
    height: auto !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 25px 100px !important;
    background: white;
    box-shadow: -1px 2px 10px #29292912;
  }

  .el-header a {
    text-decoration: none;
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
    justify-content: space-between;
    width: 60px;
  }
  
  .text-logo {
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  
  .small-circle {
    height: 15px;
    margin-right: 0.5rem;
  }

  .material-icons {
    color: #000000
  }

  .material-icons:hover {
    color:  #FF1480;
  }

    .about-banner {
    background:#FF1480;
    min-height: 100px;
    color: white;
    text-align: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%23000000' fill-opacity='0.04'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");
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
