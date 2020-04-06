function axiosApi(method, header, url, params, success, fail, error) {
	let cookie = ' _T_WM=88605205201; WEIBOCN_FROM=1110006030; MLOGIN=0; XSRF-TOKEN=6b209a; M_WEIBOCN_PARAMS=luicode%3D10000011%26lfid%3D102803%26uicode%3D10000011%26fid%3D102803'
	
	uni.showLoading({
		title:'加载中...',
		mask:true
	})
	uni.request({
		url: url,
		method: method,
		header:header,
		data: params,
		success: (res) => {
			uni.hideLoading()
			success(res.data)
		},
		fail(res) {
			fail(res.data)
		}
	})
}
// 提供再次封装的GET、POST、PUT、DELETE方法
export default {
	get: (url,header, params, success, fail, error) => {
		return axiosApi('GET',header, url, params, success, fail, error)
	},
	post: (url,header, params, success, fail, error) => {
		return axiosApi('POST',header, url, params, success, fail, error)
	},
	put: (url,header, params, success, fail, error) => {
		return axiosApi('PUT',header, url, params, success, fail, error)
	},
	delete: (url,header, params, success, fail, error) => {
		return axiosApi('DELETE',header, url, params, success, fail, error)
	}
}
