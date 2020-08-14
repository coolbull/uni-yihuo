<template>
    <view class="wrap">
        <img src="../../static/ok.png" alt="">
        <view>{{success?'支付成功':'认证成功'}}</view>
    </view>
</template>

<script>
    export default {
        name: "success",
        props:{
            success:''
        }
    }
</script>

<style scoped lang="scss">

    .wrap{
        text-align: center;
        padding-top: 319upx;
        color: #666666;
        font-size: 30upx;
        img{
            width: 89upx;
            height: 89upx;
            margin-bottom: 29upx;
        }
    }
</style>