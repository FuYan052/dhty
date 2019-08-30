import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const ajax = axios.create({
  baseURL: 'http://192.168.0.114:9000/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const ajax2 = axios.create({
  baseURL: 'http://192.168.0.114:9000/',
  headers: {
    'Content-Type': "application/json;charset=UTF-8",
    'token': window.localStorage.getItem('ty-token')
  },
})
// 模拟登录数据 
// const ajax = axios.create({
//   baseURL: 'http://rap2api.taobao.org/app/mock'
// })

// request拦截器
ajax.interceptors.request.use(config => {
  console.log(config)
  // Do something before request is sent
  if (localStorage.getItem('ty-token')) {
    config.headers.common['token'] =window.localStorage.getItem('ty-token'); //让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  // config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
ajax.interceptors.response.use(resp => {
    if (resp.status === 200) {
      return resp.data
    }
  },
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

// 获取验证码  ok
export const postCode = (params) => {
  return ajax.post(`/v1/rest/public/bgxsendcode?phone=${params}`)
}  
// 校验验证码  
// export const checkCode = (params) => {
//   return ajax.post(`/public_controller/bgxisphonecode?phone=${params.phoneNum}&verifyCode=${params.verifyCode}`)
// }
// 注册  ok
export const postRegister = (params) => {
  return ajax.post(`/v1/rest/login/register?phone=${params.phone}&authCode=${params.authCode}&passWord=${params.passWord}`)
}
// 手机密码登录  ok
export const postLoginForPassword = (params) => {
  return ajax.post(`/v1/rest/login/login?phone=${params.phone}&passWord=${params.passWord}`)
}
// 验证码登录  ok
export const postLoginForCode = (params) => {
  return ajax.post(`/v1/rest/login/authCodeLogin?phone=${params.phone}&authCode=${params.code}`)
}
// 忘记密码  ok
export const postForgetPassword = (params) => {
  return ajax.post(`/v1/rest/login/resetPassword?phone=${params.phone}&authCode=${params.code}&passWord=${params.passWord}`)
}

// 场地
// 场地详情  ok
export const getPlaygroundDetail = (params) => {
  return ajax.get(`/v1/rest/venue/venueDetails?id=${params}`)
}
// 场地列表  ok
export const getPlaygroundList = (params) => {
  return ajax.get(`/v1/rest/venue/venueList?type=${params.type}&name=${params.name}&lon=${params.lon}&lat=${params.lat}`)
}

// 我的管理
// 我参加的社群  ok
export const getJoinedGroup = (params) => {
  return ajax.get(`/v1/rest/management/JoinedGroup?userId=${params}`)
}
// 创建社群  ok
export const createGroup = (params) => {
  return ajax2.post(`/v1/rest/management/createGroup`,params)
}
// 解散群  ok
export const disbandmentGroup = (params) => {
  return ajax.get(`/v1/rest/management/disbandmentGroup?groupId=${params}`)
}
// 我创建的群  ok
export const createGroupList = (params) => {
  return ajax.get(`/v1/rest/management/groupList?id=${params}`)
}
// 我参加的活动  ok
export const participatedActivity = (params) => {
  return ajax.get(`/v1/rest/management/participatedActivity?state=${params.state}&userId=${params.userId}`)
}
// 我组织的活动  ok
export const myOrganization = (params) => {
  return ajax.get(`/v1/rest/management/myOrganization?state=${params.state}&userId=${params.userId}`)
}
// 设为管理员、移除管理员、移除群成员  ok
export const setInfo = (params) => {
  return ajax.get(`/v1/rest/management/setInfo?type=${params.type}&groupId=${params.groupId}&userId=${params.userId}`)
}
// 转让群  ok
export const transferGroup = (params) => {
  return ajax.get(`/v1/rest/management/transferGroup?groupId=${params.groupId}&qId=${params.qId}&cId=${params.cId}`)
}
// 查询要修改的群信息  ok
export const updateGroupInfo = (params) => {
  return ajax.get(`/v1/rest/management/findGroup?id=${params}`)
}
// 修改社群
// export const updateGroup = (params) => {
//   return ajax2.post(`/v1/rest/management/updateGroup`,params)
// }

// 我的数据
// 查询现有待完善信息  ok
export const findPersonalInformation = (params) => {
  return ajax.get(`/v1/rest/mydata/findPersonalInformation?userId=${params}`)
}
// 查询所有标签  ok
export const findAllLabel = (params) => {
  return ajax.get(`/v1/rest/mydata/findAllLabel?userId=${params}`)
}
// 创建新标签  ok
export const createLabel = (params) => {
  return ajax.get(`/v1/rest/mydata/createLabel?labelName=${params.labelName}&userId=${params.userId}`)
}
// 完善信息  ok
export const completeInfo = (params) => {
  return ajax2.post(`/v1/rest/mydata/savePersonalInformation`,params)
}

// 我要参与
// 活动详情  ok
export const activitiesDetail = (params) => {
  return ajax.get(`/v1/rest/login/activitiesDetailInfo?id=${params}`)
}
// 活动列表
export const activitiesList = (params) => {
  return ajax.get(`/v1/rest/login/activitiesList?type=${params.type}&time=${params.time}&isTwoDaysLater=${params.isTwoDaysLater}`)
}
// 申请加入社群  ok
export const applyJoinGroup = (params) => {
  return ajax.get(`/v1/rest/login/applyJoinGroup?groupId=${params.groupId}&userId=${params.userId}`)
}
// Ta参加过的活动  ok
export const attendedActivities = (params) => {
  return ajax.get(`/v1/rest/login/attendedActivities?id=${params.id}&type=${params.type}`)
}
// 获取场地信息  ok
export const getVenueInfo = (params) => {
  return ajax.get(`/v1/rest/login/getVenueInfo?type=${params}`)
}
// 群活动  ok
export const groupActivity = (params) => {
  return ajax.get(`/v1/rest/login/groupActivity?id=${params.id}&time=${params.time}&isTwoDaysLater=${params.isTwoDaysLater}`)
}
// 群详情 ok
export const groupDetailInfo = (params) => {
  return ajax.get(`/v1/rest/login/groupDetailInfo?id=${params}`)
}
// ta所属社群列表  ok
export const groupList = (params) => {
  return ajax.get(`/v1/rest/login/groupList?id=${params}`)
}
// 群成员  ok
export const groupMembers = (params) => {
  return ajax.get(`/v1/rest/login/groupMembers?groupId=${params.groupId}&keyWord=${params.keyWord}`)
}
// Ta人资料  ok
export const informationOthers = (params) => {
  return ajax.get(`/v1/rest/login/informationOthers?id=${params}`)
}
// Ta的活动参数  ok
export const motionParameters = (params) => {
  return ajax.get(`/v1/rest/login/motionParameters?id=${params.id}&type=${params.type}`)
}
// ta组织的活动  ok
export const organizedActivities = (params) => {
  return ajax.get(`/v1/rest/login/organizedActivities?id=${params}`)
}
// 创建活动获取社群列表  ok
export const getGroupList = (params) => {
  return ajax.get(`/v1/rest/login/getGroupList?id=${params}`)
}
// 创建组织活动  ok
export const organizingActivities = (params) => {
  return ajax2.post(`/v1/rest/login/organizingActivities`,params)
}
// 根据父集查询子集数据字典  ok
export const findDictList = (params) => {
  return ajax.get(`/v1/rest/public/findDictList?skey=${params}`)
}
// 上传图片  ok
export const postUpolad = (params) => {
  return ajax.post(`/v1/rest/file/uploadOSS`,params)
}


