<template>
  <view>
    <div class='box'>
      <div class="view_code">

        <img class="head_img" :src='photoUrl'/>

        <span class="user_name">{{ userName }}</span>

        <span style="display: block;text-align: center;color:#A29C9C;margin-top: 10px">访客凭证</span>

        <div v-if="status==='waitingForVisiting'" class="img_code">
          <canvas  canvas-id="qrcode" style="width: 100%;height: 100%;margin: 0 auto;"/>
        </div>

        <div v-else-if="status==='proprietorRejected'||status==='propertyRejected'" class="img_code">
          <img src="../../../assets/qrcode.svg" width="240" height="240" style='width: 100%;'/>
          <p class="text" style="color: #F00000;background-color: white;">
            已拒绝 </p>
        </div>

        <div v-else-if="status==='waitingForPropertyToReview'"
             class="img_code">
          <img src="../../../assets/qrcode.svg" width="240" height="240" style='width: 100%;'/>
          <p class="text" style="color: #1890FF; background-color: white;">
            请耐心等待物业公司授权 </p>
        </div>

        <div v-else-if="status==='waitingForProprietorToReview'"
             class="img_code">
          <img src="../../../assets/qrcode.svg" width="240" height="240" style='width: 100%;'/>
          <p class="text" style="color: #1890FF; background-color: white;">
            请耐心等待业主公司授权 </p>
        </div>


        <div v-else-if="status==='reviewTimeout'"
             class="img_code">
          <img src="../../../assets/qrcode.svg" width="240" height="240" style='width: 100%;'/>
          <p class="text" style="color: #707070; background-color: white;">
            审核超时 </p>
        </div>


        <div v-else class="img_code">
          <img src="../../../assets/qrcode.svg" width="240" height="240" style='width: 100%;'/>
          <p class="text" style="color: #F00000;background-color: white;">
            请耐心等待被访人授权 </p>
        </div>

      </div>

      <div class="view_info">
        <div class="item">
          <img class="img" src="../../../assets/add-account.svg"/>
          <div>被访人:{{ intervieweeName }}</div>
        </div>
        <div class="item">
          <img class="img" src="../../../assets/on-time-shipment.svg">
          <div>拜访时间:{{ beginTime }}</div>
        </div>

        <div style="height: 1px;width:100%;background-color: #e7e7e7"></div>
        <span
            style="margin-left: 30px;font-weight: bolder;display: block;margin-top: 10px">{{ companyAddress }}</span>
        <span style="padding-top:15px;margin-left: 30px;display: block">联系电话：<span style="color: #1890FF"
                                                                                   v-on:click="phoneCall">{{
            intervieweePhone
          }}</span></span>

      </div>


      <div style="height: 80px;width: 100%;background-color: white;display: flex;margin-top: 20px;"
           v-if="isShowShare">

        <img src="../../../assets/ic_weChat_share.svg"
             style="height: 60px;width: 60px;margin: auto 20px auto 20px;top:0;bottom: 0;"/>

        <button style="flex: 1;line-height: 80px;background-color: white" open-type="share">微信分享邀约申请</button>

        <button v-on:click="isShowShare=false"
                style="color: #0483d7;line-height: 80px;background-color: white">关闭
        </button>


        <!--				<div style="font-size: 18px;margin: auto 0;top:0;bottom: 0;">-->
        <!--					微信分享邀约申请 <br />-->
        <!--					<span style="font-size: 15px;">点击发送给邀请对象</span>-->
        <!--				</div>-->
      </div>
    </div>
  </view>
</template>

<script>
import uQRCode from '../../../utils/uqrcode.js'

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
      'isShowShare': false,
      paper: {}
    }
  },
  methods: {
    phoneCall() {
      uni.makePhoneCall({
        phoneNumber: this.intervieweePhone
      });
    },
    getJobdateil() {
      uni.showLoading();

      let that = this
      this.$apis.getJobDetail({
        "jobIds": this.jobId,
      }).then(res => {
        uni.hideLoading()

        if (res.job.status === 'waitingForProprietorToReview' || res.job.status ===
            'proprietorRejected' || res.job.status ===
            'waitingForPropertyToReview' || res.job.status ===
            'reviewTimeout') {
          that.status = res.job.status
          that.intervieweeName = res.job.interviewee.name;
          that.intervieweePhone = res.job.interviewee.mobile;
          that.beginTime = res.job.beginTime;
        } else {
          that.$apis.getVisitorCode({
            "jobIds": that.jobId,
          }).then(res => {
            that.paper = res["papersList"][0]
            that.companyAddress = res["papersList"][0]['companyAddress']
            that.userName = res["papersList"][0]['visitor']['name']
            that.status = res["papersList"][0]['status']
            that.value = res["papersList"][0]['qrCode']
            that.intervieweeName = res["papersList"][0]['intervieweeName'];
            that.intervieweePhone = res["papersList"][0]['intervieweePhone'];
            that.beginTime = res["papersList"][0]['planStartTime'];

            if (that.status === 'waitingForVisiting') {
              that.isShowShare = true
            }

            uQRCode.make({
              canvasId: 'qrcode',
              componentInstance: this,
              text: that.value,
              size: 240,
              margin: 0,
              backgroundColor: '#ffffff',
              foregroundColor: '#000000',
              fileType: 'jpg',
              errorCorrectLevel: uQRCode.errorCorrectLevel.H,
              success: res => {
              }
            })

            try {
              if (res["papersList"][0]['photo']!==undefined&&res["papersList"][0]['photo']['key']!==undefined) {
                that.getPhotoUrl(res["papersList"][0]['photo']['key'])
              }
            } catch (e) {
              console.log(e);

            }

          })
        }

        console.log(res);
      }).catch(err => {
        uni.hideLoading()
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
    shareParper() {
      uni.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 1,
        summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
        success: function (res) {
          console.log("success:" + JSON.stringify(res));
        },
        fail: function (err) {
          console.log("fail:" + JSON.stringify(err));
        }
      });
      // console.log('分享点击')
      // uni.share({
      // 	provider: 'weixin',
      // 	scene: "WXSceneSession",
      // 	type: 5,
      // 	imageUrl: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/962fc340-4f2c-11eb-bdc1-8bd33eb6adaa.png',
      // 	title: '欢迎体验uniapp',
      // 	miniProgram: {
      // 		id: 'gh_ae374b20f98c',
      // 		path: '/pages/home/home',
      // 		type: 1,
      // 		webUrl: 'http://uniapp.dcloud.io'
      // 	},
      // 	success: ret => {
      // 		console.log(JSON.stringify(ret));
      // 	}
      // });

      // 	uni.share({
      // 		provider: 'weixin',
      // 		scene: "WXSceneSession",
      // 		type: 5,
      // 		title: '访客证',
      // 		imageUrl: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/962fc340-4f2c-11eb-bdc1-8bd33eb6adaa.png',
      // 		miniProgram: {
      // 			id: 'gh_ae374b20f98c',
      // 			path: '/pages/openShareCodeView/openShareCodeView?papersId=' + this.paper.id,
      // 			type: 1,
      // 		},
      // 		success: ret => {
      // 			console.log(JSON.stringify(ret));
      // 		},
      // 		fail(err) {
      // 			console.log(err);
      // 		}
      // 	});
    }

  },
  onLoad(option) {
    console.log(option.jobId);
    this.jobId = option.jobId
    this.getJobdateil()

    wx.showShareMenu({
      withShareTicket: true,
      //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
      menus: ["shareAppMessage", "shareTimeline"]
    })

    uni.getProvider({
      service: 'share',
      success: function (res) {
        console.log(res.provider)

      }
    });

  },
  onShareAppMessage(res) {
    if (res.from === 'button') { // 来自页面内分享按钮
      console.log(res.target)
    }
    return {
      title: '通行证', //分享的名称
      path: 'pages/openShareCodeView/openShareCodeView?papersId=' + this.paper.id,
      mpId: this.$config.appId //此处配置微信小程序的AppId
    }
  },
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
  height: 100vh;
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
