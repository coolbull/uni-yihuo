<template>
    <view>
        <view class="bankground" :style="{height:status.top + status.height + 187 + 'px'}">
            <img :src="user.uStorepic" alt="">
            <view class="space-between title" >
                <view class="align-center">
                    <img :src="user.uPic" alt="">
                    <view>
                        <view class="title_t">{{user.uName}}</view>
                        <view class="title_s">{{productnum}}款商品</view>
                    </view>
                </view>
                <view class="align-center">
                    <view class="title_btn" @click="shareMeeting" v-if="productnum>0">分享会场</view>
                </view>
            </view>
            <img src="../../../static/managebank.png" class="managebank" alt="" :style="{top:-(status.top + status.height + 187) + 'px'}" >
        </view>
        <view class="lists" :style="{marginTop:(status.top + status.height + 95) + 'px'}">
            <best-lists :goods="goods" @showdetails="showdetails"></best-lists>
            <empty :prop="empty" v-if="goods.goodsList.length==0"></empty>
        </view>
        <!-- submit -->
        <choose-details :choosetype="choosetype" :details="details" @closepop="closepop" @submit="toBuyGoods"></choose-details>
        <view class="tologin" @click="tologin" v-if="showlogin"></view>
        <wx-auth :isshow="wxAuth" @changeshow="wxisshow" v-if="showlogin"></wx-auth>
        <img src="../../../static/back.png" alt="" class="back" :style="{top:status.top  + 10 + 'px'}" @click="back">
    </view>

</template>

<script>
import bestLists from "../../comp/bestLists";
import chooseDetails from "../../comp/chooseDetails";
import empty from "../../comp/empty";
import wxAuth from '../../comp/wxAuth'
export default {
  name: "brandDetails",
  components: { bestLists, chooseDetails, empty, wxAuth },
  data () {
    return {
      status: {

      },
      empty: 'manage',
      goods: {
        from: 'class',
        show: true,
        isshop: true,
        goodsList: []
      },
      choosetype: false,
      choosegoods: '',
      details: '',
      choosepcoverindex: -1,
      productnum: 0,
      user: '',
      wxAuth: {
        show: false,
        islogin: false,
        isphone: false
      },
      showlogin: false,
      isLoginLoading: false
    }
  },
  onLoad (options) {

    this.$nextTick(() => {
      let scene = options.scene

      //如果二维码有数据
      if (scene) {
        //二维码传递参数
        let msg = decodeURIComponent(scene).split(';');
        //分销id
        global.distributionUid = msg[1]
        //muid
        this.muId = msg[0]
      } else {
        //如果二维码没有参数 则不从scene取数据
        this.muId = global.muId
      }

      this.status = uni.getMenuButtonBoundingClientRect()
      this.getmerchantdetails()

      console.log(this.muId, global.distributionUid)
    });


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
  },
  methods: {
    toBuyGoods (data) {
      //判断多选状态选择商品
      let totalMoneys = data.totalMoneys;
      if (totalMoneys == 0 && !totalMoneys) {
        global.showToast('请先选择商品')
        return false
      }
      //跳转页面
      uni.navigateTo({
        url: '/pages/class/submitOrder'
      })
      //拿到数据
      if (totalMoneys) {
        data.totalmoney = totalMoneys
        data.totalnum = data.totalNums
      }


      //赋值
      global.detailShop = data
      global.isshop = true
      if (this.uid) {
        global.distributionUid = this.uid
      }
    },
    wxisshow (res) {
      if (!res.isphone && !res.islogin) {
        //登录完成
        this.showlogin = false
      }
      this.wxAuth = res
      //加载完毕
      this.$nextTick(() => {
        this.isLoginLoading = false;
      })

    },
    tologin () {
      //加载中不让再次访问
      console.log(this.isLoginLoading, "加载中")
      if (this.isLoginLoading) return false
      //正在加载中
      this.isLoginLoading = true
      //展示登录
      this.wxAuth.show = true

    },
    closepop () {
      this.choosetype = false
    },
    back () {
      uni.navigateBack({
        delta: 1,
        fail () {
          console.log('返回失败，没有上一页面')
          uni.switchTab({
            url: '/pages/index/index',
            fail (err) {
              console.log(err)
            },
          });
        }
      })
    },
    submit (details) {
      this.details = details
      this.addshopping()
    },
    async getmerchantdetails () {
      let res = await this.$api.getmerchantdetails({
        muId: this.muId
      })
      if (res.data.code == 200) {
        this.productnum = res.data.productnum
        this.user = res.data.user
        res.data.productDetails.forEach((a, b) => {
          a.pimagetext = a.pCover
          a.pname = a.pName
          a.pPricef = a.pPricef.toFixed(2)
          a.pPrice = a.pPrice.toFixed(2)
        })
        this.goods.goodsList = res.data.productDetails
      }
    },
    showdetails (item) {
      if (item.list) {
        this.choosetype = true
        this.choosegoods = item
        this.details = item
      } else {
        //   this.details = item
        //   console.log(item)
        this.toBuyGoods(item)
        return false;
      }

    },
    async addshopping () {
      var pIdArr = [], numArr = [], pColorname = []
      if (this.details.seriesId != 0) {
        this.details.list.forEach((a, b) => {
          if (a.num > 0) {
            pIdArr.push(a.pid)
            numArr.push(a.num)
            pColorname.push(a.pColorname)
          }
        })
      }
      let res = await this.$api.addshoppingcar({
        pId: this.details.seriesId != 0 ? pIdArr.join(';') : this.details.pid,
        pNum: this.details.seriesId != 0 ? numArr.join(';') : '1'
      })
      if (res.data.code == 200) {
        global.showToast('加入购物车成功')
        this.choosetype = false
      }
    },

    shareMeeting () {
      global.manageDetails = {
        user: this.user,
        goodsList: this.goods.goodsList
      }
      global.manageFourIndex = null
      uni.navigateTo({
        url: '/pages/index/next/forward?muId=' + this.muId
      })
    }
  }
}
</script>

<style scoped lang="scss">
.managebank {
  width: 750upx !important;
  height: 100% !important;
  position: relative;
}
.back {
  width: 22upx !important;
  height: 39upx !important;
  position: fixed;
  top: 0upx;
  left: 40upx;
  z-index: 9999;
}
.bankground {
  position: fixed;
  top: 0upx;
  width: 100%;
  height: 296upx;
  img {
    width: 100%;
    height: 100%;
    /*position: absolute;*/
    /*top: 0upx;*/
  }
  > view {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0upx;
    background: rgba(0, 0, 0, 0.7);
    padding: 0upx 40upx;
    color: white;
  }
}
.title {
  img {
    width: 100upx;
    height: 100upx;
    margin-right: 17upx;
  }
  &_btn {
    width: 143upx;
    height: 50upx;
    background: linear-gradient(
      -30deg,
      rgba(246, 30, 69, 1),
      rgba(253, 68, 95, 1)
    );
    border-radius: 20upx 0px 20upx 0px;
    font-size: 26upx;
    color: white;
    text-align: center;
    line-height: 50upx;
    z-index: 9999;
  }
  &_t {
    font-size: 30upx;
    margin-bottom: 15upx;
  }
  &_s {
    font-size: 24upx;
    font-weight: 300;
  }
}
.lists {
  position: relative;
  min-height: 1064upx;
  background: rgba(248, 246, 246, 1);
  border-radius: 20upx 20upx 0upx 0upx;
  padding: 40upx 0upx;
}
</style>