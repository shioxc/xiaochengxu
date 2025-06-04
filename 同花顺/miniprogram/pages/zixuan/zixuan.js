// pages/zixuan/zixuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stockList: [
      { name: '佰维存储', code: '688525', price: 44.92, increase: '+20.01%' },
      { name: '苏交科', code: '300284', price: 8.72, increase: '+19.95%' },
      { name: '隆基绿能', code: '601012', price: 25.34, increase: '-2.13%' },
      { name: '比亚迪', code: '002594', price: 265.88, increase: '+1.05%' },
      { name: '贵州茅台', code: '600519', price: 1789.50, increase: '-0.87%' },
      { name: '宁德时代', code: '300750', price: 225.77, increase: '+0.33%' },
      { name: '招商银行', code: '600036', price: 35.67, increase: '-0.55%' },
      { name: '中国平安', code: '601318', price: 48.21, increase: '+0.21%' },
      { name: '五粮液', code: '000858', price: 165.33, increase: '+0.78%' },
      { name: '立讯精密', code: '002475', price: 28.90, increase: '-1.22%' }
    ]
  },
  navigateToStockDetail(e) {
    const stockName = e.currentTarget.dataset.stockname;
    const stockCode = e.currentTarget.dataset.stockcode;
    wx.navigateTo({
      url: `/pages/stock-detail/stock-detail?stockName=${stockName}&stockCode=${stockCode}`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})