<template>
    <div class="wrapper" ref="wrapper">
      <div class="content"><slot></slot></div>
<!--      要插入slot中的元素不是单一的，所以有div包裹一层，-->
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
                probeType: this.probeType,
                pullUpLoad:this.pullUpLoad,
            })
            //监听滚动的位置,,滚动position.y>1000, v-show，false
            this.scroll.on('scroll',(Position)=>{
                // console.log(Position);
                this.$emit('scroll',Position)
            })
            //监听是否滑到底
            this.scroll.on('pullingUp',()=>{
                 console.log('如果滑到底，打印此消息');
                this.$emit('pullingUp')
            })
            // console.log(this.scroll);
            // this.scroll.refresh()
        },
        methods:{
            //返回到xy位置页面
            scrollTo(x, y, time=500){
                this.scroll.scrollTo(x, y, time)
            },
            //上拉加载完数据
            finishPullUp(){
                this.scroll.finishPullUp()
            },
            //刷新（每次加载图片时使用）
            refresh(){
                this.scroll.refresh()
            }


        }

    }
</script>

<style scoped>

</style>
