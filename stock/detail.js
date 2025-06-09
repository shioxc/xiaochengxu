// pages/stock/detail.js
Page({
    data: {
      currentTab: 'trade',         // 当前显示的标签页
      stockInfo: null,             // 股票基础信息（包含名称、代码、实时数据）
      newsList: [],                // 新闻列表
      kLineUrl: '',                // K线图URL
      currentKType: 'min',         // 当前K线类型（分时/日K等）
      bids: [],                    // 买盘数据（5档）
      asks: [],                    // 卖盘数据（5档）
      loading: true,               // 数据加载状态
      error: null,                 // 错误信息
      kTypeMap: {                  // K线类型映射
        min: '分时',
        daily: '日K',
        weekly: '周K',
        monthly: '月K'
      }
    },
  
    /**
     * 页面加载时触发（处理路由参数和数据初始化）
     */
    onLoad(options) {
      // 校验必填参数
      if (!options.name || !options.code) {
        this.handleDataError('缺少股票参数');
        return;
      }
  
      const name = decodeURIComponent(options.name);
      const stockCode = options.code; // 原始股票代码（如600000，不带市场前缀）
  
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: `${name} (${stockCode})`
      });
  
      // 初始化基础信息（立即显示名称和代码，避免页面空白）
      this.setData({
        stockInfo: {
          name,
          code: stockCode // 保存原始代码（用于显示和分享）
        },
        newsList: this.getMockNews() // 加载模拟新闻数据（实际可改为接口请求）
      });
  
      // 加载股票实时数据
      this.fetchStockData(stockCode);
    },
  
    /**
     * 获取模拟新闻数据（实际开发中替换为接口请求）
     */
    getMockNews() {
      return [
        {
          id: 1,
          title: "腾讯云发布新一代服务器架构",
          time: "2025-03-15",
          content: "详细内容..."
        },
        {
          id: 2,
          title: "微信支付接入数字人民币",
          time: "2025-03-14",
          content: "详细内容..."
        }
      ];
    },
  
    /**
     * 切换底部标签页
     */
    switchTab(e) {
      this.setData({ currentTab: e.currentTarget.dataset.tab });
    },
  
    /**
     * 加载股票实时数据（核心函数）
     */
    fetchStockData(stockCode) {
      const market = this.getMarketPrefix(stockCode); // 获取市场前缀（sh/sz）
      const fullCode = `${market}${stockCode}`; // 完整代码（如sh600000）
      const url = `https://hq.sinajs.cn/list=${fullCode}`; // 新浪股票数据接口
  
      wx.request({
        url,
        responseType: 'arraybuffer', // 处理GBK编码
        success: (res) => this.handleStockData(res, fullCode),
        fail: () => this.handleDataError('网络请求失败')
      });
    },
  
    /**
     * 获取市场前缀（6开头为上交所，其余为深交所）
     */
    getMarketPrefix(code) {
      return code.startsWith('6') ? 'sh' : 'sz';
    },
  
    /**
     * 处理股票数据响应（解析并更新页面）
     */
    handleStockData(res, fullCode) {
      try {
        const decoder = new TextDecoder('GBK');
        const dataStr = decoder.decode(res.data);
        const parsedData = this.parseStockData(dataStr, fullCode);
  
        // 合并基础信息和实时数据
        this.setData({
          stockInfo: {
            ...this.data.stockInfo, // 保留名称和原始代码
            ...parsedData.stockInfo // 合并实时数据（价格、成交量等）
          },
          bids: parsedData.bids,
          asks: parsedData.asks,
          kLineUrl: this.generateKLineUrl(fullCode, 'min'), // 初始化分时图
          loading: false
        });
      } catch (error) {
        console.error('数据解析失败:', error);
        this.handleDataError('数据解析失败');
      }
    },
  
    /**
     * 解析股票数据字符串
     */
    parseStockData(dataStr, fullCode) {
      const reg = /="(.*?)"/;
      const data = dataStr.match(reg)?.[1]?.split(',') || []; // 安全解析
  
      return {
        stockInfo: {
          open: data[1] || '--',         // 今开
          prevClose: data[2] || '--',    // 昨收
          current: data[3] || '--',      // 当前价
          high: data[4] || '--',         // 最高
          low: data[5] || '--',          // 最低
          volume: this.formatVolume(data[8]), // 成交量（万手）
          amount: this.formatAmount(data[9]), // 成交额（亿元）
          date: data[30] || '--',        // 日期
          time: data[31] || '--',        // 时间
          code: this.data.stockInfo.code // 使用原始代码（不带前缀）
        },
        bids: this.parseOrderData(data, 10, 11), // 解析买盘（从第10个元素开始）
        asks: this.parseOrderData(data, 20, 21)  // 解析卖盘（从第20个元素开始）
      };
    },
  
    /**
     * 格式化成交量（转换为万手）
     */
    formatVolume(volume) {
      return volume ? `${(volume / 1000000).toFixed(2)}万手` : '--';
    },
  
    /**
     * 格式化成交额（转换为亿元）
     */
    formatAmount(amount) {
      return amount ? `${(amount / 100000000).toFixed(2)}亿元` : '--';
    },
  
    /**
     * 解析买卖盘数据（通用函数）
     */
    parseOrderData(data, volIndex, priceIndex) {
      const order = [];
      for (let i = 0; i < 5; i++) {
        order.push({
          price: data[priceIndex + i * 2] || '--',
          volume: data[volIndex + i * 2] 
            ? `${(data[volIndex + i * 2] / 100).toFixed(0)}手` 
            : '--'
        });
      }
      return order;
    },
  
    /**
     * 切换K线类型
     */
    switchKType(e) {
      const type = e.currentTarget.dataset.type;
      const fullCode = this.getMarketPrefix(this.data.stockInfo.code) + 
                       this.data.stockInfo.code; // 重新拼接完整代码
      
      this.setData({
        currentKType: type,
        kLineUrl: this.generateKLineUrl(fullCode, type)
      });
    },
  
    /**
     * 生成K线图URL
     */
    generateKLineUrl(fullCode, type) {
      return `https://image.sinajs.cn/newchart/${type}/n/${fullCode}.gif?t=${Date.now()}`;
    },
  
    /**
     * 处理数据加载错误
     */
    handleDataError(msg) {
      this.setData({ error: msg, loading: false });
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      });
    },
  
    /**
     * 新闻点击事件（跳转新闻详情页）
     */
    onNewsClick(e) {
      const { id, title } = e.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/news/detail?id=${id}&title=${encodeURIComponent(title)}`
      });
    },
  
    /**
     * 微信分享配置（关键功能）
     */
    onShareAppMessage() {
      const { name, code } = this.data.stockInfo || {};
      if (!name || !code) return; // 数据未加载完成时不允许分享
  
      return {
        title: `查看${name} (${code}) 股票详情`, // 分享标题
        path: `/pages/stock/detail?name=${encodeURIComponent(name)}&code=${code}`, // 携带参数的分享路径

      };
    }
  });