<template>
    <view class="page">
        <tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true' @clickItem="onClickItem" ></tabControl>
        <!-- 使用 swiper 配合 滑动切换 -->
        <swiper class="swiper" style="height: 100%;" @change='scollSwiper' :current='current'>
            <swiper-item v-for="(item,index) in items" :key='index'>
                <!-- 使用 scroll-view 来滚动内容区域 -->
                <scroll-view scroll-y="true" style="height: 100%;">
                    <view  class="margin40 lists"  v-for="(item,index) in goods.goodsList" @click="toNextPage('mine/nextPage/orderDetails',item)" :key="index">
                        <view class="space-between lists_ti">
                            <view class="lists_date">
                                {{item.oTime}}
                            </view>
                            <view class="lists_wait" v-if="item.oType==5">待收货</view>
                            <view class="lists_wait" v-if="item.oType==2">待发货</view>
                            <view  v-if="item.oType== '1'" class="zhi">待支付...</view>
                            <view  v-if="item.oType== '3'" class="zhi">退款中...</view>
                            <view  v-if="item.oType== '4'" class="yi">退款成功</view>
                            <view  v-if="item.oType== '7'" class="yi">交易取消</view>
                            <view v-if="item.oType== '6'" class="yi">交易完成</view>
                            <view v-if="item.oType== '10'" class="zhi">换货中</view>
                            <view v-if="item.oType== '14'" class="lists_wait">待评价</view>
                        </view>
                        <view class="ov">
                            <img :src="item.pCover" alt="" class="fl">
                            <view class="fl lists_con">
                                {{item.pName}}
                            </view>
                            <view class="fr">
                                <view class="lists_pri">
                                    <text>¥</text>{{item.pPrice}}
                                </view>
<!--                                <view class="lists_num">-->
<!--                                    <text>x</text>{{item.pNum}}-->
<!--                                </view>-->
                            </view>
                        </view>
                        <view class="lists_mon">
                            实付款：¥ {{item.oPrice}}
                        </view>
                        <view class="ov">
                            <button class="red" v-if="item.oType==5 " @click.stop="confirmGoods(item,'14')">确认收货</button>
                            <button class="gray" v-if="item.oType==5" @click.stop="delaygoods(item)">延长收货</button>
                            <button class="gray" v-if="item.oType==3" @click.stop="confirmGoods(item,'9')">取消退款</button>
                            <button class="red" v-if="item.oType==1" @click.stop="topay(item)">立即付款</button>
                            <button class="red" v-if="item.oType==6 || item.oType==4" @click.stop="toNextPage('class/submitOrder',item)">再次购买</button>
                            <button class="gray" v-if="item.oType == 14"  @click.stop="toNextPage('class/next/toComment?type=1',item)">去评价</button>
                            <button class="gray" v-if="item.oType==2" @click.stop="orderShipment(item)">提醒发货</button>
                            <button class="gray" v-if="item.oType == 1" @click.stop="confirmGoods(item,'7')">取消订单</button>
                            <button class="gray" v-if="item.oType == 6||item.oType == 7||item.oType == 9||item.oType == 4" @click.stop="confirmGoods(item,'8')">删除订单</button>
                            <button class="gray" v-if="item.oType == 2" @click.stop="toNextPage('mine/nextPage/refund',item)">申请退款</button>
                            <button class="gray" v-if="item.oType == 6&&item.additional == 1" @click.stop="toNextPage('class/next/toComment?type=2',item)">追加评价</button>

                        </view>
                    </view>
                    <view v-if="goods.goodsList.length==0">
                        <empty :prop="empty"></empty>
                    </view>

                </scroll-view>
            </swiper-item>
        </swiper>

    </view>
</template>

<script>
import tabControl from '../comp/tabControl-tag'
import goodsLists from "../comp/goodsLists";
import empty from "../comp/empty";
export default {
  components: { tabControl, goodsLists, empty },
  name: "myorder",
  data () {
    return {
      items: ['全部', '待支付', '已支付', '已发货'],
      current: 0,
      goods: {
        num: 9,
        from: 'order',
        goodsList: []
      },
      empty: 'mine'
    };
  },
  onLoad () { },
  onShow () {
    this.getselorder()
  },
  methods: {
    async delaygoods (item) {
      let res = await this.$api.delaygoods({
        oNumber: item.oNumber,
      })
      var that = this
      if (res.data.code == 200) {
        global.showToast('延长收货成功')
      } else {
        global.showToast(res.data.msg)
      }
    },
    async orderShipment (item) {
      let res = await this.$api.orderShipment({
        ordernum: item.oNumber,
      })
      var that = this
      if (res.data.code == 200) {
        global.showToast('提醒发货成功')
        setTimeout(() => {
          that.getselorder()
        }, 1000)

      } else {
        global.showToast('系统繁忙，请稍后再试')
      }
    },
    async topay (item) {
      var oNumber = item.oNumber
      let res = await this.$api.toPay({
        oNumber: oNumber
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
            this.getselorder()
          },
          fail: function (res) {
            global.showToast('支付失败')
          }
        })
      } else {
        global.showToast(res.data.msg)
      }

    },
    async confirmGoods (item, num) {
      let res = await this.$api.updateOrderOtype({
        oNumber: item.oNumber,
        oType: num
      })
      var that = this
      if (res.data.code == 200) {
        global.showToast(global.ordert(num))
        setTimeout(() => {
          that.getselorder()
        }, 1000)

      } else {
        global.showToast('系统繁忙，请稍后再试')
      }
    },
    onClickItem (val) {
      this.current = val.currentIndex
      this.getselorder()
    },
    scollSwiper (e) {
      this.current = e.target.current
      this.getselorder()
    },
    async getselorder () {
      var num = this.current == 3 ? '5' : this.current
      let res = await this.$api.getselorder({
        type: num
      })
      if (res.data.code == 200) {
        res.data.datalist.forEach((a, b) => {
          // a.pPrice = Math.round(a.pPrice).toFixed(2)
          a.oPrice = a.oPrice.toFixed(2)
        })
        this.goods.goodsList = res.data.datalist
      }
    },
    toNextPage (url, item) {
      console.log(item)
      // return
      uni.navigateTo({
        url: '/pages/' + url
      })
      item.totalmoney = item.oPrice
      global.detailShop = item
      global.orderDetails = item
      global.isfa = 1
    },
  }
}
</script>

<style scoped lang="scss">
page {
  height: 100%;
}
.page {
  padding-top: 103upx;
  height: 100vh;
}
.lists {
  background: white;
  box-shadow: 0px 3upx 8upx 0px rgba(0, 0, 0, 0.08);
  border-radius: 5upx;
  margin-top: 19upx;
  padding: 30upx;
  color: #333333;
  img {
    width: 166upx;
    height: 166upx;
    margin-right: 20upx;
  }
  &_date {
    color: #999999;
  }
  &_wait {
    color: #4a6cfc;
  }
  &_ti {
    margin-bottom: 40upx;
  }
  &_con {
    width: 320upx;
    font-size: 26upx;
    font-weight: 300;
  }
  button {
    background: white;

    /*box-shadow:0px 2upx 25upx 0px rgba(251,88,103,0.46);*/
    border-radius: 20upx 0px 20upx 0px;
    font-size: 26upx;
    padding: 0upx 20upx;
    height: 47upx;
    line-height: 47upx;
    float: right;
    margin-top: 30upx;
    margin-left: 20upx;
    /*opacity: 0.8;*/
  }
  .gray {
    border: 1px solid #c4c4c4;
    color: #999999;
  }
  .red {
    border: 1px solid rgba(247, 35, 72, 0.8);
    color: #f7254a;
  }
  button:after {
    border: none;
  }
  &_mon {
    margin-top: 20upx;
    text-align: right;
  }
  &_pri {
    font-size: 30upx;
    text {
      font-size: 20upx;
    }
  }
  &_num {
    color: #999999;
    font-size: 26upx;
    text-align: right;
    text {
      font-size: 20upx;
    }
  }
  .zhi {
    color: #f61e45;
  }
  .wan {
    color: #999999;
  }
}
</style>