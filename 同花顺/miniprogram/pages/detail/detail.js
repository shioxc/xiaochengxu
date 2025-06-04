// pages/detail/detail.js
const { formatNumber } = require('../../utils/util');
Page({
  onShareAppMessage() {
    const name = this.data.stockName;
    const code = this.data.stockCode;
    return {
      title: `详情：${name} (${code})`,
      path: `/pages/detail/detail?stockName=${encodeURIComponent(name)}&stockCode=${code}`,
      fail: (err) => {
        console.error('分享失败', err); // 捕获错误
      }
    };
  },
  data: {
    stockName: ' ',
    stockCode: ' ',
    currentPrice: 0,
    preClose: 0,
    highPrice: 0,
    lowPrice: 0,
    openPrice: 0,
    turnoverRate: 0,
    volume: 0,
    amount: 0,
    bids: [],
    asks: [],
    activeChart: 'minute',
    market: 'sh',
    chartUrl: '',
    isLoading: true,
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
  formatDataForDisplay(data) 
  {
    const defaultArray = Array(5).fill({ price: 0, volume: 0 });
    return {
      stockName: data.stockName,
      stockCode: data.stockCode,
      currentPrice: formatNumber(data.currentPrice),
      preClose: formatNumber(data.preClose),
      highPrice: formatNumber(data.highPrice),
      lowPrice: formatNumber(data.lowPrice),
      openPrice: formatNumber(data.openPrice),
      turnoverRate: formatNumber(data.turnoverRate),
      volume: formatNumber(data.volume / 10000) + '万手',
      amount: formatNumber(data.amount / 100000000) + '亿元',
      bids: (data.bids || defaultArray).map(item => ({
        price: formatNumber(item.price || 0),
        volume: item.volume || 0
      })),
      asks: (data.asks || defaultArray).map(item => ({
        price: formatNumber(item.price || 0),
        volume: item.volume || 0
      })),
    };
  },
  onLoad(options) {
    if (wx.canIUse('showShareMenu'))
    {
      wx.showShareMenu({
        withShareTicket: true,
        success: () => console.log('分享功能已激活'),
        fail: (err) => {
          console.error('分享被禁用:', err);
        }
      });
    }
    else{
        console.log('当前基础库不支持分享功能');
        return;
      }
    console.log('页面参数:', options)
    const fullUrl = this.getCurrentPageFullUrl()
    console.log('完整URL:', fullUrl)
    const stockName = options.stockName;
    const stockCode = options.stockCode;
    this.setData({
      stockName,
      stockCode
    });
    wx.setNavigationBarTitle({
      title: `${stockName} (${stockCode})`
    });
    const market = stockCode.startsWith('6') ? 'sh' : 'sz';
    
    this.setData({
      stockName,
      stockCode,
      market
    });
    this.fetchStockData();
    this.dataInterval = setInterval(() => {
      this.fetchStockData();
    }, 5000);

    console.log(`/pages/detail/detail?stockName=${encodeURIComponent(this.data.stockName)}&stockCode=${this.data.stockCode}`)
  },
  navigateToNewsDetail(e) {
    const newsId = e.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: `/pages/news-detail/news-detail?newsId=${newsId}`
    });
  },
  fetchStockData() {
    this.setData({ isLoading: true });
    
    wx.request({
      url: `https://hq.sinajs.cn/list=${this.data.market}${this.data.stockCode}`,
      header: {
        'Content-Type': 'application/javascript; charset=gbk'
      },
      success: (res) => {
        const dataStr = res.data;
        const start = dataStr.indexOf('"') + 1;
        const end = dataStr.lastIndexOf('"');
        const dataArray = dataStr.slice(start, end).split(',');

        if (dataArray.length > 30) {
          const stockData = {
            name: dataArray[0], // 股票名称
            open: parseFloat(dataArray[1]), // 今开
            preClose: parseFloat(dataArray[2]), // 昨收
            current: parseFloat(dataArray[3]), // 当前价格
            high: parseFloat(dataArray[4]), // 今日最高
            low: parseFloat(dataArray[5]), // 今日最低
            bidPrice: parseFloat(dataArray[6]), // 竞买价
            askPrice: parseFloat(dataArray[7]), // 竞卖价
            volume: parseInt(dataArray[8]), // 成交量(股)
            amount: parseFloat(dataArray[9]), // 成交金额(元)
            bids: [
              { price: parseFloat(dataArray[11]), volume: parseInt(dataArray[10])/100 }, // 买1
              { price: parseFloat(dataArray[13]), volume: parseInt(dataArray[12])/100 }, // 买2
              { price: parseFloat(dataArray[15]), volume: parseInt(dataArray[14])/100 }, // 买3
              { price: parseFloat(dataArray[17]), volume: parseInt(dataArray[16])/100 }, // 买4
              { price: parseFloat(dataArray[19]), volume: parseInt(dataArray[18])/100 }  // 买5
            ],
            asks: [
              { price: parseFloat(dataArray[21]), volume: parseInt(dataArray[20])/100 }, // 卖1
              { price: parseFloat(dataArray[23]), volume: parseInt(dataArray[22])/100 }, // 卖2
              { price: parseFloat(dataArray[25]), volume: parseInt(dataArray[24])/100 }, // 卖3
              { price: parseFloat(dataArray[27]), volume: parseInt(dataArray[26])/100 }, // 卖4
              { price: parseFloat(dataArray[29]), volume: parseInt(dataArray[28])/100 }  // 卖5
            ],
            date: dataArray[30],
            time: dataArray[31],
          };
          this.formatDataForDisplay(res.data);
          const totalShares = 100000000;
          const turnoverRate = (stockData.volume / totalShares * 100).toFixed(2);
          
          this.setData({
            stockName: stockData.name,
            currentPrice: stockData.current,
            preClose: stockData.preClose,
            highPrice: stockData.high,
            lowPrice: stockData.low,
            openPrice: stockData.open,
            turnoverRate,
            volume: stockData.volume,
            amount: stockData.amount,
            bids: stockData.bids,
            asks: stockData.asks,
            chartUrl: this.getChartUrl(),
            isLoading: false
          });
        }
      },
      fail: (err) => {
        console.error('获取股票数据失败:', err);
        this.setData({ isLoading: false });
        wx.showToast({
          title: '数据加载失败',
          icon: 'none'
        });
      }
    });
  },

  getChartUrl() {
    const { market, stockCode, activeChart } = this.data;
    const baseUrl = 'https://image.sinajs.cn/newchart';
    
    switch(activeChart) {
      case 'minute':
        return `${baseUrl}/min/n/${market}${stockCode}.gif`;
      case 'day':
        return `${baseUrl}/daily/n/${market}${stockCode}.gif`;
      case 'week':
        return `${baseUrl}/weekly/n/${market}${stockCode}.gif`;
      case 'month':
        return `${baseUrl}/monthly/n/${market}${stockCode}.gif`;
      default:
        return `${baseUrl}/min/n/${market}${stockCode}.gif`;
    }
  },

  switchChart(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      activeChart: type,
      chartUrl: this.getChartUrl()
    });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    wx.switchTab({
      url: `/pages/${tab}/${tab}`
    });
  },

    getCurrentPageFullUrl() {
      const pages = getCurrentPages()
      if (!pages.length) return ''
      
      const currentPage = pages[pages.length - 1]
      const options = currentPage.options || {}
      
      const queryString = Object.keys(options)
        .map(key => {
          const value = options[key]
          if (Array.isArray(value)) {
            return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&')
          }
          return `${key}=${encodeURIComponent(value)}`
        })
        .join('&')
      
      return `/${currentPage.route}${queryString ? '?' + queryString : ''}`
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
    App({
      onShow(options) {
        console.log('当前页面路径:', options.path);
      }
    })
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
    clearInterval(this.dataInterval);
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