<template>
  <view class="wxWrap" @click="showmodel" v-if="show.show">
    <view @click.stop="showcon">
      <view class="wxWrap_t">驿货</view>
      <view class="wxWrap_f">线下体验+线上购买</view>
      <view @click.stop="stopClick">
        <button
          class="button"
          open-type="getUserInfo"
          @getuserinfo="bindgetuserinfo"
          v-if="show.islogin"
        >使用微信登陆</button>
        <button
          class="button"
          open-type="getPhoneNumber"
          v-if="show.isphone"
          @getphonenumber="bindgetphonenumber"
        >获取手机号</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "wxAuth",
  props: {
    isshow: {
      type: Object,
    },
  },
  watch: {
    isshow(newval, oldval) {
      this.show = newval;
    },
  },
  data() {
    return {
      show: {
        show: false,
        islogin: false,
        isphone: false,
      },
    };
  },
  methods: {
    stopClick() {
      this.show.show = false;
    },
    showcon() {
      this.show.show = true;
    },
    showmodel() {
      this.show.show = false;
      this.$emit("changeshow", this.show);
    },
    bindgetuserinfo() {
      // this.show.show = true
      let _this = this;
      wx.getUserInfo({
        success: (res) => {
          console.log("成功获取用户信息");
          wx.setStorageSync("userInfo", res.rawData);
          // global.wxLogin()
          if (global.wxLogin()) {
            this.show.islogin = false;
            this.show.show = false;

            setTimeout(() => {
              var uShopkeeper = uni.getStorageSync("uShopkeeper");
              this.$emit("ushopkeeper", uShopkeeper);
              var userphone = uni.getStorageSync("uPhone");
              if (!userphone) {
                this.show.isphone = true;
              }
              this.$emit("changeshow", this.show);
              this.$emit("userInfo", res.rawData);
            }, 500);
          }
        },
        fail() {
          console.log("拒绝授权");
          _this.$emit("changeshow", _this.show);
        },
      });
    },
    bindgetphonenumber(e) {
      if (e.detail) {
        this.miniGetPhone(e);
      }
    },
    async miniGetPhone(e) {
      let res = await global.miniGetPhone({
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        session_key: wx.getStorageSync("session_key"),
      });
      if (res.data.code == 200) {
        uni.setStorageSync("uPhone", res.data.uphone);
        this.updUserPhone(res.data.uphone);
      }
    },
    async updUserPhone(phone) {
      var uid = wx.getStorageSync("uid");
      let res = await this.$api.updUserPhone({
        uId: uid,
        uPhone: phone,
      });
      if (res.data.code == 200) {
        global.showToast("获取手机号成功");
        this.show.isphone = false;
        this.show.show = false;
        this.$emit("changeshow", this.show);
        this.$emit("userphone", phone);
      } else {
        global.showToast(res.data.msg);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wxWrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  > view {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 60upx;
    background: white;
    border-radius: 40upx 40upx 0upx 0upx;
    padding-bottom: calc(160rpx + env(safe-area-inset-bottom));
  }
  &_t {
    font-size: 48upx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 38upx;
  }
  &_f {
    color: #666666;
    font-size: 44upx;
    margin-bottom: 80upx;
  }
}
</style>