// pages/detail/detail.js
Page({
  data: {
    stockName: ' ',
    stockCode: ' ',
    newsList: [
      {
        newsId: 1,
        title: '重大利好消息，公司业绩大幅增长',
        time: '2024-01-01 10:00'
      },
      {
        newsId: 2,
        title: '行业动态：市场对该公司前景看好',
        time: '2024-01-02 14:30'
      }
    ]
  },
  onLoad(options) {
    const stockName = options.stockName;
    const stockCode = options.stockCode;
    this.setData({
      stockName,
      stockCode
    });
    wx.setNavigationBarTitle({
      title: `${stockName} (${stockCode})`
    });
  },
  navigateToNewsDetail(e) {
    const newsId = e.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: `/pages/news-detail/news-detail?newsId=${newsId}`
    });
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