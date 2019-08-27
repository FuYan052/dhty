export default {
  changeLoginStatus (state, loginStatus) {
    state.isLogin = loginStatus
  },
  changeUserId(state, status) {
    state.type = status;
  },
  changeUserPhone(state, status) {
    state.type = status;
  },
  changeToken(state, status) {
    state.token = status;
  },
}