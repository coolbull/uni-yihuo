<template>
    <view class="sharewarp choosetype" v-if="choosetype">
        <view>
            <view class="ov">
                <img :src="choosegoods.pCover" alt="" class="choosetype_dt fl">
                <view class="fl">
                    <view class="choosetype_tt">{{choosegoods.pName?choosegoods.pName:''}}</view>
                    <view class="choosetype_p" v-if="choosepcoverindex==-1">
                        <text>¥</text>
                        {{detail.minPrice}} - <text :decode="true" :space="true" style="margin-left: 10upx">¥</text> {{detail.maxPrice}}
                    </view>
                    <view class="choosetype_p" v-if="choosepcoverindex!=-1">
                        <!--                            <text>¥</text>-->
                        {{choosegoods.pPricef}}
                    </view>
                </view>
                <img src="../../static/dele.png" alt="" class="fr choosetype_de" @click="disp">
            </view>
            <view class="choosetype_ge">
                <view class="choosetype_ge_t">规格</view>
                <view class="ov choosetype_ge_wr" v-for="(item,index) in detail.list">
                    <view :class="choosepcoverindex == index ? 'fl choosetype_ge_d chooseactive' : 'fl choosetype_ge_d'" @click="choosepcover(index)">
                        <view>
                            {{item.pName}}
                        </view>
                        <view class="choosetype_ge_d_p">
                            {{item.pColorname?item.pColorname:''}} {{item.pPricef}}元   已售{{item.pNum}}件
                        </view>
                    </view>
                    <view class="fr choosetype_ge_ree">
                        <view class="flex choosetype_ge_num">
                            <view @click="reduce(index)" style="width: 46upx ;">
                                <img src="../../static/reduce.png" alt="" class="choosetype_ge_re " >
                            </view>

                            <view class="choosetype_ge_num_n">{{item.num}}</view>
                            <view @click="addnum(index)" style="width: 46upx ;text-align: right">
                                <img src="../../static/addd.png" alt="" class="choosetype_ge_ad ">
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
                <view class="choosetype_num_n fr">共<text>{{num}}</text>件</view>
            </view>
            <view>
                <button class="button" @click="submit">确定</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
  name: "chooseDetails",
  props: {
    choosetype: {
      type: Boolean,
    },
    details: {
      type: Object
    },

  },
  watch: {
    choosetype (newval, olaval) {
      console.log(newval)
      this.choosetypes = newval
    },
    details (newval, oldval) {
      this.detail = newval
      this.choosegoods = this.detail.list[0]
    }
  },
  data () {
    return {
      num: 0,
      money: '0.00',
      choosetypes: false,
      choosegoods: '',
      choosepcoverindex: -1,
      detail: ''
    }
  },
  methods: {
    reduce (index) {
      var list = this.detail.list;
      var nums = Number(list[index].num);
      if (nums > 0) {
        nums = nums - 1;
        list[index].num = nums;
      }
      this.hh()
    },
    submit () {
      this.detail.totalMoneys = this.money
      this.detail.totalNums = this.num
      this.$emit('submit', this.detail)
    },
    addnum (index) {
      var list = this.detail.list;
      var num = Number(list[index].num);
      num = num + 1;
      list[index].num = num;

      this.detail.list = list
      console.log(this.detail.list)
      this.hh()
    },
    hh () {
      var price = 0;
      var numb = 0;
      var arr = []
      var list = this.detail.list;
      for (var i = 0; i < list.length; i++) {
        if (list[i].num > 0) {
          price += list[i].num * list[i].pPricef;
          // numb += list[i].num;
          arr.push(list[i])
        }
      }
      this.money = price.toFixed(2);
      this.num = arr.length;
    },
    disp () {
      this.$emit('closepop')
      // this.choosetype = false
    },
    choosepcover (index) {
      this.choosepcoverindex = index
      this.detail.list[index].pPricef = this.detail.list[index].pPricef.toFixed(2)
      this.choosegoods = this.detail.list[index]
      this.pid = this.detail.pid
    },
  }

}
</script>

<style scoped lang="scss">
.sharewarp {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
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
</style>