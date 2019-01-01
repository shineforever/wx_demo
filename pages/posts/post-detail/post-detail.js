var postsData = require('../../../data/posts_data.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    // console.log(postId)
    var postData = postsData.postList[postId]; //获取postsData中 postId指定元素的详情
    // this.setData = postData;
    this.setData({
      postData: postData
    })

      var postsCollected = wx.getStorageSync('posts_collected')
      if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    }
      else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },

  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    // postid收藏状态取反
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    // 保存收藏状态到缓存中;
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected ? "收藏成功" : "取消收藏",
        duration: 1000,
        icon: "loading"
    })
  },

  onShareTap: function (event) {
    var itemList = [
        "分享到微博",
        "分享到微信"
    ]
    wx.showActionSheet({
        itemList:itemList,
        itemColor:"#405f80",
        success:function (res) {
            // res.cancle 用户是否点击了取消按钮
            // res.tapIndex 数组的序号，从0开始
            // console.log('用户点击'+ itemList[res.tapIndex])
        }

    })
  },

  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;

    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      });
      this.setData({
        isPlayingMusic: true
      })
    }

  }
})