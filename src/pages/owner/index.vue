<template>
  <view>
    <view class="avactor">
      <view>智控推的工作台</view>
      <img :src="userInfo.avatarUrl" alt />
    </view>
    <view class="ownermoney space-between margin40">
      <view class="ownermoney_tx">
        <view>销售总额</view>
        <view>
          <text>¥</text>
          {{Number(shopkeeper.gross).toFixed(2)}}
        </view>
      </view>
      <view class="ownermoney_line"></view>
      <view class="ownermoney_tx">
        <view>累计收益</view>
        <view>
          <text>¥</text>
          {{Number(shopkeeper.earnings).toFixed(2)}}
        </view>
      </view>
      <view class="ownermoney_line"></view>
      <view class="ownermoney_tx" @click="towithdraw">
        <view>
          代入账收益
          <img src="../../static/arrow_right.png" alt class="arrow" />
        </view>
        <view>
          <text>¥</text>
          {{Number(shopkeeper.withdraw).toFixed(2)}}
        </view>
      </view>
    </view>
    <view class="ownertabs space-around margin40">
      <view @click="toNextPage('orderManage')">
        <img src="../../static/orderman.png" alt />
        <view>订单管理</view>
      </view>
      <view @click="toNextPage('moneyRecord')">
        <img src="../../static/withdrawel.png" alt />
        <view>提现记录</view>
      </view>
    </view>
    <view class="back">
      <img src="../../static/ownerback.png" alt />
    </view>
    <wx-auth :isshow="wxAuth" @changeshow="wxisshow"></wx-auth>
    <view class="tologin" @click="tologin" v-if="showlogin"></view>
    <tab-bar :current="currentTabIndex" :ushopkeeper="uShopkeeper"></tab-bar>
  </view>
</template>

<script>
import wxAuth from "../comp/wxAuth";
export default {
  name: "index",
  components: { wxAuth },
  data() {
    return {
      shopkeeper: {
        gross: "0.00",
        earnings: "0.00",
        withdraw: "0.00",
      },
      wxAuth: {
        show: false,
        islogin: false,
        isphone: false,
      },
      showlogin: false,
      uShopkeeper: 1,
      userInfo: "",
      currentTabIndex: 4,
    };
  },
  onShow() {
    this.selMoneyAll();
    var userInfo = uni.getStorageSync("userInfo");
    var userphone = uni.getStorageSync("uPhone");
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
      if (!userphone) {
        this.showlogin = true;
        this.wxAuth.isphone = true;
      }
    } else {
      this.showlogin = true;
      this.wxAuth.islogin = true;
    }
    var uShopkeeper = uni.getStorageSync("uShopkeeper");
    this.uShopkeeper = uni.getStorageSync("uShopkeeper");
  },
  methods: {
    tabClick(index) {
      this.currentTabIndex = index;
      this.uShopkeeper = uShopkeeper;
    },
    tologin() {
      this.wxAuth.show = true;
    },
    wxisshow(res) {
      if (!res.isphone && !res.islogin) {
        this.showlogin = false;
      }
      this.wxAuth = res;
    },
    // ushopkeeper(num){
    //     this.uShopkeeper = num
    // },
    towithdraw() {
      uni.navigateTo({ url: "/pages/owner/myMoney" });
      uni.setStorageSync("withdraw", this.shopkeeper.withdraw);
      // uni.setStorageSync('withdraw',12)
    },
    toNextPage(url) {
      uni.navigateTo({ url: "/pages/owner/" + url });
    },
    async selMoneyAll() {
      let res = await this.$api.selMoneyAll({
        distributionUid: "",
      });
      if (res.data.code == 200) {
        this.shopkeeper = res.data.shopkeeper;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.back {
  width: 100%;
  height: 202upx;
  position: fixed;
  top: 0upx;
  z-index: -1;
  img {
    height: 100%;
    width: 100%;
  }
}
.avactor {
  width: 100%;
  text-align: center;
  color: white;
  font-size: 32upx;
  padding-top: 32upx;
  position: fixed;
  top: 0upx;
  img {
    width: 151upx;
    height: 151upx;
    border-radius: 50%;
    margin-top: 40upx;
    border: 10upx solid rgba(255, 255, 255, 0.5);
  }
}
.arrow {
  width: 11upx;
  height: 20upx;
  margin-left: 10upx;
  position: relative;
  top: 5upx;
}
.ownermoney {
  margin-top: 300upx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3upx 10upx 0px rgba(0, 0, 0, 0.1);
  border-radius: 9upx;
  padding: 36upx 50upx;
  &_line {
    width: 1upx;
    height: 42upx;
    border: 1upx solid rgba(0, 0, 0, 1);
    opacity: 0.1;
    position: relative;
    top: 30upx;
  }
  &_tx:last-child {
    text-align: right;
  }
  &_tx > view:first-child {
    color: #666666;
    margin-bottom: 26upx;
    text-align: center;
  }
  &_tx > view:last-child {
    color: #f61e45;
    font-size: 32upx;
    font-weight: bold;
    > text {
      font-size: 20upx;
      padding-right: 5upx;
    }
  }
}
.ownertabs {
  padding: 16upx 0upx 27upx 0upx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3upx 10upx 0px rgba(0, 0, 0, 0.1);
  border-radius: 9upx;
  margin-top: 20upx;
  color: #030d18;
  font-size: 24upx;
  font-weight: 300;
  > view {
    text-align: center;
  }
  img {
    width: 90upx;
    height: 90upx;
    /*margin-bottom: 12upx;*/
  }
}
</style>