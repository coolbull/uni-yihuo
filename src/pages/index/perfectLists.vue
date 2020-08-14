<template>
    <view class="margin40" style="padding-top: 12upx">
        <goods-lists :goods="goods" ></goods-lists>
        <view class="none" v-if="goods.goodsList.length == 0">暂无超值优惠商品～</view>
    </view>
</template>

<script>
    import goodsLists from '../comp/goodsLists'
    export default {
        name: "perfectLists",
        components:{goodsLists},
        data(){
            return{
                goods:{
                    num:5,
                    from:'index',
                    goodsList:[]
                }
            }
        },
        onShow(){
            this.productDetailsDiscountsAll()
        },
        onPullDownRefresh() {
            this.productDetailsDiscountsAll()
            wx.stopPullDownRefresh();
        },
        methods:{
            async productDetailsDiscountsAll(){
                let res = await this.$api.productDetailsDiscountsAll({})
                if(res.data.code == 200){
                    res.data.productDetails.forEach((a,b)=>{
                        a.pimagetext = a.pCover
                        a.pname = a.pName
                        a.pprice = a.pPrice.toFixed(2)
                        a.pPricef = a.pPricef.toFixed(2)
                    })
                    this.goods.goodsList = res.data.productDetails
                }
            }
        }
    }
</script>

<style scoped>
        .none{
            padding-top: 40upx;
            color: #666666;
            font-size: 24upx;
            text-align: center;
        }
</style>