export default {
  isLogin: Boolean(window.localStorage.getItem('ty-token')), // 实际要根据需求来，有可能需要检测token的合法性
  userId: window.localStorage.getItem('userId'),  //用户Id
  userId: window.localStorage.getItem('userId'),  //用户手机号
  token: window.localStorage.getItem('ty-token')  //token
}