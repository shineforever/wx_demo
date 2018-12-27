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
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        title: '测试歌曲',
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
      });
      this.setData({
        isPlayingMusic: true
      })
    }

  }
})