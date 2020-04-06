<template>
	<view>
		<view class="centent">
			<view v-if="trendsList.length" class="trends">
				<view class="item" :class="[index == trendsList.length-1 ? 'border-right' : '']"  v-for="(item, index) in trendsList" :key="index">
					<image :src="item.pic" mode="widthFix"></image>
					<view>{{item.title_sub}}</view>
				</view>
			</view>
			<view v-if="trendsList.length" class="spance"></view>
			<view v-for="(item, index) in indexList" :key="index">
				<view v-if="item.title" class="title-header" :class="[item.title.icon_url ? 'color' : '']"><image v-if="item.title.icon_url" :src="item.title.icon_url" mode="widthFix"></image>{{item.title.text}}</view>
				<view class="title">
					<view class="title-left">
						<view class="header">
							<image class="logo" :src="item.user.avatar_hd" mode="widthFix"></image>
							<view :style="{opacity: item.user.verified?1:0}" :class="[item.user.verified_type == 3 ? 'blue-vip' : item.user.verified_type_ext == 1 ? 'red-vip' : 'yellow-vip']"></view>
						</view>
						<view class="name">
							<view class="name-title">
								<view>{{item.user.screen_name}}</view>
								<view :style="{opacity: item.user.mbrank?1:0}" :class="['crown'+item.user.mbrank]"></view>
							</view>
							<view class="name-time">
								<view>{{item.created_at}}</view>
								<view :style="{opacity: item.source?1:0}">来自 {{item.source}}</view>
							</view>
						</view>
					</view>
					<view class="title-right">
						+关注
					</view>
				</view>
				<view v-if="type" class="v-html-lg" @click="toDetail(item,2)" v-html="item.text"></view>
				<view v-if="!type" class="v-html-lg" v-html="item.text"></view>
				<view class="image-video">
					<view v-if="item.pic_num" class="image">
						<view class="image-list" v-for="(sunItem, subIndex) in item.pics" :key="subIndex">
							<image @click="lookImage(item.pics,subIndex)" :src="sunItem.url" mode="aspectFill"></image>
							<view class="describe">
								<text v-if="sunItem.url.search('gif')>-1">动图</text>
								<text v-if="sunItem.geo.height>=800">长图</text>
							</view>
						</view>
					</view>
					<view v-if="item.page_info" class="video">
						<view @click="playVideo(item.page_info.page_url)" v-if="item.page_info.media_info">
							<image class="image" :src="item.page_info.page_pic.url" mode="aspectFill"></image>
							<view class="title">
								<view>{{item.page_info.play_count}}</view>
								<view><image src="/static/index/pause.svg" mode="widthFix"></image></view>
								<view>{{item.page_info.media_info.duration}}</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="type" class="operate">
					<view class="operate-left">
						<view><image src="/static/index/relay.svg" mode="widthFix"></image><text>{{item.reposts_count}}</text></view>
						<view><image src="/static/index/comment.svg" mode="widthFix"></image><text>{{item.comments_count}}</text></view>
						<view><image src="/static/index/admire.svg" mode="widthFix"></image><text>{{item.attitudes_count}}</text></view>
					</view>
					<view class="operate-right">
						<view><image src="/static/index/more.svg" mode="widthFix"></image></view>
					</view>
				</view>
				<view class="line"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixins from '@/mixins/myMixins';
export default {
	name:'trend-yop',
	props:['indexList','trendsList','type'],
	data() {
		return {
			
		};
	},
	mixins: [mixins],
	methods:{}
};
</script>

<style>
</style>
