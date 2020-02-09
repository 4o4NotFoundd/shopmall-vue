<template>
  <detail-nav-bar></detail-nav-bar>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import {getDetail} from "network/detail";
    export default {
        name: "Detail",
        components: {
          DetailNavBar,
        },
        data(){
          return {
            iid: null
          }
        },
        created() {
          // 1.保存传入的iid
          this.iid = this.$route.params.iid
          //2。根据iid获取详细商品信息
          getDetail(this.iid).then(res=>{
            console.log(res);
          })
        }

    }
</script>

<style scoped>

</style>
