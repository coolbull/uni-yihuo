<template>
    <view>
        <view class="top">
            <img src="https://bj-yys.oss-cn-beijing.aliyuncs.com/yihuo/paihang.jpg" alt="" class="top_back">
            <view>
                <view  class="top_num" >
                    <img :src="top1.pCover" alt="" class="top_num_one" @click="todetails(top1)">
                    <img :src="top2.pCover" alt="" class="top_num_two" @click="todetails(top2)">
                    <img :src="top3.pCover" alt="" class="top_num_th" @click="todetails(top3)">
                </view>
                <view class="top_tx">
                    <view class="top_tx_two" @click="todetails(top2)">
                        <view class="top_tx_name">{{top2.pName}}</view>
                        <view>
                            <img src="../../static/money.png" alt="">
                            <text>{{top2.pGrade}}%</text>
                        </view>
                    </view>
                    <view  class="top_tx_one" @click="todetails(top1)">
                        <view  class="top_tx_name">{{top1.pName}}</view>
                        <view>
                            <img src="../../static/money.png" alt="">
                            <text>{{top1.pGrade}}%</text>
                        </view>
                    </view>
                    <view class="top_tx_th" @click="todetails(top3)">
                        <view class="top_tx_name">{{top3.pName}}</view>
                        <view>
                            <img src="../../static/money.png" alt="">
                            <text>{{top3.pGrade}}%</text>
                        </view>
                    </view>
                </view>
            </view>
            
        </view>
        <view class="content">
            <view class="space-between" v-for="(item,index) in list" @click="todetails(item)" v-if="item.pGrade!='0'">
                <view class="content_txt flex">
                    <view class="content_num">{{index+4}}</view>
                    <img :src="item.pCover" alt="" class="content_im">
                    <view class="content_tit">{{item.pName}}</view>
                </view>
                <view class="content_good">
                    <img src="../../static/star.png" alt="" class="content_st">
                    <text>好评率 {{item.pGrade}}%</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "userBestLists",
        data(){
            return{
                dataList:[],
                top1:'',
                top2:'',
                top3:'',
                list:[]
            }
        },
        onShow(){
            this.productDetailsPraiseAll()
        },
        methods:{
            async productDetailsPraiseAll(){
                let res = await this.$api.productDetailsPraiseAll({})
                if(res.data.code == 200){
                    res.data.productDetails.forEach((a,b)=>{
                        a.pGrade = Math.round(a.pGrade)
                    })
                    this.dataList = res.data.productDetails
                    this.top1= res.data.productDetails[0]
                    this.top2= res.data.productDetails[1]
                    this.top3= res.data.productDetails[2]
                    let arr = []
                    for(let i = 0; i<this.dataList.length;i++){
                        if(i>2){
                            arr.push(this.dataList[i])
                        }
                    }
                    this.list = arr
                }
            },
            todetails(item){
                uni.navigateTo({
                    url:'/pages/class/goodsDetails?pid=' + item.pid
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .top{
        position: relative;
        position: fixed;
        top: -120upx;
        &_back{
            width: 750upx;
            height: 1244upx;
            z-index: -1;

        }
        &_num{
            z-index: 2;
            &_one{
                width: 150upx;
                height: 150upx;
                border-radius: 50%;
                position: absolute;
                top: 165upx;
                left: 296upx;
            }
            &_two{
                width: 112upx;
                height: 112upx;
                border-radius: 50%;
                position: absolute;
                top: 282upx;
                left: 85upx;
            }
            &_th{
                width: 100upx;
                height: 100upx;
                border-radius: 50%;
                position: absolute;
                top: 337upx;
                right: 91upx;
            }
        }
        &_tx{
            width: 152upx;
            text-align: center;
            z-index: 2;
            &_name{
                background:rgba(254,158,174,0.5);
                border-radius:20upx;
                font-size:28upx;
                color:rgba(255,255,255,1);
                padding: 6upx 20upx;
                margin-bottom: 16upx;
                margin-right: 6upx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 152upx;
            }
            &_one{
                position: absolute;
                top: 375upx;
                left: 294upx;

                .top_tx_name{
                    background: rgba(246,108,130,0.5);
                }
            }
            &_two{
                position: absolute;
                top: 441upx;
                left: 71upx;
            }
            &_th{
                position: absolute;
                top: 474upx;
                left: 517upx;
            }
            img{
                width: 48upx;
                height: 38upx;
            }
            text{
                color: #ffffff;
                font-size: 26upx;
                position: relative;
                top: -15upx;
            }
        }
    }
    .content{
        border-radius: 30upx 30upx 0upx 0upx;
        width: 100%;
        background: white;
        padding: 30upx 40upx;
        position: absolute;
        top:490upx;
        min-height: 900upx;
        >view{
            padding: 20upx 0upx;
            border-bottom: 1px solid rgba(0,0,0,0.1);

        }
        >view:last-child{
            border: none;
        }
        &_im{
            width: 80upx;
            height: 80upx;
            border-radius: 50%;
            border: 1px solid #999999;
            margin-right: 39upx;
        }
        &_st{
            width: 25upx;
            height: 23upx;
        }
        &_txt{
            height: 80upx;
            line-height: 80upx;
        }
        &_num{
            color: #666666;
            margin-right: 40upx;
        }
        &_tit{
            color: #333333;
            font-size: 26upx;
            width: 270upx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        &_good{
            height: 80upx;
            line-height: 80upx;
            >text{
                color:rgba(246,30,69,1);
                font-size: 26upx;
                padding-left: 20upx;
                background:linear-gradient(0deg,rgba(252,202,1,1) 0%, rgba(249,159,0,1) 100%);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
            }
        }
    }
</style>