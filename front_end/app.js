//app.js
App({
  userInfo: null,
  openId: '',
  sendUserInfoToServer: function(res) {
    var that = this;
    console.log(that.openId)
    wx.request({
      url: 'https://www.chengfpl.com/weili/user/add',
      method: "POST",
      header: {
        "content-type": "form-data"
      },
      data: {
        openId: that.openId,
        nickname: res.nickName,
        avatar: res.avatarUrl
      },
      success: function(res) {
        console.log('add:', res)
      }
    })
  },
  onLaunch: function() {
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.chengfpl.com/weili/user/login',
            data: {
              code: res.code
            },
            success: function(res) {
              console.log('login:', res.data);
              that.openId = res.data.openid;
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // wx.getSetting({
    //   success: function(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log('userInfo', res)
    //           that.userInfo = res.userInfo;
    //           that.sendUserInfoToServer(res.userInfo)
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  }
})
