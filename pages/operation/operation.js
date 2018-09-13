// pages/operation.js
const hostUrl = require('../../config').host;
var network  = require('../../network.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: undefined,
    money:undefined,
    remark:undefined,
    drcrArray: ['借出', '借入'],
    drcrIndex: 0,
    drcrDate : undefined
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
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      drcrIndex: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      drcrDate: e.detail.value
    })
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
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
  formSubmit:function(e){
    var that =this;
    var formData = e.detail.value;
    var url ='/billbookdetail/save' ;
    //修改
    if (that.data.id!=undefined){
      url = '/billbookdetail/update';
      formData.id = that.data.id;
    }
    var data_url = hostUrl + url;
    network.postRequestLoading(data_url, formData, '保存中', function (res) {
      console.log(res)
      if (res.code == 200) {
       wx.showToast({
          title: '保存成功',
          icon: '',
          duration: 2000
        });
         wx.redirectTo({
              url: '../list/list'
        })
      } else {
        wx.showToast({
          title: res.msg
        })
      }

    }, function (res) {
      wx.showToast({
        title: '保存失败'
      })

    })
  }
})