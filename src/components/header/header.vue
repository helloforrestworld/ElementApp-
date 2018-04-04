<template>
  <div id="sell-header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="粥店">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="board-wrapper">
      <span class="board-title"></span><span class="board-text">
        {{seller.bulletin}}
      </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sell-header',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {};
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>
<style lang="less" scoped>
@import '../../common/less/mixin.less';
#sell-header{
  color: #fff;
  background-color: #999;
  .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;
    // 消除间隙
    font-size: 0;
    .avatar{
      vertical-align: top;
      display: inline-block;
      img{
        border-radius: 2px;
      }
    }
    .content{
      display: inline-block;
      margin-left: 14px;
      font-size: 14px;
      .title{
        margin: 2px 0px 8px 0px;
        .brand{
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          .bg-image('brand');
          background-repeat: no-repeat;
          background-size: 30px 18px;
        }
        .name{
          margin-left: 6px;
          line-height: 18px;
          font-weight: bold;
          font-size: 16px;
        }
      }
      .description{
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support{
        font-size: 0;
        .icon{
          vertical-align: top;
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-repeat: no-repeat;
          background-size: 12px 12px;
          &.decrease{
            .bg-image('decrease_1');
          }
          &.discount{
            .bg-image('discount_1');
          }
          &.guarantee{
            .bg-image('guarantee_1');
          }
          &.invoice{
            .bg-image('invoice_1');
          }
          &.special{
            .bg-image('special_1');
          }
        }
        .text{
          display: inline-block;
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .support-count{
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count{
        font-size: 10px;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right{
        margin-left: 2px;
        font-size: 10px;
        line-height: 24px;
      }
    }
  }
  .board-wrapper{
    .board-title{}
    .board-text{}
    .icon-keyboard_arrow_right{}
  }
}
</style>
