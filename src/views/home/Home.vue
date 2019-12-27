<template>
  <div id="home">
    <nav-bar class="nav-bar-home"><div slot="center">购物街</div></nav-bar>
    <scroll class="wrapper"
            ref="scroll"
            :probe-type="3"
            @scroll="getPosition"
            @pullingUp="LoadMore">
<!--      probe-type对应驼峰命名-->
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control
        :title="['流行','新款','精选']"
        @tabClick="tabClick"
      />
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="returnTop" v-show="isShowtop"/>


<!--    <good-list/>-->
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import TabControl from "components/content/tabControl/TabControl"
  import GoodList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/back-top/BackTop";

  import {
      getMultidata,
      getHomegoods
  } from "network/home";
  // import TabControl from "../../components/content/tabControl/TabControl";


  export default {
    name: "Home",
    data(){
        return {
            banners: [],
            recommends: [],
            goods: {
              'pop':{page:0,list:[] },
              'new':{page:0,list:[] },
              'sell':{page:0,list:[] }
            },
            currentType: 'pop',
            isShowtop: true
        }
    },
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodList,
        Scroll,
        BackTop
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },

    created() {
        this.getMultidata()
        this.getHomegoods('pop')
        this.getHomegoods('new')
        this.getHomegoods('sell')
        // this.$bus.$on('loadImgfinish',()=>{
        //     this.$refs.scroll.refresh()
        // })
    },
    mounted(){
        this.$bus.$on('loadImgfinish',()=>{
            this.$refs.scroll.refresh()
        })
    } ,
    methods:{
        /**
         * 网络请求相关
         */
        getMultidata(){
            getMultidata().then(res => {
                // console.log(res);
                this.banners=res.data.banner.list;
                this.recommends=res.data.recommend.list;
            })
        },
        getHomegoods(type){
            const page=this.goods[type].page+1
            getHomegoods(type,page).then(res=>{

                this.goods[type].list.push(...res.data.list);
                this.goods[type].page+=1;
                // console.log(this.goods[type].list);
                this.$refs.scroll.finishPullUp()
                // this.$refs.scroll.scroll.refresh()

            })
        },
        /**
         * 事件监听相关
         * @param index
         */
        //点击选择“流行，新款，精选”
        tabClick(index){
            switch(index){
                case 0:
                    this.currentType='pop'
                    break
                case 1:
                    this.currentType='new'
                    break
                case 2:
                    this.currentType='sell'
                    break
            };
            console.log(this.currentType);
        },
        //点击返回到顶部
        returnTop(){
            this.$refs.scroll.scrollTo(0, 0, 1000)
        },
        //上拉，在y>1000时出现top图标
        getPosition(position){
            this.isShowtop = (-position.y)>1000
            // console.log(position.y);
            // console.log(this.isShowtop);
        },
        //载入下一页数据
        LoadMore(){
            this.getHomegoods(this.currentType)
        },
        //继续！
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;

  }
  .nav-bar-home{
    background-color: #ff5777;
    font-size: 18px;
    color: #f6f6f6;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }
  .wrapper{
    top:44px;
    bottom: 49px;
    overflow: hidden;
    position: absolute;
  }
</style>
