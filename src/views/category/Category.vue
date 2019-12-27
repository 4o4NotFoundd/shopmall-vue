<template>
  <div class="wrapper" ref="aaaa">
    <div>
      <ul class="content">
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>

    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name: "Category",
    data(){
        return{
            scroll:null
        }
    },
    mounted() {
        this.scroll=new BScroll(this.$refs.aaaa,{
            // document.querySelector('.wrapper')拿到这个类
            probeType:3,
            pullUpLoad:true
            // probe 侦测
            // 0,1都是不侦测实时的位置
            // 2: 在手指滚动的过程中侦测, 手指离开后的惯性滚动过程中不侦测.
            // 3: 只要是滚动, 都侦测.
        })
        //监听当前滑动位置
        this.scroll.on('scroll',(position)=>{
            console.log(position);
        })
        this.scroll.on('pullingUp',()=>{
            console.log('shangla');
        })
    }
  }
</script>

<style scoped>
.wrapper{
  height: 150px;
  background-color: red;
  overflow: hidden;
}
</style>
