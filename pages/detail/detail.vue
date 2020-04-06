<template>
	<view class="detail">
		<view @click="$common.navigateBack()" class="back">
			<view class="view"><image src="/static/index/back.svg" mode="widthFix"></image></view>
			<view class="view">微博正文</view>
			<view class="view"><image src="/static/index/more.svg" mode="widthFix"></image></view>
		</view>
		<view class="spance"></view>
		<multiple :type="0" :indexList="indexList" v-if="type == 1"></multiple>
		<trend-top :type="0" :indexList="indexList" :trendsList="trendsList" v-if="type == 2"></trend-top>
		<view class="operate">
			<view class="operate-left">
				<s-tabs effect color="#B1B8BF" activeColor="#000" lineColor="#000" :lineScale="0.3" v-model="activeTab" slot-title @change="swiperChange">
					<s-tab>转发{{ repostsCount }}</s-tab>
					<s-tab>评论{{ commentsCount }}</s-tab>
					<s-tab>赞{{ attitudesCount }}</s-tab>
				</s-tabs>
			</view> 
			<view class="operate-right">
				<view style="opacity: 0;"><image src="/static/index/more.svg" mode="widthFix"></image></view>
			</view>
		</view>
		<comment :detailData="detailData" v-if="activeTab == 1"></comment>
		<repost :detailData="detailData" v-if="activeTab == 0"></repost>
		<attitudes :detailData="detailData" v-if="activeTab == 2"></attitudes>
	</view>
</template>

<script>
import { buziAPI } from '@/api';
import mixins from '@/mixins/myMixins';
import multiple from '@/pages/tab/multiple';
import trendTop from '@/pages/tab/trend-top';
import sTabs from '@/components/s-tabs';
import sTab from '@/components/s-tab';
import comment from '@/pages/detail-tab/comment';
import repost from '@/pages/detail-tab/repost';
import attitudes from '@/pages/detail-tab/attitudes';
export default {
	data() {
		return {
			type: 0,
			indexList: [],
			trendsList: [],
			repostsCount: 0, //转发数
			commentsCount: 0, //评论数
			attitudesCount: 0, //点赞数
			activeTab: 1,
			detailData: [],
			page: 1,
			id: 0,
			mid: 0
		};
	},
	components: {
		multiple,
		trendTop,
		sTabs,
		sTab,
		comment,
		repost,
		attitudes
	},
	watch: {},
	mixins: [mixins],
	onLoad(option) {
		this.indexList.push(this.$localstorageFactory.get('detail'));
		console.log(this.indexList);
		this.type = option.type;
		if (this.type == 1) {
			this.id = this.indexList[0].mblog.id;
			this.mid = this.indexList[0].mblog.mid;
			this.repostsCount = this.indexList[0].mblog.reposts_count;
			this.commentsCount = this.indexList[0].mblog.comments_count;
			this.attitudesCount = this.indexList[0].mblog.attitudes_count;
		}
		if (this.type == 2) {
			this.id = this.indexList[0].id;
			this.mid = this.indexList[0].mid;
			this.repostsCount = this.indexList[0].reposts_count;
			this.commentsCount = this.indexList[0].comments_count;
			this.attitudesCount = this.indexList[0].attitudes_count;
		}
		this.getComment();
	},
	//上拉加载更多
	onReachBottom() {
		if (this.activeTab == 0) {
			if (this.detailData.length < this.repostsCount) {
				this.page++;
				this.getRepostTimeline();
			}
		}
		if (this.activeTab == 2) {
			if (this.detailData.length < this.attitudesCount) {
				this.page++;
				this.getAttitudes();
			}
		}
	},
	methods: {
		////获取单个详情页评论数据
		getComment(id, mid) {
			let that = this;
			buziAPI.getComment({ id: this.id, mid: this.mid, max_id_type: 0 }, res => {
				that.detailData = res.data.data;
				that.commentsCount = res.data.total_number;
				that.$common.getFormat(that.detailData, 'created_at', res.data.data);
				for (let i = that.detailData.length - res.data.data.length; i < that.detailData.length; i++) {
					if (that.detailData[i].like_count > 10000) {
						that.detailData[i].like_count = (that.detailData[i].like_count / 10000).toFixed(1) + '万';
						that.detailData[i].like_count = that.detailData[i].like_count.replace('.0', '');
					}
				}
			});
		},
		//获取单个详情页转发数据
		getRepostTimeline() {
			let that = this;
			buziAPI.getRepostTimeline({ id: this.id, page: this.page }, res => {
				that.detailData = [...that.detailData, ...res.data.data];
				that.repostsCount = res.data.total_number;
			});
		},
		//获取单个详情页点赞数据
		getAttitudes() {
			let that = this;
			buziAPI.getAttitudes({ id: this.id, page: this.page }, res => {
				console.log(res.data);
				that.detailData = [...that.detailData, ...res.data.data];
				that.attitudesCount = res.data.total_number;
			});
		},
		//tab切换
		swiperChange(e) {
			this.page = 1;
			this.detailData = [];
			if (e == 0) {
				this.getRepostTimeline();
			}
			if (e == 1) {
				this.getComment();
			}
			if (e == 2) {
				this.getAttitudes();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../uni.scss';
.detail {
	.back {
		background: #f8f8f8;
		padding: 20upx;
		position: fixed;
		@include wh(100%, 100upx);
		box-sizing: border-box;
		top: 0;
		/* #ifdef APP-PLUS */
		padding-top: 40upx;
		/* #endif */
		z-index: 100;
		@include flex(space-between);
		.view {
			image {
				@include wh(50upx, 50upx);
				height: 50upx !important;
			}
		}
	}
	.spance {
		height: 100upx;
	}
	.operate {
		@include flex(space-between);
		height: 50upx;
		@include relative(-40upx);
		image {
			@include wh(50upx, 50upx);
		}
		.operate-left {
			@include flex();
			view {
				text {
					margin: 0 20upx;
					@include sc($uni-font-size-sm, #000);
				}
			}
		}
		.operate-right {
			margin: 0 20upx;
		}
	}
}
</style>
