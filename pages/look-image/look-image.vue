<template>
	<view class="look-image">
		<view class="title">
			<view>{{targetIndex}}</view>
			<view class="right">
				<view class="anchor" v-if="enlarge==true" @click="enlarge=false"><image src="/static/index/enlarge.svg" mode="widthFix"></image></view>
				<view class="anchor" v-if="enlarge==false" @click="enlarge=true"><image src="/static/index/reduce.svg" mode="widthFix"></image></view>
				<view @click="$common.navigateBack()"><image src="/static/index/close.svg" mode="widthFix"></image></view>
			</view>
		</view>
		<swiper class="swiper" @change="change" :current=index >
				<swiper-item v-for="(item, index) in items" :key="index"><image :class="[enlarge==false ? 'scale' : '']" lazy-load :src="item.large.url" mode="aspectFit"></image></swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			items: [],
			index:0,
			targetIndex:0,
			enlarge:true,//是否放大
		};
	},
	onLoad(option) {
		this.index = option.index
		this.items = this.$localstorageFactory.get('image_list')
		this.targetIndex = Number(this.index) + 1 + '/' + this.items.length
		uni.downloadFile({
		    url: 'https://wx4.sinaimg.cn/large/56df5c93ly1gdfqwix0o3j20yi22oqoi.jpg', //仅为示例，并非真实的资源
		    success: (res) => {
		       console.log(res)
			   uni.saveFile({
			         tempFilePath: res.tempFilePath,
			         success: function (res) {
						 console.log(res)
			           var savedFilePath = res.savedFilePath;
			         }
			       });
		    }
		});
	},
	methods: {
		change(e){
			this.targetIndex = e.detail.current + 1 + '/' + this.items.length
		}
	}
};
</script>

<style lang="scss" scoped>
	@import '../../uni.scss';
	.look-image{
		background: #000;
		height: 100vh;
		overflow-y: hidden;
		.title{
			@include flex(space-between);
			padding: 40upx 20upx 0 20upx;
			height: 60upx;
			@include sc($uni-font-size-base,#BFBFBF)
			image{
				width: 40upx;
				@include relative(10upx);
			}
			.right{
				@include flex(end);
				.anchor{
					image{
						width: 50upx;
						margin-right: 20upx;
					}
				}
			}
		}
		.swiper{
			height: 100vh;
			swiper-item{
				@include flex(center);
				@include relative(-40upx);
			}
			.scale{
				transform: scale(3);
			}
		}
		
	}
</style>
