<template>
    <view style="background: #ffffff;overflow: hidden;width: 100%;height: 100vh;">
        <view class="search ov">
            <view class="search_wr flex fl"  @click="search">
                <img src="../../static/search.png" alt="">
                <view style="color:#fefefe;padding-top: 15rpx" class="fl">点击搜索产品信息</view>
<!--                <input type="text" placeholder="点击搜索产品信息" placeholder-style='color:#fefefe' @click="search" v-model="seaechpname" :focus="false">-->
            </view>
<!--            <view class="search_del fr">取消</view>-->
        </view>
        <view class="content flex">
            <view class="menu">
                <view v-for="(item,index) in menu" :class="menuCid == item.cId?'active':''" @click="menuchange(item)">
                    <text v-if="menuCid == item.cId" class="line"></text>
                    <text class="tx">{{item.cType}}</text>
                </view>
            </view>
            <view class="lists">
                <view class="lists_to space-between">
                    <text class="lists_to_tot">共{{goods.goodsList.length}}件商品</text>
<!--                    <view>-->
<!--                        全部类型-->
<!--                        <img src="../../static/arrow_bottom.png" alt="">-->
<!--                    </view>-->
                </view>
                <view style="">
                    <scroll-view scroll-y="true" style="height: 80vh;">
                        <best-lists :goods="goods"></best-lists>
                    </scroll-view>

                </view>
            </view>
        </view>
<!--        <wx-auth :isshow="wxAuth" @changeshow="wxisshow"></wx-auth>-->
<!--        <view class="tologin" @click="tologin" v-if="showlogin"></view>-->
        <tab-bar :current="currentTabIndex"  :ushopkeeper="uShopkeeper" ></tab-bar>
    </view>
</template>

<script>
    import bestLists from "../comp/bestLists";
    import wxAuth from '../comp/wxAuth'
    export default {
        name: "index",
        components:{bestLists,wxAuth},
        data(){
            return{
                menu:['全部','居家智能','智能精品','礼盒系列','智控精灵'],
                active:0,
                show:false,
                menuCid:'',
                goods:{
                    from:'class',
                    show:false,
                    goodsList:[],
                    active:0
                },
                seaechpname:'',
                wxAuth:{
                    show:false,
                    islogin:false,
                    isphone:false
                },
                uShopkeeper:1,
                showlogin:false,
                currentTabIndex:1
            }
        },
        onLoad(options){
            // console.log(options)
            if(options.cId){
                this.cId = options.cId
            }
            this.getClassgoodsList()
        },
        onShow(){
            wx.hideTabBar()
                    this.getClassmenulist()

            var userInfo = uni.getStorageSync('userInfo')
            var userphone = uni.getStorageSync('uPhone')
            if(userInfo){
                this.userInfo = userInfo
                if(!userphone){
                    this.showlogin = true
                    this.wxAuth.isphone = true
                }
            }else {
                this.showlogin = true
                this.wxAuth.islogin = true
            }
            var uShopkeeper = uni.getStorageSync('uShopkeeper')
            this.uShopkeeper = uShopkeeper

        },
        onPullDownRefresh() {
            this.getClassgoodsList()
            wx.stopPullDownRefresh();
        },
        methods:{
            // tabClick(index){
            //     this.currentTabIndex = index
            //     // this.uShopkeeper = uni.getStorageSync('uShopkeeper')
            // },
            tologin(){
                var userInfo = uni.getStorageSync('userInfo')
                var userphone = uni.getStorageSync('uPhone')
                if(userInfo&&userphone){
                    this.showlogin = false
                }else {
                    this.wxAuth.show = true
                }

            },
            wxisshow(res){
                if(!res.isphone && !res.islogin){
                    this.showlogin = false
                }
                this.wxAuth = res
            },
            async getClassmenulist(){
                let res = await this.$api.getClassmenulist({})
                if(res.data.code==200){
                    this.menu = res.data.datalist

                    if(global.menuactive){
                        this.menuCid = global.menuactive
                        this.goods.active = global.menuactive
                    }else {
                        this.menuCid = this.cId ? this.cId :res.data.datalist[0].cId
                         this.goods.active = this.menuCid

                    }

                    this.getClassgoodsList()
                }
            },
            async getClassgoodsList(){
                let res = await this.$api.getClassgoodsList({
                    cid:this.menuCid
                })
                if(res.data.code == 200){
                    res.data.datalist.forEach((a,b)=>{
                        a.pimagetext = a.pCover
                        a.pname = a.pName
                        a.pprice = a.pPrice.toFixed(2)
                        a.pPricef = a.pPricef.toFixed(2)
                        a.pGrade = Math.round(a.pGrade)
                    })
                    this.goods.goodsList = res.data.datalist
                }
            },
            menuchange(item){

                this.menuCid = item.cId
                this.goods.active = this.menuCid
                this.getClassgoodsList()
            },
            search(){
                uni.navigateTo({
                    url:'/pages/index/searchList'
                })
            }


        }
    }
</script>

<style scoped lang="scss">
    .search{
        width: 100%;
        border-right: 32upx;
        padding: 10upx 25upx;
        background: #f82b4e;
        color: #ffffff;
        position: fixed;
        top: 0upx;
        img{
            width: 25upx;
            height: 25upx;
            margin: 19upx 13upx 19upx 29upx;
        }
        &_wr{
            background:rgba(255,255,255,0.2);
            box-shadow:0px 2px 7px 0px rgba(0, 0, 0, 0.15);
            border-radius: 32upx;
            width: 100%;
        }
        input{
            height: 63upx;
            width: 100%;
        }
        &_del{
            font-size: 29upx;
            height: 63upx;
            line-height: 63upx;
        }
    }
    .content{
        .menu{
            width: 180upx;
            margin-top: 86upx;

            background: #f8f6f7;
            >view{
                padding-left: 38upx;
                height: 84upx;
                line-height: 84upx;
                .line{
                    display: inline-block;
                    width: 5upx;
                    height:30upx;
                    background:linear-gradient(-30deg,rgba(246,30,69,1),rgba(253,68,95,1));
                    margin-right: 33upx;
                    position: relative;
                    top: 5upx;
                }
                .tx{
                    display: inline-block;
                    height: 5upx;
                    line-height: 5upx;
                    color: #666666;
                    font-size: 26upx;

                }
            }
            >view.active{
                background: white;
                padding-left: 0upx;
                .tx{
                    font-weight: bold;
                    font-size: 30upx;
                    color: #333333;

                }
            }
        }
        .lists{
            width: 571upx;
            padding: 33upx 0upx 33upx 0upx;
            margin-top: 86upx;
            &_to{
                padding: 0upx 35upx 0upx 20upx;
                /*margin-bottom: 20upx;*/
                img{
                    width: 17upx;
                    height: 11upx;
                    margin-left: 9upx;
                    position: relative;
                    top: -2upx;
                }
                &_tot{
                    font-size: 20upx;
                    color: #999999;
                }
                view{
                    font-size: 24upx;
                    color: #222222;
                }
            }
        }
    }
</style>