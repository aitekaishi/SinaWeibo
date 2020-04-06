<template>
	<view class="user-login">
		<view @click="$common.navigateBack()" class="close"><image src="/static/index/close.svg" mode="widthFix"></image></view>
		<view class="logo"><image src="https://passport.weibo.cn/images/weibo/signin/default-avatar_2x.png" mode="widthFix"></image></view>
		<view class="spance"></view>
		<view class="input">
			<view class="name">
				<view></view>
				<view><input type="text" @focus="error = false" v-model="userName" placeholder="邮箱/手机号" /></view>
			</view>
			<view class="password">
				<view></view>
				<view><input type="text" @focus="error = false" v-model="password" placeholder="请输入密码" /></view>
			</view>
		</view>
		<view class="spance"></view>
		<view v-if="error" class="error">{{ errorMessage }}</view>
		<view @click="login" class="login-button">登录</view>
		<view class="operate">
			<view>注册账号</view>
			<view>忘记密码</view>
		</view>
	</view>
</template>

<script>
import { buziAPI } from '@/api';
export default {
	data() {
		return {
			userName: '',
			password: '',
			error: false,
			errorMessage: ''
		};
	},
	watch: {},
	methods: {
		login() {
			let that = this;
			if (!that.userName) {
				that.error = true;
				that.errorMessage = '用户名不能为空';
			} else if (!that.password) {
				that.error = true;
				that.errorMessage = '密码不能为空';
			} else {
				buziAPI.getUserLogin(
					{
						username: that.userName,
						password: that.password,
						savestate: 1,
						r: 'https://m.weibo.cn/',
						ec: 0,
						pagerefer: 'https://m.weibo.cn/login?backURL=https%253A%252F%252Fm.weibo.cn%252F',
						entry: 'mweibo',
						wentry: '',
						loginfrom: '',
						client_id: '',
						code: '',
						qq: '',
						mainpageflag: 1,
						hff: ''
					},
					res => {}
				);
			}
		}
	}
};
</script>

<style lang="scss">
@import '../../uni.scss';
.user-login {
	min-height: 100vh;
	.close {
		height: 60upx;
		padding: 20upx;
		image {
			@include wh(60upx, 60upx);
			height: 60upx !important;
		}
	}
	.logo {
		margin: 60upx auto;
		text-align: center;
		image {
			border: 2upx solid #d7d7d7;
			@include wh(140upx, 140upx);
			height: 140upx !important;
		}
	}
	.spance {
		height: 2upx;
		background: #d7d7d7;
	}
	.error {
		@include sc($uni-font-size-base, red);
		margin: 10upx 0 0 50upx;
	}
	.input {
		background: #fff;
		.name,
		.password {
			@include flex();
			margin: 0 47upx;
		}
		.name {
			border-bottom: 1upx solid #d7d7d7;
			view:nth-of-type(1) {
				display: inline-block;
				margin-right: 0;
				background-repeat: no-repeat;
				background-image: url('https://passport.weibo.cn/images/weibo/signin/icon_2x.png');
				background-position: 0 -85upx;
				width: 90upx;
				height: 80upx;
				transform: scale(0.6);
				@include relative(0, 0, 0, -10upx);
			}
		}
		.password {
			view:nth-of-type(1) {
				display: inline-block;
				margin-right: 0;
				background-repeat: no-repeat;
				background-image: url('https://passport.weibo.cn/images/weibo/signin/icon_2x.png');
				background-position: 0 -166upx;
				width: 90upx;
				height: 80upx;
				transform: scale(0.6);
				@include relative(0, 0, 0, -10upx);
			}
		}
	}
	.login-button {
		width: 660upx;
		text-align: center;
		margin: 0 auto;
		margin-top: 40upx;
		@include borderRadius(8upx);
		background: #ff8200;
		@include sc(35upx, #fff);
		padding: 15upx 0;
	}
	.operate {
		@include flex(space-between);
		padding: 0 40upx;
		view {
			padding: 10upx 0;
			@include sc($uni-font-size-base, #8dccf9);
		}
	}
}
</style>
