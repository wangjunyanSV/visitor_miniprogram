<template>
	<view style="margin: 0 20px;">

		<div class="tip" v-if="isShowTip">
			审核未通过，请重新填写居民信息
			<img style="width: 20px;vertical-align: middle;" src="../../assets/close.svg"
				v-on:click="isShowTip=!isShowTip">
		</div>

		<p v-if="isShowTip" style="width: 100%; height: 1px; background-color: #d9d6d6"></p>

		<div style="margin-top: 20px">填写房屋信息</div>
		<h5 style="margin-top: 20px;font-size: 18px"></h5>

		<div v-on:click="goSelectCell" class="input_house">
			<view class="input_labe">小区</view>
			<input class="input_sty" style="text-align: left;flex: 1;margin: auto 0;" type="text" placeholder="请选择"
				disabled="true" :value="communityName">
			<view style="margin-right: 5px;">></view>
		</div>


		<div v-for="(item,index) in listData" :key="index">

			<p style="clear: both;width: 100%; height: 1px; background-color: #d9d6d6"></p>
			<div class="input_house">
				<view class="input_labe">{{item}}</view>
				<input class="input_sty" style="text-align: left;flex: 1;margin: auto 0;" type="text" placeholder="请输入"
					v-model="valueData[index]">
			</div>
		</div>

		<p style="width: 100%; height: 1px; background-color: #d9d6d6"></p>
		<div style="margin-top: 20px">填写物业登记身份信息</div>

		<div>
			<div class="view_box">
				<div><span style="color: red">*</span><span style="color: black">真实姓名&nbsp;</span></div>
				<input class="input_class" placeholder=" 请填写真实姓名" v-model="userName" required ref="userName"></input>
			</div>

			<p style="width: 100%; height: 1px; background-color: #d9d6d6"></p>
			<div class="view_box">
				<div><span style="color: black">&nbsp; 联系方式&nbsp;</span></div>
				<input class="input_class" placeholder=" 请输入手机号" v-model="mobile" required ref="mobile"
					></input>
			</div>
			<p style="width: 100%; height: 1px; background-color: #d9d6d6"></p>
			<div class="view_box">
				<div><span style="color: black">&nbsp; 身份证号&nbsp;</span></div>
				<input class="input_class" placeholder=" 请输入身份证号" v-model="idCard" required ref="idCard"></input>
			</div>

			<p style="width: 100%; height: 1px; background-color: #d9d6d6"></p>
		</div>


		<div style="margin-top: 20px;">
			<p style="font-weight: bolder;">选择身份信息</p>

			<div class="identifier_box">

				<view class="defaluteTextStyle" :class="{'tipTextStyle' :current===1}" v-on:click=" check(1)">产权人
				</view>
				<view class="defaluteTextStyle" :class="{'tipTextStyle' :current===2}" v-on:click=" check(2)">亲友
				</view>
				<view class="defaluteTextStyle" :class="{'tipTextStyle' :current===3}" v-on:click=" check(3)">租户
				</view>
			</div>





		</div>

		<div style="color: #A1A0A1;clear:both;margin-top: 20px">为了保证本社区的住户都能够安全、可靠的享受高品质服务</div>
		<div style="color: #1890FF;margin-top: 10px">
			请提供您的真实信息以供工作人员进行验证
		</div>

		<button type="primary" style="margin-top: 20px;background-color: #1890FF" v-on:click="submitDate">提交
		</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				housePropertyId: "",
				housePropertyName: "",
				communityId: "",
				communityName: "",
				mobile: "",
				identifier: "",
				userName: "",
				idCard: "",
				buildingNumber: "",
				roomNum: "",
				isShowPopup: false,
				listData: [],
				valueData: [],
				placeholderData: Math.floor(Math.random() * 10) + 1,
				isShowTip: false,
				current: 1

			}
		},
		created() {
			this.mobile = uni.getStorageSync(this.$config.mobile)
		},
		methods: {
			goSelectCell() {
				let that = this
				uni.navigateTo({
					url: '../selectCell/selectCell',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						checkCommunity: function(data) {
							console.log(data.data['communityId'])
							console.log(data.data['communityName'])
							that.communityName = data.data['communityName']
							that.communityId = data.data['communityId']
							that.communityRoomFormat()
						},
						someEvent: function(data) {
							console.log(data)
						}
					},
				});
			},
			communityRoomFormat() {
				this.$apis.communityRoomFormat({
					"communityId": this.communityId
				}).then(res => {
					console.log(res);
					this.listData = res['name'].toString().split("/")

				})

			},
			check(value) {
				console.log(value);
				this.current = value

			},
			showPopup() {

				// this.$refs.popup.open('top')
			},
			submitDate() {
				this.housePropertyName = ''


				for (let i = 0; i < this.valueData.length; i++) {
					this.housePropertyName += this.valueData[i] + this.listData[i]
				}
				console.log(this.valueData);
				console.log(this.listData);
				console.log(this.housePropertyName);


				let idcardReg =
					/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

				if (this.idCard) {
					if (!idcardReg.test(this.idCard)) {
						uni.showToast({
							title: "身份证格式错误",
							icon: "none"
						})
						return;
					}
				}

				if (this.communityId == '') {
					uni.showToast({
						title: "请选择小区",
						icon: "none"
					})
					return
				}

				if (this.userName == '') {
					uni.showToast({
						title: "请填写真实姓名",
						icon: "none"
					})
					return
				}





				let res;
				switch (this.current) {
					case 1:
						res = '产权人';
						break;
					case 2:
						res = '亲友';
						break;
					case 3:
						res = '租户';
						break;
				}

				let param = {
					"applicant": {
						"name": this.userName,
						"mobile": this.mobile,
						"idCard": this.idCard,
						"identifier": res,
						"personId": uni.getStorageSync(this.$config.personId),
						"uid": uni.getStorageSync(this.$config.uid),
						"openId": uni.getStorageSync(this.$config.wxOpenId),
						"unionId": uni.getStorageSync(this.$config.wxUnionId),
						"uniqueId": this.$config.originId + uni.getStorageSync(this.$config
							.wxOpenId),
					},
					"community": {
						"id": this.communityId,
						"name": this.communityName,
					},
					"houseProperty": {
						"name": this.housePropertyName,
					},
				};

				console.log(param);

				this.$apis.ownerHouse(param).then(res => {
					console.log(res);
					uni.showToast({
						title: '提交成功',
						success() {
							setTimeout(() => {
								uni.switchTab({
									url: '../home/home'
								})
							}, 500)

						}
					})

				})


			}

		}
	}
</script>

<style>
	.tip {
		line-height: 30px;
		text-align: center;
	}

	.input_house {
		display: flex;
		padding: 0 40px;
		line-height: 50px;
	}

	.input_labe {
		font-size: 18px;
		margin-right: 10px;
	}

	.identifier_box {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
	}


	.view_box {
		display: flex;
		line-height: 60px;
	}

	.input_class {
		margin: auto 0;
		padding-left: 10px;
	}

	.defaluteTextStyle {
		width: 30%;
		padding: 5px 0;
		text-align: center;
		border: #A1A0A1 1px solid;
		border-radius: 5px;
		/* background: url("@/assets/round_check_default.svg")no-repeat left; */
		/* background-size: 20px; */
	}

	.tipTextStyle {
		border: #1890FF 1px solid;
		color: #1890FF;
		/* background: url("@/assets/round_check_selected.svg") no-repeat left; */
		/* background-size: 20px; */
	}
</style>
