<template>
    <view>
        <view class="listsw margin40">
            <view class="lists" v-for="item in lists" @click="choosegoods(item)">
                <img :src="item.pCover" alt="">
                <view class="lists_t">{{item.pName}}</view>
                <view class="lists_p">
                    <text>￥</text>{{item.pPricef}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "chooseGoods",
        data(){
            return{
                lists:''
            }
        },
        onLoad(options){
            this.current = options.current
            this.index = options.index ? options.index : null
        },
        onShow(){
            this.lists = global.manageDetails.goodsList
        },
        methods:{
            choosegoods(item){
                global.manageChooseGoods = item
                global.manageCurrent = this.current
                global.manageFourIndex = this.index
                uni.navigateBack({
                    delta:1
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .listsw{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 20upx;
    }
    .listsw:after{
        content:"";
        display:block;
        width:214upx;
    }
    .lists{
        width: 214upx;
        height: 326upx;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius:23upx 14upx 14upx 14upx;
        padding: 25upx 20upx 30upx 13upx;
        margin-bottom: 10upx;
        /*margin-right: 8upx;*/
        img{
            width: 184upx;
            height: 175upx;
            margin-bottom: 22upx;
        }
        &_t{
            font-size: 16upx;
            color: #333333;
            margin-bottom: 27upx;
            width: 183upx;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        &_p{
            font-size: 24upx;
            color: #F61E45;
            font-weight: bold;
            text{
                font-size: 15upx;
            }
        }
    }
</style>