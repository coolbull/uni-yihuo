<template>
  <view class="lists" :style="!goods.show?'margin:20rpx 35rpx 20rpx 20rpx':'margin:0rpx 40rpx'">
    <view
      :class="active == index ? 'active' : ''"
      v-for="(item,index) in goods.goodsList"
      @click="listsclick(item,index)"
      :key="index"
    >
      <view class="lists_img">
        <img
          :src="item.pimagetext"
          alt
          :style="goods.show?'width:263rpx;height:263rpx':'width:188rpx;height:188rpx'"
        />
      </view>
      <view class="lists_ti">{{item.pname}}</view>
      <!--            <view class="lists_tip"  v-if="!goods.show">-->
      <!--                <text>{{item.pintroduce}}</text>-->
      <!--            </view>-->
      <view v-if="!goods.isshop">
        <view class="flex lists_pr" v-if="item.pPrice!='0.00'">
          <view v-if="goods.from == 'class'">
            <view class="lists_new" v-if="item.minPrice!=item.maxPrice">
              <text>¥</text>
              {{item.pPricef}}
            </view>
          </view>
          <view v-if="!goods.from">
            <view class="lists_new" v-if="item.minPrice!=item.maxPrice">
              <text>¥</text>
              {{item.minPrice.toFixed(2)}}
            </view>
          </view>

          <view class="lists_new" v-if="item.minPrice==item.maxPrice">
            <text>¥</text>
            {{item.pPricef}}
          </view>
          <view class="lists_old" v-if="item.minPrice==item.maxPrice">
            <text>¥</text>
            {{item.pPrice}}
          </view>
        </view>
        <view class="flex lists_pr" v-if="item.pPrice=='0.00'">
          <view
            class="lists_new"
            style="color: #999999;font-weight: normal;font-size: 24rpx"
            @click.stop="tocall"
          >联系客服查询报价</view>
        </view>
        <view class="lists_ic ov">
          <view class="fl">
            <text>自营</text>
            <!--                    <text>特价</text>-->
          </view>
          <view class="fr" v-if="!goods.show">
            <img
              src="../../static/goodsdetails/star_has.png"
              alt
              class="star"
              style="width: 20rpx;height: 20rpx;margin-left: 3rpx"
              v-for="(item,index) in item.pGrade"
              :key="index"
            />
            <img
              src="../../static/goodsdetails/star.png"
              alt
              class="star"
              style="width: 20rpx;height: 20rpx;margin-left: 3rpx"
              v-for="(item,index) in 5-item.pGrade"
              :key="index"
            />
          </view>
          <view class="lists_go fr" v-if="goods.show">{{item.pGrade}}%评分</view>
        </view>
      </view>
      <view v-if="goods.isshop" class="space-between">
        <view class="lists_pr" v-if="item.pPrice!='0.00'">
          <view v-if="goods.from == 'class'">
            <view class="lists_new" v-if="item.minPrice!=item.maxPrice">
              <text>¥</text>
              {{item.pPricef}}
            </view>
          </view>

          <view v-if="!goods.from">
            <view class="lists_new" v-if="item.minPrice!=item.maxPrice">
              <text>¥</text>
              {{item.minPrice.toFixed(2)}}
            </view>
          </view>

          <view class="lists_new" v-if="item.minPrice==item.maxPrice">
            <text>¥</text>
            {{item.pPricef}}
          </view>
          <view class="lists_old" v-if="item.minPrice==item.maxPrice">
            <text>¥</text>
            {{item.pPrice}}
          </view>
        </view>
        <view class="align-center" @click.stop="showdetails(item)">
          <img src="../../static/brandadd.png" alt class="brandadd" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "bestLists",
  props: {
    goods: Object,
  },
  goods(newval, oldval) {
    console.log(newval.from);
  },
  data() {
    return {
      active: -1,
    };
  },
  methods: {
    listsclick(item, index) {
      this.active = index;
      global.menuactive = this.goods.active;
      uni.navigateTo({
        url: "/pages/class/goodsDetails?pid=" + item.pid,
      });
    },
    delete() {},
    tocall() {
      wx.makePhoneCall({
        phoneNumber: "400-968-6028",
      });
    },
    showdetails(item) {
      this.$emit("showdetails", item);
    },
  },
};
</script>

<style scoped lang="scss">
.lists {
  /*padding-top: 42upx;*/
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > view {
    width: 48%;
    padding: 40upx 20upx 40upx 20upx;
    background: white;
    box-shadow: 0px 3upx 8upx 0upx rgba(0, 0, 0, 0.08);
    border-radius: 23upx 14upx 14upx 14upx;
    margin-bottom: 19upx;
    position: relative;
  }
  > .active {
    box-shadow: 0px 3upx 30upx 0upx rgba(252, 74, 91, 0.18);
  }
  &_img {
    text-align: center;
    margin-bottom: 40upx;
  }
  img {
    width: 236upx;
    height: 236upx;
  }
  &_ti {
    color: #333333;
    font-size: 24upx;
    font-weight: 500;
    width: 100%;
    /*height: 70upx;*/
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height: 70upx;
    margin-bottom: 10upx;
  }
  &_new {
    color: #f61e45;
    font-weight: bold;
    font-size: 36upx;
    margin-right: 9upx;
    margin-bottom: 10upx;
    > text {
      font-size: 23upx;
    }
  }
  &_old {
    color: #666666;
    font-size: 18upx;
    text-decoration: line-through;
    font-weight: 300;
    margin-top: 20upx;
  }
  &_ic {
    text {
      display: inline-block;
      background: rgba(246, 30, 69, 0.1);
      border-radius: 0px 20upx 0px 20upx;
      color: #f61e45;
      font-size: 18upx;
      padding: 5upx 12upx;
      margin-right: 20upx;
    }
  }
  &_go {
    color: #999999;
    font-size: 18upx;
    margin-top: 5upx;
  }
  &_del {
    position: absolute;
    right: 30upx;
    top: 20upx;
    img {
      width: 30upx;
      height: 30upx;
    }
  }
  &_tip {
    font-weight: 300;
    color: #666666;
    font-size: 18upx;
    margin-top: 12upx;
  }
}
.brandadd {
  width: 40upx !important;
  height: 40upx !important;
}
</style>