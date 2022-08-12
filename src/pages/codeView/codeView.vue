<template>
	<view>
		<div class="box">
			<div class="view_code">

				<img  class="head_img" :src="photoUrl">

				<span class="user_name">{{ userName }}</span>

				<span style="display: block;text-align: center;color:#A29C9C;margin-top: 10px">访客凭证</span>

				<div v-if="value!==''" class="img_code">
					<canvas canvas-id="qrcode" style="width: 100%;height: 100%;margin: 0 auto;" />
				</div>


			</div>
			<div class="view_info">
				<div class="item">
					<img class="img" src="../../assets/add-account.svg"
						style="margin-top: auto;margin-bottom: auto;width: 25px">
					<div sty>被访人:</div>
					<div>{{intervieweeName}}</div>

				</div>
				<div class="item">
					<img class="img" src="../../assets/on-time-shipment.svg"
						style="margin-top: auto;margin-bottom: auto;width: 25px">
					<div sty>拜访时间:</div>
					<div>{{beginTime}}</div>

				</div>
				<div style="height: 1px;width:100%;background-color: #e7e7e7;margin-top: 20px"></div>
				<span
					style="margin-left: 30px;font-weight: bolder;display: block;margin-top: 10px">{{ companyAddress }}</span>

				<span style="padding-top:10px;margin-left: 30px;">联系电话：<span style="color: #1890FF"><a
							style="display: inline-block;" v-on:click="phoneCall">{{
		          intervieweePhone
		        }}</a></span></span>

			</div>

			<div id="btnBox">
				<button class="next" v-on:click="next">下一个</button>
				<button class="prve" v-on:click="prve">上一个</button>

			</div>


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
				"index": 0,
				"papersList": [],
				"value": '',
				"companyAddress": '',
				"photoUrl": '',

			}
		},
		created() {
			this.$apis.getVisitorCode({
				"pageSize": 999,
				"page": 0,
				"status": "waitingForVisiting"
			}).then(res => {
				this.papersList = res["papersList"]
				this.showViewdata()
			})


		},
		methods: {
			phoneCall() {
				uni.makePhoneCall({
					phoneNumber: this.intervieweePhone //仅为示例
				});
			},
			// getJobDetail(jobId) {
			// 	this.$apis.getJobDetail({
			// 		"jobIds": jobId
			// 	}).then(r => {
			// 		console.log(r)
			// 		this.mobile = r['job']['interviewee']['mobile']
			// 		this.intervieweeName = r['job']['interviewee']['name']
			// 		this.beginTime = r['job']['beginTime']
			// 	})
			// },
			// getPhotoUrl(key) {
			// 	this.$apis.getFileUrl({
			// 		"key": key
			// 	}).then(r => {
			// 		console.log(r)
			// 		this.photoUrl = r;
			// 	})
			// },
			next() {
				if (this.papersList.length > 0 && this.index < this.papersList.length - 1) {
					this.index++
					this.showViewdata()

				} else {
					uni.showToast({
						title: '没有更多了',
						icon: 'none'
					})
				}

				console.log(this.index)
			},
			prve() {
				if (this.index !== 0) {
					this.index--
					this.showViewdata()
				} else {
					uni.showToast({
						title: '已经是最新的',
						icon: 'none'
					})
				}
				console.log(this.index)
			},
			getPhotoUrl(key) {
				this.$apis.getFileUrl({
					"key": key
				}).then(r => {
					console.log(r)
					this.photoUrl = r;
				})
			},
			showViewdata() {
				this.userName = this.papersList[this.index]['visitor']['name']
				this.value = JSON.stringify(this.papersList[this.index]['qrCode']);

				this.companyAddress = this.papersList[this.index]['companyAddress'];
				this.intervieweeName = this.papersList[this.index]['intervieweeName'];
				this.intervieweePhone = this.papersList[this.index]['intervieweePhone'];
				this.beginTime = this.papersList[this.index]['planStartTime'];

				console.log(JSON.stringify(this.papersList[this.index]['qrCode']));
				console.log(this.value);

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
					if (this.papersList[this.index]['photo']['key']) {
						this.getPhotoUrl(this.papersList[this.index]['photo']['key'])
					} else {
            this.photoUrl =""
          }
				} catch (e) {
          this.photoUrl =""
					console.log(e);

				}




			}

		}
	}
</script>

<style scoped>
	.item {
		height: 30px;
		line-height: 30px;
		display: flex;
	}

	.box {
		width: 100%;
		height: 100%;
		position: absolute;
		background-size: 100% 100%;
		background-color: #1890FF;
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
		font-size: 13px;
		display: inline-flex;
		width: 100%;
		border-top: 0;
	}


	.btnBox {
		position: absolute;
		width: 100%;
		background: blueviolet;
	}

	.prve {
		margin-top: 10px;
		padding: 0;
		position: absolute;
		left: 20px;
		color: black;
		width: 20%;
	}

	.next {
		margin-top: 10px;
		padding: 0;
		position: absolute;
		right: 20px;
		color: black;
		width: 20%;
	}
</style>
