<template>
    <view class="orderwrap">
        <view class="address" @click="tochange">
            <view class="space-between" >
                <view v-if="address">
                    <view>
                        <text class="label" v-if="address.status==2">默认</text>
                        <text class="label" style="background: #4a6cfc" v-if="address.slabel">{{address.slabel}}</text>
                        <text class="address_addr">{{address.pname}}{{address.cname}}{{address.aname}}</text>
                    </view>
                    <view class="address_spec">{{address.saddress}}</view>
                    <view class="address_name">
                        <text>{{address.sname}}</text>
                        <text style="padding-left: 10upx">{{address.sphone}}</text>
                    </view>
                </view>
                <view v-if="!address" class="nonaddr">您还没有默认收货地址，快去添加吧～</view>
                <view class="address_right">
                    <img src="../../static/arrow_right.png" alt="">
                </view>
            </view>

            <img src="../../static/border.png" alt="" class="address_bor">
        </view>
        <view v-if="details.seriesId!=0">
            <view class="goodsList ov" v-for="item in details.list" v-if="item.num>0">
                <img :src="item.pCover" alt="" class="goodsList_go fl">
                <view class="goodsList_ri fr space-between">
                    <view>
                        <view class="goodsList_tit">{{item.pName}}</view>
                        <view class="goodsList_int">
                            {{item.pColorname?item.pColorname:''}}
                        </view>
                    </view>

                    <view>
                        <view>
<!--                            <view class="goodsList_price" v-if="details.pDiscount=='1' ||details.pDiscount==null||details.pDiscount==undefined">-->
                            <!--                                <text>¥ </text>{{item.pPrice}}-->
                            <!--                            </view>-->
                            <view class="goodsList_price" >
                                <text>¥ </text>{{item.pPricef}}
                            </view>
<!--                            <view class="goodsList_price" v-if="details.pDiscount!='1'&&details.pDiscount!=null&&details!=undefined">-->
<!--                                <text>¥ </text>{{item.pPricef}}-->
<!--                            </view>-->
                        </view>
                        <view class="goodsList_num">x {{item.num}}</view>
<!--                        <view class="flex">-->
<!--                            <view class="goodsList_cha" @click="reduce">-->
<!--                                <img src="../../static/reduce.png" alt="" >-->
<!--                            </view>-->
<!--                            <view class="goodsList_num">{{num}}</view>-->
<!--                            <view  class="goodsList_cha goodsList_add" @click="add">-->
<!--                                <img src="../../static/add.png" alt="">-->
<!--                            </view>-->
<!--                        </view>-->
                    </view>
                </view>
            </view>
        </view>
        <view v-if="details.seriesId==0">
            <view class="goodsList ov" >
                <img :src="details.pCover" alt="" class="goodsList_go fl">
                <view class="goodsList_ri fr ">
<!--                    <view>-->
                        <view class="goodsList_tit" style="margin-bottom: 70rpx">{{details.pName}}</view>
<!--                    </view>-->

                    <view class="space-between">
                        <view>
                            <view class="goodsList_prices" v-if="details.pDiscount=='1' ||details.pDiscount==null||details.pDiscount==undefined">
                                <text>¥ </text>{{details.pPrice}}
                            </view>
                            <view class="goodsList_prices" v-if="details.pDiscount!='1'&&details.pDiscount!=null&&details!=undefined">
                                <text>¥ </text>{{details.pPricef}}
                            </view>
                        </view>
                        <view class="flex">
                            <view class="goodsList_cha" @click="reduce">
                                <img src="../../static/reduce.png" alt="" >
                            </view>
                            <view class="goodsList_nums">{{num}}</view>
                            <view  class="goodsList_cha goodsList_add" @click="add">
                                <img src="../../static/add.png" alt="">
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="otherList">
            <view class="space-between">
                <view>商品金额</view>
                <view v-if="details.seriesId!=0">¥ {{details.totalmoney}}</view>
                <view v-if="details.seriesId==0">
                    <view  v-if="details.pDiscount=='1' ||details.pDiscount==null||details.pDiscount==undefined">
                       ¥ {{details.pPrice}}
                    </view>
                    <view  v-if="details.pDiscount!='1'&&details.pDiscount!=null&&details!=undefined">
                       ¥ {{details.pPricef}}
                    </view>
                </view>
            </view>
        </view>
        <view class="submit space-between">
            <view>
                <text class="submit_dai">待支付</text>
                <text class="submit_fu">¥ </text>
                <text class="submit_mon" v-if="details.seriesId!=0">{{details.totalmoney}}</text>
                <text class="submit_mon" v-if="details.seriesId==0">{{totalMoneys}}</text>
<!--                <text class="submit_fu">.00</text>-->
            </view>
            <view>
                <button class="button" @click="submitOrder">提交订单</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
  name: "submitOrder",
  data () {
    return {
      address: '',
      details: '',
      totalMoney: 0,
      couFees: 8,
      num: 1,
      totalMoneys: 0
    }
  },
  onLoad () {
    this.details = global.detailShop
    console.log(this.details)
    // if(this.details.pDiscount!=null || this.details.pDiscount!=undefined){
    //     if(this.details.pDiscount != '1'){
    this.totalMoneys = this.details.pPricef

    //     }else {
    //         this.totalMoneys = this.details.pPrice
    //     }
    // }else {
    //     this.totalMoneys = this.details.pPrice
    // }



  },
  onShow () {
    if (global.defaultAddr) {
      this.address = global.defaultAddr
    } else {
      this.defaultaddress()
    }
  },
  methods: {
    tochange () {
      if (this.address) {
        uni.navigateTo({
          url: '/pages/mine/shipAddress'
        })
        global.isChooseAddr = true
      } else {
        uni.navigateTo({
          url: '/pages/mine/nextPage/addAddress?isAdd=1'
        })
      }


    },
    async defaultaddress () {
      let res = await this.$api.defaultaddress({
      })
      if (res.data.code == 200) {
        this.address = res.data.datalist
      }
    },
    add () {

      if (this.num >= this.details.pCount) {
        global.showToast('库存不足')
        return
      }
      this.num++
      // if(this.details.pDiscount!=null || this.details.pDiscount!=undefined){
      //     if(this.details.pDiscount != '1'){
      this.totalMoneys = (this.num * this.details.pPricef).toFixed(2)
      //
      //     }else {
      //         this.totalMoneys = (this.num*this.details.pPrice).toFixed(2)
      //     }
      // }else {
      //     this.totalMoneys = (this.num*this.details.pPrice).toFixed(2)
      // }


    },
    reduce () {
      this.num--
      if (this.num <= 1) {
        this.num = 1
        global.showToast('宝贝数量不能在减少了')
      }
      // if(this.details.pDiscount!=null || this.details.pDiscount!=undefined){
      //     if(this.details.pDiscount != '1'){
      this.totalMoneys = (this.num * this.details.pPricef).toFixed(2)
      //
      //     }else {
      //         this.totalMoneys = (this.num*this.details.pPrice).toFixed(2)
      //     }
      // }else {
      //     this.totalMoneys = (this.num*this.details.pPrice).toFixed(2)
      // }
    },
    submitOrder () {
      if (!this.address) {
        global.showToast('您还没有收货地址，快去添加吧～')
        return
      }
      this.createOrder()

    },
    async createOrder () {
      var pIdArr = [], numArr = [], pColorname = [], pIds = [], pCounts = [], scId = []
      if (this.details.seriesId != 0) {
        this.details.list.forEach((a, b) => {
          if (a.num > 0) {
            pIdArr.push(a.pid)
            pIds.push(a.pid)
            numArr.push(a.num)
            pCounts.push(a.num)
            scId.push(a.scId)
            pColorname.push(a.pColorname)
          }
        })
      }
      // return
      var data = {
        province: this.address.pname,
        city: this.address.cname,
        county: this.address.aname,
        defaddress: this.address.saddress,
        pId: this.details.seriesId != 0 ? pIdArr.join(';') : this.details.pid,
        pColorname: this.details.seriesId != 0 ? pColorname.join(';') : this.details.pColorname,
        distributionUid: global.distributionUid ? global.distributionUid : '',
        pNum: this.details.seriesId != 0 ? numArr.join(';') : this.num,
        oPeople: this.address.sname,
        oPhone: this.address.sphone,
        pCost: this.details.pCost ? this.details.pCost : '0',//成本价
        company: global.company ? global.company : '',
        pIds: pIds.join(';'),
        pCounts: pCounts.join(';'),
        scId: global.isshop ? '' : scId.join(';')
      }
      let res = await this.$api.createorder(data)
      if (res.data.code == 200) {
        this.topay(res.data.oNumber)

      }
    },
    async topay (number) {
      let res = await this.$api.toPay({
        oNumber: number
      })

      if (res.data.code == 200) {
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: 'prepay_id=' + res.data.data.package,
          signType: 'MD5',
          paySign: res.data.data.paySign,
          success: function (res) {
            global.showToast('支付成功')
            wx.redirectTo({
              url: '/pages/success'
            })
            // do something
          },
          fail: function (res) {
            global.showToast('支付失败')
          }
        })
      } else {
        global.showToast(res.data.msg)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.orderwrap {
  > view {
    padding: 40upx;
    background: white;
    margin-top: 10upx;
  }
}
.address {
  /*border-width: 7upx;*/
  /*border-image: url("../../static/border.png");*/
  position: relative;
  &_label {
  }
  &_addr {
    font-size: 28upx;
    color: #666666;
  }
  &_bor {
    width: 100%;
    height: 7upx;
    position: absolute;
    bottom: 0px;
    left: 0upx;
  }
  &_right {
    display: flex;
    align-items: center;
    img {
      width: 17upx;
      height: 28upx;
    }
  }
  &_spec {
    margin-top: 29upx;
    color: #333333;
    font-size: 32upx;
    margin-bottom: 28upx;
  }
  &_name {
    color: #666666;
    font-size: 28upx;
  }
}
.goodsList:last-child {
  border-bottom: none;
  margin-bottom: 0upx;
  padding-bottom: 0upx;
}
.goodsList {
  padding-bottom: 30upx;
  border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30upx;
  &_go {
    width: 145upx;
    height: 145upx;
    margin-right: 40upx;
  }
  &_cha {
    width: 40upx;
    height: 40upx;
    background: rgba(240, 239, 239, 1);
    border-radius: 20upx 0upx 20upx 0upx;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 21upx;
      height: 4upx;
    }
  }
  &_add {
    background: linear-gradient(
      -30deg,
      rgba(246, 30, 69, 0.15),
      rgba(253, 68, 95, 0.15)
    );
    img {
      width: 21upx;
      height: 21upx;
    }
  }
  &_tit {
    color: #333333;
    font-size: 26upx;
    margin-bottom: 20upx;
  }
  &_ri {
    width: 483upx;
  }
  &_price {
    color: #333333;
    font-size: 28upx;
    /*font-weight: bold;*/
    > text {
      font-size: 20upx;
      padding-right: 10upx;
    }
  }
  &_prices {
    color: #f61e45;
    font-size: 36upx;
    font-weight: bold;
    > text {
      font-size: 20upx;
      padding-right: 10upx;
    }
  }
  &_num {
    color: #666666;
    text-align: right;
    font-size: 22upx;
  }
  &_nums {
    width: 20upx;
    text-align: center;
    margin-left: 10upx;
    margin-right: 10upx;
  }
  &_int {
    /*padding: 10upx;*/
    /*border-radius: 10upx;*/
    /*background: #f2f2f2;*/
    width: 300upx;
    color: #666666;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.otherList {
  > view {
    font-weight: bold;
    margin-bottom: 30upx;
    > view:first-child {
      color: #030d18;
      font-size: 26upx;
    }
    > view:last-child {
      color: #333333;
      font-size: 30upx;
    }
  }
  > view:last-child {
    margin-bottom: 0upx;
  }
}
.submit {
  position: fixed;
  width: 100%;
  bottom: 0upx;
  padding: 20upx 40upx;
  box-shadow: 0px 0px 46px 0px rgba(67, 67, 67, 0.07);
  button {
    width: 284upx;
    font-size: 36upx;
    height: 88upx;
  }
  &_dai {
    color: #666666;
    font-size: 26upx;
    padding-right: 10upx;
  }
  &_fu {
    color: #f61e45;
    font-size: 26upx;
    font-weight: bold;
  }
  &_mon {
    font-size: 54upx;
    font-weight: bold;
    color: #f61e45;
  }
}
.nonaddr {
  font-size: 28upx;
  color: #999999;
}
</style>