Page({
  onTap:function() {
    // console.log('测试。。。。。。。。。。')
    // wx.navigateTo({
    //   url: '../posts/post',
    // })

  wx.redirectTo({
    url: '../posts/post',
  })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onUnload: function (options) {
    // console.log('on unload..')

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('on hide....')

  }
})