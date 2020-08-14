<template>
    <view class="wrap">
        <view class="addrList" >
            <uni-swipe-action>
                <uni-swipe-action-item v-for="(item,index) in swipeList" :options="item.options" :key="item.id" @change="swipeChange" @click="swipeClick(item,index)">
                    <view class="addrList_con" @click="chooseAddr(index)">
                        <view class="addrList_con_to">
                            <text class="addrList_name">{{item.sname}}&nbsp;{{item.sphone}}</text>
                            <text class="label" v-if="item.status == '2'">默认</text>
                            <text class="label" style="background: #4a6cfc" v-if="item.slabel">{{item.slabel}}</text>
                        </view>
                        <view class="addrList_con_txt ov">
                            <text class="fl">{{item.pname}}{{item.cname}}{{item.aname}}{{item.saddress}}</text>
                            <view class="editwr" @click.stop="editaddr(index)">
                                <img src="../../static/mine/edit.png" alt="" class="edit fr" >
                            </view>

                        </view>
                    </view>
                </uni-swipe-action-item>
            </uni-swipe-action>
        </view>
        <view v-if="swipeList.length==0">
            <empty :prop="emptyfrom"></empty>
        </view>

        <view class="add">
            <button class="button" @click="addaddress">
                <img src="../../static/mine/add.png" alt="">
                新增收货地址
            </button>
        </view>
    </view>
</template>

<script>
    import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
    import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
    import empty from '../comp/empty'
    export default {
        name: "shipAddress",
        components: {
            uniSwipeAction,
            uniSwipeActionItem,
            empty
        },
        data() {
            return {
                isOpened: false,
                addrList:[],
                swipeList: [],
                emptyfrom:'addr'
            }
        },
        onShow(){
            this.selShoppingAddress()
        },
        onReady() {
            this.$nextTick(() => {
                this.isOpened = true
            })

        },
        methods: {
            chooseAddr(item){
                if(global.isChooseAddr){
                    global.defaultAddr = this.swipeList[item]
                    wx.navigateBack({   //然后返回上一个页面
                        delta: 1
                    })
                    // uni.redirectTo({
                    //     url:'/pages/class/submitOrder'
                    // })
                }
            },
            async selShoppingAddress(){
                let res = await this.$api.selShoppingAddress({
                })

                if(res.data.code == 200){
                    res.data.datalist.forEach((a,b)=>{
                        a.options = [{
                            text: '删除',
                            style: {
                                backgroundColor: 'rgb(255,58,49)'
                            }
                        }]
                    })
                    this.swipeList = res.data.datalist
                }
            },
            editaddr(item){
                uni.navigateTo({
                    url:'/pages/mine/nextPage/addAddress?isAdd=2'
                })
                global.defaultSddress = this.swipeList[item]
            },
            addaddress(){
                uni.navigateTo({
                    url:'/pages/mine/nextPage/addAddress?isAdd=1'
                })
            },
            change(e) {
                this.isOpened = e
            },
            swipeChange(e) {
            },
            swipeClick(item, index) {
                // if (content.text === '删除') {
                    uni.showModal({
                        title: '提示',
                        content: '是否删除',
                        success: (res) => {
                            if (res.confirm) {
                                this.DelShoppingAddress(item.sid)
                            } else if (res.cancel) {
                            }
                        }
                    });
                // }

            },
            async DelShoppingAddress(sId){
                let res = await this.$api.DelShoppingAddress({
                    sId:sId
                })
                if(res.data.code == 200){
                   global.showToast('删除成功')
                    this.selShoppingAddress()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .label{
        position: relative;
        top: -7upx;
    }
    .add{
        position: fixed;
        bottom: 40upx;
        padding: 0upx 40upx;
        width: 100%;
    }
    .button{

        width: 100%;
        font-size: 36upx;
        img{
            width: 31upx;
            height: 31upx;
            margin-right: 18upx;
        }
    }
    .edit{
        width: 29upx;
        height: 25upx;
    }
    .delete{
        width: 143upx;
        /*height: 143upx;*/
        text-align: center;
        /*line-height: 143upx;*/
        color: white;
        font-size: 26upx;
        background:linear-gradient(-30deg,rgba(246,30,69,1),rgba(253,68,95,1));
        border-radius:20upx 0px 0px 20upx;
        box-shadow:0px 2upx 25upx 0px rgba(251,88,103,0.46);
    }
    .wrap{
        height: 100vh;
        overflow-x: scroll;
    }
    .addrList{
        background:rgba(255,255,255,1);
        box-shadow:0px 3upx 8upx 0px rgba(0, 0, 0, 0.08);
        border-radius:20upx;
        margin-top: 11upx;

        &_con{
            width: 100%;
            padding: 27upx 30upx 30upx 42upx;
            position: relative;
            &_to{
                margin-bottom: 32upx;
            }
            &_txt{
                color: #666666;
                font-size: 24upx;
            }
        }
        &_name{
            color: #333333;
            font-size: 32upx;
            font-weight: bold;
            padding-right: 10upx;
        }
    }
    .editwr{
        position: absolute;
        right: 0upx;
        bottom: 0upx;
        height: 100%;
        display: flex;
        width: 150upx;
        justify-content: center;
        align-items: center;
    }
</style>