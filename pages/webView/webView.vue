<template>
	<view><web-view :webview-styles="webviewStyles" :src="src"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			src: '',
			webviewStyles: {
				progress: {
					color: '#1AA034'
				}
			}
		};
	},
	onLoad(option) {
		if (option.type == 'search') {
			this.src =
				'https://m.weibo.cn/search?containerid=100103type%3D1%26t%3D10%26q%3D' +
				option.name +
				'&isnewpage=1&extparam=c_type%3D30%26pos%3D1%26mi_cid%3D100103%26source%3Dranklist%26flag%3D0%26filter_type%3Drealtimehot%26cate%3D0%26display_time%3D1586070639&luicode=10000011&lfid=231583';
		}
		if (option.type == 'video') {
			this.src = option.name;
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
