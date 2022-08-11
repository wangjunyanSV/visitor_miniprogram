//保存用户信息
import Config from "../common/Config.js";

const saveUser = (res) => {

    uni.setStorage({
        key: Config.uid,
        data: res['visitorUser']['vuid']
    })

    uni.setStorage({
        key: Config.nikeName,
        data: res['visitorUser']['name']
    })

    uni.setStorage({
        key: Config.mobile,
        data: res['visitorUser']['mobile']
    })

    uni.setStorage({
        key: Config.personId,
        data: res['visitorUser']['personId']
    })

    if (res['visitorUser']['proprietor'] !== undefined && res['visitorUser'][
            'proprietor'
            ] !==
        null) {
        uni.setStorage({
            key: Config.companyId,
            data: res['visitorUser']['proprietor']['id']
        })

        uni.setStorage({
            key: Config.companyName,
            data: res['visitorUser']['proprietor']['name']
        })

    }

    if (res['visitorUser']['houses'] !== undefined && res['visitorUser']['houses'] !==
        null && res['visitorUser']['houses'].length !== 0) {

        if (!checkBindHouse()) {
            uni.setStorage({
                key: Config.houseId,
                data: res['visitorUser']['houses'][0]['houseId']
            })

            uni.setStorage({
                key: Config.houseName,
                data: res['visitorUser']['houses'][0]['houseName']
            })

            uni.setStorage({
                key: Config.communityId,
                data: res['visitorUser']['houses'][0]['communityId']
            })

            uni.setStorage({
                key: Config.communityName,
                data: res['visitorUser']['houses'][0]['communityName']
            })
        }
        uni.setStorage({
            key: Config.houses,
            data: res['visitorUser']['houses']
        })

    }
    uni.$emit('saveSuccess',"saveSuccess")
    console.log(res);

}

//检查登录
const checkLogin = () => {
    return uni.getStorageSync(Config.uid) !== '' && uni.getStorageSync(Config.uid) !== undefined
}

//检查绑定房屋
const checkBindHouse = () => {
    return uni.getStorageSync(Config.houseId) !== '' && uni.getStorageSync(Config.houseId) !== undefined
}

const uid = () => {
    return uni.getStorageSync(Config.uid)
}

const personId = () => {
    return uni.getStorageSync(Config.personId)
}

const accessToken = () => {
    return uni.getStorageSync(Config.accessToken)
}

const wxUnionId = () => {
    return uni.getStorageSync(Config.wxUnionId)
}

const wxOpenId = () => {
    return uni.getStorageSync(Config.wxOpenId)
}

const nikeName = () => {
    return uni.getStorageSync(Config.nikeName)
}
const mobile = () => {
    return uni.getStorageSync(Config.mobile)
}

const fullHouseName = () => {
    return uni.getStorageSync(Config.communityName) + uni.getStorageSync(Config.houseName)
}

const communityId = () => {
    return uni.getStorageSync(Config.communityId)
}

const communityName = () => {
    return uni.getStorageSync(Config.communityName)
}

const houseId = () => {
    return uni.getStorageSync(Config.houseId)
}

const houseName = () => {
    return uni.getStorageSync(Config.houseName)
}

const houseList = () => {
    return uni.getStorageSync(Config.houses)
}

const openDoorPreference = () => {
    return uni.getStorageSync(Config.openDoorPreference)
}


export default {
    saveUser,
    checkLogin,
    checkBindHouse,
    uid,
    personId,
    accessToken,
    wxUnionId,
    wxOpenId,
    nikeName,
    mobile,
    fullHouseName,
    communityId,
    houseId,
    communityName,
    houseName,
    houseList,
    openDoorPreference
}
