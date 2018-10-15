<template>
     <div class="winner-card-container">
        <div class="winner-details-wrapper">
        <div class="winner-image-container">
            <img class="winner-image" :src="selectedProfileImage" alt="">
        </div>
        <div class="winner-selection-details">
            <span class="author-text">{{ winner.entry_details.author }}</span>
            <span class="title-text">{{ winner.entry_details.title }}</span>
             <span class="">{{ winner.place }}</span>
        </div>
        </div>
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="material-icons selection">more_vert</i>
                    </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item> <span class="dropdown-option" @click="removeWinner()">Remove</span> </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
  name: 'selected-winner',
  props: {
    winner: Object
  },
  computed: {
    selectedProfileImage: function () {
      return `https://steemitimages.com/u/${this.winner.entry_details.author}/avatar`
    }
  },
  methods: {
    removeWinner () {
      this.$emit('deleteWinner', {
        _id: this.winner.entry_details._id
      })
    }
  }
}
</script>

<style>
   .winner-card-container {
        background: white;
        padding: 30px;
        margin-bottom: 15px;
        box-shadow: 0 0 10px 2px #f1f1f1;
        border-radius: 5px;
        box-sizing: border-box;
        display: flex;
        margin-top: 15px;
    }

    .winner-image-container {
        background: white;
        border-radius: 50px;
        height: 45px;
        width: 45px;
        max-width: 45px;
        box-shadow: 0 0 10px 2px #f1f1f1;
        display: inline-flex;
        vertical-align: middle;
    }

    .winner-image {
        height: inherit;
    }

    .winner-selection-details {
            display: block;
    margin: 0 10px;
    }

    .winner-text {
        display: block;
    font-weight: bold;
    font-size: 15px;
    }

    .winner-text {
        font-size: 14px;
    font-weight: lighter;
    }

    .winner-details-wrapper {
            display: inline-flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    padding: 0 !important;
    flex: 1;
    }

    .el-dropdown {
        height: fit-content;
    }
</style>
