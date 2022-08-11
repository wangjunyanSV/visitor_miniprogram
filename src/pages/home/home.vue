<template>
	<view>
		<view class="banner">
			<div>
				<div
					style="display: flex;margin-top: 30px;margin-left: 30px;color: #1890FF;line-height: 30px;font-size: 21px;font-weight: 700;">
					<img style="height: 30px;width: 30px;margin-right: 10px;" src="../../assets/logo_visitor.png">
					AI访易行
				</div>
				<div style="display: flex;margin-top: 10px;margin-left: 30px;color: #1890FF;line-height: 20px;">
					<img style="height: 20px;width: 20px;margin-right: 10px;"
						src="../../assets/round_check_selected.svg">
					安全
				</div>
				<div style="display: flex;margin-top: 10px;margin-left: 30px;color: #1890FF;line-height: 20px;">
					<img style="height: 20px;width: 20px;margin-right: 10px;"
						src="../../assets/round_check_selected.svg">
					高效
				</div>

			</div>

			<img style="height:179px;right: 20px;position: absolute;" src="../../assets/banner.png" />
		</view>

		<view style="margin: 15px;">
			我是访客
		</view>

		<view style="justify-content: space-between;display: flex;margin: 0 15px;">
			<view class="item" v-on:click="scanCode">
				<img class="item_image" src="../../assets/ic_scan.png" />
				<view>
					扫码登记
				</view>
			</view>
			<view class="item" v-on:click="visitorReocrd">
				<img class="item_image" src="../../assets/visitor_record.png" alt="" />
				<view>
					拜访记录
				</view>
			</view>
			<view class="item" v-on:click="codeView">
				<img class="item_image" src="../../assets/visitor_code.png" />
				<view>
					访客证
				</view>
			</view>
		</view>

		<view style="margin: 15px;">
			我是居民/员工
		</view>

		<view style="justify-content: space-between;display: flex;margin: 0 15px;">
			<view class="item" v-on:click="visitorInvitation">
				<img class="item_image" src="../../assets/visitor_invite.png" />
				<view>
					访客邀约
				</view>
			</view>
			<view class="item" v-on:click="accessRecord">
				<img class="item_image" src="../../assets/visitor_record.png" alt="" />
				<view>
					来访记录
				</view>
			</view>
			<view class="item" v-on:click="healthCode">
				<img class="item_image" src="../../assets/access_control.png" alt="" />
				<view>
					门禁通行
				</view>
			</view>
		</view>

		<view style="justify-content: space-between;display: flex;margin: 15px;">
			<view class="item" v-on:click="ownerAuth">
				<img class="item_image" src="../../assets/resident_certification.png" alt="" />
				<view>
					居民认证
				</view>

			</view>
			<view class="item" v-on:click="bindCode">

				<img class="item_image" src="../../assets/employee_certification.png" alt="" />
				<view>
					员工绑定码
				</view>
			</view>
			<view class="item" v-on:click="visitApproval">
				<img class="item_image" src="../../assets/visit_approval.png" alt="" />
				<view>
					来访审批
				</view>

			</view>
		</view>


		<uni-popup ref="popup" type="center">
			<div style="padding: 15px;background-color: white;border-radius: 7px;">
				<button
					style="background-color: #FEA356;color: white;font-size: 18px;margin-bottom: 5px;">开始新的房产认证</button>
				<div>查看审核进度</div>


				<button style=" line-height: 30px;margin: 5px 0;background-color: #1890FF;color: white;"
					v-for="(item,index) in waitingForReviewList" :key="index"
					v-on:click="btnClick(item.jobId)">{{item.community.name}}{{item.houseProperty.name}}</button>
			</div>

		</uni-popup>

	</view>
</template>



<script>
	import {
		login
	} from '../../common/API.js'



	export default {
		data() {
			return {
				waitingForReviewList: []

			}
		},
		methods: {
			scanCode() {
				console.log('111');
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						try {
							let areaId = JSON.parse(res.result)["areaId"]
							console.log('条码内容：areaId = ' + areaId);

							uni.navigateTo({
								url: '../siteRegistrationFrom/siteRegistrationFrom?areaId=' +
									areaId
							});
						} catch (e) {
							uni.showToast({
								title: '二维码不正确',
								icon: 'none'
							})
						}
					}
				});

			},
			visitorReocrd() {
				uni.navigateTo({
					url: '../visitorRecord/visitorRecord'
				});
			},
			codeView() {
				uni.navigateTo({
					url: '../codeView/codeView'
				});
			},
			visitorInvitation() {
				console.log(this.checkLogin());
				if (this.checkLogin()) {


					let that = this

					console.log(uni.getStorageSync(this.$config.houseId));
					console.log(uni.getStorageSync(this.$config.houseId) === '');
					console.log(uni.getStorageSync(this.$config.companyId));
					console.log(uni.getStorageSync(this.$config.companyId) === '');



					if ((uni.getStorageSync(this.$config.houseId) === '' && uni.getStorageSync(this.$config
								.companyId) ===
							'') && (uni.getStorageSync(this.$config.uid) !== undefined && uni.getStorageSync(this
							.$config
							.uid) !== '')) {

						this.$apis.userIdentifier({
							'uid': uni.getStorageSync(this.$config.uid),
						}).then(res => {
							console.log(res);

							if (res['jobList'].length === 0) {
								uni.navigateTo({
									url: '../ownerAuth/ownerAuth'
								})
							} else {
								let waitingForReviews = []

								res['jobList'].forEach(res => {
									waitingForReviews.push(res)
								})

								if (waitingForReviews.length !== 0) {
									that.$refs.popup.open()
									that.waitingForReviewList = waitingForReviews
								}

							}
						})
					} else {
						uni.switchTab({
							url: '../visitorInvitation/visitorInvitation'
						});
					}
				}

			},
			accessRecord() {
				if (this.checkLogin()) {
					uni.navigateTo({
						url: '../accessRecord/accessRecord'
					});
				}
			},
			healthCode() {
				if (this.checkLogin()) {
					uni.switchTab({
						url: '../healthCode/healthCode'
					});
				}
			},
			ownerAuth() {
				if (this.checkLogin()) {
					uni.navigateTo({
						url: '../ownerAuth/ownerAuth'
					});
				}
			},
			bindCode() {

				if (uni.getStorageSync(this.$config.companyId) !== undefined && uni.getStorageSync(this.$config
						.companyId) ===
					'') {
					uni.navigateTo({
						url: '../bindWeChat/bindWeChat'
					});
				} else {
					uni.showToast({
						title: '您已绑定，请联系公司解绑！',
						icon: 'none'
					})
				}

			},
			visitApproval() {
				if (this.checkLogin()) {
					uni.navigateTo({
						url: '../visitApproval/visitApproval'
					});
				}

			},
			getUerDetail() {

				let openId = this.$config.originId + uni.getStorageSync(this.$config.wxOpenId)
				this.$apis.getUerDetail({
					"uniqueId": openId
				}).then(res => {

					uni.setStorage({
						key: this.$config.uid,
						data: res['visitorUser']['vuid']
					})

					uni.setStorage({
						key: this.$config.nikeName,
						data: res['visitorUser']['name']
					})

					uni.setStorage({
						key: this.$config.mobile,
						data: res['visitorUser']['mobile']
					})

					uni.setStorage({
						key: this.$config.personId,
						data: res['visitorUser']['personId']
					})

					if (res['visitorUser']['proprietor'] !== undefined && res['visitorUser'][
							'proprietor'
						] !==
						null) {
						uni.setStorage({
							key: this.$config.companyId,
							data: res['visitorUser']['proprietor']['id']
						})

						uni.setStorage({
							key: this.$config.companyName,
							data: res['visitorUser']['proprietor']['name']
						})

					}

					if (res['visitorUser']['houses'] !== undefined && res['visitorUser']['houses'] !==
						null && res['visitorUser']['houses'].length !== 0) {
						uni.setStorage({
							key: this.$config.houseId,
							data: res['visitorUser']['houses'][0]['houseId']
						})

						uni.setStorage({
							key: this.$config.houseName,
							data: res['visitorUser']['houses'][0]['houseName']
						})

						uni.setStorage({
							key: this.$config.communityId,
							data: res['visitorUser']['houses'][0]['communityId']
						})

						uni.setStorage({
							key: this.$config.communityName,
							data: res['visitorUser']['houses'][0]['communityName']
						})

						uni.setStorage({
							key: this.$config.houses,
							data: res['visitorUser']['houses']
						})

					}


					console.log(res);
				})
			},
			checkLogin() {

				if (uni.getStorageSync(this.$config.uid) === undefined || uni.getStorageSync(this.$config.uid) ===
					'') {
					uni.redirectTo({
						url: '../login/login'
					});
					return false
				}
				return true
			},
			checkUserIdentifier() {
				this.$apis.userIdentifier({
					'uid': uni.getStorageSync(this.$config.uid),
					"statuses": "WaitingForReview"
				}).then(res => {
					this.waitingForReviewList = res['jobList']
					console.log(res);
				})

			},

			btnClick(res) {
				this.$refs.popup.close()
				uni.navigateTo({
					url: '../addSuccess/addSuccess?jobId=' + res
				})

				console.log(res);

			},
			h5Init() {
				let that = this
				uni.setStorage({
					key: this.$config.wxOpenId,
					data: 'o9fPZ5Xu-YgUHAJ4afZjclyEblI8',
					success() {
						that.getUerDetail()
					}
				})

				uni.setStorage({
					key: this.$config.wxUnionId,
					data: 'o8cSF5vT-Q2FR1w85vd1IMhmYWQs',
				})

				uni.setStorage({
					key: this.$config.accessToken,
					data: 'eyJhbGciOiJIbWFjU0hBMjU2IiwidHlwIjoiVFYifQ.eyJ1aWQiOiI2MDI3MTc4OC0wMDIxLTAwMDItMDAwNS0wMDAwMDAwMDAwMDEiLCJuYW1lIjoi5b6u5L-h5LiT55So6LSm5Y-3IiwibmJmIjoiMjAyMi0wNy0wOCAxNDoxNzowNi4zODkiLCJpYXQiOiIyMDIyLTA3LTA4IDE0OjE3OjA2LjM4OSJ9.nsfyD6LL0Rr2XoMRcZ8W3oUaEwUuDy2g-J77oBoScqs',
				})

				uni.setStorage({
					key: this.$config.personId,
					data: '1000494',
				})
				uni.setStorage({
					key: this.$config.uid,
					data: '8aa0c47e-3ce2-4770-b45e-bea5c9afceee',
				})

			}


		},
		created() {
			this.checkUserIdentifier()
			let that = this;
			console.log(this.$config.accessToken);
			console.log(uni.getStorageSync(this.$config.accessToken));
			if (uni.getStorageSync(this.$config.accessToken) === undefined || uni.getStorageSync(this.$config
					.accessToken) === '') {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						that.$apis.login(loginRes.code).then(res => {
							console.log(res);

							uni.setStorage({
								key: that.$config.wxOpenId,
								data: res['wxOpenId'],
								success() {
									that.getUerDetail()
								}
							})

							uni.setStorage({
								key: that.$config.wxUnionId,
								data: res['wxUnionId'],
							})

							uni.setStorage({
								key: that.$config.accessToken,
								data: res['platformAccessToken'],
							})

							uni.setStorage({
								key: that.$config.personId,
								data: res['personId'],
							})
							uni.setStorage({
								key: that.$config.uid,
								data: res['uid'],
							})


						})

						console.log(loginRes);

					}
				});
			} else {
				this.getUerDetail()
			}

		},
		onShow() {

			if (uni.getStorageSync(this.$config.accessToken) !== undefined && uni.getStorageSync(this.$config
					.accessToken) !== '') {
				this.getUerDetail()
			}

			uni.$emit('changeType', {
				msg: '身份切换'
			})
		}
	}
</script>

<style>
	.banner {
		/* background: blueviolet; */
		height: 170px;
		display: flex;
	}

	.item {
		width: 30%;
		height: 110px;
		display: inline-block;
		text-align: center;
	}

	.item_image {
		width: 60px;
		height: 60px;
	}
</style>
