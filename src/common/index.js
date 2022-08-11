import {
	Http
} from './newRequest';

import {
	job_url,
	job_papers_url,
	user_url,
	find_community,
	register_authCode,
	register,
	bind_wx,
	community_roomformat,
	owner_house,
	user_identifier,
	pass_code_record,
	review_event,
	pass_code,
	miniprogram_community_form,
	proprietor_url,
	file_image_url,
	api1_file,
	job_form,
	file_url,
	job_event_url,
	job_url_miniprogram,
	miniprogram_community_config_form_proprietor,
	api1_papers_share,
	job_visitor_form

} from './common';

export class Index extends Http {
	constructor() {
		super();
	}

	// 小程序登录 换取openid unionid
	login(code) {
		return this.request({
			url: '/api1/weixin/third-platform/miniprogram?code=' +
				code + '&originId=gh_ae374b20f98c',
			method: 'GET',
		});
	}

	//拜访记录
	getJobDetail(data) {
		return this.request({
			url: job_url,
			method: 'GET',
			data: data
		});
	}

	//获取访客证
	getVisitorCode(data) {
		return this.request({
			url: job_papers_url,
			method: 'GET',
			data: data
		});

	}
	//获取个人信息
	getUerDetail(data) {
		return this.request({
			url: user_url,
			method: 'GET',
			data: data
		});
	}

	//查找小区
	findCommunity(data) {
		return this.request({
			url: find_community,
			method: 'GET',
			data: data
		});
	}

	//发送验证码
	registerAuthCode(data) {
		return this.request({
			url: register_authCode,
			method: 'POST',
			data: data,
			contentType: "application/x-www-form-urlencoded"
		});
	}

	//注册
	register(data) {
		return this.request({
			url: register,
			method: 'POST',
			data: data,
			contentType: "application/x-www-form-urlencoded"

		});
	}

	//绑定微信
	putBindWx(data) {
		return this.request({
			url: bind_wx,
			method: 'POST',
			data: data,
			contentType: "application/x-www-form-urlencoded"
		});
	}

	//获取图片地址
	getFileUrl(data) {
		return this.request({
			url: file_url,
			method: 'GET',
			data: data,
		});
	}

	//查询房号格式
	communityRoomFormat(data) {
		return this.request({
			url: community_roomformat,
			method: 'GET',
			data: data
		});
	}

	//房屋认证
	ownerHouse(data) {
		return this.request({
			url: owner_house,
			method: 'POST',
			data: data,
		});
	}

	//认证工单
	userIdentifier(data) {
		return this.request({
			url: user_identifier,
			method: 'GET',
			data: data
		});
	}

	//认证工单
	getPassCodeRecord(data) {
		return this.request({
			url: pass_code_record,
			method: 'GET',
			data: data
		});
	}

	//撤销认证工单 业主审核租客或家人
	reviewEvent(data) {
		return this.request({
			url: review_event,
			method: 'POST',
			data: data,
		});
	}

	// 获取通行码
	getPassCode(data) {
		return this.request({
			url: pass_code,
			method: 'GET',
			data: data,
		});
	}

	// 查询表单配置 for 小区
	getCommunityFormConfig(data) {
		return this.request({
			url: miniprogram_community_form,
			method: 'GET',
			data: data,
		});
	}

	// 查询表单配置 for 业主公司
	getProprietorFormConfig(data) {
		return this.request({
			url: miniprogram_community_config_form_proprietor,
			method: 'GET',
			data: data,
		});
	}

	// 查询区域公司
	getCompany(data) {
		return this.request({
			url: proprietor_url,
			method: 'GET',
			data: data,
		});
	}

	// 上传图片
	uploadImages(data) {
		return this.request({
			url: api1_file,
			method: 'POST',
			data: data,
		});
	}

	// 创建访客工单
	creatVisitor(data) {
		return this.request({
			url: job_form,
			method: 'POST',
			data: data,
		});
	}
	// 创建访客工单
	inviteVisitor(data) {
		return this.request({
			url: job_visitor_form,
			method: 'POST',
			data: data,
		});
	}

	// 审核 拒绝访客
	postJobEvent(data) {
		return this.request({
			url: job_event_url,
			method: 'POST',
			data: data,
		});
	}

	// 来访记录
	accessRecord(data) {
		return this.request({
			url: job_url_miniprogram,
			method: 'GET',
			data: data,
		});
	}

	// 获取分享的访客证
	getPapersShare(data) {
		return this.request({
			url: api1_papers_share,
			method: 'GET',
			data: data,
		});
	}

}
