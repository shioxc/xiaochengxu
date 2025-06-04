const cloud = require('wx-server-sdk')
const request = require('request')
cloud.init()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const userRes = await db.collection('user')
    .where({
      _openid: wxContext.OPENID,
      loginStatus: 1
    })
    .get()
  
  if (userRes.data.length > 0) {
    return {
      code: 200,
      message: '已登录',
      data: userRes.data[0]
    }
  } else {
    return {
      code: 401,
      message: '未登录'
    }
  }
};