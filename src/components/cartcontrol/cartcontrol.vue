<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="removeGood">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count"  v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addGood"></div>
  </div>
</template>
<script>
export default {
  name: 'cartcontrol',
  props: {
    food: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    addGood(e) { // 添加数量
      this.$store.commit('addCartGoods', this.food); // 添加商品
      this.$store.commit('drop', e.target); // 小球飞入
    },
    removeGood() { // 减少数量
      this.$store.commit('decreaseCartGoods', this.food);
    }
  }
};
</script>
<style lang="less" scoped>
  .cartcontrol{
    font-size: 0;
    height: 24px;
    .cart-decrease, .cart-add{
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
    .cart-decrease{
      &.move-enter-active,&.move-leave-active{
        transition: all .3s linear;
      }
      &.move-enter{
        opacity: 0;
        transform: translate3d(24px,0,0) rotate(180deg);
      }
      &.move-leave-to{
        opacity: 0;
        transform: translate3d(24px,0,0) rotate(180deg);
      }
    }
    .cart-count{
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
  }
</style>