<template>
	<view class="login">
		<view @click="$common.navigateBack()" class="close"><image src="/static/index/close.svg" mode="widthFix"></image></view>
		<view class="title">登录注册更精彩</view>
		<view class="small-title">
			<text>登录注册表示同意</text>
			<text @click="$common.navigateTo('../agreement/agreement')">用户协议、 隐私条款</text>
		</view>
		<view class="login-input">
			<view>+86</view>
			<view><image src="/static/index/pull-down.svg" mode="widthFix"></image></view>
			<view><input type="text" v-model="inputVal" placeholder="输入手机号" /></view>
			<view><image @click="empty" class="close" src="/static/index/close.svg" mode="widthFix"></image></view>
		</view>
		<view v-if="error" class="error">手机号码格式错误，请重新输入</view>
		<view v-if="disibled" class="login-button">获取验证码</view>
		<view @click="getCode()" v-if="!disibled" class="login-button no-disabled">获取验证码</view>
		<view @click="$common.navigateTo('../user-login/user-login')" class="user-login">用帐号密码登录</view>
	</view>
</template>

<script>
import { buziAPI } from '@/api';
export default {
	data() {
		return {
			inputVal: '',
			disibled: true,
			error: false
		};
	},
	watch: {
		inputVal(n, o) {
			if (n) {
				this.disibled = false;
			} else {
				this.disibled = true;
			}
		}
	},
	methods: {
		getCode() {
			let that = this;
			if (!/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.inputVal)) {
				that.error = true;
				return;
			}
			buziAPI.getSms(
				{
					phone: that.inputVal,
					backURL: 'https%3A%2F%2Fm.weibo.cn%2F',
					st: '6f5679',
					_spr: 'screen:375x667'
				},
				res => {}
			);
		},
		empty() {
			this.error = false;
			this.inputVal = '';
		}
	}
};
</script>

<style lang="scss">
@import '../../uni.scss';
.login {
	padding: 20upx;
	.close {
		height: 60upx;
	}
	.title {
		font-size: 60upx;
		padding: 20upx;
	}
	.small-title {
		padding-left: 20upx;
		@include sc($uni-font-size-base, #636363);
		text:nth-of-type(2) {
			color: #8dccf9;
			margin-left: 10upx;
		}
	}
	.login-input {
		margin: 130upx 20upx 0upx 20upx;
		@include flex();
		view:nth-of-type(2) {
			@include relative(10upx);
		}
		input {
			font-size: 40upx;
		}
		.close {
			@include wh(30upx, 30upx);
			@include relative(10upx, 0, 0, 10upx);
		}
	}
	.error {
		@include sc($uni-font-size-base, red);
		margin: 10upx 0 0 20upx;
	}
	.login-button {
		width: 660upx;
		text-align: center;
		margin: 0 auto;
		margin-top: 100upx;
		@include borderRadius(50upx);
		background: #8dccf9;
		@include sc(35upx, #fff);
		padding: 15upx 0;
	}
	.no-disabled {
		background: #1b9af4;
	}
	.user-login {
		padding: 10upx 20upx;
		@include sc($uni-font-size-base, #8dccf9);
	}
	image {
		@include wh(60upx, 60upx);
		height: 60upx !important;
	}
}
</style>
