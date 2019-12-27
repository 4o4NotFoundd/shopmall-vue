<template>
  <div class="tab-bar">
    <slot></slot>
  </div>

</template>

<script>
  // import TabBarItem from "components/common/tabbar/TabBarItem";
  export default {
    name: "TabBar",
    // components:TabBarItem,
  }
</script>

<style scoped>
  .tab-bar{
    /*width: 100%;*/
    background-color: #f6f6f6;
    box-shadow: 0 -1px 2px rgba(100,100,100,.2);
    height: 49px;
    display: flex;
    position: fixed;
    left:0;
    right: 0;
    bottom: 0px;

  }

</style>
