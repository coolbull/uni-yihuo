<template>
    <view>
        <view  class="margin40" v-for="item in lists" v-if="item.goods.goodsList.length>0">
            <view class="time">{{item.time}}</view>
            <goods-lists :goods="item.goods"></goods-lists>
        </view>
        <empty :prop="emptyform" v-if="lists.length==0"></empty>
    </view>
</template>

<script>
    import goodsLists from "../comp/goodsLists";
    import empty from "../comp/empty";
    export default {
        name: "historyList",
        components:{goodsLists,empty},
        data(){
            return{
                goods:{
                    num:2,
                    from:'his',
                    goodsList:[]
                },
                emptyform:'his',
                lists:[]
            }
        },
        onShow(){
            this.getmyhistory()
        },
        onPullDownRefresh() {
            this.getmyhistory()
            wx.stopPullDownRefresh();
        },
        methods:{
            async getmyhistory(){
                let res = await this.$api.getmyhistory({
                })

                if(res.data.code == 200){
                    var object = {},arr=[]
                    res.data.packagingHistoryList.forEach((a,b)=>{
                        if(a.lists.length>0){
                            a.lists.forEach((c,d)=>{
                                c.pCover = c.cover
                                c.pPricef = c.pPricef.toFixed(2)
                                c.pName = c.name
                            })
                            object = {
                                time:a.time,
                                goods:{
                                    num:2,
                                    from:'his',
                                    goodsList:a.lists
                                }

                            }
                            arr.push(object)
                        }
                    })
                    this.lists = arr
                    console.log(this.lists)
                }
            }
        }
    }
</script>

<style scoped>
    .time{
        text-align: center;
        color: #999999;
        margin-top: 20upx;
        margin-bottom: 20upx;
    }
</style>