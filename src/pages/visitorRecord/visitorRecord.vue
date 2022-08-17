//拜访记录
<template>
	<view>
		<div class="item" v-for="(src,index) in papersList" :key="index"
			v-on:click="detail(src['jobId'],src['leader']['visitorId'],src['status'])">
			<div class="tilebox">
				<span class="title">拜访申请</span>

				<span class="time">{{ src['beginTime'] }}</span>
			</div>
			<div class="emptyBox"></div>
			<p> 拜访对象：{{ src["interviewee"]["name"] }}</p>
			<p> 拜访时间：{{ src["beginTime"] }}</p>

			<p v-if="src['proprietor']!==undefined"> 拜访公司：{{ src["proprietor"]["name"] }}</p>

			<p v-else-if="src['community']!==undefined"> 拜访小区：{{ src["community"]["name"] }}</p>

			<p> 当前状态：

				<span style="color: #1890FF" v-if="src['status']=== 'waitingForVisiting'">{{ "未拜访" }}</span>
				<span style="color: #ffdd2e"
					v-else-if="src['status']=== 'waitingForProprietorToReview'||src['status']=== 'waitingForPropertyToReview'">{{ "审核中" }}</span>
				<span style="color: #F00000 "
					v-else-if="src['status']=== 'proprietorRejected'||src['status']=== 'propertyRejected'">{{ "已拒绝" }}</span>

				<span style="color: #707070 " v-else-if="src['status']=== 'reviewTimeout'">{{ "审核超时" }}</span>

				<span style="color: #707070 "
					v-else-if="src['status']=== 'completed'||src['status']=== 'visiting'">{{ "已签到" }}</span>
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
				papersList: [],
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
			detail(jobId, visitorId, status) {
				console.log(jobId + "-----" + visitorId)
				uni.navigateTo({
					url: '../codeView/queryCode/queryCode?jobId=' + jobId
				})
			},
			getDataList() {
				if (this.papersList.length !== 0) {
					this.status = 'loading'
				}
				this.$apis.getJobDetail({
					"pageSize": 10,
					"page": this.pageNum,
					"visitorIds": uni.getStorageSync(this.$config.personId)
				}).then(res => {
					this.papersList = this.reload ? res['jobList'] : this.papersList.concat(
						res[
							'jobList']);
					this.reload = false;
					if (res['jobList'].length < 10) {
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
	.box {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	#tab {
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
		width: 50%;
	}

	.title {
		font-size: 20px;
		color: black;
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
</style>
