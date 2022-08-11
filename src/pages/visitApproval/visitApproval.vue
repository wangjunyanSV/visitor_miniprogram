<template>
	<view>
		<view class="segment" v-if="isShouSwitchItems">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
		</view>

		<div v-if="current===0" style="text-align: center;font-size: 18px;line-height: 30px;vertical-align: middle;">
			{{houseName}} <span style="color: #3257D3;font-size: 15px;margin-left: 10px;"
				v-on:click="changHouse">切换</span>
		</div>


		<div v-for="(item,index) in papersList" :key="index">
			<div class="item_title">
				<div style="width: 3px;background-color: #4587F8;margin-left: 10px;margin-right: 10px;"></div>
				{{item.leader.name}}
				<div
					style="background-color: #DAE2FF;border-radius: 18px;font-size: 11px;padding:0 5px;color: #3257D3;margin: 0 5px;min-width: 30px;text-align: center;">
					访友</div>
				<div
					style="background-color: #D0F3FB;border-radius: 18px;font-size: 11px;padding:0 5px;color: #3257D3;min-width: 30px;text-align: center;">
					1人</div>

				<div style="position: absolute;right: 10px;color: #9E9E9E;">
					待审核
				</div>
			</div>
			<p style="width: 100%; height: 1px; background-color: #d9d6d6;margin-top: 10px;"></p>

			<div style="display: flex;margin-top: 20px;">
				<div style="width: 70%;color: #9E9E9E;font-size: 12px;padding-left: 20px;">
					<div style="color: #D52D2D">
						来访时间：{{item.beginTime}}
					</div>
					<div>
						被访人：{{item.interviewee.name}}
					</div>

					<div v-if="current===0">
						被访人房号：{{item.community.name||''}} {{item.house.name||''}}
					</div>

					<div v-if="current===1">
						被访人公司：{{item.property.name||''}}
					</div>

					<div>
						被访人手机：{{item.interviewee.mobile}}
					</div>
				</div>
				<div style="flex: 1;justify-content: center;text-align: center;">
					<div v-on:click="callPhone(item.leader.mobile)">
						<img src="../../assets/ic_call.svg" alt="" style="width: 40px;height: 40px;margin: auto;">
					</div>
					<div style="color: #4671F8;border: #4671F8 1px solid;margin: 0 15px;border-radius: 8px;"
						v-on:click="goDetail(item.jobId)">更多...</div>

				</div>



			</div>

			<div style="display: flex;justify-content: space-between;margin:  15px 40px; 0px 40px">
				<div v-on:click="accept(item.jobId)"
					style="width: 40%;text-align: center;background-color: #43C588;padding: 5px 0;border-radius: 15px;color: white;">
					通过</div>
				<div v-on:click="reject(item.jobId)"
					style="width: 40%;text-align: center;background-color: #E55B5E;padding: 5px 0;border-radius: 15px;color: white;">
					驳回</div>

			</div>

		</div>

		<uni-popup ref="inputDialog" type="dialog" :mask-click="false">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入内容" placeholder="请输入拒绝理由"
				@confirm="dialogInputConfirm">
			</uni-popup-dialog>
		</uni-popup>

		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				papersList: [],
				current: 0,
				items: ['居民小区', '商业园区'],
				houseName: '',
				pageNum: 0,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				reload: false,
				jobId: '',
				isShouSwitchItems: false

			}
		},
		methods: {
			callPhone(phoneNum) {
				uni.makePhoneCall({
					phoneNumber: phoneNum
				})
			},
			accept(res) {
				let that = this
				console.log(res);
				this.$apis.postJobEvent({
					"jobId": res,
					"action": "acceptVisit",
					"handler": {
						"name": uni.getStorageSync(this.$config.nikeName),
						"type": "visitor-user"
					},

				}).then(res => {
					uni.showToast({
						title: '已通过',
						success() {
							that.reload = true
							that.getDataList()
						}
					})

				})
			},
			reject(res) {
				this.jobId = res
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(val) {

				let that = this
				if (val === '') {
					uni.showToast({
						title: "请输入驳回理由",
						icon: 'none'
					})
					return
				}


				this.$apis.postJobEvent({
					"jobId": this.jobId,
					"action": "rejectVisit",
					"handler": {
						"name": uni.getStorageSync(this.$config.nikeName),
						"type": "visitor-user"
					},
					"content": val
				}).then(res => {

					uni.showToast({
						title: '已拒绝',
						success() {
							that.reload = true
							that.getDataList()
						}
					})

				})
				console.log(val);
			},
			onClickItem(res) {
				this.papersList = []
				this.current = res.currentIndex;
				this.getDataList()
				console.log(res.currentIndex);
			},
			goDetail(data) {
				console.log(data);
				uni.navigateTo({
					url: './approvalDetail/approvalDetail?jobId=' + data,
				})
			},
			changHouse() {
				uni.navigateTo({
					url: '../switchHouse/switchHouse'
				})
			},
			getDataList() {

				uni.showLoading({
					title: '正在加载',
					mask: true
				})
				if (this.papersList.length !== 0) {
					this.status = 'loading'
				}

				this.$apis.getAccessRecoed({
					"pageSize": 10,
					"page": this.pageNum,
					"visitorIds": uni.getStorageSync(this.$config.personId),
					"statuses": "waitingForProprietorToReview",
					"proprietorIds": this.current === 1 ? uni.getStorageSync(this.$config.companyId) : "",
					"houseId": this.current === 0 ? uni.getStorageSync(this.$config.houseId) : "",

				}).then(res => {
					uni.hideLoading()
					this.papersList = this.reload ? res['jobList'] : this.papersList.concat(res['jobList']);
					this.reload = false;
					if (res['jobList'].length < 10) {
						this.status = 'noMore'
					}
					console.log(res);
				}).catch(err => {
					uni.hideLoading()
					if (this.pageNum === 0) {
						this.papersList = []
					}
					this.status = 'noMore'
					console.log(err);
				})
			},


		},
		created() {
			isShouSwitchItems


		},
		onShow() {
			this.reload = true;
			this.pageNum = 0;
			this.getDataList()

			if (uni.getStorageSync(this.$config.communityName) !== '' && uni.getStorageSync(this.$config.communityName) !==
				undefined) {
				this.houseName = uni.getStorageSync(this.$config.communityName) + uni.getStorageSync(this.$config
					.houseName)
			}
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
	.segment {
		width: 60%;
		margin: 10px auto;
	}

	.item_title {
		display: flex;
		padding-top: 10px;
	}
</style>
