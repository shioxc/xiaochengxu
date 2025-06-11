const app = getApp();
let that = null;
Page({
  onLoad(options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#FFFFFF',
      animation: {
        duration: 400,
        timingFunc: 'easeInOut'
      }
    });
    that = this;
    if (options.url != null) {
      this.setData({
        webUrl: options.url,
      });
      if (options.title != null) {
        wx.setNavigationBarTitle({
          title: options.title,
        });
      }
    } else {
      wx.navigateBack({
        delta: 1,
      });
    }
  },
});