// index.js
Page({
    data: {
      mobile: '',
      code: '',
      isValid: false,
      countdown: 0,
      timer: null
    },
  
    // 手机号输入处理
    handleMobileInput(e) {
      const value = this.filterInput(e.detail.value, 11);
      this.updateValidity(value, this.data.code);
    },
  
    // 验证码输入处理
    handleCodeInput(e) {
      const value = this.filterInput(e.detail.value, 6);
      this.updateValidity(this.data.mobile, value);
    },
  
    // 输入过滤
    filterInput(value, maxLength) {
      const cleanValue = value.replace(/[^\d]/g, '');
      if (value !== cleanValue) {
        wx.showToast({ title: '只能输入数字', icon: 'none' });
      }
      return cleanValue.slice(0, maxLength);
    },
  
    // 更新有效性状态
    updateValidity(mobile, code) {
      this.setData({
        mobile,
        code,
        isValid: mobile.length === 11 && code.length === 6
      });
    },
  
    // 获取验证码
    handleGetCode() {
      if (this.data.countdown > 0) return;
      
      if (this.data.mobile.length !== 11) {
        wx.showToast({ title: '请输入有效手机号', icon: 'none' });
        return;
      }
  
      // 模拟发送验证码
      wx.showToast({ title: '验证码已发送', icon: 'none' });
      
      // 启动倒计时
      this.startCountdown(60);
    },
  
    // 倒计时处理
    startCountdown(seconds) {
      this.setData({ countdown: seconds });
      
      const timer = setInterval(() => {
        if (this.data.countdown <= 1) {
          clearInterval(timer);
          this.setData({ countdown: 0 });
          return;
        }
        this.setData({ countdown: this.data.countdown - 1 });
      }, 1000);
      
      this.setData({ timer });
    },
  
    // 登录处理
    handleLogin(e) {
      if (!this.data.isValid) {
        wx.showToast({ title: '请填写完整信息', icon: 'none' });
        return;
      }
  
      // 模拟登录请求
      wx.showLoading({ title: '登录中...' });
      
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,
          success: () => {
            setTimeout(() => {
              wx.reLaunch({ url: '/pages/home/home' });
            }, 1500);
          }
        });
      }, 1500);
    },
  
    // 页面卸载清除定时器
    onUnload() {
      clearInterval(this.data.timer);
    }
  });