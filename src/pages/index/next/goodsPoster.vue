<template>
  <view>
    <tabControl
      :current="current"
      :values="items"
      bgc="#fff"
      :fixed="true"
      :scrollFlag="true"
      :isEqually="true"
      @clickItem="onClickItem"
    ></tabControl>

    <swiper class="swiper" style="height: 1334rpx;" @change="scollSwiper" :current="current">
      <swiper-item v-for="(i,index) in items" :key="index">
        <view class="showImages">
          <img src="../../../static/canvas.png" alt />
          <view class="showImages_main">
            <view class="space-between">
              <view style="position:absolute;left:369upx;top:787upx;">
                <img style="width:249upx;height:74upx;" src="../../../static/yongjinlogo.png" alt="">
              </view>
              <view class="flex">
                <img :src="user.uPic" alt class="showImages_main_ava" />
                <view>
                  <view class="showImages_main_t">{{user.uName}}</view>
                  <view class="showImages_main_c">{{describe}}</view>
                </view>
              </view>
              <img
                src="../../../static/canvasedit.png"
                alt
                class="showImages_main_edit"
                @click="editText"
              />
            </view>
            <view v-if="current == 0">
              <view class="showImages_main_con">
                <img :src="singleDraw.pCover" alt class="showImages_main_con_i" />
                <img
                  src="../../../static/choose.png"
                  alt
                  class="showImages_main_con_e"
                  @click="chooseSingle"
                />
              </view>
              <view>
                <view class="showImages_main_ct">{{singleDraw.pName}}</view>
                <view class="showImages_main_p">
                  <text>￥</text>
                  {{singleDraw.pPricef}}
                </view>
              </view>
            </view>

            <view class="showImages_per space-between align-center">
              <view class="flex">
                <img :src="userInfo.avatarUrl" alt class="showImages_per_a" />
                <view>
                  <view class="showImages_per_t">{{userInfo.nickName}}</view>
                  <view class="showImages_per_s">我通过驿货分享了一件商品</view>
                </view>
              </view>
              <view class="WXcodeImage">
                <img show-menu-by-longpress :src="ShopImageCode" alt />
                <view>长按识别 即可购买</view>
              </view>
            </view>
          </view>
          <view class="showImages_t">驿货商城</view>
        </view>
      </swiper-item>
    </swiper>
    <view class="save">
      <button class="button" @click="save">保存图片</button>
    </view>
    <view class="popup" v-if="isedit">
      <view>
        <view class="popup_tit">修改描述性文字</view>
        <view>
          <textarea name id cols="30" rows="10" placeholder="请输入您想分享的内容..." v-model="describe"></textarea>
        </view>
        <view class="space-between popup_btn">
          <button class="button cancel" @click="cancel">取消</button>
          <button class="button" @click="sueredit">确定</button>
        </view>
      </view>
    </view>
    <view style="position: fixed;opacity: 0;top: 9999999999rpx">
      <canvas style="width: 375px; height: 663px;opacity: 0" canvas-id="firstCanvas"></canvas>
    </view>
  </view>
</template>

<script>
import tabControl from "../../comp/tabControl-tag";
export default {
  name: "forward",
  components: { tabControl },
  data() {
    return {
      items: ["单图海报", "四图海报"],
      current: 0,
      isedit: false,
      describe: "各地土特产商品尽在驿货商城热卖快来剁手",
      shop: "",
      user: "",
      singleDraw: "",
      userInfo: "",
      loadSingleImagePath: "",
      ShopImageCode: "",
    };
  },
  onLoad(option) {
    this.pid = option.pid;
    console.log(this.pid);
    console.log(this.singleDraw);
    var userInfo = JSON.parse(uni.getStorageSync("userInfo"));
    this.userInfo = userInfo;
  },
  onShow() {
    this.user = global.manageDetails.user;
    this.detailslists();
  },
  onReady() {
    // this.draw()
  },
  methods: {
    async detailslists() {
      let res = await this.$api.detailslists({
        pid: this.pid,
      });
      this.ShopImageCode = res.QRurl;
    },
    splitTwo(price) {
      return price.split(".")[0];
    },
    splitTwo2(price) {
      return price.split(".")[1];
    },

    async draw() {
      const promixify = (api) => {
        return (options, ...params) => {
          return new Promise((resolve, reject) => {
            api(
              Object.assign({}, options, { success: resolve, fail: reject }),
              ...params
            );
          });
        };
      };

      const getImageInfo = promixify(wx.getImageInfo);
      if (this.current == 0) {
        var images = [
          this.singleDraw.pCover,
          this.user.uPic,
          this.userInfo.avatarUrl,
          this.ShopImageCode,
        ];
      }
      Promise.all(images.map((img) => getImageInfo({ src: img }))).then(
        (imageInfos) => {
          this.drawSingleImage(imageInfos);
        }
      );
    },
    drawSingleImage(images) {
      wx.showLoading({
        title: "生成中",
      });
      var context = uni.createCanvasContext("firstCanvas");
      // setTimeout(()=>{
      context.drawImage("../../../static/canvas.png", 0, 0, 375, 663);
      // context.drawImage('../../../static/code.png', 242, 490, 77, 94)
      context.drawImage(images[3].path, 242, 490, 77, 78);
      this.drawImage(context, 263, 263, 56, 130, 190, images[0].path);
      this.fillText(context, 15, "#333", this.user.uName, 123, 70, 175);
      // 绘制价格
      let title = this.describe; //商品名称
      let title2; //商品名称
      if (title.length > 10) {
        title2 = title.slice(10, title.length);
        title = title.slice(0, 10);
      }
      if (title2) {
        if (title2.length > 10) {
          title2 = title2.slice(0, 8) + " ...";
        }
      }

      this.fillText(context, 10, "#999", title, 123, 90, 175);
      if (title2) {
        this.fillText(context, 10, "#999", title2, 123, 105, 175);
      }

      this.fillText(context, 13, "#333", this.singleDraw.pName, 60, 420, 175);
      this.fillText(context, 12, "#F61E45", "￥", 60, 445);
      this.fillText(
        context,
        19,
        "#F61E45",
        this.splitTwo(this.singleDraw.pPricef),
        72,
        445
      );
      this.fillText(
        context,
        12,
        "#F61E45",
        "." + this.splitTwo2(this.singleDraw.pPricef),
        103,
        445
      );
      context.drawImage("../../../static/dashed.png", 24, 470, 327, 1);
      this.fillText(context, 12, "#333", this.userInfo.nickName, 100, 530);
      this.fillText(context, 10, "#999", "我通过驿货分享了一件商品", 100, 550);
      this.fillText(context, 16, "#fff", "驿货商城", 157, 640);
      this.fillText(context, 9, "#999", "长按识别 即可购买", 242, 580);
      this.drawImage(context, 52, 52, 56, 57, 35, images[1].path);
      this.drawImage(context, 38, 38, 56, 515, 19, images[2].path);

      context.draw();
      var that = this;
      setTimeout(function () {
        wx.hideLoading();
        that.saveImg("firstCanvas");
      }, 500);
      // },2000)
    },
    namelength(text) {
      if (text.length > 9) {
        text = text.slice(0, 7) + " ...";
      }
      return text;
    },
    saveImg(canvasId) {
      wx.showLoading({
        title: "下载中",
      });
      wx.canvasToTempFilePath({
        canvasId: canvasId,
        x: 0,
        y: 0,
        width: 375,
        height: 667,
        //复制 * 750 / wx.getSystemInfoSync().windowWidth,换算成rpx；
        destWidth: 750,
        destHeight: 1334,
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: (res) => {
              wx.hideLoading();
              global.showToast("保存成功，请到相册中查看");
            },
            fail: (res) => {
              wx.hideLoading();
              global.showToast("保存失败，请稍后再试");
            },
          });
        },
        fail: function (res) {},
      });
    },
    drawImage(context, width, height, x, y, r, img) {
      context.save();
      context.beginPath();
      context.arc(width / 2 + x, height / 2 + y, r, 0, Math.PI * 2, false);
      context.clip();
      context.drawImage(img, x, y, width, height);
      context.restore();
    },
    fillText(context, font, color, text, x, y) {
      context.setFontSize(font);
      context.setFillStyle(color);
      context.fillText(text, x, y);
    },
    onClickItem(val) {
      this.current = val.currentIndex;
    },
    scollSwiper(e) {
      this.current = e.target.current;
    },
    editText() {
      this.isedit = true;
    },
    cancel() {
      this.isedit = false;
    },
    sueredit() {
      this.isedit = false;
      // this.describe = ''
    },
    scollSwiper(e) {
      this.current = e.target.current;
    },
    chooseSingle() {
      uni.navigateTo({
        url: `/pages/index/next/chooseGoods?current=${this.current}`,
      });
    },
    chooseFour(index) {
      uni.navigateTo({
        url: `/pages/index/next/chooseGoods?current=${this.current}&index=${index}`,
      });
    },
    save() {
      this.draw();
    },
  },
};
</script>

<style scoped lang="scss">
.swiper {
  margin-top: 110upx;
  margin-bottom: 180upx;
}
.showImages {
  position: relative;
  > img {
    width: 750upx;
    height: 1334upx;
  }
  &_main {
    position: absolute;
    top: 114upx;
    width: 100%;
    padding: 0upx 112upx;
    &_ava {
      width: 103upx;
      height: 103upx;
      border-radius: 20upx 0px 20px 0px;
      margin-right: 30upx;
    }
    &_t {
      font-size: 30upx;
      color: #333333;
      margin-bottom: 10upx;
    }
    &_c {
      font-size: 20upx;
      font-weight: 300;
      width: 309upx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    &_edit {
      width: 54upx;
      height: 54upx;
      margin-top: 50upx;
    }
    &_con {
      margin-top: 30upx;
      position: relative;
      &_i {
        width: 526upx;
        height: 526upx;
        border-radius: 10upx;
      }
      &_e {
        width: 68upx;
        height: 70upx;
        position: absolute;
        right: 14upx;
        top: 12upx;
      }
    }
    &_ct {
      width: 405upx;
      font-size: 26upx;
      color: #333333;
      margin-top: 30upx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &_p {
      font-weight: bold;
      font-size: 37upx;
      margin-top: 16upx;
      margin-bottom: 50upx;
      color: #f61e45;
      > text {
        font-size: 24upx;
      }
    }
  }
  &_per {
    padding-top: 30upx;
    // border-top: 1px dashed rgba(5, 0, 1, 0.1);
    &_a {
      width: 76upx;
      height: 76upx;
      margin-right: 20upx;
      border-radius: 50%;
    }
    &_t {
      font-size: 25upx;
      color: #333333;
      margin-bottom: 14upx;
    }
    &_s {
      color: #999999;
      font-weight: 300;
      font-size: 20upx;
    }
    > img {
      width: 154upx;
      height: 187upx;
    }
  }
  &_t {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 40upx;
    color: #ffffff;
    font-size: 30upx;
  }
}
.save {
  width: 100%;
  position: fixed;
  bottom: 0upx;
  height: 128upx;
  padding: 20upx 40upx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 46upx 0px rgba(67, 67, 67, 0.07);
}
.showfour {
  .showImages_main_con_i {
    width: 253upx !important;
    height: 224upx !important;
  }
  .showImages_main_ct {
    width: 189upx;
    margin-top: 9upx;
  }
  &_con {
    width: 100%;
    margin-top: 20upx;
    flex-wrap: wrap;
    > view {
      width: 253upx;
    }
    .showImages_main_p {
      margin-bottom: 20upx;
    }
  }
  .showImages_main_con {
    margin-top: 0upx;
  }
  .showImages_per {
    margin-top: 30upx;
  }
  .showImages_main_p {
    margin-top: 0upx;
  }
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  > view {
    width: 670upx;
    height: 502upx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: 20upx;
    padding: 50upx 40upx 40upx 40upx;
  }
  &_tit {
    text-align: center;
    font-size: 38upx;
    color: #333333;
    font-weight: bold;
    margin-bottom: 50upx;
  }
  textarea {
    height: 230upx;
  }
  &_btn {
    button {
      width: 278upx;
      height: 88upx;
      line-height: 88upx;
    }
  }
  .cancel {
    background: rgba(242, 234, 235, 1);
    box-shadow: none;
    color: #999999;
  }
}
.WXcodeImage {
  width: 152upx;
  height: 188upx;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}
.WXcodeImage img {
  width: 100%;
  height: 154upx;
}
.WXcodeImage view {
  margin-top: 7px;
  width: 100%;
  height: 18upx;
  line-height: 18upx;
  font-size: 18upx;
  color: #999999;
  text-align: center;
}
</style>