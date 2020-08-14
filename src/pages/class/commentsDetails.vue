<template>
    <view @click="warp" >
        <view class="lists" v-for="item in commentList">
            <view class="lists_ava flex">
                <img :src="item.anonymous == '1' ? item.uPic : '../../static/goodsdetails/avactor.png'" alt="">
                <view>{{item.anonymous == '1'?item.uName:'匿名用户'}}</view>
            </view>
            <view class="lists_gra space-between">
                <view>
                    <img src="../../static/goodsdetails/star_has.png" alt="" v-for="item in item.eScore">
                    <img src="../../static/goodsdetails/star.png" alt="" v-for="item in 5-item.eScore">
                </view>
                <view>{{item.eTime}}</view>
            </view>
            <view class="lists_con">
                <view>
                    {{item.eComment}}
                </view>
<!--                <view class="lists_con_open">展开 </view>-->
            </view>
            <view class="lists_img ov" :style="item.ePic.length == 4 ? 'width:450rpx' : ''" v-if="item.ePic">
                <img :src="i" alt="" v-for="i in item.ePic" :style="item.ePic.length == 1 ? 'width:445rpx;height:445rpx' : 'width:216rpx;height:216rpx'"  @click="showimg(item,i)">
            </view>
<!--            <view class="space-between lists_shp">-->
<!--                <view>{{detailShop.pName}}</view>-->
<!--                <view @click.stop="reply(item)">-->
<!--                    <img src="../../static/goodsdetails/comment.png" alt="">-->
<!--                    回复-->
<!--                </view>-->
<!--            </view>-->
            <view class="lists_line">
                <img src="../../static/goodsdetails/line.png" alt="">
            </view>
            <view class="lists_commtxt">
                <view v-for="(i,index) in item.evaluatetSonList">
                    {{i.uName}}：{{i.esComment}}
                </view>
            </view>
            <view class="reply" v-if="focus" :style="keyheight">
                <view class="ov">
                    <input type="text" class="fl" placeholder="说点什么呗～" :focus="focus" v-model="replyCom" @focus="replyfocus"  :hold-keyboard="true" :adjust-position="false" >
                    <view class="fr" @click.stop="send">发送</view>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
    export default {
        name: "commentsDetails",
        data(){
            return{
                imgList:['','','','',''],
                focus:false,
                keyheight:'',
                height:0,
                commentList:[],
                detailShop:'',
                eId:'',
                replyCom:''
            }
        },
        onShow(){
            this.detailShop = global.detailShop
            this.getLists()
        },
        methods:{
            showimg(item,pic){
                const newArr = [];
                wx.previewImage({
                    urls: item.ePic,
                    current: pic
                })
            },
            reply(item){
                this.focus = true
                this.eId = item.eId
            },
            replyfocus(e){
                this.keyheight='bottom:'+e.detail.height+'px'
                this.height = e.detail.height
            },
            warpreply(){
              this.focus = true
            },
            async getLists(){
                let res = await this.$api.getevaluatets({
                    pId:this.detailShop.pid
                })
                if(res.data.code == 200){
                    res.data.evaluatets.forEach((a,b)=>{
                        if(a.ePic != ''){
                            a.ePic = a.ePic.split(',')
                        }else {
                            a.ePic = []
                        }

                    })

                    this.commentList = res.data.evaluatets
                }
            },
            warp(){
              this.focus = false
                this.replyCom = ''
            },
            async send(){
                // this.focus = true
                if(!global.isEmpty(this.replyCom)){
                    global.showToast('请输入回复内容')
                    return
                }
                // return
                let res = await this.$api.addcommentson({
                    eId:this.eId,
                    esComment:this.replyCom
                })

                if(res.data.code == 200){
                    global.showToast('回复评论成功')
                    this.focus = false
                    this.getLists()
                    this.replyCom = ''

                }

            }
        }


    }
</script>

<style scoped lang="scss">
    .lists{
        background:rgba(255,255,255,1);
        border-radius:20upx;
        padding: 30upx 40upx;
        color: #333333;
        font-size: 24upx;
        margin-top: 20upx;
        &_ava{
            margin-bottom: 30upx;
            img{
                width: 60upx;
                height: 60upx;
                border-radius: 50%;
                margin-right: 10upx;
            }
            view{
                /*display: inline-block;*/
                height: 60upx;
                line-height: 60upx;
            }
        }
        &_gra{
            color: #999999;
            font-size: 18upx;
            margin-bottom: 27upx;
            img{
                width: 20upx;
                height: 20upx;
                margin-right: 8upx;
            }

        }
        &_con{
            font-size: 28upx;
            margin-bottom: 20upx;
            &_open{
                margin-top: 15upx;
                font-size: 20upx;
                font-weight:bold;
            }
        }
        &_img{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-bottom: 20upx;
            img{
                width: 216upx;
                height: 216upx;
                background: red;
                margin-bottom: 10upx;
                float: left;
            }
        }
        &_img:after{
            content:"";
            display:block;
            width:216upx;
        }
        &_shp{
            padding-bottom: 20upx;
            color: #999999;
            font-size: 20upx;
            img{
                width: 23upx;
                height: 20upx;
                margin-right: 10upx;
                position: relative;
                top: 5upx;
            }
        }
        &_commtxt{
            color: #999999;
            >view{
                margin-bottom: 16upx;
            }
            >view:last-child{
                margin-bottom: 0upx;
            }
        }
        &_line{
            margin-bottom: 16upx;
            img{
                width: 100%;
                height: 10upx;
            }
        }
    }
    .reply{
        width: 750upx;
        height: 80upx;
        background: rgba(241,241,241,1);
        padding: 15upx 40upx;
        position: fixed;
        bottom: 0upx;
        left: 0upx;
        /*padding-bottom: env(safe-area-inset-bottom);*/
        >view{
            border-radius: 25upx;
            background: white;
            overflow: hidden;
            /*position: relative;*/
            >view{
                width:83upx;
                height:50upx;
                background:linear-gradient(-30deg,rgba(246,30,69,1),rgba(253,68,95,1));
                border-radius:25upx;
                font-size:22upx;
                color:rgba(255,255,255,1);
                text-align: center;
                line-height: 50upx;
            }
        }
        input{
            width: 580upx;
            padding-left: 33upx;
            box-sizing: border-box;
            color: #999999;
            height: 21upx;
            background: white;
        }

    }
</style>