// pages/list/list.js
//获取应用实例
const app = getApp();
const hostUrl = require('../../config').host

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    baseUrl: getApp().globalData.baseUrl
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
      wx.request({
        url: hostUrl + '/billbookdetail/listData',
        method: 'POST',
        data: { token: app.globalData.token },
        header: { "token": app.globalData.token },
        success: function (res) {
          var list = res.data.page;
          if (list == null) {
            var toastText = '获取数据失败';
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000
            });
          } else {
            that.setData({
              list: list
            });
          }
        }
      })
    }else{
      app.userTokenReadyCallback = parm => {
        wx.request({
          url: hostUrl + '/billbookdetail/listData',
          method: 'POST',
          data: { token: app.globalData.token },
          header: { "token": app.globalData.token },
          success: function (res) {
            var list = res.data.page;
            if (list == null) {
              var toastText = '获取数据失败';
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              });
            } else {
              that.setData({
                list: list
              });
            }
          }
        })
      }
    }
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
  addRow: function(){
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