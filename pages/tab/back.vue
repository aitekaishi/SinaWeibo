<template>
	<view  @click="$common.navigateBack()" class="back">
		<view class="view">
			<image src="/static/index/back.svg" mode="widthFix"></image>
		</view>
		<view class="spance"></view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import '../../uni.scss';
	.back{
		.view{
			background: #F8F8F8;
			padding: 20upx;
			position: fixed;
			@include wh(100vw,60upx);
			top: 0;
			/* #ifdef APP-PLUS */
			padding-top: 40upx;
			/* #endif */
			image{
				@include wh(50upx,50upx);
				height: 50upx !important;
			}
		}
		.spance{
			height: 100upx;
		}
	}
</style>
