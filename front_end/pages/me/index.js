// pages/mine/index.js

/**
   * 输入date格式
   * 返回 【3天】 或者 【2小时】这样的string
   */
var getDateDiff = function (startTime, endTime) {
  let sTime = startTime.getTime();
  let eTime = endTime.getTime();

  if (eTime - sTime > 1000 * 3600 * 24) {
    return parseInt(parseInt(eTime - sTime) / parseInt(1000 * 3600 * 24)) + "天";
  } else if (eTime - sTime > 1000 * 3600) {
    return parseInt(parseInt(eTime - sTime) / parseInt(1000 * 3600)) + "小时";
  } else if (eTime - sTime > 1000 * 60) {
    return parseInt(parseInt(eTime - sTime) / parseInt(1000 * 60)) + "分";
  } else if (eTime > sTime) {
    return parseInt(parseInt(eTime - sTime) / parseInt(1000)) + "秒";
  } else {
    return "-1";
  }
}

var activity = [];
var creator = "";
var activityId = "";

var refresh = function (__this) {
  var _this = __this
  // 获取投票历史
  wx.request({
    url: 'https://www.chengfpl.com/weili/user/activity',
    data: {
      openId: _this.data.openId,
    },
    success: function (res) {
      activity = res.data.data
      _this.setData({
        activity: activity
      })
      for (var i = 0; i < activity.length; i++) {
        activity[i].deadTimeString = getDateDiff(new Date(),
          new Date(parseInt(activity[i].deadline)));
        activity[i].activityId = activity[i].id;
        _this.setData({
          activity: activity
        })
      }
    }
  })
}
Page({
  data: {
    creator: "",
    activity: activity,
    activityId: activityId,
  },
  onLoad: function (options) {
    var openId = getApp().openId;
    var userInfo = getApp().userInfo;
    this.setData({
      openId: openId,
      userInfo: userInfo,
    })
  },
  onShow: function () {
    var _this = this;
    refresh(_this);
  },
  onPullDownRefresh: function () {
    var _this = this;
    refresh(_this);
  },
  onShareAppMessage: function () {

  },
  tapActivity: function (e) {
    activityId = e.currentTarget.dataset.activityId
    this.setData({
      activityId: activityId
    })
  },

  tapLookup: function (e) {
    wx.navigateTo({
      url: '../main/calendar/index?activityId=' + activityId
    });
  },

  tapEdit: function (e) {
    wx.navigateTo({
      url: '../main/calendar/index?activityId=' + activityId
    });
  },

  tapDelete: function (e) {
    var _this = this;
    console.log(e)
    console.log(e.currentTarget.dataset.activityId)
    wx: wx.showActionSheet({
      itemList: ["删除后无法恢复", "确认删除"],
      itemColor: '',
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.showToast({
            title: '操作已取消',
            icon: '',
            image: '',
            duration: 1500,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else if (res.tapIndex == 1) {
          wx.showLoading({
            title: '正在删除',
            icon: 'loading',
            mask: true,
            success: function (res) {
              // 删除
              wx.request({
                url: 'https://www.chengfpl.com/weili/user/activity/delete',
                data: {
                  openId: _this.data.openId,
                  activityId: activityId,
                },
                success: function (res) {
                  console.log(res)
                  // 接口返回 提示错误
                  if (data.data.success == false) {
                    wx.showToast({
                      title: '删除失败',
                      icon: 'none',
                      image: '',
                      duration: 1500,
                      mask: true,
                      success: function (res) { },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                    // 接口返回 提示正确删除
                  } else {
                    refresh(_this)
                    wx.hideLoading()
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      image: '',
                      duration: 1500,
                      mask: true,
                      success: function (res) { },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                  }
                  
                },
                fail: function (res) {
                  console.log(res)
                  wx.hideLoading()
                  wx.showToast({
                    title: '删除失败',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: true,
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                }
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
        wx.showToast({
          title: '操作已取消',
          icon: '',
          image: '',
          duration: 1500,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      complete: function (res) {

      },
    })
  },

})
