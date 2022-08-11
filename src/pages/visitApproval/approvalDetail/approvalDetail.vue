<template>
	<view>

		<div class="item" v-if="job.leader.name">
			<div>访客姓名</div>
			<div>{{job.leader.name}}</div>
		</div>
		<p class="divler" v-if="job.leader.name"></p>

		<div class="item" v-if="job.leader.mobile">
			<div>手机号码</div>
			<div>{{job.leader.mobile}}</div>
		</div>
		<p class="divler" v-if="job.leader.mobile"></p>


		<div class="item" v-if="job.community&&job.community.name">
			<div>拜访房号</div>
			<div>{{job.community.name}}{{job.house.name}} </div>
		</div>
		<p class="divler" v-if="job.community&&job.community.name"></p>


    <div class="item" v-if="job.numberOfVisitors">
      <div>拜访人数</div>
      <div>{{job.numberOfVisitors}}人</div>
    </div>
    <p class="divler" v-if="job.numberOfVisitors"></p>

    <div class="item" v-if="job.memo">
      <div>拜访事由</div>
      <div>{{job.memo}}</div>
    </div>
    <p class="divler" v-if="job.memo"></p>


		<div class="item" v-if="job.beginTime">
			<div>来访时间</div>
			<div>{{job.beginTime}}</div>
		</div>
		<p class="divler" v-if="job.beginTime"></p>

		<div class="item" v-if="job.leader.idCardSn">
			<div>身份证号</div>
			<div>{{job.leader.idCardSn}}</div>
		</div>
		<p class="divler" v-if="job.leader.idCardSn"></p>

		<div class="item" v-if="job.leader.companyName">
			<div>访客单位</div>
			<div>{{job.leader.companyName}}</div>
		</div>
		<p class="divler" v-if="job.leader.companyName"></p>

    <div class="item" v-if="job.antiepidemicCert.temperature">
			<div>体温</div>
			<div>{{job.antiepidemicCert.temperature}}度</div>
		</div>
		<p class="divler" v-if="job.antiepidemicCert.temperature"></p>

    <div class="img_box" v-if="job.leader.photoKey" >
      <div style="vertical-align: middle;"> 免冠照片</div>
      <img class="img" :src="photoUrl" alt="">
    </div>
    <p class="divler" v-if="job.leader.photoKey"></p>



		<!-- <div class="item" v-if="job.property.name">
			<div>访客单位</div>
			<div>{{job.property.name}}</div>
		</div>
		<p class="divler" v-if="job.property.name"></p> -->


		<!-- <div class="img_box">
			<div style="vertical-align: middle;"> 防疫证明</div>
			<div style="display: flex;">
				<img class="img" src="" alt="">
				<img class="img" src="" alt="">
				<img class="img" src="" alt="">
			</div>


		</div>
		<p class="divler"></p>
		<div class="img_box">
			<div style="vertical-align: middle;"> 免冠照片</div>
			<div style="display: flex;">
				<img class="img" src="" alt="">
				<img class="img" src="" alt="">
				<img class="img" src="" alt="">
			</div>


		</div> -->



		<div v-if="job.status==='waitingForProprietorToReview'"
			style="display: flex;justify-content: space-between;margin:  15px 40px 0px 40px;position: fixed;bottom: 0;width: 80%">
			<div v-on:click="accept"
				style="width: 40%;text-align: center;background-color: #43C588;padding: 5px 0;border-radius: 15px;color: white;">
				通过</div>
			<div v-on:click="reject"
				style="width: 40%;text-align: center;background-color: #E55B5E;padding: 5px 0;border-radius: 15px;color: white;">
				驳回</div>
		</div>


		<div v-if="job.status==='waitingForVisiting'||job.status==='waitingForPropertyToReview'"
			style="text-align: center;margin:  15px 40px 0px 40px;position: fixed;bottom: 10px;width: 80%;border: #43C588 1px solid; color:#43C588;padding: 10px;">
			已通过</div>

		<div v-if="job.status==='proprietorRejected'"
			style="text-align: center;margin:  15px 40px 0px 40px;position: fixed;bottom: 10px;width: 80%;border: #E55B5E 1px solid; color:#E55B5E;padding: 10px;">
			已拒绝</div>





		<uni-popup ref="inputDialog" type="dialog" :mask-click="false">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入内容" placeholder="请输入拒绝理由"
				@confirm="dialogInputConfirm">
			</uni-popup-dialog>
		</uni-popup>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobId: '',
				job: '',
        photoUrl:''
			}
		},
		methods: {
			accept() {
				let that = this

				this.$apis.postJobEvent({
					"jobId": this.jobId,
					"action": "acceptVisit",
					"handler": {
						"name": uni.getStorageSync(this.$config.nikeName),
						"type": "visitor-user"
					},

				}).then(res => {
					uni.showToast({
						title: '已通过',
						success() {
							that.getJobDetail()
						}
					})

				})
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
							that.getJobDetail()
						}
					})

				})
				console.log(val);
			},
			reject() {
				this.$refs.inputDialog.open()
			},
			getJobDetail() {
        let that =this
				this.$apis.getJobDetail({
					"jobIds": this.jobId
				}).then(r => {
					console.log(r)
					this.job = r['job']
          if (this.job.leader.photoKey){
            that.getPhotoUrl(this.job.leader.photoKey)
          }
				})

			},
      getPhotoUrl(key) {
        this.$apis.getFileUrl({
          "key": key
        }).then(r => {
          console.log(r)
          this.photoUrl = r;
        })
      },
		},
		onLoad(option) {
			console.log("approvalDetail", option.jobId);
			this.jobId = option.jobId;
			this.getJobDetail()
		}
	}
</script>

<style>
	.item {
		display: flex;
		margin: 0 20px;
		line-height: 40px;
		justify-content: space-between;

	}

	.divler {
		width: 100%;
		height: 1px;
		background-color: #d9d6d6;
	}

	.img_box {
		margin: 10px 20px;
		display: flex;
		justify-content: space-between;
	}

	.img {
		margin-left: 10px;
		width: 100px;
		height: 100px;
		background-color: black;

	}
</style>
