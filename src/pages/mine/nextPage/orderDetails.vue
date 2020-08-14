<template>
    <view>
        <view class="back"  v-if="orderDetails.oType== '6'">
            <img src="../../../static/allright.png" alt="">
            <text>完成</text>
        </view>
        <view class="back" v-if="orderDetails.oType == '1'">
            <img src="../../../static/waitfahuo.png" alt="">
            <text>等待付款</text>
        </view>
        <view class="back" v-if="orderDetails.oType == '2'">
            <img src="../../../static/daifahuo.png" alt="">
            <text>待发货</text>
        </view>
        <view class="back" v-if="orderDetails.oType == '14'">
            <img src="../../../static/daifahuo.png" alt="">
            <text>待评价</text>
        </view>
        <view class="back" v-if="orderDetails.oType == '5'">
            <img src="../../../static/waitgoods.png" alt="">
            <text>待收货</text>
        </view>
        <view class="back" v-if="orderDetails.oType == '3'">
            <img src="../../../static/tuikuanzhong.png" alt="">
            <text>退款处理中</text>
        </view>
        <view class="back" v-if="orderDetails.oType == '4'">
            <img src="../../../static/allright.png" alt="">
            <text>退款成功</text>
        </view>
        <view class="back" v-if="orderDetails.oType == '7' || orderDetails.oType == '9'">
            <img src="../../../static/cancel.png" alt="">
            <text>交易取消</text>
        </view>
        <view class="back" v-if="orderDetails.oType == '10' ">
            <img src="../../../static/tuikuanzhong.png" alt="">
            <text>换货中</text>
        </view>
        <view class="details">
            <view class="courier space-between" v-if="orderDetails.oType == '5'||orderDetails.oType == '6'||orderDetails.oType == '1'||cuurierdetails" @click="toCurier">
                <view class=" flex">
                    <img src="../../../static/courier.png" alt="" class="courier_icon">
                    <view class="courier_txt" v-if="orderDetails.oType == '6'">您的订单已签收，感谢您在驿货购物，欢迎您再次光临！</view>
                    <view class="courier_txt" v-if="cuurierdetails&&orderDetails.oType != '6'">
                        {{cuurierdetails.status}}
                        <view style="color: #666666;font-size: 22rpx;margin-top: 28upx">{{cuurierdetails.time}}</view>
                    </view>
                    <view v-if="orderDetails.oType == '1'">
                            <view class="name">{{orderDetails.oPeople}} {{orderDetails.oPhone}}</view>
                            <view class="addr">地址：{{orderDetails.defaddress}}</view>
                    </view>
                </view>
                <view class="align-center " style="position: relative;top: 50%; " v-if="orderDetails.oType != '1'">
                    <img src="../../../static/arrow_right.png" alt="" class=" right">
                </view>
            </view>
            <view class="address flex" v-if="orderDetails.oType != '1'">
                <img src="../../../static/address.png" alt="" class="address_icon">
                <view>
                    <view class="name">{{orderDetails.oPeople}} {{orderDetails.oPhone}}</view>
                    <view class="addr">地址：{{orderDetails.defaddress}}</view>
                </view>
            </view>
            <view class="goods">
                <view>
                    <view class="flex goods_mes" v-for="item in productDetails" v-if="productDetails">
                        <img :src="item.pCover" alt="" class="goods_img">
                        <view>
                            <view>{{item.pName}}</view>
                            <view class="goods_num">数量：{{item.pNum}}</view>
                            <view class="goods_money">
                                <text>¥</text>
                                {{item.pPrice}}
                            </view>
                        </view>
                    </view>

                    <view class="flex goods_mes" @click="todetails"  v-if="!productDetails">
                        <img :src="orderDetails.pCover" alt="" class="goods_img">
                        <view>
                            <view>{{orderDetails.pName}}</view>
                            <view class="goods_num">数量：{{orderDetails.pNum}}</view>
                            <view class="goods_money">
                                <text>¥</text>
                                {{orderDetails.pPrice}}
                            </view>
                        </view>
                    </view>
                </view>

                <view class="ov" v-if="orderDetails.oType == '5'||orderDetails.oType == '6'||orderDetails.oType == '14'">
                    <button class="gray operbtn" @click="toNextPage('class/next/chooseAfterType',true)">申请售后</button>
                </view>
                <view class="ov" v-if="orderDetails.oType == '2'">
                    <button class="gray operbtn" @click="toNextPage('mine/nextPage/refund')">申请退款</button>
                </view>
                <view v-if="false">
                    <view class="goods_tui">退换无忧</view>
                    <view class="space-between goods_yun">
                        <view>完成退换货，自动申请理赔</view>
                        <view>
                            <text>商家赠送</text>
                            <img src="../../../static/arrow_right.png" alt="" class="right">
                        </view>
                    </view>
                </view>
            </view>
            <view style="padding: 20rpx">
                <button class="contact" open-type="contact">
                    <img src="../../../static/message.png" alt="">
                    联系客服
                </button>
            </view>

            <view class="orderlists" v-if="!ispackUp">
                <view class="flex">
                    <view style="color: #666666">订单编号：</view>
                    <view class="orderlists_or">{{orderDetails.oNumber}}</view>
                    <view class="copy" @click="copy" style="height: 39rpx">复制</view>
                </view>
                <view v-if="orderDetails.oTime">
                    <text>
                        下单时间：
                    </text>
                    <text>
                        {{orderDetails.oTime}}
                    </text>
                </view>
                <view v-if="orderDetails.oPaytime">
                    <text>
                        支付时间：
                    </text>
                    <text>
                        {{orderDetails.oPaytime}}
                    </text>
                </view>
                <view v-if="orderDetails.oType != '1'">
                    <text>
                        支付方式：
                    </text>
                    <text>
                        {{orderDetails.oPaytype == '1'?'微信支付':'支付宝支付'}}
                    </text>
                </view>
                <view v-if="orderDetails.oTaketime">
                    <text>
                        收货时间：
                    </text>
                    <text>
                        {{orderDetails.oTaketime}}
                    </text>
                </view>
                <view  v-if="orderDetails.lName">
                    <text>
                        配送方式：
                    </text>
                    <text>
                        {{orderDetails.lName}}
                    </text>
                </view>
            </view>
            <view class="money" v-if="!ispackUp">
                <view class="space-between">
                    <view>商品金额</view>
                    <view>￥{{orderDetails.oPrice}}</view>
                </view>
                <view class="space-between">
                    <view>运费</view>
                    <view>+ ￥{{orderDetails.pFreight ? orderDetails.pFreight : '0.00'}}</view>
                </view>
                <view class="money_shi">
                    <view class="money_shi_tx">实付款：</view>
                    <view class="money_shi_mon">
                        <text>¥</text>
                        {{orderDetails.oPrice}}
                    </view>
                </view>
                <view class="packup" @click="packup">
                    <view>
                        收起
                        <img src="../../../static/arrow_bottom.png" alt="">
                    </view>

                </view>
            </view>
            <view class="up" v-if="ispackUp">
                <view class="space-between">
                    <view>
                        <text class="up_di">订单编号：</text>
                        <text class="up_nu">
                            {{orderDetails.oNumber}}
                        </text>
                        <text class="copy" @click="copy">复制</text>
                    </view>
                    <view class="up_mon">实付款：
                        <text>
                            ￥ <text> {{orderDetails.oPrice}}</text>
                        </text>
                    </view>
                </view>
                <view class="packup" @click="packup">
                    <view>
                        展开完整信息
                        <img src="../../../static/arrow_bottom.png" alt="">
                    </view>

                </view>
            </view>
        </view>
        <view class="choose ov">
            <button class="red operbtn" v-if="orderDetails.oType==5" @click="confirmGoods('14')">确认收货</button>
            <button class="gray operbtn" v-if="orderDetails.oType==5" @click="delaygoods">延长收货</button>
            <button class="red operbtn" v-if="orderDetails.oType==1" @click.stop="topay(orderDetails)">立即付款</button>
            <button class="red operbtn" v-if="orderDetails.oType==6 || orderDetails.oType==4"  @click="toNextPage('class/submitOrder')">再次购买</button>
            <button class="gray operbtn" v-if="orderDetails.oType == 14" @click="toNextPage('class/next/toComment?type=1')">评价订单</button>

            <button class="gray operbtn" v-if="orderDetails.oType == 3" @click="confirmGoods('9')">取消退款</button>
            <button class="gray operbtn" v-if="orderDetails.oType == 1" @click="confirmGoods('7')">取消订单</button>
            <button class="gray operbtn" v-if="orderDetails.oType == 6||orderDetails.oType == 7||orderDetails.oType == 9||orderDetails.oType == 4" @click="confirmGoods('8')">删除订单</button>
            <button class="gray operbtn" v-if="orderDetails.oType==2" @click="orderShipment()">提醒发货</button>
            <button class="gray operbtn" v-if="orderDetails.oType==10" @click="cancelreplace">取消换货</button>
            <button class="gray operbtn" v-if="orderDetails.oType == 6&&orderDetails.additional == 1" @click="toNextPage('class/next/toComment?type=2')">追加评价</button>
<!--            <button class="gray operbtn" v-if="orderDetails.oType==2" @click="confirmGoods('3')">申请退款</button>-->
        </view>
    </view>
</template>

<script>
    export default {
        name: "orderDetails",
        data(){
            return{
                ispackUp:true,
                orderDetails:'',
                cuurierdetails:'',
                productDetails:''
            }
        },
        onShow(){
            // this.orderDetails = global.orderDetails
            this.getOrderDetails()
        },
        methods:{
            async delaygoods(){
                let res = await this.$api.delaygoods({
                    oNumber:this.orderDetails.oNumber,
                })
                if(res.data.code == 200){
                    global.showToast('延长收货成功')
                }else {
                    global.showToast(res.data.msg)
                }
            },
            async orderShipment(item){
                let res = await this.$api.orderShipment({
                    ordernum:this.orderDetails.oNumber,
                })
                var that = this
                if(res.data.code == 200){
                    global.showToast('提醒发货成功')
                    setTimeout(()=>{
                        that.getselorder()
                    },1000)

                }else {
                    global.showToast('系统繁忙，请稍后再试')
                }
            },
            todetails(){
              uni.navigateTo({
                  url:'/pages/class/goodsDetails?pid='+this.orderDetails.pId
              })
            },
            async topay(item){
                let res = await this.$api.toPay({
                    oNumber:this.orderDetails.oNumber
                })

                if(res.data.code == 200){
                    wx.requestPayment({
                        timeStamp : res.data.data.timeStamp,
                        nonceStr : res.data.data.nonceStr,
                        package : 'prepay_id='+res.data.data.package,
                        signType : 'MD5',
                        paySign  : res.data.data.paySign,
                        success:function(res){
                            global.showToast('支付成功')
                            this.getOrderDetails()
                        },
                        fail:function (res) {
                            global.showToast('支付失败')
                        }
                    })
                }else {
                    global.showToast(res.data.msg)
                }

            },
            toCurier(){
              if(this.orderDetails.oType == '1'){
                  return
              }  else {
                  uni.navigateTo({
                      url:'/pages/mine/nextPage/courier'
                  })
                  global.orderCurier = this.orderDetails
              }
            },
            async cancelreplace(){
                let res = await this.$api.cancelreplace({
                    eId:this.orderDetails.eId,
                    eType:6,
                    oNumber:this.orderDetails.oNumber,
                })
                if(res.data.code == 200){
                    global.showToast('取消换货成功')
                    setTimeout(()=>{
                        this.getOrderDetails()
                    },2000)
                }
            },
            async confirmGoods(num){
                let res = await this.$api.updateOrderOtype({
                    oNumber:this.orderDetails.oNumber,
                    oType:num
                })
                if(res.data.code == 200){
                    global.showToast(global.showToast(global.ordert(num)))
                    if(num == 8){
                        setTimeout(()=>{
                            wx.navigateBack({   //然后返回上一个页面
                                delta: 1
                            })
                        },2000)
                    }else {
                        setTimeout(()=>{
                            this.getOrderDetails()
                        },2000)
                    }
                }else {
                    global.showToast('系统繁忙，请稍后再试')
                }
            },
            packup(){
                this.ispackUp = !this.ispackUp
            },
            toNextPage(url,sale){
                if(sale){
                    if(this.orderDetails.afterSale == 2){
                        global.showToast('无法申请售后')
                        return
                    }
                }
                uni.navigateTo({
                    url:'/pages/'+url
                })
                this.orderDetails.totalmoney = this.orderDetails.oPrice
                this.orderDetails.list = this.productDetails
                global.detailShop = this.orderDetails
                global.orderDetails = this.orderDetails
                uni.setStorageSync('orderDetails',this.orderDetails)
                global.isfa = 1
            },
            async getOrderDetails(){

                let res = await this.$api.getOrderDetails({
                  oId:global.orderDetails.oId
                })
                if(res.data.code == 200){
                    this.orderDetails = res.data.OrderDetails
                    this.productDetails = res.data.productDetails
                    if(this.orderDetails.loId){
                        this.queryWlInfo()
                    }

                }
            },
            async queryWlInfo(){
                let res = await this.$api.queryWlInfo({
                    lnumber:this.orderDetails.loId
                })
                if(res.statusCode == 200){
                    if(res.data.list.length>0){
                        this.cuurierdetails = res.data.list[0]
                        global.curier = null
                    }else {
                        this.cuurierdetails = {
                            status:'包裹正在等待揽收',
                            time:this.orderDetails.oPaytime
                        }
                        global.curier={
                            lName:this.orderDetails.lName,
                            lPhone:this.orderDetails.lPhone,
                            oPaytime:this.orderDetails.oPaytime,
                        }
                    }

                }
            },
            copy(){
                var that = this
                wx.setClipboardData({
                    data: that.orderDetails.oNumber,
                    success: function (res) {
                        global.showToast('复制成功')
                    }
                });
            },

        }
    }
</script>

<style scoped lang="scss">
    .up{
        font-size: 23upx;
        &_di{
            color: #666666;
        }
        &_nu{
            display: inline-block;
            width: 200upx;
            overflow: hidden;
            position: relative;
            top: 0upx;
            /*word-wrap: ;*/
            text-overflow: ellipsis;
            color: #000000;
        }
        .packup{
            margin-top: 60upx;
        }
        &_mon{
            color: #030d18;
            font-size: 23upx;
            text{
                font-size:28upx;
                color: #f61e45;
                font-weight: bold;

            }
        }
    }
    .right {
        width: 13upx;
        height: 22upx;
    }

    .back {
        width: 100%;
        height: 180upx;
        background: #F61E45;
        font-size: 34upx;
        font-weight: bold;
        text-align: center;
        color: white;
        position: fixed;
        top: 0upx;
        z-index: -1;
        img {
            width: 33upx;
            height: 33upx;
            margin-right: 9upx;
            position: relative;
            top: 3upx;
        }
    }

    .details {
        margin-top: 80upx;
        z-index: 999;
        color: #333333;
        font-size: 26upx;
        padding-bottom: 110upx;
        > view {
            background: white;
            box-shadow: 0px 3upx 8upx 0px rgba(0, 0, 0, 0.08);
            border-radius: 20upx;
            padding: 40upx;
            margin-bottom: 20upx;
        }
    }

    .courier {

        &_icon {
            width: 37upx;
            height: 27upx;
            position: relative;
            top: 7upx;
            margin-right: 20upx;
        }

        &_txt {
            width: 565upx;
            margin-left: 19upx;
        }
    }

    .address {
        &_icon {
            width: 29upx;
            height: 23upx;
            position: relative;
            top: 7upx;
            margin-right: 22upx;
        }

        &_name {
            font-weight: bold;
            margin-bottom: 29upx;
        }

        &_addr {
            color: #666666;
        }
    }
    .name {
        font-weight: bold;
        margin-bottom: 29upx;
    }

    .addr {
        color: #666666;
    }

    .goods {
        &_img {
            width: 145upx;
            height: 145upx;
            margin-right: 40upx;
        }

        &_num {
            color: #999999;
            font-size: 22upx;
            margin-top: 20upx;
            margin-bottom: 33upx;
        }

        &_money {
            color: #f61e45;
            font-weight: bold;
            font-size: 36upx;

            text {
                font-size: 20upx;
            }
        }

        &_mes {
           padding-bottom: 30upx;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            padding-top: 30upx;
        }
        &_mes:first-child{
            padding-top: 0upx;
        }
        &_mes:last-child{
            padding-bottom: 0upx;
            border-bottom: none;
        }

        &_tui {
            color: #666666;
            font-weight: bold;
            margin-bottom: 30upx;
        }

        &_yun {
            font-size: 24upx;
            font-weight: 300;
            color: #666666;

            img {
                margin-left: 9upx;
                top: 7upx;
            }
        }
    }

    .contact {
        font-size: 24upx;
        text-align: center;
        background: white;
        img {
            width: 23upx;
            height: 23upx;
            margin-right: 10upx;
            position: relative;
            top: 3upx;
        }

    }
    .copy {
        display: inline-block;
        color: #333333;
        font-size: 20upx;
        padding: 5upx 10upx;
        /*height: 39upx;*/
        background: #eeeeee;
        border-radius: 14upx;
        margin-left: 31upx;
    }
    .orderlists {
        > view {
            margin-bottom: 28upx;

            > text:first-child {
                color: #666666;
            }

            > text:last-child {
                color: #000000;
            }


        }
        &_or{
            display: inline-block;
            width: 450rpx;
            word-wrap: break-word;
        }
    }

    .money {
        > view {
            margin-top: 30upx;
            >view:first-child{
                color: #030d18;
            }
            >view:last-child{
                font-size: 30upx;
                font-weight: bold;
            }
        }
        &_shi{
            display: flex;
            justify-content:flex-end;
            &_mon{
                color: #f61e45;
                font-size: 40upx !important;
                text{
                    font-size: 22upx;
                }
            }
            &_tx{
                position: relative;
                top: 14upx;
            }
        }
    }
    .packup{

        display: flex;
        justify-content: space-around;
        >view{
            color: #666666 !important;
            font-size: 26upx !important;
            font-weight: 300 !important;
            padding: 0upx 20upx;
            border:1px solid rgba(0,0,0,0.1);
            border-radius:30upx;
            line-height: 40upx;
            /*margin: 0 auto;*/
        }
        img{
            width: 16upx;
            height: 8upx;
            margin-left: 8upx;
            position: relative;
            top: -4upx;
        }
    }
    .choose{
        width: 100%;
        position: fixed;
        bottom: 0upx;
        padding: 30upx 40upx;
        padding-bottom:calc(30rpx + env(safe-area-inset-bottom));
        background: white;
        box-shadow:0px 0px 46upx 0px rgba(67,67,67,0.07);
        button{

        }


    }
    button:after{
        border: none;
    }
    .operbtn{
        float: right;
        height: 50upx;
        /*width: 150upx;*/
        /*padding: 10upx 20upx;*/
        padding: 0upx 20upx;
        border-radius:20upx 0px 20upx 0px;
        font-size: 26upx;
        box-sizing: border-box;
        line-height: 50upx;
        margin-left: 19upx;
    }
    .gray{
        border: 1px solid #c4c4c4;
        color: #999999;
        background: white;
    }
    .red{
        background:linear-gradient(-30deg,rgba(246,30,69,1),rgba(253,68,95,1));
        /*box-shadow:0px 2px 25px 0px rgba(251,88,103,0.46);*/
        color: white;
    }
</style>