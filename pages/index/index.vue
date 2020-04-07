<template>
	<view class="index">
		<view v-if="!notScroll && !login" @click="$common.navigateTo('../login/login')" class="bottom-button">登录/注册</view>
		<view :class="[pullDown ? 'opacity' : 'no-opacity']" class="popup">
			<view class="item" @click="popupClick(index)" :class="[activeTab == index ? 'actived' : '']" v-for="(item, index) in listObj.channel" :key="index">
				{{ item.name }}
			</view>
		</view>
		<view class="title-swiper">
			<view class="title">
				<view class="logo">
					<image v-if="!login" src="https://h5.sinaimg.cn/m/weibo-lite/img/pwalogo.417d1674.svg" mode="widthFix"></image>
					<image v-if="login" src="/static/index/user-info.svg" mode="widthFix"></image>
				</view>
				<view class="input">
					<image src="/static/index/serach.svg" mode="widthFix"></image>
					<input type="text" @click="$common.navigateTo('../serach/serach')" :placeholder="hotWord" />
				</view>
				<view class="write">
					<image v-if="login" src="/static/index/email.svg" mode="widthFix"></image>
					<text v-if="login">4</text>
					<image src="/static/index/write.svg" mode="widthFix"></image>
				</view>
			</view>
			<view class="swiper">
				<view class="swiper-left">
					<s-tabs effect color="#B1B8BF" activeColor="#000" lineColor="#000" :lineScale="0.3" v-model="activeTab" slot-title @change="swiperChange">
						<s-tab v-for="(item, index) in listObj.channel" :key="index">{{ item.name }}</s-tab>
					</s-tabs>
				</view>
				<view @click="pullDown = !pullDown" :class="[pullDown ? 'rotate-to' : 'rotate-form']" class="swiper-right">
					<image lazy-load src="/static/index/pull-down.svg" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="space"></view>
		<multiple :type="1" :indexList="indexList" v-if="activeTab == 0"></multiple>
		<trend-top :type="1" :indexList="indexList" :trendsList="trendsList" v-if="activeTab != 0"></trend-top>
	</view>
</template>

<script>
import { buziAPI } from '@/api';
import mixins from '@/mixins/myMixins';
import sTabs from '@/components/s-tabs';
import sTab from '@/components/s-tab';
import multiple from '@/pages/tab/multiple';
import trendTop from '@/pages/tab/trend-top';
import constants from '@/common/enumerate';
export default {
	data() {
		return {
			hotWord:'',//热门关键字
			listObj: {}, //数据初始化
			indexList: [], //首页详细内容
			trendsList: [], //战疫情tab
			activeTab: 0,
			pullDown: false, //是否打开下拉
			notScroll: false,
			pageIndex: 1 //当前页数
		};
	},
	components: {
		sTabs,
		sTab,
		multiple,
		trendTop
	},
	watch: {},
	mixins: [mixins],
	onLoad() {
		this.getLogin();
		this.getList();
		this.getIndex(this.pageIndex);
		uni.getSystemInfo({
			success: function(res) {
				console.log(res);
			}
		});
	},
	onPageScroll(e) {
		if (e.scrollTop > 150) {
			this.notScroll = true;
		} else {
			this.notScroll = false;
		}
	},
	//上拉加载更多
	onReachBottom() {
		this.pageIndex++;
		this.switch();
	},
	methods: {
		switch() {
			if (this.activeTab == 0) {
				this.getIndex(this.pageIndex);
			} else {
				this.getTrendTop(constants['ENUM_KEY'][this.activeTab], this.pageIndex);
			}
		},
		//获取搜索数据
		getList() {
			let that = this;
			buziAPI.getList(res => {
				that.listObj = res.data;
				that.hotWord = '大家都在搜：' + that.listObj.hot.hotWord;
			});
		},
		//tab切换
		swiperChange() {
			this.pageIndex = 1;
			this.pullDown = false;
			this.indexList = [];
			this.trendsList = [];
			this.switch();
		},
		popupClick(index) {
			this.activeTab = index;
			this.swiperChange();
		},
		//获取首页热门内容
		getIndex(page) {
			let that = this;
			buziAPI.getIndex({ containerid: 102803, openApp: '0', since_id: this.pageIndex - 1 }, res => {
				that.indexList = [...that.indexList, ...res.data.cards];
				for (let i = (page - 1) * 10; i < that.indexList.length; i++) {
					if(that.indexList[i].mblog.pics!=undefined){
						for (let j = 0; j < that.indexList[i].mblog.pics.length; j++) {
							that.$common.placeholderChart(that.indexList[i].mblog.pics[j],'url')
						}
					}
					if (
						that.indexList[i].mblog &&
						that.indexList[i].mblog.page_info &&
						that.indexList[i].mblog.page_info.media_info &&
						that.indexList[i].mblog.page_info.media_info.duration
					) {
						that.indexList[i].mblog.page_info.media_info.duration = that.$common.secsToMinSecs(that.indexList[i].mblog.page_info.media_info.duration);
					}
				}
			});
		},
		//获取首页除热门内容
		getTrendTop(containerid, page) {
			let that = this;
			buziAPI.getTrendTop({ containerid, page: this.pageIndex }, res => {
				that.indexList = [...that.indexList, ...res.data.statuses];
				if ([2, 11, 12].indexOf(res.data.trends && that.activeTab) > -1) {
					that.trendsList = res.data.trends[0].feeds[0].group;
				}
				if ([4].indexOf(res.data.trends && that.activeTab) > -1) {
					that.trendsList = res.data.trends[0].feeds[0].card_group[0].group;
				}
				that.$common.getFormat(that.indexList, 'created_at', res.data.statuses);
				for (let i = that.indexList.length - res.data.statuses.length; i < that.indexList.length; i++) {
					if (that.indexList[i] && that.indexList[i].page_info && that.indexList[i].page_info.media_info && that.indexList[i].page_info.media_info.duration) {
						that.indexList[i].page_info.media_info.duration = that.$common.secsToMinSecs(that.indexList[i].page_info.media_info.duration);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../uni.scss';
.index {
	.bottom-button {
		z-index: 100;
		display: inline-block;
		color: #fff;
		width: 240upx;
		text-align: center;
		@include borderRadius(50upx);
		background: linear-gradient(to right, #4696ea, #56b5eb);
		position: fixed;
		bottom: 100upx;
		left: calc(50% - 120upx);
		padding: 10upx 0;
	}
	.space {
		height: 200upx;
	}
	.opacity {
		opacity: 1;
		transition: opacity 0.2s linear;
		z-index: 101;
	}
	.no-opacity {
		opacity: 0;
		transition: opacity 0.2s linear;
		z-index: -1;
	}
	.popup {
		flex-wrap: wrap;
		position: fixed;
		top: 190upx;
		background: #fafafa;
		.item {
			display: inline-block;
			box-sizing: border-box;
			width: 167.5upx;
			margin: 20upx 10upx;
			background: #eeeeee;
			text-align: center;
			font-size: $uni-font-size-base;
			padding: 15upx 0;
		}
		.actived {
			color: #fc962c;
		}
	}
	.title-swiper {
		background: #fafafa;
		padding: 20upx 20upx 0 20upx;
		border-bottom: 1upx solid #b1b8bf;
		position: fixed;
		top: 0;
		/* #ifdef APP-PLUS */
		padding-top: 40upx;
		/* #endif */
		z-index: 100;
		.title {
			height: 60upx;
			@include flex(space-between);
			image {
				@include wh(55upx, 55upx);
			}
			.input {
				flex: 1;
				height: 60upx;
				background: #ebebec;
				padding-left: 20upx;
				@include borderRadius(50upx);
				@include flex(start);
				image {
					@include wh(40upx, 40upx);
					@include relative(5upx);
				}
				input {
					font-size: $uni-font-size-base;
					width: 90%;
					@include line-clamp(1, 60upx);
				}
			}
			.logo,
			.write {
				margin: 0 10upx;
				@include flex();
				text {
					width: 10upx;
					font-size: $uni-font-size-base;
					@include relative(-20upx);
					color: red;
				}
			}
		}
		.swiper {
			@include flex();
			.swiper-left {
				width: 85vw;
			}
			.rotate-to {
				transform: rotate(180deg);
				transform-origin: 50% 50%;
				transition: transform 0.2s linear;
			}
			.rotate-form {
				transform: rotate(0);
				transform-origin: 50% 50%;
				transition: transform 0.2s linear;
			}
			.swiper-right {
				image {
					@include wh(calc(15vw - 20upx), calc(15vw - 20upx));
					height: calc(15vw - 20upx) !important;
					@include relative(10upx);
				}
			}
		}
	}
}
</style>
