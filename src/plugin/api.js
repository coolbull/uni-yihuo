export default {
  install(Vue) {
    // const server = 'https://yysyh.cxvk.com.cn:8801/zklystore' //外网+外网ip
    // const server = 'http://192.168.31.72:8801/zklystore' //晓东ip
    const server = 'http://192.168.31.75:8800/zklystore' //周恒ip
    Vue.prototype.$server = `${server}`
    Date.prototype.format = function(format) {
      if (this == '') return ''
      let args = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
        S: this.getMilliseconds()
      }
      if (/(y+)/.test(format))
        format = format.replace(
          RegExp.$1,
          (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      for (let i in args) {
        let n = args[i]
        if (new RegExp('(' + i + ')').test(format))
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length == 1 ? n : ('00' + n).substr(('' + n).length)
          )
      }
      return format
    }

    function urlPost(url, param, handler) {
      wx.showLoading({
        title: '加载中'
      })
      var uid = wx.getStorageSync('uid')
      if (uid) {
        param['uId'] = uid
      }
      uni
        .request({
          url: `${server}${url}`,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          'Content-Type': 'application/x-www-form-urlencoded',
          data: param
        })
        .then(res => {
          wx.hideLoading()
          let parse = res[1]
          handler(parse)
          if (parse.data.code != 200) {
            global.showToast(parse.data.msg)
          }
        })
        .catch(err => {
          handler(null)
          global.showToast('系统繁忙，请稍后再试')
        })
    }

    global.getOpenid = param =>
      new Promise((resolve, reject) => {
        urlPost('/HomepageController/getCode', param, res => {
          if (res == null) reject(null)
          else resolve(res)
        })
      })
    //微信登录
    ;(global.wxlogin = param =>
      new Promise((resolve, reject) => {
        urlPost('/HomepageController/login', param, res => {
          if (res == null) reject(null)
          else resolve(res)
        })
      })),
      //获取手机号
      (global.miniGetPhone = param =>
        new Promise((resolve, reject) => {
          urlPost('/HomepageController/miniGetPhone', param, res => {
            if (res == null) reject(null)
            else resolve(res)
          })
        })),
      (Vue.prototype.$api = {
        //分类菜单列表
        getClassmenulist: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/selcategory', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //分类商品列表
        getClassgoodsList: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/selcommodity', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //    查询商品详情
        getgoodsDetails: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/selcommoditydetails', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //商品收藏或取消收藏
        goodsCollect: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/collect', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //查询默认收货地址
        defaultaddress: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/defaultaddress', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //生成订单
        createorder: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/createorder', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //查询所有订单
        getselorder: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/selorder', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //获取收藏产品
        getmycollect: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/getmycollect', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //获取历史记录
        getmyhistory: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/getmyhistory', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //查询用户收货地址
        selShoppingAddress: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/SelShoppingAddress', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //修改用户收货地址
        updateShoppingAddress: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/UpdateShoppingAddress', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //设置默认收货地址
        updateDefaultAddress: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/UpdateDefault', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //添加收货地址
        AddShoppingAddress: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/AddShoppingAddress', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //删除收货地址
        DelShoppingAddress: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/DelShoppingAddress', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //上传图片
        uploadpic: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/uploadpic', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //提交审核
        Joindistribution: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/Joindistribution', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //添加问题
        addquestion: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/addquestion', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //回答问题
        addasnwer: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/addasnwer', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //评论
        addcomment: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/addcomment', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //回复
        addcommentson: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/addcommentson', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),

        //微信登录
        // wxAuth: (param) => new Promise((resolve, reject) => {
        //     urlPost('/HomepageController/getCode', param, (res) => {
        //         if (res == null) reject(null); else resolve(res);
        //     })
        // }),
        //首页产品检索
        selVaguePD: param =>
          new Promise((resolve, reject) => {
            urlPost('/HomepageController/selVaguePD', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //首页轮播图
        Slideshow: param =>
          new Promise((resolve, reject) => {
            urlPost('/HomepageController/Slideshow', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //智控优选
        productDetailsAll: param =>
          new Promise((resolve, reject) => {
            urlPost('/HomepageController/productDetailsAll', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //首页鼠年爆款
        productDetailsFaddishAll: param =>
          new Promise((resolve, reject) => {
            urlPost(
              '/HomepageController/productDetailsFaddishAll',
              param,
              res => {
                if (res == null) reject(null)
                else resolve(res)
              }
            )
          }),
        //首页口碑之选
        productDetailsPraiseAll: param =>
          new Promise((resolve, reject) => {
            urlPost(
              '/HomepageController/productDetailsPraiseAll',
              param,
              res => {
                if (res == null) reject(null)
                else resolve(res)
              }
            )
          }),
        //首页超值优惠
        productDetailsDiscountsAll: param =>
          new Promise((resolve, reject) => {
            urlPost(
              '/HomepageController/productDetailsDiscountsAll',
              param,
              res => {
                if (res == null) reject(null)
                else resolve(res)
              }
            )
          }),
        //首页优惠特区
        productDetailsDiscountAll: param =>
          new Promise((resolve, reject) => {
            urlPost(
              '/HomepageController/productDetailsDiscountAll',
              param,
              res => {
                if (res == null) reject(null)
                else resolve(res)
              }
            )
          }),
        //首页精品推荐
        productDetailsRecommendAll: param =>
          new Promise((resolve, reject) => {
            urlPost(
              '/HomepageController/productDetailsRecommendAll',
              param,
              res => {
                if (res == null) reject(null)
                else resolve(res)
              }
            )
          }),
        //首页新品上市
        productDetailsNewestAll: param =>
          new Promise((resolve, reject) => {
            urlPost(
              '/HomepageController/productDetailsNewestAll',
              param,
              res => {
                if (res == null) reject(null)
                else resolve(res)
              }
            )
          }),
        //店主我的订单查看
        selOrederFromAll: param =>
          new Promise((resolve, reject) => {
            urlPost('/ManagerUserController/selOrederFromAll', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //查询店主信息
        selMoneyAll: param =>
          new Promise((resolve, reject) => {
            urlPost('/ManagerUserController/selMoneyAll', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //店主提现记录
        selWithdrawAll: param =>
          new Promise((resolve, reject) => {
            urlPost('/ManagerUserController/selWithdrawAll', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //添加收货地址标签
        addsLabel: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/addsLabel', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //添加收货地址标签
        seluserlabel: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/seluserlabel', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //添加收货地址标签
        addgoodscomment: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/addcomment', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //添加收货地址标签
        getevaluatets: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/getevaluatets', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //添加收货地址标签
        getquestions: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/getquestions', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //添加收货地址标签
        getOrderDetails: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/getOrderDetails', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //查询快递
        queryWlInfo: param =>
          new Promise((resolve, reject) => {
            urlPost('/ApiKdwlController/queryWlInfo', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //修改订单状态
        updateOrderOtype: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/updateOrderOtype', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //提醒发货
        orderShipment: param =>
          new Promise((resolve, reject) => {
            urlPost('/send/Shipment', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //退款
        refundOrder: param =>
          new Promise((resolve, reject) => {
            urlPost('/wxPay/refund', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //申请提现
        inswithdraw: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/inswithdrawById', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //查询余额
        selWithdrawByIDMoney: param =>
          new Promise((resolve, reject) => {
            urlPost(
              '/ManagerUserController/selWithdrawByIDMoney',
              param,
              res => {
                if (res == null) reject(null)
                else resolve(res)
              }
            )
          }),
        //申请换货
        exchangeapply: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/exchangeapply', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //取消换货
        cancelreplace: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/IsexchangeapplyApi', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //修改手机号
        updUserPhone: param =>
          new Promise((resolve, reject) => {
            urlPost('/HomepageController/updUserPhoneById', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //修改手机号
        toPay: param =>
          new Promise((resolve, reject) => {
            urlPost('/wxPay/unifiedOrder', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //问题详情
        getquestionById: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/getquestionById', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //修改默认收货地址
        updateDefault: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/UpdateDefault', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //退换货说明
        getSetting: param =>
          new Promise((resolve, reject) => {
            urlPost('/SettingController/getSetting', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //宣传页详情
        selAdvertiseProductDetailsAll: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodity/selAdvertiseProductDetails', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //分享海报
        createposter: param =>
          new Promise((resolve, reject) => {
            urlPost('/imgapi/createposter', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //分享海报
        detailslists: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/selcommoditydetails', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //获取购物车
        selshoppingcar: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/selshoppingcar', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //加入购物车
        addshoppingcar: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/addshoppingcar', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //加入购物车
        removeshoppingcar: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/removeshoppingcar', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //修改购物车
        updateshoppingcar: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/updateshoppingcar', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        //移入收藏夹
        shoppingcargotocollect: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/shoppingcargotocollect', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        // 品牌店列表
        getManagerUserAll: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/getManagerUserAll', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        // 品牌店详情
        getmerchantdetails: param =>
          new Promise((resolve, reject) => {
            urlPost('/commodityapi/getmerchantdetails', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        // 延长收货
        delaygoods: param =>
          new Promise((resolve, reject) => {
            urlPost('/orderapi/delaygoods', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        // 延长收货
        addcommenttwo: param =>
          new Promise((resolve, reject) => {
            urlPost('/userclientapi/addcommentson', param, res => {
              if (res == null) reject(null)
              else resolve(res)
            })
          }),
        // 分享小程序二维码
        GetWXAppletsCode: param =>
          new Promise((resolve, reject) => {
            urlPost('/CreateQRAPI/getQRapi', param, res => {
              if (res == null) reject(null)
              else resolve(res.data)
            })
          })
      })
  }
}
