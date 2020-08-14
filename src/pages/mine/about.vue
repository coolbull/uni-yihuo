<template>
    <view class="ar">
        <view class="ar_t">
            <img src="../../static/tou.jpeg" alt="">
            <text>驿货</text>
        </view>
        <view class="ar_c">
            “驿货”平台是云易宿（北京）文旅科技有限公司（下称“云易宿”）旗下，以经营各地土特产、民宿中所使用智能设备为主的商城平台。
        </view>
        <view class="ar_c">
            游客在与云易宿合作的民宿住宿期间，可以在房间中体验到各种实用的智能家居产品，民宿即是智能家居设备的体验馆。
        </view>
        <view class="ar_c">
            云易宿平台通过官方的渠道，与各民宿所在地的乡镇企业合作土特产产品，让游客放心地购买到可追溯生产源头的高性价比产品。线下体验，线上购买，快递直接配送至家，来去轻松，既能买到放心、地道的土特产品，又省去回程的负担。
        </view>
        <view class="ar_c">
            同时，所有使用驿货平台的民宿主，都会自动成为驿货平台的分销商，游客在房间内通过扫描民宿主身份二维码的方式进入平台中，期间所有的消费，民宿主都会参与分成，极大地拓宽了民宿主的“副业”收入。
        </view>
        <view class="ar_c">
            我们的愿景即是“将每一间民宿都变成小型卖场”，盘活民宿多维消费，协助民宿主更快地成本回收，以及盈利目标。
        </view>
    </view>
</template>

<script>
    export default {
        name: "about"
    }
</script>

<style scoped lang="scss">
    .ar{
        margin-top: 40upx;
        padding: 40upx;
        img{
            width: 50upx;
            height: 50upx;
            margin-right: 20upx;
            border-radius: 50%;
        }
        &_t{
            color: #F61E45;
            font-size: 30upx;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20upx;
            text{
                position: relative;
                top: -12upx;
            }
        }
        &_c{
            font-size: 24upx;
            color: #333333;
            text-indent: 48upx;
            margin-bottom: 20upx;
        }
    }

</style>