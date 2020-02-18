<template>
    <div class="wrapper" ref="wrapper">
      <div class="content"><slot></slot></div>
<!--      要插入slot中的元素不是单一的，所以有div包裹一层，-->
<!--      滚动效果，拖一下能持续滑动-->
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data(){
            return{
                scroll:null,
            }
        },
        props:{
            probeType:{
                type:Number,
                default:3
            },
            pullUpLoad:{
                type: Boolean,
                default: true
            }
        },
        mounted() {
            this.scroll=new BScroll(this.$refs.wrapper,{
                click:true,  //默认为false，设置为true时，点击div有效
                probeType: this.probeType,//是否监听，设置为动态可选
                pullUpLoad:this.pullUpLoad,
            })
            //监听滚动的位置,,滚动position.y>1000, v-show，false
            this.scroll.on('scroll',(Position)=>{
                // console.log(Position);
              this.$emit('scroll',Position)
            })
            // console.log(this.scroll);
            // 监听是否滑到底
            if (this.pullUpLoad){
              this.scroll.on('pullingUp',()=>{
                console.log('如果滑到底，打印此消息');
                this.$emit('pullingUp')
              })
            }
            // console.log(this.scroll);
        },
        methods:{
            //返回到xy位置页面
            scrollTo(x, y, time){
                // this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
                this.scroll.scrollTo(x, y, time)
            },
            //上拉加载完数据
            finishPullUp(){
                this.scroll.finishPullUp()
            },
            //刷新（每次加载图片时使用）
            refresh(){
                this.scroll.refresh()
            },
            getScrollY(){
              return this.scroll ? this.scroll.y : 0
            }


        }

    }
</script>

<style scoped>

</style>
