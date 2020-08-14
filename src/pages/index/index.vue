<template>
    <view class="box" style="padding-bottom: calc(100rpx + env(safe-area-inset-bottom));">

        <view class="" >
            <!--		搜索框-->
            <view class="search flex margin40" @click="search">
                <text>{{city}}</text>
                <view class="flex">
                    <img src="../../static/search.png" alt="">
                    <view style="color:rgba(255,255,255,0.6);margin-left: 10upx;position:relative;top: -5rpx">智控精灵</view>
<!--                    <input type="text" placeholder="智控精灵" placeholder-style='color:rgba(255,255,255,0.6)' :focus="false">-->
                </view>
            </view>
            <!--			轮播图-->
            <view class="page-section page-section-spacing swiper margin40" style="z-index: 999">
                <view style="border-radius: 20rpx;overflow: hidden;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0, 0, 0);box-shadow:0px 4px 7px 0px rgba(252,78,95,0.15);">
                    <swiper autoplay circular style="height: 308rpx !important;" @animationfinish="swiperChange">
                        <block v-for="(item ,index) in bannerList">
                            <swiper-item @click="todetails(item)"  >
                                <img :src="item.sPicurl" alt="" class="img">
                            </swiper-item>
                        </block>
                    </swiper>
                </view>

                <!--重置小圆点的样式 -->
                <view class="dots">
                    <block v-for="(item ,index) in bannerList">
                        <view :class="index == currentSwiper ? 'active' : ''"></view>
                    </block>
                </view>
            </view>
            <!--			菜单-->
            <view class="menu space-between">
                <view @click="toNextPage('zkBestLists')">
                    <img src="../../static/index_icon_1.png" alt="">
                    <view>智控优选</view>
                </view>
                <view  @click="toNextPage('hotLists')">
                    <img src="../../static/index_icon_2.png" alt="">
                    <view>鼠年爆款</view>
                </view>
                <view  @click="toNextPage('userBestLists')">
                    <img src="../../static/index_icon_3.png" alt="">
                    <view>口碑之选</view>
                </view>
                <view @click="toNextPage('perfectLists')">
                    <img src="../../static/index_icon_4.png" alt="">
                    <view>超值优惠</view>
                </view>
                <view @click="toNextPage('brandWall')">
                    <img src="../../static/index_icon_5.png" alt="">
                    <view>品牌墙</view>
                </view>
            </view>
            <!--			广告-->
            <view class="adversting" @click="toNextPage('saleLists')">
                <img src="https://bj-yys.oss-cn-beijing.aliyuncs.com/yihuo/zhehsangzhe.png" alt="">
            </view>
            <!--			商品列表-->
            <view class="margin40 goodsList">
                <view class="title space-between">
                    <view class="left">
                        <img src="../../static/menu_icon.png" alt="" class="icon1">
                        <text>精品推荐</text>
                    </view>
                    <view class="more" @click="toNextPage('highGoodsList')">
                        <text>更多</text>
                        <img src="../../static/arrow_right.png" alt="" class="arrow">
                    </view>
                </view>
                <goods-lists :goods="recomList"></goods-lists>
                <view v-if="recomList.goodsList.length == 0" class="none">暂无精品推荐商品～</view>
            </view>
            <view class="margin40 goodsList">
                <view class="title space-between">
                    <view class="left">
                        <img src="../../static/menu_icon.png" alt="" class="icon1">
                        <text>最新产品</text>
                    </view>
                    <view class="more" @click="toNextPage('newGoodsList')">
                        <text>更多</text>
                        <img src="../../static/arrow_right.png" alt="" class="arrow">
                    </view>
                </view>
                <goods-lists :goods="newList"></goods-lists>
                <view v-if="newList.goodsList.length == 0" class="none">暂无最新商品～</view>
            </view>
        </view>
        <view class="background" :style="isscroll ? 'position:absolute' : 'position:fixed'">
            <img src="../../static/background.png" alt="">
        </view>
<!--        <wx-auth :isshow="wxAuth" @changeshow="wxisshow" @ushopkeeper="shopkeeper"></wx-auth>-->
<!--        <view class="tologin" @click="tologin" v-if="showlogin"></view>-->
        <tab-bar :current="currentTabIndex" :ushopkeeper="uShopkeeper"  ></tab-bar>
    </view>
</template>

<script>
	import goodsLists from '../comp/goodsLists'
    import QQMapWX from  '../../plugin/qqmap-wx-jssdk'
    import wxAuth from '../comp/wxAuth'
    var qqmapsdk;
    export default {
        components:{goodsLists,wxAuth},
        data() {
            return {

                title: 'Hello',
                bannerList: [],
                currentSwiper: 0,
                currentTabIndex: 0,
                recomList:{
                    num:1,
                    from:'index',
                    goodsList:[]
                },
                newList:{
                    num:1,
                    from:'index',
                    goodsList:[]
                },
                city:'',
                showlogin:false,
                wxAuth:{
                    show:false,
                    islogin:false,
                    isphone:false
                },
                uShopkeeper:1,
                isscroll:false
            }

        },

        onLoad() {
            qqmapsdk = new QQMapWX({
                key: 'MELBZ-HKUKW-SRPRV-RIPUX-ZC3TE-33BCQ' //这里自己的key秘钥进行填充
            });
        },
        onPageScroll:function(e){
            if(e.scrollTop<0){
                this.isscroll = false
               }else {
                this.isscroll = true
            }
         },
        onShow(){
            wx.hideTabBar()
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
            this.Slideshow()
            this.productDetailsRecommendAll()
            this.productDetailsNewestAll()
            this.getUserLocation()
            setTimeout(()=>{
                var uShopkeeper = uni.getStorageSync('uShopkeeper')
                this.uShopkeeper = uShopkeeper
                console.log(this.uShopkeeper)
            },1000)

        },
        onShareAppMessage: function (res) {
            return {
                title: '品质分享 驿货百应',
                path: '/pages/index/index',
                success: function (res) {
                },
                fail: function (res) {
                }
            }
        },
        methods: {
            todetails(item){
                uni.navigateTo({
                    url:'/pages/class/goodsDetails?pid=' + item.oId
                })
            },
            tabClick(index){
                this.currentTabIndex = index
                this.uShopkeeper = uni.getStorageSync('uShopkeeper')
            },
            tologin(){
                this.wxAuth.show = true
            },
            wxisshow(res){
                if(!res.isphone && !res.islogin){
                    this.showlogin = false
                }
                this.wxAuth = res
            },
            search(){
              uni.navigateTo({
                  url:'/pages/index/searchList'
              })
            },
            getUserLocation: function () {
                let vm = this;
                wx.getSetting({
                    success: (res) => {
                        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
                            wx.showModal({
                                title: '请求授权当前位置',
                                content: '需要获取您的地理位置，请确认授权',
                                success: function (res) {
                                    if (res.cancel) {
                                        wx.showToast({
                                            title: '拒绝授权',
                                            icon: 'none',
                                            duration: 1000
                                        })
                                    } else if (res.confirm) {
                                        wx.openSetting({
                                            success: function (dataAu) {
                                                if (dataAu.authSetting["scope.userLocation"] == true) {
                                                    wx.showToast({
                                                        title: '授权成功',
                                                        icon: 'success',
                                                        duration: 1000
                                                    })
                                                    //再次授权，调用wx.getLocation的API
                                                    vm.getLocation();
                                                } else {
                                                    wx.showToast({
                                                        title: '授权失败',
                                                        icon: 'none',
                                                        duration: 1000
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        } else if (res.authSetting['scope.userLocation'] == undefined) {
                            //调用wx.getLocation的API
                            vm.getLocation();
                        }
                        else {
                            //调用wx.getLocation的API
                            vm.getLocation();
                        }
                    }
                })
            },
// 微信获得经纬度
            getLocation: function () {
                let vm = this;
                wx.getLocation({
                    type: 'wgs84',
                    success: function (res) {
                        var latitude = res.latitude
                        var longitude = res.longitude
                        var speed = res.speed
                        var accuracy = res.accuracy;
                        vm.getLocal(latitude, longitude)
                    },
                    fail: function (res) {
                    }
                })
            },
            // 获取当前地理位置
            getLocal: function (latitude, longitude) {
                let vm = this;
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: latitude,
                        longitude: longitude
                    },
                    success: function (res) {
                        let district = res.result.ad_info.district
                        let city = res.result.ad_info.city
                        vm.city = city
                        uni.setStorageSync('city',res.result.ad_info.city)
                        uni.setStorageSync('district',res.result.ad_info.district)
                    },
                    fail: function (res) {
                    },
                    complete: function (res) {
                    }
                });
            },
            async Slideshow(){
                let res = await this.$api.Slideshow({})
                if(res.data.code = 200){
                    this.bannerList = res.data.slideshows
                }
            },
            async productDetailsRecommendAll(){
                let res = await this.$api.productDetailsRecommendAll({})
                if(res.data.code == 200){
                    res.data.productDetails.forEach((a,b)=>{
                        a.pimagetext = a.pCover
                        a.pname = a.pName
                        a.pPrice = a.pPrice.toFixed(2)
                        a.pPricef = a.pPricef.toFixed(2)
                        a.pGrade = Math.round(a.pGrade)
                    })
                    this.recomList.goodsList = res.data.productDetails.slice(0,4)
                    this.recomList.goodsList.slice(0,1)
                    this.recomList.isreco = true
                }
            },
            async productDetailsNewestAll(){
                let res = await this.$api.productDetailsNewestAll({})
                if(res.data.code == 200){
                    res.data.productDetails.forEach((a,b)=>{
                        a.pimagetext = a.pCover
                        a.pPrice = a.pPrice.toFixed(2)
                        a.pPricef = a.pPricef.toFixed(2)
                    })
                    this.newList.goodsList = res.data.productDetails.slice(0,4)
                }
            },
            swiperChange(e) {
                this.currentSwiper = e.detail.current
            },
            toNextPage(url){
                uni.navigateTo({url:'/pages/index/'+url})
            }
        }
    }
</script>

<style scoped lang="scss">
    page{
        padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
    }
    .background {
        width: 100%;
        /*position: fixed;*/
        top: 0px;
        z-index: -1;

        img {
            width: 100%;
            height: 1004upx;
        }
    }

    .search {
        /*width: 100%;*/
        height: 63upx;
        /*line-height: 63upx;*/
        padding: 20upx 30upx;
        background: rgba(255, 255, 255, 0.2);
        /*opacity: 0.2;*/
        border-radius: 32upx;
        box-shadow: 0px 2upx 5upx 0upx rgba(0, 0, 0, 0.15);
        color: #fff;
        font-size: 24upx;
        margin-bottom: 28upx;

        img {
            /*margin-top: 20upx;*/
            width: 25upx;
            height: 25upx;
        }

        text {
            /*margin-top: 20upx;*/
            display: inline-block;
            padding-right: 20upx;
            height: 25upx;
            line-height: 25upx;
            border-right: 1px solid rgba(255, 255, 255, 0.5);
            margin-right: 20upx;
        }

        input {
            margin-left: 23upx;
            position: relative;
            top: -8upx;
            color: #fff;
        }

    }

    .swiper {
        /*width: 100%;*/
        height: 308upx;
        /*border-radius: 20upx;*/
        /*overflow: hidden;*/
        .img {
            width: 100%;
            height: 100%;
            /*border-radius: 20upx;*/
            /*box-shadow:0px 4px 7px 0px rgba(252,78,95,0.15);*/
        }
    }

    .dots {
        display: flex;
        justify-content: center;
        margin-top: 14upx;
        margin-bottom: 13upx;

        view {
            width: 20upx;
            height: 6upx;
            background: #d8d8d8;
            border-radius: 20upx;
            margin-right: 2upx;
        }

        .active {
            background: #fc4e5f;
        }
    }

    .menu {
        margin: 25upx 46upx;

        img {
            width: 134upx;
            height: 134upx;
        }

        > view {
            width: 134upx;
            text-align: center;
            color: #333333;
        }
    }

    .adversting {
        margin: 0upx 17upx 16upx 0upx;

        img {
            width: 100%;
            height: 195upx;
        }
    }

    .goodsList {
        margin-bottom: 39upx;
        .title {

            .icon1 {
                width: 9upx;
                height: 21upx;
                margin-right: 21upx;
            }

            .arrow {
                width: 11upx;
                height: 20upx;
                margin-left: 12upx;
            }

            .left {
                font-size: 30upx;
                color: #333333;
            }

            .more {
                font-size: 24upx;
                color: #999999;
                position: relative;
                top: 5upx;
            }
        }
    }
    .none{
        color: #666666;
        text-align: center;

    }
</style>
