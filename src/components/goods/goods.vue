<template>
  <div id="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item, index) in goods" :key = "index">
          <span class="text border-1px">
            <span class="icon" v-if="item.type>=0" :class = "classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list" v-for="(item, index) in goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="border-1px food-item" v-for="(food, num) in item.foods" :key="num">
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
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Bscroll from 'better-scroll';
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
        this.goods = response.data.goods; // 更新数据
        this.$nextTick(() => { // DOM渲染完成初始化滚动区域
          this._initScroll();
        });
      });
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; // 活动图标className
  },
  methods: {
    _initScroll() { // 初始化滚动区域
      this.menuScroll = new Bscroll(this.$refs.menuWrapper, {});
      this.foodsScroll = new Bscroll(this.$refs.foodsWrapper, {});
    }
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
      // overflow-y: auto;
      overflow: hidden;
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
      .food-list{
        .title{
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9dde1;
          font-size: 12px;
          color: rgb(147,153,159);
          background: #f3f5f7;
        }
        ul{
          .food-item{
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            .border-1px(rgba(7, 17, 27, 0.1));
            &:last-child{
              .border-none();
              margin-bottom: 0;
            }
            .icon{
              flex: 0 0 57px;
              margin-right: 10px;
            }
            .content{
              flex: 1;
              .name{
                margin: 2px 0 8px 0;
                height: 14px;
                line-height: 14px;
                font-size: 14px;
                color: rgb(7,17,27);
              }
              .desc,.extra{
                line-height: 14px;
                font-size: 10px;
                color: rgb(147,153,159);
              }
              .desc{
                margin-bottom: 8px;
                line-height: 12px;
              }
              .extra{
                line-height: 10px;
                .count{
                  margin-right: 12px;
                }
              }
              .price{
                font-weight: 700;
                line-height: 24px;
                .now{
                  margin-right: 18px;
                  font-size: 14px;
                  color: rgb(240,20,20);
                }
                .old{
                  text-decoration: line-through;
                  font-size: 10px;
                  color: rgb(147,153,159);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
