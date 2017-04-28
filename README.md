# vue-viewload
![npm](https://img.shields.io/npm/dt/vue-viewload.svg) ![npm](https://img.shields.io/npm/v/vue-viewload.svg) ![npm](https://img.shields.io/npm/l/vue-viewload.svg)

vue图片懒加载，依赖vue2.0以上版本。图片或者其他资源进入可视区域后加载。

# 支持浏览器
![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11+ ✔ |

# 安装vue-viewload
使用npm安装在本地：
```bash
npm install vue-viewload --save-dev
```

使用CDN：
```javascript
<script src="https://unpkg.com/vue-viewload/src/vue-viewload.js"></script>
<script>
Vue.use(VueViewload)
</script>
```

# 本地运行示例
```bash
#安装完vue-viewload后，在当前目录用npm安装项目依赖包
npm install

#打包demo代码
npm run demo
```

打开/demo/index.html查看示例

# 使用vue-viewload
js文件中
```javascript
//需要引入vue，以及vue-viewload
import Vue from 'vue'
import VueViewload from 'vue-viewload'

//使用VueViewload
Vue.use(VueViewload)

new Vue({
    el: '#app',
    data: {
        img: 'http://pics.sc.chinaz.com/files/pic/pic9/201701/bpic232.jpg',
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
    }
})
```

html文件中，在要进行懒加载的元素上添加vue指令v-view，值为加载的资源URL。需要懒加载的元素请设置宽高样式
```html
<div id="app">

#资源URL不是变量的，需用单引号引起来，容器为window
<img v-view="'https://www.baidu.com/img/bd_logo.png'" style="height:200px;">

#资源URL是变量的，img变量为字符串，容器为window
<img v-view="img" style="height:200px;">

#资源URL是变量的，list变量为数组，容器为window
<img v-view="item" v-for="item in list" style="height:200px;">

#资源URL是变量的，list变量为数组，容器id为horizontal
<div id="horizontal">
    <img v-view:horizontal="item" v-for="item in list" style="width:200px;">
</div>

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
threshold|阀值，负值表示提前进入，正值表示延迟进入，设置提前多少像素进入可视区域|0|Number
effectFadeIn|图片加载完是否淡入显示|false|Boolean
callback|资源进入可视区域后执行的回调函数，接收两个参数callback(ele, src)，ele是进入可视区域的元素，src是要加载的资源URL|new Function|Function

