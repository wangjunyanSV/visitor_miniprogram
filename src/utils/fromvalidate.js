module.exports = {
	error: '',
	check: function(data, rule) {
		this.error = '';
		for (var i = 0; i < rule.length; i++) {
			var body = rule[i];
			if (!body.name || !body.title) { //不检验
				this.error = '第' + i + '个项目校验规则填写错误';
				break;
			}
			if (typeof(data[body.name]) == 'number') {
				data[body.name] = String(data[body.name]);
			}
			var checkVal = data[body.name] || ''; //value
			if (body.notnull && checkVal === '') { //包含非空判断
				this.error = body.title + '不能为空';
				break;
			}

			if (checkVal) {
				switch (body.checkType) {
					case 'endTime':
						this.validEndTime(checkVal);
						break;
					case 'beginTime':
						this.validBeginTime(checkVal);
						break;
					case 'leaderMobile':
						this.validLeaderMobile(checkVal);
						break;
					case 'leaderIdCardSn':
						this.validIdCardSn(checkVal);
						break;
					case 'fileKey':
						this.validFileKey(checkVal);
						break;
					case 'nucleicCode':
						this.validNucleicCode(checkVal);
						break;
					case 'healthCode':
						this.validHealthCode(checkVal);
						break;
					case 'tripCode':
						this.validTripCode(checkVal);
						break;
					case 'intervieweeMobile':
						this.validLeaderMobile(checkVal);
						break;
						// case 'intervieweeMobile':
						// 	this.validLeaderMobile(checkVal);
						// 	break;
					case 'validateCarNum':
						this.validateCarNum(checkVal);
						break;



						// case 'password': this.validatePassword(checkVal); break;
						// case 'paypassword': this.validatePayPassword(checkVal); break;
						// case 'tel': this.validateTelephone(checkVal); break;
						// case 'qq': this.validateQq(checkVal); break;
						// case 'email': this.validateEmail(checkVal); break;
						// case 'taxNumber': this.validateTaxNumber(checkVal); break;
						// case 'price': this.validatePrice(checkVal); break;
						// case 'bankNo': this.validateBankNo(checkVal); break;
					default:
						break;
				}
			}
		}

		if (this.error !== '') {
			uni.showToast({
				title: this.error,
				icon: "none"
			});
			return false;
		}
		return true;
	},
	validEndTime: function(checkVal) {
		console.log("校验结束时间")
		let reg =
			/^([1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9])\s(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/
		if (!reg.test(checkVal)) {
			this.error = "结束时间不正确";
		}
	},
	validBeginTime: function(checkVal) {
		console.log("校验结束时间")
		let reg =
			/^([1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9])\s(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/
		if (!reg.test(checkVal)) {
			this.error = "开始时间不正确";
		}
	},
	validIdCardSn: function(checkVal) {
		let idreg =
			/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		if (!idreg.test(checkVal)) {
			this.error = '请输入正确的身份证号'
		}
	},
	validLeaderMobile: function(checkVal) {
		let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
		console.log(checkVal);
		if (!reg.test(checkVal)) {
			this.error = '请输入正确的手机号'
		}
	},
	validFileKey: function(checkVal) {
		if (checkVal === '' || checkVal === null) {
			this.error = '请上传免冠照'
		}
	},
	validNucleicCode: function(checkVal) {
		if (checkVal === '' || checkVal === null) {
			this.error = '请上传核酸码'
		}
	},
	validHealthCode: function(checkVal) {
		if (checkVal === '' || checkVal === null) {
			this.error = '请上传健康码'
		}
	},
	validTripCode: function(checkVal) {
		if (checkVal === '' || checkVal === null) {
			this.error = '请上传行程码'
		}
	},


	isNumber: function(checkVal) {
		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
		return reg.test(checkVal);
	},
	validateUserName: function(checkVal) {
		var reg = /^1[3456789]\d{9}$/;
		if (!reg.test(checkVal)) {
			this.error = "无效的用户名";
		}
	},
	validatePhone: function(checkVal) {
		var reg = /^1[3456789]\d{9}$/;
		if (!reg.test(checkVal)) {
			this.error = "无效的手机号码";
		}
	},
	validateCarNum: function(checkVal) {

		var reg =
			/^([京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][1-9ABCDEFGHJKLMNPQRSTUVWXYZ]\d{5}|[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][\dABCDEFGHJKLNMxPQRSTUVWXYZ]{5})$/;
		if (!reg.test(checkVal)) {
			this.error = "车牌号错误";
		}

	},


	validatePassword: function(checkVal) {
		// var reg = /^([0-9a-zA-Z_]){6,20}$/;
		// if(!reg.test(checkVal)){
		// 	this.error = "无效的密码，6-20位数字或字母组合";
		// }

		// var reg = /^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{6,20}$/;
		// if(!reg.test(checkVal)){
		// 	this.error = "密码包含数字,大小写字母和特殊符号，最少6位，最多20位";
		// }

		var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
		if (!reg.test(checkVal)) {
			this.error = "密码必须包含数字,大小写字母，最少6位，最多20位";
		}
	},
	validatePayPassword: function(checkVal) {
		var reg = /^\d{6}$/;
		if (!reg.test(checkVal)) {
			this.error = "无效的支付密码，6位数字组合";
		}
	},

	validatedate: function(checkVal) {
		var reg = /^[1-9]\d{4,10}$/;
		if (!reg.test(checkVal)) {
			this.error = "无效的支付密码，6位数字组合";
		}
	},
	validatePrice: function(checkVal) {
		var reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
		if (!reg.test(checkVal)) {
			this.error = "无效金额，整数8位，小数2位";
		}
	},
	validateTelephone: function(checkVal) {
		var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
		if (!reg.test(checkVal)) {
			this.error = "无效的电话号码,示例：010-6754783";
		}
	},
	validateQq: function(checkVal) {
		var reg = /^[1-9]\d{4,10}$/;
		if (!reg.test(checkVal)) {
			this.error = "无效的 QQ 号码";
		}
	},

	validateEmail: function(checkVal) {
		var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
		if (!reg.test(checkVal)) {
			this.error = "无效的邮箱地址";
		}
	},

	validateTaxNumber: function(checkVal) {
		var reg = /^[0-9a-zA-Z]+$/;
		if (!reg.test(checkVal)) {
			this.error = "纳税人识别号只能输入数字或字母";
		}
	},

	validateBankNo(checkVal) {
		var reg = /^\d{16}$|^\d{18,21}$/;
		if (!reg.test(checkVal)) {
			this.error = "无效银行卡号，整数16位或18-21位";
			return
		}
	}
}
