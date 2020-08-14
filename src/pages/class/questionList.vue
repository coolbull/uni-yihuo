<template>
    <view>
        <view>
            <view class="goods margin40 flex">
                <img :src="details.pCover" alt="">
                <view>{{details.pName}}</view>
            </view>
        </view>
        <view>
            <view class="areaLi answerList" v-for="item in lists" @click="toanswer(item)">
                <view class="answerList_an">
                    <img src="../../static/ask.png" alt="" class="ask">
                    <text class="answerList_ti">{{item.qQuestion}}</text>
                </view>
                <view class="flex">
                    <img src="../../static/answer.png" alt="" class="ask">
                    <view class="answerList_con" v-if="item.questionsList.length>0">
                        {{item.questionsList[0].qAnswer}}
                    </view>
                    <view  v-if="item.questionsList.length==0">暂无回答</view>
                </view>
                <view class="answer" v-if="item.questionsList.length>0">
                    <img :src="item.questionsList[0].anonymous != '1' ? item.questionsList[0].uPic : '../../static/goodsdetails/avactor.png'" alt="">
                    <img :src="item.questionsList[0].anonymous != '1'? item.questionsList[0].uPic : '../../static/goodsdetails/avactor.png'" alt="">
                    <img src="../../static/more.png" alt="">
                    <text> {{item.questionsList[0].uName}}等{{item.questionsList.length}}人进行了回答</text>
                </view>
            </view>
        </view>
        <view v-if="lists.length == 0" class="none">
            暂无人提问，快去做第一个提问的人吧～
        </view>
        <view class="toask space-between">
            <button class="toask_ask" @click="toNextPage('class/next/postQues')">问问买家</button>
        </view>
    </view>
</template>

<script>
    export default {
        name: "questionList",
        data(){
            return{
                lists:[],
                details:''
            }
        },
        onShow(){
            this.details = global.detailShop
            this.getquestions()
        },
        methods:{
            toNextPage(url){
                uni.navigateTo({
                    url:"/pages/" + url
                })
                global.detailShop = this.details
            },
            async getquestions(){
                let res = await this.$api.getquestions({
                    pId:this.details.pid
                })
                if(res.data.code == 200){
                    this.lists = res.data.questions
                }
            },
            toanswer(item){
                uni.navigateTo({
                    url:"/pages/class/answerList"
                })
                global.questiontoans = item
            }
        }
    }
</script>

<style scoped lang="scss">
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
    .ask{
        width: 34upx;
        height: 34upx;
        margin-right: 20upx;
        position: relative;
        top: 7upx;
    }
    .answer{
        margin-top: 30upx;
        padding-left: 50upx;
        font-size: 20upx;
        color: #666666;

        img{
            width: 37upx;
            height: 37upx;
            border-radius: 50%;
            border: 2px solid rgb(255,255,255);

        }
        img:nth-child(2){
            position: relative;
            left: -10upx;
        }
        img:nth-child(3){
            position: relative;
            left: -20upx;
        }
        text{
            margin-left: 15upx;
            position: relative;
            bottom: 12upx;
            left: -23upx;
        }
    }
    .answerList{
        &_an{
            margin-bottom: 27upx;
        }
        &_ti{
            color: #333333;
            font-size: 32upx;
            font-weight: bold;
        }
        &_con{
            font-size: 28upx;
            width: 600upx;
            font-weight: 300;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;

        }
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
    .none{
        text-align: center;
        color: #666666;
        padding-top: 30upx;
    }
</style>