// pages/hangqing.js
// 基本参数配置
const apiUrl = 'http://web.juhe.cn/finance/stock/hkall'; // 接口请求URL
const apiKey = '172a3eeee94c33465613f2b2f3a5e8af'; 

Page({
  data: {
    // 保持原有数据结构不变
    stockList: [],
    blockList: [
      { name: '港口航运', percentage: '+3.83%', company: '国航远洋', percentage2: '+29.94%' },
      { name: '转基因', percentage: '+3.15%', company: '秋乐种业', percentage2: '11.99%' },
      { name: '毛发医疗', percentage: '+2.25%', company: '澳洋健康', percentage2: '+10.12%' },
      { name: '玉米', percentage: '+2.18%', company: '秋乐种业', percentage2: '+11.99%' },
      { name: '美容护理', percentage: '+2.19%', company: '华业香料', percentage2: '+20.00%' }
    ],
    tabList: [
      { name: '涨幅榜' },
      { name: '跌幅榜' },
      { name: '成交额榜' },
      { name: '涨速榜' }
    ],
    currentTab: 0,
    riseList: [], // 清空假数据，等待接口数据
    fallList: [],
    transactionList: [],
    speedList: [],
    isLoggedIn: false,
    userAvatar: ''
  },

  switchTab: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
  },

  navigateToStockDetail(e) {
    const stockName = e.currentTarget.dataset.stockname;
    const stockCode = e.currentTarget.dataset.stockcode;
    const jys = e.currentTarget.dataset.jys
    wx.navigateTo({
      url: `/pages/stock-detail/stock-detail?stockName=${stockName}&stockCode=${stockCode}&jys=${jys}`
    });
  },

  navigateToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  // 处理输入框聚焦事件
onInputFocus() {
  // 可选：在聚焦时添加延迟以确保输入法面板正常显示
  setTimeout(() => {}, 100);
},

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
                //console.log(`股票 ${stock.dm} 的解析结果:`, result);
                
                // 正确解析价格和涨跌幅
                const price = result[3] || '0.00'; // 当前价格通常在索引3
                const increaseAmount = parseFloat(result[3] || 0) - parseFloat(result[2] || 0);
                const increaseRate = ((increaseAmount / (parseFloat(result[2]) || 1)) * 100).toFixed(2);
                const increase = (increaseAmount >= 0 ? '+' : '') + increaseRate + '%';
                const chengjiaoe = result[9];
                const zhangsu = String(((result[1]-result[2])*100/Number(result[2])).toFixed(2))
                
                // 使用索引确保修改正确的元素
                newStockList[index] = {
                  ...newStockList[index],
                  price,
                  increase,
                  chengjiaoe,
                  zhangsu
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
          const updatedData = newStockList;
          this.setData({
            riseList:[...updatedData].sort((a, b) => parseFloat(b.increase) - parseFloat(a.increase)),
            fallList:[...updatedData].sort((a, b) => parseFloat(a.increase) - parseFloat(b.increase)),
            transactionList:[...updatedData].sort((a, b) => parseFloat(b.chengjiaoe) - parseFloat(a.chengjiaoe)),
            speedList:[...updatedData].sort((a, b) => parseFloat(b.zhangsu) - parseFloat(a.zhangsu))
          });
          console.log("涨幅榜",this.data.riseList);    
        }).catch((error) => {
          console.error('请求出错:', error);
        });
      },
      fail: (err) => {
        console.error('请求失败:', err);
      }
    });
  },

  // 其余生命周期函数保持不变
  onShow() {
    const openid = wx.getStorageSync('openid');
    if (openid) {
      this.setData({
        isLoggedIn: true,
        userAvatar: 'http://103.185.248.31/api/file/getImage/202503/vcffKDipMSSWzrladPJePjJRBwMDBz.jpg'
      });
    } else {
      this.setData({
        isLoggedIn: false,
        userAvatar: ''
      });
    }
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

  },
  showUserMenu() {
    wx.showActionSheet({
      itemList: ['切换手机号', '退出登录'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 点击切换手机号
          wx.navigateTo({
            url: '/pages/login/login'
          });
        } else if (res.tapIndex === 1) {
          // 点击退出登录
          wx.removeStorageSync('openid');
          this.setData({
            isLoggedIn: false,
            userAvatar: ''
          });
          wx.showToast({
            title: '退出登录成功',
            icon: 'success'
          });
        }
      },
      fail: (err) => {
        console.error('显示操作菜单失败:', err);
      }
    });
  }
})