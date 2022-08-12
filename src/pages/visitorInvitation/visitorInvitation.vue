<template>
  <view style="height: 100vh;padding: 0 20px">
    <view v-if="identity!==''">
      <view style="margin: 15px;display: flex;">
        <img style="width: 30px;height: 30px;vertical-align: top;" src="../../assets/logo_visitor.png" alt="">
        <view style="line-height: 30px;margin-left: 20px;flex: 1;">{{ title }}</view>

        <view style="color: #1890FF;" v-if="identity==='resident'" v-on:click="changHouse">切换</view>
      </view>

      <view style="height: 5px;background-color: #F8F8F8;">

      </view>

      <uni-forms ref="form" :modelValue="formData">

        <div v-for="item in requestData">
          <uni-forms-item name='leaderName' label="访客姓名" v-if="item.formId==='1'">
            <uni-easyinput v-model="formData.leaderName" placeholder="请输入姓名"/>
          </uni-forms-item>

          <uni-forms-item label="来访人数" v-if="item.formId==='3'">
            <uni-number-box style="text-align: right;position: absolute;right: 10px;"
                            v-model='formData.numberOfVisitors' :min="1"/>
          </uni-forms-item>

          <uni-forms-item label="来访事由" v-if="item.formId==='4'">
            <picker style="text-align: right;margin-right: 10px;" @change="bindPickerChange" :value="memo"
                    :range="memoData" mode="selector" range-key="name">
              <view>{{ memoData[momeIndex].name }} &nbsp;&nbsp;&nbsp;&gt;</view>
            </picker>
          </uni-forms-item>

          <uni-forms-item label="来访事由" v-if="item.formId==='5'">
            <view style="text-align: right;flex: 1;">
              <label style="display: inline-block;" v-for="(itemb, index) in items" :key="index">
                <view
                    style="border: 1px solid gainsboro;padding:0 5px;margin: 0 5px;border-radius: 7px;"
                    :class="{'tipTextStyle' :current===index}" v-on:click="check(index)">
                  {{ itemb.name }}
                </view>
              </label>
            </view>
          </uni-forms-item>

          <uni-forms-item label="访客证\n有效期" v-if="item.formId==='6'||item.formId==='19'" name="endTime">
            <uni-datetime-picker style="position: absolute;right: 0;" v-model="formData.endTime"
                                 :clearIcon="false"/>
          </uni-forms-item>

          <uni-forms-item label="车牌号" v-if="item.formId==='7'" name='licensePlateList'>
            <uni-easyinput v-model="formData.licensePlateList" placeholder="请输入车牌号"/>
          </uni-forms-item>

          <uni-forms-item label="手机号" v-if="item.formId==='8'" name='leaderMobile'>
            <uni-easyinput v-model="formData.leaderMobile" placeholder="请输入手机号"/>
          </uni-forms-item>

          <uni-forms-item label="身份证" v-if="item.formId==='9'" name='idCardSn'>
            <uni-easyinput v-model="formData.leaderIdCardSn" placeholder="请输入身份证号"/>
          </uni-forms-item>

          <uni-forms-item label="免冠照" v-if="item.formId==='10'">
            <div style="height: 60px;width: 60px;margin: 10px;"
                 v-on:click="selectHeadImg">
              <div style="height: 60px;width: 60px;display: flex;justify-self: center;justify-content:center;align-items: center;background-color:#eeeeee;border-radius: 6px;"
                   v-if="headImg===undefined||headImg===''">
                    <div style="height: 50px;width: 5px;background-color: white;border-radius: 2px;align-self: center;"></div>
                    <div style="height: 50px;width: 5px;background-color: white;border-radius: 2px;align-self: center;transform: rotate(90deg);position: absolute;"></div>
              </div>
              <div
                  v-if="headImg!==undefined&&headImg!==''">
                <img style="height: 60px;width: 60px;" :src="headImg" alt="">
              </div>
            </div>

          </uni-forms-item>


          <uni-forms-item label="来访时间" v-if="item.formId==='18'" name='beginTime'>
            <uni-datetime-picker style="position: absolute;right: 0;" v-model="formData.beginTime"
                                 :clearIcon="false"/>
          </uni-forms-item>


          <uni-forms-item label="访客单位" v-if="item.formId==='20'" name='leaderCompanyName'>
            <uni-easyinput v-model="formData.leaderCompanyName" placeholder="请输入访客单位"/>
          </uni-forms-item>

          <uni-forms-item label="拜访单位" v-if="item.formId==='21'">
            <input v-on:click="searchCompanyName" style="height: 36px;font-size: 12px;" type="text"
                   placeholder="请输入拜访单位" :value="selectCompanyName">
          </uni-forms-item>

          <uni-forms-item label="防疫证明" v-if="item.formId==='22'">
            <div style="display: flex;justify-content:flex-end;flex: 1;">
              <div style="height: 60px;width: 60px;background-color:#eeeeee;margin: 10px;"
                   v-for=" (itema,index) in healthitem" :key="index"
                   v-on:click="selectHS($event,itema.formId,index,)">
                <div style="line-height: 60px;text-align: center;"
                     v-if="healtchImgList[index].url===undefined||healtchImgList[index].url===''">
                  {{ itema.name }}
                </div>
                <div
                    v-if=" index===healtchImgList[index].index&&healtchImgList[index].url!==undefined&&healtchImgList[index].url!==''">
                  <img style="height: 60px;width: 60px;" :src=" healtchImgList[index].url" alt="">
                </div>
              </div>
            </div>
          </uni-forms-item>


        </div>

        <view style="overflow: hidden;display: flex;justify-content: flex-end;margin: 10px 0" v-if="isshowMore"
              v-on:click="showMoreItem">
          <view class="show_more">
            选填 &nbsp;
            <img v-if="!showMore" style="color: #1890FF;width: 14px;height: 14px;vertical-align: middle;"
                 src="../../assets/ic_downdown.png" alt="">
            <img v-if="showMore" style="color: #1890FF;width: 14px;height: 14px;vertical-align: middle;"
                 src="../../assets/ic_upup.png" alt="">
          </view>
        </view>

        <div v-for="item in noMustRequestData" v-if="showMore">
          <uni-forms-item name='leaderName' label="访客姓名" v-if="item.formId==='1'">
            <uni-easyinput v-model="formData.leaderName" placeholder="请输入姓名"/>
          </uni-forms-item>

          <uni-forms-item label="来访人数" v-if="item.formId==='3'">
            <uni-number-box style="text-align: right;position: absolute;right: 10px;"
                            v-model='formData.numberOfVisitors' :min="1"/>
          </uni-forms-item>

          <uni-forms-item label="来访事由" v-if="item.formId==='4'">
            <picker style="text-align: right;margin-right: 10px;" @change="bindPickerChange" :value="memo"
                    :range="memoData" mode="selector" range-key="name">
              <view>{{ memoData[momeIndex].name }} &nbsp;&nbsp;&nbsp;&gt;</view>
            </picker>
          </uni-forms-item>

          <uni-forms-item label="来访事由" v-if="item.formId==='5'">
            <view style="text-align: right;flex: 1;">
              <label style="display: inline-block;" v-for="(itemb, index) in items" :key="index">
                <view
                    style="border: 1px solid gainsboro;padding:0 5px;margin: 0 5px;border-radius: 7px;"
                    :class="{'tipTextStyle' :current===index}" v-on:click="check(index)">
                  {{ itemb.name }}
                </view>
              </label>
            </view>
          </uni-forms-item>

          <uni-forms-item label="访客证\n有效期" v-if="item.formId==='6'||item.formId==='19'" name="endTime">
            <uni-datetime-picker style="position: absolute;right: 0;" v-model="formData.endTime"
                                 :clearIcon="false"/>
          </uni-forms-item>

          <uni-forms-item label="车牌号" v-if="item.formId==='7'" name='licensePlateList'>
            <uni-easyinput v-model="formData.licensePlateList" placeholder="请输入车牌号"/>
          </uni-forms-item>

          <uni-forms-item label="手机号" v-if="item.formId==='8'" name='leaderMobile'>
            <uni-easyinput v-model="formData.leaderMobile" placeholder="请输入手机号"/>
          </uni-forms-item>

          <uni-forms-item label="身份证" v-if="item.formId==='9'" name='idCardSn'>
            <uni-easyinput v-model="formData.leaderIdCardSn" placeholder="请输入身份证号"/>
          </uni-forms-item>

          <uni-forms-item label="免冠照" v-if="item.formId==='10'">
            <div style="height: 60px;width: 60px;margin: 10px;"
                 v-on:click="selectHeadImg">
              <div style="height: 60px;width: 60px;display: flex;justify-self: center;justify-content:center;align-items: center;background-color:#eeeeee;border-radius: 6px;"
                   v-if="headImg===undefined||headImg===''">
                <div style="height: 50px;width: 5px;background-color: white;border-radius: 2px;align-self: center;"></div>
                <div style="height: 50px;width: 5px;background-color: white;border-radius: 2px;align-self: center;transform: rotate(90deg);position: absolute;"></div>
              </div>
              <div
                  v-if="headImg!==undefined&&headImg!==''">
                <img style="height: 60px;width: 60px;" :src="headImg" alt="">
              </div>
            </div>
            <!--						<uni-file-picker style="flex: 1;" ref="files" fileMediatype="image" mode="grid" @select="select"-->
            <!--							@delete="deleteFile" limit="1" />-->

          </uni-forms-item>


          <uni-forms-item label="来访时间" v-if="item.formId==='18'" name='beginTime'>
            <uni-datetime-picker style="position: absolute;right: 0;" v-model="formData.beginTime"
                                 :clearIcon="false"/>
          </uni-forms-item>


          <uni-forms-item label="访客单位" v-if="item.formId==='20'" name='leaderCompanyName'>
            <uni-easyinput v-model="formData.leaderCompanyName" placeholder="请输入访客单位"/>
          </uni-forms-item>

          <uni-forms-item label="拜访单位" v-if="item.formId==='21'">
            <input v-on:click="searchCompanyName" style="height: 36px;font-size: 12px;" type="text"
                   placeholder="请输入拜访单位" :value="selectCompanyName">
          </uni-forms-item>

          <uni-forms-item label="防疫证明" v-if="item.formId==='22'">
            <div style="display: flex;justify-content:flex-end;flex: 1;">
              <div style="height: 60px;width: 60px;background-color:#eeeeee;margin: 10px;"
                   v-for=" (itema,index) in healthitem" :key="index"
                   v-on:click="selectHS($event,itema.formId,index,)">
                <div style="line-height: 60px;text-align: center;"
                     v-if="healtchImgList[index].url===undefined||healtchImgList[index].url===''">
                  {{ itema.name }}
                </div>
                <div
                    v-if=" index===healtchImgList[index].index&&healtchImgList[index].url!==undefined&&healtchImgList[index].url!==''">
                  <img style="height: 60px;width: 60px;" :src=" healtchImgList[index].url" alt="">
                </div>
              </div>
            </div>
          </uni-forms-item>


        </div>

      </uni-forms>


      <button class="submit" type="submit" v-on:click="submitData">提交</button>


    </view>
    <view v-else>
      <view style="position: absolute;
			width: 60%;
			left: 20%;
			line-height: 40px;
        top: 50%;
		text-align: center;
		margin-top: -40px;">
        <view class="item_style" v-on:click="checkIdentity('staff')">员工身份邀请</view>
        <view class="item_style" v-on:click="checkIdentity('resident')">居民住户身份邀请</view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getUerDetail
} from '../../common/API.js'
import {
  originId
} from '../../common/Config.js'
import validate from '../../utils/fromvalidate.js'

export default {
  data() {
    return {
      headImg: "",
      headImgKey: "",
      formData: {
        numberOfVisitors: 1
      },
      //拜访时间
      visitTime: '',
      //头像
      fileKey: '',
      fromConfigList: [],
      healthitem: [],
      requestData: [],
      noMustRequestData: [],
      healtchImgList: [],

      identity: '',
      btnDisabled: false,
      memo: '',
      title: '',
      memoData: [{
        name: '访友'
      }, {
        name: '送货'
      }, {
        name: '家政'
      }, {
        name: '装修'
      }, {
        name: '看房'
      }, {
        name: '其他'
      }],
      items: [{
        value: '1',
        name: '面试',
      },
        {
          value: '2',
          name: '商务'
        },
        {
          value: '3',
          name: '私人'
        },
        {
          value: '4',
          name: '其他'
        },

      ],
      // current: 1,
      momeIndex: 0,
      // showOther: false,
      //校验规则
      portRule: [],
      //校验的数据
      checkData: {},
      //核酸码
      nucleicCode: '',
      //健康码
      healthCode: '',
      //行程码
      tripCode: '',
      //图片控制
      showMore: false,
      //显示更多
      isshowMore: false
    }
  },
  methods: {
    selectHeadImg() {
      let that = this
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: function (res) {

          uni.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //参数path:图片相对路径
            success: res => {
              console.log(res.data);

              that.$apis.uploadImages(res.data).then(res => {
                console.log(res);
                that.headImg = res.downloadUrl
                that.fileKey = res['fileKey']
                that.formData.filekey = that.fileKey
              })
            },
            fail: err => {
              console.log(err)
            }
          })

          console.log(res);
          console.log(JSON.stringify(res.tempFilePaths));
        }
      });

    },
    showMoreItem() {
      this.showMore = !this.showMore
    },
    selectHS(e, formId, index) {

      let that = this
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: function (res) {

          uni.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //参数path:图片相对路径
            success: res => {
              console.log(res.data);

              that.$apis.uploadImages(res.data).then(res => {
                console.log(res.downloadUrl);

                if (formId === '11') {
                  that.nucleicCode = res.downloadUrl
                }

                if (formId === '12') {
                  that.healthCode = res.downloadUrl
                }

                if (formId === '13') {
                  that.tripCode = res.downloadUrl
                }

                that.healtchImgList.push({
                  "index": index,
                  "url": res.downloadUrl
                })

                // that.fileKey = res['fileKey']
                // that.formData.filekey = that.fileKey
              })

            },
            fail: err => {
              console.log(err)
            }
          })

          console.log(res);
          console.log(JSON.stringify(res.tempFilePaths));
        }
      });
      console.log('选择文件：', e)
    },
    checkIdentity(res) {
      console.log(res);
      if (res === 'staff') {
        this.memo = this.memo = this.items[0]['name']
        this.title = uni.getStorageSync(this.$config.companyName)
      } else {
        this.memo = this.memo = this.memoData[0]['name']
        this.title = uni.getStorageSync(this.$config.communityName) + uni.getStorageSync(this.$config
            .houseName)
      }
      this.identity = res
      this.getFromConfig()

    },
    bindPickerChange(data) {
      this.momeIndex = data.detail.value
      console.log(data.detail.value);
    },
    switchChange(e) {
      console.log(e.detail.value);
      this.showCarNum = e.detail.value
    },
    changStatus() {
      this.showOther = !this.showOther
    },
    changeValue(res) {
      console.log(res);
    },
    changHouse() {
      uni.navigateTo({
        url: '../switchHouse/switchHouse'
      })
    },
    getFromConfig() {
      if (this.identity === 'resident') {

        this.$apis.getCommunityFormConfig({
          "communityId": uni.getStorageSync(this.$config.communityId)
        }).then(res => {

          //现场登记的数据

          let fromType
          let fromKeys = Object.keys(res['formConfigPojo'])
          if (fromKeys.includes('house')) {
            fromType = "house"
          } else if (fromKeys.includes('park')) {
            fromType = "park"
          } else {
            fromType = "all"
          }
          this.fromConfigList = []
          this.fromConfigList = res['formConfigPojo'][fromType]['invite']
          this.makedata()

          //找出防疫证明的项目
          this.healthitem = []
          this.fromConfigList.forEach(e => {
            if (e['formId'] === "11" || e['formId'] === "12" || e['formId'] === "13") {
              this.healthitem.push(e)
            }
          })

        })
      } else if (this.identity === 'staff') {

        this.$apis.getProprietorFormConfig({
          "proprietorId": uni.getStorageSync(this.$config.companyId)
        }).then(res => {
          //现场登记的数据

          let fromType
          let fromKeys = Object.keys(res['formConfigPojo'])
          if (fromKeys.includes('house')) {
            fromType = "house"
          } else if (fromKeys.includes('park')) {
            fromType = "park"
          } else {
            fromType = "all"
          }

          this.fromConfigList = []
          this.fromConfigList = res['formConfigPojo'][fromType]['invite']
          this.makedata()

          //找出防疫证明的项目
          this.healthitem = []
          this.fromConfigList.forEach(e => {
            if (e['formId'] === "11" || e['formId'] === "12" || e['formId'] === "13") {
              this.healthitem.push(e)
            }
          })

        })
      }

    },
    select(e) {
      console.log('选择文件：', e)
      console.log('选择文件：', e.tempFilePaths[0])
      console.log('选择文件：', e.tempFiles[0]['file'])
      //小程序端
      let that = this;

      uni.getFileSystemManager().readFile({
        filePath: e.tempFilePaths[0], //参数path:图片相对路径
        success: res => {
          console.log(res.data);

          that.$apis.uploadImages(res.data).then(res => {
            console.log(res);
            that.fileKey = res['fileKey']
            that.formData.filekey = that.fileKey
          })

        },
        fail: err => {
          console.log(err)
        }
      })

    },
    deleteFile(e) {
      console.log('删除文件：', e)
      this.fileKey = ''
    },
    makedata() {
      let that = this
      this.requestData = []
      this.noMustRequestData = []

      //找出那些是必传的参数数组或者是非必传的

      this.fromConfigList.forEach(res => {
        if (res.required === true) {
          that.requestData.push(res)
        } else {
          that.noMustRequestData.push(res)
        }
      })

      if (this.noMustRequestData.length > 0) {
        this.isshowMore = true
      } else {
        this.isshowMore = false
      }


    },
    submitData() {

      //校验数据
      this.portRule = []

      this.requestData.forEach(res => {
        switch (res.formId) {
          case '1':
            this.portRule.push({
              name: 'leaderName',
              notnull: true,
              title: '姓名',
            })
            this.checkData.leaderName = this.formData.leaderName
            break
          case '6':
          case '19':
            this.portRule.push({
              name: 'endTime',
              notnull: true,
              title: '访客证有效期',
              checkType: 'endTime'
            })
            this.checkData.endTime = this.formData.endTime
            break
          case '7':
            this.portRule.push({
              name: 'licensePlateList',
              notnull: true,
              title: '车牌',
              checkType: 'validateCarNum'
            })
            this.checkData.licensePlateList = this.formData.licensePlateList
            break

          case '8':
            this.portRule.push({
              name: 'leaderMobile',
              notnull: true,
              title: '手机号',
              checkType: 'leaderMobile'
            })
            this.checkData.leaderMobile = this.formData.leaderMobile
            break
          case '9':
            this.portRule.push({
              name: 'leaderIdCardSn',
              notnull: true,
              title: '身份证号',
              checkType: 'leaderIdCardSn'
            })
            this.checkData.leaderIdCardSn = this.formData.leaderIdCardSn
            break
          case '10':
            this.portRule.push({
              name: 'fileKey',
              notnull: true,
              title: '免冠照',
              checkType: 'fileKey'
            })
            this.checkData.fileKey = this.fileKey
            break
          case '11':
            this.portRule.push({
              name: 'nucleicCode',
              notnull: false,
              title: '核酸检测',
              checkType: 'nucleicCode'
            })
            this.checkData.nucleicCode = this.nucleicCode
            break
          case '12':
            this.portRule.push({
              name: 'healthCode',
              notnull: false,
              title: '健康码',
              checkType: 'healthCode'
            })
            this.checkData.healthCode = this.healthCode
            break
          case '13':
            this.portRule.push({
              name: 'tripCode',
              notnull: false,
              title: '行程码',
              checkType: 'tripCode'
            })
            this.checkData.tripCode = this.tripCode
            break

          case '14':
            this.portRule.push({
              name: 'intervieweeName',
              notnull: true,
              title: '被访人姓名'
            })
            this.checkData.intervieweeName = this.formData.intervieweeName
            break

          case '17':
            this.portRule.push({
              name: 'temperature',
              notnull: true,
              title: '体温'
            })
            this.checkData.temperature = this.formData.temperature
            break

          case '18':
            this.portRule.push({
              name: 'beginTime',
              notnull: true,
              title: '开始时间',
              checkType: 'beginTime'
            })
            this.checkData.beginTime = this.formData.beginTime
            break

          case '20':
            this.portRule.push({
              name: 'leaderCompanyName',
              notnull: true,
              title: '您的公司'
            })
            this.checkData.leaderCompanyName = this.formData.leaderCompanyName
            break

        }
      })


      //组合数据
      console.log(JSON.stringify(this.formData));

      var requestData = {}
      requestData.leader = {}
      requestData.interviewee = {}

      requestData.antiepidemicCert = {}
      requestData.inviter = {}

      requestData.memo = this.memo
      requestData.inviter.id = uni.getStorageSync(this.$config.uid)
      requestData.inviter.name = uni.getStorageSync(this.$config.nikeName)
      requestData.interviewee.id = uni.getStorageSync(this.$config.uid)
      requestData.interviewee.name = uni.getStorageSync(this.$config.nikeName)


      if (this.identity === 'staff') {
        requestData.proprietor = {}
        requestData.proprietor.id = uni.getStorageSync(this.$config.companyId)
        requestData.proprietor.name = uni.getStorageSync(this.$config.companyName)
      } else {
        requestData.community = {}
        requestData.house = {}
        requestData.community.id = uni.getStorageSync(this.$config.communityId)
        requestData.community.name = uni.getStorageSync(this.$config.communityName)

        requestData.house.id = uni.getStorageSync(this.$config.houseId)
        requestData.house.name = uni.getStorageSync(this.$config.houseName)
      }

      if (this.formData.beginTime) {
        requestData.beginTime = this.formData.beginTime
      }

      if (this.formData.leaderName) {
        requestData.leader.name = this.formData.leaderName
      }

      if (this.formData.leaderMobile) {
        requestData.leader.mobile = this.formData.leaderMobile
      }

      if (this.formData.endTime) {
        requestData.endTime = this.formData.endTime
      }

      if (this.formData.numberOfVisitors) {
        requestData.numberOfVisitors = this.formData.numberOfVisitors
      }

      if (this.formData.licensePlateList) {
        requestData.licensePlateList = [this.formData.licensePlateList]
      }

      if (this.nucleicCode) {
        requestData.antiepidemicCert.nucleicCode = this.nucleicCode
      }

      if (this.healthCode) {
        requestData.antiepidemicCert.healthCode = this.healthCode
      }

      if (this.tripCode) {
        requestData.antiepidemicCert.tripCode = this.tripCode
      }

      console.log(JSON.stringify(this.portRule))
      console.log(JSON.stringify(this.checkData))


      if (!validate.check(this.checkData, this.portRule,)) return;

      console.log(JSON.parse(JSON.stringify(requestData)));
      this.$apis.inviteVisitor(JSON.parse(JSON.stringify(requestData))).then(res => {
        console.log(res);

        uni.redirectTo({
          url: '../codeView/queryCode/queryCode?jobId=' + res.jobId
        })
      })

    }
  },
  created() {
    let that = this
    uni.$on('changeHouse', function (data) {
      that.title = uni.getStorageSync(that.$config.communityName) + uni.getStorageSync(that.$config
          .houseName)
      that.getFromConfig()
    })

    uni.$on('changeType', function (data) {
      that.healtchImgList = []
      that.formData = {
        numberOfVisitors: 1
      }

      if (uni.getStorageSync(that.$config.houseId) !== '' && uni.getStorageSync(that.$config
          .companyId) !== '') {
        that.identity = ''
      } else if (uni.getStorageSync(that.$config.companyId) !== '') {
        that.identity = 'staff'
        that.memo = that.memo = that.items[0]['name']
        that.title = uni.getStorageSync(that.$config.companyName)
        that.getFromConfig()
      } else {
        that.identity = 'resident'
        that.memo = that.memoData[0]['name']
        that.title = uni.getStorageSync(that.$config.communityName) + uni.getStorageSync(that.$config
            .houseName)
        that.getFromConfig()
      }
    })


    if (uni.getStorageSync(this.$config.uid) === undefined || uni.getStorageSync(this.$config.uid) === '') {
      uni.redirectTo({
        url: '../login/login'
      });
      return;
    }

    //resident 居民 //staff 员工 ‘’ 双重身份
    if (uni.getStorageSync(this.$config.houseId) !== '' && uni.getStorageSync(this.$config.companyId) !== '') {
      this.identity = ''
    } else if (uni.getStorageSync(this.$config.companyId) !== '') {
      this.identity = 'staff'
      this.memo = this.memo = this.items[0]['name']
      this.title = uni.getStorageSync(this.$config.companyName)
      this.getFromConfig()
    } else {
      this.identity = 'resident'
      this.memo = this.memo = this.memoData[0]['name']
      this.title = uni.getStorageSync(this.$config.communityName) + uni.getStorageSync(this.$config.houseName)
      this.getFromConfig()
    }


  },
  onLoad() {

  }
}
</script>

<style>
.show_more {
  color: #1890FF;
}


.item_style {
  background-color: #1890FF;
  margin: 10px;
  color: white;
  border-radius: 7px;
}

.view_box {
  margin: 20px;
  display: flex;
  line-height: 40px;
}

.input_labe {
  vertical-align: top;
  margin-right: 10px;
}

.input_sty {
  flex: 1;
  height: 40px;
  text-align: right
}

.defaluteTextStyle {
  border: 1px solid gainsboro;
  margin: 0 5px;
  border-radius: 15px;
  height: 30px;
  width: 40px;
  text-align: center;
  line-height: 30px;
}

.tipTextStyle {
  border: 1px solid #1890FF;
  /* background-color: #1890FF; */
  border-radius: 15px;
  color: #1890FF;
}

.submit {
  border: none;
  background-color: #1890FF;
  color: white;
  border-radius: 20px;
  margin: auto;
  width: 90%;
}
</style>
