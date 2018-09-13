/**
 * url:请求的url
 * params:请求参数
 * message:loading提示信息
 * success:成功的回调
 * fail:失败的回调
 */

//post请求
function postRequest(url, params, success, fail) {
     this.postRequestLoading(url, params, "", success, fail)
}

//根据判断message 是否显示loading
function postRequestLoading(url, params, message, success, fail,useJson) {
     if (message != "") {
          wx.showLoading({
               title: message,
          })
     }

     var contentType ='application/x-www-form-urlencoded';
     if(useJson==true){
         contentType = 'application/json'
     }
     if(typeof(useJson)== 'string'){
       contentType = useJson
     }

     const postRequestTask = wx.request({
          url: url,
          data: params,
          header: {
               'content-type': contentType,
               //'content-type': ,
               'token':getApp().globalData.token
          },
          method: 'POST',
          success: function(res) {
               if (message != "") {
                    wx.hideLoading()
               }
               if (res.statusCode == 200) {
                    success(res.data)
               } else {
                    fail(res)
               }
          },
          fail: function(res) {
               if (message != "") {
                    wx.hideLoading()
               }
               fail(res)
          }
     })
}

//get请求
function getRequest(url, params, success, fail) {
     this.getRequestLoading(url, params, "", success, fail)
}

function getRequestLoading(url, params, message, success, fail) {
     if (message != "") {
          wx.showLoading({
               title: message,
          })
     }
     const getRequestTask = wx.request({
          url: url,
          data: params,
          header: {
               'Content-Type': 'application/json',
               'token':getApp().globalData.token
          },
          method: 'GET',
          success: function(res) {
               if (message != "") {
                    wx.hideLoading()
               }
               if (res.statusCode == 200) {
                    success(res.data)
               } else {
                    fail(res)
               }
          },
          fail: function(res) {
               if (message != "") {
                    wx.hideLoading()
               }
               fail(res)
          }
     })
}

//取消post请求
function abortPostRequest(url, params, success, fail) {
     postRequestTask.abort()
}

//取消get请求
function abortGetRequest(url, params, success, fail) {
     getRequestTask.abort()
}

module.exports = {
     postRequest: postRequest,
     postRequestLoading: postRequestLoading,
     getRequest: getRequest,
     getRequestLoading: getRequestLoading,
     abortPostRequest: abortPostRequest,
     abortGetRequest: abortGetRequest
}