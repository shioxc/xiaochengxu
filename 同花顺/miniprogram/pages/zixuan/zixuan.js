// pages/zixuan/zixuan.js
Page({
  data: {
    stockList: []
  },
  navigateToStockDetail(e) {
    const stockName = e.currentTarget.dataset.stockname;
    const stockCode = e.currentTarget.dataset.stockcode;
    const jys = e.currentTarget.dataset.jys
    wx.navigateTo({
      url: `/pages/stock-detail/stock-detail?stockName=${stockName}&stockCode=${stockCode}&jys=${jys}`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    function parseStockData(rawData) {
      // 首先提取等号后面的实际数据部分
      const regex = /"([^"]+)"/;
      const match = rawData.match(regex);
      
      if (!match || !match[1]) {
        console.error('无法解析股票数据:', rawData);
        return [];
      }
      // 使用逗号分割数据并返回数组
      return match[1].split(',');
    };
    wx.request({
      url: 'https://api.mairui.club/hslt/list/b997d4403688d5e66a',
      success: (res) => {
        let newStockList = res.data.slice(0, 30);
        console.log('初始股票列表:', newStockList);
        
        // 为每个股票创建一个请求Promise
        const requests = newStockList.map((stock, index) => {
          return new Promise((resolve, reject) => {
            wx.request({
              url: 'https://hq.sinajs.cn/',
              data: {
                list: stock.jys.toLowerCase() + stock.dm.slice(0,6)
              },
              success: (res) => {
                const result = parseStockData(res.data);
                console.log(`股票 ${stock.dm} 的解析结果:`, result);
                
                // 正确解析价格和涨跌幅
                const price = result[3] || '0.00'; // 当前价格通常在索引3
                const increaseAmount = parseFloat(result[3] || 0) - parseFloat(result[2] || 0);
                const increaseRate = ((increaseAmount / (parseFloat(result[2]) || 1)) * 100).toFixed(2);
                const increase = (increaseAmount >= 0 ? '+' : '') + increaseRate + '%';
                
                // 使用索引确保修改正确的元素
                newStockList[index] = {
                  ...newStockList[index],
                  price,
                  increase
                };
                
                resolve();
              },
              fail: (err) => {
                console.error(`获取股票 ${stock.dm} 价格失败:`, err);
                // 失败时也设置默认值
                newStockList[index] = {
                  ...newStockList[index],
                  price: 'N/A',
                  increase: 'N/A'
                };
                resolve();
              }
            });
          });
        });
        
        // 等待所有请求完成后再更新UI
        Promise.all(requests).then(() => {
          console.log('所有股票价格已更新:', newStockList);
          this.setData({
            stockList: newStockList
          });
        }).catch((error) => {
          console.error('请求出错:', error);
        });
      },
      fail: (err) => {
        console.error('请求失败:', err);
      }
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