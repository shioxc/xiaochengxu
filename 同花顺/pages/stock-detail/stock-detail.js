Page({
  data: {
    stockName: '',
    stockCode: '',
    stockPrice: '0.00',
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
  },
  navigateToNewsDetail(e) {
    const newsId = e.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: `/pages/news-detail/news-detail?newsId=${newsId}`
    });
  }
});