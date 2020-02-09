<template>
    <div class="tab-control">
      <div v-for="(item,index) in title"
           class="tab-control-item"
           :class="{active: index === currentIndex}"
           @click="currentClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
<!--  选中的颜色变化-->
</template>

<script>
    export default {
        name: "TabControl",
        // 流行，新款，精选
        data(){
            return{
                currentIndex: 0
            }
        },
        props:{
            title:{
                type:Array,
                default(){//default是对象的时候必须用函数
                    return []
                }
            }
        },
        methods:{
            currentClick(index){
                this.currentIndex=index
                this.$emit('tabClick',index)
                console.log(index);
            }
        }
    }
</script>

<style scoped>
.tab-control{
  display: flex;
  /*flex布局，flex 1 均等分*/
  /*position: sticky;*/
  /*top: 44px;*/
  z-index: 9;
  background-color: var(--color-background);
}
  .tab-control-item{
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    flex: 1;
  }
  .active{

  }
  .active span{
    color: var(--color-high-text);
    border-bottom: 3px solid #ff8198;
    padding: 5px;
  }
</style>
