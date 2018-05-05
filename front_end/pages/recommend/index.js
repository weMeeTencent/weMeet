// pages/recommend/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: '1',
        img: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1525091073&di=3a5535861c7b993bb7bd0615c7eac3a2&src=http://pic.qiantucdn.com/00/91/59/42bOOOPIC98.jpg',
        title: '春末夏初，组队攀岩了解一下',
        desc: '负重向上，始终下坠，都是生活常态',
        loc: '和平里~兰唐国际极限运动 5.4公里',
        num: '2-6人',
      },
      {
        id: '1',
        img: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1525091073&di=3a5535861c7b993bb7bd0615c7eac3a2&src=http://pic.qiantucdn.com/00/91/59/42bOOOPIC98.jpg',
        title: '春末夏初，组队攀岩了解一下',
        desc: '负重向上，始终下坠，都是生活常态',
        loc: '和平里~兰唐国际极限运动 5.4公里',
        num: '2-6人',
      }, {
        id: '1',
        img: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1525091073&di=3a5535861c7b993bb7bd0615c7eac3a2&src=http://pic.qiantucdn.com/00/91/59/42bOOOPIC98.jpg',
        title: '春末夏初，组队攀岩了解一下',
        desc: '负重向上，始终下坠，都是生活常态',
        loc: '和平里~兰唐国际极限运动 5.4公里',
        num: '2-6人',
      }
    ]
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
  
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
})