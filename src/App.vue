<template>
  <div id="app">
    <sell-header :seller="seller"></sell-header>
    <div class="tab border-1px">
      <router-link activeClass="nav-active" exact  class="tab-item" tag="div" :to="{ name: 'goods'}">商品</router-link>
      <router-link activeClass="nav-active" class="tab-item" tag="div" :to="{ name: 'ratings'}">评论</router-link>
      <router-link activeClass="nav-active" class="tab-item" tag="div" :to="{ name: 'seller'}">商家</router-link>
    </div>
    <router-view class="content" :seller="seller"></router-view>
  </div>
</template>

<script>
import sellHeader from './components/header/header';
export default {
  name: 'App',
  components: {
    sellHeader
  },
  data() {
    return {
      seller: {} // 商家数据
    };
  },
  created() {
    // 请求商家数据
    this.$http.get('https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/api/sell')
      .then((response) => {
        this.seller = response.data.seller;
      });
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
