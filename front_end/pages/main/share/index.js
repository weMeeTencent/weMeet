//获取应用实例
const app = getApp()
Page({
  data: {
    canvasHidden: true,
    shareImgPath: '',
    screenWidth: '',
    FilePath: ''
  },
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screenWidth: res.screenWidth
        })
      },
    })
  },
  saveImageToPhotosAlbum: function () {
    wx.showLoading({
      title: '保存中...',
    })
    var that = this;
    that.setData({
      canvasHidden: false
    })
    var unit = that.data.screenWidth / 375
    const ctx =wx.createCanvasContext('share')
    ctx.setFillStyle('#f6f6f6')
    ctx.fillRect(0, 0, that.data.screenWidth, 667 * unit)
    //title
    ctx.setFillStyle('#888888')
    ctx.setFontSize(14)
    ctx.setTextAlign('center')
    ctx.fillText('—— 用微历 常相聚 ——', 187.5 * unit, 38 * unit)
    //calendar bg
    ctx.drawImage('../../../res/calendar_bg.png',20 * unit, 67 * unit, 334.5 * unit, 439.5 * unit)
    //two top borders
    ctx.beginPath();
    ctx.setLineCap('butt')
    ctx.setLineWidth(0.3 * unit)
    ctx.setStrokeStyle('#979797')
    ctx.moveTo(24.5 * unit, 119.5 * unit)
    ctx.lineTo(350.5 * unit, 119.5 * unit)
    ctx.stroke()
    ctx.beginPath()
    ctx.setLineCap('butt')
    ctx.setLineWidth(0.5 * unit)
    ctx.setStrokeStyle('#979797')
    ctx.moveTo(24.5 * unit, 121.5 * unit)
    ctx.lineTo(350.5 * unit, 121.5 * unit)
    ctx.stroke()
    //top title
    ctx.setFontSize(9)
    ctx.setFillStyle('#9b9b9b')
    ctx.setTextBaseline('middle')
    ctx.fillText('WE CALENDAR   ENJOY WE PARTY', 187.5 * unit, 133 * unit)
    //dash divider
    ctx.beginPath()
    ctx.setLineDash([2 * unit, 1 * unit], 0)
    ctx.setLineWidth(0.3 * unit)
    ctx.setStrokeStyle('#9b9b9b')
    ctx.moveTo(27 * unit, 142.5 * unit)
    ctx.lineTo(350.5 * unit, 142.5 * unit)
    ctx.stroke()
    //label
    ctx.drawImage('../../../res/left_label_head.png', 43.5 * unit, 116 * unit, 24.5 * unit, 73.5 * unit)
    ctx.drawImage('../../../res/label_body.png', 43.5 * unit, 189.5 * unit, 24.5 * unit, 114 * unit)
    //date
    ctx.setFontSize(24)
    ctx.setFillStyle('#000000')
    ctx.fillText('2018年5月21日', 187.5 * unit, 168.5 * unit)
    ctx.setFontSize(14)
    ctx.setFillStyle('#888888')
    ctx.fillText('星期一 农历四月初七', 187.5 * unit, 202 * unit)
    //icon
    ctx.drawImage('../../../res/center_icon.png', 138 * unit, 250 * unit, 100 * unit, 100 * unit)
    //things
    ctx.setFontSize(24)
    ctx.setFillStyle('#000000')
    ctx.fillText('攀岩 狼人 吃烤鱼', 187.5 * unit, 380.5 * unit)
    //description
    ctx.beginPath()
    ctx.setLineCap('butt')
    ctx.setLineDash([2 * unit, 0], 0)
    ctx.setLineWidth(4 * unit)
    ctx.setStrokeStyle('#979797')
    ctx.moveTo(127 * unit, 435.5 * unit)
    ctx.lineTo(127 * unit, 467.5 * unit)
    ctx.stroke()
    ctx.setFontSize(12)
    ctx.setFillStyle('#888888')
    ctx.fillText('521，微历一群朋友去K歌', 194.5 * unit, 433 * unit, 108 * unit)
    ctx.fillText('给你一个唱出“爱你”的理由', 194.5 * unit, 451 * unit, 108 * unit)

    ctx.drawImage('../../../res/qr_code.png', 137.5 * unit, 537 * unit, 100 * unit, 100 * unit)

    ctx.draw(false, function() {
      wx.hideLoading()
    })
  }
});