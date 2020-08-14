<template>
    <view>
        <view class="areaLi goods space-between">
            <img :src="orderDetails.pCover" alt="">
            <view class="goods_c">
                <view class="goods_c_t">
                    {{orderDetails.pName}}
                </view>
                <view class="flex goods_m">
                    <view>单价：<text>¥ {{orderDetails.pPrice}}</text></view>
                    <view>购买数量：<text>{{orderDetails.pNum}}</text></view>
                </view>
            </view>
        </view>
        <view class="areaLi lists">
            <view class="space-between" @click="toNextPage('/pages/mine/nextPage/refund')">
                <view class="lists_t">
                    <img src="../../../static/goodsdetails/refund.png" alt="" class="lists_i">
                    退款
                </view>
                <view class="lists_r">
                    <img src="../../../static/arrow_right.png" alt="" class="arrow" >
                </view>
            </view>
            <view  class="space-between" @click="toNextPage('/pages/class/next/toExchange')" v-if="orderDetails.oType!=2">
                <view class="lists_t">
                    <img src="../../../static/goodsdetails/huanhuo.png" alt="" class="lists_i">
                    换货
                </view>
                <view class="lists_r">
                    <view>
                        <text>更换收到的商品</text>
                        <img src="../../../static/arrow_right.png" alt="" class="arrow">
                    </view>

                </view>
            </view>
        </view>
        <view class="tips" @click="toNextPage('/pages/instructions/returnInstrc')">退换货说明</view>
    </view>
</template>

<script>
    export default {
        name: "chooseAfterType",
        data(){
            return{
                orderDetails:''
            }
        },
        onShow(){
            var orderDetails = uni.getStorageSync('orderDetails')
            this.orderDetails = orderDetails
        },
        methods:{
            toNextPage(url){
                uni.navigateTo({
                    url:url
                })
                global.isfa = 2
            }

        }
    }
</script>

<style scoped lang="scss">
    .goods{
        border-radius: 0upx 20upx;
        img{
            width: 120upx;
            height: 120upx;
        }
        &_c{
            width: 520upx;
            &_t{
                color: #666666;
                font-size: 22upx;
                margin-bottom: 29upx;
            }
        }
        &_m{
            font-size: 20upx;
            color: #999999;
            >view{
                margin-right: 19upx;
            }
            text{
                font-size: 22upx;
                color: #333333;
                font-weight: bold;
            }
        }
    }
    .lists{
        &_i{
            width: 40upx;
            height: 38upx;
            margin-right: 16upx;
            position: relative;
            top: 7upx;
        }
        .arrow{
            width: 13upx;
            height: 22upx;
            position: relative;
            top: 5upx;
        }
        &_t{
            font-size: 32upx;
            color: #333333;
            font-weight: bold;
        }
        text{
            color: #999999;
            padding-right: 9upx;
        }
        >view:first-child{
            padding-bottom: 40upx;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        >view:last-child{
            padding-top: 40upx;
            border-bottom: none;
        }
        &_r{
            display: flex;
            align-items: center;
        }
    }
    .tips{
        font-size: 28upx;
        color: #1199FC;
        text-align: center;
        margin-top: 100upx;
    }
</style>