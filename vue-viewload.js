/**
 * vue-viewload 资源懒加载vue2.0版，图片懒加载，可视区域加载，依赖vue.js。使用最新的API，建议在移动端使用
 * Author : 水煮菠菜 949395345@qq.com
 * Url : https://github.com/shuizhubocai
 * Date : 2017-4-27
 */

let _util = {
    /**
     * debounce 函数去抖
     * @param fn
     * @param delay
     * @returns {function()}
     */
    debounce: function (fn, delay) {
        let timer
        return () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, delay)
        }
    },
    /**
     * getPicInfo 快速获取图片宽高，图片加载完回调
     * @param options 对象类型，包含{src:string, fastCallback:fn, loadedCallback:fn, errorCallback:fn}
     * @options  src是图片地址，fastCallback是快速获取到图片宽高后的回调函数，loadedCallback是图片加载完的回调函数，errorCallback是图片加载失败的回调函数
     * @params {isError: boolean, width:number: height:number}，回调函数参数
     */
    getPicInfo: function (options) {
        let src = options.src || '',
            fastCallback = options.fastCallback,
            loadedCallback = options.loadedCallback,
            errorCallback = options.errorCallback,
            pic = new Image(),
            params = {
                isError: false,
                width: 0,
                height: 0
            },
            rollpolling = function () {
                if (params.isError || pic.width > 0 || pic.height > 0) {
                    clearInterval(timer)
                    params.width = pic.width
                    params.height = pic.height
                    fastCallback && fastCallback(params)
                }
            },
            timer
        pic.src = src
        pic.addEventListener('error', function (e) {
            params.isError = true
            errorCallback && errorCallback(params)
        }, false)
        if (pic.complete) {
            params.width = pic.width
            params.height = pic.height
            fastCallback && fastCallback(params)
            loadedCallback && loadedCallback(params)
        } else {
            pic.addEventListener('load', function () {
                params.width = pic.width
                params.height = pic.height
                loadedCallback && loadedCallback(params)
            }, false)
            timer = setInterval(rollpolling, 50)
        }
    }
}

class VueViewload {
    /**
     * @attr  emptyPic              base64空白图片
     * @param defaultPic            默认加载中图片
     * @param errorPic              加载失败图片
     * @param threshold             距离可视范围偏移值，负值表示提前进入，正值表示延迟进入
     * @param container             容器，必须是id名称，默认为window
     * @param effectFadeIn          是否渐入显示，默认是false
     * @param callback(ele, src)    进入可视区域后的回调函数，接收两个参数：ele表示元素，src表示加载的资源
     * @attr  selector              集合数组[{ele:'', src:''}]，每一项是一个对象，ele表示元素，src表示加载的资源
     * @attr  status                资源加载状态属性值，loading表示还没加载，loaded表示加载完，error表示加载失败
     * @attr  event                 支持的事件
     */
    constructor (options) {
        this.emptyPic = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        this.defaultPic = options && options.defaultPic || this.emptyPic
        this.errorPic = options && options.errorPic || this.emptyPic
        this.container = options && options.container || window
        this.threshold = options && parseInt(options.threshold, 10) || 0
        this.effectFadeIn = options && options.effectFadeIn || false
        this.callback = options && options.callback || new Function
        this.selector = options && options.selector || []
        this.event = ['scroll', 'resize']
        this.status = ['loading', 'loaded', 'error']
        this.delayRender = _util.debounce(this.render.bind(this), 200)
    }

    /**
     * inView 是否进入可视区域
     * @param ele
     * @returns {boolean}
     */
    inView (ele) {
        let isInView = false,
            rect = ele.getBoundingClientRect(),
            parentRect = this.container == window ? {left: 0, top: 0} : this.container.getBoundingClientRect(),
            viewWidth = this.container == window ? window.innerWidth : this.container.clientWidth,
            viewHeight = this.container == window ? window.innerHeight : this.container.clientHeight
        if (rect.bottom > this.threshold + parentRect.top && rect.top + this.threshold < viewHeight + parentRect.top && rect.right > this.threshold + parentRect.left && rect.left + this.threshold < viewWidth + parentRect.left) {
            isInView = true
        }
        return isInView
    }

    /**
     * bindUI 绑定UI事件
     */
    bindUI () {
        this.event.forEach((item, index) => {
            this.container.addEventListener(item, this.delayRender, false)
            if (this.container !== window && item == 'resize') {
                window.addEventListener(item, this.delayRender, false)
            }
        })
    }

    /**
     * unbindUI 删除UI事件
     */
    unbindUI () {
        this.event.forEach((item, index) => {
            this.container.removeEventListener(item, this.delayRender, false)
            if (this.container !== window && item == 'resize') {
                window.removeEventListener(item, this.delayRender, false)
            }
        })
    }

    /**
     * render 渲染资源
     * data-status属性 值包含：error加载失败，loading加载中，loaded加载完成
     */
    render () {
        if (!this.isLoadEvent) {
            this.isLoadEvent = true
            this.bindUI()
        }
        if (!this.selector.length) {
            this.unbindUI()
        }
        for (let i = 0; i < this.selector.length; i++) {
            let item = this.selector[i],
                eleType = item.ele.nodeName.toLowerCase()
            if (getComputedStyle(item.ele, null).display == 'none') {
                this.selector.splice(i--, 1)
                continue
            }
            if (eleType == 'img') {
                if (!item.ele.getAttribute('data-src')) {
                    item.ele.setAttribute('data-src', item.src)
                    item.ele.setAttribute('data-status', this.status[0])
                }
                if (!item.ele.getAttribute('src')) {
                    item.ele.setAttribute('src', this.defaultPic)
                }
            }
            if (this.inView(item.ele)) {
                if (eleType == 'img') {
                    _util.getPicInfo({
                        src: item.src,
                        errorCallback: (options) => {
                            item.ele.src = this.errorPic
                            item.ele.setAttribute('data-status', this.status[2])
                        },
                        loadedCallback: (options) => {
                            if (this.effectFadeIn) {
                                item.ele.style.opacity = 0
                            }
                            item.ele.src = options.isError ? this.errorPic : item.src
                            item.ele.removeAttribute('data-src')
                            item.ele.setAttribute('data-status', this.status[1])
                            setTimeout(() => {
                                item.ele.style.opacity = 1
                                item.ele.style.transition = 'all 1s'
                            }, 50)

                        }
                    })
                    this.callback(item.ele, item.src)
                } else {
                    typeof item.src == 'function' && item.src.call(item.ele)
                }
                this.selector.splice(i--, 1)
            }
        }
    }
}

export default {
    /**
     * Vue插件 install方法
     * @param Vue
     * @param options options选项值和VueViewload类选项是一致的
     */
    install(Vue, options = {}) {
        let resourceEles = {},
            initRender
        Vue.directive('view', {
            bind(el, binding) {
                let containerName = binding.arg == undefined ? 'window' : binding.arg
                if (resourceEles[containerName] == undefined) {
                    resourceEles[containerName] = []
                }
                resourceEles[containerName].push({
                    ele: el,
                    src: binding.value
                })
                Vue.nextTick(() => {
                    if (typeof initRender == 'undefined') {
                        initRender = _util.debounce(function () {
                            for (let key in resourceEles) {
                                options.container = key == 'window' ? window : document.getElementById(key)
                                options.selector = resourceEles[key]
                                new VueViewload(options).render()
                            }
                        }, 200)
                    }
                    initRender()
                })
            }
        })
    }
}
