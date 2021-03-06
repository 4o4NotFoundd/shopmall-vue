import {request} from "../network/request";

export function debounce(func,delay){
  let timer=null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer=setTimeout(()=>{
      func.apply(this,args)
    },delay)
    //settimeout中的函数在最后执行
  }
}

//防抖处理，把refresh等30次之后执行
//   settimeout作用：如果下一次执行来的很快，那么会先将上一次取消，再执行,函数放在commoon utils中

//时间格式化，
export function formatDate(date, fmt) {
  //1.获取年份，
  // y+表示一个或多个y,
  // y*表示0个或多个y，
  //  y？表示0个或1个y

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    // substr截取年份
  }
  //2.获取，不和年份一起的原因，获得方式不一样
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
// strwz4时，004截取一位，变成04


