<template>
	<view>
		<view class="centent">
			<view v-for="(item, index) in indexList" :key="index">
				<view class="title">
					<view class="title-left">
						<view class="header">
							<image class="logo" :src="item.mblog.user.avatar_hd" mode="widthFix"></image>
							<view :style="{opacity: item.mblog.user.verified?1:0}" :class="[item.mblog.user.verified_type == 3 ? 'blue-vip' : item.mblog.user.verified_type_ext == 1 ? 'red-vip' : 'yellow-vip']"></view>
						</view>
						<view class="name">
							<view class="name-title">
								<view>{{item.mblog.user.screen_name}}</view>
								<view :style="{opacity: item.mblog.user.mbrank?1:0}" :class="['crown'+item.mblog.user.mbrank]"></view>
							</view>
							<view class="name-time">
								<view>{{item.mblog.created_at}}</view>
								<view :style="{opacity: item.mblog.source?1:0}">来自 {{item.mblog.source}}</view>
							</view>
						</view>
					</view>
					<view class="title-right">
						+关注
					</view>
				</view>
				<view v-if="type" class="v-html-lg"  @click="toDetail(item,1)" v-html="item.mblog.text"></view>
				<view v-if="!type" class="v-html-lg" v-html="item.mblog.text"></view>
				<view class="image-video">
					<view v-if="item.mblog.pic_num" class="image">
						<view class="image-list" v-for="(sunItem, subIndex) in item.mblog.pics" :key="subIndex">
							<image @click="lookImage(item.mblog.pics,subIndex)" :src="sunItem.url" mode="aspectFill"></image>
							<view class="describe">
								<text v-if="sunItem.url.search('gif')>-1">动图</text>
								<text v-if="sunItem.geo.height>=800">长图</text>
							</view>
						</view>
					</view>
					<view v-if="item.mblog.page_info" class="video">
						<view v-if="item.mblog.page_info.media_info">
							<image class="image" :src="item.mblog.page_info.page_pic.url" mode="aspectFill"></image>
							<view class="title">
								<view>{{item.mblog.page_info.play_count}}</view>
								<view><image src="/static/index/pause.svg" mode="widthFix"></image></view>
								<view>{{item.mblog.page_info.media_info.duration}}</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="type" class="operate">
					<view class="operate-left">
						<view><image src="/static/index/relay.svg" mode="widthFix"></image><text>{{item.mblog.reposts_count}}</text></view>
						<view><image src="/static/index/comment.svg" mode="widthFix"></image><text>{{item.mblog.comments_count}}</text></view>
						<view><image src="/static/index/admire.svg" mode="widthFix"></image><text>{{item.mblog.attitudes_count}}</text></view>
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
	name:'multiple',
	props:['indexList','type'],
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
