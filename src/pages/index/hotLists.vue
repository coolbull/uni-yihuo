<template>
    <view>
        <view class="banner">
            <img src="https://bj-yys.oss-cn-beijing.aliyuncs.com/yihuo/shunian.png" alt="">
        </view>
        <best-lists :goods="goods"></best-lists>
    </view>
</template>

<script>
    import bestLists from "../comp/bestLists";
    export default {
        components:{bestLists},
        name: "hotLists",
        data(){
            return{
                goods:{
                    show:true,
                    goodsList:[]
                },
            }
        },
        onShow(){
            this.productDetailsFaddishAll()
        },
        onPullDownRefresh() {
            this.productDetailsFaddishAll()
            wx.stopPullDownRefresh();
        },
        methods:{
            async productDetailsFaddishAll(){
                let res = await this.$api.productDetailsFaddishAll({})
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
        /*margin-bottom: ;*/
        img{
            width: 100%;
            height: 313upx;
        }
    }
</style>