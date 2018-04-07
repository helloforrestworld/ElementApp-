<template>
  <div class="shopcart">
    <div class="content" @click="foldList">
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
      <div class="content-right" @click.stop.prevent>
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
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空购物车</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food, index) in cartGoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import cartcontrol from '../cartcontrol/cartcontrol';
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
  components: {
    cartcontrol
  },
  data() {
    return {
      fold: true // 默认折叠购物车详情
    };
  },
  computed: {
    deliveryPrice() { // 送餐费
      return this.$store.state.seller.deliveryPrice;
    },
    minPrice() { // 起送价
      return this.$store.state.seller.minPrice;
    },
    cartGoods() { // 购物车数据
      return this.$store.state.cartGoods;
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
    },
    listShow() { // 购物车详情显示隐藏
      if (this.totalCount === 0) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      return show;
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
    },
    foldList() { // 购物车折叠
      if (!this.totalCount) return;
      this.fold = !this.fold;
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
    .shopcart-list{
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      &.fold-enter-active,&.fold-leave-active{
        transition: all .3s linear;
      }
      &.fold-enter{
        transform: translate3d(0,0,0);
      }
      &.fold-enter-to{
        transform: translate3d(0,-100%,0);
      }
      &.fold-leave{
        transform: translate3d(0,-100%,0);
      }
      &.fold-leave-to{
        transform: translate3d(0,0,0);
      }
      .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0px 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title{
          float: left;
          font-size: 14px;
          color:rgb(7,17,27);
        }
        .empty{
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content{
        
      }
    }
  }
</style>