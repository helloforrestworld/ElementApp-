<template>
  <div class="ratings" ref="ratingWrap">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" @tab-select="tabSelectHandler" @tab-only="tabOnlyHandler"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating,index) in filterRatings" :key="index">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <div class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="(rec, index) in rating.recommend" :key="index">
                  {{rec}}
                </span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {formatDate} from '@/common/js/date';
import star from '@/components/star/star';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import BScroll from 'better-scroll';
const ALL = 2;
export default {
  name: 'ratings',
  data() {
    return {
      onlyContent: true,
      selectType: ALL
    };
  },
  components: {
    star,
    split,
    ratingselect
  },
  created() {
    // 获取商家评分数据
    this.$store.dispatch('getRatings').then((response) => {
      this._initScroll();
    });
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  computed: {
    seller() { // 商家信息
      return this.$store.state.seller;
    },
    ratings() { // 获取本店评论数据
      return this.$store.state.ratings;
    },
    filterRatings() { // 根据selectType过滤评论
      let rating = this.ratings;
      if (!rating) return [];
      let result = [];
      if (this.selectType === 2) {
        result = rating.filter((item) => {
          return !this.onlyContent || !!item.text === this.onlyContent;
        });
        return result;
      } else {
        result = rating.filter((item) => {
          return (!this.onlyContent || !!item.text === this.onlyContent) && item.rateType === this.selectType;
        });
        return result;
      }
    }
  },
  methods: {
    tabSelectHandler(type) {
      this.selectType = type;
    },
    tabOnlyHandler() {
      this.onlyContent = !this.onlyContent;
    },
    _initScroll() {
      if (!this.scroll) {
        this.$nextTick(() => {
          let ratingWrap = this.$refs.ratingWrap;
          if (!ratingWrap) return;
          this.scroll = new BScroll(ratingWrap, {
            click: true
          });
        });
      } else {
        this.scroll.refresh();
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../common/less/mixin.less';
  .ratings{
    position: absolute;
    left: 0;
    top: 174px;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
    .ratings-content{
      .overview{
        display: flex;
        .overview-left{
          @media only screen and (max-width:320px){
            flex: 0 0 120px;
            width: 120px;
          }
          flex: 0 0 137px;
          padding: 6px 0;
          width: 137px;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          text-align: center;
          .score{
            margin-bottom: 6px;
            line-height: 28px;
            font-size: 24px;
            color: rgb(255, 153, 0);
          }
          .title{
            margin-bottom: 8px;
            line-height: 12px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .rank{
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .overview-right{
          flex: 1;
          padding: 6px 0 6px 24px;
          @media only screen and (max-width:320px){
            padding-left: 6px;
          }
          .score-wrapper{
            margin-bottom: 8px;
            font-size: 0;
            .title{
              display: inline-block;
              vertical-align: top;
              line-height: 18px;
              font-size: 12px;
              color: rgb(7,17,27);
            }
            .star{
              display: inline-block;
              margin: 0 12px;
              vertical-align: top;
            }
            .score{
              display: inline-block;
              line-height: 18px;
              vertical-align: top;
              font-size: 12px;
              color: rgb(255,153,0)
            }
          }
          .delivery-wrapper{
            .title{
              // 文字和文字默认居中对齐 垂直方向
              line-height: 18px;
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .time{
              margin-left: 12px;
              font-size: 12px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
      .rating-wrapper{
        padding: 0 18px;
        .rating-item{
          display: flex;
          padding: 18px 0;
          .border-1px(rgba(7, 17, 27, 0.1));
          .avatar{
            flex: 0 0 28px;
            width: 28px;
            margin-right: 12px;
            img{
              border-radius: 50%;
            }
          }
          .content{
            position: relative;
            flex:1;
            .name{
              margin-bottom: 4px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(7, 17, 27);
            }
            .star-wrapper{
              margin-bottom: 6px;
              font-size: 0;
              .star{
                display: inline-block;
                margin-right: 6px;
                vertical-align: top;
              }
              .deliveryTime{
                display: inline-block;
                vertical-align: top;
                line-height: 12px;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
            }
            .text{
              margin-bottom: 8px;
              line-height: 18px;
              color: rgb(7,17,27);
              font-size: 12px;
            }
            .recommend{
              line-height: 16px;
              font-size: 0;
              .icon-thumb_up,.item{
                display: inline-block;
                margin: 0  8px 4px 0px;
                font-size: 9px;
              }
              .icon-thumb_up{
                color: rgb(0,160,220);
              }
              .item{
                padding: 0px 6px;
                border: 1px solid rgba(7,17,27,0.1);
                border-radius: 1px;
                color: rgb(147, 153, 159);
                background: #ff;
              }
            }
            .time{
              position: absolute;
              top: 0;
              right: 0;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
    }
  }
</style>