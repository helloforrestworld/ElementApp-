# element

> A Vue.js project

**电脑端预览： 切换调式模式 刷新后才能正常滚动**

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 预览

> 
![11][1]
> 
![此处输入图片的描述][2]
>
![此处输入图片的描述][3]


##目录结构

```
    .
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 项目核心文件
│   ├── common                                  // 公用资源
|       └── fonts                               // 字体图标
|       └── js                                  // 工具函数
|       └── less                                // 公用样式
│   ├── components                              // 组件
|       └── cartcontrol                         // 加入购物车按钮组件
|       └── fooddatail                          // 商品详情组件
|       └── goods                               // 商家商品页
|       └── header                              // 头部组件
|       └── ratings                             // 商家评论页面
|       └── ratingselect                        // 评论过滤组件
|       └── seller                              // 商家详情页
|       └── shopcart                            // 购物车组件
|       └── split                               // 分割线小组件
|       └── star                                // 评分星星组件
|   ├── router                                  // 路由
|   ├── store                                   // vuex
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── index.html                                  // 模板html文件
.

```

## 总结

准备工作
1.字体图标

    svg文件到https://icomoon.io/app/#/select上传 把生成的fonts文件拷到目录 css文件修改路径
2.less使用

    a.入口main.js全局引入less
    b.mixin文件需要单独@import
3.1pxborder 背景图引入
```javascript
    a. .boreder-1px(@color:red){
            position:relative
            &::after{
                position:absolute;
                left:0;
                bottom：0;
                border-top: 1px solid @color;
                content:''
            }
        }
        
        .border-1px{
            @media(-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5){
                &::after{
                    -webkit-transform:scale(0.7);
                    transform:scaleY(0.7);
                }
            }
            @media(-webkit-min-device-pixel-ratio),(min-device-pixel-ratio){
                &::after{
                    -webkit-transform:scale(0.5);
                    transform(scale(0.5));
                    }
            }
        }
        
    适配retina图片引入方式
        .bg-image(@url){
            background-image:~'url(@{url}@2x.png)';
            @media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
            background-image:~'url(@{url}@3x.png)';
            }
        }
```        
4.reset.css

    static/css/reset.css
    Eric Meyer's Reset CSS v2.0 http://meyerweb.com/eric/tools/css/reset/

5.组件就近管理components/

    组件（vue+image+..)

6. /*eslint-disable ..*/

7. 消除行内块 间隙 font-size:0

8. 书写css习惯： 影响布局的放前面


9. backdrop-filter:blur(10px);   /* iphone独有 */

10.stick-footer stick-footer
```javascript
    fixWrapper{
        overflow:hidden;
        innerWrap{
          min-height：撑满父元素
          contentWrap{
            paddting-bottom:footer负的高度
          }
        }
        footers{
            margin-top: 负一定的高度 
        }
    }
```
11. food组件左右列表相关联 


    a.计算商品每个列表到顶部的高度,用数组索引存起来
    b.监控scrollY滚动,循环数组 -scroll<arr[i] break i就是目录对应的索引
    c.计算属性currentIndex => i
    d.左侧目录点击传入当前点击的index, 右侧滚动foodList[index]
    
12.fooddatil头部图片宽高一样 等于 屏幕宽度

    a.图片加载进来后由于图片高度突然撑开父元素 出现抖动的情况
    b.解决：预留图片位置
    c. imgWrapper{
            width:100%;
            height:0;
            padding-top:100%; //相对于宽度
            img{
                width:100%;
                height:100%;
            }
        }
13.小球飞入实现

```javascript
 1.定义属性
    balls: [ // 购物车小球 
      {show: false},
      {show: false},
      {show: false},
      {show: false},
      {show: false}
    ] // 每一项映射一个小球
 2.触发小球过渡动画函数
    function drop(el){
        //el 记录触发元素
        let dropBalls = state.dropBalls; // 记录正在工作的小球
        for(var i = 0; i < balls.length; i++){
            if(!balls[i].show){
                balls[i].show = true;
                balls[i].el = el;
                dropBalls.push(ball[i]);
                return;
            }
        }
    }
  3.回收小球函数
    function afterDrop(){
        let dropBalls = state.dropBalls;
        let ball = dropBalls.shift();
        if(ball.show){
            ball.show = false;
        }
    }
  4.书写过渡钩子 beforeEnter Enter AfterEnter
  beforeEnter: function beforeDrop(el){
    
    let count = this.balls.length;
    while(count--){
        let ball = this.balls[i];
        if(ball.show){
            //获取触发元素位置
            let rect = ball.el.getBoundingRect();
            let x = rect.left - 32(小球高度)；
            let y = rect.bottom - 32;
            //小球外层和内层分别进行y和x方向移动
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px, 0, 0)`;
        }
    }
  }
  enter: dropping(el,done) {
      /* eslint-disable no-unused-vars */
          // 主动重绘
      let fr = el.offsetLeft;
      // DOM渲染完后 回到原来的位置
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)';
        el.style.transform = 'translate3d(0, 0, 0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0, 0, 0)';
        inner.style.transform = 'translate3d(0, 0, 0)';
        
        //注意要执行以下transitionend事件回调
        el.addEventListener('transitionend', done);
      });
  } 
  after-enter: function afterDrop(el){
    el.style.display = 'noen';
    this.$store.commit('afterDrop');回收小球
  }
  
  //小球飞入的触发方法定义在store.mutation里面各个组件公用
```
14.一些工具函数封装

```javascript
    // formatDate(date,'yyyy-MM-dd') 日期格式化
    function formatDate(date,fmt){
        if(/(y+)/.test(fmt)) { //年份
            fmt = fmt.replace(RegExp.$1, (date.getFullyears + '').substr(4 - RegExp.$1.length));
        };
        let o = {
            'M+': date.getMonth() + 1 + '',
            'd+': date.getDate() + '',
            'h+': date.getHours() + '',
            'm+': date.getMinutes() + '',
            's+': date.getSeconds() + ''
        };
        for (let k in o){
            if(new RegExp((${k})).test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1? o[key] : addZero(o[key]) );
            }
        }
        function addZero(str){
            return ('0'+str).substr(str.length - 1);
        }
    }
    
    // 查询字符串格式化
    function urlParse(search){
        let ret;
        let reg = /[?&][^?&]+=[^?&]+/g;
        ler arr = [];
        arr = search.match(reg);
        arr.forEact((item)=>{
            let o = item.split('=');
            let key = o[0];
            let value = o[1];
            ret[key] = value;
        })
        return ret
    }
    
    //localstorage存取
    function saceToLocal(id,key,value){
        let seller = window.localStorage.__seller__;
        if (!seller ) {
            seller = {};
            seller[id] = {};
        } else {
            seller = JSON.parse(seller);
            if(!seller[id]) {
                seller[id] = {}
            }
        }
        
        seller[id][key] = value;
        window.localStorage.__seller__ =  JSON.stringify(seller);
    }
    
    function loadFromLocal(id,key,def){
        let seller = window.localStorage.__seller__;
        if (!seller) {
            return def
        }
        seller = JSON.parse(seller);
        if(!seller[id]){
            return def
        }
        return seller[id][key] || def;
    }
```


###公用组件的封装
1.星星组件

    需求：
        a.根据传入的size引入不同大小的星星
        b.根据评分生成星星的数量
    每颗星有三种状态：
        CLS_ON = "on" //全满
        CLS_HALF= "half" //半星
        CLS_OFF = "off" //空心
    LENGTH:5 //默认是五颗星
    结构：
    
    ```javascript
        <div class="star" :class="starType">
            <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index">
            </span>
        </div>
    ```
        &starType样式控制大小
        &itemClasses存放星星的数量和状态
    
计算itemClasses:

    ```javascript
        问题：半星何时出现 余数大于.5
        var score = Math.floor(this.score*2)/2;
        var havaHalf = score%1 !== 0; //是否加半星
        var integer = Math.floor(this.score) //整数部分
        for(var i = 0; i < integer.length; i++) {
          this.itemClasses.push(CLS_ON);
        }
        if(haveHalf) {
            this.itemClasser.push(CLS_HALF);
        }
        while(itemClasser.length < LENGTH){
           this.itemClasser.push(CLS_OFF); 
        }
    ```
2.cartcontrol

    描述：商品加入购物车控件
    props: food 当前个食品数据 {}
    methods: 
        1. 添加商品 addGood (小球飞入效果)
        2. 减少商品 removeGood
    减少按钮弹出过渡动画
3.ratingselect

    需求：
        1.评论类型切换（文案自定义）
        2.是否显示有内容的评价
    props:
        1. selectType (2 ALL,0 POSITIVE,1 NEGATIVE)(Number)
        2. onlyContent  (Boolean)
        3. desc:{all:'',positive:'',negative:''}
        4. rating 评论数据
    method:
        1. tab-select
        2. tabOnly
    过程：1.父元素传入数据props初始化
          2.tab-select tabOnly
          3.根据切换返回值过滤数据
          
##TODO

- [ ] 买家模块
    - [ ] 外卖首页
        - [x] 商家页面
    - [ ] 订单页
    - [ ] 个人中心
- [ ] 后台管理

  [1]: https://ws1.sinaimg.cn/large/e8323205gy1fq70q2srdng20ba0iwkjm.jpg
  [2]: https://ws1.sinaimg.cn/large/e8323205gy1fq70xsx1pjg20ba0iwnpf.jpg
  [3]: https://ws1.sinaimg.cn/large/e8323205gy1fq70qfbdnpg20ba0iw1ky.jpg
## 参考
> 
https://github.com/ustbhuangyi/vue-sell
>
https://github.com/bailicangdu/vue2-elm
  