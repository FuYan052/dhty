import axios from 'axios'
import { Message } from 'element-ui'
import { Indicator, Toast } from 'mint-ui'
// 创建axios实例
const ajax = axios.create({
  // baseURL: 'http://192.168.0.116:9000/',
  baseURL: 'https://laihu.baogongxia.com/',
<<<<<<< HEAD
  // baseURL: 'http://jt93ze.natappfree.cc/',
=======
  // baseURL: 'http://tsvnik.natappfree.cc/',
>>>>>>> caafee0a13ff52d97c96779d77c5b0ed2f4f742a
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const ajax2 = axios.create({
  // baseURL: 'http://192.168.0.116:9000/',
  baseURL: 'https://laihu.baogongxia.com/',
<<<<<<< HEAD
  // baseURL: 'http://jt93ze.natappfree.cc/',
=======
  // baseURL: 'http://tsvnik.natappfree.cc/',
>>>>>>> caafee0a13ff52d97c96779d77c5b0ed2f4f742a
  headers: {
    'Content-Type': "application/json;charset=UTF-8",
    // 'token': window.localStorage.getItem('ty-token')
  },
})
const ajax4 = axios.create({
  // baseURL: 'http://192.168.0.116:9000/',
  baseURL: 'https://laihu.baogongxia.com/',
<<<<<<< HEAD
  // baseURL: 'http://jt93ze.natappfree.cc/',
=======
  // baseURL: 'http://tsvnik.natappfree.cc/',
>>>>>>> caafee0a13ff52d97c96779d77c5b0ed2f4f742a
  headers: {
    'Content-Type': "application/json;charset=UTF-8",
  },
})

// request拦截器
ajax.interceptors.request.use(config => {
  Indicator.open();
  // console.log(config)
  // Do something before request is sent
  if (localStorage.getItem('ty-token')) {
    config.headers.common['token'] =window.localStorage.getItem('ty-token'); //让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
ajax.interceptors.response.use(resp => {
  Indicator.close();
    if (resp.data.status === 200) {
      return resp.data
    }
    if (resp.data.status == 201) {
      Toast({
        message: resp.data.message,
        duration: 2000
      });
    }
  },
  error => {
    return Promise.reject(error)
  })

// request拦截器
ajax2.interceptors.request.use(config => {
  Indicator.open();
  // console.log(config)
  // Do something before request is sent
  if (localStorage.getItem('ty-token')) {
    config.headers.common['token'] =window.localStorage.getItem('ty-token'); //让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
ajax2.interceptors.response.use(resp => {
  Indicator.close();
    if (resp.data.status === 200) {
      return resp.data
    }
    if (resp.data.status == 201) {
      Toast({
        message: resp.data.message,
        duration: 2000
      });
    }
  },
  error => {
    return Promise.reject(error)
  })
// request拦截器
ajax4.interceptors.request.use(config => {
  if (localStorage.getItem('ty-token')) {
    config.headers.common['token'] =window.localStorage.getItem('ty-token'); //让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
ajax4.interceptors.response.use(resp => {
  // Indicator.close();
    if (resp.data.status === 200) {
      return resp.data
    }
    if (resp.data.status == 201) {
      Toast({
        message: resp.data.message,
        duration: 2000
      });
    }
  },
  error => {
    return Promise.reject(error)
  })

// 获取验证码 
export const postCode = (params) => {
  return ajax.post(`/v1/rest/public/bgxsendcode?phone=${params}`)
}  
// 注册 
export const postRegister = (params) => {
  return ajax.post(`/v1/rest/login/register?phone=${params.phone}&authCode=${params.authCode}&passWord=${params.passWord}`)
}
// 手机密码登录 
export const postLoginForPassword = (params) => {
  return ajax.post(`/v1/rest/login/login?phone=${params.phone}&passWord=${params.passWord}`)
}
// 验证码登录 
export const postLoginForCode = (params) => {
  return ajax.post(`/v1/rest/login/authCodeLogin?phone=${params.phone}&authCode=${params.code}`)
}
// 忘记密码 
export const postForgetPassword = (params) => {
  return ajax.post(`/v1/rest/login/resetPassword?phone=${params.phone}&authCode=${params.code}&passWord=${params.passWord}`)
}
// 注册查询原始标签
export const postInitLebal = (params) => {
  return ajax.post(`/v1/rest/public/findSysLabel`)
}
// 提交注册信息
export const postRegisterInfo = (params) => {
  return ajax2.post(`/v1/rest/login/registerLabelSave`,params)
}


// 场地
// 场地详情 
export const getPlaygroundDetail = (params) => {
  return ajax.get(`/v1/rest/venue/venueDetails?id=${params}`)
}
// 场地列表
export const getPlaygroundList = (params) => {
  return ajax2.post(`/v1/rest/venue/venueList`,params)
}
// 场地列表2  不带请求缓冲
export const getPlaygroundList2 = (params) => {
  return ajax4.post(`/v1/rest/venue/venueList`,params)
}

// 我的管理
// 用户中心
export const myManagementInfo = (params) => {
  return ajax.get(`/v1/rest/management/myManagement?userId=${params}`)
}
// 我参加的社群 
export const getJoinedGroup = (params) => {
  return ajax.get(`/v1/rest/management/JoinedGroup?userId=${params}`)
}
// 创建社群 
export const createGroup = (params) => {
  return ajax2.post(`/v1/rest/management/createGroup`,params)
}
// 解散群 
export const disbandmentGroup = (params) => {
  return ajax.get(`/v1/rest/management/disbandmentGroup?groupId=${params}`)
}
// 我创建的群
export const createGroupList = (params) => {
  return ajax.get(`/v1/rest/management/groupList?id=${params}`)
}
// 我参加的活动 
export const participatedActivity = (params) => {
  return ajax.get(`/v1/rest/management/participatedActivity?state=${params.state}&userId=${params.userId}`)
}
// 我组织的活动 
export const myOrganization = (params) => {
  return ajax.get(`/v1/rest/management/myOrganization?state=${params.state}&userId=${params.userId}`)
}
// 设为管理员、移除管理员、移除群成员 
export const setInfo = (params) => {
  return ajax.get(`/v1/rest/management/setInfo?type=${params.type}&groupId=${params.groupId}&userId=${params.userId}`)
}
// 转让群
export const transferGroup = (params) => {
  return ajax.get(`/v1/rest/management/transferGroup?groupId=${params.groupId}&qId=${params.qId}&cId=${params.cId}`)
}
// 查询要修改的群信息 
export const updateGroupInfo = (params) => {
  return ajax.get(`/v1/rest/management/findGroup?id=${params}`)
}
// 我的优惠券
export const findCouponInfo = (params) => {
  return ajax.get(`/v1/rest/coupon/findCouponInfo?userId=${params.userId}&state=${params.state}`)
}
// 我的数据
// 查询现有待完善信息 
export const findPersonalInformation = (params) => {
  return ajax.get(`/v1/rest/mydata/findPersonalInformation?userId=${params}`)
}
// 查询所有标签 
export const findAllLabel = (params) => {
  return ajax.get(`/v1/rest/mydata/findAllLabel?userId=${params}`)
}
// 创建新标签
export const createLabel = (params) => {
  return ajax.get(`/v1/rest/mydata/createLabel?labelName=${params.labelName}&userId=${params.userId}`)
}
// 完善信息
export const completeInfo = (params) => {
  return ajax2.post(`/v1/rest/mydata/savePersonalInformation`,params)
}

// 我要参与
// 活动详情
export const activitiesDetail = (params) => {
  return ajax.get(`/v1/rest/login/activitiesDetailInfo?id=${params}`)
}
// 活动列表
export const activitiesList = (params) => {
  return ajax2.post(`/v1/rest/login/activitiesList`,params)
}
export const activitiesList2 = (params) => {  //无加载缓冲显示
  return ajax4.post(`/v1/rest/login/activitiesList`,params)
}
// 报名列表
export const getSignUpList = (params) => {
  return ajax.get(`/v1/rest/login/activitiesEnrolled?id=${params}`)
}
// 申请加入社群
export const applyJoinGroup = (params) => {
  return ajax.get(`/v1/rest/login/applyJoinGroup?groupId=${params.groupId}&userId=${params.userId}`)
}
// Ta参加过的活动 
export const attendedActivities = (params) => {
  return ajax.get(`/v1/rest/login/attendedActivities?id=${params.id}&type=${params.type}`)
}
// 获取场地信息 
export const getVenueInfo = (params) => {
  return ajax.get(`/v1/rest/login/getVenueInfo?type=${params.type}&name=${params.name}`)
}
// 群活动
export const groupActivity = (params) => {
  return ajax.get(`/v1/rest/login/groupActivity?id=${params.id}&time=${params.time}&isTwoDaysLater=${params.isTwoDaysLater}`)
}
// 群详情
export const groupDetailInfo = (params) => {
  return ajax.get(`/v1/rest/login/groupDetailInfo?id=${params}`)
}
// ta所属社群列表
export const groupList = (params) => {
  return ajax.get(`/v1/rest/login/groupList?id=${params}`)
}
// 群成员
export const groupMembers = (params) => {
  return ajax.get(`/v1/rest/login/groupMembers?groupId=${params.groupId}&keyWord=${params.keyWord}`)
}
// Ta人资料 
export const informationOthers = (params) => {
  return ajax.get(`/v1/rest/login/informationOthers?id=${params}`)
}
// Ta的活动参数
export const motionParameters = (params) => {
  return ajax.get(`/v1/rest/login/motionParameters?id=${params.id}&type=${params.type}`)
}
// ta组织的活动 
export const organizedActivities = (params) => {
  return ajax.get(`/v1/rest/login/organizedActivities?id=${params}`)
}
// 创建活动获取社群列表
export const getGroupList = (params) => {
  return ajax.get(`/v1/rest/login/getGroupList?id=${params}`)
}
// 创建组织活动 
export const organizingActivities = (params) => {
  return ajax2.post(`/v1/rest/login/organizingActivities`,params)
}
// 组织活动可选择的客服人员
export const customerService = () => {
  return ajax.get(`/v1/rest/login/customerService`)
}
// 修改活动
export const findOrganizingActivities = (params) => {
  return ajax.post(`/v1/rest/login/findOrganizingActivities?id=${params}`)
}
// 取消发布的活动
export const cancelOrgActivities = (params) => {
  return ajax.get(`/v1/rest/management/cancelActivities?id=${params}`)
}
// 根据父集查询子集数据字典
export const findDictList = (params) => {
  return ajax.get(`/v1/rest/public/findDictList?skey=${params}`)
}
// 上传图片
export const postUpolad = (params) => {
  return ajax.post(`/v1/rest/file/uploadOSS`,params)
}
// 上传图片base64
export const testPostUpolad = (params) => {
  return ajax.post(`/v1/rest/file/testUploadOSS`,params)
}
// 马上推广
export const getPopularize = (params) => {
  return ajax.get(`/v1/rest/file/qRCode?userId=${params}`)
}

// 微信获取用户openId和session_key
export const getWXLogin = (params) => {
  return ajax.get(`/v1/rest/login/getSessionkey?code=${params}`)
}
//绑定手机号
export const postBindPhone = (params) => {
  return ajax2.post('/v1/rest/login/wxRegist', params)
}
// 微信
export const getSignature = () => {
  return ajax.get(`/v1/rest/login/getSignature`)
}
// 微信分享后变化的url获取签名
export const getSignatureInfo = (params) => {
<<<<<<< HEAD
  return ajax.get(`/v1/rest/login/getSignatureInfo?url=${params}`)
=======
  return ajax.get(`/v1/rest/login/getSignatureInfo?type=${params}`)
>>>>>>> caafee0a13ff52d97c96779d77c5b0ed2f4f742a
}
// 微信支付
export const postPay = (params) => {
  return ajax2.post(`/v1/rest/pay/pay`,params)
}
// 微信支付code返给后端换openId
export const getOpenId = (params) => {
  return ajax.get(`/v1/rest/login/updateOpenId?userId=${params.userId}&code=${params.code}`)
}
//微信取消支付回调
export const cancelPay = (params) => {
  return ajax.get(`/v1/rest/pay/cancel?res=${params}`)
}
// 支付页信息
export const getPayActInfo = (params) => {
  return ajax.get(`/v1/rest/login/signUpInfo?id=${params.id}&userId=${params.userId}`)
}
// 比赛支付页信息
export const getPayMatchInfo = (params) => {
  return ajax.get(`/v1/rest/login/matchSignUpInfo?id=${params.id}&userId=${params.userId}`)
}
// 提交比赛支付
export const postPayMatch = (params) => {
  return ajax2.post(`/v1/rest/pay/payMatch`,params)
}
// 支付成功
export const payOk = (params) => {
  return ajax.get(`/v1/rest/pay/ok?orderNo=${params}`)
}
// 取消活动
export const cancelActive = (params) => {
  return ajax.post(`/v1/rest/pay/refund?orderNo=${params}`)
}
// 优惠券弹框提示'知道了'操作，用于下次是否还弹框
export const isShowCoupon = (params) => {
  return ajax.get(`/v1/rest/login/activitiesListIsNoRead?userId=${params}`)
}
// 账户明细
export const getAccount = () => {
  return ajax.get(`/v1/rest/management/getIncomeInfoList`)
}
// 账户明细详情
export const getAccountDetail = (params) => {
  return ajax.get(`/v1/rest/management/getIncomeInfo?id=${params}`)
}