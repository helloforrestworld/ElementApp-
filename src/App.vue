<template>
  <div id="app">
    <sell-header></sell-header>
    <div class="tab">
      <router-link activeClass="nav-active" exact  class="tab-item" tag="div" :to="{ name: 'goods'}">商品</router-link>
      <router-link activeClass="nav-active" class="tab-item" tag="div" :to="{ name: 'ratings'}">评论</router-link>
      <router-link activeClass="nav-active" class="tab-item" tag="div" :to="{ name: 'seller'}">商家</router-link>
    </div>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import sellHeader from './components/header/header';
export default {
  name: 'App',
  components: {
    sellHeader
  }
};
</script>

<style lang="less">
#app{
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
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
