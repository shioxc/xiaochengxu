const cloud = require('wx-server-sdk')
const request = require('request')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  try {
    const { phone } = event

    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return {
        code: 400,
        message: '请输入有效的手机号码'
      }
    }
    const wxContext = cloud.getWXContext()
    const db = cloud.database()

    const userRes = await db.collection('user')
      .where({
        _openid: wxContext.OPENID
      })
      .get()

    const userData = {
      phone,
      openid: wxContext.OPENID,
      session_key: wxContext.SESSION_KEY,
      loginStatus: 1,
      updateTime: db.serverDate(),
      lastLoginTime: db.serverDate()
    }
    
    let result
    if (userRes.data.length === 0) {
      userData.createTime = db.serverDate()
      result = await db.collection('user').add({
        data: userData
      })
      userData._id = result._id
    } else {
      result = await db.collection('user').doc(userRes.data[0]._id).update({
        data: userData
      })
      userData._id = userRes.data[0]._id
    }

    return {
      code: 200,
      message: '登录成功',
      data: {
        userInfo: {
          phone: userData.phone,
          openid: userData.openid,
          loginStatus: userData.loginStatus
        },
        timestamp: new Date().getTime()
      }
    }
    
  } catch (err) {
    console.error('登录失败:', err)
    return {
      code: 500,
      message: '登录失败，请稍后重试',
      error: err.message
    }
  }
};