<script>
export default {
  created () {
  },
  onShow: function () {
      wx.hideTabBar()
    wx.login({
      success: res => {
        global.wxAuth(res.code)
      }
    })
  },
  onHide: function () {
  },
}
</script>

<style>
view {
  box-sizing: border-box;
}
page {
  width: 100%;
  overflow-x: hidden;
  font-size: 22upx;
  background: #f8f6f6;
  box-sizing: border-box;
}
.flex {
  display: flex;
}
.box {
  box-sizing: border-box;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.cl {
  zoom: 1;
}
.ov:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.ov {
  zoom: 1;
}
.space-between {
  display: flex;
  justify-content: space-between;
}
.space-around {
  display: flex;
  justify-content: space-around;
}
.align-center {
  display: flex;
  align-items: center;
}
.margin40 {
  margin: 0px 40upx;
}
.fontSize22 {
  font-size: 22upx;
}
.fontSize24 {
  font-size: 24upx;
}
.fontSize28 {
  font-size: 28upx;
}
.button {
  background: linear-gradient(
    -30deg,
    rgba(246, 30, 69, 1),
    rgba(253, 68, 95, 1)
  );
  box-shadow: 0px 2upx 25upx 0px rgba(251, 88, 103, 0.46);
  border-radius: 20upx 0px 20upx 0px;
  color: white;
  border: none;
}
.label {
  display: inline-block;
  width: 57upx;
  height: 27upx;
  text-align: center;
  line-height: 27upx;
  font-size: 18upx;
  color: white;
  border-radius: 20upx 0upx 20upx 0px;
  background: #fc4a5b;
  margin-right: 10upx;
  position: relative;
  top: -3upx;
}
button:after {
  border: none;
}
.areaLi {
  padding: 40upx;
  background: white;
  box-shadow: 0px 3px 8upx 0px rgba(0, 0, 0, 0.08);
  border-radius: 20upx;
  margin-bottom: 20upx;
}
.color999 {
  color: #999999;
}
.tologin {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /*z-index: 999;*/
}
</style>
