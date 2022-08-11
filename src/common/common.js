//创建访客
export const visitor_url = "/api1/visitor-service/visitor"

//创建访客用户 查询
export const user_url = "/api1/visitor-service/user"

//获取微信openId
export const web_url = "/api1/weixin/third-platform/web"

//邀请访客申请
export const job_visitor_form = "/api1/visitor-service/job/form"

//访客提交申请
export const job_form = "/api1/visitor-service/job/visitor/form"

//查询业主公司
export const proprietor_url = "/api1/visitor-service/proprietor/realtime"

//上传多张图片
export const file_image_url = "/api1/visitor-service/file/image"

//查找访客证
export const job_papers_url = "/api1/visitor-service/job/papers"

//查找访客工单
export const job_url = "/api1/visitor-service/job/miniprogram"

//查找访客工单 小程序接口
export const job_url_miniprogram = "/api1/visitor-service/job/miniprogram"


//通过、拒绝访客
export const job_event_url = "/api1/visitor-service/job/event"


// export const bind_wx = "/api1/visitor-service/user/bindWxCode"

//绑定微信
export const bind_wx = "/api1/visitor-service/user/bindWxCode/auth"

//查找区域内公司
export const area_proprietors = "/api1/visitor-service/area/proprietors"

// 查找文件下载地址
export const file_url = "/api1/visitor-service/file/url"

//获取上次提交的访客信息
export const visitor_latest = "/api1/visitor-service/visitor/latest"

//查找小区
export const find_community = '/api1/visitor-service/community'

//查找房号
export const house_property = "/api1/visitor-service/house-property"

//查找省份
export const provinces = "/api1/visitor-service/administrative-division/provinces"

//查找市
export const city = "/api1/visitor-service/administrative-division/city"

//业主身份验证
export const owner_house = "/api1/visitor-service/job/house"

//查找附近的小区
export const nearby_community = "/api1/visitor-service/community/nearby"

//查询小区门牌号格式
export const community_roomformat = "/api1/visitor-service/community/roomformat"

//发送验证码
export const register_authCode = "/api1/smart-park-service/register/authCode"

//注册
export const register = "/api1/smart-park-service/register"


//业主审核租客或者家人
export const review_event = "/api1/smart-park-service/event"

//获取微信签名
export const wechat_sign = "/api1/weixin/third-platform/web/sign"

//查询认证进度
export const user_identifier = "/api1/visitor-service/user/identifier"

// 查看认证详情
export const smart_park_service_user = "api1/smart-park-service/user"

// 查看认证工单
export const smart_park_service_job = "/api1/smart-park-service/job"

// 查看认证工单
export const api1_file = "/api1/file"

// 打开 分享的 访客证
export const api1_papers_share = "/api1/visitor-service/job/papers/share"


/**************************************报修接口**********************************************/
//增加报修事件
export const repair_add = "/api1/job/repair/job/event/add"

//报修工单
export const repair_job = "/api1/job/repair/job"

//报修报告
export const repair_report = "/api1/job/repair/report"

/**************************************防疫码接口**********************************************/

//查询防疫码
export const pass_code = "/api1/visitor-service/passcode"

//查询通行记录
export const pass_code_record = "/api1/visitor-service/passcode/record"

export const miniprogram_login = '/api1/weixin/third-platform/miniprogram'

export const miniprogram_community_form = '/api1/smart-park-service/config/community/form'

export const miniprogram_community_config_form_proprietor = '/api1/smart-park-service/config/community/form/proprietor'
