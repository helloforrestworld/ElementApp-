<template>
  <div id="app">
    <sell-header :seller="seller"></sell-header>
    <div class="tab border-1px">
      <router-link activeClass="nav-active" exact  class="tab-item" tag="div" :to="{ name: 'goods'}">商品</router-link>
      <router-link activeClass="nav-active" class="tab-item" tag="div" :to="{ name: 'ratings'}">评论</router-link>
      <router-link activeClass="nav-active" class="tab-item" tag="div" :to="{ name: 'seller'}">商家</router-link>
    </div>
    <keep-alive>
      <router-view class="content" :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import sellHeader from './components/header/header';
export default {
  name: 'App',
  components: {
    sellHeader
  },
  created() {
    // 模拟
    let search = window.location.search;
    if (!search) {
      window.location.search = '?id=zhoufang1411';
    };
    this.$store.commit('initSellerId', search); // 初始sellerId
    this.$store.dispatch('getSellerData'); // 请求商家数据
  },
  computed: {
    seller() { // 商家信息
      return this.$store.state.seller;
    }
  }
};
</script>

<style lang="less">
@import './common/less/mixin.less';
#app{
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border-1px(rgba(7, 17, 27, 0.1));
    .tab-item{
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: rgb(77,85,93);
    }
    .nav-active{
      color: rgb(240,20,20);
    }
  }
}

</style>
