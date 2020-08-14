<template>

    <view class="tabwrap">
      <block v-for="(item,index) in tabList" :key="index">
        <view class="navigator" :class="currentTabIndex == index ? 'on' : ''" @tap="switchTab(item.pagePath,index)"   v-if="item.uShopkeeper == 1" :style="tabList.length==4?'width:25%':'width:20%'">
            <view class="icon">
                <img :src="index == currentTabIndex ? item.selectedIconPath : item.iconPath" alt="">
            </view>
            <view class="text" :style="currentTabIndex == index ? 'color:#333' : 'color:#999'">{{item.text}}</view>
        </view>
        </block>
    </view>
</template>

<script>
export default {
  data () {
    return {
      tabList: [{
        "pagePath": "/pages/index/index",
        "iconPath": require("../../static/tab/index.png"),
        "selectedIconPath": "../../static/tab/index_checked.png",
        "text": "首页",
        uShopkeeper: 1
      }, {
        "pagePath": "/pages/class/index",
        "iconPath": "../../static/tab/class.png",
        "selectedIconPath": "../../static/tab/class_checked.png",
        "text": "分类",
        uShopkeeper: 1
      }, {
        "pagePath": "/pages/shopping/index",
        "iconPath": "../../static/tab/shopping_checked.png",
        "selectedIconPath": "../../static/tab/shopping.png",
        "text": "购物车",
        uShopkeeper: 1
      }, {
        "pagePath": "/pages/mine/index",
        "iconPath": "../../static/tab/mine.png",
        "selectedIconPath": "../../static/tab/mine_checked.png",
        "text": "我的",
        uShopkeeper: 1
      }, {
        "pagePath": "/pages/owner/index",
        "iconPath": "../../static/tab/owner.png",
        "selectedIconPath": "../../static/tab/owner_checked.png",
        "text": "店主",
        uShopkeeper: 2
      }],
      currentTabIndex: this.current
    }
  },
  props: {
    current: { type: [Number, String], default: 0 },
    ushopkeeper: { type: [Number, String], default: 1 }
  },
  watch: {
      ushopkeeper:{
          handler (newval, oldval) {
              console.log(newval)
              this.tabList[4].uShopkeeper = newval

          },
          deep:true
      }

  },
  mounted () {
    // setTimeout(()=>{
        var uShopkeeper = uni.getStorageSync('uShopkeeper')
        this.tabList[4].uShopkeeper = uShopkeeper
    //   console.log(uShopkeeper)
    // },2000)

  },
  methods: {
      switchTab(path, index) {
        // this.currentTabIndex = index
        console.log(this.ushopkeeper)
        // return
      // if (this.currentTabIndex == index) return false
      uni.switchTab({
        url: path
      })

      // this.$emit('click', index)
    }
  },
}
</script>

<style scoped lang="scss">
.tabwrap {
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background: rgba(249, 249, 249, 1);
  box-shadow: 0px -1px 11px 0px rgba(11, 4, 7, 0.12);
  font-size: 20upx;
  padding: 16upx 0upx;
  padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
  img {
    width: 40upx;
    height: 40upx;
  }
}
.navigator {
  text-align: center;
}
</style>