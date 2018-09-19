<template>
  <el-container id="app">
    <el-header>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
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
  
  h3 {

  }
  
  h4 {

  }
  
  h5 {
 
  }
  
  .el-main {
    color: #333;
    padding:  20px 100px !important;
  }

  .el-header {
    background: white;
  }
  
  body>.el-container {
    margin-bottom: 40px;
  }
</style>
