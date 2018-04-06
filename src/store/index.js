import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    seller: {}, // seller数据
    goods: [], // 本店商品数据
    cartGoods: [] // 购物车数据
  },
  mutations: {
    initSeller(state, data) { // 提交修改seller
      state.seller = data;
    },
    initGoods(state, data) { // 提交修改goods
      state.goods = data;
    },
    addCartGoods(state, data) { // 添加到购物车
      let cartGoods = state.cartGoods;
      let exist = false;
      cartGoods.forEach((item) => { // 存在数量+1
        if (item.name === data.name) {
          Vue.set(item, 'count', item.count + 1);
          exist = true;
          return;
        };
      });
      if (!exist) { // 不存在添加一条
        Vue.set(data, 'count', 1);
        cartGoods.push(data);
      }
    },
    decreaseCartGoods(state, data) { // 减少购物车商品
      let cartGoods = state.cartGoods;
      cartGoods.forEach((item, index) => {
        if (item.name === data.name) {
          item.count--;
          if (item.count === 0) {
            Vue.delete(cartGoods, index);
          };
          return;
        };
      });
    }
  },
  actions: {
    getSellerData({commit}) { // 获取seller数据
      let http = this._vm.$http;
      http.get('https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/api/sell')
        .then((response) => {
          commit('initSeller', response.data.seller);
        });
    },
    getGoodsData({commit}) { // 获取本店商品数据
      let http = this._vm.$http;
      return http.get('https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/api/goods')
        .then((response) => {
          commit('initGoods', response.data.goods);
        });
    }
  },
  getters: {
    totalCount(state) { // 购物车商品总数
      let count = 0;
      state.cartGoods.forEach((good) => {
        count += good.count;
      });
      return count;
    },
    totalPrice(state) { // 购物车总价
      let price = 0;
      state.cartGoods.forEach((good) => {
        price += good.price * good.count;
      });
      return price;
    }
  }
});
export default store;
