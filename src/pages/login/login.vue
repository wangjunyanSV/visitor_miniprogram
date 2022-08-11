<template>
	<view style="position: relative;">


		<h1 class="title">
			<img src="../../assets/logo_visitor.png" style="width: 30px;height: 30px;vertical-align: baseline">
			AI访易行
		</h1>

		<div style="padding: 0 10px;margin-top: 100px;">

			<div style="height: 40px;display: flex;">
				<input placeholder="请输入手机号码" type="number" maxlength="11" style="margin: auto 0;flex: 1;"
					class="login_input" v-model="mobile" ref="mobile" />
			</div>

			<p style="width: 100%; height: 1px; background-color: #d9d6d6">
			</p>

			<div style="display: flex;margin-top: 20px;height: 40px;">
				<input placeholder="请输入验证码" maxlength="6" type="number" style="margin: auto 0;flex: 1;"
					class="login_input" v-model="msgCode" ref="msgCode" />
				<button style="height: 30px;margin: auto 0;font-size: 13px;" v-on:click="sendMsg"
					:disabled="isDisabled">{{buttonName}}</button>

			</div>

			<p style="width: 100%; height: 1px; background-color: #d9d6d6">
			</p>
		</div>

		<div class="text_toast">
			<span v-if="tipShow">请阅读勾选服务协议和隐私政策</span>
		</div>
		<div class="foot">
			<radio-group @change="radioChange">
				<label class="radio">
					<radio value="radio" />
					<div style="line-height: 23px;display: flex;vertical-align: middle;">
						同意 <a href="https://iacp.truthvision.com/privacy-agreement.html"
							style="color: #1890FF">《服务条约》</a> 和
						<a href="https://iacp.truthvision.com/privacy-agreement.html" style="color: #1890FF">《隐私协议》</a>
					</div>
				</label>
			</radio-group>
		</div>

		<button type="primary" class="login_btn" @click.native="submitData">
			注册并登录
		</button>
		<div style="color: #A1A0A1;padding: 10px 20px;text-align: center">若您有多个手机号码，请使用留给物业居委的手机号码注册
		</div>

		<button type="primary" class="login_btn" style="position: fixed;bottom: 50px;left: 0;right: 0;margin:0 auto;"
			v-on:click="goBindWechat">
			我有绑定码</button>
	</view>
</template>

<script>
	import globleUser from "@/utils/globleUser";

  export default {
		data() {
			return {
				checkValue: false,
				isCheck: false,
				isDisabled: false,
				buttonName: "发送验证码",
				CountDown: 60,
				tipShow: false,
				mobile: "",
				msgCode: "",
				stepValue: 1,
				isShowPopup: false,
				verison: '',
				radio: ''
			}
		},
		methods: {
			goBindWechat() {
				uni.navigateTo({
					url: '../bindWeChat/bindWeChat'
				})
			},
			radioChange(res) {
				this.isCheck = res._processed;
				if (this.isCheck) {
					this.tipShow = false;
				}
				console.log(res.detail.value);
			},
			submitData() {
				console.log(uni.getStorageSync(this.$config.wxOpenId));
				if (this.isCheck === false) {
					this.tipShow = true;
					return;
				}
				let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
				if (!this.mobile) { //判断如果手机号为空，提示用户输入手机号
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				} else if (!reg.test(this.mobile)) { //判断手机号格式时候正确
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return
				}

				if (this.msgCode === '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}

				console.log(this.$config.wxOpenId);
				let that = this

				this.$apis.register({
					"openId": uni.getStorageSync(this.$config.wxOpenId),
					"code": this.msgCode,
					"phone": this.mobile,
					"type": "register",
				}).then(res => {

					that.$apis.getUerDetail({
						"uniqueId": that.$config.originId + uni.getStorageSync(that.$config.wxOpenId)
					}).then(res => {
						console.log(res);
            globleUser.saveUser(res)


						if (res['visitorUser']['houses'] !== undefined && res['visitorUser']['houses'] !==
							null && res['visitorUser']['houses'].length !== 0) {

							uni.switchTab({
								url: "../home/home"
							})

						} else {
							uni.redirectTo({
								url: '../ownerAuth/ownerAuth'
							})
						}

					})


				}).catch(e => {
					if (e.data['code'] === 400000003) {
						uni.showToast({
							title: '验证码已过期'
						})
						// this.$vux.toast.text('验证码已过期', 'mobile')
					}

					if (e.data['code'] === 400000001) {
						uni.showToast({
							title: '验证码错误'
						})
						// this.$vux.toast.text('验证码错误', 'mobile')
					}
				})




				console.log(this.isCheck);

			},
			sendMsg() {
				if (this.isCheck === false) {
					this.tipShow = true;
					return;
				}
				this.isDisabled = true;

				let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
				if (!this.mobile) { //判断如果手机号为空，提示用户输入手机号
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				} else if (!reg.test(this.mobile)) { //判断手机号格式时候正确
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return
				}


				this.$apis.registerAuthCode({
					"personId": uni.getStorageSync(this.$config.personId),
					"phone": this.mobile,
					"type": "register",
				}).then(res => {

					uni.showToast({
						title: '发送验证码成功',
						duration: 2000,
						icon: "none"
					});

					let timerId = setInterval(() => {
						this.CountDown--;
						this.buttonName = this.CountDown + "秒后重试";
						if (this.CountDown <= 0) {
							clearInterval(timerId);
							this.buttonName = "重新发送";
							this.CountDown = 60;
							this.isDisabled = false;
						}
					}, 1000);

				}).catch(e => {
					this.isDisabled = false;
					console.log(e['code'])
					if (e['code'] === 409000002) {
						uni.showToast({
							title: '手机号已被使用',
							icon: 'none'
						})
						// this.$vux.toast.text('手机号已被使用', 'mobile')
					} else if (e['code'] === 400000002) {
						uni.showToast({
							title: '短信发送次数受限',
							icon: 'none'
						})
					} else {

					}
				})

			}

		}
	}
</script>

<style scoped>
	.title {
		padding-top: 80px;
		color: #1890FF;
		text-align: center;
	}

	.login_input {
		margin-top: 30px;
	}

	.login_btn {
		margin-top: 10px;
		width: 90%;
		background-color: #1890FF;
	}

	/* .login_input:after {
		content: " ";
		position: absolute;
		right: 15px;
		left: 15px;
		bottom: 0;
		height: 1px;
		border-bottom: 1px solid #D9D9D9;

	} */

	.text_toast {
		height: 30px;
		margin-top: 10px;
		color: #F00000;
		text-align: center;
	}

	.foot {
		margin-top: 10px;
		text-align: center;
		overflow: hidden;
	}

	.radio {
		display: flex;
		justify-content: center;
	}
</style>
