//获取应用实例
const app = getApp()
Page({
  data: {
    canvasHidden: true,
    shareImgPath: '',
    screenWidth: '',
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
    wx.showLoading({
      title: '保存中...',
    })
    var that = this;
    that.setData({
      canvasHidden: false
    })
    var unit = that.data.screenWidth / 375
    const ctx = wx.createCanvasContext('share')
    ctx.drawImage('../../../res/share_img.png', 375 * unit, 667 * unit, 375 * unit, 667 * unit)
    ctx.draw(false, function() {
      wx.canvasToTempFilePath({
        canvasId: 'share',
        x: 0,
        y: 0,
        width: unit * 375,
        height: unit * 667,
        destWidth: unit * 375,
        destHeight: unit * 667,
        success: function (res) {
          that.setData({
            shareImgPath: res.tempFilePath
          })
          if (!res.tempFilePath) {
            wx.showModal({
              title: '提示',
              content: '图片绘制中，请稍后重试',
              showCancel: false
            })
          }
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (res) {
              wx.hideLoading()
              that.setData({
                canvasHidden: true
              })
              wx.navigateBack({
                delta: 1
              })
            },
            fail: function (err) {
              console.log(err)
              wx.hideLoading()
              that.setData({
                canvasHidden: true
              })
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    })
  }
});