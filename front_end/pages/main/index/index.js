//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    open: false,
    mark: 0,
    newMark: 0,
    startMark: 0,
    endMark: 0,
    isToUp: true,
    translate: '',
    windowHeight: wx.getSystemInfoSync().windowHeight
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
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
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindToCalendar: function (e) {
    wx.navigateTo({
      url: '../calendar/index'
    });
  },
  bindToStartActivity: function (e) {
    wx.navigateTo({
      url: '../form/index',
    })
  },
  tap_start: function (e) {
    // touchstart事件
    this.data.mark = this.data.newMark = e.touches[0].pageY;
    this.data.startMark = e.touches[0].pageY;
  },
  tap_drag: function (e) {
    // touchmove事件
    this.data.newMark = e.touches[0].pageY;
    //从下向上滑
    if (this.data.mark > this.data.newMark) {
      this.setData({
        translate: 'transform: transformY(' + (this.data.newMark - this.data.startMark) + 'rpx)'
      });
      this.isToUp = true;
    } else if (this.data.mark < this.data.newMark) {
      this.setData({
        translate: 'transform: transformY(' + (this.data.newMark - this.data.startMark) + 'rpx)'
      });
      this.isToUp = false;
    }
    this.data.mark = this.data.newMark;
    this.data.endMark = this.data.newMark;
  },
  tap_end: function (e) {
    // touchend事件
    this.data.mark = 0;
    this.data.newMark = 0;
    // this.data.endMark = e.touches[0].pageY;
    if (this.isToUp) {
      this.setData({
        translate: 'transform: transformY(' + (this.data.endMark - this.data.startMark) + 'rpx)'
      });
      wx.navigateTo({
        url: '../../recommend/index'
      });
    } else {
      this.setData({
        open: false
      });
    }
  },
  gotohhh: function(e) {
    wx.navigateTo({
      url: '../form/index'
    });
  }
})
