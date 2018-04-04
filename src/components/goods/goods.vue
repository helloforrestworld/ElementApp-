<template>
  <div id="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item" v-for="(item, index) in goods" :key = "index">
          <span class="text border-1px">
            <span class="icon" v-if="item.type>=0" :class = "classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>
<script>
export default {
  name: 'goods',
  props: {
    'seller': { // 商家数据
      type: Object
    }
  },
  data() {
    return {
      goods: [] // 商品数据
    };
  },
  created() { // 获取商品数据
    this.$http.get('https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/api/goods')
      .then((response) => {
        this.goods = response.data.goods;
      });
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; // 活动图标className
  }
};
</script>
<style lang="less" scoped>
@import '../../common/less/mixin.less';
  #goods{
    position: absolute;
    display: flex;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      overflow-y: auto;
      overflow-x: hidden;
      .menu-item{
        display: table;
        width: 54px;
        height: 56px;
        padding: 0 12px;
        line-height: 14px;
        .text{
          display: table-cell;
          vertical-align: middle;
          font-size: 12px;
          .border-1px(rgba(7, 17, 27, 0.1));
        }
        .icon{
          vertical-align: top;
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-repeat: no-repeat;
          background-size: 12px 12px;
          &.decrease{
            .bg-image('decrease_3');
          }
          &.discount{
            .bg-image('discount_3');
          }
          &.guarantee{
            .bg-image('guarantee_3');
          }
          &.invoice{
            .bg-image('invoice_3');
          }
          &.special{
            .bg-image('special_3');
          }
        }
      }
    }
    .foods-wrapper{
      flex: 1;
    }
  }
</style>
