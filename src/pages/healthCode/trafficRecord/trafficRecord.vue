<template>
	<view>

		<div class="top_box">
			<div v-if="houseName!==''" style="line-height: 40px;text-align: center">
				{{ houseName }}
			</div>
		</div>

		<div v-for="(i,index) in passCodeRecordList" :key="index">

			<div
				style="width: 90%;margin-top: 10px;background-color: white;margin-right: auto;margin-left: auto;overflow: hidden;border-radius: 5px">

				<div style="margin: 10px;clear: both;overflow: hidden">
					<img src="../../../assets/person_707070.svg"
						style="width: 20px;float: left;margin-right: 10px;height: 20px;" alt="">
					<div style="float: left">
						{{ i['name'] }}
					</div>
				</div>

				<div v-if="i['outTime']!==undefined" style="clear: both;margin: 10px;overflow: hidden">
					<img src="../../../assets/data_707070.svg"
						style="width: 20px;float: left;margin-right: 10px;height: 20px;" alt="">
					<div style="float: left">
						{{ i['outTime'] }}
					</div>
					<div style="float: right;background-color: #E4F1E7;color: #57AD6C;padding: 5px;border-radius: 5px">
						外出
					</div>
				</div>

				<div v-if="i['inTime']!==undefined" style="clear: both;margin: 10px;overflow: hidden">
					<img src="../../../assets/data_707070.svg"
						style="width: 20px;height: 20px;float: left;margin-right: 10px" alt="">
					<div style="float: left">
						{{ i['inTime'] }}
					</div>
					<div style="float: right;background-color: #E4F1E7;color: #57AD6C;padding: 5px;border-radius: 5px">
						返回
					</div>
				</div>
			</div>

		</div>

		<div v-if="passCodeRecordList.length===0">
			<div style="text-align: center">
				<img style="width: 60%;margin: auto" src="../../../assets/empty_data.png" alt="">

			</div>
			<div style="text-align: center;color: #A1A0A1;font-size: 18px">暂无记录</div>
		</div>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />

	</view>
</template>

<script>
	import {
		Config
	} from "@/common/Config.js";

	export default {
		data() {
			return {
				houseName: '',
				passCodeRecordList: [],
				pageNum: 0,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				reload: false,
			}
		},
		methods: {

			getDataList() {
				if (this.passCodeRecordList.length !== 0) {
					this.status = 'loading'
				}
				this.$apis.getPassCodeRecord({
					"uid": uni.getStorageSync(this.$config.uid),
					"page": this.pageNum,
					"pageSize": 10,
					"houseId": uni.getStorageSync(this.$config.houseId),
          "statusList":"normal"
				}).then(res => {
					this.passCodeRecordList = this.reload ? res['recordList'] : this.passCodeRecordList.concat(
						res[
							'recordList']);
					this.reload = false;
					if (res['recordList'].length < 10) {
						this.status = 'noMore'
					}
					console.log(res);
				}).catch(err => {

					this.status = 'noMore'
					console.log(err);
				})
			},
		},
		created() {
			this.getDataList()

		},
		onPullDownRefresh() {
			this.reload = true;
			this.pageNum = 0;
			this.getDataList()
		},
		onReachBottom() {
			this.pageNum++
			this.status = 'more';
			this.getDataList();
		},



	}
</script>

<style>



</style>
