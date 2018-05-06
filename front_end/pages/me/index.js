// pages/mine/index.js

/**
   * 输入date格式
   * 返回 【3天】 或者 【2小时】这样的string
   */
var getDateDiff = function (startTime, endTime) {
  console.log(endTime)
  let sTime = startTime.getTime();
  let eTime = endTime.getTime();
  console.log(eTime)

  if (eTime - sTime > 1000 * 3600 * 24) {
    return parseInt(parseInt(eTime - sTime) / parseInt(1000 * 3600 * 24)) + "天";
  } else if (eTime - sTime > 1000 * 3600) {
    return parseInt(parseInt(eTime - sTime) / parseInt(1000 * 3600)) + "小时";
  } else if (eTime - sTime > 1000 * 60) {
    return parseInt(parseInt(eTime - sTime) / parseInt(1000 * 60)) + "分";
  } else if (eTime > sTime){
    return parseInt(parseInt(eTime - sTime) / parseInt(1000)) + "秒";
  } else {
    return "-1";
  }
}

/*
var activity = [{
  activityId: "1",
  creator: 'tianyetian',
  name:"微历—交互评审会",
  description: "描述",
  count: "12",
  location: "房山",
  timeType: "1",
  startTime: "",
  endTime: "",
  deadline: "1525140697000",
  deadTimeString: "",
}, {
  activityId: "2",
  creator: 'erxiaowu',
  name: "春风十里，不如烤鱼",
  description: "描述",
  count: "6",
  location: "房山",
  timeType: "1",
  startTime: "",
  endTime: "",
  deadline: "1525140697000",
  deadTimeString: "",
}, {
  activityId: "3",
  creator: 'erxiaowu',
  name: "有没有人想攀岩！",
  description: "描述",
  count: "0",
  location: "房山",
  timeType: "1",
  startTime: "",
  endTime: "",
  deadline: "1525140697000",
  deadTimeString: "",
}, {
  activityId: "4",
  creator: 'erxiaowu',
  name: "狼人杀组局",
  description: "描述",
  count: "12",
  location: "房山",
  timeType: "1",
  startTime: "",
  endTime: "",
  deadline: "1525140697000",
  deadTimeString: "",
}
];
*/
var activity = [];
var creator = "";
var activityId = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    creator: "",
    activity: activity,
    activityId: activityId,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    //存储creator openid
    if (getApp().creator == null) {
      creator = "001"
    } else {
      creator = getApp().creator
    }
    _this.setData({
      creator: creator
    })
    console.log(creator)
    // 获取投票历史
    wx.request({
      url: 'https://www.chengfpl.com/weili/user/activity',
      data: {
        openId: creator,
      },
      success: function (res) {
        console.log(res)
        activity = res.data.data
        console.log(activity)
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  tapActivity: function(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.activityId)
    activityId = e.currentTarget.dataset.activityId
    this.setData({
      activityId: activityId
    })
  },

  tapLookup: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.activityId)
    wx.navigateTo({
      url: '../main/calendar/index?activityId='+activityId
    });
  },

  tapEdit: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.activityId)
    wx.navigateTo({
      url: '../main/calendar/index?activityId='+activityId
    });
  },

  tapDelete: function (e) {
    var _this = this;
    console.log(e)
    console.log(e.currentTarget.dataset.activityId)
    wx:wx.showActionSheet({
      itemList: ["删除后无法恢复", "确认删除", "取消"],
      itemColor: '',
      success: function(res) {
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
          wx.showToast({
            title: '正在删除',
            icon: 'loading',
            image: '',
            duration: 1500,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          // TODO: 发送删除请求，现在是假装的
          setTimeout(function(){
            for (var i = 0; i < activity.length; i++) {
              if (activity[i].activityId == activityId) {
                activity.splice(i, 1);
              }
            }
            _this.setData({
              activity: activity
            })
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              image: '',
              duration: 1500,
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
          })}, 1500)
        } else if (res.tapIndex == 2) {
          wx.showToast({
            title: '操作已取消',
            icon: '',
            image: '',
            duration: 1500,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      },
      complete: function(res) {

      },
    })
  },
  
})

 