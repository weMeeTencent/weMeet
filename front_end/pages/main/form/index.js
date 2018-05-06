// pages/main/form/index.js
var util = require('../../../utils/util.js'); 
Page({

  data: {
   startTime: '',
   endTime: '',
   duration: '',
   title:'',
   desc: '',
   duration: '',
   loc: '',
   deadline:'',
   deadlineTime:'12:00'
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
    this.setData({
      endTime: e.detail.value
    })
  },
  bindDeadlineChange: function (e) {
    this.setData({
      deadline: e.detail.value
    })
  },
  bindDeadlineTimeChange: function (e) {
    this.setData({
      deadlineTime: e.detail.value
    })
  },

  startActivity:function(e) {
    wx.showLoading({
      title: '正在尝试',
      
    })

    var deadlinePara = util.time2Stamp(this.data.deadline + ' ' + this.data.deadlineTime)
    
    wx.request({
      url: 'https://www.chengfpl.com/weili/user/create/activity',
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      data: { openId: 'openId', name: this.data.title, description: this.data.desc, location: this.data.loc, timeType: 1, startTime: this.data.startTime, endTime: this.data.endTime, deadline: deadlinePara},
   
      complete: function(res) {
        //dismiss进度条
        wx.hideLoading()
      },
      success: function(res) {
        //跳转
        if (res.statusCode == 200) {
          console.log('发起活动，activityId='+res.data.activityId)
          var activityId = res.data.activityId;
        }
        
      },
      fail: function(res) {
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
      title: option.title,
      desc: option.desc,
      duration: option.duration,
      loc: option.loc
    });
  }  
  
})