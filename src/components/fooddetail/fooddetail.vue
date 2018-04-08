<template>
<transition name="move">
  <div class="food-detail" v-show="show" ref="foodetail">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hideDetail">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-if="food.oldPrice">{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <transition name="fade">
          <div class="buyit" v-show="!food.count||food.count===0" @click="addCart">
            <div class="buy">加入购物车</div>
          </div>
        </transition>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split v-show="food.ratings"></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect :select-type="selectType" :only-content="onlyContent" :des="des" :ratings="food.ratings" @tab-select="tabSelectHandler" @tab-only="tabOnlyHandler"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings&&food.ratings.length">
            <li class="rating-item border-1px" v-for="(rating, index) in filterRatings" :key="index">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import Bscroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import {formatDate} from '@/common/js/date';
const ALL = 2;
export default {
  name: 'food-detail',
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      show: false, // 控制本组件是否显示
      // 评价组件相关
      selectType: ALL,
      onlyContent: false,
      des: {
        'all': '全部',
        'positive': '推荐',
        'negative': '吐槽'
      }
    };
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  computed: {
    filterRatings() { // 根据selectType过滤评论
      let rating = this.food.ratings;
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
    showDetail() { // 显示商品详情
      this.show = true;
      // 初始化评论显示类型
      this.selectType = ALL;
      this.onlyContent = false;
      // 初始化滚动区域
      this.$nextTick(() => {
        if (!this.scroll) {
          let foodetail = this.$refs.foodetail;
          this.scroll = new Bscroll(foodetail, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hideDetail() { // 收起商品详情
      this.show = false;
    },
    addCart(e) { // 加入购物车
      this.$store.commit('addCartGoods', this.food); // 添加商品
      this.$store.commit('drop', e.target); // 小球飞入
    },
    tabSelectHandler(type) { // 切换评论类型
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    tabOnlyHandler() { // 是否只显示有内容评论
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../common/less/mixin.less';
.food-detail {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 48px;
    overflow: hidden;
    z-index: 94;
    background: #fff;
    transform: translate3d(0,0,0);
    &.move-enter-active,
    &.move-leave-to {
        transition: all 0.3s linear;
    }
    &.move-enter,
    &.move-leave-to {
        transform: translate3d(100%,0,0);
    }
    .food-content {
        .image-header {
            position: relative;
            width: 100%;
            height: 0;
            // 预留图片位置 防止图片加载完后抖动
            padding-top: 100%;
            img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            .back {
                position: absolute;
                top: 10px;
                left: 2px;
                padding: 10px;
                .icon-arrow_lift {
                    font-size: 20px;
                    color: #fff;
                }
            }
        }
        .content {
            position: relative;
            padding: 18px;
            .title {
                line-height: 14px;
                margin-bottom: 8px;
                font-size: 14px;
                font-weight: 800;
                color: rgb(7,17,27);
            }
            .detail {
                margin-bottom: 18px;
                line-height: 10px;
                height: 10px;
                font-size: 0;
                .rating,
                .sell-count {
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
                .sell-count {
                    margin-right: 12px;
                }
            }
            .price {
                font-weight: 700;
                line-height: 24px;
                .now {
                    margin-right: 18px;
                    font-size: 14px;
                    color: rgb(240,20,20);
                }
                .old {
                    text-decoration: line-through;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
            }
            .cartcontrol-wrapper {
                position: absolute;
                right: 18px;
                bottom: 30px;
                z-index: 1;
            }
            .buyit {
                position: absolute;
                right: 18px;
                bottom: 18px;
                z-index: 10;
                padding: 6px;
                opacity: 1;
                &.fade-enter-active,
                &.fade-leave-active {
                    transition: all 0.3 linear;
                }
                &.fade-enter,
                &.fade-leave-to {
                    opacity: 0;
                }
                .buy {
                    height: 24px;
                    line-height: 24px;
                    padding: 0 12px;
                    box-sizing: border-box;
                    border-radius: 12px;
                    font-size: 10px;
                    background: rgb(0, 160, 220);
                    color: #fff;
                }
            }
        }
        .info {
            padding: 16px;
            .title {
                line-height: 14px;
                margin-bottom: 6px;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }
            .text {
                line-height: 24px;
                padding: 0 8px;
                font-size: 12px;
                color: rgb(77, 85, 93);
            }
        }
        .rating {
            padding-top: 18px;
            .title {
                line-height: 14px;
                margin-left: 18px;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }
            .rating-wrapper {
                padding: 0 18px;
                .rating-item {
                    position: relative;
                    padding: 16px 0;
                    .border-1px(rgba(7, 17, 27, 0.1));
                    .user {
                        position: absolute;
                        right: 0;
                        top: 16px;
                        line-height: 12px;
                        font-size: 0;
                        .name {
                          display: inline-block;
                          margin-right: 6px;
                          vertical-align: top;
                          font-size: 10px;
                          color: rgb(147, 153, 159);
                        }
                        .avatar {
                          border-radius: 50%;
                        }
                    }
                    .time {
                      margin-bottom: 6px;
                      line-height: 12px;
                      font-size: 10px;
                      color: rgb(147, 153, 159);
                    }
                    .text {
                      line-height: 16px;
                      font-size: 12px;
                      color: rgb(7, 17, 27);
                      .icon-thumb_up, .icon-thumb_down{
                        margin-right: 4px;
                        line-height: 16px;
                        font-size: 12px;
                      }
                      .icon-thumb_up{
                        color: rgb(0, 160, 220);
                      }
                      .icon-thumb_down{
                        color: rgb(147, 153, 159);
                      }
                    }
                }
                .no-rating{
                  padding: 16px 0;
                  font-size: 12px;
                  color: rgb(147, 153, 159);
                }
            }
        }
    }
}
</style>