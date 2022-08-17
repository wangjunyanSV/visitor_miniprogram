<template>
	<view style="background-color: #1890FF;">
		<div class='box'>
			<div class="view_code">

				<img class="head_img" :src='photoUrl' />

				<span class="user_name">{{ userName }}</span>

				<span style="display: block;text-align: center;color:#A29C9C;margin-top: 10px">访客凭证</span>

				<div v-if="status==='waitingForVisiting'" class="img_code">
					<canvas canvas-id="qrcode" style="width: 100%;height: 100%;margin: 0 auto;" />
				</div>

				<div v-else-if="status==='proprietorRejected'||status==='propertyRejected'" class="img_code">
					<img src="../../assets/qrcode.svg" width="240" height="240" />
					<p class="text" style="color: #F00000;">
						已拒绝 </p>
				</div>

				<div v-else-if="status==='waitingForProprietorToReview'||status==='waitingForPropertyToReview'"
					class="img_code">
					<img src="../../assets/qrcode.svg" width="240" height="240" />
					<p class="text" style="color: #1890FF;">
						请耐心等待被访人授权 </p>
				</div>

				<div v-else class="img_code">
					<img src="../../assets/qrcode.svg" width="240" height="240" />
					<p class="text" style="color: #F00000;">
						已失效 </p>
				</div>

			</div>

			<div class="view_info">
				<div class="item">
					<img class="img" src="../../assets/add-account.svg" />
					<div>被访人:{{intervieweeName}}</div>
				</div>
				<div class="item">
					<img class="img" src="../../assets/on-time-shipment.svg">
					<div>拜访时间:{{beginTime}}</div>
					<!-- <div class="input" title="拜访时间" :value="beginTime" readonly="readonly" :show-clear="false">
 -->
					<!-- </div> -->
				</div>

				<div style="height: 1px;width:100%;background-color: #e7e7e7"></div>
				<span
					style="margin-left: 30px;font-weight: bolder;display: block;margin-top: 10px">{{ companyAddress }}</span>
				<span style="padding-top:15px;margin-left: 30px;display: block">联系电话：<span style="color: #1890FF" v-on:click="phoneCall">{{
		          intervieweePhone
		        }}</span></span>

			</div>

			<!-- div style="height: 80px;width: 100%;background-color: white;display: flex;margin-top: 20px;">

				<img src="../../assets/ic_weChat_share.svg"
					style="height: 60px;width: 60px;margin: auto 20px auto 20px;top:0;bottom: 0;" />

				<div style="font-size: 18px;margin: auto 0;top:0;bottom: 0;">
					微信分享邀约申请 <br />
					<span style="font-size: 15px;">点击发送给邀请对象</span>
				</div>
		</div> -->
		</div>
	</view>

</template>

<script>
	import
	uQRCode
	from '../../utils/uqrcode.js'

	export default {
		data() {
			return {
				"intervieweePhone": '',
				"userName": '',
				"intervieweeName": '',
				"beginTime": '',
				"companyAddress": '',
				"status": '',
				"value": '',
				"photoUrl": '',
				'jobId': '',
				'papersId': '',


			}
		},
		methods: {
      phoneCall() {
        uni.makePhoneCall({
          phoneNumber: this.intervieweePhone
        });
      },
			getJobdateil() {

				this.$apis.getPapersShare({
					"papersIds": this.papersId,
				}).then(res => {

					this.companyAddress = res["papersList"][0]['companyAddress']
					this.userName = res["papersList"][0]['visitor']['name']
					this.status = res["papersList"][0]['status']
					this.value = res["papersList"][0]['qrCode']['metadata']
					this.intervieweeName = res["papersList"][0]['intervieweeName'];
					this.intervieweePhone = res["papersList"][0]['intervieweePhone'];
					this.beginTime = res["papersList"][0]['planStartTime'];

					uQRCode.make({
						canvasId: 'qrcode',
						componentInstance: this,
						text: this.value,
						size: 240,
						margin: 0,
						backgroundColor: '#ffffff',
						foregroundColor: '#000000',
						fileType: 'jpg',
						errorCorrectLevel: uQRCode.errorCorrectLevel.H,
						success: res => {}
					})

          try {
            if (res["papersList"][0]['photo']!==undefined&&res["papersList"][0]['photo']['key']!==undefined) {
              this.getPhotoUrl(res["papersList"][0]['photo']['key'])
            }
          } catch (e) {
            console.log(e);
          }

					// this.papersList = res["papersList"]
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
			onLoad(option) {
				console.log(option.papersId);
				this.papersId = option.papersId
				this.getJobdateil()

			}

		}
	}
</script>

<style>
	.text {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		margin-left: auto;
		margin-right: auto;
		text-align: center;
		width: 100%;
		padding: 5px;
		background-color: #fbf9fe
	}

	.box {
		width: 100%;
		position: absolute;
		background-size: 100% 100%;
		background-color: #1890FF;
	}

	.item {
		display: flex;
		line-height: 30px;
	}

	.view_code {
		border-radius: 20px;
		margin-top: 50px;
		width: 330px;
		height: 360px;
		margin-left: auto;
		margin-right: auto;
		background-color: white;
	}

	.head_img {
		left: 0;
		right: 0;
		margin: 0 auto;
		border-radius: 5px;
		position: absolute;
		padding: 2px;
		background-color: white;
		top: 25px;
		height: 50px;
		width: 50px;
		display: block;
	}

	.user_name {
		display: block;
		text-align: center;
		padding-top: 40px;
	}

	.img_code {
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 240px;
		height: 240px;
		display: block;
	}

	.view_info {
		border-radius: 20px;
		margin-top: 20px;
		width: 330px;
		height: 200px;
		margin-left: auto;
		margin-right: auto;
		background-color: white;
		padding-top: 20px
	}

	.img {
		margin-left: 30px;
		vertical-align: middle;
		width: 30px;
		height: 30px;
	}

	.input {
		display: inline-flex;
		font-size: 13px;
		width: 180px;
	}
</style>
