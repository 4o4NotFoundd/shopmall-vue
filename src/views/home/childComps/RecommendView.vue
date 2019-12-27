<template>
  <div class="recommend">
  <div v-for="item in recommends" class="recommend-item">
    <a :href="item.link">
      <img :src="item.image">
      <div>{{item.title}}</div>
    </a>
  </div>
  </div>
</template>

<script>
    export default {
        name: "RecommendView",
        props:{
            recommends:{
                type:Array,
                default() {
                    return [];
                }
            }
        }
    }
</script>

<style scoped>
.recommend{
 margin-top: 10px;
  height: 130px;
  display: flex;
  border-bottom: 15px solid #eee;
}
  .recommend-item{
    flex: 1;
    text-align: center;
    font-size: 10px;
  }
.recommend-item img{
    width: 70px;
    margin-bottom: 3px;

}
</style>
