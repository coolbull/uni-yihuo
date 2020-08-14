<template>
    <view>
        <view v-if="uShopkeeper == '2'">
            <view  class="upload margin40">
                <view @click="chooseImage(1)">
                    <view class="upload_no">
                        <img src="../../static/addcard.png" alt="">
                        <view>点击上传身份证正面照</view>
                    </view>
                    <img :src="cardZheng" alt="" class="uploadimg" v-if="cardZheng!=''">
                </view>
                <view  @click="chooseImage(2)">
                    <view>
                        <img src="../../static/addcard.png" alt="">
                        <view>点击上传身份证反面照</view>
                    </view>
                    <img :src="cardfan" alt="" class="uploadimg" v-if="cardfan!=''">
                </view>
            </view>
            <view class="btn margin40" @click="Joindistribution">
                <button class="button">提交审核</button>
            </view>
            <view class="agree">
                <img :src="isagree?'../../static/agreesure.png':'../../static/agree.png'" alt=""  @click="agree">
                <text @click="tocard">
                    《点击上传身份证协议》
                </text>
            </view>
        </view>
        <success v-if="uShopkeeper == '1'" :success="false"></success>
        <view class="tips" v-if="agreet&&uShopkeeper == '2'">
            <view>
                <view class="tips_t">温馨提示</view>
                <view>
                    感谢您的关注！
                    成为驿货分销人员前，请您阅读并同意<text @click="toknow">《分销人员需知》</text>（点击了解详细内容），特向您说明如下：<br>
                    1、您申请成为分销平台的分销商后，可以通过分销平台上架商品，则双方正式确立分销合作关系。<br>
                    2、您通过网络页面点击确认接受本协议，即表示您与我们已达成协议并同意接受本协议的全部约定内容。本协议内容包括协议正文及所有已经发布或将来可能发布的各类规则。所有规则为协议不可分割的一部分，与协议正文具有同等法律效力。<br>
                    3、我们会采取先进的安全措施来保护您的信息安全；<br>
                    4、未经您同意，我们不会从第三方获取共享、共享或向其提供您的信息。
                </view>
                <view>
                    <button @click="toagree">同意</button>
                    <view class="tips_no" @click="noagree">不同意</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import uploadFile from '../../plugin/UploadAliyun'
    import success from '../comp/success'
    export default {
        name: "mademoney",
        components:{success},
        data(){
            return{
                isagree:false,
                cardZheng:'',
                cardfan:'',
                uShopkeeper:uni.getStorageSync('uShopkeeper'),
                agreet:true
            }
        },
        onShow(){
            // var uShopkeeper = uni.getStorageSync('uShopkeeper')
            // this.uShopkeeper = uShopkeeper
        },
        methods:{
            toknow(){
              uni.navigateTo({
                  url:'/pages/instructions/dispersonKnow'
              })
            },
            toagree(){
              this.agreet = false
            },
            tocard(){
                  uni.navigateTo({
                      url:'/pages/instructions/cadrAgreement'
                  })
            },
            agree(){
                this.isagree = !this.isagree
            },
            noagree(){
                uni.reLaunch({
                    url:'/pages/mine/index'
                })
            },
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
                        if(index == 1){
                            this.cardZheng = `https://bj-yys.oss-cn-beijing.aliyuncs.com/${res}`
                        }else {
                            this.cardfan = `https://bj-yys.oss-cn-beijing.aliyuncs.com/${res}`
                        }

                    },
                    fail: function (res) {
                        global.showToast('上传失败，请稍后再试')
                    },
                    complete: () => {
                        wx.hideLoading();
                    }
                })
            },
            async Joindistribution(){
                if(!global.isEmpty(this.cardZheng)){
                    global.showToast('请上传身份证正面照')
                    return
                }
                if(!global.isEmpty(this.cardfan)){
                    global.showToast('请上传身份证反面照')
                    return
                }
                if(!this.isagree){
                    global.showToast('请同意上传身份证协议')
                    return
                }
                let res = await this.$api.Joindistribution({
                    Idcardone:this.cardZheng,
                    Idcardtwo:this.cardfan
                })
                if(res.data.code == 200){
                    global.showToast('提交审核成功')
                    setTimeout(()=>{
                        wx.navigateBack({
                            delta:1
                        })
                    },2000)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .upload{
        margin-bottom: 60upx;
        >view{
            width: 100%;
            height: 414upx;
            background:rgba(255,255,255,1);
            border:1px solid rgba(206,206,206,1);
            border-radius:20upx 0px 20upx 0px;
            margin-top: 20upx;
            font-size: 28upx;
            color: #333333;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        img{
            width: 99upx;
            height: 99upx;
            margin-bottom: 38upx;
        }
        .uploadimg{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0upx;
            right: 0upx;
            border-radius:20upx 0px 20upx 0px;
        }
        &_no{

        }
    }
    .btn{
        margin-bottom: 40upx;
        /*width: 100%;*/
        button{
            width: 100%;
        }
    }
    .agree{
        text-align: center;
        color: #999999;
        font-size: 20upx;
        img{
            width: 24upx;
            height: 24upx;
            margin-right: 10upx;
            position: relative;
            top: 5upx;
        }
    }
    .tips{
        position: fixed;
        top: 0upx;
        left: 0upx;
        bottom: 0upx;
        right: 0upx;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        >view{
            width: 80%;
            padding: 60upx;
            background: white;
            border-radius: 40upx;
            font-size: 26upx;
        }
        &_t{
            text-align: center;
            margin-bottom: 20upx;
            font-size:40upx;
        }
        &_con{
            font-size: 24upx;
            font-weight: 300;
        }
        button{
            margin-top: 40upx;
            /*width:284upx;*/
            height:70upx;
            line-height: 70upx;
            background:linear-gradient(-30deg,rgba(246,30,69,1),rgba(253,68,95,1));
            box-shadow:0px 2upx 25upx 0px rgba(251,88,103,0.46);
            border-radius:20upx 0px 20upx 0px;
            color: #fff;
        }
        text{
            color: #1199FC;
        }
        &_no{
            color: #666666;
            text-align: center;
            margin-top: 20upx;
        }
    }
</style>