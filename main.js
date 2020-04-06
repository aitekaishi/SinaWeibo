import Vue from 'vue'
import App from './App'
import './uni.scss'
import './weui.css'
import filters from '@/filters/common.js'
import CommonUtils from '@/common/common.js'
import moment from '@/common/SDK/moment.js'
import localstorageFactory from '@/common/localstorage.factory.js'
import store from './store'
moment.locale('zh-cn')// 使用中文
// 过滤器加载
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
//定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$common = CommonUtils
Vue.prototype.$moment = moment
Vue.prototype.$localstorageFactory = localstorageFactory
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
