<template>
    <view>
        <view class="goods margin40 flex">
            <img :src="details.pCover" alt="">
            <view>{{details.pName}}</view>
        </view>
        <view class="margin40"  style="margin-bottom: 10rpx">
            <view class="answer ">
                <view class="flex answer_ques">
                    <img src="../../static/ask.png" alt="" class="ask">
                    <view>
                        <view class="answer_ques_is">{{lists.qQuestion}}</view>
                        <view class="answer_ques_ti">{{lists.qTime}}</view>
                    </view>
                </view>
                <view class="answer_tot">
                    <img src="../../static/answer.png" alt="" class="ask" style="top: 10rpx">
                    <text>共{{lists.questionsList.length}}条用户回答</text>
                </view>
                <view class="listwrap">
                    <view class="answerList" v-for="(item,index) in lists.questionsList">
                        <view class="flex">
                            <img :src="item.anonymous == '2' ? '../../static/goodsdetails/avactor.png' : item.uPic" alt="" class="avactor">
                            <view>
                                <view class="answerList_na">{{item.anonymous=='2'?'匿名用户':item.uName}}</view>
                                <view class="answerList_ti">{{item.qTime}}</view>
                            </view>
                        </view>
                        <view class="answerList_con">{{item.qAnswer}}</view>
                    </view>

                </view>

            </view>
        </view>

        <view class="toask space-between">
<!--            <button class="toask_ask" @click="toNextPage('class/next/postQues')">问问买家</button>-->
            <button class="toask_ans" @click="toNextPage('class/next/toAnswer')">我来回答</button>
        </view>
    </view>
</template>

<script>
    export default {
        name: "answerList",
        data(){
            return{
                lists:['','',''],
                details:''
            }
        },
        onShow(){
            this.details = global.detailShop
            this.getquestionById()
            // this.lists = global.questiontoans
        },
        methods:{
            toNextPage(url){
                uni.navigateTo({
                    url:"/pages/" + url
                })
                global.detailShop = this.details
                global.questiontoans = this.lists
            },
            async getquestionById(){
                let res = await this.$api.getquestionById({
                    qId: global.questiontoans.qId
                })
                if(res.data.code == 200){
                    this.lists = res.data.questions
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .ask{
        width: 34upx;
        height: 34upx;
        margin-right: 7upx;
        position: relative;
        top: 3upx;
    }
    .avactor{
        width: 47upx;
        height: 46upx;
        margin-right: 10upx;
        border-radius: 50%;
    }
    .goods{
        margin-top: 20upx;
        margin-bottom: 20upx;
        view{
            width: 527upx;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-size: 22upx;
            color: #333333;
            margin-top: 15upx;
        }
        img{
            width: 60upx;
            height: 60upx;
            margin-right: 20upx;
        }
    }
    .answer{
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius:20upx;
        /*padding: 40upx;*/
        &_ques{
            padding: 40upx;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            &_is{
                font-size: 26upx;
                color: #333333;
                margin-bottom: 20upx;
            }
            &_ti{
                font-size: 18upx;
                color: #999999;
            }
        }
        &_tot{
            padding: 40upx 40upx 50upx 40upx;
            font-size: 20upx;
            color: #4A6CFC;
        }
    }
    .listwrap{
        padding:0upx 40upx 40upx 40upx;
    }
    .answerList{
        padding-bottom: 30upx;
        margin-bottom: 30upx;
        border-bottom: 1px solid rgba(51,51,51,0.1);
        &_na{
            color: #333333;
        }
        &_ti{
            color: #999999;
            font-weight: 300;
            font-size: 18upx;
        }
        &_con{
            margin-top: 17upx;
            color: #333333;
        }
    }
    .answerList:last-child{
        padding-bottom: 0upx;
        margin-bottom: 0upx;
        border-bottom: none;
    }
    .toask{
        position: fixed;
        bottom: 80upx;
        width: 100%;
        padding: 0upx 40upx;
        button{
            width:294upx;
            height:88upx;
            color: #ffffff;
            font-size: 36upx;

            border-radius:20upx 0px 20upx 0px;
        }
        button:after{
            border: none;
        }
        &_ask{
            background:linear-gradient(0deg,rgba(66,144,244,1),rgba(99,193,252,1));
            box-shadow:0px 8upx 25upx 0px rgba(71,151,245,0.46);
        }
        &_ans{
            background:linear-gradient(0deg,rgba(249,159,0,1),rgba(252,201,1,1));
            box-shadow:0px 8upx 25upx 0px rgba(249,160,0,0.46);
        }
    }
</style>