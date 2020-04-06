<script>
export default {
	// onLaunch: function() {
	// 	console.log('App Launch')
	// },
	// onShow: function() {
	// 	console.log('App Show')
	// },
	// onHide: function() {
	// 	console.log('App Hide')
	// }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import './uni.scss';
page {
	//padding: 20upx;
	/* #ifdef APP-PLUS */
margin-top: 40upx;
	/* #endif */
}
.line{
	@include wh(100%,2upx);
	background: #E6E6E6;
	margin: 15upx 0 25upx 0;
}
.centent{
		padding: 20upx;
		.trends{
			text-align: center;
			.item{
				display: inline-block;
				width: 173upx;
				box-sizing: border-box;
				text-align: center;
				border-right: 1upx solid #B1B8BF;
				image{
					@include wh(60upx,60upx);
				}
				view{
					@include sc($uni-font-size-sm,#333);
				}
			}
			.border-right{
				border-right: none;
			}
		}
		.spance{
			@include wh(100vw,20upx);
			background: #B1B8BF;
			@include relative(0,0,0,-20upx);
			margin: 10upx 0 30upx 0;
		}
		.title-header{
			@include sc($uni-font-size-sm,#939393);
			@include relative(-10upx);
			@include flex();
			image{
				@include wh(30upx,30upx);
			}
		}
		.color{
			color: #507CB0;
		}
		.title{
			@include flex(space-between);
			.title-left{
				@include flex();
				.header{
					image{
						@include wh(90upx,90upx);
						@include borderRadius(50%);
					}
				}
				.name{
					.name-title{
						@include flex();
						view:nth-of-type(1){
							font-size: $uni-font-size-base;
						}
						.crown1{
							@include weibo-crown-background-image-position(-20upx,-680upx);
						}
						.crown2{
							@include weibo-crown-background-image-position(-10px,-370px);
						}
						.crown3{
							@include weibo-crown-background-image-position(-10px,-400px);
						}
						.crown4{
							@include weibo-crown-background-image-position(-10px,-430px);
						}
						.crown5{
							@include weibo-crown-background-image-position(-10px,-460px);
						}
						.crown6{
							@include weibo-crown-background-image-position(-10px,-490px);
						}
						.crown7{
							@include weibo-crown-background-image-position(-10px,-550px);
						}
					}
					.name-time{
						@include flex();
						width: 450upx;
						@include sc($uni-font-size-sm,#939393);
						view{
							box-sizing: border-box;
							@include line-clamp(1,40upx);
						}
						view:nth-of-type(1){
							padding-right: 10upx;
						}
					}
				}
			}
			.title-right{
				@include sc($uni-font-size-sm,#939393);
				border: 1upx solid #939393;
				padding: 2upx 30upx;
				@include relative(-20upx);
			}
		}
		.image-video{
			.image{
				@include flex();
				flex-wrap: wrap;
				.image-list{
					margin:10upx 6upx;
					.describe{
						height: 0;
						@include relative(-70upx,0,0,calc(220upx - 50upx));
						/* #ifdef MP-WEIXIN */
						@include relative(-53upx,0,0,calc(220upx - 50upx));
						/* #endif */
						/* #ifdef APP-PLUS */
						@include relative(-65upx,0,0,calc(220upx - 50upx));
						/* #endif */
						z-index: 10;
						text{
							display: inline-block;
							@include sc($uni-font-size-sm,#FFF);
							font-weight: 700;
							width: 50upx;
							white-space: nowrap;
							background: #57CBEF;
						}
					}
					image{
						@include wh(220upx,220upx);
					}
				}
			}
			.video{
				margin: 15upx 0;
				.image{
					@include wh( calc(100vw - 40upx),50vw);
				}
				.title{
					background: red;
					height: 0;
					@include relative(-15upx);
					z-index: 10;
					@include flex(space-between);
					@include sc($uni-font-size-sm,#fff);
					view:nth-of-type(1),view:nth-of-type(3){
						width: 250upx;
						padding: 0 10upx;
					}
					view:nth-of-type(3){
						text-align: right;
					}
					image{
						width: 15vw;
						@include relative(-165upx);
					}
				}
			}
		}
		.operate{
			@include flex(space-between);
			height: 50upx;
			image{
				@include wh(50upx,50upx);
			}
			.operate-left{
				@include flex();
				view{
					@include flex();
					text{
						margin-right: 20upx;
							@include sc($uni-font-size-sm,#000);
					}
				}
			}
			.operate-right{
				padding-right: 10upx;
			}
		}
	}
	.red-vip{
		@include weibo-vip-background-image-position(-10px,-520px);
	}
	.blue-vip{
		@include weibo-vip-background-image-position(-10px,-40px);
	}
	.yellow-vip{
		@include weibo-vip-background-image-position(-10px,-10px);
	}
	.v-html-lg{
		font-size: $uni-font-size-lg;
	}
	.v-html-base{
		font-size: $uni-font-size-base;
	}
	.v-html-sm{
		font-size: $uni-font-size-sm;
	}
</style>
