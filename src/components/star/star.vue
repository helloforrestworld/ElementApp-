<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index">
    </span>
  </div>
</template>
<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
  name: 'star',
  props: {
    'size': {type: Number},
    'score': {type: Number}
  },
  data() {
    return {};
  },
  computed: {
    starType() { // 决定星星大小
      return 'star-' + this.size;
    },
    itemClasses() { // 决定星星类型 half ? on? off?
      var result = [];
      var score = Math.floor(this.score * 2) / 2; // 小数位 >= .5才加半星
      var haveHalf = score % 1 !== 0; // 需要加半星
      var integer = Math.floor(this.score);// 整数部分
      for (var i = 0; i < integer; i++) {
        result.push(CLS_ON);
      };
      if (haveHalf) {
          result.push(CLS_HALF);
      };
      while (result.length < LENGTH) {
          result.push(CLS_OFF);
      };
      return result;
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../common/less/mixin.less';
  .star{
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-24{
      .star-item{
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child{
          margin-right:0;
        }
        &.on{
          .bg-image('star24_on');
        }
        &.half{
          .bg-image('star24_half');
        }
        &.off{
          .bg-image('star24_off');
        }
      }
    }
    &.star-36{
      .star-item{
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child{
          margin-right:0;
        }
        &.on{
          .bg-image('star36_on');
        }
        &.half{
          .bg-image('star36_half');
        }
        &.off{
          .bg-image('star36_off');
        }
      }
    }
    &.star-48{
      .star-item{
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child{
          margin-right:0;
        }
        &.on{
          .bg-image('star48_on');
        }
        &.half{
          .bg-image('star48_half');
        }
        &.off{
          .bg-image('star48_off');
        }
      }
    }
  }
</style>