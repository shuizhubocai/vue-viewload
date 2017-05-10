# vue-viewload
![npm](https://img.shields.io/npm/dt/vue-viewload.svg) ![npm](https://img.shields.io/npm/v/vue-viewload.svg) ![npm](https://img.shields.io/npm/l/vue-viewload.svg)

vue图片懒加载，依赖vue2.0以上版本。图片或者其他资源进入可视区域后加载。

# 支持浏览器
![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11+ ✔ |

# 例子预览(例子就是/demo目录下的文件)
- [例子列表](https://shuizhubocai.github.io/vue-viewload/demo/index.html)
- [纵向滚动的例子](https://shuizhubocai.github.io/vue-viewload/demo/html/app1.html)
- [横向滚动的例子](https://shuizhubocai.github.io/vue-viewload/demo/html/app2.html)
- [在容器内滚动的例子](https://shuizhubocai.github.io/vue-viewload/demo/html/app3.html)
- [懒加载选项设置](https://shuizhubocai.github.io/vue-viewload/demo/html/app4.html)
- [非img元素进入可视区域后单独执行回调函数(不依赖全局options选项回调函数)，比如可以在回调函数中执行ajax请求](https://shuizhubocai.github.io/vue-viewload/demo/html/app5.html)

# 扫码查看例子入口
[![demo](https://shuizhubocai.github.io/vue-viewload/demo/img/qrcode.png)](https://shuizhubocai.github.io/vue-viewload/demo/index.html)

# 安装vue-viewload
使用npm在本地安装：
```bash
npm install vue-viewload --save-dev
```

# 使用vue-viewload
js文件中
```javascript
//需要引入vue，以及vue-viewload，下面的axios是ajax库，如果不需要可以不引用
import Vue from 'vue'
import VueViewload from 'vue-viewload'
import axios from 'axios'

//使用VueViewload
Vue.use(VueViewload)

new Vue({
    el: '#app',
    data: {
        pic: 'http://pics.sc.chinaz.com/files/pic/pic9/201701/bpic232.jpg',
        list: [
            'http://pics.sc.chinaz.com/files/pic/pic9/201702/zzpic1399.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201612/fpic9875.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201610/fpic8220.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201611/fpic8607.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201611/fpic8745.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201701/zzpic437.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201610/apic23881.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201608/fpic5949.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201608/fpic6419.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201609/fpic7403.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201609/fpic7317.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201605/fpic1376.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201606/apic21195.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201606/apic21465.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201604/apic20040.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201604/fpic914.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201604/fpic873.jpg',
            'http://pics.sc.chinaz.com/files/pic/pic9/201605/fpic1208.jpg'
        ]
    },
    methods: {
        //函数需要返回一个函数
        getAjaxContent: function() {
            return function() {
                axios({
                    method: 'get',
                    url: '../api/data.txt'
                }).then((response) => {
                    this.innerHTML = response.data;
                })
            }
        }
    }
})
```

html文件中，在要进行懒加载的元素上添加vue指令v-view，值为加载资源的URL或methods方法。需要懒加载的元素请尽量设置宽高样式
```html
<div id="app">

    #给img元素的src赋值，设置图片未加载时显示的图片，可以图片设置为一个loading.gif动态加载图<br/>
    <img src="http://img.zcool.cn/community/0161f656b0663e6ac7256cb052d31a.gif" v-view="pic"><br/>

    #v-view的值不是变量的，值为单引号引起来的资源url地址<br/>
    <img v-view="'http://pics.sc.chinaz.com/files/pic/pic9/201701/bpic232.jpg'" style="height:200px;"><br/>

    #v-view的值是变量，pic值为资源url地址<br/>
    <img v-view="pic" style="height:200px;"><br/>

    #v-view的值是变量，变量值通过遍历list数组得来<br/>
    <img v-view="item" v-for="item in list" style="height:200px;display:block;"><br/>

    #v-view的值是methods方法，一般用在非img元素<br/>
    <div v-view="getAjaxContent()">加载中...</div>

</div>
```

# 设置懒加载选项
```javascript
//options对象是可选的，用来设置懒加载选项
Vue.use(VueViewload, options)
```

options对象

名称|描述|默认值|值类型
---|---|---|---
defaultPic|图片未加载完显示的图片|base64的空白图片|String
errorPic|元素为img类型时，图片加载失败显示的图片|base64的空白图片|String
threshold|阀值，用来设置提前多少像素进入可视区域。负值表示提前进入，正值表示延迟进入，|0|Number
effectFadeIn|图片加载完是否淡入显示|false|Boolean
callback|资源进入可视区域后执行的回调函数。接收两个参数callback(ele, src)，ele是进入可视区域的元素，src是要加载的资源URL。可以用在非img元素进入可视区域加载|new Function|Function

比如，设置默认loading.gif图，加载失败图，提前200px加载图片，图片淡入显示，图片进入可视区域执行回调函数:
```javascript
Vue.use(VueViewload, {
    defaultPic: 'http://img.zcool.cn/community/0161f656b0663e6ac7256cb052d31a.gif',
    errorPic: 'http://a0.att.hudong.com/77/31/20300542906611142174319458811.jpg',
    threshold: -200,
    effectFadeIn: true,
    callback: function(ele, src) {
        ele.style.border = '1px solid red';
        console.log(ele.nodeName + '...' + src);
    }
})
```

# 我的无依赖javascript图片懒加载可以查看以下github仓库
[https://github.com/shuizhubocai/viewload](https://github.com/shuizhubocai/viewload)
