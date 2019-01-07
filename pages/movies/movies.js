var app = getApp();

Page({
    onLoad:function() {
        var inTheaterUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
        var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
        var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

        this.getMovieListData(inTheaterUrl);
        this.getMovieListData(comingSoonUrl);
        this.getMovieListData(top250Url);

    },

    getMovieListData:function(url){
        wx.request({
            url: url, // 仅为示例，并非真实的接口地址
            data: {
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res.data)
            }
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