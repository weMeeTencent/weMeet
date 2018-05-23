// pages/main/form/index.js
var util = require('../../../utils/util.js');
Page({

  data: {
    startTime: '',
    endTime: '',
    duration: '',
    title: '',
    desc: '',
    loc: '',
    deadline: '',
    deadlineTime: '24:00'
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    var newEndTime = e.detail.value
    if (newEndTime >= this.data.startTime) {
      this.setData({
        endTime: newEndTime,
        deadline: newEndTime
      })
    } else 
      wx.showToast({
        title: '活动结束日期不能早于开始日期哟',
        icon: 'none'
      })
  },
  bindDeadlineChange: function (e) {
    var newDDL = e.detail.value
    if (newDDL >= this.data.startTime && newDDL <= this.data.endTime) {
      this.setData({
        deadline: newDDL
      })
    } else {
      wx.showToast({
        title: '征集截止日期不在可选范围内哦',
        icon: 'none'
      })
    }
  },
  bindDeadlineTimeChange: function (e) {
    this.setData({
      deadlineTime: e.detail.value
    })
  },

  bindTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  bindDesc: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },

  bindDuration: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  bindLoc: function (e) {
    this.setData({
      loc: e.detail.value
    })
  },

  bindFormSubmit: function (e) {


    if (this.data.title == null || this.data.title.length == 0) {
      wx.showToast({
        title: '请输入活动主题',
        icon: 'none'
      })
      return
    }

    if (this.data.desc == null || this.data.desc.length == 0) {
      wx.showToast({
        title: '请输入活动主题说明',
        icon: 'none'
      })
      return
    }

    if (this.data.duration == null || this.data.duration.length == 0) {
      wx.showToast({
        title: '请输入活动时长',
        icon: 'none'
      })
      return
    }

    if (this.data.duration <= 0) {
      wx.showToast({
        title: '活动时长必须大于0哟',
        icon: 'none'
      })
      return
    }

    if (this.data.loc == null || this.data.loc.length == 0) {
      wx.showToast({
        title: '请输入活动地点',
        icon: 'none'
      })
      return
    }

    // if (this.data.startTime >= this.data.endTime) {
    //   wx.showToast({
    //     title: '活动成行结束日期要大于开始日期哟',
    //     icon: 'none'
    //   })
    //   return
    // }

    if (this.data.deadline < this.data.startTime || this.data.deadline > this.data.endTime) {
      wx.showToast({
        title: '征集截止日期不在可选范围内',
        icon: 'none'
      })
      return
    }


    wx.showLoading({
      title: '正在尝试'
    })

    var deadlinePara = this.data.deadline + ' ' + this.data.deadlineTime
    var openId = getApp().openId;
    wx.request({
      url: 'https://www.chengfpl.com/weili/user/create/activity',
      method: 'POST',
    
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },

      data: { openId: openId, name: this.data.title, description: this.data.desc, location: this.data.loc, timeType: this.data.duration, startTime: this.data.startTime + ' 00:00:00', endTime: this.data.endTime + ' 24:00:00', deadline: deadlinePara + ':00'},
      // data: { openId: openId, name: this.data.title, description: this.data.desc, location: this.data.loc, timeType: "2", startTime: "2015-09-10 12:09:10", endTime: "2015-09-10 12:09:10", deadline: "2015-09-10 12:09:10" },

      complete: function (res) {
        //dismiss进度条
        wx.hideLoading()
      },
      success: function (res) {
        //跳转
        if (res.statusCode == 200 && res.data != null) {
          var url = '../calendar/index?activityId=' + res.data.data;
          console.log(res.data.data, url)
          wx.navigateTo({
            url: url,
          })
        }

      },
      fail: function (res) {
        //tips
        wx.showToast({
          title: '发起活动失败',
        })
      }
    })
  },

  onLoad: function (option) {

    // 调用函数时，传入new Date()参数，返回值是日期和时间 
    var startTime = util.formatTime(new Date());
    var endTime = util.formatTime(new Date());
    var deadline = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      startTime: startTime,
      endTime: endTime,
      deadline: deadline,
    });

    if (option != null && option.title != null) {
      this.setData({
        title: option.title,
        desc: option.desc,
        duration: option.duration,
        loc: option.loc
      });
    }

  },
  onShareAppMessage: function () {
    return {
      title: 'weMeet微历',
      desc: '微历，让相聚更容易。',
      path: '/pages/main/index/index'
    }
  },

})