import { buziAPI } from '@/api';
export default {
	data() {
		return {
			login:false
		}

	},
	watch: {},
	//下拉刷新
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
			uni.showToast({
				title:'加载完成',
				icon:'none'
				
			})
		}, 1000);
	},
	methods: {
		//判断是否登录
		getLogin(){
			let that = this
			buziAPI.getLogin(res=>{
				that.login = res.data.login
			})
		},
		//查看图片
		lookImage(item,index){
			this.$localstorageFactory.remove('image_list')
			this.$localstorageFactory.set('image_list',item)
			uni.navigateTo({
				url:'../look-image/look-image?index='+index
			})
		},
		//转到详情页
		toDetail(item,type){
			this.$localstorageFactory.set('detail',item)
			uni.navigateTo({
				url:'../detail/detail?type='+type
			})
		}
		
	}
}
