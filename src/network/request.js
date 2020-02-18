import axios from 'axios'
// const url = "http://106.54.54.237:8000/api/w1";
// const url2 = "http://123.207.32.32:8000/api/w2";
//
// let config = {
//   baseURL: url || url2
// };
export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://106.54.54.237:8000/api/w1',
    baseURL: 'http://106.54.54.237:8000/api/hy',
    //来源：1月13 https://github.com/18849042545/supermall/blob/master/src/network/requerst.js

    //备用
    // baseURL: 'http://123.207.32.32:8000/api/w2',

    timeout:5000
  })
//拦截请求
  instance.interceptors.request.use(config => {
    // console.log('请求拦截');
    return config
  },err=> {
    console.log(err);
  })

//响应拦截
  instance.interceptors.response.use(res => {
    // console.log('响应拦截，请求成功');
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config)
}

