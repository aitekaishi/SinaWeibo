<template>
	<view class="serach">
		<view class="title">
			<image @click="$common.navigateBack()" src="/static/index/back.svg" mode="w/idthFix"></image>
			<view class="input">
				<image src="/static/index/serach.svg" mode="widthFix"></image>
				<input type="text" v-model="keyWord" @keyup="$common.navigateTo('../serach/serach')" :placeholder="placeholder" />
			</view>
			<view @click="serach(keyWord)">搜索</view>
		</view>
		<view class="serach-line"></view>
		<view class="title-list">
			<view class="item" v-for="(item, index) in serachObj.cards[0].group" :key="index">
				<view class="item-left">
					<text @click="serach(item.title_sub)">{{ item.title_sub }}</text>
					<image :src="item.icon" mode="widthFix"></image>
				</view>
				<view class="vertical-line"></view>
			</view>
		</view>
		<view class="cate-list">
			<view class="item" :class="[(index+1)%6 == 0 ? 'border-right' : '']" v-for="(item, index) in serachObj.cards[1].card_group[0].group" :key="index">
				<image @click="toLink(item.scheme)" :src="item.pic" mode="widthFix"></image>
				<view>{{ item.title_sub }}</view>
			</view>
			<view class="item border-right" :class="[(index+1) == 7-((serachObj.cards[1].card_group[0].group.length)%6) ? 'none' : '']" v-for="(item, index) in 7-((serachObj.cards[1].card_group[0].group.length)%6)" :key="index">
				
			</view>
		</view>
	</view>
</template>

<script>
import { buziAPI } from '@/api';
import mixins from '@/mixins/myMixins';
export default {
	data() {
		return {
			keyWord:'',
			placeholder:'',
			serachObj: {} //数据
		};
	},
	components: {},
	watch: {},
	mixins: [mixins],
	onLoad() {
		let that = this;
		buziAPI.getSerachIndex(res => {
			that.serachObj = res.data;
			that.placeholder = that.serachObj.hotwords[0].tip + that.serachObj.hotwords[0].word
		});
	},
	//上拉加载更多
	onReachBottom() {},
	methods: {
		serach(val){
			uni.navigateTo({
				url:'../webView/webView?name=' + val+'&type=search'
			})
		},
		toLink(item){
			uni.navigateTo({
				url:'../webView/webView?name=' + item+'&type=video'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../uni.scss';
.serach {
	background: #f2f2f2;
	min-height: 100vh;
	.serach-line{
		@include wh(100%,2upx);
		background: #E6E6E6;
	}
	.title {
		background: #fff;
		padding: 20upx;
		height: 60upx;
		@include flex(space-between);
		font-size: $uni-font-size-base;
		image {
			@include wh(40upx, 40upx);
		}
		.input {
			flex: 1;
			height: 60upx;
			background: #ebebec;
			padding-left: 20upx;
			@include borderRadius(50upx);
			@include flex(start);
			margin-right: 10upx;
			image {
				@include relative(5upx);
			}
			input {
				font-size: $uni-font-size-base;
				width: 90%;
				@include line-clamp(1, 60upx);
			}
		}
	}
	.title-list {
		background: #fff;
		@include flex(space-between);
		flex-wrap: wrap;
		margin-bottom: 40upx;
		.item {
			margin: 0 10upx;
			@include wh(330upx,60upx);
			padding: 10upx 0 10upx 10upx;
			@include flex(space-between);
			border-bottom: 1upx solid #e6e6e6;
			.item-left {
				@include flex();
				text {
					@include line-clamp(1, 40upx);
					font-size: $uni-font-size-base;
					max-width: 270upx;
				}
				image {
					margin-left: 5upx;
					display: inline-block;
					width: 30upx !important;
				}
			}

			.vertical-line {
				@include wh(2upx, 60upx);
				background: #e6e6e6;
				@include relative(0, 0, 0, 30upx);
			}
		}
	}
	.cate-list {
		background: #fff;
		padding-top: 20upx;
		@include flex(space-around);
		flex-wrap: wrap;
		.item {
			@include wh(120upx, 110upx);
			text-align: center;
			border-right: 1upx solid #e6e6e6;
			margin-bottom: 40upx;
			image {
				@include wh(70upx, 70upx);
			}
			view {
				font-size: $uni-font-size-sm;
				@include relative(-10upx);
			}
		}
		.border-right{
			border-right: none;
		}
		.none{
			height: 0;
			margin-bottom: 0;
		}
	}
	.cate-list:after{
		content: "";
		    flex: auto;
	}
}
</style>
