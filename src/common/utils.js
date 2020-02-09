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
