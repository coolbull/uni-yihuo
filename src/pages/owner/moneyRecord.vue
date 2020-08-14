<template>
    <view>
        <view  class="moneywrap">
            <view v-if="withdraws.length>0">
                <view class="space-between" v-for="item in withdraws">
                    <view class="flex">
                        <img :src="item.mManner == '1' ? '../../static/alipay.png':'../../static/weixin.png'" alt="">
                        <view class="moneywrap_tx">
                            <view class="moneywrap_tx_tip">
                                余额提现
                            </view>
                            <view>{{item.mManner == '1' ? '支付宝' : '微信'}}</view>
                            <view class="moneywrap_tx_time">{{item.mTime}}</view>
                        </view>
                    </view>

                    <view>
                        <view class="moneywrap_mon">¥ {{item.mMoney}}</view>
                        <view  class="moneywrap_tx_time">{{item.mType==1?'提现成功':'提现失败'}}</view>
                    </view>
                </view>
            </view>
        </view>

        <empty :prop="empty" v-if="withdraws.length==0"></empty>
    </view>
</template>

<script>
    import empty from "../comp/empty";
    export default {
        name: "moneyRecord",
        components:{empty},
        data(){
          return{
              withdraws:[],
              empty:'money'
          }
        },
        onShow(){
            this.selWithdrawAll()
        },
        methods:{
            async selWithdrawAll(){
                let res = await this.$api.selWithdrawAll({
                })
                if(res.data.code == 200){
                     this.withdraws = res.data.withdraws
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .moneywrap{
        >view{
            margin-top: 10upx;
            padding: 50upx 40upx 40upx 40upx;
            background: white;
            border-radius: 20upx;
            box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.08);
            color: #030d18;
        }

        img{
            width: 52upx;
            height: 52upx;
            margin-right: 21upx;
        }
        &_tx{
            >view{
                margin-bottom: 20upx;
            }
            >view:last-child{
                margin-bottom: 0upx;
            }

            &_tip{
                font-size: 26upx;
            }
            &_time{
                font-size: 20upx;
                color: #999999;
            }
        }
        &_mon{
            font-size: 30upx;
            font-weight: bold;
            margin-bottom: 60upx;
        }
        >view>view{
            padding-top: 30upx;
            padding-bottom: 30upx;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
    >view>view:last-child{
        padding-bottom: 0upx;
        border-bottom: none;
    }
        >view>view:first-child{
            padding-top: 0upx;
        }
    }

</style>