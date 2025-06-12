// index.js
const dateBehavior = require('../../components/behaviors/dateBehavior');

Page({
  data: {
    currentDate: '', // 初始化日期数据
    shPrice:"",
    shIncrease:"",
    szPrice:"",
    szIncrease:"",
    cyPrice:"",
    cyIncrease:"",
    news:[]
  },
  behaviors: [dateBehavior], // 注入 Behavior
  onLoad: function() {
    this.requestNews()
    const formattedDate = this.data.currentDate // 格式化时间
    this.setData({
      currentDate: formattedDate // 设值
    });
    wx.request({
      url: 'https://hq.sinajs.cn/',
      data: {
        list: "sh000001"
      },
      success: (res) => {
        const result = this.parseStockData(res.data);
        const price = result[3] || '0.00'; // 当前价格通常在索引3
        const increaseAmount = parseFloat(result[3] || 0) - parseFloat(result[2] || 0);
        const increaseRate = ((increaseAmount / (parseFloat(result[2]) || 1)) * 100).toFixed(2);
        const increase = (increaseAmount >= 0 ? '+' : '') + increaseRate + '%';
        this.setData({
          shPrice:Number(price).toFixed(2),
          shIncrease:increase
        })
        console.log(result);
      },
      fail: (err) => {

      }
    });   
    wx.request({
      url: 'https://hq.sinajs.cn/',
      data: {
        list: "sz399001"
      },
      success: (res) => {
        const result = this.parseStockData(res.data);
        const price = result[3] || '0.00'; // 当前价格通常在索引3
        const increaseAmount = parseFloat(result[3] || 0) - parseFloat(result[2] || 0);
        const increaseRate = ((increaseAmount / (parseFloat(result[2]) || 1)) * 100).toFixed(2);
        const increase = (increaseAmount >= 0 ? '+' : '') + increaseRate + '%';
        this.setData({
          szPrice:Number(price).toFixed(2),
          szIncrease:increase
        })
      },
      fail: (err) => {

      }
    });  
    wx.request({
      url: 'https://hq.sinajs.cn/',
      data: {
        list: "sz399006"
      },
      success: (res) => {
        const result = this.parseStockData(res.data);
        const price = result[3] || '0.00'; // 当前价格通常在索引3
        const increaseAmount = parseFloat(result[3] || 0) - parseFloat(result[2] || 0);
        const increaseRate = ((increaseAmount / (parseFloat(result[2]) || 1)) * 100).toFixed(2);
        const increase = (increaseAmount >= 0 ? '+' : '') + increaseRate + '%';
        this.setData({
          cyPrice:Number(price).toFixed(2),
          cyIncrease:increase
        })
      },
      fail: (err) => {

      }
    });  
  },
  parseStockData(rawData) {
    // 首先提取等号后面的实际数据部分
    const regex = /"([^"]+)"/;
    const match = rawData.match(regex);
    
    if (!match || !match[1]) {
      console.error('无法解析股票数据:', rawData);
      return [];
    }
    // 使用逗号分割数据并返回数组
    return match[1].split(',');
  },
  requestNews(){
    wx.request({
      url: 'https://news.10jqka.com.cn/tapp/news/headline/ths',
      success: (res) => {
        // console.log(res)
        if(res.data.code === 200) {
          let _data = res.data.data
          this.setData({
            news: _data
          })
          console.log(res.data);
          console.log(_data);
          console.log(this.data.news);
        }
      }
    })
  },
  changeCollapse: function() {
    this.setData({
      isCollapse: !this.data.isCollapse
    });
  },
})
