<template>
    <view class="page">

<!--        <tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true' :from="from" @clickItem="onClickItem" @searchchange="onchangepname">-->

<!--        </tabControl>-->
        <view class="searchw space-between">
            <view class="search flex" >
                <img src="../../static/searchin.png" alt="">
                <input type="text" placeholder="支架" v-model="searchpname" @input="search">
            </view>
            <view class="cancel" @click="cancel">取消</view>
        </view>
            <view style="padding-top: 70upx">
                <view  class="margin40"  v-if="goods.goodsList.length>0">
                    <goods-lists :goods="goods"></goods-lists>
                </view>
                <empty :prop="empty" v-if="goods.goodsList.length==0&&isem"></empty>
            </view>
    </view>
</template>

<script>
    import tabControl from '../comp/tabControl-tag'
    import goodsLists from "../comp/goodsLists";
    import empty from "../comp/empty";
    export default {
        components:{goodsLists,empty},
        name: "searchList",
        data(){
            return{
                goods:{
                    num:5,
                    from:'index',
                    goodsList:[]
                },
                items: ['全部', '销量', '价格','分类'],
                current: 0,
                from:'search',
                empty:'search',
                searchpname:'',
                isem:false
            }
        },
        onShow(){
          this.getList()
        },
        methods: {
            search(){
                this.isem = true
                this.getList()
            },
            onClickItem(val) {
                this.current = val.currentIndex
            },
            scollSwiper(e){
                this.current = e.target.current
            },
            // onchangepname(name){
            //     this.searchname = name
            //     this.getList()
            // },
            async getList(){
                let res = await this.$api.selVaguePD({
                    pName:this.searchpname
                })
                if(res.data.code == 200){
                    this.goods.goodsList = res.data.productDetails?res.data.productDetails:[]
                    this.goods.goodsList.forEach((a,b)=>{
                        a.pPrice = a.pPrice.toFixed(2)
                        a.pPricef = a.pPricef.toFixed(2)
                    })
                }

            },
            cancel(){
                this.searchpname = ''
                this.getList()
            }
        }
    }
</script>

<style scoped lang="scss">
    .cancel{
        font-size: 30upx;
        color: #666666;
        position: relative;
        top: 10upx;
    }
    page{
        height: 100%;
    }
    .page{
        /*padding-top: 193upx;*/
        height: 100vh;
    }
    .search{
        background:rgba(244,242,242,1);
        box-shadow:0px 2px 5px 0px rgba(0, 0, 0, 0.15);
        border-radius:32px;
        height: 63upx;


    img{
        width: 25upx;
        height: 25upx;
        margin-left: 30upx;
        margin-top: 19upx;
        margin-right: 13upx;
    }
    input{
        height: 63upx;
        width: 516upx;
        font-size:26upx
    }
    }
    .searchw{
        width: 100%;
        background: white;
        padding-bottom: 20upx;
        position: fixed;
        z-index: 99;
        padding-left: 40upx;
        padding-right: 40upx;
        box-shadow:0px 4upx 20upx 0px rgba(0, 0, 0, 0.02);
        /*padding: 0upx 40upx;*/
    }
</style>