//index.js
//获取应用实例
const app = getApp()
var items = ['保存分享图到本地相册']
Page({
  data: {
    actionSheetHidden: true,
    actionSheetItems: items
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.userInfo) {
      this.setData({
        userInfo: app.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.sendUserInfoToServer(res.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindToStartActivity: function (e) {
    wx.navigateTo({
      url: '../form/index',
    })
  },
  shareTouchStart: function (e) {
    this.touchStartTime = e.timeStamp
  },
  shareTouchEnd: function (e) {
    this.touchEndTime = e.timeStamp
  },
  triggerEgg: function (e) { //double click trigger egg
    var that = this
    if (this.data.shareShowed) {
      wx.showActionSheet({
        itemList: ["保存分享图到本地相册"],
        success: function (res) {
          wx.navigateTo({
            url: '../share/index',
          })
        }
      })
    } else if (that.touchEndTime - that.touchStartTime < 350) {
      var currentTime = e.timeStamp
      var lastTapTime = that.lastTapTime
      that.lastTapTime = currentTime
      if (currentTime - lastTapTime < 300) {
        this.setData({
          shareIcon: "../../../res/share_icon.png",
          shareShowed: true
        })
      }
    }
  },
  tap_start: function (e) {
    // touchstart事件
    this.data.mark = this.data.newMark = e.touches[0].pageY;
  },
  tap_drag: function (e) {
    // touchmove事件
    this.data.newMark = e.touches[0].pageY;
    //从下向上滑
    if (this.data.mark > this.data.newMark) {
      this.isToUp = true;
    } else if (this.data.mark < this.data.newMark) {
      this.isToUp = false;
    }
    this.data.mark = this.data.newMark;
  },
  tap_end: function (e) {
    // touchend事件
    this.data.mark = 0;
    this.data.newMark = 0;
    if (this.isToUp) {
      wx.switchTab({
        url: '../../recommend/index',
      });
    }
  },
  actionSheetTap: function(e) {

  },
  actionSheetChange: function (e) {

  },
  onShareAppMessage: function () {
    return {
      title: 'weMeet微历',
      desc: '微历，让相聚更容易。',
      path: '/pages/main/index/index'
    }
  },
})
