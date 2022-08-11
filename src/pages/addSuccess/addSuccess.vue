<template>
	<view>

		<div class="top_box">
			<div class="house_icon">
				<img src="../../assets/ic_house_black.svg" style="width: 40px;
		  height: 40px;" />
			</div>
			<uni-title class="title">审核提交成功</uni-title>
			<div> {{communityName}} {{houseName}}</div>
		</div>

		<div class="complete_time_tip" style="vertical-align: baseline">
			<div style="color: #1890FF;">
				<img src="../../assets/ic_clock.svg" alt="" style="width: 20px;height: 20px;vertical-align: baseline" />
				预计完成时间
			</div>
			<div>{{ plannedTime }}</div>
		</div>


		<div style="margin-left: 20px;margin-right: 20px;margin-top: 20px;overflow: hidden">

			<div>
				<div style="clear: both;width:20px;float: left;margin-right: 5px">
					<div
						style="width: 20px;height: 20px;border-radius: 20px; border: #0483d7 1px solid;float: right;" />

					<div
						style="width: 18px;height: 18px;background-color: #0483d7;border-radius: 18px;margin-top: 2px;margin-bottom: 4px" />

					<div style="height: 60px;width: 2px;background-color: #0483d7;margin: auto" />

				</div>
				<div>审核提交</div>
				<div>{{ createTime }}</div>

			</div>

			<div style="clear: both;padding-top: 2px;">
				<div style="width:20px;float: left;margin-right: 5px">
					<div
						style="width: 20px;height: 20px;border-radius: 20px; border: #a8a8a8 1px solid;float: right;" />
					<div
						style="width: 18px;height: 18px;background-color: #a8a8a8;border-radius: 18px;margin-top: 2px;margin-bottom: 4px" />
					<div style="height: 60px;width: 2px;background-color: #a8a8a8;margin: auto" />
				</div>

				<div>预计24小时内审核完成</div>
				<div>请保持您的联系电话畅通</div>

			</div>
			<div style="clear: both;padding-top: 2px">
				<div style="width:20px;float: left;margin-right: 5px">
					<div style="width: 20px;height: 20px;border-radius: 20px; border: #a8a8a8 1px solid;float: right;">

					</div>

					<div
						style="width: 18px;height: 18px;background-color: #a8a8a8;border-radius: 18px;margin-top: 2px;margin-bottom: 4px">
					</div>
				</div>
				<div>审核结果</div>

			</div>


		</div>

		<button class="btn_cancel" v-on:click="btnCancel">撤销申请</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobId: '',
				plannedTime: '',
				communityName: '',
				houseName: '',
				createTime: '',
			}
		},
		methods: {
			btnCancel() {
				this.$apis.reviewEvent({
					"jobId": this.jobId,
					"action": "applicantCancel"
				}).then(res => {
					uni.navigateBack({

					})
				})

			}

		},
		created() {


		},
		onLoad(option) {
			this.jobId = option.jobId
			this.$apis.userIdentifier({
				"jobId": this.jobId,
				'uid': uni.getStorageSync(this.$config.uid)
			}).then(res => {
				this.createTime = res['job']['createTime']
				this.houseName = res['job']['houseProperty']['name']
				this.communityName = res['job']['community']['name']
				let datetime = new Date(res['job']['createTime']);
				datetime.setHours(datetime.getHours() + 2)

				this.plannedTime = datetime

			})

			console.log(option.jobId);

		}
	}
</script>

<style scoped>
	top_box {
		overflow: hidden;
		margin-top: 40px;
		margin-left: 30px;
	}

	.title {
		line-height: 1;
	}

	.house_icon {
		float: left;
		width: 40px;
		height: 40px;
		margin-right: 20px;
		margin-top: auto;
		margin-bottom: auto;
	}

	.complete_time_tip {
		padding: 20px;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 20px;
		border-radius: 10px;
		background-color: #F3F5F5;
	}


	.btn_cancel {
		clear: both;
		background-color: white !important;
		color: #2197EF;
		width: 80%;
		margin: 20px auto 0 auto;
		border: #2197EF 1px solid;
	}

	.btm_box {
		width: 80%;
		margin: 20px auto;
	}
</style>
