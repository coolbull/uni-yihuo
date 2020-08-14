<template>
    <view>
        <view class="banner">
            <img src="https://bj-yys.oss-cn-beijing.aliyuncs.com/yihuo/huanduguoqing.jpg" alt="">
        </view>
        <view class="margin40">
            <goods-lists :goods="goods"></goods-lists>
        </view>
    </view>
</template>

<script>
    import goodsLists from '../comp/goodsLists'
    export default {
        name: "saleLists",
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
            this.productDetailsDiscountAll()
        },
        onPullDownRefresh() {
            this.productDetailsDiscountAll()
            wx.stopPullDownRefresh();
        },
        methods:{
            async productDetailsDiscountAll(){
                let res = await this.$api.productDetailsDiscountAll({})
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

<style scoped lang="scss">
    .banner{
        width: 100%;
        height: 313upx;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>