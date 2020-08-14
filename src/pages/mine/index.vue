<template>
    <view>
        <view class="ov personal margin40">
            <img :src="userInfo.avatarUrl ? userInfo.avatarUrl : '../../static/goodsdetails/avactor.png'" alt="" class="fl personal_ava">
            <view class="fl">
                <view class="personal_name">{{userInfo.nickName ? userInfo.nickName : '登录/注册'}}</view>
                <view>{{userphone ? userphone : '******'}}</view>
            </view>
<!--            <view class="fr">-->
<!--                <view class="personal_motx">-->
<!--                    账户余额 （元)-->
<!--                </view>-->
<!--                <view class="personal_mon">-->
<!--                    <text>¥</text>2550-->
<!--                </view>-->
<!--            </view>-->
        </view>
        <view class="tabchange space-between margin40">
            <view @click="toNextPage('collection')">
                <img src="../../static/mine/collection.png" alt="">
                <view>收藏</view>
            </view>
            <view @click="toNextPage('historyList')">
                <img src="../../static/mine/record.png" alt="">
                <view>记录</view>
            </view>
            <view @click="toNextPage('myorder')">
                <img src="../../static/mine/order.png" alt="">
                <view>订单</view>
            </view>
            <view @click="toNextPage('mademoney')">
                <img src="../../static/mine/money.png" alt="">
                <view>赚钱</view>
            </view>
        </view>
        <view class="otherList margin40" >
            <view class="space-between"  @click="toNextPage('shipAddress')">
                <view>
                    <img src="../../static/mine/addr.png" alt="" class="otherList_addr">
                    <text>收货地址</text>
                </view>
                <view>
                    <text class="otherList_addrtx"></text>
                    <img src="../../static/arrow_right.png" alt="" class="arrow">
                </view>
            </view>
        </view>
        <view  class="otherList margin40" style="margin-top: 20rpx">
<!--            <view class="space-between">-->
<!--                <view>-->
<!--                    <img src="../../static/mine/help.png" alt="" class="otherList_help">-->
<!--                    <text>帮助</text>-->
<!--                </view>-->
<!--                <view>-->
<!--                    <img src="../../static/arrow_right.png" alt="" class="arrow">-->
<!--                </view>-->
<!--            </view>-->
            <view >
                <button class="space-between" open-type="contact">
                    <view>
                        <img src="../../static/mine/contact.png" alt=""  class="otherList_con">
                        <text>联系我们</text>
                    </view>
                    <view>
                        <img src="../../static/arrow_right.png" alt="" class="arrow">
                    </view>
                </button>

            </view>
            <view class="space-between" @click="toNextPage('about')">
                <view>
                    <img src="../../static/mine/about.png" alt="" class="otherList_ab">
                    <text>关于我们</text>
                </view>
                <view>
                    <img src="../../static/arrow_right.png" alt="" class="arrow">
                </view>
            </view>
        </view>
        <view class="background">
            <img src="../../static/mine/background.png" alt="">
        </view>
        <view class="tologin" @click="tologin" v-if="showlogin"></view>
        <wx-auth :isshow="wxAuth" @changeshow="wxisshow" @userInfo="getuserInfo" @phone="getphone"></wx-auth>
        <tab-bar :current="currentTabIndex" :ushopkeeper="uShopkeeper"  ></tab-bar>
    </view>
</template>

<script>
import wxAuth from '../comp/wxAuth'
export default {
  name: "index",
  components: { wxAuth },
  data () {
    return {
      wxAuth: {
        show: false,
        islogin: false,
        isphone: false
      },
      uShopkeeper: 1,
      showlogin: false,
      userInfo: '',
      currentTabIndex: 3,
      userphone: ''
    }
  },
  onShow () {
      wx.hideTabBar()
    var userInfo = uni.getStorageSync('userInfo')
    var userphone = uni.getStorageSync('uPhone')
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo)
      if (!userphone) {
        this.showlogin = true
        this.wxAuth.isphone = true
      } else {
        this.userphone = userphone
      }
    } else {
      this.showlogin = true
      this.wxAuth.islogin = true
    }
    var uShopkeeper = uni.getStorageSync('uShopkeeper')
    this.uShopkeeper = uShopkeeper
  },
  methods: {
    tabClick (index) {
      this.currentTabIndex = index
      this.uShopkeeper = uni.getStorageSync('uShopkeeper')
    },
    tologin () {
      this.wxAuth.show = true
    },
    wxisshow (res) {
      if (!res.isphone && !res.islogin) {
        this.showlogin = false
      }
      this.wxAuth = res
      // var userInfo = uni.getStorageSync('userInfo')
      // this.userInfo =JSON.parse(userInfo)
    },
    getuserInfo (res) {
      var userphone = uni.getStorageSync('uPhone')
      if (userphone) {
        this.userphone = userphone
      }
      this.userInfo = JSON.parse(res)

    },
    getphone (res) {
      this.userphone = res
    },
    // ushopkeeper (num) {
    //   this.uShopkeeper = num
    // },
    toNextPage (url) {
      uni.navigateTo({
        url: '/pages/mine/' + url
      })
      global.isChooseAddr = false
    },
  }
}
</script>

<style scoped lang="scss">
.arrow {
  width: 12upx;
  height: 18upx;
  position: relative;
  top: 9upx;
}
.background {
  width: 100%;
  height: 443upx;
  position: fixed;
  top: -124upx;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
  }
}
.personal {
  color: white;
  margin-top: 50upx;
  &_ava {
    width: 125upx;
    height: 124upx;
    border-radius: 50%;
    margin-right: 17upx;
    border: 10upx solid rgba(255, 255, 255, 0.5);
  }
  &_name {
    font-size: 40upx;
    font-weight: bold;
    margin-bottom: 29upx;
    /*margin-top: 23upx;*/
  }
  &_motx {
    opacity: 0.8;
    font-size: 20upx;
    margin-top: 23upx;
  }
  &_mon {
    text-align: right;
    font-weight: bold;
    font-size: 30upx;
    margin-top: 20upx;
    > text {
      font-size: 20upx;
    }
  }
}
.tabchange {
  padding: 26upx 31upx 35upx 33upx;
  background: white;
  margin-top: 32upx;
  border-radius: 9upx;
  box-shadow: 0px 2upx 18upx 0px rgba(0, 0, 0, 0.08);
  > view {
    text-align: center;
    color: #030d18;
    font-size: 24upx;
  }
  img {
    width: 86upx;
    height: 86upx;
    margin-bottom: 5upx;
  }
}
.otherList {
  font-size: 27upx;
  color: #100101;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3upx 8upx 0px rgba(0, 0, 0, 0.08);
  border-radius: 9upx;
  margin-top: 40upx;
  img {
    position: relative;
  }
  button {
    background: white;
    width: 100%;
    border: none;
    padding: 0upx;
    font-size: 27upx;
    color: #100101;
  }
  button::after {
    border: none;
  }
  &_addr {
    width: 35upx;
    height: 43upx;
    margin-right: 21upx;
    top: 10upx;
  }
  &_help {
    width: 39upx;
    height: 39upx;
    margin-right: 17upx;
    top: 10upx;
  }
  &_con {
    width: 37upx;
    height: 37upx;
    margin-right: 20upx;
    top: 10upx;
  }
  &_ab {
    width: 36upx;
    height: 36upx;
    margin-right: 21upx;
    top: 10upx;
  }
  > view {
    padding: 35upx 0upx 35upx 0upx;
    margin: 0upx 30upx;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  > view:last-child {
    border: none;
  }

  &_addrtx {
    color: #666666;
    font-size: 24upx;
    margin-right: 17upx;
    position: relative;
    top: 9upx;
  }
}
</style>