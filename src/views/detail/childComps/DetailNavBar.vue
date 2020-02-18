<template>
    <nav-bar>
      <div slot="left" class="backImg" @click="clickBack">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="nav-bar-title" ref="scroll1">
        <div v-for="(item,index) in title"
             class="title-item"
             :class="{active: currentIndex===index}"
             @click="titleClick(index)">
          <span>{{item}}</span>
        </div>
      </div>
    </nav-bar>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import Scroll from "components/common/scroll/Scroll";

    export default {
        name: "DetailNavBar",
        components: {
          NavBar,
          Scroll
        },
        data() {
          return {
            title: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
          }
        },
        methods: {
          titleClick(index){
            this.currentIndex = index;
            // console.log(index);
            this.$emit('titleClick',index)
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
