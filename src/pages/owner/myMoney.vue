<template>
    <view class="wrap">
        <img src="../../static/myMoney.png" alt="">
        <view class="wrap_t">账户余额</view>
        <view class="wrap_m">
            <text>¥</text>
            {{withdraw}}
        </view>
<!--        <view>-->
<!--            <button class="button" @click="tomoney(2)">提现到微信</button>-->
        <button class="button" @click="tomoney(1)">提现到支付宝</button>
<!--        </view>-->
    </view>
</template>

<script>
    export default {
        name: "myMoney",
        data(){
            return{
                withdraw:''
            }
        },
        onShow(){
            var withdraw = uni.getStorageSync('withdraw')
            this.withdraw = withdraw.toFixed(2)
        },
        methods:{
            tomoney(num){
                uni.navigateTo({
                    url:'/pages/owner/withdrawal?type='+num
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .wrap{
        text-align: center;
        padding-top: 144upx;
        button{
            width: 368upx;
            margin-bottom: 40upx;
        }
        img{
            width: 102upx;
            height: 102upx;
        }
        &_t{
            color: #333333;
            margin-top: 90upx;
            margin-bottom: 60upx;
            font-size: 32upx;
        }
        &_m{
            color: #000000;
            font-size: 84upx;
            margin-bottom: 235upx;
            font-weight: bold;
            text{
                font-size: 54upx;
                padding-right: 5upx;
            }
        }
    }

</style>