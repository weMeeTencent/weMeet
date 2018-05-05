// pages/main/form/index.js
var util = require('../../../utils/util.js'); 
Page({

  data: {
    array: ['中国', '美国', '巴西', '日本'],
    index: 0,
    time: '12:01'
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  startActivity:function(e) {

  },


  onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var date = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      date: date
    });
  }  
  
})