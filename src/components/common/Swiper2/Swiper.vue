<!--<template>-->
<!--<div id="hy-swiper">-->
<!--  <div class="swiper">-->
<!--    <slot></slot>-->
<!--  </div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "Swiper",-->
<!--        props:{-->
<!--            interval:{//3秒滚动一张图-->
<!--                type: Number,-->
<!--                default:3000-->
<!--                },-->
<!--            animDuration:{//延迟0.3秒开始拖动-->
<!--                type: Number,-->
<!--                default: 300-->
<!--            },-->
<!--        },-->
<!--        data: function () {-->
<!--            return{-->
<!--                slideCount: 0, // 元素个数-->
<!--                totalWidth: 0, // swiper的宽度-->
<!--                swiperStyle: {}, // swiper样式-->
<!--                currentIndex: 1, // 当前的index-->
<!--                scrolling: false, // 是否正在滚动-->
<!--            }-->
<!--        },-->
<!--        mounted() {-->
<!--            // 1.操作DOM, 在前后添加Slide-->
<!--            setTimeout(()=>{-->
<!--                this.handleDom();-->
<!--                // 2.开启定时器-->
<!--                this.startTimer();-->
<!--            },100)-->
<!--        },-->
<!--        methods:{-->
<!--            /**-->
<!--             * 操作DOM, 在DOM前后添加Slide-->
<!--             */-->
<!--            // 1.操作DOM, 在前后添加Slide-->
<!--            handleDom(){-->
<!--                // 1.获取要操作的元素-->
<!--                let swiperEl = document.querySelector('.swiper');-->
<!--                let slidesEls = swiperEl.getElementsByClassName('slide');-->

<!--                // 2.保存个数-->
<!--                this.slideCount=slidesEls.length;-->

<!--                // 3.如果大于1个, 那么在前后分别添加一个slide-->
<!--                if(this.slideCount>1){-->
<!--                    let cloneFirst = slidesEls[0].cloneNode(true);-->
<!--                    // cloneNode方法复制节点-->
<!--                    let cloneLast = slidesEls[this.slideCount-1].cloneNode(true);-->
<!--                    swiperEl.insertBefore(cloneLast, slideEls[0]);-->
<!--                    // let insertedNode = parentNode.insertBefore(newNode, referenceNode);-->
<!--                    // 插入节点用法-->
<!--                    swiperEl.appendChild(cloneFirst);-->
<!--                    this.totalWidth = swiperEl.offsetWidth;-->
<!--                }-->

<!--                // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)-->
<!--                this.setTransform(-this.totalWidth);-->

<!--            },-->

<!--            // 2.开启定时器-->
<!--            startTimer () {-->
<!--                this.playTimer = window.setInterval(() => {-->
<!--                    this.currentIndex++;-->
<!--                    this.scrollContent(-this.currentIndex * this.totalWidth);-->
<!--                }, this.interval)-->
<!--            },-->
<!--            stopTimer: function () {-->
<!--                window.clearInterval(this.playTimer);-->
<!--            },-->

<!--            // 滚动到正确的位置-->
<!--            scrollContent: function (currentPosition) {-->
<!--                // 0.设置正在滚动-->
<!--                this.scrolling = true;-->

<!--                // 1.开始滚动动画-->
<!--                this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';-->
<!--                //transition 过渡-->
<!--                this.setTransform(currentPosition);-->

<!--                // 2.判断滚动到的位置-->
<!--                this.checkPosition();-->

<!--                // 4.滚动完成-->
<!--                this.scrolling = false-->
<!--            },-->

<!--            //设置滚动的位置-->
<!--            setTransform: function (position) {-->
<!--                this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;-->
<!--                this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;-->
<!--                this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;-->
<!--            },-->

<!--            checkPosition: function () {-->
<!--                window.setTimeout(() => {-->
<!--                    // 1.校验正确的位置-->
<!--                    this.swiperStyle.transition = '0ms';-->
<!--                    if (this.currentIndex >= this.slideCount + 1) {-->
<!--                        this.currentIndex = 1;-->
<!--                        this.setTransform(-this.currentIndex * this.totalWidth);-->
<!--                    } else if (this.currentIndex <= 0) {-->
<!--                        this.currentIndex = this.slideCount;-->
<!--                        this.setTransform(-this.currentIndex * this.totalWidth);-->
<!--                    }-->

<!--                    // 2.结束移动后的回调-->
<!--                    this.$emit('transitionEnd', this.currentIndex-1);-->
<!--                }, this.animDuration)-->
<!--            },-->

<!--            /**-->
<!--             * 控制上一个, 下一个-->
<!--             */-->
<!--            previous: function () {-->
<!--                this.changeItem(-1);-->
<!--            },-->

<!--            next: function () {-->
<!--                this.changeItem(1);-->
<!--            },-->

<!--            changeItem: function (num) {-->
<!--                // 1.移除定时器-->
<!--                this.stopTimer();-->

<!--                // 2.修改index和位置-->
<!--                this.currentIndex += num;-->
<!--                this.scrollContent(-this.currentIndex * this.totalWidth);-->

<!--                // 3.添加定时器-->
<!--                this.startTimer();-->
<!--            }-->


<!--        }-->

<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--#hy-swiper {-->
<!--  overflow:hidden;-->
<!--  position: relative;-->
<!--  /*background-color: blue;*/-->
<!--  /*height: 200px;*/-->
<!--}-->
<!--  .swiper{-->
<!--    display: flex;-->
<!--  }-->
<!--</style>-->
