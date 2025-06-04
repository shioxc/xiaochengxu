// pages/login/login.js
Page({
  data: {
    phone: '',
    isBtnActive: false
  },

  handleInputChange(e) {
    const phone = e.detail.value;
    const isBtnActive = phone.length === 11;
  
    this.setData({
      phone,
      isBtnActive
    });
  },

  handleLogin() {
    const { phone } = this.data;
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
  
    wx.showLoading({
      title: '登录中...',
    });

    wx.cloud.callFunction({
      name: 'login',
      data: {
        phone
      },
      success: (res) => {
        wx.hideLoading();
        if (res.result.code === 200) {
          wx.showToast({
            title: '登录成功',
          });

          getApp().globalData.userInfo = res.result.data;
          getApp().globalData.isLogin = true;

          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        } else {
          wx.showToast({
            title: res.result.message || '登录失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const db = wx.cloud.database()
    db.collection('user').get({
      success: res => {
        console.log('user集合查询成功', res.data)
      },
      fail: err => {
        console.error('user集合查询失败', err)
      }
    })
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