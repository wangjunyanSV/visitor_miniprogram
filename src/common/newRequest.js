let isRefreshing = true;
let subscribers = [];

let baseUrl = "https://lan.truthvision.com/dev" //后台请求接口的公共部分

// let baseUrl = "https://lan.truthvision.com/tml" //后台请求接口的公共部分
// let baseUrl = "https://lan.truthvision.com/test" //后台请求接口的公共部分

function onAccessTokenFetched() {
	subscribers.forEach((callback) => {
		callback();
	})
	subscribers = [];
}

function addSubscriber(callback) {
	subscribers.push(callback)
}
import * as config from './Config.js'

export class Http {
	constructor() {}

	request({
		url,
		data = {},
		method,
		header,
		callback = '',
		contentType,
	} = {}) {

		let _this = this;
		let head = {

		}

		if (uni.getStorageSync(config.default.accessToken) !== undefined && uni.getStorageSync(config.default
				.accessToken) !== '') {
			head = {
				"accessToken": uni.getStorageSync(config.default.accessToken),
				'Content-Type': contentType !== undefined ? contentType : 'application/json;charset=UTF-8',
				"wxUnionId": uni.getStorageSync(config.default.wxUnionId),
				"wxOpenId": uni.getStorageSync(config.default.wxOpenId)
			}

		} else {
			head = {
				'Content-Type': 'application/json;charset=UTF-8',
			}
		};


		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				data,
				method,
				header: header != null ? header : head,
				callback,
				fail(res) {
					reject(res)
				},
				complete: res => {
					// callback token过期后重新请求接口，接口返回的数据
					if (callback) return callback(res.data);
					let statusCode = res.statusCode;
					let errText = res.data.msg;
					console.log(statusCode, res)
					if (statusCode == 404) {
						reject(res)
						console.log('数据不存在')
					} else if (statusCode == 422) {
						// 将需要重新执行的接口缓存到一个队列中
						addSubscriber(() => {
							_this.request({
								url,
								data,
								method,
								header,
								callback: resolve
							})
						})

						if (isRefreshing) {
							console.log("token 过期");
							getNewToken().then(() => {
								// 依次去执行缓存的接口
								onAccessTokenFetched();
								isRefreshing = true;
							})
						}
						isRefreshing = false;
					} else if (statusCode >= 200 && statusCode < 300) {
						// 登录成功，抛出数据
						console.log(res.data);
						resolve(res.data)
					} else {
						reject(res)
						// uni.showModal({
						// 	content: '服务器报错，请重试！',
						// 	showCancel: false
						// });
					}
				}
			})
		})
	}





}



// 获取token，token请求的接口通过形参传进来
const getNewToken = () => {
	return new Promise((resolve, reject) => {
		console.log("log----");

		uni.login({
			success(res) {
				console.log(res)
				console.log(res.code)
				uni.request({
					url: baseUrl + '/api1/weixin/third-platform/miniprogram?code=' +
						res["code"] + '&originId=gh_ae374b20f98c',
					method: 'GET',
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					success(res) {
						console.log(res.data);

						uni.setStorage({
							key: config.default.accessToken,
							data: res.data.platformAccessToken,
							success() {
								resolve(res);
							}
						})

					}
				})
			},
			fail(err) {
				reject()
				console.error('uni login fail', err);
			}
		});
	})
}
