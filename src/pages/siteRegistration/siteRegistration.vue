<!--<template>-->
<!--	<view>-->
<!--		<view style="margin: 15px;">-->
<!--			<img style="display: inline-block;width: 30px;height: 30px;vertical-align: top;"-->
<!--				src="../../assets/logo_visitor.png" alt="">-->
<!--			<view style="display: inline-block;line-height: 30px;margin-left: 20px;">紫竹高新技术产业开发区</view>-->
<!--		</view>-->
<!--		<view v-for="item  in fromConfigList">-->

<!--			<view class="view_box" v-if="item.formId==='1'">-->
<!--				<view class="input_labe">{{item.name}}</view>-->
<!--				<input class="input_sty" type="text" placeholder="请输入" v-model="iName">-->
<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='3'">-->
<!--				<view class="input_labe">{{item.name}}</view>-->
<!--				<uni-number-box style="text-align: right;position: absolute;right: 10px;" v-model='personNum' :min="1"-->
<!--					@change="changeValue" />-->
<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='4'">-->
<!--				<view class="input_labe">{{item.name}}</view>-->
<!--				<picker style="flex: 1;text-align: right;margin-right: 10px;" @change="bindPickerChange" :value="memo"-->
<!--					:range="memoData" mode="selector" range-key="name">-->
<!--					<view>{{memoData[momeIndex].name}}</view>-->
<!--				</picker>-->
<!--				&gt;-->

<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='5'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->
<!--				<view style="text-align: right;flex: 1;">-->
<!--					<label style="display: inline-block;" v-for="(itemb, index) in items">-->
<!--						<view style="border: 1px solid gainsboro;padding:0 5px;margin: 0 5px;border-radius: 7px;"-->
<!--							:class="{'tipTextStyle' :current===index}" v-on:click="check(index)">-->
<!--							{{itemb.name}}-->
<!--						</view>-->
<!--					</label>-->
<!--				</view>-->

<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='7'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->
<!--				<input class="input_sty" type="text" placeholder="请输入" v-model="licensePlateList">-->
<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='8'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->
<!--				<input class="input_sty" type="number" placeholder="请输入" v-model="leaderMobile">-->
<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='9'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->
<!--				<input class="input_sty" type="text" placeholder="请输入" v-model="idCardSn">-->
<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='10'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->

<!--				<uni-file-picker style="flex: 1;" ref="files" fileMediatype="image" mode="grid" @select="select"-->
<!--					@delete="deleteFile" limit="1" />-->
<!--			</view>-->


<!--			<view class="view_box" v-if="item.formId==='14'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->
<!--				<input class="input_sty" type="text" placeholder="请输入" v-model="interviewName">-->
<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='15'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->
<!--				<div style="flex: 3;"></div>-->

<!--				<div v-for="(itemc,index) in listData" style="flex: 1;display: flex;">-->
<!--					<input class="input_sty" type="number" v-model="valueData[index]" />{{itemc}}-->
<!--				</div>-->

<!--				&lt;!&ndash; <input class="input_sty" type="text" v-model="hosus" />号楼 &ndash;&gt;-->
<!--				&lt;!&ndash; <input class="input_sty" type="text" v-model="room" />室 &ndash;&gt;-->
<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='16'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->
<!--				<input class="input_sty" type="number" placeholder="请输入手机号" v-model="phoneNumber">-->
<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='17'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->
<!--				<input class="input_sty" type="text" placeholder="请输入" v-model="visitTime">-->
<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='18'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->
<!--				<input class="input_sty" type="text" placeholder="请输入" v-model="visitTime">-->
<!--			</view>-->
<!--			<view class="view_box" v-if="item.formId==='19'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->
<!--				<input class="input_sty" type="text" placeholder="请输入" v-model="visitTimeLong">-->
<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='20'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->
<!--				<input class="input_sty" type="text" placeholder="请输入" v-model="leaderCompanyName">-->
<!--			</view>-->

<!--			<view class="view_box" v-on:click="searchCompanyName" v-if="item.formId==='21'">-->
<!--				<text class="input_labe">拜访单位</text>-->
<!--				<input class="input_sty" type="text" placeholder="请输入拜访单位" :value="selectCompanyName">-->
<!--			</view>-->

<!--			<view class="view_box" v-if="item.formId==='22'">-->
<!--				<text class="input_labe">{{item.name}}</text>-->

<!--				<div style="display: flex;justify-content:flex-end;flex: 1;">-->
<!--					<div style="height: 60px;width: 60px;background-color: aquamarine;margin: 10px;"-->
<!--						v-for="(itema,index) in healthitem" v-on:click="select($event,index)">-->
<!--						{{item}}-->

<!--					</div>-->
<!--				</div>-->

<!--			</view>-->

<!--		</view>-->

<!--		<view style="overflow: hidden" v-if="isShowMore">-->
<!--			<view class="show_more">-->
<!--				更多-->
<!--				<img style="color: #1890FF;width: 20px;height: 20px;" src="../../assets/ic_downdown.png" alt="">-->
<!--			</view>-->
<!--		</view>-->

<!--		<button type="primary" style="margin: 0 20px;" v-on:click="submit">提交</button>-->

<!--		<view style="text-align: right;margin: 10px 20px;">-->

<!--			地址 | {{address}}-->

<!--		</view>-->

<!--	</view>-->
<!--</template>-->

<!--<script>-->
<!--	export default {-->
<!--		data() {-->
<!--			return {-->
<!--				//拜访姓名-->
<!--				iName: '',-->
<!--				//拜访身份证-->
<!--				idCardSn: '',-->
<!--				//车牌-->
<!--				licensePlateList: '',-->
<!--				//拜访者公司名称-->
<!--				leaderCompanyName: '',-->
<!--				//拜访者手机号-->
<!--				leaderMobile: '',-->
<!--				//邀请者姓名-->
<!--				interviewName: '',-->
<!--				//邀请者公司名称-->
<!--				interviewCompanyName: '',-->
<!--				//拜访时间-->
<!--				visitTime: '',-->
<!--				//受访者手机号-->
<!--				phoneNumber: '',-->
<!--				//受访者公司名称-->
<!--				selectCompanyName: '',-->
<!--				//受访者公司Id-->
<!--				selectCompanyId: '',-->
<!--				//头像-->
<!--				fileKey: '',-->
<!--				//区域ID-->
<!--				areaId: '',-->
<!--				// 物业公司id-->
<!--				propertyId: '',-->
<!--				//提交按钮控制-->
<!--				btnDisabled: false,-->
<!--				//小区名称-->
<!--				communityName: '',-->
<!--				//小区ID-->
<!--				communityId: '',-->
<!--				// 来访人数-->
<!--				personNum: 1,-->
<!--				isShowMore: false,-->
<!--				memo: '请选择',-->
<!--				//来访事由下标-->
<!--				momeIndex: 0,-->
<!--				//头像fileKey-->
<!--				imageValue: '',-->
<!--				listImage: [],-->
<!--				hosus: '',-->
<!--				room: '',-->
<!--				items: [{-->
<!--					value: '1',-->
<!--					name: '面试',-->
<!--				}, {-->
<!--					value: '2',-->
<!--					name: '商务'-->
<!--				}, {-->
<!--					value: '3',-->
<!--					name: '私人'-->
<!--				}, {-->
<!--					value: '4',-->
<!--					name: '其他'-->
<!--				}, ],-->
<!--				memoData: [{-->
<!--					name: '访友'-->
<!--				}, {-->
<!--					name: '送货'-->
<!--				}, {-->
<!--					name: '家政'-->
<!--				}, {-->
<!--					name: '装修'-->
<!--				}, {-->
<!--					name: '看房'-->
<!--				}, {-->
<!--					name: '其他'-->
<!--				}],-->
<!--				current: 0,-->
<!--				fromConfigList: [],-->
<!--				address: '',-->
<!--				listData: [],-->
<!--				valueData: [],-->
<!--				//防疫证明item-->
<!--				healthitem: [],-->
<!--				housePropertyName: ""-->


<!--			}-->
<!--		},-->
<!--		methods: {-->
<!--			searchCompanyName() {-->
<!--				console.log(1232);-->
<!--				let that = this-->
<!--				uni.navigateTo({-->
<!--					url: '../siteRegistration/searchCompanyName/searchCompanyName?areaId=' + this.areaId,-->
<!--					events: {-->
<!--						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据-->
<!--						selectCompany: function(data) {-->

<!--							console.log(data)-->
<!--							that.selectCompanyId = data.data['selectCompanyId']-->
<!--							that.selectCompanyName = data.data['selectCompanyName']-->
<!--							that.propertyId = data.data['propertyId']-->
<!--						},-->
<!--						someEvent: function(data) {-->
<!--							console.log(data)-->
<!--						}-->
<!--					},-->
<!--				});-->
<!--			},-->
<!--			changeSelect(res) {-->
<!--				console.log(res);-->
<!--			},-->
<!--			check(res) {-->
<!--				this.current = res-->
<!--				this.memo = this.items[this.current]['name']-->
<!--				console.log(res + this.memo);-->
<!--			},-->
<!--			selectTime: function(evt) {-->
<!--				console.log(evt);-->
<!--			},-->
<!--			changeValue(e) {-->
<!--				console.log(e);-->
<!--			},-->
<!--			bindPickerChange(data) {-->
<!--				this.momeIndex = data.detail.value-->
<!--				this.memo = this.memoData[this.momeIndex]['name']-->
<!--				console.log(this.momeIndex);-->
<!--			},-->
<!--			select(e) {-->
<!--				console.log('选择文件：', e)-->
<!--				console.log('选择文件：', e.tempFilePaths[0])-->
<!--				console.log('选择文件：', e.tempFiles[0]['file'])-->

<!--				//小程序端-->
<!--				let that = this;-->

<!--				uni.getFileSystemManager().readFile({-->
<!--					filePath: e.tempFilePaths[0], //参数path:图片相对路径-->
<!--					success: res => {-->
<!--						console.log(res.data);-->

<!--						this.$apis.uploadImages(res.data).then(res => {-->
<!--							console.log(res);-->
<!--							that.fileKey = res['fileKey']-->
<!--						})-->

<!--					},-->
<!--					fail: err => {-->
<!--						console.log(err)-->
<!--					}-->
<!--				})-->

<!--			},-->
<!--			deleteFile(e) {-->
<!--				console.log('删除文件：', e)-->
<!--				this.fileKey = ''-->
<!--			},-->
<!--			selectHS(e, index) {-->
<!--				uni.chooseImage({-->
<!--					count: 1, //默认9-->
<!--					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有-->
<!--					sourceType: ['album'], //从相册选择-->
<!--					success: function(res) {-->

<!--						console.log(res);-->

<!--						console.log(JSON.stringify(res.tempFilePaths));-->
<!--					}-->
<!--				});-->
<!--				console.log('选择文件：', e)-->
<!--			},-->
<!--			deleteFileHS(e, index) {-->
<!--				console.log('删除文件：', e)-->
<!--			},-->
<!--			submit() {-->
<!--				this.housePropertyName = ''-->

<!--				for (let i = 0; i < this.valueData.length; i++) {-->
<!--					this.housePropertyName += this.valueData[i] + this.listData[i]-->
<!--				}-->

<!--				console.log(this.housePropertyName);-->

<!--				let jsonParams = {-->
<!--					"memo": this.memo,-->
<!--					"property": {-->
<!--						"id": this.propertyId || null,-->
<!--						"name": "访客物业公司",-->
<!--						"type": "visitor-property"-->
<!--					},-->
<!--					"interviewee": {-->
<!--						"name": this.interviewName || null,-->
<!--						"mobile": this.phoneNumber || null-->
<!--					},-->
<!--					"proprietor": {-->
<!--						"id": this.selectCompanyId || null,-->
<!--						"name": this.selectCompanyName || null,-->
<!--					},-->
<!--					"leader": {-->
<!--						"visitorId": uni.getStorageSync(this.$config.personId),-->
<!--						"companyName": this.leaderCompanyName || null,-->
<!--						"name": this.iName || null,-->
<!--						"mobile": this.leaderMobile || null,-->
<!--						"idCardSn": this.idCardSn || null,-->
<!--						"photoKey": this.fileKey || null-->
<!--					},-->
<!--					"beginTime": this.visitTime || null,-->
<!--					"houses": {-->
<!--						"houseName": this.housePropertyName || null,-->
<!--						"communityId": this.communityId || null,-->
<!--						"communityName": this.communityName || null,-->

<!--					},-->
<!--					"licensePlateList": this.licensePlateList || null,-->
<!--					"numberOfVisitors": this.personNum-->
<!--				}-->

<!--				this.$apis.creatVisitor(jsonParams).then(res => {-->
<!--					console.log(res);-->
<!--				})-->

<!--				console.log(jsonParams);-->


<!--			},-->
<!--			communityRoomFormat() {-->
<!--				this.$apis.communityRoomFormat({-->
<!--					"communityId": this.communityId-->
<!--				}).then(res => {-->
<!--					console.log(res);-->
<!--					this.listData = res['name'].toString().split("/")-->
<!--				})-->

<!--			},-->
<!--			findCommunity() {-->
<!--				this.$apis.findCommunity({-->
<!--					'ids': this.communityId,-->
<!--				}).then(res => {-->
<!--					this.communityName = res['communityList'][0]['communityObj']['name']-->

<!--					// this.results = res['communityList']-->
<!--					console.log(res);-->

<!--				})-->
<!--			}-->

<!--		},-->
<!--		onLoad(option) {-->
<!--			this.areaId = option.areaId-->
<!--			this.$apis.getCommunityFormConfig({-->
<!--				"communityId": this.areaId-->
<!--			}).then(res => {-->
<!--				let fromType-->

<!--				this.address = res['address']-->

<!--				let fromKeys = Object.keys(res['formConfigPojo'])-->

<!--				if (fromKeys.includes('house')) {-->
<!--					fromType = "house"-->
<!--				} else if (fromKeys.includes('park')) {-->
<!--					fromType = "park"-->
<!--				} else {-->
<!--					fromType = "all"-->
<!--				}-->

<!--				this.fromConfigList = res['formConfigPojo'][fromType]['onSite']-->

<!--				//找出防疫证明的项目-->
<!--				this.fromConfigList.forEach(e => {-->
<!--					console.log(e);-->
<!--					if (e['formId'] === "11" || e['formId'] === "12" || e['formId'] === "13") {-->
<!--						this.healthitem.push(e)-->
<!--					}-->
<!--				})-->

<!--				this.communityId = res['formConfigPojo']['communityId']-->
<!--				//获取房号格式-->
<!--				if (fromType !== "park") {-->
<!--					this.communityRoomFormat()-->
<!--					this.findCommunity()-->
<!--					this.memo = this.memoData[0]['name']-->
<!--				} else {-->
<!--					this.memo = this.items[0]['name']-->
<!--				}-->

<!--				console.log(res);-->
<!--			})-->

<!--		}-->
<!--	}-->
<!--</script>-->

<!--<style>-->
<!--	.view_box {-->
<!--		margin: 20px;-->
<!--		display: flex;-->
<!--		line-height: 40px;-->
<!--	}-->

<!--	.input_labe {-->
<!--		vertical-align: top;-->
<!--		margin-right: 10px;-->
<!--	}-->

<!--	.input_sty {-->
<!--		flex: 1;-->
<!--		height: 40px;-->
<!--		text-align: right-->
<!--	}-->

<!--	.tipTextStyle {-->
<!--		background-color: #1890FF;-->
<!--		border-radius: 7px;-->
<!--		color: white;-->
<!--	}-->

<!--	.show_more {-->
<!--		position: absolute;-->
<!--		right: 20px;-->
<!--	}-->

<!--	.show_more::after {-->
<!--		clear: both;-->
<!--		content: '';-->
<!--		display: block;-->
<!--	}-->
<!--</style>-->
