import moment from '@/common/SDK/moment.js'
export default {
	isEmpty: value => {
		return value === null || value === undefined || value === ''
	},
	json2url: obj => {
		let arr = []
		for (let key in obj) {
			if (obj[key]) {
				arr.push(key + '=' + encodeURI(obj[key]))
			}
		}
		return (arr.length ? '?' : '') + arr.join('&')
	},
	//路由跳转
	navigateTo: url => {
		uni.navigateTo({
			url: url
		})
	},
	//返回上一级
	navigateBack: () => {
		uni.navigateBack({
			delta: 1
		})
	},
	//Tab跳转
	switchTab: url => {
		uni.switchTab({
			url: url
		});
	},
	//秒转成分秒
	secsToMinSecs: value => {
		let m, s = ''
		m = Math.floor(Number(value) / 60) > 9 ? Math.floor(Number(value) / 60) : '0' + Math.floor(Number(value) / 60)
		s = Math.ceil(Number(value) % 60) > 9 ? Math.ceil(Number(value) % 60) : '0' + Math.ceil(Number(value) % 60)
		if (s == '60') {
			s = '00'
			m = '01'
		}
		return m + ':' + s
	},
	//获取日期格式
	getFormat(objList,data,resData){
		for (let i = objList.length-resData.length; i < objList.length; i++) {
			if(moment(new Date(objList[i][data])).format("YYYY-MM")==moment().format("YYYY-MM")){
				if((Number(moment(new Date()).format("DD"))-Number(moment(new Date(objList[i][data])).format("DD")))==1){
					objList[i][data] = '昨天'+moment(new Date(objList[i][data])).format("HH:mm")
				}
				if((Number(moment(new Date()).format("DD"))-Number(moment(new Date(objList[i][data])).format("DD")))==2){
					objList[i][data] = '前天'+moment(new Date(objList[i][data])).format("HH:mm")
				}
				if((Number(moment(new Date()).format("DD"))-Number(moment(new Date(objList[i][data])).format("DD")))==0){
					objList[i][data] = Number(moment(new Date()).format("HH"))-Number(moment(new Date(objList[i][data])).format("HH"))+1+'小时前'
				}
			} else {
				objList[i][data] = moment(new Date(objList[i][data])).format("YYYY-MM-DD:HH:mm")
			}
		}
	},
	//占位图
	placeholderChart(obj,imgSrc) {
		let url = obj[imgSrc]
		let src = obj[imgSrc];
		// #ifdef H5
		if(obj[imgSrc].indexOf('//wx1')>-1){
			src = obj[imgSrc].replace('https://wx1.sinaimg.cn/', '/wx1/')
		}
		if(obj[imgSrc].indexOf('//wx2')>-1){
			src = obj[imgSrc].replace('https://wx2.sinaimg.cn/', '/wx3/')
		}
		if(obj[imgSrc].indexOf('//wx3')>-1){
			src = obj[imgSrc].replace('https://wx3.sinaimg.cn/', '/wx3/')
		}
		if(obj[imgSrc].indexOf('//wx4')>-1){
			src = obj[imgSrc].replace('https://wx4.sinaimg.cn/', '/wx4/')
		}
		// #endif
		obj[imgSrc] = '/static/sina-background.jpg';
		uni.request({
			url: src,
			responseType: 'arraybuffer',
			success: res => {
				obj[imgSrc] = url
			}
		});
	}
}
