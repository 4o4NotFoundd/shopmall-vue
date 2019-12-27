<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
    import GoodsListItem from './GoodsListItem'

    export default {
        name: "GoodsList",
        components: {
            GoodsListItem
        },
        props: {
            goods: {
                //对应home中绑定的属性
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-around;*/
    justify-content: space-around;


    padding: 2px;
    float: top;
  }


</style>
