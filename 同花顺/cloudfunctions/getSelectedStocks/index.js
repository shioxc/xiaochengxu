const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const db = cloud.database()

  try {
    const res = await db.collection('selectedStock')
      .where({ _openid: OPENID })
      .get()

    if (res.data.length > 0) {
      return { code: 200, data: res.data[0].stocks || [] }
    }
    return { code: 200, data: [] }
  } catch (err) {
    console.error('获取失败:', err)
    return { code: 500, message: '获取失败', error: err }
  }
}