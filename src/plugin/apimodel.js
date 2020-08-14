//正则校验姓名
global.isName = function(nubmer) {
    var regName = /^[\u4e00-\u9fa5]{2,4}$/;
    if (regName.test(nubmer)) {
        return true;
    }
    return false;
}
//校验手机号
global.checkMobile = function(s) {
    let regu = /^1(3|4|5|7|8|6)\d{9}$/;
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}
//校验是否为空
global.isEmpty = function(s) {
    if(s == undefined || s == null || s == ''){
        return false;
    }else {
        return true;
    }
}
//校验特殊字符
global.checkSymbols = function(s) {
    let regu = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
    if (regu.test(s)) {
        return false;
    } else {
        return true;
    }
}
//弹窗提示
global.showToast = function(txt){
    wx.showToast({
        title:txt,
        icon:'none'
    })
}
//前往下一页面 用处不大
global.toNextPage = function(url){
    uni.navigateTo({url:'/pages/index/' + url})
}
//微信登录验证
global.wxAuth = async function(codes){
    let res = await global.getOpenid({
        code:codes
    })
    if(res.statusCode == 200){
        uni.setStorageSync('openid',res.data.openid)
        wx.setStorageSync('session_key', res.data.session_key)
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            wx.setStorageSync('userInfo', res.rawData)
                            global.wxLogin()
                        }
                    })
                }else {
                }
            }
        })
    }
}
//微信授权
global.wxLogin = async function () {
    var userInfo = JSON.parse(wx.getStorageSync('userInfo'))
    var uOpenid = wx.getStorageSync('openid')
    let res = await global.wxlogin({
        uName:userInfo.nickName.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "**"),
        uPic:userInfo.avatarUrl,
        uSex:userInfo.gender,
        uOpenid:uOpenid,
    })
    if(res.data.code == 200){
        uni.setStorageSync('uPhone', res.data.uPhone)
        uni.setStorageSync('uShopkeeper', res.data.uShopkeeper)
        uni.setStorageSync('uid', res.data.uid)
        uni.setStorageSync('uStaus', res.data.uStaus)

        return true
    }
}

//订单提示
global.ordert = function (n) {
    var txt
    switch(n) {
        case '2':
            txt = '提醒发货成功'
            break;
        case '14':
            txt = '确认收货成功'
            break;
        case '3':
            txt = '申请退款成功'
            break;
        case '7':
            txt = '取消订单成功'
            break;
        case '8':
            txt = '删除订单成功'
            break;
        case '9':
            txt = '取消退款成功'
            break;
        default:
            ''
    }
    return txt
}