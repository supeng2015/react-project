const Auth = {
  login(cb) {
    localStorage.isLogin = true;
    //setTimeout(cb, 100) // fake async
  },
  logout(cb,history) {
    localStorage.isLogin = false;
    localStorage.userInfo = null;
    setTimeout(cb(history), 100)
  }
}
export default Auth