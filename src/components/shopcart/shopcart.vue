<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'shopcart',
  props: {
    checkGoods: {
      type: Array,
      default() {
        return [
          {
            price: 20,
            count: 1
          }
        ];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    deliveryPrice() { // 送餐费
      return this.$store.state.seller.deliveryPrice;
    },
    minPrice() { // 起送价
      return this.$store.state.seller.minPrice;
    },
    cartGoods() { // 购物车数据
      return this.$store.state.seller.cartGoods;
    },
    totalCount() { // 选中商品总数
      return this.$store.getters.totalCount;
    },
    totalPrice() { // 选中商品总价
      return this.$store.getters.totalPrice;
    },
    payDesc() { // 结算按钮文字
      if (this.totalPrice === 0) {
        return `${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let dis = this.minPrice - this.totalPrice;
        return `还差${dis}元起送`;
      } else {
        return `去结算`;
      }
    },
    payClass() { // 结算按钮样式
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    balls() { // 购物车小球
      return this.$store.state.balls;
    },
    dropBalls() { // 正在移动的购物车小球
      return this.$store.state.dropBalls;
    }
  },
  methods: {
    beforeDrop(el) { // 初始化小球
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      }
    },
    dropping(el, done) {
      /* eslint-disable no-unused-vars */
      // 主动重绘
      let fr = el.offsetLeft;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)';
        el.style.transform = 'translate3d(0, 0, 0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0, 0, 0)';
        inner.style.transform = 'translate3d(0, 0, 0)';
        el.addEventListener('transitionend', done);
      });
    },
    afterDrop(el) {
      this.$store.commit('afterDrop', el);
    }
  }
};
</script>
<style lang="less" scoped>
  .shopcart{
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 48px;
    left: 0;
    bottom: 0;
    .content{
      display: flex;
      background: #141d27;
      font-size: 0;
      color: rgba(255, 255, 255, 0.4);
      .content-left{
        flex:1;
        .logo-wrapper{
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 8px 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          box-sizing: border-box;
          background: #141d27;
          .logo{
            width: 100%;
            height: 100%;
            text-align: center;
            border-radius: 50%;
            background: #2b343c;
            &.highlight{
              background: rgb(0, 160, 220);
              .icon-shopping_cart{
                color: #fff;
              }
            }
            .icon-shopping_cart{
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
            }
          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            background-color: rgb(240, 20, 20);
            color: #fff;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price{
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          line-height: 24px;
          padding-right: 12px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 16px;
          font-weight: 700;
          &.highlight{
            color: #fff;
          }
        }
        .desc{
          display: inline-block;
          vertical-align: top;
          margin: 12px 0 0 12px;
          line-height: 24px;
          font-size: 10px;
        }
      }
      .content-right{
        flex: 0 0 90px;
        width: 90px;
        .pay{
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          &.not-enough{
            background: #2b333b;
          }
          &.enough{
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-container{
      .ball{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
  }
</style>