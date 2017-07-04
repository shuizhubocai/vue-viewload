import Vue from 'vue'
import VueViewload from '../../src/vue-viewload'

Vue.use(VueViewload)

new Vue({
    el: '#app1',
    data: {
        pic: '../pic/1.jpg',
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
