// pages/operation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //页面初始化 options为页面跳转时所携带的参数
    this.setData({
      id: options.id
    });
    if (options.id == undefined) {
      return;
    }
    wx.request({
      url: that.data.baseUrl+'',
      data: { id: options.id },
      method: "GET",
      success: function (res) {

      }
    })
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
  formSubmit(e){
    var that =this;
    var formData = e.detail.value;
    var url = that.data.baseUrl +'' ;
    if (that.data.id!=undefined){
      url = that.data.baseUrl + '';
      formData.id = that.data.id;
    }
    wx.request({
      url: that.data.baseUrl + '',
      method:'POST',
      header:{
        'Content-Type':'application/json'
      },
      success:function(res){
        var result = res.data.code;
        
        if (result != 200) {
          var toastText = '操作失败';
        } else {
          var toastText = '操作成功';
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
        if (that.data.id != undefined){
          wx.redirectTo({
            url: '../list/list',
          })
        }
      }
    })
  }
})