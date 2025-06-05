Page({
    /**
     * 页面的初始数据
     */
    data: {
        stockList: [
            { name: '佰维存储', code: '688525', price: 44.92, change: '20.01' },
            { name: '苏交科', code: '300284', price: 8.72, change: '19.95' },
            { name: '隆基绿能', code: '601012', price: 25.34, change: '-2.13' },
            { name: '比亚迪', code: '002594', price: 265.88, change: '1.05' },
            { name: '贵州茅台', code: '600519', price: 1789.50, change: '-0.87' },
            { name: '宁德时代', code: '300750', price: 225.77, change: '0.33' },
            { name: '招商银行', code: '600036', price: 35.67, change: '-0.55' },
            { name: '中国平安', code: '601318', price: 48.21, change: '0.21' },
            { name: '五粮液', code: '000858', price: 165.33, change: '0.78' },
            { name: '立讯精密', code: '002475', price: 28.90, change: '-1.22' },
            { name: '工商银行', code: '601398', price: 5.02, change: '0.20' },
            { name: '中国石油', code: '601857', price: 7.85, change: '-0.13' },
            { name: '农业银行', code: '601288', price: 3.65, change: '0.27' },
            { name: '中国银行', code: '601988', price: 4.22, change: '0.24' },
            { name: '中国建筑', code: '601668', price: 6.21, change: '-0.16' },
            { name: '中国人寿', code: '601628', price: 38.90, change: '0.41' },
            { name: '中国中免', code: '601888', price: 185.23, change: '-1.02' },
            { name: '海天味业', code: '603288', price: 78.65, change: '-0.56' },
            { name: '迈瑞医疗', code: '300760', price: 325.78, change: '0.67' },
            { name: '药明康德', code: '603259', price: 98.56, change: '-0.34' }
        ]
    },
    onStockClick(e) {
        const { name, code } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/stock/detail?name=${encodeURIComponent(name)}&code=${code}`
        });
    },

 
})    