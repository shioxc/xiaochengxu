const cloud = require('wx-server-sdk')
const request = require('request')
cloud.init()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  await db.collection('user').where({
    _openid: wxContext.OPENID
  }).update({
    data: {
      loginStatus: 0,
      updateTime: db.serverDate()
    }
  })
  
  return {
    code: 200,
    message: '退出成功'
  }
};