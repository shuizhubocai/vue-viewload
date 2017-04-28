import Vue from 'vue';
import VueViewload from '../../src/vue-viewload';
import util from '../../../util/util';

Vue.use(VueViewload, {
    defaultPic: 'http://img.zcool.cn/community/013cb15648986a32f87512f6d87dc8.gif',
    errorPic: 'http://a0.att.hudong.com/77/31/20300542906611142174319458811.jpg',
    threshold: -100,
    effectFadeIn: true,
    callback: function(ele, src) {
        // console.log(src);
    }
});


new Vue({
    el: '#app',
    data: {
        list: [
            'http://pics.sc.chinaz.com/files/pic/pic9/201701/bpic232.jpg',
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
            'http://pics.sc.chinaz.com/files/pic/pic9/201605/fpic120823.jpg'
        ]
    },
    mounted () {
        // console.log(this.$vueviewload);
    }

})
