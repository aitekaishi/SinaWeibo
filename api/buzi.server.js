import ajax from './api'
import CommonUtils from '@/common/common.js'
let url = 'https://m.weibo.cn'
let login = 'https://passport.weibo.cn'
// #ifdef H5
url = '/api'
login = '/login'
// #endif
let cookie = ' _T_WM=88605205201; WEIBOCN_FROM=1110006030; MLOGIN=0; XSRF-TOKEN=6b209a; M_WEIBOCN_PARAMS=luicode%3D10000011%26lfid%3D102803%26uicode%3D10000011%26fid%3D102803'

export default {
	//判断是否登录
	getLogin (success, fail, error) {
		ajax.get(`${url}/api/config`,{'cookie':`${cookie}`}, null, success, fail, error)
	},
	//获取List
    getList (success, fail, error) {
		ajax.get(`${url}/api/config/list`,{'cookie':`${cookie}`}, null, success, fail, error)
    },
	//获取首页详细内容
	getIndex (listParams,success, fail, error) {
		ajax.get(`${url}/api/container/getIndex${CommonUtils.json2url(listParams)}`,{'cookie':`${cookie}`}, null, success, fail, error)
	},
	//获取首页除热门内容
	getTrendTop (listParams,success, fail, error) {
		ajax.get(`${url}/api/feed/trendtop${CommonUtils.json2url(listParams)}`,{'cookie':`${cookie}`}, null, success, fail, error)
	},
	//获取搜索页详细内容
	getSerachIndex (success, fail, error) {
		ajax.get(`${url}/api/container/getIndex?containerid=231583&page_type=searchall`,{'cookie':`${cookie}`}, null, success, fail, error)
	},
	//获取协议内容
	getAgreement (success, fail, error) {
		ajax.get(`${url}/c/regagreement?from=h5&wm=3349&lang=zh_CN`,{'cookie':`${cookie}`}, null, success, fail, error)
	},
	//用户名密码登录
	getUserLogin (body,success, fail, error) {
		ajax.post(`${login}/sso/login`,{'cookie':`_T_WM=88605205201; WEIBOCN_FROM=1110006030; WEIBOCN_WM=3349`,'Content-Type': 'application/x-www-form-urlencoded'}, body, success, fail, error)
	},
	//获取验证码
	getSms (body,success, fail, error) {
		ajax.post(`${url}/api/login/sendsms`,{'cookie':`_T_WM=88605205201; WEIBOCN_FROM=1110006030; WEIBOCN_WM=3349`,'Content-Type': 'application/x-www-form-urlencoded'}, body, success, fail, error)
	},
	//获取单个详情页评论数据
	getComment (listParams,success, fail, error) {
		ajax.get(`${url}/comments/hotflow${CommonUtils.json2url(listParams)}`,{'cookie':`${cookie}`}, null, success, fail, error)
	},
	//获取单个详情页转发数据
	getRepostTimeline (listParams,success, fail, error) {
		ajax.get(`${url}/api/statuses/repostTimeline${CommonUtils.json2url(listParams)}`,{'cookie':`${cookie}`}, null, success, fail, error)
	},
	//获取单个详情页点赞数据
	getAttitudes (listParams,success, fail, error) {
		ajax.get(`${url}/api/attitudes/show${CommonUtils.json2url(listParams)}`,{'cookie':`${cookie}`}, null, success, fail, error)
	},
}
