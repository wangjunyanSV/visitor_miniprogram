<template>
	<view>
		<h1 class="title">绑定微信</h1>
		<h5 class="sub_title">无授权码请联系管理员开通授权码</h5>
		<input class="input_code" type="text" placeholder="请输入授权码" v-model="input_code" />
		<button type="primary" class="login" v-on:click="bindCode">绑定</Button>
		<div class="privacy_agreement">
			<span>登录即表示同意</span>
			<a style="color: #1890FF;"
				href="https://truthvison-iacp.obs.cn-east-3.myhuaweicloud.com/privacy/app/shentu/privacy-agreement.html">《用户隐私服务协议》</a>
		</div>

		<button type="primary" class="login_btn" style="position: fixed;bottom: 50px;left: 0;right: 0;margin:0 auto;"
			v-on:click="goLogin">
			无绑定码，去登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				input_code: ''
			}
		},
		methods: {
			goLogin() {

				uni.navigateTo({
					url: '../login/login'
				})
			},
			bindCode() {

				let that = this
				console.log(this.input_code);
				this.$apis.putBindWx({
					"code": this.input_code,
					"unionId": uni.getStorageSync(this.$config.wxUnionId),
				}).then(res => {
					console.log(res);

					that.$apis.getUerDetail({
						"uniqueId": that.$config.originId + uni.getStorageSync(that.$config
							.wxOpenId)
					}).then(res => {
						console.log(res);
						uni.setStorage({
							key: that.$config.uid,
							data: res['visitorUser']['vuid']
						})

						uni.setStorage({
							key: that.$config.nikeName,
							data: res['visitorUser']['nickname']
						})

						uni.setStorage({
							key: that.$config.mobile,
							data: res['visitorUser']['mobile']
						})

						uni.setStorage({
							key: that.$config.personId,
							data: res['visitorUser']['personId']
						})

						if (res['visitorUser']['proprietor'] !== undefined && res['visitorUser'][
								'proprietor'
							] !==
							null) {
							uni.setStorage({
								key: that.$config.companyId,
								data: res['visitorUser']['proprietor']['id']
							})

							uni.setStorage({
								key: that.$config.companyName,
								data: res['visitorUser']['proprietor']['name']
							})

						}


						uni.showToast({
							title: '绑定成功',
							success() {
								setTimeout(() => {
									uni.switchTab({
										url: '../home/home'
									})
								}, 1000)
							}
						})

					});


				}).catch(err => {
					uni.showToast({
						title: '绑定码不存在',
						icon: "none"
					})
					console.log(err);
				})
			}

		}
	}
</script>

<style scoped>
	.title {
		font-size: 28px;
		margin-left: 30px;
		margin-top: 20px;


	}

	.sub_title {
		margin-left: 30px;
		color: #404040;
	}

	.input_code {
		width: 80%;
		margin-top: 50px;
		margin-left: auto;
		margin-right: auto;
	}

	.login {
		font-size: 18px;
		background-color: #1890FF;
		color: white;
		border: white;
		margin-top: 60px;
		margin-left: auto;
		margin-right: auto;
		width: 90%;
		height: 40px;
		display: block;
	}

	.bind_code {

		margin-top: 10px;
		width: 35%;
		right: 0;
		margin-right: 20px;
		background-color: #1890FF;
	}

	.privacy_agreement {
		display: flex;
		margin-top: 70px;
		text-align: center;
		justify-content: center;
		/* align-items: center; */
	}

	.login_btn {
		margin-top: 10px;
		width: 90%;
		background-color: #1890FF;
	}
</style>
