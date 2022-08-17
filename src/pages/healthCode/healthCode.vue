<template>
	<div class="box">

		<div class="head_box">
			<div v-if="name!==''&&name!==undefined" class="name_box">
				<span v-if="nameIsShow">
					{{ name }}
				</span>
				<span v-else-if="name!==undefined">
					{{ name.substring(0, 1) }}**
				</span>
				<img v-if="nameIsShow" class="img_btn" src="../../assets/ic_show.svg" alt="" v-on:click="changeName" />
				<img v-else class="img_btn" src="../../assets/ic_hidden.svg" alt="" v-on:click="changeName" />
			</div>

			<div v-if="idCardSn!==''&&idCardSn!==undefined" class="id_num_box">
				<span v-if="idNumIsShow">
					{{ idCardSn }}
				</span>

				<span v-else>
					{{ idCardSn.replace(/(.{6}).*(.{4})/, '$1********$2') }}
				</span>
				<img v-if="idNumIsShow" class="img_btn" src="../../assets/ic_show.svg" alt=""
					v-on:click="changeIdNumShow">
				<img v-else class="img_btn" src="../../assets/ic_hidden.svg" alt="" v-on:click="changeIdNumShow">
			</div>
		</div>

		<div class="code_box">
			<div class="time_box">
				{{ time }}
				<span style="font-size: 26px">
					{{ second }}
				</span>
			</div>
			<div class="img_code">
				<canvas canvas-id="qrcode" style="width: 100%;height: 100%;margin: 0 auto;" />
			</div>


			<div :class="tipTextStyle" class="tip_text">
				<div v-if="isShowDaysTimes">
					{{ days }}<span style='font-size: 16px;color: black'>天内已外出</span>{{ times }}<span
						style='font-size: 16px;color: black'>次</span>
				</div>

				<div v-else>
					{{ tipsText }}
				</div>

			</div>


			<div v-if="leaveTime!==''&&leaveTime!==undefined" class="btm_text">上次出门时间：{{ leaveTime }}
			</div>
			<div v-if="validityTime!==''&&validityTime!==undefined" class="btm_text">
				有效期截止：{{ validityTime }}
			</div>

		</div>

		<div class="btom">


			<!--      <div class="btn_switch" v-on:click="switchHouse">-->
			<!--        <img src="../../assets/ic_switch.svg" alt="" style="width: 13px;color:#0483d7;">-->
			<!--        <br>-->
			<!--        切换-->
			<!--      </div>-->
			<div style="line-height: 40px; text-align: center">
				<span style='margin-right: 10px;color: #1890FF;' v-on:click="changHouse">切换</span>
				{{ houseName }}
			</div>

		</div>

		<div v-on:click="goTrafficRecord" class="cell" style="display: flex;position: relative;">
			<img class="cell_image" src="./../../assets/ic_pass_record.svg" />
			通行记录
			<view class="lt_style"></view>

		</div>

		<!-- <group class="group_style">
      <cell title="通行记录" link="/trafficRecord" class="cell_style">
        <img slot="icon" class="icon_style" src="../../assets/ic_pass_record.svg" />
      </cell>
    </group> -->

	</div>
</template>

<script>
	import dateFormat from '@/utils/format.js'
	import uQRCode from '@/utils/uqrcode.js'

	export default {
		data() {
			return {
				name: "",
				nameIsShow: false,
				idCardSn: "",
				idNumIsShow: false,
				time: '',
				second: '',
				qrcode: "",
				qrColor: "#57AD6C",
				leaveTime: "",
				validityTime: "",
				tipsText: "",
				tipTextStyle: 'normal',
				houseName: '',
				days: '',
				times: '',
				isShowDaysTimes: false,
				CountDown: 5,
				isDisabled: false,
				statusName: '居民信息登记审核后可获得电子通行证',
				btnStatus: 0,

			}
		},
		methods: {
			goTrafficRecord() {
				uni.navigateTo({
					url: '../healthCode/trafficRecord/trafficRecord'
				});
			},
			changeName() {
				this.nameIsShow = !this.nameIsShow
			},
			changeIdNumShow() {
				this.idNumIsShow = !this.idNumIsShow
			},
			changHouse() {
				uni.navigateTo({
					url: '../switchHouse/switchHouse'
				})
			},
			makeCode() {
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.qrcode,
					size: 240,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: this.qrColor,
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {}
				})

			},
			getPassCode() {

				this.$apis.getPassCode({
					"houseId": uni.getStorageSync(this.$config.houseId),
					"uid": uni.getStorageSync(this.$config.uid)
				}).then(r => {

					this.isShowDaysTimes = false
					//设置二维码
					this.qrcode = r['passCodePojoList'][0]["passCodePojo"]
					this.leaveTime = r['passCodePojoList'][0]['latestOutTime']
					this.validityTime = r['passCodePojoList'][0]['passCodeValidity']

					this.name = r['passCodePojoList'][0]["userPojo"]['name']
					this.idCardSn = r['passCodePojoList'][0]["userPojo"]['idCardSn']

					console.log(this.name);

					console.log(r['passCodePojoList'][0]['statuses'][0])

					switch (r['passCodePojoList'][0]['statuses'][0]) {
						case 'normal': {
							this.qrColor = '#57AD6C'
							this.tipsText = '正常'
							this.tipTextStyle = 'normal'
							this.makeCode()
							break;
						}
						case 'someOneIsOut': {
							this.tipsText = "同住人员" + r['passCodePojoList'][0]['outUser'][0]['name'] + "已出门"
							this.tipTextStyle = 'someOneIsOut'
							this.qrColor = "#F79032"
							this.makeCode()
							break;
						}
						case 'timeOut': {
							this.tipsText = "您已经超时"
							this.tipTextStyle = 'someOneIsOut'
							this.qrColor = "#F79032"
							this.makeCode()
							break;
						}
					}

					if (r['passCodePojoList'][0]['timesInLastDaysPojo'] !== undefined && r['passCodePojoList'][0][
							'timesInLastDaysPojo'
						]['status'] !== "normal") {
						this.isShowDaysTimes = true
						this.tipTextStyle = 'someOneIsOut'
						this.qrColor = "#F79032"
						this.makeCode()
						this.days = r['passCodePojoList'][0]['timesInLastDaysPojo']['days']
						this.times = r['passCodePojoList'][0]['timesInLastDaysPojo']['times']

          }
					console.log(r);
				})

			}


		},
		created() {
			console.log(uni.getStorageSync(this.$config.houseId) === '');
			if (uni.getStorageSync(this.$config.houseId) !== null && uni.getStorageSync(this.$config.houseId) !== '') {
				this.houseName = uni.getStorageSync(this.$config.communityName) + uni.getStorageSync(this.$config
					.houseName)
				this.getPassCode()
			}


			if (uni.getStorageSync(this.$config.uid) === undefined || uni.getStorageSync(this.$config.uid) === '') {
				uni.redirectTo({
					url: '../login/login'
				});
				return;
			}


			setInterval(() => {
				let newData = new Date();
				this.time = dateFormat(new Date(), "YYYY-MM-DD HH:mm:")
				this.second = dateFormat(newData, "ss")

			}, 1000);

		},
		onShow() {
			this.houseName = uni.getStorageSync(this.$config.communityName) + uni.getStorageSync(this.$config
				.houseName)
			this.getPassCode()
			uni.$emit('changeType', {
				msg: '身份切换'
			})
		}
	}
</script>

<style scoped>
	.box {
		background-color: #F6F6F6;
    height: 100vh;
	}

	.img_code {
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 240px;
		height: 240px;
		display: block;
	}

	.head_box {
		padding: 15px 20px;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
	}

	.img_btn {
		width: 30px;
		height: 30px;
		vertical-align: bottom;
	}

	.name_box {
		line-height: 30px;
	}

	.id_num_box {
		float: right;
		line-height: 30px;
	}

	.time_box {
		height: 40px;
	}


	.code_box {
		overflow: hidden;
		margin: auto;
		width: 90%;
		text-align: center;
		background-color: white;
		border-radius: 10px;
		overflow: hidden;
	}

	.tip_text {
		font-size: 26px;
		margin: 10px 0;
	}

	.btm_text {
		color: #2197EF;
		margin: 5px;
	}

	.btn_switch {
		width: 40px;
		text-align: center;
		font-size: 12px;
		color: #0483d7;
		float: left;
		margin-left: 10%;
	}

	.btom {
		padding-top: 20px;
		width: 100%;
	}

	.cell_style {
		margin: 10px;
		border-radius: 40px;
	}

	.group_style {
		margin: 0 20px;
	}

	.icon_style {
		height: 30px;
		width: 30px;
		margin-right: 10px
	}

	.btn_status_style {
		margin-top: 20px;
		width: 50%;
		background-color: #1890FF;
		color: white;
		border: white;
		margin-left: auto;
		margin-right: auto;
		padding: 5px;
		border-radius: 8px;
	}

	.cell {
		padding-left: 10px;
		margin: 20px;
		height: 60px;
		line-height: 60px;
		background-color: white;
		border-radius: 7px;
	}

	.lt_style {
		border-width: 2px 2px 0 0;
		border-color: #1890FF;
		height: 8px;
		display: inline-block;
		border-style: solid;
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, -4);
		position: absolute;
		top: 50%;
		right: 10px;
		width: 8px;
	}

	.cell_image {
		display: inline-block;
		margin-right: 10px;
		width: 20px;
		height: 20px;
		margin-top: auto;
		margin-bottom: auto;
	}

	.normal {
		color: #57AD6C;
	}

	.someOneIsOut {
		color: #F79032;
	}
</style>
