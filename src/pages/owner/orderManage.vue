<template>
  <view>
    <view class="page">
      <tabControl
        :current="current"
        :values="tabItems"
        bgc="#fff"
        :fixed="true"
        :scrollFlag="true"
        :isEqually="true"
        @clickItem="onClickItem"
      ></tabControl>
      <!-- 使用 swiper 配合 滑动切换 -->
      <swiper class="swiper" style="height: 100%;" @change="scollSwiper" :current="items.type">
        <swiper-item v-for="i in items" :key="i.type">
          <!-- 使用 scroll-view 来滚动内容区域 -->
          <scroll-view scroll-y="true" style="height: 100%;">
            <view>
              <view v-for="(item, index) in orderList" :key="index">
                <view class="margin40 orderone">
                  <view class="space-between orderone_num">
                    <view>订单编号：{{item.oNumber}}</view>
                    <view class="orderone_sta" v-if="item.oType == '1'">待支付</view>
                    <view class="orderone_sta" v-if="item.oType == '2'">已支付</view>
                    <view class="orderone_sta" v-if="item.oType == '3'">申请退款</view>
                    <view class="orderone_sta" v-if="item.oType == '4'">已退款</view>
                    <view class="orderone_sta" v-if="item.oType == '5'">已发货</view>
                    <view class="orderone_sta" v-if="item.oType == '6'">已完成</view>
                    <view class="orderone_sta" v-if="item.oType == '7'">已取消</view>
                  </view>
                  <view class="lists ov" v-for="i in item.orderList" :key="i.name" v-if="item.orderList">
                    <img :src="i.pCover" alt class="lists_img fl" />
                    <view class="fr">
                      <view class="lists_ti">{{i.pName}}</view>
                      <view class="space-between lists_newpri">
                        <view class="lists_new">
                          <text class="lists_new_y">¥</text>
                          <text class="lists_new_m">{{i.pPricef}}</text>
                        </view>
                        <view class="lists_order">
                          <text class="fin">x {{i.pNum}}</text>
                        </view>
                      </view>
                    </view>
                  </view>
                  <view class="lists ov" v-if="!item.orderList">
                    <img :src="item.pCover" alt class="lists_img fl" />
                    <view class="fr">
                      <view class="lists_ti">{{item.pName}}</view>
                      <view class="space-between lists_newpri">
                        <view class="lists_new">
                          <text class="lists_new_y">¥</text>
                          <text class="lists_new_m">{{item.pPricef}}</text>
                        </view>
                        <view class="lists_order">
                          <text class="fin">x {{item.pNum}}</text>
                        </view>
                      </view>
                    </view>
                  </view>
                  <view class="orderone_shi">
                    收益：
                    <text class="yang">¥ &nbsp;</text>
                    <text>&nbsp;{{item.pDistributionMoney}}</text>
                    <!--                                        （含邮费￥10.00）-->
                  </view>
                </view>
              </view>
            </view>
            <empty :prop="empty" v-if="orderList.length==0"></empty>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import tabControl from "../comp/tabControl-tag";
import goodsLists from "../comp/goodsLists";
import empty from "../comp/empty";
export default {
  name: "orderManage",
  components: { tabControl, goodsLists, empty },
  data() {
    return {
	  items:[
		  { name: '全部', type: 0 },
		  { name: '待支付', type: 1 },
		  { name: '待发货', type: 2 },
		  { name: '交易成功', type: 6 },
	  ],
      current: 0,
      orderList: [],
      empty: "order",
    };
  },
  computed:{
	  tabItems(){
		  return this.items.map(item => item.name)
	  }
  },
  onShow() {
    this.selOrederFromAll();
  },
  methods: {
    async selOrederFromAll() {
      let res = await this.$api.selOrederFromAll({
        distributionUid: uni.getStorageSync("uid"),
        oType: this.current,
      });
      if (res.data.code == 200) {
        this.orderList = res.data.orders;
        console.log(res.data.orders);
      }
    },
    onClickItem(val) {
	  this.current = this.items[val.currentIndex].type;
      this.selOrederFromAll();
    },
    scollSwiper(e) {
      this.current = e.target.current;
      this.selOrederFromAll();
    },
  },
};
</script>

<style scoped lang="scss">
page {
  height: 100%;
}
.page {
  padding-top: 103upx;
  height: 100vh;
}
.lists {
  padding: 30upx 30upx 40upx 30upx;
  border-radius: 5upx;
  background: white;
  /*box-shadow: 0px 3upx 8upx 0px rgba(0,0,0,0.08);*/
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  .fr {
    width: 409upx;
  }
  &_img {
    width: 166upx;
    height: 166upx;
    margin-right: 30upx;
  }
  &_ti {
    color: #333333;
    font-size: 26upx;
    width: 336upx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 57upx;
  }
  &_old {
    color: #666;
    text-decoration: line-through;
    font-weight: 300;
    margin-bottom: 10upx;
  }
  &_newpri {
    width: 409upx;
    position: absolute;
    bottom: 35upx;
    right: 30upx;
  }
  &_new {
    color: #f61e45;
    font-weight: bold;
    &_m {
      font-size: 36upx;
    }
  }
  &_al {
    color: #858585;
    position: relative;
    top: 6upx;
  }
  &_order {
    font-size: 22upx;

    position: relative;
    top: 10upx;
    > text.fin {
      color: #999999;
    }
    > text.zhi {
      color: #f61e45;
    }
    > text.dai {
      color: #f61e45;
      font-weight: bold;
    }
    > text.yi {
      color: #4a6cfc;
    }
  }
}
.orderone {
  margin-top: 20upx;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
  &_num {
    border-radius: 9upx 9upx 0upx 0upx;
    background: linear-gradient(
      -30deg,
      rgba(246, 30, 69, 1),
      rgba(253, 68, 95, 1)
    );
    padding: 10upx 20upx;
    color: white;
    font-size: 26upx;
  }
  &_sta {
    font-weight: 300;
    font-size: 22upx;
  }
  &_shi {
    padding: 10upx 20upx;
    font-size: 20upx;
    color: #666666;
    text-align: right;
    font-weight: 300;
    background: #f5f5f5;
    border-radius: 0upx 0upx 9upx 9upx;
    > text {
      color: #333333;
      font-size: 24upx;
      font-weight: bold;
    }
    .yang {
      font-size: 20upx;
    }
  }
}
</style>