// pages/login/login.js
Page({
  data: {
    phone: '',
    isButtonEnabled: false
  },
  handlePhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
    this.checkButtonEnable();
  },
  checkButtonEnable() {
    const { phone } = this.data;
    if (phone.trim()) {
      this.setData({
        isButtonEnabled: true
      });
    } else {
      this.setData({
        isButtonEnabled: false
      });
    }
  },
  formSubmit(e) {
    wx.showLoading({
      title: '登录中...',
    });
    wx.login({
      success: res => {
        if (res.code) {
          wx.cloud.callFunction({
            name: 'login',
            data: {
              code: res.code,
              phone: this.data.phone
            },
            success: result => {
              wx.hideLoading();
              if (result.result && result.result.openid) {
                wx.setStorageSync('openid', result.result.openid);
                wx.setStorageSync('phone', this.data.phone);
                wx.setStorageSync('session_key', result.result.session_key);
                wx.setStorageSync('loginStatus', 1);
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1500,
                  success: () => {
                    setTimeout(() => {
                      wx.switchTab({
                        url: '/pages/index/index'
                      });
                    }, 1500);
                  }
                });
              } else {
                wx.showToast({
                  title: '登录失败，请重试',
                  icon: 'none'
                });
              }
            },
            fail: err => {
              wx.hideLoading();
              wx.showToast({
                title: '登录失败，请重试',
                icon: 'none'
              });
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '获取code失败',
            icon: 'none'
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        });
      }
    });
  }
});