// pages/recommend/index.js
Page({
  data: {
    list: [
      {
        id: '1',
        img: 'http://mat1.gtimg.com/www/js/news/wemeet/activity_hot_pot.png',
        title: '我的热情，好像一顿火锅',
        desc: '用FFF团的火把，煮一顿热烈的火锅。',
        loc: '魏公村·重八牛府牛丸火锅    982米',
        num: '2-8人',
        duration: 2
      },
      {
        id: '1',
        img: 'http://mat1.gtimg.com/www/js/news/wemeet/activity_music.png',
        title: '为你唱这首歌',
        desc: '勇敢说爱，刚给你一个唱出“爱你”的理由。',
        loc: '五道口·麦颂量贩式KTV    1.2公里',
        num: '2-12人',
        duration: 2
      }, {
        id: '1',
        img: 'http://mat1.gtimg.com/www/js/news/wemeet/activity_school.png',
        title: '初夏·校园·压马路',
        desc: '一无所有时的朋友，情愫初生时的爱人。',
        loc: '五道口·北京林业大学    679米',
        num: '2-15人',
        duration: 2
      }
    ]
  },



  goToStartActivity: function (e) {
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../main/form/index?title=' + item.title + '&desc=' + item.desc + '&duration=' + item.duration + '&loc=' + item.loc
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'weMeet微历',
      desc: '微历，让相聚更容易。',
      path: '/pages/main/index/index'
    }
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