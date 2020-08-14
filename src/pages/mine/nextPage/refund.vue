<template>
    <view>
        <view class="agree">
            <img src="../../../static/warning.png" alt="">
            <text>商家同意退款后可自行退回</text>
        </view>
        <view class="areaLi flex" style="margin-top: 20upx">
            <view class="tips">退款原因：</view>
            <input type="text" placeholder="必填" v-model="reason">
        </view>
        <view class="areaLi">
            <view class="tips">上传凭证</view>
            <view class="wr imgarr">
                <view v-for="(item,index) in imgPath" class="imgarr_wr">
                    <img :src="item" alt="" class="imgarr_im">
                    <img src="../../../static/del.png" alt="" class="imgarr_del" @click="delImg(index)">
                </view>
                <view class="up" @click="chooseImage()" v-if="imglength<3">
                    <img src="../../../static/addpic.png" alt="">
                    <view>上传凭证</view>
                    <view>（最多三张）</view>
                </view>
            </view>
        </view>
        <view>
            <button class="submit" @click="submit">提交</button>
        </view>
    </view>
</template>

<script>
    import uploadFile from "../../../plugin/UploadAliyun";

    export default {
        name: "refund",
        data(){
          return{
              imgPath:[],
              imglength:0,
              reason:''
          }
        },
        onShow(){
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
            async submit(){
                if(!global.isEmpty(this.reason)){
                    global.showToast('请输入退款原因')
                    return
                }
                let res = await this.$api.refundOrder({
                    oNumber:global.orderDetails.oNumber,
                    epicurl:this.imgPath.join(','),
                    content:this.reason
                })
                if(res.data.code == 200){
                    global.showToast(res.data.msg)
                    if(global.isfa == 1){
                        setTimeout(()=>{
                            wx.navigateBack({   //然后返回上一个页面
                                delta: 1
                            })
                        },2000)
                    }else {
                        setTimeout(()=>{
                            wx.navigateBack({   //然后返回上一个页面
                                delta: 2
                            })
                        },2000)
                    }

                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .imgarr{
        display: flex;
        margin-top: 30upx;
        &_wr{
            position: relative;
        }
        &_im{
            width: 144upx;
            height: 144upx;
            background: red;
            border-radius: 10upx;
            margin-right: 20upx;
        }
        &_del{
            width: 30upx;
            height: 30upx;
            position: absolute;
            right: 10upx;
            top: -10upx;
        }
    }
    .imgarr:after{
        content:"";
        display:block;
        width:200upx;
    }
    .tips{
        color: #333333;
        font-size: 28upx;
    }
    .up{
        font-size: 18upx;
        text-align: center;
        width: 144upx;
        height: 144upx;
        padding-top: 20upx;
        border: 2upx dashed #999;
        border-radius: 10upx;
        color: #999999;
        img{
            width: 52upx;
            height: 43upx;
        }
    }
    .wr{
        margin-top: 40upx;
    }
    .submit{
        width: 100%;
        /*height:88upx;*/
        background:linear-gradient(-30deg,rgba(246,30,69,1),rgba(253,68,95,1));
        box-shadow:0px 12upx 23upx 0px rgba(251,88,103,0.46);
        /*border-radius:20upx 0px 20upx 0px;*/
        color: white;
        font-size: 36upx;
        padding: 0upx 27upx;
        padding-bottom: env(safe-area-inset-bottom);
        position: fixed;
        bottom: 0upx;
    }
    .agree{
        padding:30upx 40upx;
        color: #333333;
        font-size: 20upx;
        img{
            width: 20upx;
            height: 20upx;
            margin-right: 10upx;
            position: relative;
            top: 5upx;
        }
    }
</style>