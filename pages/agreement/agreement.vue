<template>
	<view class="agreement">
		<back></back>
		<view v-html="data"></view>
	</view>
</template>

<script>
	import { buziAPI } from '@/api';
	import back from '@/pages/tab/back'
	export default {
		data() {
			return {
				data:''
			};
		},
		components:{
			back
		},
		onLoad() {
			let that = this
			buziAPI.getAgreement(res=>{
				that.data = res
			})
		}
	}
</script>

<style lang="scss" scoped>
</style>
