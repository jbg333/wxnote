// pages/list/list.js
//获取应用实例
const app = getApp();
const hostUrl = require('../../config').host;
var network  = require('../../network.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 20,
    hasMoreData: true,
    contentlist: [],
    list:[]
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
    var that = this; 
    if(app.globalData.token){
      that.getDataListInfo('正在加载数据...')
    }else{
      app.userTokenReadyCallback = parm => {
        that.getDataListInfo('正在加载数据...')
      }
    }
  },

  //列表数据封装代码
   getDataListInfo: function (message) {
    var that = this
    var data = {
      page: that.data.page,
      pageSize: that.data.pageSize,
    };
    var data_url = hostUrl + '/billbookdetail/listData';
    network.postRequestLoading(data_url, data, message, function (res) {
      console.log(res)
      var contentlistTem = that.data.contentlist
      if (res.code == 200) {
        if (that.data.page == 1) {
          contentlistTem = []
        }
        var contentlist = res.page.list
        if (contentlist.length < that.data.pageSize) {
          that.setData({
            contentlist: contentlistTem.concat(contentlist),
            hasMoreData: false
          })
        } else {
          that.setData({
            contentlist: contentlistTem.concat(contentlist),
            hasMoreData: true,
            page: that.data.page + 1
          })
        }
      } else {
        wx.showToast({
          title: res.msg,
        })
      }

    }, function (res) {
      wx.showToast({
        title: '加载数据失败',
      })

    })
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
    this.data.hasMoreData=true;
    this.data.page=1;
    this.getDataListInfo('正在加载数据...')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     if (this.data.hasMoreData) {
      this.getDataListInfo('正在加载数据...')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },

  bindTouchStart: function(e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function(e) {
      this.endTime = e.timeStamp;
  },
  bindTap: function(e) {
      if(this.endTime  - this.startTime < 350) {
          console.log("点击")
          wx.navigateTo({
          url: '../operation/operation?id='+e.target.dataset.id
        })

      }
  },

  bingLongTap:function(e){
    var that = this;
    console.log("长按")
    that.deleteData(e);

  },

  addRow: function(e){
    wx.navigateTo({
      url: '../operation/operation'
    })
  },
  deleteData:function(e){
    var that =this;
    //var baseUrl = getApp().globalData.baseUrl; 
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function(sm){
        if(sm.confirm){
          wx.request({
            //that.data.baseUrl
            url: hostUrl+'/api/billbookdetail/logicDelete/'+e.target.dataset.id,
            method:'POST',
            success:function(res){
              var result = res.data.code;
              var toastText = '删除成功!';
              if(result!=200){
                toastText = '删除失败!';
              }else{
                that.data.list.splice(e.target.dataset.index,1);
                that.setData({
                  list:that.data.list
                })
              }
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              });
            }
          })
        }
      }
    })
  }

})