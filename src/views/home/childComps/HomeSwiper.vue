<template>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" @load="imageload">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name: "HomeSwiper",
        components:{
            Swiper,
            SwiperItem
        },
      data(){
          return {
            isLoad: false
          }
      },
        props:{
            banners:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
          imageload(){
            if(!this.isLoad){
              this.$emit('swiperImageLoad')
              this.isLoad = true
              //通过isload保证只执行一次
            }
          }
        }

    }
</script>

<style scoped>

</style>
