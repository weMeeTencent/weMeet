//index.js
var util = require('../../../utils/util.js')
Page(
  {
    /**
     * 页面的初始数据
     */
    data: {
      acitvityData: {},
    },

    onLoad: function () {
      var openId = getApp().openId;
      var userInfo = getApp().userInfo;
      var activityId = util.getCurrentPageUrl()['activityId'];
      this.setData({
        openId: openId,
        userInfo: userInfo,
        activityId: activityId
      })
      var activityUrl = 'https://www.chengfpl.com/weili/user/select/activity?activityId=' + activityId;
      var _this = this;
      wx.request({
        url: activityUrl,
        data: { openId: openId },
        complete: function (res) {
        },
        success: function (res) {
          _this.setData({
            acitvityData: res.data.data,
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '加载活动失败',
          })
        }
      })
    },
    onShareAppMessage: function () {

    },
  }
)