<template>
  <view>
    <view class="page-section page-section-spacing swiper">
      <swiper circular style="height: 750upx !important;" @animationfinish="swiperChange">
        <block v-for="(item ,index) in details.productSlideshowList" :key="index">
          <swiper-item>
            <img
              :src="item.sPic"
              alt
              style="width: 100%"
              class="img"
              @click="showbanner(item.sPic)"
            />
          </swiper-item>
        </block>
      </swiper>
      <!--重置小圆点的样式 -->
      <!--            <view class="dots">-->
      <!--                <text class="dots_now">{{currentSwiper+1}}</text>-->
      <!--                <text class="dots_x">/</text>-->
      <!--                <text class="dots_len"> {{details.productSlideshowList.length}}</text>-->
      <!--            </view>-->
      <view class="chooselabel flex">
        <img src="../../static/vr.png" class="vr" v-if="details.pVr" @click="pVr" />
        <img src="../../static/video.png" class="vr" v-if="details.pVideo" @click="hvideo" />
        <view class="align-center">
          <img src="../../static/tupian.png" class="tupian" />
          <view style="width: 60rpx">{{currentSwiper+1}} / {{details.productSlideshowList.length}}</view>
        </view>
      </view>
    </view>
    <view class="details">
      <view class="price" v-if="details.pPrice != '0.00'">
        <view class="price_mon flex">
          <view class="price_mon_no">
            <text>¥</text>
            {{details.pPricef?details.pPricef:'0.00'}}
          </view>
          <!--                    <view class="price_mon_no">-->
          <!--                        <text>¥ </text>{{details.pPrice?details.pPrice:'0.00'}}-->
          <!--                    </view>-->
          <view class="price_mon_ol">单件 {{details.pPrice}}</view>
        </view>
        <view class="price_tips">
          <text class="price_tips_zi">自营</text>
          <!--                    <text class="price_tips_zi">特价</text>-->
          <text class="price_tips_zhi">{{details.pIntroduce?details.pIntroduce:''}}</text>
        </view>
        <view class="price_tips_con">{{details.pName?details.pName:''}}</view>
      </view>
      <view class="deinstru">
        <view class="space-between" @click="chooseaddr">
          <view>
            <text class="deinstru_le">送至</text>
            <!--                        <img src="../../static/goodsdetails/address.png" alt="" class="deinstru_add">-->
            <text class="deinstru_addr">{{city}} {{district}}</text>
          </view>
          <img src="../../static/goodsdetails/arrow_ri.png" alt class="arrow" />
        </view>
        <view class="space-between">
          <view>
            <text class="deinstru_le">运费</text>
            <text class="deinstru_addr">免运费</text>
          </view>
          <!--                    <img src="../../static/goodsdetails/arrow_ri.png" alt="" class="arrow">-->
        </view>
        <view class="space-between">
          <view>
            <text class="deinstru_le">说明</text>
            <text class="deinstru_bao">{{refundexchanged}}</text>
          </view>
          <!--                    <img src="../../static/goodsdetails/arrow_ri.png" alt="" class="arrow">-->
        </view>
      </view>
      <view class="otherins">
        <view class="otherins_tit space-between" @click="toNextPage('class/commentsDetails',1)">
          <view class="flex">
            <img src="../../static/goodsdetails/ins_icon.png" alt class="otherins_tit_icon" />
            <view class="otherins_tit_txt">
              评价
              <text v-if="details.evaluatetList.length != 0">({{evaluatetsnum}}+)</text>
            </view>
          </view>
          <view v-if="details.evaluatetList.length != 0">
            <text class="otherins_tit_more">好评度 {{favorable}}</text>
            <img src="../../static/goodsdetails/arrow_ri.png" alt class="arrow" />
          </view>
        </view>
        <view class="comments">
          <view v-for="item in details.evaluatetList">
            <view class="flex">
              <img
                :src="item.anonymous == '1' ? item.uPic : '../../static/goodsdetails/avactor.png'"
                alt
                class="comments_ava"
              />
              <view>
                <view>{{item.anonymous == '1'?item.uName:'匿名用户'}}</view>
                <view>
                  <img
                    src="../../static/goodsdetails/star_has.png"
                    alt
                    class="comments_star"
                    v-for="item in item.eScore"
                  />
                  <img
                    src="../../static/goodsdetails/star.png"
                    alt
                    class="comments_star"
                    v-for="item in 5-item.eScore"
                  />
                </view>
              </view>
            </view>
            <view class="comments_txt">{{item.eComment}}</view>
          </view>
          <view v-if="details.evaluatetList.length == 0" class="none">暂无更多评价</view>
        </view>
      </view>
      <view class="otherins" v-if="questiontype!='1'">
        <view class="otherins_tit space-between" @click="toNextPage('class/questionList',2)">
          <view class="flex">
            <img src="../../static/goodsdetails/ins_icon.png" alt class="otherins_tit_icon" />
            <view class="otherins_tit_txt">
              问大家
              <text>({{questionsnum}})</text>
            </view>
          </view>
          <view>
            <img src="../../static/goodsdetails/arrow_ri.png" alt class="arrow" />
          </view>
        </view>
        <view class="question">
          <view class="space-between" v-for="item in details.questions">
            <view class="flex">
              <view class="question_icon">
                <img src="../../static/ask.png" alt />
              </view>

              <text class="question_que">{{item.qQuestion}}</text>
            </view>
            <view class="question_ans">{{item.questionsList.length}}个回答</view>
          </view>
          <view v-if="details.questions.length == 0" class="none">商品暂时无人提问,快去提问吧～</view>
        </view>
      </view>
    </view>
    <view class="detaileTitle">
      <text class="detaileTitle_line"></text>
      <text class="detaileTitle_ti">图文详情</text>
      <text class="detaileTitle_line"></text>
    </view>
    <view class="introduce">
      <view class="introduce_im">
        <img :src="details.pImagetext" alt mode="widthFix" />
      </view>
      <view class="xuzhi">
        <view class="xuzhi_t">[产品需知]</view>
        <text class="xuzhi_c">{{needKnow}}</text>
      </view>
    </view>
    <view class="margin40" style="margin-bottom: 150upx">
      <!--            <goods-lists :goods="recomList" ></goods-lists>-->
    </view>
    <view class="buynow">
      <view class="space-between">
        <view class="flex buynow_for space-between">
          <button @click="toshare(true)">
            <img src="../../static/goodsdetails/forward.png" alt />
            <view>转发</view>
          </button>
          <view @click="toCollecte">
            <img
              :src="collectstate == '1' ? '../../static/goodsdetails/collection_has.png' : '../../static/goodsdetails/collection.png'"
              alt
            />
            <view>收藏</view>
          </view>
          <button @click="toZhuanPage('mademoney')">
            <img src="../../static/goodsdetails/get_black.png" alt />
            <view>赚</view>
          </button>
        </view>
        <view>
          <view v-if="details.pPrice != '0.00'" class="flex tobuy">
            <view class="tobuy_add" @click="buy('1')">加入购物车</view>
            <view @click="buy('2')" class="tobuy_submit">立即购买</view>
          </view>

          <button class="button" @click="tocall" v-if="details.pPrice == '0.00'">联系客服</button>
        </view>
      </view>
    </view>
    <wx-auth :isshow="wxAuth" @changeshow="wxisshow"></wx-auth>
    <view class="tologin" @click="tologin" v-if="showlogin"></view>
    <view class="shareimg sharewarp" v-if="isshare" @click="disshare(false)">
      <view>
        <img src="../../static/download.png" alt class="shareimg_d" @click.stop="saveimg" />
        <img :src="shareUrl" alt class="shareimg_m" />
      </view>
    </view>
    <view class="sharewarp share" v-if="issharew" @click="toshare(false)">
      <view>
        <view class="share_s ov" @click.stop="toshare(true)">
          <button open-type="share" class="fl">
            <img src="../../static/weixin.png" alt />
            <view>微信</view>
          </button>
          <view class="fl" @click.stop="createposter">
            <img src="../../static/haibao.png" alt />
            <view>生成海报</view>
          </view>
        </view>
        <view class="share_c">取消</view>
      </view>
    </view>
    <view class="sharewarp choosetype" v-if="choosetype">
      <view>
        <view class="ov">
          <img :src="choosegoods.pCover" alt class="choosetype_dt fl" />
          <view class="fl">
            <view class="choosetype_tt">{{choosegoods.pName?choosegoods.pName:''}}</view>
            <view class="choosetype_p" v-if="choosepcoverindex==-1">
              <text>¥</text>
              {{details.minPrice}} -
              <text :decode="true" :space="true" style="margin-left: 10upx">¥</text>
              {{details.maxPrice}}
            </view>
            <view class="choosetype_p" v-if="choosepcoverindex!=-1">
              <!--                            <text>¥</text>-->
              {{choosegoods.pPricef}}
            </view>
          </view>
          <img src="../../static/dele.png" alt class="fr choosetype_de" @click="disp" />
        </view>
        <view class="choosetype_ge">
          <view class="choosetype_ge_t">规格</view>
          <view class="ov choosetype_ge_wr" v-for="(item,index) in details.list">
            <view
              :class="choosepcoverindex == index ? 'fl choosetype_ge_d chooseactive' : 'fl choosetype_ge_d'"
              @click="choosepcover(index)"
            >
              <view>{{item.pName}}</view>
              <view
                class="choosetype_ge_d_p"
              >{{item.pColorname?item.pColorname:''}} {{item.pPricef}}元 已售{{item.pNum}}件</view>
            </view>
            <view class="fr choosetype_ge_ree">
              <view class="flex choosetype_ge_num">
                <view @click="reduce(index)" style="width: 46upx ;">
                  <img src="../../static/reduce.png" alt class="choosetype_ge_re" />
                </view>

                <view class="choosetype_ge_num_n">{{item.num}}</view>
                <view @click="addnum(index)" style="width: 46upx ;text-align: right">
                  <img src="../../static/addd.png" alt class="choosetype_ge_ad" />
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="choosetype_num ov">
          <view class="fr choosetype_num_p">
            <text>¥</text>
            {{money}}
          </view>
          <view class="choosetype_num_n fr">
            共
            <text>{{num}}</text>件
          </view>
        </view>
        <view>
          <button class="button" @click="submit">确定</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import wxAuth from "../comp/wxAuth";
import goodsLists from "../comp/goodsLists";
export default {
  name: "goodsDetails",
  components: { wxAuth, goodsLists },
  data() {
    return {
      gelists: [
        {
          num: 0,
          money: 10,
        },
        {
          num: 0,
          money: 5,
        },
      ],
      choosetype: false,
      recomList: {
        num: 1,
        from: "his",
        goodsList: [],
      },
      questiontype: "1",
      bannerList: [],
      details: "",
      currentSwiper: 0,
      shareUrl: "",
      isshare: false,
      issharew: false,
      collectstate: "",
      questionsnum: 0,
      questionSonnum: 0,
      evaluatetsnum: 0,
      favorable: 0,
      city: "北京市",
      district: "海淀区",
      wxAuth: {
        show: false,
        islogin: false,
        isphone: false,
      },
      showlogin: false,
      refundexchanged: "",
      needKnow: "",
      money: "0.00",
      num: 0,
      choosepcoverindex: -1,
      choosepcoverimg: "",
      choosegoods: "",
    };
  },
  onLoad(options) {
    if (options.scene) {
      var scene = decodeURIComponent(options.scene).split(";"); //获取二维码的参数
      this.pid = scene[0];
      global.company = scene[1];
      this.uid = scene[2];
    } else {
      this.pid = options.pid;
    }

    if (options.uid) {
      this.uid = options.uid;
    }
    // this.money = this.money.toFixed(2)
  },
  onShow() {
    this.getDetails();
    if (global.defaultAddr) {
      this.city = global.defaultAddr.cname;
      this.district = global.defaultAddr.aname;
    } else {
      this.city = uni.getStorageSync("city");
      this.district = uni.getStorageSync("district");
    }
    var userInfo = uni.getStorageSync("userInfo");
    var userphone = uni.getStorageSync("uPhone");
    if (userInfo) {
      this.userInfo = userInfo;
      if (!userphone) {
        this.showlogin = true;
        this.wxAuth.isphone = true;
      }
    } else {
      this.showlogin = true;
      this.wxAuth.islogin = true;
    }
    this.getSetting();
  },

  onShareAppMessage: function (res) {
    var uShopkeeper = uni.getStorageSync("uShopkeeper");
    var uid = uni.getStorageSync("uid");
    if (uShopkeeper == 1) {
      var page = `pages/class/goodsDetails?pid=${this.details.pid}&uid=${uid}`;
    } else {
      var page = `pages/class/goodsDetails?pid=${this.details.pid}`;
    }
    return {
      title: this.details.pName,
      path: page,
      success: function (res) {},
      fail: function (res) {},
    };
  },
  methods: {
    hvideo() {
      uni.navigateTo({
        url: `/pages/class/pVideo?video=${this.details.pVideo}`,
      });
    },
    pVr() {
      uni.navigateTo({
        url: `/pages/class/pVr?pVr=${this.details.pVr}`,
      });
    },
    async addshopping() {
      var pIdArr = [],
        numArr = [],
        pColorname = [];
      if (this.details.seriesId != 0) {
        this.details.list.forEach((a, b) => {
          if (a.num > 0) {
            pIdArr.push(a.pid);
            numArr.push(a.num);
            pColorname.push(a.pColorname);
          }
        });
      }
      let res = await this.$api.addshoppingcar({
        pId: this.details.seriesId != 0 ? pIdArr.join(";") : this.details.pid,
        pNum: this.details.seriesId != 0 ? numArr.join(";") : "1",
      });
      if (res.data.code == 200) {
        global.showToast("加入购物车成功");
      }
    },
    choosepcover(index) {
      this.choosepcoverindex = index;
      this.choosegoods = this.details.list[index];
      this.pid = this.choosegoods.pid;
      this.getDetails();
    },
    addnum(index) {
      var list = this.details.list;
      var num = list[index].num;
      num = num + 1;
      list[index].num = num;
      this.hh();
    },
    reduce(index) {
      var list = this.details.list;
      var nums = list[index].num;
      if (nums > 0) {
        nums = nums - 1;
        list[index].num = nums;
      }
      this.hh();
    },
    disp() {
      this.choosetype = false;
    },
    hh() {
      var price = 0;
      var numb = 0;
      var arr = [];
      var list = this.details.list;
      for (var i = 0; i < list.length; i++) {
        if (list[i].num > 0) {
          price += list[i].num * list[i].pPricef;
          // numb += list[i].num;
          arr.push(list[i]);
        }
      }
      this.money = price.toFixed(2);
      this.num = arr.length;
    },
    toshare(bool) {
      this.issharew = bool;
    },
    disshare(bool) {
      this.isshare = bool;
    },
    saveimg() {
      var that = this;
      wx.getImageInfo({
        src: that.shareUrl,
        success: (res) => {
          let path = res.path;
          wx.saveImageToPhotosAlbum({
            filePath: path,
            success: (res) => {
              global.showToast("保存成功，请到相册中查看");
            },
            fail: (res) => {
              global.showToast("保存失败，请稍后再试");
            },
          });
        },
        fail: (res) => {
          global.showToast("保存失败，请稍后再试");
        },
      });
    },
    createposter(){
      global.manageDetails = {
        user: this.user,
      };
      global.manageFourIndex = null;
      uni.navigateTo({
        url: "/pages/index/next/goodsPoster?pid=" + this.pid,
      });
    },
    tabClick(index) {
      this.currentTabIndex = index;
      this.uShopkeeper = uni.getStorageSync("uShopkeeper");
    },
    tologin() {
      var userInfo = uni.getStorageSync("userInfo");
      var userphone = uni.getStorageSync("uPhone");
      if (userInfo && userphone) {
        this.showlogin = false;
      } else {
        this.wxAuth.show = true;
      }
    },
    wxisshow(res) {
      if (!res.isphone && !res.islogin) {
        this.showlogin = false;
      }
      this.wxAuth = res;
    },
    chooseaddr() {
      uni.navigateTo({
        url: "/pages/mine/shipAddress",
      });
      global.isChooseAddr = true;
    },
    swiperChange(e) {
      this.currentSwiper = e.detail.current;
    },
    buy(num) {
      this.isbuy = num == "2" ? true : false;
      if (this.details.pCount == 0) {
        global.showToast("当前商品已售空");
        return;
      }
      if (this.details.seriesId != 0) {
        this.choosetype = true;
        this.choosegoods = this.details.list[0];
      } else {
        if (num == 1) {
          this.addshopping();
        } else {
          this.go();
        }
        // this.money = this.details
      }
    },
    submit() {
      if (this.money == 0) {
        global.showToast("请先选择商品");
        return;
      }
      this.details.totalmoney = this.money;
      this.details.totalnum = this.num;
      if (this.isbuy) {
        this.go();
      } else {
        this.addshopping();
      }
    },
    go() {
      uni.navigateTo({
        url: "/pages/class/submitOrder",
      });
      console.log(this.details);
      global.detailShop = this.details;
      global.isshop = true;
      if (this.uid) {
        global.distributionUid = this.uid;
      }
    },
    toNextPage(url, n) {
      if (n == 1) {
        if (this.details.evaluatetList.length == 0) {
          return;
        }
      }
      uni.navigateTo({
        url: "/pages/" + url,
      });
      global.detailShop = this.details;
      if (this.uid) {
        global.distributionUid = this.uid;
      }
    },
    tocall() {
      wx.makePhoneCall({
        phoneNumber: "400-968-6028",
      });
    },
    async getDetails() {
      let res = await this.$api.getgoodsDetails({
        pId: this.pid,
      });
      if (res.data.code == 200) {
        this.details = res.data.data;
        this.collectstate = res.data.collectstate;
        this.details.pPricef = this.details.pPricef.toFixed(2);
        this.details.pPrice = this.details.pPrice.toFixed(2);
        this.details.minPrice = this.details.minPrice.toFixed(2);
        this.details.maxPrice = this.details.maxPrice.toFixed(2);
        this.questionsnum = res.data.questionsnum;
        this.evaluatetsnum = res.data.evaluatetsnum;
        this.favorable = res.data.favorable;
        res.data.data.evaluatetList.forEach((a, b) => {
          a.escore = Math.round(a.escore);
        });
        if (res.data.data.list) {
          res.data.data.list.forEach((a, b) => {
            a.pPrice = a.pPrice.toFixed(2);
            a.pPricef = a.pPricef.toFixed(2);
            a.num = 0;
          });
        }

        this.details.evaluatetList = res.data.data.evaluatetList.slice(0, 2);
        this.details.questions = res.data.data.questions.slice(0, 2);
        this.questiontype = res.data.questiontype;
      }
    },
    async toCollecte() {
      let res = await this.$api.goodsCollect({
        pId: this.pid,
      });
      if (res.data.code == 200) {
        this.collectstate = res.data.collectstate;
        if (res.data.collectstate == 1) {
          global.showToast("收藏成功");
        } else {
          global.showToast("取消收藏成功");
        }
      }
    },
    async getSetting() {
      let res = await this.$api.getSetting({});
      if (res.data.code == 200) {
        this.refundexchanged = res.data.settings.refundexchanged.replace(
          /[\r\n]/g,
          "/"
        );
        this.needKnow = res.data.settings.needKnow;
      }
    },
    toZhuanPage(url){
      uni.navigateTo({
        url: "/pages/mine/" + url,
      });
      global.isChooseAddr = false;
    },
  },
};
</script>

<style scoped lang="scss">
.tobuy {
  view {
    width: 205upx;
    height: 80upx;
    text-align: center;
    line-height: 80upx;
    font-size: 32upx;
    color: #ffffff;
  }
  &_add {
    background: linear-gradient(
      0deg,
      rgba(249, 159, 0, 1),
      rgba(252, 201, 1, 1)
    );
    box-shadow: 0px 8px 25px 0px rgba(249, 160, 0, 0.46);
    border-radius: 20upx 0px 0px 0px;
  }
  &_submit {
    background: linear-gradient(
      -30deg,
      rgba(246, 30, 69, 1),
      rgba(253, 68, 95, 1)
    );
    box-shadow: 0px 2px 25px 0px rgba(251, 88, 103, 0.46);
    border-radius: 0px 0px 20upx 0px;
  }
}
.share {
  position: relative;
  > view {
    position: absolute;
    bottom: 0upx;
    width: 100%;
  }
  img {
    width: 86upx;
    height: 86upx;
    margin-bottom: 10upx;
  }
  &_s {
    width: 100%;
    border-radius: 26upx 26upx 0upx 0upx;
    padding: 40upx 40upx 56upx 40upx;
    background: #f2f2f2;
    font-size: 22upx;
    color: #666666;
    button {
      margin-right: 60upx;
      padding: 0upx;
      background: transparent;
      font-size: 22upx;
      color: #666666;
      line-height: normal;
      width: 86upx;
    }
  }
  &_c {
    width: 100%;
    padding: 30upx 0upx;
    text-align: center;
    /*line-height: 88upx;*/
    background: #ffffff;
    color: #666666;
    font-size: 30upx;
    padding-bottom: calc(30upx + env(safe-area-inset-bottom));
  }
}
.sharewarp {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
}
.shareimg {
  display: flex;
  justify-content: center;
  align-items: center;
  > view {
    position: relative;
  }
  &_m {
    width: 620upx;
    height: 1004upx;
  }
  &_d {
    width: 60upx;
    height: 50upx;
    position: absolute;
    right: 40upx;
    top: 30upx;
  }
}
.arrow {
  width: 12upx;
  height: 18upx;
  position: relative;
  top: 9upx;
}
.swiper {
  /*width: 100%;*/
  height: 750upx;
  position: relative;
  margin-bottom: 9upx;
  .img {
    width: 100%;
    height: 100%;
  }
}

.dots {
  position: absolute;
  bottom: 21upx;
  right: 0upx;
  background: rgb(196, 196, 196);
  /*opacity: 0.1;*/
  border-bottom-left-radius: 30upx;
  border-top-left-radius: 30upx;
  font-weight: bold;
  font-style: italic;
  padding: 10upx 40upx 10upx 27upx;
  color: #fff;
  &_now {
    font-size: 26upx;
  }
  &_len {
    font-size: 18upx;
    font-weight: 500;
  }
  &_x {
    font-size: 20upx;
    margin-left: 5upx;
    margin-right: 5upx;
  }
}
.details {
  > view {
    border-radius: 20upx;
    background: #ffffff;
    padding: 40upx;
    margin-bottom: 19upx;
  }
  .price {
    &_mon {
      margin-bottom: 29upx;
      &_no {
        color: #ff0000;
        font-size: 58upx;
        font-weight: bold;
        margin-right: 19upx;
        > text {
          font-size: 30upx;
        }
      }
      &_ol {
        color: #999999;
        font-size: 22upx;
        text-decoration: line-through;
        margin-top: 30upx;
      }
    }
    &_one {
      margin-bottom: 19upx;
      text {
        display: inline-block;
        padding: 6upx 20upx;
        border: 1px solid rgba(206, 206, 206, 0.8);
        color: #666666;
        font-size: 20upx;
        border-radius: 20upx;
        margin-right: 9upx;
      }
      text:last-child {
        color: rgba(246, 30, 69, 0.8);
        border: 1px solid rgba(255, 0, 0, 0.2);
      }
    }
    &_tips {
      margin-bottom: 30upx;
      &_zi {
        color: #fc4a5b;
        padding: 5upx 13upx;
        background: rgba(246, 30, 69, 0.1);
        font-size: 18upx;
        border-radius: 20upx 0upx 20upx 0upx;
        margin-right: 9upx;
      }
      &_zhi {
        font-size: 24upx;
        color: #999999;
        margin-left: 11upx;
      }
      &_con {
        font-weight: bold;
        color: #333333;
        font-size: 28upx;
      }
    }
  }
  .deinstru {
    > view {
      padding-bottom: 28upx;
      padding-top: 29upx;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    > view:first-child {
      padding-top: 0upx;
    }
    > view:last-child {
      padding-bottom: 0upx;
      border-bottom: none;
    }
    &_add {
      width: 17upx;
      height: 21upx;
      margin-right: 9upx;
    }
    &_le {
      color: #030d18;
      font-weight: bold;
      font-size: 26upx;
      margin-right: 38upx;
    }
    &_addr {
      color: #333333;
      font-size: 24upx;
    }
    &_bao {
      color: #999999;
    }
  }
  .otherins {
    &_tit {
      &_icon {
        width: 6upx;
        height: 24upx;
        margin-right: 10upx;
        position: relative;
        top: 9upx;
      }
      &_txt {
        color: #030d18;
        font-weight: bold;
        font-size: 26upx;
        > text {
          font-size: 18upx;
          display: inline-block;
          margin-left: 5upx;
        }
      }
      &_more {
        color: #666666;
        font-size: 22upx;
        position: relative;
        top: 9upx;
        > img {
        }
      }
      .arrow {
        margin-left: 9upx;
      }
    }
  }
  .comments {
    margin-top: 37upx;
    &_ava {
      width: 60upx;
      height: 60upx;
      border-radius: 50%;
      margin-right: 10upx;
    }
    &_star {
      width: 20upx;
      height: 20upx;
      margin-right: 8upx;
    }
    &_txt {
      margin-top: 26upx;
      font-size: 28upx;
      color: #333333;
    }
    > view {
      padding-bottom: 30upx;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding-top: 30upx;
    }
    > view:last-child {
      border-bottom: none;
      padding-bottom: 0upx;
    }
    > view:first-child {
      padding-top: 0upx;
    }
  }
  .question {
    > view {
      margin-bottom: 20upx;
    }
    > view:last-child {
      margin-bottom: 0upx;
    }
    margin-top: 30upx;

    img {
      width: 34upx;
      height: 34upx;
      margin-right: 18upx;
      position: relative;
      top: 0upx;
      /*left: 0px;*/
    }
    &_que {
      color: #333333;
      font-size: 24upx;
      display: inline-block;
      width: 400upx;
      height: 30upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &_ans {
      font-size: 20upx;
      color: #999999;
    }
    &_icon {
      color: #f61e45;
      font-size: 13upx;
      position: relative;
      text {
        z-index: 999;
        display: inline-block;
        width: 23upx;
        height: 23upx;
        text-align: center;
        line-height: 23upx;
        position: absolute;
        top: 3upx;
        left: 0upx;
      }
    }
  }
}
.detaileTitle {
  background: transparent;
  text-align: center;
  color: #333333;
  font-size: 28upx;
  margin-bottom: 0upx;
  padding-bottom: 20upx;
  &_line {
    display: inline-block;
    width: 58upx;
    height: 1px;
    background: #000000;
    opacity: 0.3;
    position: relative;
    top: -10upx;
  }
  &_ti {
    margin-left: 20upx;
    margin-right: 20upx;
  }
}
.introduce {
  background: white;
  padding-top: 40upx;
  margin-bottom: 140upx;
  &_ti {
    margin-bottom: 28upx;
    &_icon {
      width: 24upx;
      height: 24upx;
      margin-right: 10upx;
      position: relative;
      top: 3upx;
    }
    &_tx {
      color: #333333;
      font-size: 24upx;
    }
  }
  &_table {
    &_th {
      border: 2upx solid rgba(0, 0, 0, 0.1);
      font-size: 24upx;
      &_td {
        border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
      }
      &_td:last-child {
        border-bottom: none;
      }
      &_le {
        width: 198upx;
        border-right: 2upx solid rgba(0, 0, 0, 0.1);
        padding: 28upx 0upx 27upx 40upx;
        color: #999999;
      }
      &_ri {
        color: #666666;
        padding: 28upx 0upx 27upx 40upx;
      }
    }
    &_shadow {
      margin-top: -100upx;
      margin-bottom: 40upx;
      > img {
        width: 100%;
        height: 150upx;
      }
      &_open {
        color: #999999;
        font-size: 26upx;
        text-align: center;
        img {
          width: 16upx;
          height: 8upx;
          margin-left: 10upx;
        }
      }
    }
  }
  &_im {
    img {
      width: 100%;
    }
  }
}
.buynow {
  position: fixed;
  bottom: 0upx;
  padding: 20upx 40upx 20upx 60upx;
  background: white;
  width: 100%;
  box-shadow: 0px 0px 46upx 0px rgba(67, 67, 67, 0.07);
  img {
    width: 50upx;
    height: 45upx;
    margin-bottom: 10upx;
  }
  &_for {
    color: #666666;
    font-size: 20upx;
    > view {
      text-align: center;
      margin-right: 30upx;
    }
    button {
      background: white;
      padding: 0upx;
      color: #666666;
      font-size: 20upx;
      margin-right: 30upx;
      position: relative;
      height: 100upx;
      width: 50upx;
      text-align: center;
      view {
        position: absolute;
        bottom: 0upx;
        width: 100%;
        text-align: center;
      }
    }
    button:after {
      border: none;
    }
  }
  .button {
    width: 334upx;
    height: 88upx;
  }
}
.none {
  color: #666666;
  font-size: 24upx;
  text-align: center;
}
.xuzhi {
  color: #999999;
  padding: 40upx;
  &_t {
    font-weight: bold;
    color: #333333;
    margin-bottom: 14upx;
    font-size: 26upx;
  }
  &_c {
    text-indent: 48upx;
  }
}
.choosetype {
  > view {
    width: 100%;
    padding: 40upx;
    background: white;
    border-radius: 40upx 40upx 0upx 0upx;
    position: absolute;
    bottom: 0upx;
    color: #333333;
  }
  text {
    font-weight: bold;
    font-size: 24upx;
    margin-right: 5upx;
  }
  &_dt {
    width: 198upx;
    height: 198upx;
    margin-right: 22upx;
  }
  &_tt {
    width: 376upx;
    font-size: 28upx;
    font-weight: bold;
    height: 70upx;
    margin-bottom: 36upx;
  }
  &_p {
    font-size: 44upx;
    color: #f61e45;
    font-weight: bold;
  }
  &_de {
    width: 33upx;
    height: 33upx;
    position: relative;
    top: -10upx;
  }
  .chooseactive {
    border: 1px solid #f61e45;
    background: ffd6dd;
  }
  &_ge {
    font-size: 26upx;
    margin-top: 45upx;
    padding-bottom: 40upx;
    border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
    margin-bottom: 30upx;
    max-height: 400upx;
    overflow-y: scroll;
    &_wr {
      margin-bottom: 20upx;
    }
    &_t {
      margin-bottom: 31upx;
    }
    &_re {
      width: 22upx;
      height: 4upx;
      position: relative;
      top: -2upx;
    }
    &_ad {
      width: 22upx;
      height: 22upx;
      position: relative;
      top: 4upx;
    }
    &_d {
      padding: 20upx;
      border-radius: 20upx;
      background: #f2f2f2;
      width: 515upx;
      &_p {
        font-size: 22upx;
        font-weight: 300;
      }
    }
    &_ree {
      veralign: middle;
      &:before {
        content: "";
        display: inline-block;
        width: 0;
        height: 100%;
        veralign: middle;
      }
    }
    &_num {
      &_n {
        width: 45upx;
        height: 42upx;
        background: #f6f6f6;
        font-size: 28upx;
        font-weight: bold;
        text-align: center;
        line-height: 42upx;
        /*margin-left: 24upx;*/
        /*margin-right: 24upx;*/
        border-radius: 10upx;
      }
    }
  }
  &_num {
    margin-bottom: 37upx;
    &_n {
      font-size: 22upx;
      color: #666666;
      margin-right: 10upx;
      position: relative;
      top: 13upx;
      > text {
        font-weight: bold;
        font-size: 26upx;
        margin-right: 0upx;
      }
    }
    &_p {
      color: #f61e45;
      font-size: 40upx;
      color: #f61e45;
      font-weight: bold;
    }
  }
}
.chooselabel {
  position: absolute;
  right: 20upx;
  bottom: 40upx;
}

.vr {
  width: 55upx;
  height: 47upx;
  margin-left: 10upx;
}

.chooselabel > view {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  height: 47upx;
  line-height: 47upx;
  font-size: 20upx;
  border-radius: 20upx;
  padding: 0upx 20upx;
  margin-left: 10upx;
}
.tupian {
  width: 25rpx;
  height: 21rpx;
  margin-right: 10upx;
}
</style>