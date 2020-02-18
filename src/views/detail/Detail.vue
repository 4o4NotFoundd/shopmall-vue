<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="scroll"/>
    <Scroll class="content-scroll">
<!--      属性： topImage  传入值时： top-image，因为html标签不区分大小写，标签中用-代表大写-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageload="imageLoad" />
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commenInfo"/>
      <goods-list :goods="recommend" @imageload="imageLoad"/>
    </Scroll>

  </div>

</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "components/content/goods/GoodsList";
    import Scroll from "components/common/scroll/Scroll";
    export default {
        name: "Detail",
        components: {
          DetailSwiper,
          DetailNavBar,
          DetailBaseInfo,
          DetailShopInfo,
          DetailGoodsInfo,
          DetailParamInfo,
          Scroll,
          DetailCommentInfo,
          GoodsList,
        },
        data(){
          return {
            iid: null,
            topImages:[],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commenInfo: {},
            recommend: [],
            tops: [],
            couns: []
          }
        },
        created() {
          // 1.保存传入的iid
          this.iid = this.$route.params.iid
          //2。根据iid获取详细商品信息
          getDetail(this.iid).then(res=>{
            // console.log(res);
            // 顶部轮播图
            const data=res.result;
            this.topImages = data.itemInfo.topImages;
            //商品详情信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //商家信息
            this.shop = new Shop(data.shopInfo);
            //保存商品的详情数据
            this.detailInfo = data.detailInfo;

            //参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

            //评论信息
            if(data.rate.cRate !== 0){
              this.commenInfo = data.rate.list[0]
            }


          })
          //3.推荐商品信息
          getRecommend().then(res=>{
            this.recommend = res.data.list
            // console.log(this.recommend);
          })
        },
        methods:{
          imageLoad(){
            this.$refs.scroll.refresh()

            // 获取参数 评论 推荐 offsetTop值并且保存
            this.tops = [];
            this.tops.push(0);
            this.tops.push(this.$refs.parmas.$el.offsetTop);
            this.tops.push(this.$refs.comment.$el.offsetTop);
            this.tops.push(this.$refs.recommend.$el.offsetTop);
            this.tops.push(Number.MAX_VALUE);
          },
          titleClick(index) {
            console.log(index);
            // console.log(this.$refs.scroll.scrollTo);
            // this.$refs.scroll.scrollTo(0, -100, 300);
            // console.log(this.$refs.scroll);
            // this.$refs.scroll.scroll.scrollTo(0, -this.tops[index], 500);


            this.$refs.scroll.scroll.scrollTo(0, -this.tops[index], 500);
          }
        }
    }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  /*覆盖掉底下四个按钮*/
  background-color: #ffffff;
  height: 100vh;
  /*视图高度100%*/

}
.detail-nav{
  position: relative;
  z-index: 10;
  background-color: #ffffff;
}
  .content-scroll{
    height: calc(100% - 44px);
  }
</style>
