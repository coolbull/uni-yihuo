<template name="tabControl">
		<scroll-view  scroll-x="true" :style="'background-color:'+bgc+';top:'+top+'px;'" :class="fixed?'fxied':''" :scroll-left='scrollLeft' scroll-with-animation id="tabcard">

			<view class="tabList" :style="isEqually?'display: flex;justify-content: space-between;padding-left:0;':''">
				<view
					:class="'tabItem'+(currentIndex==index?' thisOpenSelect':'')"
					:style="isEqually? 'width:'+windowWidth/values.length+'px;margin-right:0;':''"
					v-for="(item,index) in values" 
					:id="'item'+index"
					:key='index' 
					@click="_onClick(index)">
					<view class="flex" style="justify-content: center">
						<text :style="currentIndex==index?'color:#030d18;font-weight:bold':'color:#999;font-weight:300'" >{{item}}</text>
						<view class="choose"  v-if="from=='search'">
							<view v-if="item=='价格'" style="height: 20rpx;position: relative">
								<img :src="currentIndex==index?'../../static/arrow_top_checked.png':'../../static/arrow_top.png'" alt="" class="arrow_bottom" style="position: absolute;top: 0rpx">
<!--								<view>-->
									<img :src="currentIndex==index?'../../static/arrow_checked.png':'../../static/arrow_bottom.png'" alt="" class="arrow_bottom" style="position: absolute;bottom: 0rpx">
<!--								</view>-->
							</view>

							<img :src="currentIndex==index?'../../static/arrow_checked.png':'../../static/arrow_bottom.png'" alt="" class="arrow_bottom" v-if="item=='全部'||item=='分类'">
						</view>
					</view>

					<view class="activeLine" :style="{width: lineWidth+'rpx'}"></view>
				</view>
			</view>
		</scroll-view>
</template>

<script>
	export default {
		name:'tabControl',
		props:{
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return []
				}
			},
			from:{
				type:String
			},
			bgc:{
				type:String,
				default:''
			},
			fixed:{
				type:Boolean,
				default:false
			},
			scrollFlag:{
				type:Boolean,
				default:false
			},
			lineWidth:{
				type:Number,
				default: 48
			},
			itemSize:{
				type:Number,
				default: 30
			},
			activeSize:{
				type:Number,
				default: 32
			},
			activeColor:{
				type:String,
				default:''
			},
			top:{
				type:Number,
				default: 0
			},
			isEqually:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				currentIndex: 0,
				windowWidth:0,	//设备宽度
				leftList:[],	//选项距离左边的距离
				widthList:[],	//选项宽度
				scrollLeft:0,   //移动距离
				newScroll:0,    //上一次移动距离(用来判断是左滑还是右滑)
				wornScroll:0,    //上一次移动距离(用来判断是左滑还是右滑)
				searchpname:''
			};
		},
		created(){
			
		},
		mounted(){
			setTimeout(()=>{
				uni.createSelectorQuery().in(this).select("#tabcard").boundingClientRect((res)=>{
					this.$emit('getTabCardHeight', {height:res.height})
				}).exec()
				uni.getSystemInfo({
				    success: (res)=> {
						this.windowWidth = res.windowWidth;
						this.values.forEach((i,v)=>{
							let info = uni.createSelectorQuery().in(this);
							info.select("#item"+v).boundingClientRect((res)=>{
								// 获取第一个元素到左边的距离
								// if(v==0){
								// 	this.startLenght = res.left
								// }
							    this.widthList.push(res.width)
								this.leftList.push(res.left)
								
							}).exec()
							
						})
				    }
				});
			})
		},
		created() {
			this.currentIndex = this.current
			if(this.scrollFlag){
				setTimeout(()=>{
					this.tabListScroll(this.current)
				},300)
			}
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val
					if(this.scrollFlag){
						this.tabListScroll(val)
					}
				}
			},
			
		},
		methods: {
			_onClick(index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index
					this.$emit('clickItem', {currentIndex:index})
					// 开启滚动
					if(this.scrollFlag){
						this.tabListScroll(index)
					}
				}
			},
			// 选项移动
			tabListScroll(index){
				let scoll = 0;
				this.wornScroll = index;
				// this.wornScroll-this.newScroll>0 在向左滑  ←←←←←
				if(this.wornScroll-this.newScroll>0){
					for(let i = 0;i<this.leftList.length;i++){
						if(i>1&&i==this.currentIndex){
							scoll = this.leftList[i-1]
						}
					}
				}else{
					if(index>1){
						for(let i = 0;i<this.leftList.length;i++){
							if(i<index-1){
								scoll = this.leftList[i]
							}
						}
					}else{
						scoll = 0
					}
				}
				this.newScroll = this.wornScroll;
				this.scrollLeft = scoll;
			},
			search(){
				this.$emit('searchchange',this.searchpname)

			}
		}
	}
</script>

<style lang="scss" scoped>
	.choose{
		display: flex;
		align-items: center;
		margin-left: 10upx;
		img{
			width: 11upx;
			height: 8upx;
		}
	}

	.fxied{
		position: fixed;
		z-index: 2;
	}
	.tabList{
		padding-top: 24rpx;
		padding-left: 24rpx;
		padding-bottom: 3rpx;
		white-space: nowrap;
		text-align: center;
		font-size: 34upx;
		.tabItem{
			margin-right: 60rpx;
			display: inline-block;
			position: relative;
			text{
				// font-size: 30rpx;
				line-height: 44rpx;
				color: #666;
				transition: all 0.3s ease 0s;
			}
			.activeLine{
				 width: 63rpx;
				height: 4rpx;
				background:linear-gradient(-30deg,rgba(246,30,69,1),rgba(253,68,95,1));
				margin-top: 28rpx;
				margin-left: 50%;
				transform: translateX(-50%);
				opacity: 0;
				transition: all 0.3s ease 0s;
			}
		}
		.tabItem:first-child{
			// margin-left: 22rpx;
		}
		.tabItem:last-child{
			margin-right: 24rpx;
		}
		.thisOpenSelect{
			text{
				color: #333;
				font-weight:600;
				// font-size: 32rpx;
			}
			.activeLine{
				opacity: 1;
			}
		}
	}
	
</style>
