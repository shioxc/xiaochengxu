const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
exports.main = async (event, context) => {
  const { stockCode, action } = event
  const { OPENID } = cloud.getWXContext()
  const db = cloud.database()
  try {
    const record = await db.collection('selectedStock')
      .where({ _openid: OPENID })
      .get()
    if (record.data.length === 0) {
      if (action === 'add') {
        await db.collection('selectedStock').add({
          data: {
            stocks: [stockCode],
            updateTime: db.serverDate()
          }
        })
        return { code: 200, message: '添加成功', data: { stocks: [stockCode] } }
      }
      return { code: 404, message: '无自选股记录' }
    } else {
      const currentStocks = record.data[0].stocks || []
      let newStocks = []
      
      if (action === 'add') {
        if (currentStocks.includes(stockCode)) {
          return { code: 200, message: '已存在', data: { stocks: currentStocks } }
        }
        newStocks = [...currentStocks, stockCode]
      } else {
        newStocks = currentStocks.filter(code => code !== stockCode)
      }

      await db.collection('selectedStock').doc(record.data[0]._id).update({
        data: {
          stocks: newStocks,
          updateTime: db.serverDate()
        }
      })

      return { code: 200, message: '操作成功', data: { stocks: newStocks } }
    }
  } catch (err) {
    console.error('操作失败:', err)
    return { code: 500, message: '操作失败', error: err }
  }
}