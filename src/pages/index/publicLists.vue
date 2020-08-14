<template>
<!--    <goods-lists :goods="lists"></goods-lists>-->
    <view class="wrap">
        <img :src="backimg" alt="" class="backimg">
        <view class="content">
            <view class="yhq">
                <img src="https://bj-yys.oss-cn-beijing.aliyuncs.com/yihuo/kuang.png" alt="">
                <view>
                    <view class="yhq_yh space-between">
                        <view v-for="item in 3">
                            <view class="flex yhq_yhs">
                                <view class="yhq_yh_f">¥</view>
                                <view class="flex">
                                    <view class="yhq_yh_m">20</view>
                                    <view class="yhq_yh_w">
                                        <view class="yhq_yh_t">优惠券</view>
                                        <view class="yhq_yh_s">
                                            满212使用
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="yhq_yh_b">
                                <view class="yhbtn">点击领取</view>
                            </view>
                        </view>
                    </view>
                    <view class="huodong">
                        <view class="space-around huodong_t">
                            <view>6月1日 00:00:00-6月18日 23:59:59</view>
                            <view>6月10日 00:00:00-6月18日 23:59:59</view>
                            <view>6月18日 00:00:00-6月21日 23:59:59</view>
                        </view>
                        <img src="../../static/line.png" alt="">
                        <view class="space-around">
                            <view class="yhbtn huodong_g">提前加入购物车</view>
                            <view class="yhbtn huodong_y">预付定金</view>
                            <view class="yhbtn huodong_y">支付尾款抢购</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="title">
                <img src="../../static/xctitle.png" alt="" class="title_l">
                <text>好货需要抢 镇店之宝</text>
                <img src="../../static/xctitle.png" alt="" class="title_r">
            </view>
            <view class="lists">
                <view class="" v-for="item in lists" @click="todetails(item)">
                    <view class="flex" >
                        <view>
                            <view class="lists_n">{{item.pName}}</view>
                            <view class="lists_c">
                                {{item.pIntroduce}}
                            </view>
                            <view class="lists_s">
                                <img src="../../static/xcstar.png" alt="" v-for="item in item.pGrade">
                                <img src="../../static/xcstar.png" alt="" v-for="item in 5-item.pGrade" style="opacity: 0.5">
                            </view>
                            <view class="lists_p">
                                <img src="../../static/xcprice.png" alt="">
                                <view class="lists_p_c flex">
                                    ¥  {{item.pPrice}}
                                    <view>
                                        立即抢购
                                    </view>
                                </view>
                            </view>

                        </view>
                        <img :src="item.pCover" alt="" class="lists_img">
                    </view>
                </view>

            </view>
        </view>
    </view>

</template>

<script>
    import goodsLists from "../comp/goodsLists";
    export default {
        name: "publicLists",
        components:{goodsLists},
        data(){
            return{
                lists:[],
                backimg:''
            }
        },
        onLoad(){
          this.selAdvertiseProductDetailsAll()
            global.company = 'fenzhong'
        },
        methods:{
            async selAdvertiseProductDetailsAll(){
                let res = await this.$api.selAdvertiseProductDetailsAll({})
                if(res.data.code == 200){
                    res.data.ProductDetails.forEach((a,b)=>{
                        a.pGrade = Math.round(a.pGrade)
                    })
                    this.lists = res.data.ProductDetails
                    this.backimg = res.data.ProductDetails[0].propagandizePic
                }
            },
            todetails(item){
              uni.navigateTo({
                  url:`/pages/class/goodsDetails?pid=${item.pid}`
              })
            },
        }

    }
</script>

<style scoped lang="scss">
    .wrap{
        background: red !important;
    }
    .backimg{
        width: 100%;
        height: 2857rpx;
        position: absolute;
        top: 0rpx;
    }
    .content{
        /*position: absolute;*/
        /*top: 687rpx;*/
        margin-top: 687upx;
        width: 100%;
        z-index:999;
        padding-bottom: 30upx;
    }
    .yhbtn{
        width:91upx;
        /*padding: 3rpx 20rpx;*/
        height:20upx;
        line-height: 20upx;
        background:linear-gradient(0deg,rgba(168,10,14,1),rgba(220,48,44,1),rgba(170,12,16,1));
        box-shadow:1px 5upx 5upx 0px rgba(255,191,102,0.75);
        border-radius:10upx;
        color: white;
        font-size: 13rpx;
        text-align: center;
        margin: 0 auto;
    }

    .yhq{
        width: 669rpx;
        margin: 0 auto;
        position: relative;
        >img{
            width: 669rpx;
            height: 362rpx;
        }
        >view{
            position: absolute;
            top: 84upx;
            width: 100%;
            /*left: 34upx;*/
        }
        &_yhs{
            /*height: 46upx;*/
        }
        &_yh{
            width: 100%;
            padding: 0rpx 34rpx;
            >view{
                /*width:185upx;*/
                height:98upx;
                padding: 5rpx 6rpx;
                background:rgba(255,248,240,1);
                border:4px solid rgba(249,44,58,1);
                border-radius:20upx;
                color:rgba(118,18,18,1);
                position: relative;
            }
            &_f{
                font-size: 18upx;
                font-style:italic;

                font-weight: 300;
                margin-right: 3rpx;
                position: relative;
                top: -5upx;
            }
            &_m{
                font-size:61rpx;
                font-weight:800;
                text-shadow:1px 5upx 5upx rgba(255,191,102,0.75);

                background:linear-gradient(0deg,rgba(182,22,38,1) 0%, rgba(255,80,98,1) 53.1005859375%, rgba(184,22,38,1) 100%);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
                position: relative;
                top:-17upx
            }
            &_t{
                font-size:27rpx;
                font-weight:500;
            }
            &_s{
                font-size:17rpx;
            }
            &_b{
                position: absolute;
                bottom: 3upx;
                width: 100%;
            }
            &_w{
                position: relative;
                top: -5upx;
            }
            .yhbtn{

            }

        }
    }
    .huodong{
        width:594upx;
        height:110upx;
        background:rgba(255,247,240,1);
        border:3upx solid #F92C3A;
        border-radius:20upx;
        margin: 0 auto;
        margin-top: 17upx;
        padding-top: 19upx;
        text-align: center;
        >img{
            width: 550upx;
            height: 19upx;
            margin-top: 10upx;
        }
        &_t{
            font-size:10upx;
            color: #623B00;
        }
        >view{
            width:550upx;
            margin: 0 auto;
        }
        &_g{
            width: 156upx;
        }
        &_y{
            width: 106upx;
        }
    }
    .title{
        position: relative;
        text-align: center;
        margin-bottom: 30upx;
        width: 100%;
        font-size:34upx;
        font-weight:bold;
        color:rgba(249,140,106,1);
        text-shadow:1upx 10upx 5upx rgba(88,167,185,0.3);

        background:linear-gradient(180deg,rgba(252,241,230,1) 0%, rgba(246,210,172,1) 100%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        img{
            width: 80upx;
            height: 39upx;
            position: relative;
            top: 16upx;
        }
        &_l{
            padding-right: 15upx;
        }
        &_r{
            padding-left: 15upx;
        }
    }
    .lists{
        width: 658upx;
        margin: 0 auto;
        position: relative;

        &_img{
            width: 253upx;
            height: 218upx
        }
        >view{
            width:658upx;
            /*height:303upx;*/
            background:rgba(170,18,34,1);
            box-shadow:1px 23upx 21upx 0px rgba(104,0,13,0.4);
            padding-top: 9upx;
            border-radius:20upx;
            margin-bottom: 34upx;
            >view{
                width:658upx;
                /*height:294upx;*/
                background:linear-gradient(0deg,rgba(247,214,180,1),rgba(252,241,230,1));
                border-radius:40upx;
                padding: 35upx;
                padding-bottom: 0upx;
            }
        }
        &_n{
            font-size:33upx;
            font-weight:bold;
            color:rgba(179,13,11,1);
            margin-bottom: 20upx;
            width: 264upx;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap
        }
        &_c{
            font-size:27upx;
            color:rgba(126,101,106,1);
            width: 273upx;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap

        }
        &_s{
            width: 211upx;
            padding: 6upx 21upx;
            background:rgba(186,16,16,1);
            border-radius: 20upx;
            margin-top: 16upx;
            margin-bottom: 15upx;
            margin-left: 13upx;
            img{
                width: 27upx;
                height: 27upx;
                margin-right: 10upx;
                position: relative;
                top: 3upx;
            }
            img:last-child{
                margin-right: 0upx;
            }
        }
        &_p{
            position: relative;
            left: -62upx;
            >img{
                width: 337upx;
                height: 105upx;
            }
            &_c{
                position: absolute;
                top: 0upx;
                left: 40upx;
                font-size:55upx;
                font-weight: bold;
                color: white;
                >view{
                    width:136upx;
                    height:33upx;
                    background:linear-gradient(0deg,rgba(255,238,194,1),rgba(255,255,255,1));
                    font-size:20upx;
                    color:rgba(242,76,76,1);
                    text-align: center;
                    line-height: 33upx;
                    margin-left: 20upx;
                    border-radius: 20upx;
                    margin-top: 23upx;
                }
            }
        }
    }
</style>