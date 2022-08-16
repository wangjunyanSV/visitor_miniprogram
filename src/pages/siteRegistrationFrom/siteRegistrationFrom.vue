<template>
	<view style="padding: 20px;">

		<uni-forms ref="form" :modelValue="formData">

			<div v-for="item  in requestData">
				<uni-forms-item name='leaderName' label="访客姓名" v-if="item.formId==='1'">
					<uni-easyinput v-model="formData.leaderName" placeholder="请输入姓名" />
				</uni-forms-item>

				<uni-forms-item label="来访人数" v-if="item.formId==='3'">
					<uni-number-box style="text-align: right;position: absolute;right: 10px;"
						v-model='formData.numberOfVisitors' :min="1" />
				</uni-forms-item>

				<uni-forms-item label="来访事由" v-if="item.formId==='4'">
					<picker style="text-align: right;margin-right: 10px;" @change="bindPickerChange" :value="memo"
						:range="memoData" mode="selector" range-key="name">
						<view>{{ memoData[momeIndex].name }} &nbsp;&nbsp;&nbsp;&gt;</view>
					</picker>
				</uni-forms-item>

				<uni-forms-item label="来访事由" v-if="item.formId==='5'">
					<view style="text-align: right;flex: 1;">
						<label style="display: inline-block;" v-for="(itemb, index) in items">
							<view style="border: 1px solid gainsboro;padding:0 5px;margin: 0 5px;border-radius: 7px;"
								:class="{'tipTextStyle' :current===index}" v-on:click="check(index)">
								{{ itemb.name }}
							</view>
						</label>
					</view>
				</uni-forms-item>

				<uni-forms-item label="访客证\n有效期" v-if="item.formId==='6'||item.formId==='19'" name="endTime">
					<uni-datetime-picker style="position: absolute;right: 0;" v-model="formData.endTime"
						:clearIcon="false" />
				</uni-forms-item>

				<uni-forms-item label="车牌号" v-if="item.formId==='7'" name='licensePlateList'>
					<uni-easyinput v-model="formData.licensePlateList" placeholder="请输入车牌号" />
				</uni-forms-item>

				<uni-forms-item label="手机号" v-if="item.formId==='8'" name='leaderMobile'>
					<uni-easyinput v-model="formData.leaderMobile" placeholder="请输入手机号" />
				</uni-forms-item>

				<uni-forms-item label="身份证" v-if="item.formId==='9'" name='idCardSn'>
					<uni-easyinput v-model="formData.leaderIdCardSn" placeholder="请输入身份证号" />
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

<!--          <uni-file-picker-->
<!--              disable-preview-->
<!--              :del-icon="false"-->
<!--              return-type="object"-->
<!--          >选择头像</uni-file-picker>-->

<!--          <uni-file-picker style="flex: 1;" ref="files" fileMediatype="image" mode="grid" @select="select"-->
<!--                           @delete="deleteFile" :limit="1" />-->


				</uni-forms-item>

				<uni-forms-item label="被访人姓名" v-if="item.formId==='14'" name='intervieweeName'>
					<uni-easyinput v-model="formData.intervieweeName" placeholder="请输入被访人姓名" />
				</uni-forms-item>

				<uni-forms-item label="房号" v-if="item.formId==='15'">
					<div style="display: flex;">
						<div v-for="(itemc,index) in listData" style="display: flex;line-height: 40px;">
							<uni-easyinput :clearable="false" class="input_sty" type="number"
								v-model="valueData[index]" />
							{{ itemc }}
						</div>
					</div>

				</uni-forms-item>

				<uni-forms-item label="被访者手机号码" v-if="item.formId==='16'" name='intervieweemobile'>
					<uni-easyinput type="number" v-model="formData.intervieweeMobile" placeholder="请输入手机号" />

				</uni-forms-item>

				<uni-forms-item label="体温" v-if="item.formId==='17'" name='temperature'>
					<uni-easyinput type="number" v-model="formData.antiepidemicCertTemperature" placeholder="请输入体温" />
				</uni-forms-item>

				<uni-forms-item label="来访时间" v-if="item.formId==='18'" name='beginTime'>
					<uni-datetime-picker style="position: absolute;right: 0;" v-model="formData.beginTime"
						:clearIcon="false" />
				</uni-forms-item>


				<uni-forms-item label="访客单位" v-if="item.formId==='20'" name='leaderCompanyName'>
					<uni-easyinput v-model="formData.leaderCompanyName" placeholder="请输入访客单位" />
				</uni-forms-item>

				<uni-forms-item label="拜访单位" v-if="item.formId==='21'">
					<input v-on:click="searchCompanyName" style="height: 36px;font-size: 12px;" type="text"
						placeholder="请输入拜访单位" :value="selectCompanyName">
				</uni-forms-item>

				<uni-forms-item label="防疫证明" v-if="item.formId==='22'">
					<div style="display: flex;justify-content:flex-end;flex: 1;">
						<div style="height: 60px;width: 60px;background-color:#eeeeee;margin: 10px;"
							v-for="(itema,index) in healthitem" v-on:click="selectHS($event,itema.formId,index)">
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

			<view style="display: flex;justify-content: flex-end;margin: 10px 0" v-if="isshowMore"
				v-on:click="showMoreItem">
				<view style="color: #1890FF;">
					选填 &nbsp;
					<img v-if="!showMore" style="color: #1890FF;width: 14px;height: 14px;vertical-align: middle;"
						src="../../assets/ic_downdown.png" alt="">
					<img v-if="showMore" style="color: #1890FF;width: 14px;height: 14px;vertical-align: middle;"
						src="../../assets/ic_upup.png" alt="">
				</view>
			</view>

			<div v-for="item in noMustRequestData" v-if="showMore">
				<uni-forms-item name='leaderName' label="访客姓名" v-if="item.formId==='1'">
					<uni-easyinput v-model="formData.leaderName" placeholder="请输入姓名" />
				</uni-forms-item>

				<uni-forms-item label="来访人数" v-if="item.formId==='3'">
					<uni-number-box style="text-align: right;position: absolute;right: 10px;"
						v-model='formData.numberOfVisitors' :min="1" />
				</uni-forms-item>

				<uni-forms-item label="来访事由" v-if="item.formId==='4'">
					<picker style="text-align: right;margin-right: 10px;" @change="bindPickerChange" :value="memo"
						:range="memoData" mode="selector" range-key="name">
						<view>{{ memoData[momeIndex].name }} &nbsp;&nbsp;&nbsp;&gt;</view>
					</picker>
				</uni-forms-item>

				<uni-forms-item label="来访事由" v-if="item.formId==='5'">
					<view style="text-align: right;flex: 1;">
						<label style="display: inline-block;" v-for="(itemb, index) in items">
							<view style="border: 1px solid gainsboro;padding:0 5px;margin: 0 5px;border-radius: 7px;"
								:class="{'tipTextStyle' :current===index}" v-on:click="check(index)">
								{{ itemb.name }}
							</view>
						</label>
					</view>
				</uni-forms-item>

				<uni-forms-item label="访客证\n有效期" v-if="item.formId==='6'||item.formId==='19'" name="endTime">
					<uni-datetime-picker style="position: absolute;right: 0;" v-model="formData.endTime"
						:clearIcon="false" />
				</uni-forms-item>

				<uni-forms-item label="车牌号" v-if="item.formId==='7'" name='licensePlateList'>
					<uni-easyinput v-model="formData.licensePlateList" placeholder="请输入车牌号" />
				</uni-forms-item>

				<uni-forms-item label="手机号" v-if="item.formId==='8'" name='leaderMobile'>
					<uni-easyinput v-model="formData.leaderMobile" placeholder="请输入手机号" />
				</uni-forms-item>

				<uni-forms-item label="身份证" v-if="item.formId==='9'" name='idCardSn'>
					<uni-easyinput v-model="formData.leaderIdCardSn" placeholder="请输入身份证号" />
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

<!--					<uni-file-picker style="flex: 1;" ref="files" fileMediatype="image" mode="grid" @select="select"-->
<!--						@delete="deleteFile" :limit="1" />-->

				</uni-forms-item>

				<uni-forms-item label="被访人姓名" v-if="item.formId==='14'" name='intervieweeName'>
					<uni-easyinput v-model="formData.intervieweeName" placeholder="请输入被访人姓名" />
				</uni-forms-item>

				<uni-forms-item label="房号" v-if="item.formId==='15'">
					<div style="display: flex;">
						<div v-for="(itemc,index) in listData" style="display: flex;line-height: 40px;">
							<uni-easyinput :clearable="false" class="input_sty" type="number"
								v-model="valueData[index]" />
							{{ itemc }}
						</div>
					</div>

				</uni-forms-item>

				<uni-forms-item label="被访者手机号码" v-if="item.formId==='16'" name='intervieweemobile'>
					<uni-easyinput type="number" v-model="formData.intervieweeMobile" placeholder="请输入手机号" />

				</uni-forms-item>

				<uni-forms-item label="体温" v-if="item.formId==='17'" name='temperature'>
					<uni-easyinput type="number" v-model="formData.antiepidemicCertTemperature" placeholder="请输入体温" />
				</uni-forms-item>

				<uni-forms-item label="来访时间" v-if="item.formId==='18'" name='beginTime'>
					<uni-datetime-picker style="position: absolute;right: 0;" v-model="formData.beginTime"
						:clearIcon="false" />
				</uni-forms-item>


				<uni-forms-item label="访客单位" v-if="item.formId==='20'" name='leaderCompanyName'>
					<uni-easyinput v-model="formData.leaderCompanyName" placeholder="请输入访客单位" />
				</uni-forms-item>

				<uni-forms-item label="拜访单位" v-if="item.formId==='21'">
					<input v-on:click="searchCompanyName" style="height: 36px;font-size: 12px;" type="text"
						placeholder="请输入拜访单位" :value="selectCompanyName">
				</uni-forms-item>

				<uni-forms-item label="防疫证明" v-if="item.formId==='22'">
					<div style="display: flex;justify-content:flex-end;flex: 1;">
						<div style="height: 60px;width: 60px;background-color:#eeeeee;margin: 10px;"
							v-for=" (itema,index) in healthitem" v-on:click="selectHS($event,itema.formId,index,)">
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

		<button type="primary" style="margin: 0 20px;" v-on:click="submitForm">提交</button>

		<view style="text-align: right;margin: 10px 20px;">

			地址 | {{ address }}

		</view>


	</view>
</template>

<script>
	import validate from "../../utils/fromvalidate";

	export default {
		data() {
			return {
        headImg:"",
				formData: {
					numberOfVisitors: 1
				},
				//拜访时间
				visitTime: '',
				//受访者手机号
				// phoneNumber: '',
				//受访者公司名称
				selectCompanyName: '',
				//受访者公司Id
				selectCompanyId: '',
				//头像
				fileKey: '',
				//区域ID
				areaId: '',
				// 物业公司id
				propertyId: '',
				//提交按钮控制
				btnDisabled: false,
				//小区名称
				communityName: '',
				//小区ID
				communityId: '',
				isShowMore: false,

				memo: '请选择',
				//来访事由下标
				momeIndex: 0,

				listImage: [],
				current: 0,
				requestData: [],
				noMustRequestData: [],
				address: '',
				listData: [],
				valueData: [],
				//防疫证明item
				healthitem: [],
				//核酸码
				nucleicCode: '',
				//健康码
				healthCode: '',
				//行程码
				tripCode: '',
				housePropertyName: "",
				//结束时间
				endTime: "",

				items: [{
					value: '1',
					name: '面试',
				}, {
					value: '2',
					name: '商务'
				}, {
					value: '3',
					name: '私人'
				}, {
					value: '4',
					name: '其他'
				}, ],
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
				healtchImgList: [],
				fromConfigList: [],
				//图片控制
				showMore: false,
				//显示更多
				isshowMore: false,
				//校验规则
				portRule: [],
				//校验的数据
				checkData: {},
			}
		},
		methods: {
      selectHeadImg(){

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
			searchCompanyName() {
				console.log(1232);
				let that = this
				uni.navigateTo({
					url: '../siteRegistration/searchCompanyName/searchCompanyName?areaId=' + this.areaId,
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						selectCompany: function(data) {

							console.log(data)
							that.selectCompanyId = data.data['selectCompanyId']
							that.selectCompanyName = data.data['selectCompanyName']
							that.propertyId = data.data['propertyId']
						},
						someEvent: function(data) {
							console.log(data)
						}
					},
				});
			},
			changeSelect(res) {
				console.log(res);
			},
			check(res) {
				this.current = res
				this.memo = this.items[this.current]['name']
				console.log(res + this.memo);
			},
			selectTime: function(evt) {
				console.log(evt);
			},

			bindPickerChange(data) {
				this.momeIndex = data.detail.value
				this.memo = this.memoData[this.momeIndex]['name']
				console.log(this.momeIndex);
			},
			select(e) {
				console.log('选择文件：', e)
				console.log('选择文件：', e.tempFilePaths[0])
				// console.log('选择文件：', e.tempFiles[0]['file'])
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
			communityRoomFormat() {
				let that = this

				this.$apis.communityRoomFormat({
					"communityId": this.communityId
				}).then(res => {
					console.log(res);
					that.listData = res['name'].toString().split("/")
					console.log(JSON.stringify(that.listData));
				})

			},
			findCommunity() {
				this.$apis.findCommunity({
					'ids': this.communityId,
				}).then(res => {
					this.communityName = res['communityList'][0]['communityObj']['name']

					// this.results = res['communityList']
					console.log(res);

				})
			},

			selectHS(e, formId, index) {

				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {

						uni.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0], //参数path:图片相对路径
							success: res => {
								console.log(res.data);
								console.log(formId);

								that.$apis.uploadImages(res.data).then(res => {
									console.log(res.downloadUrl);
									console.log(formId);

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
			deleteFileHS(e, index) {
				console.log('删除文件：', e)
			},
			submitForm() {
				this.portRule = []

				console.log(this.nucleicCode)

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

						case '15':
							this.housePropertyName = ''
							for (let i = 0; i < this.valueData.length; i++) {
								this.housePropertyName += this.valueData[i] + this.listData[i]
							}
							this.portRule.push({
								name: 'housePropertyName',
								notnull: false,
								title: '房号'
							})
							this.checkData.housePropertyName = this.formData.housePropertyName
							break
						case '16':
							this.portRule.push({
								name: 'intervieweeMobile',
								notnull: true,
								title: '被访人手机号',
								checkType: 'intervieweeMobile'
							})
							this.checkData.intervieweeMobile = this.formData.intervieweeMobile
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
				requestData.property = {}
				requestData.interviewee = {}
				requestData.proprietor = {}
				requestData.house = {}
				requestData.community = {}
				requestData.antiepidemicCert = {}

				requestData.memo = this.memo

				if (this.propertyId) {
					requestData.property.id = this.propertyId
				}

				if (this.formData.intervieweeName) {
					requestData.interviewee.name = this.formData.intervieweeName
				}

				if (this.formData.intervieweeMobile) {
					requestData.interviewee.mobile = this.formData.intervieweeMobile
				}

				requestData.leader.visitorId = uni.getStorageSync(this.$config.personId)

				if (this.formData.leaderCompanyName) {
					requestData.leader.companyName = this.formData.leaderCompanyName
				}

				if (this.formData.leaderName) {
					requestData.leader.name = this.formData.leaderName
				}

				if (this.formData.leaderMobile) {
					requestData.leader.mobile = this.formData.leaderMobile
				}

				if (this.formData.leaderIdCardSn) {
					requestData.leader.idCardSn = this.formData.leaderIdCardSn
				}

				if (this.fileKey) {
					requestData.leader.photoKey = this.fileKey
				}

				if (this.formData.beginTime) {
					requestData.beginTime = this.formData.beginTime
				}

				if (this.formData.endTime) {
					requestData.endTime = this.formData.endTime
				}

				this.housePropertyName = ''
				for (let i = 0; i < this.valueData.length; i++) {
					this.housePropertyName += this.valueData[i] + this.listData[i]
				}

				if (this.housePropertyName) {
					requestData.house.name = this.housePropertyName
				}

				if (this.communityId) {
					requestData.community.id = this.communityId
				}

				if (this.communityName) {
					requestData.community.name = this.communityName
				}

				if (this.formData.numberOfVisitors) {
					requestData.numberOfVisitors = this.formData.numberOfVisitors
				}

				if (this.formData.licensePlateList) {
					requestData.licensePlateList = [this.formData.licensePlateList]
				}

				if (this.formData.numberOfVisitors) {
					requestData.numberOfVisitors = this.formData.numberOfVisitors
				}

				if (this.formData.antiepidemicCertTemperature) {
					requestData.antiepidemicCert.temperature = this.formData.antiepidemicCertTemperature
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

				if (this.selectCompanyId) {
					requestData.proprietor.name = this.selectCompanyId
					requestData.proprietor.id = this.selectCompanyId
				}


				console.log(JSON.stringify(this.portRule))
				console.log(JSON.stringify(this.checkData))


				if (!validate.check(this.checkData, this.portRule, )) return;
				console.log(JSON.stringify(requestData))

				this.$apis.creatVisitor(JSON.parse(JSON.stringify(requestData))).then(res => {
					console.log(res);
					uni.redirectTo({
						url: '../codeView/queryCode/queryCode?jobId=' + res.jobId
					})

				}).catch(err => {
          console.log(err)
          switch (err.data.code) {
            case 400102015: {
              uni.showToast({
                title: '开始时间早于当前时间',
                icon: "none"
              })
              break
            }
            case 400102016: {
              uni.showToast({
                title: '结束时间早于开始时间',
                icon: "none"
              })
              break
            }
            case 404102012: {
              uni.showToast({
                title: '拜访的房产不存在',
                icon: "none"
              })
              break
            }
            case 400102020: {
              uni.showToast({
                title: '被拜访人不存在',
                icon: "none"
              })
              break
            }

          }
				})

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
					that.isshowMore = true
				} else {
					that.isshowMore = false
				}


			},
			created() {

			},
			onReady() {

			},
			onLoad(option) {

				this.areaId = option.areaId
        uni.showLoading({
          mask:true
        })
				this.$apis.getCommunityFormConfig({
					"communityId": this.areaId
				}).then(res => {
          uni.hideLoading()
					let fromType
					this.address = res['address']
					let fromKeys = Object.keys(res['formConfigPojo'])
					if (fromKeys.includes('house')) {
						fromType = "house"
					} else if (fromKeys.includes('park')) {
						fromType = "park"
					} else {
						fromType = "all"
					}

					//现场登记的数据
					this.fromConfigList = []
					this.fromConfigList = res['formConfigPojo'][fromType]['onSite']

					this.makedata()

					//找出防疫证明的项目
					this.fromConfigList.forEach(e => {
						if (e['formId'] === "11" || e['formId'] === "12" || e['formId'] === "13") {
							this.healthitem.push(e)
						}
					})

					this.communityId = res['formConfigPojo']['communityId']
					//获取房号格式
					if (fromType !== "park") {
						this.communityRoomFormat()
						this.findCommunity()
						this.memo = this.memoData[0]['name']
					} else {
						this.memo = this.items[0]['name']
					}

					console.log(res);
				}).catch(err => {
          console.log("数据出错")

          uni.hideLoading()
					if (err.statusCode === 404) {
						uni.showToast({
							title: "查询小区失败",
							icon: "none"
						})
						setTimeout(() => {
							uni.navigateBack({})
						}, 1000)

					}

				})

			}
		},
	}
</script>

<style>
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
		height: 40px;
		width: 60px;
		line-height: 40px;
		text-align: right;
	}

	.tipTextStyle {
		background-color: #1890FF;
		border-radius: 7px;
		color: white;
	}
</style>
