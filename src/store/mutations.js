export default {
  changeLoginStatus (state, loginStatus) {
    state.isLogin = loginStatus
  },
  changeType(state, status) {
    state.type = status;
  },
  changeToken(state, status) {
    state.token = status;
  },
}