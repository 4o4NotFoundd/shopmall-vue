<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="loadImg">
<!--    loadim事件监听图片是否加载完成，完成则refresh，重新计算srrollheight-->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>

  <!--  </div>-->
  <!--    <div v-for="item in goodsItem">-->
  <!--      <a :href="goodsItem.link">-->
  <!--        <img :src="goodsItem.show.img">-->

  <!--        <span>{{goodsItem.title}}</span>-->
  <!--      </a>-->
  <!--    </div>-->

</template>

<script>
    export default {
        name: "GoodsListItem",
        computed: {
          showImage() {
            return this.goodsItem.image || this.goodsItem.show.img
          }
        },
        props:{
            goodsItem:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            loadImg(){
                this.$bus.$emit('loadImgfinish')
// 监听事件
            },
            itemClick(){
              // console.log('跳转到详情页面');
              this.$router.push('/detail/' + this.goodsItem.iid)
            }
        }

    }
</script>

<style scoped>
.goods-item{
  width: 48%;
  padding-bottom: 40px;
  position: relative;

}
  .goods-item img{
    width: 100%;
    /*height: 50%;*/
    border-radius: 10px;
  }
  .goods-info{
    position: absolute;
    /*float: top;*/
    left: 0;
    right: 0;
    /*bottom: 5px;*/
    font-size: 12px;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 20px;
    line-height: 20px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right:20px;
  }
.goods-info .collect{
  position: relative;
}
  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px
  }
</style>

