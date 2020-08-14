<template>
    <view>
        <view class="textinput">
            <view class="textinput_ques">{{lists.qQuestion}}</view>
            <view class="textinput_in">
                <textarea name="" id="" cols="30" rows="10" placeholder="我知道，我来答" v-model="answer" maxlength="50" @blur="onblur" @focus="bindinput"></textarea>
            </view>

            <view class="textinput_num">{{answer.length}}/50</view>
            <view class="imgarr" v-if="imglength>0">
                <view v-for="(item,index) in imgPath" class="imgarr_wr">
                    <img :src="item" alt="" class="imgarr_im">
                    <img src="../../../static/del.png" alt="" class="imgarr_del" @click="delImg(index)">
                </view>

                <view class="imgarr_add" @click="chooseImage()" v-if="imglength<9">
                    <img src="../../../static/addpic.png" alt="">
                    <view>添加图片</view>
                </view>
            </view>
        </view>
        <view class="release space-between" :style="keyheight">
            <view class="flex">
                <view class="release_fir" @click="chooseAnonymous">
                    <img :src="isAnonymous?'../../../static/anonymous_has.png':'../../../static/anonymous.png'" alt="">
                    <text :style="isAnonymous?'color:#F61E45':''">匿名提问</text>
                </view>
                <view  @click="chooseImage()">
                    <img src="../../../static/camera.png" alt="">
                    <text>添加图片</text>
                </view>
            </view>
            <view>
                <button :class="answer.length>=4?'active' : ''" @click="submit">发布</button>
            </view>
        </view>
    </view>
</template>

<script>
    import uploadFile from "../../../plugin/UploadAliyun";

    export default {
        name: "toAnswer",
        data(){
            return{
                answer:'',
                imglength:0,
                imgPath:[],
                keyheight:'0',
                isAnonymous:false,
                lists:''
            }
        },
        onShow(){
            this.lists = global.questiontoans
        },
        methods:{
            chooseImage(index){
                var that = this
                wx.chooseImage({
                    success (res) {
                        wx.showLoading({
                            title: '上传中，请稍后',
                            icon: 'none'
                        });
                        that.uploadpic(res.tempFilePaths, index)
                    }
                })
            },
            uploadpic(filePaths,index){
                uploadFile({
                    filePath: filePaths,
                    index: 0,
                    dir: "images/",
                    success: (res) => {

                        this.imgPath.push(`https://bj-yys.oss-cn-beijing.aliyuncs.com/${res}`)
                        this.imglength = this.imgPath.length

                    },
                    fail: function (res) {
                        global.showToast('上传失败，请稍后再试')
                    },
                    complete: () => {
                        wx.hideLoading();
                    }
                })
            },
            delImg(index){
                var that = this
                wx.showModal({
                    title: '',
                    content: '确认删除图片吗',
                    confirmText:'删除',
                    success (res) {
                        if (res.confirm) {
                            that.imgPath.splice(index,1)
                            that.imglength = that.imgPath.length
                        } else if (res.cancel) {
                        }
                    }
                })

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
            },
            async submit(){
                if(this.answer.length<4){
                    global.showToast('答案不可以低于4个字')
                    return
                }
                let res = await this.$api.addasnwer({
                    qAId:this.lists.qId,
                    qAnswer:this.answer,
                    ePic:this.imgPath.join(','),
                    anonymous:this.isAnonymous?'2':'1'
                })
                if(res.data.code == 200){
                    global.showToast('回答成功')
                    setTimeout(()=>{
                        wx.navigateBack({
                            delta:1
                        })
                    },1000)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .imgarr{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 40upx;
        padding-top: 20upx;
        padding-bottom: 0upx;
        &_wr{
            position: relative;
        }
        &_im{
            width: 200upx;
            height: 200upx;
            background: red;
            border-radius: 10upx;
            margin-bottom: 20upx;
        }
        &_del{
            width: 30upx;
            height: 30upx;
            position: absolute;
            right: -10upx;
            top: -10upx;
        }
        &_add{
            width: 200upx;
            height: 200upx;
            /*margin-top: 30upx;*/
            background:rgba(248,246,246,1);
            border-radius:10px;
            /*height: 182upx;*/
            text-align: center;
            color: #999999;
            padding:40upx 0upx;
            font-size: 22upx;
            img{
                width: 72upx;
                height: 59upx;
                margin-bottom: 20upx;
            }
        }
        &_addsm{
            width: 200upx;
        }
        &_ano{
            margin-top: 40upx;
            font-size: 28upx;
            color: #333333;
            img{
                width: 38upx;
                height: 38upx;
                margin-right: 20upx;
                position: relative;
                top: 9upx;
            }
        }
    }
    .imgarr:after{
        content:"";
        display:block;
        width:200upx;
    }


    .textinput{
        margin-top: 20upx;
        background:rgba(255,255,255,1);
        box-shadow:0px 3upx 8upx 0px rgba(0, 0, 0, 0.08);
        border-radius:20upx;
        padding-bottom: 40upx;
        font-size: 28upx;
        &_ques{
            padding: 40upx;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        &_in{
            padding: 40upx;
        }
        &_num{
            padding: 40upx;
            padding-bottom: 0upx;
            text-align: right;
            color: #666666;
            font-size: 22upx;
        }
    }
    .release{
        background:rgba(241,241,241,1);
        color: #333333;
        font-size: 28upx;
        padding: 15upx 40upx;
        padding-bottom:calc(16rpx + env(safe-area-inset-bottom));
        position: fixed;
        left: 0upx;
        width: 100%;
        bottom: 0upx;
        &_fir{
            margin-right: 40upx;
        }
        img{
            margin-right: 17upx;
            width: 40upx;
            height: 35upx;
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
    }
</style>