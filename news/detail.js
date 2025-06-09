// 新闻详情页JS（pages/news/detail.js）
Page({
    data: {
        newsDetail: null
    },

    onLoad(options) {
        const newsId = options.id;
        const newsTitle = decodeURIComponent(options.title);
        
        // 设置导航栏标题
        wx.setNavigationBarTitle({
            title: newsTitle
        });

        // 模拟根据ID获取新闻详情
        const newsData = {
            1: {
                title: "腾讯云发布新一代服务器架构",
                time: "2025-03-15 09:30",
                content: "腾讯云今日正式发布基于...",
                source: "财经网"
            },
            2: {
                title: "微信支付接入数字人民币",
                time: "2025-03-14 15:45",
                content: "中国人民银行宣布...",
                source: "新华社"
            }
        };

        this.setData({
            newsDetail: newsData[newsId]
        });
    }
});