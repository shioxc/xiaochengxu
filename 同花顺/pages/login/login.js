// pages/login/login.js
Page({
  data: {
    phone: '',
    code: '',
    isButtonEnabled: false
  },
  handlePhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
    this.checkButtonEnable();
  },
  handleCodeInput(e) {
    this.setData({
      code: e.detail.value
    });
    this.checkButtonEnable();
  },
  checkButtonEnable() {
    const { phone, code } = this.data;
    if (phone.trim() && code.trim()) {
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
    console.log('提交表单', e.detail.value);
    // 这里可以添加实际的登录逻辑，如调用登录接口
  },
  getCode() {
    // 这里可添加获取验证码的实际逻辑，如调用后端接口
    console.log('点击获取验证码');
  }
});