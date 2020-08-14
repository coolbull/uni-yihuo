<template>
    <view>
        <view class="areaLi goods flex">
            <img :src="orderDetails.pCover" alt="" class="goods_img">
            <view v-if="type == 1">
                <view class="goods_ti">商品评价</view>
                <view class="flex">
                    <view v-for="(item,index) in 5" @click="chooseGrade(-1,index)">
                        <img src="../../../static/commentstar_has.png" alt="" class="star" v-show="productCur>=item">
                        <img src="../../../static/commentstar.png" alt="" class="star"  v-show="productCur<item">
                    </view>
                    <text class="goods_con" v-if="productCur>-1">{{productCur == '0' ? '非常差' : productCur == '1' ? '差' : productCur == '2' ? '一般' : productCur == '3' ? '好' : '非常好' }}</text>
                </view>
            </view>
            <view v-if="type == 2" class="align-center" style="margin-bottom: 0px">
                <view class="goods_ti">{{orderDetails.pName}}</view>
<!--                <view class="goods_ti">{{orderDetails.pPrice}}</view>-->
            </view>
        </view>
        <view class="areaLi goodscomment">
            <view class="flex">
                <img src="../../../static/mine/edit.png" alt="" class="edit">
                <view>
                    <textarea name="" id="" cols="30" rows="10" placeholder="点击上方标签写出您的感受，可以帮助更多小伙伴哦~" maxlength="50" v-model="productComment" @focus="productComEve"  @blur="productComEveblur" @input="productComEveIn(0)" ></textarea>
                </view>
            </view>
            <view class="goodscomment_num">{{productComment.length}}/50</view>
            <view class="goodscomment_imgarr">
                <view v-for="(item,index) in imgPath" class="goodscomment_imgarr_wr">
                    <img :src="item" alt="" class="goodscomment_imgarr_im">
                    <img src="../../../static/del.png" alt="" class="goodscomment_imgarr_del" @click="delImg(index)">
                </view>

                <view class="goodscomment_add" @click="chooseImage(2)" :style="imglength!=0?'width:200rpx':'width:100%'" v-if="imglength<9">
                    <img src="../../../static/addpic.png" alt="">
                    <view>添加图片</view>
                </view>
            </view>
            <view class="goodscomment_ano" @click="chooseAnonymous"  v-if="type == 1" >
                <img :src="isAnonymous?'../../../static/niming_has.png' : '../../../static/niming.png'" alt="">
                <text>匿名评价</text>
            </view>
        </view>
        <view class="areaLi" v-if="false">
            <view class="courComment">
                <view class="space-between courComment_ti">
                    <view>
                        <img src="../../../static/courier.png" alt="" class="courComment_img">
                        <text class="fontSize28">物流服务评价</text>
                    </view>
                    <view class="courComment_tip">满意请给5星哦</view>
                </view>
                <view class="flex courComment_con" v-for="(item,index) in cuurierData">
                    <text>{{item.name}}</text>
                    <view class="flex">
                        <view v-for="(n,key) in 5" @click="chooseGrade(index,key)">
                            <img src="../../../static/commentstar_has.png" alt="" class="star" v-show="item.grade>=n">
                            <img src="../../../static/commentstar.png" alt="" class="star"  v-show="item.grade<n">
                        </view>

                        <view v-if="item.grade>-1">{{item.grade == '0' ? '非常差' : item.grade == '1' ? '差' : item.grade == '2' ? '一般' : item.grade == '3' ? '好' : '非常好' }}</view>
                    </view>
                </view>
            </view>
            <view class="flex courCon">
                <img src="../../../static/mine/edit.png" alt="" class="edit">
                <view>
                    <textarea name="" id="" cols="30" rows="10" placeholder="点击上方标签写出您的感受，可以帮助更多小伙伴哦~" maxlength="50" v-model="courComment" @focus="productComEve" @blur="productComEveblur" @input="productComEveIn(1)"  :adjust-position='false'></textarea>
                </view>
            </view>
        </view>


        <view class="popup space-between" :style="keyheight">
            <view>{{numleng}}/50</view>
            <view>
                <button @click="addcomment" :class="productComment.length>0?'active':''">提交</button>
            </view>
        </view>
    </view>
</template>

<script>
    import uploadFile from "../../../plugin/UploadAliyun";

    export default {
        name: "toComment",
        data(){
          return{
              productCur:-1,
              isAnonymous:false,
              cuurierData:[
                  {
                      name:'商品符合度',
                      grade:-1
                  },
                  {
                      name:'店家服务态度',
                      grade:-1
                  },
                  {
                      name:'快递配送速度',
                      grade:-1
                  },
                  {
                      name:'快递员服务',
                      grade:-1
                  },
                  {
                      name:'快递包装',
                      grade:-1
                  }
              ],
              imgPath:[],
              imglength:0,
              productComment:'',
              popup:false,
              keyheight:'',
              numleng:0,
              courComment:'',
              orderDetails:'',
              type:1
          }
        },
        onLoad(option){
            this.type = option.type
        },
        onShow(){
            this.orderDetails = global.orderDetails
            // console.log(this.orderDetails.pId)
            // this.orderDetails.pId = this.orderDetails.pId.split(';')[0]
        },
        methods:{
            chooseGrade(index,key){
                if(index == -1){
                    this.productCur = key
                }else {
                    this.cuurierData[index].grade = key
                }
            },
            chooseAnonymous(){
                this.isAnonymous = !this.isAnonymous
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
            productComEve(e){
                this.popup = true
                this.keyheight='bottom:'+e.detail.height+'px;padding-bottom:15rpx'
            },
            productComEveblur(){
                this.popup = false
                this.keyheight='bottom:0px'
            },
            productComEveIn(index){
                if(index == 0){
                    this.numleng = this.productComment.length
                }else {
                    this.numleng = this.courComment.length
                }

            },
            async addcomment(){
                if(this.type == 1){
                    if(this.productCur==-1){
                        global.showToast('请选择评分')
                        return
                    }
                }

                if(this.productComment==''){
                    global.showToast('请输入评价内容')
                    return
                }
                let data = {
                    pId:this.orderDetails.pId,
                    eScore:this.productCur+1,
                    eComment:this.productComment,
                    ePic:this.imgPath.join(','),
                    anonymous:this.isAnonymous?'2':'1',
                    oNumber:this.orderDetails.oNumber,
                }
                if(this.type == 1){
                    let res = await this.$api.addgoodscomment(data)
                    if(res.data.code == 200){
                        global.showToast( '评价成功')
                        setTimeout(()=>{
                            wx.navigateBack({   //然后返回上一个页面
                                delta: 1
                            })
                        },1000)

                    }

                }else {
                    let res = await this.$api.addcommenttwo({
                        pId:this.orderDetails.pId,
                        eId:this.orderDetails.eId,
                        esComment:this.productComment,
                        esPic:this.imgPath.join(','),
                        oNumber:this.orderDetails.oNumber,
                    })
                    if(res.data.code == 200){
                        global.showToast( '追加评价成功')
                        setTimeout(()=>{
                            wx.navigateBack({   //然后返回上一个页面
                                delta: 1
                            })
                        },1000)

                    }
                }


            },
        }
    }
</script>

<style scoped lang="scss">
    textarea{
        font-size: 26upx;
        /*<!--position: relative;-->*/
        /*<!--top: -10upx;-->*/
    }
    .popup{
        width: 100%;
        /*height: 80upx;*/
        /*line-height: 80upx;*/
        padding: 0upx 40upx;
        padding-bottom:calc(16rpx + env(safe-area-inset-bottom));
        background: #F1F1F1;
        font-size: 20upx;
        color: #999999;
        font-weight: bold;
        position: fixed;
        bottom: 0upx;
        left: 0upx;
        button{
            margin-top: 15upx;
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
        view:first-child{
            position: relative;
            top: 25upx;
        }
    }
    .courCon{
        padding-top: 30upx;
    }
    .star{
        width: 37upx;
        height: 37upx;
        margin-right: 27upx;
        position: relative;
        top: 7upx;
    }
    .edit{
        width: 37upx;
        height: 33upx;
        margin-right: 11upx;
        position: relative;
        top: 20upx;
    }
    .areaLi{
        padding: 40upx;
        background: white;
        box-shadow:0px 3px 8upx 0px rgba(0, 0, 0, 0.08);
        border-radius:20upx;
        margin-bottom: 20upx;
    }
    .goods{
        &_img{
            width: 119upx;
            height: 119upx;
            margin-right: 30upx;
        }
        &_ti{
            font-size: 28upx;
            color: #333333;
            margin-bottom: 26upx;
        }

        &_con{
            color: #999999;
            font-weight: 300;
            margin-left: 23upx;
            margin-top: 10upx;
        }
    }
    .goodscomment{

        &_num{
            text-align: right;
            color: #666666;
            font-size: 22upx;
        }
        &_imgarr{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 30upx;
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
        }
        &_imgarr:after{
            content:"";
            display:block;
            width:200upx;
        }

        &_add{
            width: 100%;
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
    .courComment{
        border-bottom: 1px solid rgba(0,0,0,0.1);
        &_ti{
            margin-bottom: 54upx;
        }
        &_tip{
            color: #999999;
            font-size: 24upx;
        }
        &_img{
            width: 32upx;
            height: 23upx;
            margin-right: 19upx;
        }
        text{

        }
        &_con{
            margin-bottom: 70upx;
            margin-left: 52upx;
            >text{
                display: inline-block;
                font-size: 28upx;
                color: #333333;
                width: 188upx;
                margin-right: 29upx;
            }
            >view{
                font-size: 24upx;
                color: #999999;
            }
        }
    }
</style>