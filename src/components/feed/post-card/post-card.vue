<template>
  <div class="card">
      <span class="card-header" v-bind:style="imageBackground">
              <div v-bind:class='modifiers' class="status-tag">{{ status }}</div>
      				<span class="card-title">
      				<a v-bind:href="postLink"><h3>{{ post.title }}</h3></a>
      				</span>
      </span>
      <span class="card-summary">
      			<div class="post-stats">
            <div class="stats-item">
    <i class="material-icons">message</i> <span>{{ post.children }}</span>
  </div>
  <div class="stats-item">
    <i class="material-icons">thumb_up</i> <span>{{ post.net_votes }}</span>
  </div>
  </div>
  <span class="contest-details">A {{ contestType }} contest created by {{ post.author }} </span>
  
  </span>
  </div>
</template>

<script>
  export default {
    name: 'feed-item',
    props: {
      post: Object
    },
    data() {
      return {
        modifiers: {
          'contest--open': true,
          'contest--closed': false
        },
      }
    },
    computed: {
      imageBackground: function() {
  
        let postImage = JSON.parse(this.post.json_metadata);
  
        // Check if a post image can be found in the JSON metadata of post and if doesn't exist set a default 
  
        if ('image' in postImage) {
          postImage = postImage.image[0]
        } else {
          postImage = "https://hlfppt.org/wp-content/uploads/2017/04/placeholder-768x576.png"
        }
  
        let imageBackground = `background-image: url(${postImage});`
  
        return imageBackground
      },
      postLink: function() {
        let postLink = `#/contest/${this.post.author}/${this.post.permlink}`
        return postLink;
      },
      status: function() {
        let status = 'open'
        return status
      },
      contestType: function() {
        let contestType = 'writing'
        return contestType
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  .post-stats {
    display: inline-flex;
    padding: 3px;
  }
  
  .stats-item {
    display: inline-flex;
    font-size: 14px;
  }
  
  .stats-item span {
    padding: 2px 6px;
  }
  
  .stats-item i {
    font-size: 19px;
    padding: 1px;
  }
  
  .contest-details {
    font-size: 11px;
    text-align: right;
    font-weight: bold;
  }
  
  .status-tag {
    padding: 7px 10px;
    margin: 10px;
    height: fit-content;
    border-radius: 5px;
    border: 2px solid;
    font-size: 13px;
    font-weight: bold;
  }
  
  .contest--open {
    color:  #3B773B;
    background: #DFF0D7;
    border-color: #D6EAC5;
  }
  
  .contest--closed {
    color: #c70047;
    background: #F2DEDE;
     border-color: #ECCCD1;
  }
  
  .cards {
    display: -webkit-flex;
    display: inline-flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  .card {
    position: relative;
    background: #fefff9;
    color: #363636;
    text-decoration: none;
    -moz-box-shadow: rgba(0, 0, 0, 0.19) 0 0 8px 0;
    -webkit-box-shadow: rgba(0, 0, 0, 0.19) 0 0 8px 0;
    box-shadow: rgba(0, 0, 0, 0.19) 0 0 8px 0;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    margin: 10px;
  }
  
  @media (max-width: 700px) {
    .card {
      width: 100%;
    }
  }
  
  @media (min-width: 700px) {
    .card {
      width: 300px;
    }
  }
  
  .card span {
    display: inline-flex;
  }
  
  .card .card-summary {
    padding: 5% 5% 5% 5%;
  }
  
  .card .card-header {
    position: relative;
    height: 175px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: rgba(255, 255, 255, 0.15);
    background-blend-mode: overlay;
    -moz-border-radius: 4px 4px 0 0;
    -webkit-border-radius: 4px;
    border-radius: 4px 4px 0 0;
    display: flex;
    flex-direction: row-reverse;
  }
  
  .card .card-header:hover,
  .card .card-header:focus {
    background-color: rgba(255, 255, 255, 0);
  }
  
  .card .card-title {
    background: #FF1480;
    color: white;
    font-family: 'Roboto Condensed', sans-serif;
    text-transform: uppercase;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-shadow: inset 0 0 20px 10px #96969629;
  }
  
  .card .card-title h3 {
    font-size: 14px;
    padding: 5px 10px;
    margin: 0;
    color: white;
    text-align: center;
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 20px;
  }
  
  .card .card-title a {
    text-decoration: none;
    color: white;
    width: 100%;
    margin: 5px;
  }
  
  .card .card-title a:hover {
    text-decoration: underline;
  }
  
  .card:hover,
  .card:focus {
    background: white;
    -moz-box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 20px 0px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 20px 0px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 20px 0px;
  }
  
  .card:hover .card-title,
  .card:focus .card-title {
    background: #FF1480 0.5;
  }
  
  img {
    max-width: 100%;
  }
  
  body {
    background: #f0f0f0;
    font-size: 17px;
    line-height: 1.4;
    font-family: 'Jaldi', sans-serif;
  }
  
  * {
    -moz-transition-property: background-color, border-color, box-shadow, color, opacity, text-shadow, -moz-transform;
    -o-transition-property: background-color, border-color, box-shadow, color, opacity, text-shadow, -o-transform;
    -webkit-transition-property: background-color, border-color, box-shadow, color, opacity, text-shadow, -webkit-transform;
    transition-property: background-color, border-color, box-shadow, color, opacity, text-shadow, transform;
    -moz-transition-duration: 0.2s;
    -o-transition-duration: 0.2s;
    -webkit-transition-duration: 0.2s;
    transition-duration: 0.2s;
    -moz-transition-timing-function: linear;
    -o-transition-timing-function: linear;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
  }
</style>

