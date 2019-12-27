<template>

  <div class="tab-bar-item" @click="clickisActive">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div v-bind:style="activeStyle"><slot name="item-name-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
        path: String,
        activeColor: {
            type: String,
            default: 'red'
        }
      },
    data(){
        return{
            // isActive:false
        }
        // active:false
    },
    methods:{
        clickisActive() {
            this.$router.replace(this.path)
            // return this.isActive=!this.isActive
        }
    },
    computed:{
        isActive(){
            // 判断当前活跃的path是否和点击的path一致,方法一：
            // return this.$route.path == this.path ? {true}:{false}
            // ,待优化
            if(this.$route.path == this.path){
                return true
            }
            else return false
            // 方法二
            // return this.$route.path.indexOf(this.path)!==-1
        },
        activeStyle(){
            return this.isActive ? {color: this.activeColor}:{}
        }
    }

  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    /*line-height: 49px;*/
    font-size: 14px;
    margin-top: 3px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
  }
/*.active{*/
/*  color: #ff5777;*/
/*}*/
</style>
