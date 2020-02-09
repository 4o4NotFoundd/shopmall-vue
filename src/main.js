import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import {getMultidata} from "network/home";


Vue.config.productionTip = false
// Vue.prototype.$el= new Vue()

Vue.prototype.$bus= new Vue()
// 将bus注册为一个vue实例，这样就可以使用on监听方法，在Home.vue中

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


// getMultidata({
//   url:'/home/multidata'
// }).then(res=>{
//   console.log(res);
// })

