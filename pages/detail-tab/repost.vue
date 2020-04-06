<template>
	<view class="comment">
		<view class="centent"  v-for="(item, index) in detailData" :key="index">
			<view class="left">
				<image class="logo" :src="item.user.avatar_hd" mode="widthFix"></image>
				<view :style="{opacity: item.user.verified?1:0}" :class="[item.user.verified_type == 3 ? 'blue-vip' : item.user.verified_type_ext == 1 ? 'red-vip' : 'yellow-vip']"></view>
			</view>
			<view class="right">
				<view class="header">{{item.user.screen_name}}</view>
				<view class="v-html-base" @click="$refs.popup.open()" v-html="item.text"></view>
				<view class="right-bottom">
					<view class="right-bottom-left">{{item.created_at}}</view>
					<view class="right-bottom-right">
						<image src="/static/index/admire.svg" mode="widthFix"></image>
						<view>{{item.like_count}}</view>
						<image src="/static/index/comment.svg" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup">
				<view class="popup-button">查看该微博</view>
				<view class="popup-button">回复</view>
				<view class="popup-button">举报</view>
				<view class="spance"></view>
				<view @click="$refs.popup.close()" class="popup-button">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import mixins from '@/mixins/myMixins';
import uniPopup from "@/components/uni-popup/uni-popup.vue"
export default {
	name: 'repost',
	props: ['detailData'],
	data() {
		return {};
	},
	components: {uniPopup},
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
				.header{
					font-size: $uni-font-size-sm;
				}
				.right-bottom{
					@include flex(space-between);
					@include sc($uni-font-size-sm,#B1B8BF);
					margin-bottom: 20upx;
					.right-bottom-right{
						@include flex(space-between);
						image{
							@include wh(30upx,30upx);
							height: 30upx !important;
						}
						image:nth-of-type(1){
							@include relative(3upx);
						}
						view{
							margin: 0 20upx 0 2upx;
						}
					}
				}
				
			}
			
		}
		.popup{
			background: #FFF;
			text-align: center;
			view{
				padding: 20upx;
			}
			view:nth-of-type(1),view:nth-of-type(2){
				border-bottom: 1upx solid #DEE3DE;
			}
			.spance{
				padding: 0;
				height: 10upx;
				background: #DEE3DE;
				box-sizing: border-box;
			}
		}
	}
	
</style>
