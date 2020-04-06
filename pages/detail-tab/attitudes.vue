<template>
	<view class="comment">
		<view class="centent"  v-for="(item, index) in detailData" :key="index">
			<view class="left">
				<image class="logo" :src="item.user.profile_image_url" mode="widthFix"></image>
				<view :style="{opacity: item.user.verified?1:0}" :class="[item.user.verified_type == 3 ? 'blue-vip' : item.user.verified_type_ext == 1 ? 'red-vip' : 'yellow-vip']"></view>
			</view>
			<view class="right">
				<view class="header">{{item.user.screen_name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import mixins from '@/mixins/myMixins';
export default {
	name: 'attitudes',
	props: ['detailData'],
	data() {
		return {};
	},
	mixins: [mixins],
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
	@import '../../uni.scss';
	.comment{
		.centent{
			@include flex(space-between);
			align-items: flex-start;
			.left{
				.logo{
					@include wh(70upx,70upx);
					@include borderRadius(50%);
				}
			}
			.right{
				flex: 1;
				border-bottom: 1upx solid #B1B8BF;
				padding-bottom: 40upx;
				.header{
					font-size: $uni-font-size-sm;
				}
			}
			
		}
	}
	
</style>
