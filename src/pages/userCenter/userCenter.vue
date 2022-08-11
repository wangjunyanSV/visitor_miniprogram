<template>
	<div class="box">
		<div>
			<div class="head_icon">
				<img src="../../assets/myperson1.svg" style="width: 50px;height: 50px;display: inline-block;" alt="" />
			</div>
			<div class="name"><strong>{{ nickname }}</strong></div>
			<div class="phone">{{ mobile }}</div>
		</div>

		<div class="room_info">
			<!--未认证房屋-->
			<div v-if="homeStatus===1" v-on:click="goOwnerAuth"
				style="color: white;line-height: 100px;padding-left: 40px;font-size: 19px">
				<strong>居民认证</strong>
			</div>

			<!--      认证中-->
			<div v-else-if="homeStatus===2" v-on:click="goAddSuccess"
				style="color: white;line-height: 100px;padding-left: 40px;font-size: 19px">
				<strong>认证中ing</strong>
			</div>

			<!--已认证房屋-->
			<div v-else-if="homeStatus===3" style="position: relative">
				<span style="position: absolute;top: 20px;left: 20px;color: white"> 住址 </span>
				<span style="position: absolute;left: 20px;top: 50px;color: white"> {{ houseName }}</span>
				<div v-if="isShowChoose"
					style="border-radius: 50px;font-size: 13px;line-height: 2;position: absolute;right: 30px;top: 20px;color: white"
					v-on:click="goSwitchHouse">
					切换
				</div>
			</div>
		</div>



		<div v-on:click="goTrafficRecord" class="cell" style="display: flex;position: relative;">
			<img class="cell_image" src="./../../assets/ic_pass_record.svg" />
			通行记录
			<view class="lt_style"></view>

		</div>

		<div v-on:click="goAccessRecord" class="cell" style="display: flex;position: relative;">
			<img class="cell_image" src="./../../assets/fasfa-user-plus.svg">
			来访记录
			<view class="lt_style"></view>

		</div>

		<div v-on:click="goVisitorRecord" class="cell" style="display: flex;position: relative;">
			<img class="cell_image" src="./../../assets/fasfa-user-plus.svg">
			拜访记录
			<view class="lt_style"></view>
		</div>




	</div>
</template>

<script>
	export default {
		data() {
			return {
				visitorUser: '',
				homeStatus: 1,
				homeName: '',
				nickname: '',
				mobile: '',
				houseName: '',
				jobId: '',
				isShowChoose: false,

			}
		},
		methods: {
			goOwnerAuth() {
				if (this.checkLogin()) {
					uni.navigateTo({
						url: '../ownerAuth/ownerAuth'
					})
				}
			},
			goTrafficRecord() {
				if (this.checkLogin()) {
					uni.navigateTo({
						url: '../healthCode/trafficRecord/trafficRecord'
					});
				}
			},
			goVisitorRecord() {
				if (this.checkLogin()) {
					uni.navigateTo({
						url: '../visitorRecord/visitorRecord'
					});
				}
			},

			goAccessRecord() {
				if (this.checkLogin()) {
					uni.navigateTo({
						url: '../accessRecord/accessRecord'
					});
				}
			},
			goSwitchHouse() {
				if (this.checkLogin()) {
					uni.navigateTo({
						url: '../switchHouse/switchHouse'
					})
				}
			},
			checkLogin() {
				console.log(uni.getStorageSync(this.$config.uid));
				if (uni.getStorageSync(this.$config.uid) === undefined || uni.getStorageSync(this.$config.uid) === '') {
					uni.redirectTo({
						url: '../login/login'
					});
					return false
				}
				return true
			},

		},
		created() {

			this.mobile = uni.getStorageSync(this.$config.mobile)
			this.nickname = uni.getStorageSync(this.$config.nikeName)
			if (uni.getStorageSync(this.$config.communityName) !== '' && uni.getStorageSync(this.$config.communityName) !==
				undefined) {
				this.houseName = uni.getStorageSync(this.$config.communityName) + uni.getStorageSync(this.$config
					.houseName)
				this.homeStatus = 3
			}
			console.log(uni.getStorageSync(this.$config.houses).length);
			if (uni.getStorageSync(this.$config.houses).length > 1) {
				this.isShowChoose = true
			}

		},
		onShow() {

			if (uni.getStorageSync(this.$config.communityName) !== '' && uni.getStorageSync(this.$config.communityName) !==
				undefined) {
				this.houseName = uni.getStorageSync(this.$config.communityName) + uni.getStorageSync(this.$config
					.houseName)
				this.homeStatus = 3
			}

			console.log('usercenter');
			uni.$emit('changeType', {
				msg: '身份切换'
			})
		}
	}
</script>

<style scoped>
	.box {
		padding: 0 10px;
		background-color: white;
		height: 100vh;
	}

	.head {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.head_icon {
		width: 50px;
		height: 50px;
		border-radius: 50px;
		display: inline-block;
	}

	.name {
		margin-top: 5px;
		margin-left: 5px;
		position: absolute;
		display: inline-block;
	}

	.phone {
		margin-top: 25px;
		margin-left: 5px;
		position: absolute;
		display: inline-block;
	}

	.room_info {
		margin-top: 10px;
		width: 100%;
		height: 100px;
		background-color: #1890FF;
		border-radius: 40px 40px 0 0;
	}

	.cell {
		padding-left: 10px;
		margin-top: 20px;
		height: 60px;
		line-height: 60px;
		background-color: #F3F5F5;
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
</style>
