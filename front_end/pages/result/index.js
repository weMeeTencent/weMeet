Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId:options.activityId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '正在加载',
    })
    var _this = this;
    wx.request({
      url: 'https://www.chengfpl.com/weili/user/select/activity',
      header: { 'content-type': 'application/json' },
      data: {  openId: getApp().openId,
               activityId: this.data.activityId
            },
      complete: function () {
        wx.hideLoading()
      },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data.data);
          _this.setData({
            activity: res.data.data
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
        })
      }
    })
    wx.request({
      url: 'https://www.chengfpl.com/weili/user/temporary/participation/interval',
      header: { 'content-type': 'application/json' },
      data: { activityId: this.data.activityId},
      complete: function () {
        wx.hideLoading()
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var seqList = new Array();
          var jsonObj = res.data.data;
          var allNum = 0;
          console.log(jsonObj);
          for (var i = 0; i < jsonObj.length; i++) {
            var seq = new Object();
            seq['key'] = String.fromCharCode('A'.charCodeAt()+i);
            seq['opacity'] = 0.9 - 0.2 * i; 
            for (var key in jsonObj[i]) {
              var tmp = key.split('_');
              var startTime = new Date(Date.parse(tmp[0]));
              var endTime = new Date(Date.parse(tmp[1]));       
              //.format("yyyy-MM-dd hh:mm:ss");
              seq['time'] = startTime.getMonth()+ 1 + '月' + checkTime(startTime.getDay()) + '  ' 
                + checkTime(startTime.getHours()) + ':' + checkTime(startTime.getMinutes())
                + '-'
                + checkTime(endTime.getHours()) + ':' + checkTime(endTime.getMinutes());
              seq['num'] = jsonObj[i][key].length;
              seq['users'] = jsonObj[i][key];
              allNum += seq['num'];
            }
            seqList.push(seq);
          }
          for (var i = 0; i < seqList.length; i++) {
            seqList[i]['num'] = Math.round(seqList[i]['num']/allNum*100) + "%" 
          }
          console.log(seqList);
          _this.setData({
            seqList: seqList
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'weMeet微历',
      desc: '微历，让相聚更容易。',
      path: '/pages/main/index/index'
    }
  },
})
function checkTime(i) {
  if (i < 10)
  { i = "0" + i }
  return i
}
