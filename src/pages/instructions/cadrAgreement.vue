<template>
    <view>
        <view class="areaLi">
            <view class="title">
                个人身份证认证同意书
            </view>
            <view class="content">
                1、用户使用平台、参与平台活动须提供实名认证，平台使用用户的身份证，仅仅作为，本平台的身份认证使用；
            </view>
            <view class="content">
                2、用户注册平台用户时已经阅读并同意身份证的认证，用户须对自身在本平台的活动进行全劝负责，对咨询、邀请工程师现场服务，以及服务所生产的费用均须自行和工程师商议协商一致，用户承担费用；
            </view>
            <view class="content">
                3、本平台进行了身份认证了的用户均视为同意平台认证使用您的身份证进行平台的身份确认。
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "cadrAgreement"
    }
</script>

<style scoped lang="scss">
    .areaLi{
        font-size: 26upx;
    }
    .title{
        font-weight: bold;
        margin-bottom: 40upx;
        text-align: center;
    }
    .content{
        font-weight: 300;
        margin-bottom: 20upx;
        text-indent: 48upx;
    }
</style>