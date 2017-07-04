import Vue from 'vue'
import VueViewload from '../../src/vue-viewload'

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

new Vue({
    el: '#app4',
    data: {
        list: [
            '../pic/2.jpg',
            '../pic/3.jpg',
            '../pic/4.jpg',
            '../pic/5.jpg',
            '../pic/6.jpg',
            '../pic/7.jpg',
            '../pic/8.jpg',
            '../pic/9.jpg',
            '../pic/10.jpg',
            '../pic/11.jpg',
            '../pic/12.jpg',
            '../pic/13.jpg',
            '../pic/14.jpg',
            '../pic/15.jpg',
            '../pic/16.jpg',
            '../pic/17.jpg',
            '../pic/18.jpg',
            '../pic/19.jpg'
        ]
    }
})
