<template>
<div id="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li class="menu-item" :class="{'currentIndex': index === currentIndex}" v-for="(item, index) in goods" :key="index" @click="clickMenutoScroll(index)">
        <span class="text border-1px">
            <span class="icon" v-if="item.type>=0" :class = "classMap[item.type]"></span> {{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodsWrapper">
    <ul>
      <li class="food-list food-list-hook" v-for="(item, index) in goods" :key="index">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li class="border-1px food-item" v-for="(food, num) in item.foods" :key="num" @click="showDetail(food)">
            <div class="icon">
              <img :src="food.icon" width="57" height="57">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span><span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <shopcart></shopcart>
  <fooddetail ref="foodDetail" :food="detailFood"></fooddetail>
</div>
</template>
<script>
import Bscroll from 'better-scroll';
import shopcart from '../shopcart/shopcart';
import cartcontrol from '../cartcontrol/cartcontrol';
import fooddetail from '../fooddetail/fooddetail';
export default {
  name: 'goods',
  props: {
    'seller': { // 商家数据
      type: Object
    }
  },
  data() {
    return {
      heights: [], // 列表到顶部的高度
      scrollY: 0, // 当前食物列表tranlateY
      detailFood: {} // 当前需要查看详情的商品
    };
  },
  components: {
    shopcart,
    cartcontrol,
    fooddetail
  },
  created() { // 获取商品数据
    this.$store.dispatch('getGoodsData').then((res) => {
      this.$nextTick(() => { // DOM渲染完成初始化滚动区域
        this._initScroll();
        this._calculateHeight();
      });
    });
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; // 活动图标className
  },
  computed: {
    goods() { // 商品数据
      return this.$store.state.goods;
    },
    currentIndex() { // 计算当前分类的Index
      for (var i = 0; i < this.heights.length; i++) {
        if (i === this.heights.length) {
          return i;
        };
        if (-this.scrollY < this.heights[i]) {
          return i;
        };
      };
    }
  },
  methods: {
    clickMenutoScroll(index) { // 点击foodMenu
      let lists = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      this.foodsScroll && this.foodsScroll.scrollToElement(lists[index], 300);
    },
    showDetail(food) { // 查看商品详情
      let refDatail = this.$refs.foodDetail;
      this.detailFood = food;
      refDatail.showDetail();
    },
    _initScroll() { // 初始化滚动区域
      this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new Bscroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.round(pos.y);
      });
    },
    _calculateHeight() { // 计算每个分类底部到页面顶部的距离
      let height = 0;
      let lists = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      for (var i = 0; i < lists.length; i++) {
        height += lists[i].clientHeight;
        this.heights.push(height);
      };
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../common/less/mixin.less';
#goods {
    position: absolute;
    display: flex;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        // overflow-y: auto;
        overflow: hidden;
        .menu-item {
            display: table;
            width: 54px;
            height: 56px;
            padding: 0 12px;
            line-height: 14px;
            &.currentIndex {
                position: relative;
                z-index: 10;
                margin-top: -1px;
                background: #fff;
                .text {
                    font-weight: 700;
                    .border-none();
                }
            }
            .text {
                display: table-cell;
                vertical-align: middle;
                font-size: 12px;
                .border-1px(rgba(7, 17, 27, 0.1));
            }
            .icon {
                vertical-align: top;
                display: inline-block;
                width: 12px;
                height: 12px;
                margin-right: 2px;
                background-repeat: no-repeat;
                background-size: 12px 12px;
                &.decrease {
                    .bg-image(  'decrease_3');
                }
                &.discount {
                    .bg-image(  'discount_3');
                }
                &.guarantee {
                    .bg-image(  'guarantee_3');
                }
                &.invoice {
                    .bg-image(  'invoice_3');
                }
                &.special {
                    .bg-image(  'special_3');
                }
            }
        }
    }
    .foods-wrapper {
        flex: 1;
        .food-list {
            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147,153,159);
                background: #f3f5f7;
            }
            ul {
                .food-item {
                    position: relative;
                    display: flex;
                    margin: 18px;
                    padding-bottom: 18px;
                    .border-1px(rgba(7, 17, 27, 0.1));
                    &:last-child {
                        .border-none();
                        margin-bottom: 0;
                    }
                    .icon {
                        flex: 0 0 57px;
                        margin-right: 10px;
                    }
                    .content {
                        flex: 1;
                        .name {
                            margin: 2px 0 8px;
                            height: 14px;
                            line-height: 14px;
                            font-size: 14px;
                            color: rgb(7,17,27);
                        }
                        .desc,
                        .extra {
                            line-height: 14px;
                            font-size: 10px;
                            color: rgb(147,153,159);
                        }
                        .desc {
                            margin-bottom: 8px;
                            line-height: 12px;
                        }
                        .extra {
                            line-height: 10px;
                            .count {
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
                        .cartcontrol-wrapper{
                          position: absolute;
                          right: 0;
                          bottom: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>
