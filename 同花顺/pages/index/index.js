// index.js
const dateBehavior = require('../../components/behaviors/dateBehavior');

Page({
  data: {
    currentDate: '' // 初始化日期数据
  },
  behaviors: [dateBehavior], // 注入 Behavior

  onLoad: function() {
    const formattedDate = this.data.currentDate // 格式化时间
    this.setData({
      currentDate: formattedDate // 设值
    });
  }
})
