<template>
    <view>
        <view class="change margin40" @click="change">
            <img src="../../static/fresh.png" class="fresh" alt="">
            换一批
        </view>
        <best-lists :goods="goods"></best-lists>
    </view>
</template>

<script>
    import bestLists from '../comp/bestLists'
    export default {
        components:{bestLists},
        name: "zkBestLists",
        data(){
          return{
              goods:{
                  show:true,
                  goodsList:[]
              },
          }
        },
        onLoad(){
            this.productDetailsAll()
        },
        onPullDownRefresh() {
            this.productDetailsAll()
            wx.stopPullDownRefresh();
        },
        methods:{
            async productDetailsAll(){
                let res = await this.$api.productDetailsAll({})
                if(res.data.code == 200){
                    res.data.productDetails.forEach((a,b)=>{
                        a.pimagetext = a.pCover
                        a.pname = a.pName
                        a.pprice = a.pPrice.toFixed(2)
                        a.pPricef = a.pPricef.toFixed(2)
                    })
                    this.goods.goodsList = res.data.productDetails
                }
            },
            change(){
                this.productDetailsAll()
            }
        }
    }
</script>

<style scoped lang="scss">
    .change{
        color: #666666;
        text-align: center;
        padding-top: 20upx;
        padding-bottom: 20upx;
    }
    .fresh{
        width: 16upx;
        height: 18upx;
        margin-right: 10upx;
    }
</style>