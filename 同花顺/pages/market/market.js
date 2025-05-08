// pages/market/market.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '',
    hotConcepts: [
      { name: '细胞免疫治疗', rate: '4.32%' },
      { name: '阿尔茨海默概念', rate: '1.69%' },
      { name: '合成生物', rate: '1.62%' }
    ],
    hotIndustries: [
      { name: '黄金', rate: '2.04%' }
    ],
    hotStocks: [
      { name: '泰林生物', rate: '20.01%' },
      { name: '鲁抗医药', rate: '10.05%' },
      { name: '瑞丰高材', rate: '20.00%' },
      { name: '西部黄金', rate: '10.02%' }
    ],

    rankTabs: ['涨幅榜', '跌幅榜', '成交额', '涨速榜'],
    activeTab: 0,

    upStocks: [
      { 
        name: '泰林生物', 
        code: '300813',
        price: '22.37', 
        changeRate: '+20.01%',
        speed: '+0.36%'
      },
      { 
        name: '瑞丰高材', 
        code: '300243',
        price: '14.76', 
        changeRate: '+20.00%',
        speed: '0.00%'
      },
      { 
        name: '华安鑫创',
        code: '300928',
        price: '44.00', 
        changeRate: '+19.99%',
        speed: '0.00%'
      },
      { 
        name: '西部黄金',
        code: '601069',
        price: '15.32', 
        changeRate: '+10.02%',
        speed: '+0.12%'
      }
    ],

    downStocks: [
      { 
        name: 'ST股A', 
        code: '600123',
        price: '3.45', 
        changeRate: '-5.02%',
        speed: '-0.25%'
      },
      { 
        name: '问题股B', 
        code: '300456',
        price: '8.76', 
        changeRate: '-4.98%',
        speed: '0.00%'
      },
      { 
        name: '调整股C',
        code: '002345',
        price: '12.40', 
        changeRate: '-3.75%',
        speed: '-0.15%'
      }
    ],

    amountStocks: [
      { 
        name: '贵州茅台', 
        code: '600519',
        price: '1720.50', 
        amount: '25.6',
        turnover: '0.32%'
      },
      { 
        name: '宁德时代', 
        code: '300750',
        price: '198.75', 
        amount: '18.2',
        turnover: '1.25%'
      },
      { 
        name: '比亚迪',
        code: '002594',
        price: '245.60', 
        amount: '15.8',
        turnover: '1.05%'
      }
    ],

    speedStocks: [
      { 
        name: '快速股A', 
        code: '600123',
        price: '12.45', 
        changeRate: '+5.02%',
        speed: '+2.25%'
      },
      { 
        name: '快速股B', 
        code: '300456',
        price: '28.76', 
        changeRate: '+4.98%',
        speed: '+1.80%'
      },
      { 
        name: '快速股C',
        code: '002345',
        price: '32.40', 
        changeRate: '+3.75%',
        speed: '+1.25%'
      }
    ],
  },
  switchTab: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeTab: index
    });
  },
  
  updateDateTime() 
  {
    const now = new Date();
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const weekDay = weekDays[now.getDay()];
    
    this.setData({
      currentDate: `${year}年${month}月${day}日 ${weekDay}`
    });
  },
  navigateToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) 
  {
    this.updateDateTime();
    this.setInterval = setInterval(() => {
      this.updateDateTime();
    }, 1000);
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
    clearInterval(this.setInterval);
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