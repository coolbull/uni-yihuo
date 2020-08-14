<template>
    <view>
        <view class="goods margin40 flex">
            <img :src="detail.pCover" alt="">
            <view>{{detail.pName}}</view>
        </view>
        <view class="input">
            <textarea name="" id="" cols="30" rows="10" placeholder="说出您的问题，已购买的人会为您解答哦~" maxlength="50" @focus="bindinput" v-model="question" @blur="onblur" ></textarea>
        </view>
        <view class="popup space-between" :style="keyheight">
            <view>
                <img :src="isAnonymous?'../../../static/anonymous_has.png':'../../../static/anonymous.png'" alt="" @click="chooseAnonymous">
                <text class="popup_ni" @click="chooseAnonymous" :style="isAnonymous?'color:#F61E45':''">匿名提问</text>
                <text class="popup_four">（4个字以上）</text>
                <text class="popup_num">{{question.length}}/50</text>
            </view>
            <view>
                <button :class="question.length>=4?'active' : ''" @click="release">发布</button>
            </view>

        </view>
    </view>
</template>

<script>
    export default {
        name: "postQues",
        data(){
            return{
                question:'',
                keyheight:'',
                isAnonymous:false,
                detail:''
            }
        },
        onShow(){
          this.detail = global.detailShop
        },
        methods:{
            async release(){
                if(this.question.length<4){
                    global.showToast('请输入问题')
                    return
                }
                let res = await this.$api.addquestion({
                    pId:this.detail.pid,
                    qQuestion:this.question
                })
                if(res.data.code == 200){
                    global.showToast('发布问题成功')
                }
                setTimeout(()=>{
                    wx.navigateBack({   //然后返回上一个页面
                        delta: 1
                    })
                },2000)
            },

            bindinput(e){
                this.focus = true
                this.keyheight='bottom:'+e.detail.height+'px;padding-bottom:15rpx'
            },
            onblur(){
                this.focus = false
                this.keyheight='bottom:0px'
            },
            chooseAnonymous(){
                this.isAnonymous = !this.isAnonymous
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
    .input{
        background: white;
        border-radius: 20upx;
        height: 400upx;
        padding: 40upx;
        font-size: 28upx;
    }
    .popup{
        width: 100%;
        background:rgba(241,241,241,1);
        padding: 15upx 40upx;
        position: fixed;
        bottom: 0upx;
        padding-bottom:calc(16rpx + env(safe-area-inset-bottom));
        img{
            width: 39upx;
            height: 32upx;
            margin-right: 17upx;
            position: relative;
            top: 7upx;
        }
        button{
            width:123upx;
            height:50upx;
            line-height: 50upx;
            background:rgba(255,255,255,1);
            border:1px solid rgba(238,238,238,1);
            border-radius:25upx;
            color:rgba(153,153,153,1);
            font-size: 22upx;
        }
        .active{
            background:linear-gradient(-30deg,rgba(246,30,69,1),rgba(253,68,95,1));
            color: white;
        }
        &_four{
            color: #c7c7c7;
        }
        &_ni{
            font-size: 28upx;
            color: #333333;
            margin-right: 33upx;
        }
        &_num{
            color: #F61E45;
            font-size: 20upx;
        }

    }
</style>