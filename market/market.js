Page({
    data: {
      // 今日板块数据（8条）
      blockList: [
        { 
          name: '细胞免疫治疗', 
          percentage: '+4.32%', 
          leadingStock: '泰林生物', 
          leadingCode: '300813', 
          leadingChange: '+20.01%' 
        },
        { 
          name: '阿尔茨海默概念', 
          percentage: '+1.69%', 
          leadingStock: '鲁抗医药', 
          leadingCode: '600789', 
          leadingChange: '+10.05%' 
        },
        { 
          name: '合成生物', 
          percentage: '+1.62%', 
          leadingStock: '瑞丰高材', 
          leadingCode: '300243', 
          leadingChange: '+20.00%' 
        },
        { 
          name: '贵金属', 
          percentage: '+2.04%', 
          leadingStock: '中金黄金', 
          leadingCode: '600489', 
          leadingChange: '+14.00%' 
        },
        { 
          name: 'AI芯片', 
          percentage: '+3.85%', 
          leadingStock: '寒武纪', 
          leadingCode: '688256', 
          leadingChange: '+18.52%' 
        },
        { 
          name: 'CPO概念', 
          percentage: '+2.91%', 
          leadingStock: '中际旭创', 
          leadingCode: '300308', 
          leadingChange: '+12.34%' 
        },
        { 
          name: '存储芯片', 
          percentage: '+3.17%', 
          leadingStock: '兆易创新', 
          leadingCode: '603986', 
          leadingChange: '+9.87%' 
        },
        { 
          name: '算力概念', 
          percentage: '+2.54%', 
          leadingStock: '工业富联', 
          leadingCode: '601138', 
          leadingChange: '+7.65%' 
        }
      ],
  
      // 页签配置（4个榜单）
      tabList: [
        { name: '涨幅榜' },
        { name: '跌幅榜' },
        { name: '成交额榜' },
        { name: '涨速榜' },
      ],
      currentTab: 0, // 默认显示涨幅榜
  
      // 涨幅榜数据（10条）
      riseList: [
        { name: '泰林生物', code: '300813', price: '22.37', change: '+20.01%', speed: '+0.36%' },
        { name: '瑞丰高材', code: '300243', price: '14.76', change: '+20.00%', speed: '0.00%' },
        { name: '华安鑫创', code: '300928', price: '44.00', change: '+19.99%', speed: '0.00%' },
        { name: '英可瑞', code: '300713', price: '18.25', change: '+19.98%', speed: '+0.22%' },
        { name: '迦南智能', code: '300880', price: '15.36', change: '+19.97%', speed: '+0.18%' },
        { name: '金百泽', code: '301041', price: '28.90', change: '+19.96%', speed: '+0.15%' },
        { name: '通力科技', code: '301255', price: '32.10', change: '+19.95%', speed: '+0.12%' },
        { name: '波长光电', code: '301421', price: '45.67', change: '+19.94%', speed: '+0.10%' },
        { name: '威士顿', code: '301315', price: '38.20', change: '+19.93%', speed: '+0.08%' },
        { name: '挖金客', code: '301380', price: '29.45', change: '+19.92%', speed: '+0.05%' }
      ],
  
      // 跌幅榜数据（10条）
      fallList: [
        { name: '*ST美谷', code: '000615', price: '2.12', change: '-5.07%', speed: '-0.10%' },
        { name: '*ST泛海', code: '000046', price: '0.49', change: '-4.90%', speed: '-0.08%' },
        { name: '*ST新海', code: '002089', price: '0.55', change: '-4.39%', speed: '-0.06%' },
        { name: '*ST同洲', code: '002052', price: '1.12', change: '-4.31%', speed: '-0.05%' },
        { name: '*ST京蓝', code: '000711', price: '0.67', change: '-4.29%', speed: '-0.04%' },
        { name: '*ST海投', code: '000616', price: '0.89', change: '-4.17%', speed: '-0.03%' },
        { name: '*ST宜康', code: '000150', price: '0.35', change: '-4.11%', speed: '-0.02%' },
        { name: '*ST中昌', code: '600242', price: '0.58', change: '-4.00%', speed: '-0.01%' },
        { name: '*ST吉艾', code: '300309', price: '0.42', change: '-3.95%', speed: '0.00%' },
        { name: '*ST左江', code: '300799', price: '89.50', change: '-3.88%', speed: '+0.02%' }
      ],
  
      // 成交额榜数据（10条）
      transactionList: [
        { name: '中际旭创', code: '300308', price: '158.23', change: '+3.85%', transaction: '89.23' },
        { name: '剑桥科技', code: '603083', price: '67.54', change: '+2.91%', transaction: '76.54' },
        { name: '工业富联', code: '601138', price: '23.17', change: '+1.22%', transaction: '72.17' },
        { name: '科大讯飞', code: '002230', price: '58.45', change: '+0.89%', transaction: '68.45' },
        { name: '浪潮信息', code: '000977', price: '45.32', change: '+0.56%', transaction: '65.32' },
        { name: '三六零', code: '601360', price: '18.76', change: '-0.12%', transaction: '62.10' },
        { name: '拓维信息', code: '002261', price: '15.43', change: '+0.33%', transaction: '59.87' },
        { name: '中科曙光', code: '603019', price: '42.90', change: '+1.11%', transaction: '57.65' },
        { name: '寒武纪', code: '688256', price: '189.50', change: '+2.22%', transaction: '55.43' },
        { name: '鸿博股份', code: '002229', price: '28.90', change: '+1.22%', transaction: '53.21' }
      ],
  
      // 涨速榜数据（10条）
      speedList: [
        { name: '鸿博股份', code: '002229', price: '28.90', change: '+1.22%', speed: '+5.83%' },
        { name: '拓维信息', code: '002261', price: '15.43', change: '+0.33%', speed: '+4.92%' },
        { name: '光迅科技', code: '002281', price: '34.17', change: '+0.99%', speed: '+4.17%' },
        { name: '华西股份', code: '000936', price: '12.89', change: '+0.55%', speed: '+3.89%' },
        { name: '寒武纪', code: '688256', price: '189.50', change: '+2.22%', speed: '+3.54%' },
        { name: '中际旭创', code: '300308', price: '158.23', change: '+3.85%', speed: '+3.21%' },
        { name: '剑桥科技', code: '603083', price: '67.54', change: '+2.91%', speed: '+2.98%' },
        { name: '工业富联', code: '601138', price: '23.17', change: '+1.22%', speed: '+2.76%' },
        { name: '科大讯飞', code: '002230', price: '58.45', change: '+0.89%', speed: '+2.54%' },
        { name: '浪潮信息', code: '000977', price: '45.32', change: '+0.56%', speed: '+2.33%' }
      ]
    },
  
    // 切换页签
    switchTab(e) {
      const index = e.currentTarget.dataset.index;
      this.setData({ currentTab: index });
    }
  });