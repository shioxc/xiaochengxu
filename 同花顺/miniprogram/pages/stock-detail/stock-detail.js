Page({
  data: {
    stockName: '',
    stockCode: '',
    jys: '',
    stockPrice: '0.00',
    openPrice: '0.00',
    highPrice: '0.00',
    lowPrice: '0.00',
    volume: '0',
    amount: '0.00',
    turnoverRate: '0.00',
    activeChart: 'minute', // 初始图表类型
    chartUrl: '', // 初始图表 URL
    market: '',
    buy1: '',
    buy2: '',
    buy3: '',
    buy4: '',
    buy5: '',
    sell1: '',
    sell2: '',
    sell3: '',
    sell4: '',
    sell5: '',
    isInSelected: false // 新增字段，判断股票是否在自选股中
  },

  // 底部导航-分享按钮点击事件
  handleShare() {
    wx.showShareMenu({ withShareTicket: true }); // 显示分享菜单
    this.onShareAppMessage(); // 手动调用分享逻辑
  },

  // 分享
  onShareAppMessage() {
    const { stockName, stockCode } = this.data;
    console.log(stockName, stockCode, this.options.jys);

    return {
      title: `${stockName}(${stockCode})`, // 分享标题
      path: `/pages/stock-detail/stock-detail?stockName=${encodeURIComponent(stockName)}&stockCode=${stockCode}&jys=${this.data.jys}`,
      success: () => console.log('分享成功'),
      fail: (err) => console.error('分享失败', err)
    };
  },

  onLoad(options) {
    function parseStockData(rawData) {
      const regex = /"([^"]+)"/;
      const match = rawData.match(regex);

      if (!match || !match[1]) {
        console.error('无法解析股票数据');
        return [];
      }
      return match[1].split(',');
    }

    wx.request({
      url: 'https://hq.sinajs.cn/',
      data: {
        list: options.jys + options.stockCode
      },
      success: (res) => {
        const result = parseStockData(res.data);
        console.log(result);

        // 在请求成功后设置数据
        this.setData({
          stockName: result[0],
          stockCode: options.stockCode || '未知代码',
          jys: options.jys,
          stockPrice: result[3],
          openPrice: result[1],
          highPrice: result[4],
          lowPrice: result[5],
          volume: (parseInt(result[8]) / 100).toFixed(0),
          amount: (parseInt(result[9]) / 10000).toFixed(2),
          turnoverRate: '1.23%',
          market: options.jys,
          buy1: `${result[10]}@${result[11]}`,
          buy2: `${result[12]}@${result[13]}`,
          buy3: `${result[14]}@${result[15]}`,
          buy4: `${result[16]}@${result[17]}`,
          buy5: `${result[18]}@${result[19]}`,
          sell1: `${result[20]}@${result[21]}`,
          sell2: `${result[22]}@${result[23]}`,
          sell3: `${result[24]}@${result[25]}`,
          sell4: `${result[26]}@${result[27]}`,
          sell5: `${result[28]}@${result[29]}`
        });

        // 请求成功后设置图表 URL
        this.setChartUrl(); // 设置图表的 URL

        // 检查股票是否在自选股中
        this.checkStockInSelected();
      }
    });
  },

  // 切换图表类型
  switchChart(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      activeChart: type
    });

    // 切换图表类型后更新图表的 URL
    this.setChartUrl();
  },

  // 设置图表的 URL
  setChartUrl() {
    const { market, stockCode, activeChart } = this.data;
    const baseUrl = 'https://image.sinajs.cn/newchart';

    let chartUrl = '';
    switch (activeChart) {
      case 'minute':
        chartUrl = `${baseUrl}/min/n/${market}${stockCode}.gif`;
        break;
      case 'day':
        chartUrl = `${baseUrl}/daily/n/${market}${stockCode}.gif`;
        break;
      case 'week':
        chartUrl = `${baseUrl}/weekly/n/${market}${stockCode}.gif`;
        break;
      case 'month':
        chartUrl = `${baseUrl}/monthly/n/${market}${stockCode}.gif`;
        break;
      default:
        chartUrl = `${baseUrl}/min/n/${market}${stockCode}.gif`;
        break;
    }

    // 更新图表的 URL
    this.setData({
      chartUrl
    });
  },
  // 导航到新闻详情页面
  navigateToNewsDetail(e) {
    const newsId = e.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: `/pages/news-detail/news-detail?newsId=${newsId}`
    });
  },
  // 检查股票是否在自选股中
  checkStockInSelected() {
    const openid = wx.getStorageSync('openid');
    if (openid) {
      wx.cloud.database().collection('selectedStock')
        .where({
          openid: openid
        })
        .get()
        .then(res => {
          if (res.data.length > 0) {
            const stockCodes = res.data[0].stockCodes;
            const isInSelected = stockCodes.includes(this.data.stockCode);
            this.setData({
              isInSelected: isInSelected
            });
          }
        })
        .catch(err => {
          console.error('检查自选股失败:', err);
        });
    }
  },
  // 处理自选股操作
  handleSelected() {
    const openid = wx.getStorageSync('openid');
    if (!openid) {
      wx.navigateTo({
        url: '/pages/login/login'
      });
      return;
    }
    if (this.data.isInSelected) {
      // 从自选股中删除
      this.removeFromSelected();
    } else {
      // 添加到自选股
      this.addToSelected();
    }
  },
  // 添加到自选股
  addToSelected() {
    const openid = wx.getStorageSync('openid');
    wx.cloud.database().collection('selectedStock')
      .where({
        openid: openid
      })
      .get()
      .then(res => {
        if (res.data.length > 0) {
          const id = res.data[0]._id;
          const stockCodes = res.data[0].stockCodes;
          if (!stockCodes.includes(this.data.stockCode)) {
            stockCodes.push(this.data.stockCode);
            wx.cloud.database().collection('selectedStock')
              .doc(id)
              .update({
                data: {
                  stockCodes: stockCodes
                }
              })
              .then(() => {
                this.setData({
                  isInSelected: true
                });
                wx.showToast({
                  title: '添加成功',
                  icon: 'success'
                });
              })
              .catch(err => {
                console.error('添加自选股失败:', err);
                wx.showToast({
                  title: '添加失败',
                  icon: 'none'
                });
              });
          }
        } else {
          wx.cloud.database().collection('selectedStock')
            .add({
              data: {
                openid: openid,
                stockCodes: [this.data.stockCode]
              }
            })
            .then(() => {
              this.setData({
                isInSelected: true
              });
              wx.showToast({
                title: '添加成功',
                icon: 'success'
              });
            })
            .catch(err => {
              console.error('添加自选股失败:', err);
              wx.showToast({
                title: '添加失败',
                icon: 'none'
              });
            });
        }
      })
      .catch(err => {
        console.error('查询自选股失败:', err);
      });
  },
  // 从自选股中删除
  removeFromSelected() {
    const openid = wx.getStorageSync('openid');
    wx.cloud.database().collection('selectedStock')
      .where({
        openid: openid
      })
      .get()
      .then(res => {
        if (res.data.length > 0) {
          const id = res.data[0]._id;
          const stockCodes = res.data[0].stockCodes;
          const index = stockCodes.indexOf(this.data.stockCode);
          if (index > -1) {
            stockCodes.splice(index, 1);
            wx.cloud.database().collection('selectedStock')
              .doc(id)
              .update({
                data: {
                  stockCodes: stockCodes
                }
              })
              .then(() => {
                this.setData({
                  isInSelected: false
                });
                wx.showToast({
                  title: '删除成功',
                  icon: 'success'
                });
              })
              .catch(err => {
                console.error('删除自选股失败:', err);
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                });
              });
          }
        }
      })
      .catch(err => {
        console.error('查询自选股失败:', err);
      });
  }
});