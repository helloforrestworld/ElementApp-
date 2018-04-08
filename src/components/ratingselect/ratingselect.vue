<template>
<div class="ratingselect">
  <div class="rating-type border-1px">
    <span class="block positive" :class="{'active': selectType === 2}" @click="tabSelect(2)">{{des.all}}<span class="count">{{ratings.length}}</span></span>
    <span class="block positive" :class="{'active': selectType === 0}" @click="tabSelect(0)">{{des.positive}}<span class="count">{{positiveRate.length}}</span></span>
    <span class="block negative" :class="{'active': selectType === 1}" @click="tabSelect(1)">{{des.negative}}<span class="count">{{negativeRate.length}}</span></span>
  </div>
  <div class="switch" :class="{'on':onlyContent}" @click="tabOnly">
    <span class="icon-check_circle"></span>
    <span class="text">只看有内容的评价</span>
  </div>
</div>
</template>
<script>
// 接受props
// selectType: 0 1 2
// desc:{all:'', positive:'',negative:''}
// onlyContent: Boolean
// ratings: []
// 事件
// tabSelect
// tabOnlyCon
const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
  name: 'ratingselect',
  props: {
    'selectType': {
      type: Number,
      default: ALL
    },
    'onlyContent': {
      type: Boolean,
      default: true
    },
    'des': {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    },
    'ratings': {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    positiveRate() { // 好评
      let result = [];
      result = this.ratings.filter((item) => {
        return item.rateType === POSITIVE;
      });
      return result;
    },
    negativeRate() { // 差评
      let result = [];
      result = this.ratings.filter((item) => {
        return item.rateType === NEGATIVE;
      });
      return result;
    }
  },
  methods: {
    tabSelect(type) { // 切换评论类型
      this.$emit('tab-select', type);
    },
    tabOnly() { // 是否只显示有内容评论
      this.$emit('tab-only');
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../common/less/mixin.less';
.ratingselect {
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            line-height: 16px;
            border-radius: 1px;
            font-size: 12px;
            color: rgb(77, 85, 93);
            .count {
                margin-left: 2px;
                font-size: 8px;
            }
            &.positive {
                background: rgba(0, 160, 220, 0.2);
                &.active {
                    background: rgb(0, 160, 220);
                    color: #fff;
                }
            }
            &.negative {
                background: rgba(77, 85, 93, 0.2);
                &.active {
                    background: rgb(77, 85, 93);
                    color: #fff;
                }
            }
        }
    }
    .switch{
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on{
        .icon-check_circle{
          color: #00c850;
        }
      }
      .icon-check_circle{
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }
      .text{
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
}
</style>