<template>
    <nav-bar>
      <div slot="left" class="backImg" @click="clickBack">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="nav-bar-title">
        <div v-for="(item,index) in title"
             class="title-item"
             @click="currentTitle(index)"
             :class="{active: currentIndex===index}">{{item}}
        </div>
      </div>
    </nav-bar>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";

    export default {
        name: "DetailNavBar",
        components: {
          NavBar
        },
        data() {
          return {
            title: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
          }
        },
        methods: {
          currentTitle(index){
            this.currentIndex = index;
          },
          clickBack() {
            this.$router.back()
          }
        }
    }

</script>

<style scoped>
.nav-bar-title{
  display: flex;
}
  .title-item{
    flex: 1;
  }
  .active{
color: #ff8198;
  }
  .backImg img{
    margin-top: 12px;
  }
</style>
