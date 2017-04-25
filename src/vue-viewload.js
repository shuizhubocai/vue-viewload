let _util = {
    /**
     * debounce 函数去抖动
     * @param fn
     * @param delay
     * @returns {function()}
     */
    debounce(fn, delay) {
        let timer
        return () => {
            let _this = this
            let _arg = arguments
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(_this, _arg)
            }, delay)
        }
    }
}

class VueViewload {
    /**
     * @param picPlaceholder   默认图片
     * @param threshold        距离可视范围偏移值，负值表示提前进入，正值表示延迟进入
     * @param effectFadeIn     是否渐入显示，默认是false
     * @param callback         进入可视区域后的回调函数，接收两个个参数，ele元素，loadAttr加载资源
     * selector 遍历的元素，每一项是一个对象，包含元素ele，加载资源src，资源加载状态status，status有未加载loading，已加载loaded，加载失败error
     */
    constructor (options) {
        this.picPlaceHolder = options && options.picPlaceHolder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        this.threshold = options && options.threshold || 0
        this.effectFadeIn = options && options.effectFadeIn || false
        this.callback = options && options.callback || new Function
        this.selector = []
        this.event = ['scroll', 'resize']
        this.delayRender = _util.debounce(this.render.bind(this), 200)
    }

    inView (ele) {
        let isInView = false
        let rect = ele.getBoundingClientRect()
        if (rect.bottom > this.threshold && rect.top + this.threshold < window.innerHeight && rect.right > this.threshold && rect.left + this.threshold < window.innerWidth) {
            isInView = true
        }
        return isInView
    }

    render () {
        let _this = this
        this.selector.forEach(function (item, index, arr) {
            if (item.display !== 'none' && item.status == 'loading') {
                if (_this.inView(item.ele)) {
                    if (item.ele.nodeName.toLowerCase() == 'img') {
                        item.ele.src = item.src
                        item.ele.addEventListener('error', function () {
                            item.ele.isError = true
                            item.status = 'error'
                        }, false)
                        if (_this.effectFadeIn) {
                            item.status = 'loaded'
                            item.ele.style.opacity = 0
                            item.ele.addEventListener('load', function () {
                                if (this.isError) {
                                    this.src = _this.picPlaceHolder
                                }
                                this.style.opacity = 1
                                this.style.transition = 'opacity 1s'
                            })
                        }

                    }
                    _this.callback(item.ele, item.src)
                }
            }
        })
    }
}

export default {
    /**
     * Vue插件
     * @param Vue
     * @param options
     */
    install(Vue, options = {}) {
        let vueviewload = new VueViewload(options)
        Vue.prototype.$vueviewload = vueviewload
        Vue.directive('view', {
            bind(el, binding) {
                if (vueviewload.selector.indexOf(el) == -1) {
                    vueviewload.selector.push({
                        ele: el,
                        src: binding.value,
                        status: 'loading',
                        display: getComputedStyle(el, null).display
                    })
                }
                Vue.nextTick(() => {
                    vueviewload.delayRender()
                })
            }
        })
    }
}
