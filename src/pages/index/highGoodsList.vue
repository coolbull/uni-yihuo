<template>
    <view class="listWrap margin40">
        <view class="lists ov" v-for="item in recomList" @click="todetails(item)">
            <img :src="item.pimagetext" alt=""  class="lists_img fl" >
            <view class="fr">
                <view  class="lists_ti">{{item.pname}}</view>
                <view class="flex">
                    <view class="lists_new">
                        <text  class="lists_new_y">¥</text>
                        <text class="lists_new_m"  v-if="item.pDiscount!='1'&&item.pDiscount!=null&&item!=undefined">{{item.pPricef}}</text>
                        <text class="lists_new_m"  v-if="item.pDiscount=='1'||item.pDiscount==null||item.pDiscount==undefined">{{item.pprice}}</text>
                    </view>
                    <view class="lists_old" v-if="item.pDiscount!='1'&&item.pDiscount!=null&&item!=undefined">
                        <text>¥</text>{{item.pprice}}
                    </view>
                </view>
                <view class="space-between">
                    <text class="label">自营</text>
<!--                    <text class="label">特价</text>-->
                    <view class="lists_al" style="position: relative;top: 8rpx">
                        <img src="../../static/goodsdetails/star_has.png" alt="" class="star" style="width: 20rpx;height: 20rpx;margin-left: 3rpx" v-for="item in item.pGrade">
                        <img src="../../static/goodsdetails/star.png" alt="" class="star" style="width: 20rpx;height: 20rpx;margin-left: 3rpx" v-for="item in 5-item.pGrade">
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "highGoodsList",
        data(){
          return{
              recomList:[]
          }
        },
        onShow(){
            this.productDetailsRecommendAll()
        },
        onPullDownRefresh: function() {
            this.productDetailsRecommendAll();
            wx.stopPullDownRefresh();
        },
        methods:{
            async productDetailsRecommendAll(){
                let res = await this.$api.productDetailsRecommendAll({})
                if(res.data.code == 200){
                    res.data.productDetails.forEach((a,b)=>{
                        a.pimagetext = a.pCover
                        a.pname = a.pName
                        a.pprice = a.pPrice.toFixed(2)
                        a.pPricef = a.pPricef.toFixed(2)
                    })
                    this.recomList = res.data.productDetails
                }
            },
            todetails(item){
                uni.navigateTo({
                    url:'/pages/class/goodsDetails?pid='+item.pid
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .label{
        display: inline-block;
        margin-top: 20upx;
        font-size:18upx;
        font-weight:500;
        color:rgba(246,30,69,1);
        padding: 5upx 13upx;
        background:rgba(246,30,69,0.1);
        border-radius:0px 20px 0px 20px;
        margin-right: 10upx;
    }
    .listWrap{
        .lists{
            margin-top: 28upx;
            padding: 30upx 30upx 40upx 30upx;
            border-radius: 5upx;
            background: white;
            box-shadow: 0px 3upx 8upx 0px rgba(0,0,0,0.08);
            position: relative;
            .fr{
                width: 409upx;

            }
            &_img{
                width: 166upx;
                height: 166upx;
                margin-right: 30upx;
            }
            &_ti{
                color: #333333;
                font-size: 26upx;
                width: 336upx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 32upx;
                font-weight: bold;
            }
            &_old{
                color: #666;
                text-decoration: line-through;
                font-weight: 300;
                margin-left: 10upx;
                position: relative;
                top: 10upx;
                /*margin-bottom: 10upx;*/
            }
            &_new{
                color: #f61e45;
                font-weight: bold;
                &_m{
                    font-size: 36upx;
                }
            }
            &_al{
                color: #858585;
                position: relative;
                top: 6upx;
            }
            &_goods{
                font-size:18upx;
                font-weight:300;
                color:rgba(153,153,153,1);
            }

        }
    }
</style>