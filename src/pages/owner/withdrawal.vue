<template>
    <view class="margin40 wrap">
        <view class="wrap_tip">
            提现到{{type == '2' ? '微信' : '支付宝'}}零钱
        </view>
        <view class="wrap_con">
            <view>提现金额</view>
            <view class="wrap_mon flex">
                <text>¥</text>
                <input type="digit" v-model="money" placeholder="最低可提现1元" placeholder-style="font-weight:400;font-size:24rpx">
            </view>
            <view class="wrap_to">
                零钱余额￥{{withdraw}}，
                <text @click="all">全部提现</text>
            </view>
        </view>
        <view class="fen" v-if="type == '1'"></view>
        <view class="alipay" v-if="type == '1'">
<!--            <view>-->
                <view class="alipay_t">请输入您的真实姓名及支付宝账号</view>
                <view class="alipay_i flex">
                    <text>真实姓名</text>
                    <input type="text" placeholder="请输入您的姓名"  v-model="accountpayeename">
                </view>
                <view class="alipay_i flex">
                    <text>支付宝账号</text>
                    <input type="text" placeholder="请输入您的支付宝账号" v-model="accountpayee">
                </view>
<!--            </view>-->
        </view>
        <view class="buttonwr">
            <button :class="money ? 'button' : 'default'" @click="ok">提现</button>
        </view>
    </view>
</template>

<script>
    export default {
        name: "withdrawal",
        data(){
            return{
                money:'',
                withdraw:'',
                type:'1',
                accountpayee:'',
                accountpayeename:''
            }
        },
        onLoad(options){
            this.type = options.type
        },
        onShow(){
            var withdraw = uni.getStorageSync('withdraw')
            this.withdraw = withdraw.toFixed(2)
        },
        methods:{
            async ok(){
                if(!this.money){
                    return;
                }
                if(this.money < 100){
                    global.showToast('最低不可低于1元')
                    return
                }
                if(this.money > this.withdraw){
                    global.showToast('输入金额超过零钱余额')
                    return
                }
                if(this.type == '2'){
                    if(!global.isEmpty(this.accountpayeename)){
                        global.showToast('请输入真实姓名')
                        return
                    }
                    if(!global.isEmpty(this.accountpayee)){
                        global.showToast('请输入支付宝账号')
                        return
                    }

                }
                let res = await this.$api.inswithdraw({
                    mMoney:this.money,
                    channel:'1',
                    mManner:this.type,
                    accountpayee:this.accountpayee,
                    accountpayeename:this.accountpayeename
                })
                if(res.data.code == 200){
                    global.showToast('申请提现成功')
                    setTimeout(()=>{
                        wx.navigateBack({
                            delta:1
                        })
                    },2000)
                }
            },
            all(){
                this.money = this.withdraw
            }
        }
    }
</script>

<style scoped lang="scss">
    .place{
        font-size: 26upx;
        font-weight: 500;
    }
    .fen{
        height: 8upx;
        background: #f4f4f4;
    }
    .wrap{
        margin-top: 20upx;
        font-size: 28upx;
        overflow: hidden;
        background: white;
        border-radius: 20rpx;
        box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.08);
        &_tip{
            padding: 40upx;
            background: #e3e2e2;
            /*border-radius: 20upx 20upx 0upx 0upx;*/
        }
        &_con{
            box-shadow: none;
            padding: 40upx;
        }
        &_mon{
            margin-top: 36upx;
            margin-bottom: 40upx;
            padding-bottom: 10upx;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            font-size: 58upx;
            font-weight: bold;
            text{

                margin-right: 10upx;
            }
            input{
                height: 83upx;
            }
        }
        &_to{
            font-size: 24upx;
            color: #999999;
            font-weight: 400;
            /*margin-bottom: 58upx;*/
            text{
                color: #1199FC;
            }
        }

    }
    .default{
        background:rgba(242,242,242,1);
        color: #999999;
        box-shadow: none;
        border-radius:20upx 0px 20upx 0px;
    }
    .alipay{
        padding-left: 40upx;
        padding-right: 40upx;
        &_t{
            color: #ff0000;
            font-size:24upx
        }
        >view{
            padding-top: 40upx;
            padding-bottom: 40upx;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            >text{
                display: inline-block;
                font-size: 28upx;
                color: #666666;
                width: 180upx;
            }
        }
        >view:last-child{
            border-bottom: none;
        }
        /*border-radiu
        s: ;*/

    }
    .buttonwr{
        padding: 40upx;
    }

</style>