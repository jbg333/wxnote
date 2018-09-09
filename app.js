const hostUrl = require('./config').host
//app.js
App({
  onLaunch: function () {
    var self = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: hostUrl + '/api/user/wx/login?code=' + res.code,
          method: 'GET',
         // data: { code: res.code},
          success: function (rt) {
            var token = rt.data.data;
            if (token == null) {
              var toastText = '登陆失败';
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              });
            } else {
              console.log('获取token成功', rt);
              self.globalData.token = token;
              if (self.userTokenReadyCallback) {
                self.userTokenReadyCallback(token);
              }
            }
          }
        })


      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    token:null,
    baseUrl: hostUrl
  }
})