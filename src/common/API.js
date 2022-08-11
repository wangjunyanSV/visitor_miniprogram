import {
	Index
} from '../common/index.js';
const API = new Index();



const login = (code) => {
	return new Promise((resolve, reject) => {
		API.login(code).then(res => {
			resolve(res)
		}).catch(e => {
			reject(e)
		})
	})
}

const getJobDetail = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.getJobDetail(data).then(res => {
			resolve(res)
		}).catch(e => {
			reject(e)
		})
	})
}


const getVisitorCode = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.getVisitorCode(data).then(res => {
			resolve(res)
		}).catch(e => {
			reject(e)
		})
	})
}

const getUerDetail = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.getUerDetail(data).then(res => {
			resolve(res)
		}).catch(e => {
			reject(e)
		})
	})
}

const findCommunity = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.findCommunity(data).then(res => {
			resolve(res)
		}).catch(e => {
			reject(e)
		})
	})
}


const registerAuthCode = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.registerAuthCode(data).then(res => {
			resolve(res)
		}).catch(e => {
			reject(e)
		})
	})
}

const register = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.register(data).then(res => {
			resolve(res)
		}).catch(e => {
			reject(e)
		})
	})
}

const putBindWx = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.putBindWx(data).then(res => {
			resolve(res)
		}).catch(e => {
			reject(e)
		})
	})
}

const getFileUrl = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.getFileUrl(data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const communityRoomFormat = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.communityRoomFormat(data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const ownerHouse = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.ownerHouse(data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const userIdentifier = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.userIdentifier(data).then(res => {

			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const getPassCodeRecord = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.getPassCodeRecord(data).then(res => {

			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const reviewEvent = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.reviewEvent(data).then(res => {

			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const getPassCode = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.getPassCode(data).then(res => {

			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const getCommunityFormConfig = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.getCommunityFormConfig(data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const getProprietorFormConfig = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.getProprietorFormConfig(data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const getCompany = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.getCompany(data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const creatVisitor = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.creatVisitor(data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const inviteVisitor = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.inviteVisitor(data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const uploadImages = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.uploadImages(data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const postJobEvent = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.postJobEvent(data).then(res => {

			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const getAccessRecoed = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.accessRecord(data).then(res => {

			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const getPapersShare = (data = {}) => {
	return new Promise((resolve, reject) => {
		API.getPapersShare(data).then(res => {

			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}







export default {
	login,
	getJobDetail,
	getVisitorCode,
	getUerDetail,
	findCommunity,
	registerAuthCode,
	register,
	putBindWx,
	getFileUrl,
	communityRoomFormat,
	ownerHouse,
	userIdentifier,
	getPassCodeRecord,
	reviewEvent,
	getPassCode,
	getCommunityFormConfig,
	getCompany,
	creatVisitor,
	uploadImages,
	postJobEvent,
	getAccessRecoed,
	getProprietorFormConfig,
	getPapersShare,
	inviteVisitor
}
