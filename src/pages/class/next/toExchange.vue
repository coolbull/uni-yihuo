<template>
    <view>
        <view class="areaLi">
            <view class=" goods space-between">
                <img :src="orderDetails.pCover" alt="">
                <view class="goods_c">
                    <view class="goods_c_t">
                        {{orderDetails.pName}}
                    </view>
                    <view class="flex goods_m">
                        <view>单价：
                            <text>¥ {{orderDetails.pPrice}}</text>
                        </view>
                        <view>购买数量：
                            <text>{{orderDetails.pNum}}</text>
                        </view>
                        <view>申请数量：
                            <text>{{orderDetails.pNum}}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="space-between goodsnum">
                <view>
                    商品数量
                </view>
                <view>
                    <text class="goodsnum_r">-</text>
                    <text class="goodsnum_n">{{orderDetails.pNum}}</text>
                    <text class="goodsnum_r">+</text>
                </view>
            </view>
        </view>
        <view class="areaLi flex">
            <text class="sq">申请原因</text>
            <input type="text" placeholder="请输入换货原因" style="font-size: 28upx" v-model="formData.reason">
        </view>
        <view class="areaLi">
            <text class="sq">上传凭证</text>
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
        <view class="areaLi inputlist">
            <view class="flex">
                <text class="sq">
                    所在地区
                </text>
                <picker mode="region" @change="bindRegionChange" :value="region" class="picker" >
                    <view class="picker">
                        {{formData.pname}} {{formData.cname}} {{formData.aname}}
                    </view>
                </picker>
            </view>
            <view class="flex">
                <text class="sq">详细地址</text>
                <textarea name="" id="" cols="30" rows="10" placeholder="街道/楼牌号等"
                          v-model="formData.saddress" placeholder-style="font-weight:400"></textarea>
            </view>
            <view class="flex">
                <text class="sq">联系人</text>
                <input type="text" placeholder="请填写联系人" v-model="formData.sname" placeholder-style="font-weight:400">
            </view>
            <view class="flex">
                <text class="sq">联系电话</text>
                <input type="text" placeholder="请填写联系电话" v-model="formData.sphone" placeholder-style="font-weight:400">
            </view>
        </view>
        <view class="buttonw">
            <button class="button" @click="AddShoppingAddress">提交</button>
        </view>

    </view>
</template>

<script>
    import uploadFile from "../../../plugin/UploadAliyun";

    export default {
        name: "toExchange",
        data() {
            return {
                region: ['北京市', '北京市', '海淀区'],
                formData: {
                    sphone: '',
                    sname: '',
                    pname: '北京市',
                    cname: '北京市',
                    aname: '海淀区',
                    saddress: '',
                    status: '',
                    reason:''
                },
                imgPath:[],
                imglength:0,
                orderDetails:''
            }
        },
        onShow(){
            var orderDetails = uni.getStorageSync('orderDetails')
            this.orderDetails = orderDetails
            this.formData.sname = orderDetails.oPeople
            this.formData.sphone = orderDetails.oPhone
            this.formData.pname = orderDetails.province
            this.formData.city = orderDetails.city
            this.formData.county = orderDetails.county
            this.formData.saddress = orderDetails.defaddress
        },
        methods:{
            bindRegionChange: function (e) {
                this.formData.pname = e.detail.value[0]
                this.formData.cname = e.detail.value[1]
                this.formData.aname = e.detail.value[2]
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
            async AddShoppingAddress(){
                if(!global.isEmpty(this.formData.reason)){
                    global.showToast('请输入申请原因')
                    return
                }
                if(!global.isEmpty(this.formData.sname)){
                    global.showToast('请输入联系人')
                    return
                }
                if(!global.checkSymbols(this.formData.sname)){
                    global.showToast('请输入正确的联系人')
                    return
                }
                if(!global.checkMobile(this.formData.sphone)){
                    global.showToast('请输入正确的联系电话')
                    return
                }
                if(!global.isEmpty(this.formData.pname)){
                    global.showToast('请选择所在地区')
                    return
                }
                if(!global.isEmpty(this.formData.saddress)){
                    global.showToast('请输入详细地址')
                    return
                }
                // if(!global.checkSymbols(this.formData.saddress)){
                //     global.showToast('请输入正确的详细地址，不允许携带特殊符号')
                //     return
                // }
                var data = {
                    uPhone:this.formData.sphone,
                    uName:this.formData.sname,
                    province:this.formData.pname,
                    city:this.formData.cname,
                    county: this.formData.aname,
                    eAddress: this.formData.saddress,
                    oNumber:this.orderDetails.oNumber,
                    eReason:this.formData.reason,
                    ePic:this.imgPath.join(',')
                }
                let res = await this.$api.exchangeapply(data)
                if(res.data.code == 200){
                    global.showToast('换货申请成功')
                    setTimeout(()=>{
                        wx.navigateBack({
                            delta:2
                        })
                    },2000)
                }else {
                    global.showToast(res.data.msg)
                }

            },
        }
    }
</script>

<style scoped lang="scss">
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
    .goods {
        img {
            width: 120upx;
            height: 120upx;
        }

        &_c {
            width: 520upx;

            &_t {
                color: #666666;
                font-size: 22upx;
                margin-bottom: 29upx;
            }
        }

        &_m {
            font-size: 20upx;
            color: #999999;

            > view {
                margin-right: 19upx;
            }

            text {
                font-size: 22upx;
                color: #333333;
                font-weight: bold;
            }
        }
    }
    input,textarea{
        width: 520upx;
    }
    .sq{
        font-size: 28upx;
        color: #666666;
        display: inline-block;
        width: 120upx;
        margin-right: 30upx;
    }
    .goodsnum{
        font-size: 28upx;
        color: #030d18;
        font-weight: bold;
        margin-top: 30upx;
        &_r{
            color: #c1c1c1;
        }
        &_n{
            display: inline-block;
            width: 105upx;
            height: 42upx;
            background:rgba(246,246,246,1);
            border-radius:20upx 0px 20upx 0px;
            text-align: center;
            line-height: 42upx;
            margin-left: 20upx;
            margin-right: 20upx;
        }
    }
    .inputlist{
        margin-bottom: 130upx;
        >view{
            padding-bottom: 40upx;
            padding-top: 40upx;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        >view:first-child{
            padding-top: 0upx;
        }
        >view:last-child{
            padding-bottom: 0upx;
            border: none;
        }
        input,textarea{
            font-size: 28upx;
            color: #333333;
            font-weight: bold;
        }
        textarea{
            height: 70upx;
        }
        .picker{
            font-size: 28upx;
            color: #333333;
            font-weight: bold;
        }
    }
    .buttonw{
        position: fixed;
        bottom: 0upx;
        width: 100%;
        button{
            border-radius: 0upx;
        }

    }
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
</style>