<template>
    <view class="wrap">
        <view class="contactmess">
            <view class="space-between">
                <view class="flex">
                    <text>收货人</text>
                    <input type="text" placeholder="请填写收货人姓名" placeholder-style='color:#999' v-model="formData.sname" maxlength="20">
                </view>
<!--                <view class="addcontact" @click="addphonecancat">-->
<!--                    <img src="../../../static/addcontact.png" alt="" >-->
<!--                </view>-->

            </view>
            <view class="flex">
                <text>手机号码</text>
                <input type="number" placeholder="请填写收货人手机号" v-model="formData.sphone" maxlength="11">
            </view>
            <view  class="flex">
                <text>所在地区</text>
                <picker mode="region" @change="bindRegionChange" :value="region" class="picker">
                    <view class="picker">
                        {{formData.pname}} {{formData.cname}} {{formData.aname}}
                    </view>
                </picker>
            </view>
            <view class="flex">
                <text>收货地址</text>
                <textarea name="" id="" cols="30" rows="10" placeholder="街道/楼牌号等" v-model="formData.saddress"></textarea>
            </view>
        </view>
        <view class="contactmess">
            <view class="contactmess_label ov">
                <view class="fl">标签</view>
                <view class="ov fl">
                    <view v-for="item in label" :class="labelId.aId == item.aId ? 'fl la active' : 'fl la'" @click="chooseLabel(item)">{{item.sLabel }}</view>
                </view>
                <view class="fl inputWrap" style="margin-left: 144upx">
                    <view class="la" @click="addLabel"  v-if="!isAdd">
                        <img src="../../../static/jia.png" alt="" class="jia">
                    </view>
                    <view class="inputlabel" v-if="isAdd">
                        <input type="请输入标签名称，最多5个字" maxlength="5" v-model="labelin" ref="inputs" :focus="isAdd">
                        <button @click.stop="sureLabel">确定</button>
                    </view>
                </view>

            </view>
            <view class="space-between contactmess_default">
                <view>
                    <view class="contactmess_default_se">
                        设置默认地址
                    </view>
                    <view class="contactmess_default_tip">
                        提醒：每次下单会默认推荐使用该地址
                    </view>
                </view>
                <view class="contactmess_default_icon" @click="changedefault">
                    <img src="../../../static/defaultaddr.png" alt="" class="default" v-if="status">
                    <img src="../../../static/nodefaultaddr.png" alt="" class="nodefault" v-else>
                </view>


            </view>
        </view>
        <view class="buttonwrap" @click="AddShoppingAddress">
            <button class="button">保存</button>
        </view>
    </view>
</template>

<script>
    export default {
        data(){
            return{
                region: ['北京市', '北京市', '海淀区'],
                label:['家','公司','学校'],
                status:true,
                formData:{
                    sphone:'',
                    sname:'',
                    pname:'北京市',
                    cname:'北京市',
                    aname:'海淀区',
                    saddress:'',
                    status:''
                },
                isAdd:false,
                labelin:'',
                labelId:''
            }
        },
        onLoad(options){

            this.isCreate = options.isAdd == '1' ? true : false
            if(!this.isCreate){
                this.formData = global.defaultSddress
                this.region = [global.defaultSddress.pname,global.defaultSddress.cname,global.defaultSddress.aname]
                this.status = global.defaultSddress.status != 2 ? true : false
                this.labelId = {
                    aId:global.defaultSddress.aid
                }
                uni.setNavigationBarTitle({
                    title: '修改收货人'
                });
            }else {
                uni.setNavigationBarTitle({
                    title: '新建收货人'
                });
            }
        },
        onShow(){
          this.seluserlabel()
        },
        methods:{
            addLabel(){
                this.isAdd = true
            },
            chooseLabel(label){
                this.labelId = label
            },
            async seluserlabel(){
              let res = await this.$api.seluserlabel({
              })
                if(res.data.code == 200){
                    this.label = res.data.addresslabel
                }
            },
            async sureLabel(){
                if(!global.isEmpty(this.labelin)){
                    global.showToast('请输入标签名称')
                    return
                }
                if(!global.checkSymbols(this.labelin)){
                    global.showToast('请输入正确的标签名称')
                    return;
                }
                let res = await this.$api.addsLabel({
                    sLabel:this.labelin
                })
                if(res.data.code == 200){
                    global.showToast('添加标签成功')
                    this.isAdd = false
                    this.seluserlabel()
                }else {
                    global.showToast(res.header.msg)
                }


            },
            bindRegionChange: function (e) {
                this.formData.pname = e.detail.value[0]
                this.formData.cname = e.detail.value[1]
                this.formData.aname = e.detail.value[2]
            },
            async changedefault(){
                this.status = !this.status
                if(!this.isCreate){
                    let res = await this.$api.updateDefault({
                        sId:global.defaultSddress.sid,
                        status:this.status?'1':'2',
                    })
                    if(res.data.code== 200){
                        global.showToast('修改默认地址成功')
                    }
                }

            },
            addphonecancat(){
                wx.addPhoneContact({
                    success:function(e){
                    }
                })
            },
            async AddShoppingAddress(){
                if(!global.isEmpty(this.formData.sname)){
                    global.showToast('请输入收货人姓名')
                    return
                }
                if(!global.checkSymbols(this.formData.sname)){
                    global.showToast('请输入正确的收货人姓名')
                    return
                }
                if(!global.checkMobile(this.formData.sphone)){
                    global.showToast('请输入正确的收货人手机号')
                    return
                }
                if(!global.isEmpty(this.formData.pname)){
                    global.showToast('请选择所在地区')
                    return
                }
                if(!global.isEmpty(this.formData.saddress)){
                    global.showToast('请输入收货地址')
                    return
                }
                if(!global.checkSymbols(this.formData.saddress)){
                    global.showToast('请输入正确的收货地址，不允许携带特殊符号')
                    return
                }
                var data = {
                    sphone:this.formData.sphone,
                    sname:this.formData.sname,
                    pname:this.formData.pname,
                    cname:this.formData.cname,
                    aname: this.formData.aname,
                    saddress: this.formData.saddress,
                    status:this.status?'1':'2',
                    aId:this.labelId.aId ? this.labelId.aId : ''
                }
                if(this.isCreate){
                    let res = await this.$api.AddShoppingAddress(data)
                    if(res.data.code == 200){
                        global.showToast('添加收货地址成功')
                        // global.defaultAddr = this.swipeList[item]
                        setTimeout(()=>{
                            wx.navigateBack({   //然后返回上一个页面
                                delta: 1
                            })
                        },1000)
                    }else {
                        global.showToast(res.data.msg)
                    }
                }else {
                    data['sId'] = global.defaultSddress.sid
                    let res = await this.$api.updateShoppingAddress(data)
                    if(res.data.code == 200){
                        global.showToast('修改收货地址成功')
                        setTimeout(()=>{
                            wx.navigateBack({   //然后返回上一个页面
                                delta: 1
                            })
                        },1000)
                    }else {
                        global.showToast(res.data.msg)
                    }
                }

            },
        },

    }
</script>

<style scoped lang="scss">
    .addcontact{

        height: 110upx;
        display: flex;
        align-items: center;
        img{
            width: 27upx;
            height: 31upx;
        }
    }
    .wrap{
        padding-top: 10upx;
        >view.contactmess{
            background:rgba(255,255,255,1);
            box-shadow:0px 4px 20px 0px rgba(0, 0, 0, 0.02);
            border-radius:20px;
            margin-top: 10upx;
            padding: 40upx;
        }
    }
    .contactmess{
        text{
            display: inline-block;
            width: 120upx;
            margin-right: 33upx;
            color: #333333;
            font-size: 28upx;
            height: 110upx;
            line-height: 110upx;
        }
        input{
            height: 110upx;
            font-size: 28upx;
        }
        textarea{
            height: 80upx;
            margin-top: 20upx;
            font-size: 28upx;
            width: 500upx;
        }
        >view{
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        >view:last-child{
            border-bottom: none;
        }
        &_label{
            font-size: 28upx;
            color: #333333;
            .ov{
                margin-left: 89upx;
                width: 500upx;


            }
            view.la{
                width:120upx;
                height:50upx;
                background:rgba(255,255,255,1);
                border:1px solid rgba(0,0,0,0.1);
                border-radius:20upx 0px 20upx 0px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 20upx;
                margin-bottom: 25upx;
            }
            .active{
                border: 1px solid #fc4a5b !important;
                color: #fc4a5b;
            }
        }
        &_default{
            margin-top: 39upx;
            &_se{
                font-size: 28upx;
                color: #333333;
                margin-bottom: 28upx;
            }
            &_tip{
                color: #999999;
                font-size: 22upx;
            }
            &_icon{
                display: flex;
                align-items: center;
            }
        }
    }
    .picker{
        font-size: 28upx;
        height: 110upx;
        line-height: 110upx;
    }
    .jia{
        width: 23upx;
        height: 23upx;
    }
    .default{
        width: 75upx;
        height: 45upx;
    }
    .nodefault{
        width: 88upx;
        height: 71upx;
    }
    .buttonwrap{
        width: 100%;
        position: fixed;
        bottom: 40upx;
        padding: 0upx 40upx;
        button{
            width: 100%;
        }
    }
    .inputlabel{
        position: relative;
        width: 487upx;
        height: 50upx;
        margin-bottom: 25upx;
        border-radius: 25upx;
        background: #f6f6f6;
        overflow: hidden;
        input{
            /*width: 400upx;*/
            height: 50upx;

            padding-left: 30upx;
            position: absolute;
            top: 0upx;
            box-sizing: border-box;
            font-size: 22upx;
        }
        button{
            /*width: 83upx;*/
            height: 50upx;
            background:linear-gradient(-30deg,rgba(246,30,69,1),rgba(253,68,95,1));
            border-radius:25upx;
            font-size: 22upx;
            color: white;
            position: absolute;
            right: 0upx;
            border: none;
        }
    }
</style>