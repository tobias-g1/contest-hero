<template>
    <div class="entry-card-container">
        <div class="details-wrapper">
        <div class="entry-image-container">
            <img class="entry-image" :src="entryProfileImage" alt="">
        </div>
        <div class="entry-selection-details">
            <span class="author-text">{{ entry.author }}</span>
            <span class="title-text">{{ entry.title  }}</span>
        </div>
        </div>
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="material-icons selection">more_vert</i>
                    </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item> <span class="dropdown-option" @click="setPlace(1)">Set as 1st Place</span> </el-dropdown-item>
                <el-dropdown-item> <span @click="setPlace(2)">Set as 2nd Place</span></el-dropdown-item>
                <el-dropdown-item> <span @click="setPlace(3)">Set as 3rd Place</span></el-dropdown-item>
                <el-dropdown-item> <span @click="setPlace(1000)">Set as winner</span></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
  name: 'entry-card',
  props: {
    entry: Object
  },
  computed: {
    entryProfileImage: function () {
      return `https://steemitimages.com/u/${this.entry.author}/avatar`
    }
  },
  methods: {
    setPlace (place) {
      this.$emit('setPlace', {
        entry: this.entry,
        place: place
      })
    }
  }
}
</script>

<style>
    .entry-card-container {
        background: white;
        padding: 30px;
        margin-bottom: 15px;
        display: inline-flex;
        box-shadow: 0 0 10px 2px #f1f1f1;
        border-radius: 5px;
        flex: 1 0 250px;
        margin-right: 10px;
        box-sizing: border-box;
    }

    .entry-image-container {
        background: white;
        border-radius: 50px;
        height: 45px;
        width: 45px;
        max-width: 45px;
        box-shadow: 0 0 10px 2px #f1f1f1;
        display: inline-flex;
        vertical-align: middle;
    }

    .entry-image {
        height: inherit;
    }

    .entry-selection-details {
            display: block;
    margin: 0 10px;
    }

    .author-text {
        display: block;
    font-weight: bold;
    font-size: 15px;
    }

    .title-text {
        font-size: 14px;
    font-weight: lighter;
    }

    .details-wrapper {
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
