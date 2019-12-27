import {request} from "./request";

export function getMultidata() {
  return request({
    url:'/home/multidata'
  })
}
export function getHomegoods(type,page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })

}
// function test() {
//   const names = ['why', 'aaa']
// }
//
// test()
