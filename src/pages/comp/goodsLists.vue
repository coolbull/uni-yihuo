<template>
  <view>
    <view
      class="lists ov"
      v-for="(item,index) in goods.goodsList"
      :style="goods.from == 'owner' ? 'margin-top:0rpx' : 'margin-top:28upx'"
      @click="todetails(item)"
    >
      <img :src="item.pCover" alt class="lists_img fl" />
      <view class="fr">
        <view class="lists_ti">{{item.pName}}</view>
        <view class="lists_old" v-show="goods.from == 'index'">¥ {{item.pPrice}}</view>

        <view class="space-between lists_newpri">
          <view class="lists_new" v-if="item.pPrice!='0.00'">
            <text class="lists_new_y">¥</text>
            <text class="lists_new_m">{{item.pPricef}}</text>
            <!--                        <text class="lists_new_m" v-if="item.pDiscount=='1'||item.pDiscount==null||item.pDiscount==undefined">{{item.pPrice}}</text>-->
          </view>
          <view class="lists_new" v-if="item.pPrice=='0.00'">
            <text
              class="lists_new_y"
              style="color: #999999;font-weight: normal"
              @click.stop="tocall"
            >联系客服详询报价</text>
          </view>
          <view
            class="lists_al"
            v-if="goods.from == 'index'&&!goods.isreco"
          >已售{{item.pNum ? item.pNum : 0}}套</view>
          <view
            class="lists_al"
            v-if="goods.from == 'index'&&goods.isreco"
            :style="item.pPrice == '0.00' ? 'top:0rpx' : 'top:17rpx'"
          >
            <img
              src="../../static/goodsdetails/star_has.png"
              alt
              class="star"
              style="width: 20rpx;height: 20rpx;margin-left: 3rpx"
              v-for="item in item.pGrade"
            />
            <img
              src="../../static/goodsdetails/star.png"
              alt
              class="star"
              style="width: 20rpx;height: 20rpx;margin-left: 3rpx"
              v-for="item in 5-item.pGrade"
            />
          </view>
          <view v-if="goods.from == 'mine'" @click.stop="toCollecte(item,index)">
            <img
              :src="idcollec ?'../../static/mycollection.png':'../../static/mycollection_has.png'"
              alt
              class="mycollection"
            />
          </view>
          <view v-if="goods.from == 'order'" class="lists_order">
            <text class="fin" v-if="item.oType== '6'">已完成</text>
            <text v-if="item.oType== '1'" class="zhi">待支付...</text>
            <text v-if="item.oType== '5'" class="yi">已发货</text>
          </view>
          <view v-if="goods.from == 'owner'" class="lists_order">
            <text class="fin">x 1</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "goodsLists",
  props: {
    goods: {
      type: Object,
    },
  },
  watch: {
    goods(newval, oldval) {
      this.list = newval.goodsList;
    },
  },
  data() {
    return {
      collection: require("../../static/mycollection.png"),
      idcollec: false,
      active: -1,
      list: [],
    };
  },
  methods: {
    async toCollecte(item, index) {
      let res = await this.$api.goodsCollect({
        pId: item.pid,
      });
      if (res.data.code == 200) {
        if (res.data.collectstate == 1) {
          global.showToast("收藏成功");
        } else {
          global.showToast("取消收藏成功");
        }
        this.$parent.getmycollect();
      }
    },
    todetails(item) {
      uni.navigateTo({
        url: "/pages/class/goodsDetails?pid=" + item.pid,
      });
    },
    tocall() {
      wx.makePhoneCall({
        phoneNumber: "400-968-6028",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.lists {
  margin-top: 20upx;
  padding: 30upx 30upx 40upx 30upx;
  border-radius: 5upx;
  background: white;
  box-shadow: 0px 3upx 8upx 0px rgba(0, 0, 0, 0.08);
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
    font-weight: bold;
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
    /*top: 17upx;*/
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
.mycollection {
  width: 31upx;
  height: 27upx;
  position: relative;
  top: 10upx;
}
</style>