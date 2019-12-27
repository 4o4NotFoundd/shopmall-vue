<template>
    <div class="tab-control">
      <div v-for="(item,index) in title"
           class="tab-control-item"
           :class="{active: index === currentIndex}"
           @click="currentClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
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
                default(){
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
  position: sticky;
  top: 44px;
  z-index: 6;
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
