<template>
    <view class="margin40">
        <goods-lists :goods="newList"></goods-lists>
    </view>
</template>

<script>
    import goodsLists from "../comp/goodsLists";
    export default {
        name: "newGoodsList",
        components:{goodsLists},
        data(){
            return{
                newList:{
                    num:1,
                    from:'index',
                    goodsList:[]
                }
            }
        },
        onShow(){
            this.productDetailsNewestAll()
        },
        onPullDownRefresh() {
            this.productDetailsNewestAll()
            wx.stopPullDownRefresh();
        },
        methods:{
            async productDetailsNewestAll(){
                let res = await this.$api.productDetailsNewestAll({})
                if(res.data.code == 200){
                    res.data.productDetails.forEach((a,b)=>{
                        a.pimagetext = a.pCover
                        a.pname = a.pName
                        a.pprice = a.pPrice.toFixed(2)
                        a.pPricef = a.pPricef.toFixed(2)
                    })
                    this.newList.goodsList = res.data.productDetails
                }
            },
        }
    }
</script>

<style scoped>

</style>