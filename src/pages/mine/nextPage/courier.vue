<template>
    <view>
        <view class="areaLi curMess">
            <view>
                <text>运单号：</text>
                <text>{{cuurierdetails.number}}</text>
                <text class="copy" @click="copy">复制</text>
            </view>
            <view>
                <text>国内承运人：</text>
                <text>{{cuurierdetails.expName?cuurierdetails.expName:curier.lName}}</text>
            </view>
            <view>
                <text>国内承运人电话：</text>
                <text class="call" @click="call">{{cuurierdetails.expPhone?cuurierdetails.expPhone:curier.lPhone}}</text>
            </view>
        </view>
        <view class="areaLi">
            <view class="process">
                <view class="flex process_k" v-for="(item,index) in cuurierdetails.list">
                    <img src="../../../static/curfinish.png" alt="" :class="index==0?'bigimg':'smallimg'" v-if="item.isqian">
                    <img :src="index == 0 ? '../../../static/curzhong_has.png' : '../../../static/curzhong.png'" alt="" :class="index==0?'bigimg':'smallimg'" v-if="!item.isqian&&!item.islan&&index!=cuurierdetails.list.length-1">
                    <img :src="index == 0 ? '../../../static/curlanshou_has.png' : '../../../static/curlanshou.png'" alt="" :class="index==0?'bigimg':'smallimg'" v-if="item.islan">
                    <img :src="index == 0 ? '../../../static/curxiadan_has.png' : '../../../static/curxiadan.png'"  alt="" :class="index==0?'bigimg':'smallimg'" v-if="index==cuurierdetails.list.length-1 && !item.islan">
                    <view class="process_con">
                        <view class="process_now" v-if="item.isqian">已签收</view>
                        <view class="process_now" v-if="item.islan">已揽收</view>
                        <view class="process_now" v-if="index==cuurierdetails.list.length-1 && !item.islan">已下单</view>
                        <view class="process_now" v-if="!item.isqian&&!item.islan&&index!=cuurierdetails.list.length-1">运输中</view>
                        <view :class="index==0?'process_o':'process_n'">
                            {{item.status}}
                            <view class="process_time">
                                {{item.time}}
                            </view>
                        </view>
                    </view>
                </view>
                <view class="flex process_k" v-if="cuurierdetails.list.length==0">
                    <img src="../../../static/curlanshou_has.png" alt="" class="bigimg" >
                    <view class="process_con">
                        <view class="process_n">
                            包裹正在等待揽收
                            <view class="process_time">
                                {{curier.oPaytime}}
                            </view>
                        </view>
                    </view>

                </view>
            </view>
        </view>
        <view class="di">到底了～</view>
    </view>
</template>

<script>
    export default {
        name: "courier",
        data(){
          return{
              cuurierdetails:'',
              curier:''
          }
        },
        onShow(){

            this.queryWlInfo()
            this.curier = global.curier

        },
        methods:{
            async queryWlInfo(){
                let res = await this.$api.queryWlInfo({
                    lnumber:global.orderCurier.loId
                })
                if(res.statusCode == 200){
                    this.cuurierdetails = res.data
                    res.data.list.forEach((a,b)=>{
                        if(a.status.indexOf('签收')!=-1){
                            a.isqian = true
                        }else {
                            a.isqian = false
                        }
                        if(a.status.indexOf('揽件')!=-1 || a.status.indexOf('收件')!=-1){
                            a.islan = true
                        }else {
                            a.islan = false
                        }
                    })
                }
            },
            call(){
                var that = this
                wx.makePhoneCall({

                    phoneNumber: that.cuurierdetails.expPhone,

                })
            },
            copy(){
                var that = this
                wx.setClipboardData({
                    data: that.cuurierdetails.number,
                    success: function (res) {
                        global.showToast('复制成功')
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .copy {
        display: inline-block;
        color: #333333;
        font-size: 20upx;
        padding: 5upx 10upx;
        background: #eeeeee;
        border-radius: 14upx;
        margin-left: 31upx;
    }
    .curMess{
        font-size: 26upx;
        >view{
            margin-bottom: 28upx;
            >text:first-child{
                color: #666666;
            }
            >text:last-child{
                color: #000000;
            }
            >.call{
                color: #4697F5 !important;
            }
        }

    }
    .smallimg{
        width: 32upx;
        height: 32upx;
        position: absolute;
        left: -16upx;
        top: 3upx;
        border-radius: 50%;
    }
    .bigimg{
        width: 44upx;
        height: 44upx;
        position: absolute;
        left: -22upx;
        top: 0upx;
        border-radius: 50%;
    }
    .process{
        padding-left: 22upx;
        font-size: 28upx;
        &_now{
            color: #333333;
            font-weight: bold;
            margin-bottom: 32upx;
        }
        &_time{
            font-size: 22upx;
            color: #666666;
            margin-top: 20upx;
        }
        &_con{
            width: 600upx;
            margin-left: 43upx;
        }
        &_k{
            border-left: 1px solid #cbcbcb;
            position: relative;
            padding-bottom: 60upx;
        }
        &_k:last-child{
            border-left: none;
            padding-bottom: 0upx;
        }
        &_n{
            color: #999999;
            font-weight: 300;
        }
        &_o{
            color: #333333;
            font-weight: 300;
        }
    }
    .di{
        font-size: 22upx;
        text-align: center;
        padding-top: 20upx;
        padding-bottom: 40upx;
        color: #999999;
    }
</style>