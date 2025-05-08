// pages/login/login.js
Page({
  data: {
    phone: '',
    code: '',
    isBtnActive: false
  },
  handlePhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
    this.checkBtnStatus();
  },
  handleCodeInput(e) {
    this.setData({
      code: e.detail.value
    });
    this.checkBtnStatus();
  },
  checkBtnStatus() {
    const { phone, code } = this.data;
    this.setData({
      isBtnActive: phone.length === 11 && code.length > 0
    });
  },
  handleLogin() {
    if (!this.data.isBtnActive) return;
    
    wx.showLoading({
      title: '登录中...',
    });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
    }, 1500);
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