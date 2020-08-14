<template>
    <view class="margin40">
        <goods-lists :goods="goods"></goods-lists>
        <empty :prop="empty" v-if="goods.goodsList.length==0"></empty>
    </view>
</template>

<script>
    import goodsLists from "../comp/goodsLists";
    import empty from "../comp/empty";
    export default {
        components:{goodsLists,empty},
        name: "collection",
        data(){
            return{
                goods:{
                    num:4,
                    from:'mine',
                    goodsList:[]
                },
                empty:'collect'
            }
        },
        onShow(){
          this.getmycollect()
        },
        onPullDownRefresh() {
            this.getmycollect()
            wx.stopPullDownRefresh();
        },
        methods:{
            async getmycollect(){
                let res = await this.$api.getmycollect({
                })
                if(res.data.code == 200){
                    res.data.datalist.forEach((a,b)=>{
                        a.pPricef = Number(a.pPricef).toFixed(2)
                        a.pPrice = Number(a.pPrice).toFixed(2)
                        // a.pimagetext = a.pCover
                    })
                    this.goods.goodsList = res.data.datalist
                }
            }
        }
    }
</script>

<style scoped>

</style>