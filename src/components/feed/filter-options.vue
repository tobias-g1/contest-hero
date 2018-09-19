<template>
          <div class="filter-options grid-content">
        <h2>Contests</h2>
        <span class="filter-option filter-active">All Contests</span>
        <span class="filter-option">Writing Contests</span>
        <span class="filter-option">Design Contests</span>
        <span class="filter-option">Video Contests</span>
        <span class="filter-option">Photo Contests</span>
        <span class="filter-option">Other Contests</span>
      </div>
</template>
<script>
export default {
        name: 'filter-options'
}
</script>
<style>
  ul li {
display: block;
list-style-type: none;
  }

  .filter-option {
    display: flex; 
    padding: 15px;
    border-radius: 5px;
    font-weight: bold; 
    cursor: pointer;
  }

  .filter-option.filter-active {
    background:#FF1480;
    color: white;
  }
</style>


