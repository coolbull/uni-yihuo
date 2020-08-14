<template>
  <view>
    <view class="management" @click="management" v-if="shoplists.length != 0">
      <img src="../../static/guanli.png" alt />
      {{ismanagement?'完成':'管理'}}
    </view>
    <view class="margin40" style="margin-bottom: 250rpx">
      <view class="goodsList space-between" v-for="item,index in shoplists">
        <view class="align-center">
          <img
            :src="item.ischeck ? '../../static/shoppingchecked.png' : '../../static/shoppingcheck.png'"
            alt
            class="goodsList_check"
            @click="cancel(item,index)"
          />
        </view>
        <img :src="item.pCover" alt class="goodsList_go" />
        <view class="goodsList_ri fr">
          <view class="goodsList_tit" style="margin-bottom:80rpx">{{item.pName}}</view>
          <view class="goodsList_int align-center" v-if="false">
            <view>{{item.specification}}</view>
            <img src="../../static/arrow_bottom.png" alt class="goodsList_bott" />
          </view>
          <view class="space-between">
            <view>
              <view class="goodsList_prices">
                <text>¥</text>
                {{item.price}}
              </view>
            </view>
            <view class="flex">
              <view class="goodsList_cha" @click="updateshoppingcar(item,1,index)">
                <img src="../../static/reduce.png" alt />
              </view>
              <view class="goodsList_nums">{{item.pNum}}</view>
              <view class="goodsList_cha goodsList_add" @click="updateshoppingcar(item,2,index)">
                <img src="../../static/add.png" alt />
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="shoplists.length == 0">
        <empty prop="shop"></empty>
      </view>
    </view>
    <view class="space-between tosubmit" v-if="shoplists.length != 0">
      <view class="align-center">
        <img
          :src="allchecked?'../../static/shoppingchecked.png':'../../static/shoppingcheck.png'"
          alt
          class="goodsList_check"
          @click="allcheck"
        />
        <text class="tosubmit_q">全选</text>
        <text class="tosubmit_h" v-if="!ismanagement">合计：</text>
        <text class="tosubmit_p" v-if="!ismanagement">{{totalmoney}}</text>
      </view>
      <view v-if="!ismanagement">
        <button class="button" @click="tosubmit">去结算({{totalnum}})</button>
      </view>
      <view class="del flex" v-if="ismanagement">
        <view class="del_y" @click="shoppingcargotocollect">移去收藏夹</view>
        <view class="del_d" @click="removeshoppingcar">删除</view>
      </view>
    </view>
    <tab-bar :current="currentTabIndex" :ushopkeeper="uShopkeeper"></tab-bar>
  </view>
</template>

<script>
import empty from "../comp/empty";
export default {
  name: "index",
  components: { empty },
  data() {
    return {
      currentTabIndex: 2,
      uShopkeeper: 1,
      uStaus: 0,
      shoplists: [],
      totalmoney: "0.00",
      totalnum: 0,
      allchecked: false,
      ismanagement: false,
    };
  },
  onShow() {
    wx.hideTabBar();
    this.getlist();
    var uShopkeeper = uni.getStorageSync("uShopkeeper");
    var uStaus = uni.getStorageSync("uStaus");
    console.log(uni.getStorageSync("uShopkeeper"));
    if(uShopkeeper = 2){
      global.showToast("我是你爹");
    }else{
      this.uShopkeeper = uShopkeeper;
    }
  },
  methods: {
    management() {
      this.ismanagement = !this.ismanagement;
      this.total();
    },
    allcheck() {
      if (this.allchecked) {
        this.shoplists.forEach((a, b) => {
          a.ischeck = false;
        });
      } else {
        this.shoplists.forEach((a, b) => {
          a.ischeck = true;
        });
      }
      this.allchecked = !this.allchecked;
      this.total();
    },
    tabClick(index) {
      this.currentTabIndex = index;
      this.uShopkeeper = uni.getStorageSync("uShopkeeper");
    },
    async getlist() {
      let res = await this.$api.selshoppingcar({});
      if (res.data.code == 200) {
        res.data.shoppingcars.forEach((a, b) => {
          a["ischeck"] = false;
        });
        this.shoplists = res.data.shoppingcars;
        this.total();
      }
    },
    cancel(item, index) {
      this.shoplists[index].ischeck = !this.shoplists[index].ischeck;
      this.total();
    },
    total() {
      var arr = [];
      var money = 0;
      this.shoplists.forEach((a, b) => {
        if (a.ischeck) {
          arr.push(a);
          money += Number(a.price) * a.pNum;
        }
      });
      this.totalmoney = money.toFixed(2);
      this.totalnum = arr.length;
      if (arr.length != this.shoplists.length || arr.length == 0) {
        this.allchecked = false;
      }
    },
    async shoppingcargotocollect() {
      var arr = [],
        pId = [];
      this.shoplists.forEach((a, b) => {
        console.log(a);
        if (a.ischeck) {
          arr.push(a.scId);
          pId.push(a.pId);
        }
      });
      let res = await this.$api.shoppingcargotocollect({
        scId: arr.join(";"),
        pId: pId.join(";"),
      });
      if (res.data.code == 200) {
        global.showToast("移入收藏夹成功");
        this.getlist();
      }
    },
    async removeshoppingcar() {
      var arr = [];
      this.shoplists.forEach((a, b) => {
        console.log(a);
        if (a.ischeck) {
          arr.push(a.scId);
        }
      });
      let res = await this.$api.removeshoppingcar({
        scId: arr.join(";"),
      });
      if (res.data.code == 200) {
        this.getlist();
      }
    },
    async updateshoppingcar(item, index, n) {
      var num;
      if (index == 1) {
        if (item.pNum == 1) {
          global.showToast("不能在少了哦～");
          return;
        }
        num = item.pNum - 1;
      } else {
        num = item.pNum + 1;
      }
      let res = await this.$api.updateshoppingcar({
        scId: item.scId,
        pNum: num,
      });
      if (res.data.code == 200) {
        this.shoplists[n].pNum = num;
        this.total();
      }
    },
    reduce(item, index) {
      var num = this.shoplists[index].pNum;
      if (num == 1) {
        global.showToast("不可以在减少了～");
      } else {
        this.shoplists[index].pNum--;
      }
    },
    tosubmit() {
      var arr = [];
      this.shoplists.forEach((a, b) => {
        if (a.ischeck) {
          a.num = a.pNum;
          a.pPricef = a.price;
          a.pid = a.pId;
          arr.push(a);
        }
      });
      console.log(arr);
      if (arr.length == 0) {
        global.showToast("请选择商品");
        return;
      }
      global.detailShop = {
        totalmoney: this.totalmoney,
        totalnum: this.totalnum,
        list: arr,
        seriesId: 1,
      };
      global.isshop = false;
      uni.navigateTo({
        url: "/pages/class/submitOrder",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.goodsList {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.08);
  border-radius: 5upx;
  margin-top: 20upx;
  padding: 30upx 30upx 30upx 15upx;
  &_check {
    width: 36upx;
    height: 36upx;
    margin-right: 20upx;
  }
  &_bott {
    width: 13upx;
    height: 10upx;
    margin-left: 30upx;
  }
  &_go {
    width: 166upx;
    height: 166upx;
    margin-right: 40upx;
  }
  &_int {
    width: 336upx;
    height: 37upx;
    line-height: 37upx;
    padding: 0upx 10upx;
    background: #f2f2f2;
    border-radius: 10upx;
    color: #666666;
    font-weight: 300;
    font-size: 20upx;
    margin-bottom: 30upx;
    > view {
      width: 274upx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &_cha {
    width: 40upx;
    height: 40upx;
    background: rgba(240, 239, 239, 1);
    border-radius: 20upx 0upx 20upx 0upx;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 21upx;
      height: 4upx;
    }
  }

  &_add {
    background: linear-gradient(
      -30deg,
      rgba(246, 30, 69, 0.15),
      rgba(253, 68, 95, 0.15)
    );

    img {
      width: 21upx;
      height: 21upx;
    }
  }

  &_tit {
    color: #333333;
    font-size: 26upx;
    font-weight: bold;
    margin-bottom: 10upx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 336upx;
  }

  &_ri {
    width: 376upx;
  }

  &_price {
    color: #333333;
    font-size: 28upx;
    /*font-weight: bold;*/
    > text {
      font-size: 20upx;
      padding-right: 10upx;
    }
  }

  &_prices {
    color: #f61e45;
    font-size: 36upx;
    font-weight: bold;

    > text {
      font-size: 20upx;
      padding-right: 10upx;
    }
  }

  &_num {
    color: #666666;
    text-align: right;
    font-size: 22upx;
  }

  &_nums {
    width: 20upx;
    text-align: center;
    margin-left: 10upx;
    margin-right: 10upx;
    height: 40upx;
    line-height: 40upx;
  }
}
.tosubmit {
  position: fixed;
  width: 100%;
  bottom: calc(106rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 46px 0px rgba(67, 67, 67, 0.07);
  padding: 20upx 30upx 20upx 40upx;
  font-weight: 300;
  color: #666666;
  .button {
    width: 284upx;
    height: 88upx;
  }
  &_q {
    font-size: 22upx;

    margin-right: 30upx;
  }
  &_h {
    font-size: 26upx;
  }
  &_p {
    color: #f61e45;
    font-size: 32upx;
    font-weight: bold;
  }
}
.management {
  text-align: right;
  font-size: 24upx;
  color: #666666;
  font-weight: 300;
  margin-top: 22upx;
  padding-right: 40upx;
  img {
    width: 21upx;
    height: 17upx;
    margin-right: 10upx;
  }
}
.del {
  view {
    font-size: 28upx;
    text-align: center;
    height: 66upx;
    line-height: 66upx;
    border-radius: 20upx 0px 20upx 0px;
  }
  &_y {
    width: 169upx;
    border: 1px solid rgba(249, 159, 0, 0.5);
    color: #f99f00;
  }
  &_d {
    width: 120upx;
    border: 1px solid rgba(246, 30, 69, 0.5);
    color: #f61e45;
    margin-left: 40upx;
  }
}
</style>