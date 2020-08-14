<template>
    <view class="page">
        <view class="searchw">
            <view class="search margin40 align-center">
                <img src="../../static/searchin.png" alt="">
                <input type="text" placeholder="搜索" v-model="searchname" @input="search">
            </view>
        </view>

        <view class="lists margin40">
            <view class="space-between" v-for="item in managerList" @click="todetails(item)">
                <view class="align-center">
                    <img :src="item.uPic" alt="" class="lists_ava" >
                    {{item.uName}}
                </view>
                <view v-if="item.productDetails.length>0">
                    <img :src="item.productDetails[0].pCover" alt=""class="lists_ava">
                    <img :src="item.productDetails[1].pCover" alt="" v-if="item.productDetails[1].pCover">
                </view>
            </view>

        </view>
        <empty :prop="empty" v-if="managerList.length==0"></empty>
    </view>
</template>

<script>
    import empty from "../comp/empty";
    export default {
        name: "brandWall",
        components:{empty},
        data(){
            return{
                managerList:[],
                searchname:'',
                empty:'ball'
            }
        },
        onShow(){
            this.getManagerUserAll()
        },
        methods:{
            search(){
              this.getManagerUserAll()
            },
            async getManagerUserAll(){
                let res = await this.$api.getManagerUserAll({
                    uName:this.searchname
                })
                if(res.data.code == 200){
                    this.managerList = res.data.list
                }
            },
            todetails(item){

                var status = uni.getMenuButtonBoundingClientRect()
                global.muId = item.muId
                global.navigateHeight = status
                uni.navigateTo({
                    url:`/pages/index/next/brandDetails?muId=${item.muId}`
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    /*.page {*/
    /*    background-color: #fff;*/
    /*    padding-top: 20upx;*/
    /*    min-height: 100vh;*/
    /*}*/
    .search{
        background:rgba(244,242,242,1);
        box-shadow:0px 2px 5px 0px rgba(0, 0, 0, 0.15);
        border-radius:32upx;
        padding: 0upx 30upx;
        height: 63upx;

        /*line-height: 63upx;*/
        img{
            width: 25upx;
            height: 25upx;
            margin-right: 15upx;
            position: relative;
            top: -3upx;
        }
    }
    .searchw{
        background: white;
        box-shadow:0px 4px 20px 0px rgba(0, 0, 0, 0.02);
        padding: 10upx 0upx;
        margin-bottom: 30upx;
    }
    .lists{
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius:5upx;
        padding: 0upx 30upx;
        font-size: 30upx;
        >view{
            padding: 40upx 0upx;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        >view:last-child{
            border-bottom: none;
        }
        img{
            width: 100upx;
            height: 100upx;
            /*background: black;*/
        }
        &_ava{
            margin-right: 20upx;
        }
    }
</style>