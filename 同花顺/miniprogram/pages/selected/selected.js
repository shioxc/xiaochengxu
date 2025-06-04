// pages/selected/selected.js
Page({
  data: {
    isLogin: false,
    stocks: []
  },
  onShow() {
    this.checkLoginStatus()
    if (getApp().globalData.isLogin) {
      this.getSelectedStocks()
    }
  },
  checkLoginStatus() {
    const app = getApp()
    this.setData({ isLogin: app.globalData.isLogin })
  },
  getSelectedStocks() {
    try {
      const res = await wx.cloud.callFunction({
        name: 'getSelectedStocks'
      })
      
      this.setData({ stocks: res.result.data || [] })
    } catch (err) {
      console.error('获取自选股失败:', err)
    }
  },
  goToLogin() {
    wx.navigateTo({ url: '/pages/login/login' })
  },
  goToStock(e) {
    const code = e.currentTarget.dataset.code
    const name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/detail/detail?stockName=${encodeURIComponent(name)}&stockCode=${code}`
    })
  }
})