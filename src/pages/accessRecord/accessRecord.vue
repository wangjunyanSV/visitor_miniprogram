//访问记录
<template>
	<view>

		<div style="display: flex;line-height: 30px;">
			<div v-on:click="changtypeIndex(1)" class="type_item" :class="{'check_type':typeIndex===1}">居民小区</div>
			<div v-on:click="changtypeIndex(2)" class="type_item" :class="{'check_type':typeIndex===2}">商业园区</div>
		</div>
		<p></p>
		<div style=" display: flex;justify-content: center;" v-if="typeIndex===1">
			<div>{{houseName}}</div>
			<div style="font-size: 13px;color: #1890FF;margin-left: 10px;" v-on:click="changHouse">切换</div>
		</div>


		<view class="segment">
			<uni-segmented-control :current="index" :values="items" @clickItem="onClickItem" />
		</view>



		<div class="item" v-for="(src,index) in visitList" v-on:click="detail(src)" :key="index">
			<div class="tilebox">
				<span class="title">拜访我的</span>

				<span class="time">{{ src['beginTime'] }} </span>
			</div>
			<div class="emptyBox"></div>
			<p> 拜访对象：{{ src["interviewee"]["name"] }}</p>
			<p> 当前状态：

				<span style="color: #1890FF" v-if="src['status']=== 'waitingForVisiting'">{{ "未拜访" }}</span>
				<span style="color: #ffdd2e" v-else-if="src['status']=== 'waitingForProprietorToReview'">{{
            "未审核"
          }}</span>

				<span style="color: #ffdd2e" v-else-if="src['status']=== 'waitingForPropertyToReview'">{{
            "等待物业审核"
          }}</span>


				<span style="color: #F00000 "
					v-else-if="src['status']=== 'proprietorRejected'||src['status']=== 'propertyRejected'">{{ "已拒绝" }}</span>

				<span style="color: #707070 " v-else-if="src['status']=== 'completed'||src['status']=== 'visiting'">{{
            "已签到"
          }}</span>

				<span style="color: #707070 " v-else-if="src['status']=== 'reviewTimeout'">{{
            "审核超时"
          }}</span>

				<span style="color: #ff0000 " v-else>{{ "未知状态" }}</span>

			</p>
		</div>

		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['拜访我的', '我的邀请'],
				index: 0,
				typeIndex: 1,
				visitList: [],
				areaId: "",
				pageNum: 0,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				reload: false,
				houseName: '',
			}
		},
		methods: {
			onClickItem(res) {
				this.visitList = []
				this.index = res.currentIndex;
				console.log(res.currentIndex);
				this.reload = true
				this.pageNum = 0
				this.getDatalist()
			},
			changtypeIndex(res) {
				this.visitList = []
				this.typeIndex = res;
				this.reload = true
				this.pageNum = 0
				this.getDatalist()
			},
			getDatalist() {
        uni.showLoading({
          mask:true
        })

				if (this.visitList.length !== 0) {
					this.status = 'loading'
				}
				this.$apis.getAccessRecoed({
					"pageSize": 10,
					"page": this.pageNum,
					"intervieweeIds": this.index === 0 ? uni.getStorageSync(this.$config.uid) : "",
					"inviterIds": this.index === 1 ? uni.getStorageSync(this.$config.uid) : "",
					"houseId": this.typeIndex === 1 ? uni.getStorageSync(this.$config.houseId) : "",
					"companyId": this.typeIndex === 2 ? uni.getStorageSync(this.$config.companyId) : "",
				}).then(res => {
          uni.hideLoading()
					this.visitList = this.reload ? res['jobList'] : this.visitList.concat(res['jobList']);
					this.reload = false;
					if (res['jobList'].length < 10) {
						this.status = 'noMore'
					}
				}).catch(err => {
          uni.hideLoading()
					this.status = 'noMore'
				})
			},
			detail(data) {
				uni.navigateTo({
					url: '../codeView/queryCode/queryCode?jobId=' + data.jobId
				})

				// uni.navigateTo({
				//   url: '../switchHouse/switchHouse'
				// })

				console.log(data);
			},
			changHouse() {
				uni.navigateTo({
					url: '../switchHouse/switchHouse'
				})
			},
		},
		created() {
			console.log(uni.getStorageSync(this.$config.uid));
		},
		onShow() {
			if (uni.getStorageSync(this.$config.communityName) !== '' && uni.getStorageSync(this.$config.communityName) !==
				undefined) {
				this.houseName = uni.getStorageSync(this.$config.communityName) + uni.getStorageSync(this.$config
					.houseName)
			}
			this.reload = true
			this.pageNum = 0;
			this.getDatalist()
		},
		onPullDownRefresh() {
			this.reload = true;
			this.pageNum = 0;
			this.getDatalist()
		},
		onReachBottom() {
			this.pageNum++
			this.status = 'more';
			this.getDatalist();
		},

	}
</script>

<style>
	.segment {
		width: 60%;
		margin: 10px auto;
	}


	.box {
		width: 100%;
		height: 100%;
		background-color: #F3F3F3;
		position: absolute;
	}

	#tab {
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
		width: 50%;
	}

	.item {
		background: #ffffff;
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
		width: 80%;
		padding: 15px;
		border-radius: 15px;
	}

	.emptyBox {
		height: 20px;
	}

	.time {
		position: absolute;
		right: 15%
	}

	.type_item {
		margin: 5px;
	}

	.check_type {
		color: #1890FF;
		border-bottom: 1px solid #1890FF;
	}
</style>
