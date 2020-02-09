<template>
  <div id="home">
    <nav-bar class="nav-bar-home"><div slot="center">购物街</div></nav-bar>
    <tab-control :title="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isFixed"/>
    <scroll class="wrapper"
            ref="scroll"
            :probe-type="3"
            @scroll="getPosition"
            @pullingUp="LoadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :title="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="returnTop" v-show="isShowtop"/>

<!-- 返回顶部组件，组件不能直接监听，要使用修饰符nativeprobe-type对应驼峰命名--            scroll中的@pullingUp="LoadMore",day11去掉了-->
<!--动态绑定样式，：class=‘{样式名：控制变量是否显示}’-->

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



  import {getMultidata, getHomegoods} from "network/home";
  import {debounce} from "common/utils.js";
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
            isShowtop: true,
            tabOffsetTop: 0,
            isFixed: false,
            saveY:0
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
    destroyed() {
      console.log('home destroyed ');
    },

    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY=this.$refs.scroll.getScrollY()
    },
    created() {
        this.getMultidata()
        this.getHomegoods('pop')
        this.getHomegoods('new')
        this.getHomegoods('sell')

    },
    mounted(){
       // 1, 图片加载完成的监听
        const refresh = debounce(this.$refs.scroll.refresh,200)
        this.$bus.$on('loadImgfinish',()=>{
            refresh()
        })
      // 2.获取tabcontrol的offsetTop
      //所有组件都有一个属性 $el :用于获取组件中的元素
      // swiperImageLoad
      // console.log(this.$refs.tabControl.$el.offsetTop);
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
                //使用...将data.list中的数组元素都push到good。list中
                this.goods[type].page+=1;
                // console.log(this.goods[type].list);
                // 完成上拉加载更多
                this.$refs.scroll.finishPullUp()
                // this.$refs.scroll.scroll.refresh()

            })
        },
        /**
         * 事件监听相关
         * @param index
         */
        //防抖处理，把refresh等30次之后执行
        //   settimeout作用：如果下一次执行来的很快，那么会先将上一次取消，再执行,函数放在commoon utils中

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
            }
            this.$refs.tabControl1.currentIndex=index
            this.$refs.tabControl2.currentIndex=index
          //吸顶和未吸顶时的三个选项
            // console.log(this.currentType);
        },
        //点击返回到顶部
        returnTop(){
            this.$refs.scroll.scrollTo(0, 0, 1000)
          // 在其他地方使用scroll组件中的方法--$refs.scroll.方法，scrollTo（x,y,time)
        },
        //上拉，在y>1000时出现top图标,吸顶效果
        getPosition(position){
            this.isShowtop = (-position.y)>1000
            // console.log(position.y);
            // console.log(this.isShowtop);
            this.isFixed = (-position.y) > this.tabOffsetTop
        },
        //载入下一页数据
        LoadMore(){
            this.getHomegoods(this.currentType)
        },
        //继续！
        swiperImageLoad(){
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop ;
          //非父子组件不能直接拿元素，通过$el来拿，在tabcontrol中设置ref属性，才能

        }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;

  }
  .nav-bar-home{
    background-color: #ff5777;
    /*font-size: 18px;*/
    color: #f6f6f6;
    /*在使用浏览器原生滚动时position设置为fixed*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 5;*/
  }
  .wrapper{
    top:44px;
    bottom: 49px;
    overflow: hidden;
    position: absolute;
  }
  .tab-control{
    position: relative;
    z-index: 9;
    /*导航吸顶效果*/

  }
</style>
