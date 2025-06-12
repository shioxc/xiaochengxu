Page({
  data: {
    newsTitle: '',
    newsTime: '',
    newsContent: ''
  },
  onLoad(options) {
    // 模拟根据 newsId 获取新闻详情数据
    const newsId = options.newsId;
    const newsData = this.getNewsDataById(newsId);
    this.setData({
      newsTitle: newsData.title,
      newsTime: newsData.time,
      newsContent: newsData.content
    });
  },
  getNewsDataById(newsId) {
    // 这里可以替换为从后端接口获取新闻详情数据的逻辑
    const mockNewsData = [
      {
        newsId: 1,
        title: '重大利好消息，公司业绩大幅增长',
        time: '2024-01-01 10:00',
        content: '近日，某公司发布了上一财年的业绩报告，报告显示公司业绩实现了大幅增长……'
      },
      {
        newsId: 2,
        title: '行业动态：市场对该公司前景看好',
        time: '2024-01-02 14:30',
        content: '据市场分析机构最新报告，市场对某公司的前景普遍看好……'
      }
    ];
    return mockNewsData.find(item => item.newsId === parseInt(newsId));
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});