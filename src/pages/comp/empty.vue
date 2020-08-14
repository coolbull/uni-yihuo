<template>
    <view class="wrap">
        <view class="addr"  v-if="prop == 'addr'">
            <img src="../../static/empty/none_addr.png" alt="">
            <view class="tips">您还没有收货地址哦～</view>
        </view>
        <view class="his"  v-if="prop == 'his'">
            <img src="../../static/empty/none_his.png" alt="">
            <view class="tips">暂无历史记录哦～</view>
        </view>
        <view class="money"  v-if="prop == 'money'">
            <view class="tips">暂无提现记录哦～</view>
        </view>
        <view class="mine"  v-if="prop == 'mine'">
            <img src="../../static/empty/none_myorder.png" alt="">
            <view class="tips">暂无订单哦～</view>
        </view>
        <view class="collect"  v-if="prop == 'collect'">
            <img src="../../static/empty/none_collec.png" alt="">
            <view class="tips">您还没有收藏，快去逛逛吧～</view>
        </view>
        <view class="order"  v-if="prop == 'order'">
            <img src="../../static/empty/none_order.png" alt="">
            <view class="tips">暂无订单哦～</view>
        </view>
        <view class="search"  v-if="prop == 'search'">
            <img src="../../static/empty/none_search.png" alt="">
            <view class="tips">暂无相符商品，建议您换个词试试哦~</view>
        </view>
        <view class="search"  v-if="prop == 'manage'">
            <img src="../../static/empty/none_search.png" alt="">
            <view class="tips">该商家暂无商品~</view>
        </view>
        <view class="search"  v-if="prop == 'ball'">
            <img src="../../static/empty/none_search.png" alt="">
            <view class="tips">暂无店铺~</view>
        </view>
        <view class="shop"  v-if="prop == 'shop'">
            <img src="../../static/empty/shop.png" alt="">
            <view class="tips">暂时还没有商品，赶快去逛逛吧~</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "empty",
        props:{
            prop:String
        }
    }
</script>

<style scoped lang="scss">
    .wrap>view {
        text-align: center;
    }
    .tips{
        font-size:30upx;
        color:rgba(102,102,102,1);
        margin-top: 34upx;
    }
    .addr{
        margin-top: 179upx;
        >img{
            width: 517upx;
            height: 368upx;
        }
    }
    .his{
        margin-top: 178upx;
        img{
            width: 628upx;
            height: 482upx;
        }
        .tips{
            position: relative;
            bottom: 130upx;
        }
    }
    .money{
        margin-top: 102upx;
    }
    .mine{
        margin-top: 65upx;
        img{
            width: 602upx;
            height: 420upx;
        }
    }
    .collect{
        margin-top: 160upx;
        img{
            width: 409upx;
            height: 368upx;
        }

    }
    .order{
        margin-top: 94upx;
        img{
            width: 568upx;
            height: 400upx;
        }
        .tips{
            position: relative;
            bottom: 100upx;
        }
    }
    .search{
        margin-top: 72upx;
        img{
            width: 418upx;
            height: 338upx;
        }
    }
    .shop{
        margin-top: 130upx;
        img{
            width: 371upx;
            height: 403upx;
        }
    }

</style>