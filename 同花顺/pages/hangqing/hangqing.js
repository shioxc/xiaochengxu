// pages/hangqing.js
const dateBehavior = require('../../components/behaviors/dateBehavior.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    blockList: [
      { name: '细胞免疫治疗', percentage: '4.32%', company: '泰林生物', percentage2: '20.01%' },
      { name: '阿尔茨海默概念', percentage: '1.69%', company: '鲁抗医药', percentage2: '10.05%' },
      { name: '合成生物', percentage: '1.62%', company: '瑞丰高材', percentage2: '20.00%' },
      { name: '贵金属', percentage: '2.04%', company: '未知公司', percentage2: '-14.00%' }
    ],
    tabList: [
      { name: '涨幅榜' },
      { name: '跌幅榜' },
      { name: '成交额榜' },
      { name: '涨速榜' }
    ],
    currentTab: 0,
    riseList: [
      { name: '泰林生物', price: '22.37', change: '+20.01%', speed: '+0.36%' },
      { name: '瑞丰高材', price: '14.76', change: '+20.00%', speed: '0.00%' },
      { name: '华安鑫创', price: '44.00', change: '+19.99%', speed: '0.00%' },
      { name: '博俊科技', price: '20.63', change: '+19.98%', speed: '-0.01%' },
      { name: '翰宇药业', price: '14.21', change: '+19.97%', speed: '-0.01%' }
    ],
    fallList: [
      { name: '某股票1', price: '10.00', change: '-5.00%', speed: '-0.10%' },
      { name: '某股票2', price: '20.00', change: '-4.50%', speed: '-0.08%' },
      { name: '某股票3', price: '15.00', change: '-4.00%', speed: '-0.06%' },
      { name: '某股票4', price: '25.00', change: '-3.50%', speed: '-0.04%' },
      { name: '某股票5', price: '30.00', change: '-3.00%', speed: '-0.02%' }
    ],
    transactionList: [
      { name: '成交股票1', price: '12.50', change: '+2.00%', transaction: '10000万' },
      { name: '成交股票2', price: '22.00', change: '-1.50%', transaction: '8000万' },
      { name: '成交股票3', price: '18.00', change: '+1.00%', transaction: '6000万' },
      { name: '成交股票4', price: '25.00', change: '-0.50%', transaction: '4000万' },
      { name: '成交股票5', price: '30.00', change: '+0.20%', transaction: '2000万' }
    ],
    speedList: [
      { name: '速涨股票1', price: '15.00', change: '+8.00%', speed: '+2.00%' },
      { name: '速涨股票2', price: '20.00', change: '+7.50%', speed: '+1.80%' },
      { name: '速涨股票3', price: '18.00', change: '+7.00%', speed: '+1.60%' },
      { name: '速涨股票4', price: '22.00', change: '+6.50%', speed: '+1.40%' },
      { name: '速涨股票5', price: '25.00', change: '+6.00%', speed: '+1.20%' }
    ],
    isLoggedIn: false, // 新增登录状态
    userAvatar: '' // 新增用户头像
  },

  switchTab: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
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
    const openid = wx.getStorageSync('openid');
    if (openid) {
      this.setData({
        isLoggedIn: true
      });
      // 这里可以根据 openid 从数据库获取用户头像信息
      // 示例：假设数据库中存储了用户头像信息
      // 这里简单模拟获取头像
      this.setData({
        userAvatar: 'http://103.185.248.31/api/file/getImage/202503/vcffKDipMSSWzrladPJePjJRBwMDBz.jpg' // 替换为实际头像地址
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