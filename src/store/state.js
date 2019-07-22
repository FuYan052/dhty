export default {
  isLogin: Boolean(window.localStorage.getItem('ufo-token')), // 实际要根据需求来，有可能需要检测token的合法性
  type: window.localStorage.getItem('type'),  //身份类型
  token: window.localStorage.getItem('ufo-token')  //token
}