// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: "",
        traceUser: true,
      });
    }
    this.checkLoginStatus();
  },
  checkLoginStatus() {
    const that = this;
    wx.cloud.callFunction({
      name: 'checkLogin',
      success(res) {
        if (res.result.code === 200 && res.result.data.loginStatus === 1) {
          that.globalData.userInfo = res.result.data;
          that.globalData.isLogin = true;
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
})
