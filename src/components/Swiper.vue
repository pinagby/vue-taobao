<template>
	<div class="swiper">
		<div class="swiper-wrap" ref="swiperList" 
			:style="{
                'transform' : 'translate3d(' + translateX + 'px,0, 0)',
                'transition-duration': transitionDuration+'ms'
            }"
			@touchstart= "touchStartAct"
			@touchmove="touchMoveAct"
			@touchend="touchEndAct"
			@mousedown= "touchStartAct"
			@mousemove="touchMoveAct"
			@mouseup="touchEndAct"
			>
			<slot></slot>
		</div>
		<div class="swiper-page" v-show="showPage">
			<span 
				v-for="(item, index) in swiperEls" 
				:class="{active:index == activeIndex}"
				@click="gotoPage(index)"
				></span>
		</div>
	</div>
</template>
<!-- <link rel="stylesheet/less" type="text/css" href="./assets/css/common.less"> -->
<style lang='less' scoped>
	@import '../assets/css/common';
	.swiper{
		position: relative;
		width: 100%; 
		min-height: 5rem;
		overflow: hidden;

		&-wrap{
			height: 100%;
			.flex;
		}
		&-item{
			display: block;
			overflow: hidden;
		    -webkit-flex-shrink: 0;
		    -ms-flex-negative: 0;
		    flex-shrink: 0;
		    width: 100%;
		    height: 100%;

		    img{display: block; max-width: 100%; margin: 0 auto;}
		}
		&-page{
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 2;
			text-align: center;

			&>span{
				display: inline-block;
				width: .5rem;
				height: .5rem;
				margin: 0 .2rem;
				border-radius: 50%;
				background-color: @colorOrg;
				opacity: 0.5;

				&.active{
					opacity: 1;
				}
			}
		}
	}
	
</style>
<script>
	const VERTICAL = 'vertical';
    const HORIZONTAL = 'horizontal';

	export default{
		props:{
			direction:{
				type:String,
				default:HORIZONTAL
			},
			showPage:{
				type:Boolean,
				default:true
			},
			speed:{
				type:Number,
				default:500
			}
		},
		data(){
			return {
				delta:0,
				startPos:0,
				activeIndex:0,
				dragging:false,
				swiperEls:[],
				translateX:0,
				startTranslateX:0,
				transitionDuration:0,
				winW:0
			}
		},
		computed:{
			itemLenth(){
				return this.swiperEls.length
			}
		},
		mounted() {
			this.swiperEls = [].map.call(this.$refs.swiperList.children, el => el);
			this.winW = document.body.clientWidth;
		},
		methods: {
			getCurrentPos(e){
				return e.changedTouches ? e.changedTouches[0]['pageX'] : e['pageX'];
			},
			touchStartAct(e){
				this.startPos = this.getCurrentPos(e);
				this.startTranslateX = this.translateX
				this.dragging = true;
				this.transitionDuration = 0;

				document.addEventListener('touchmove', this.touchMoveAct, false);
                document.addEventListener('touchend', this.touchEndAct, false);
                document.addEventListener('mousemove', this.touchMoveAct, false);
                document.addEventListener('mouseup', this.touchEndAct, false);
			},
			touchMoveAct(e){
				if(!this.dragging) return;
				this.delta = this.getCurrentPos(e)-this.startPos;
				this.translateX = this.startTranslateX + this.delta;

				if ( Math.abs(this.delta) > 0) {
                    e.preventDefault();
                }
			},
			touchEndAct(e){
				this.dragging = false;
				this.transitionDuration = this.speed;
				let currentIndex = this.activeIndex;
				if(this.delta > 50){
					currentIndex = currentIndex == 0 ? currentIndex : currentIndex-1;
				}else if(this.delta<-50){
					currentIndex = currentIndex+1 >= this.itemLenth ? currentIndex :currentIndex+1;
				}else{
					this.translateX = this.startTranslateX;
				}
				this.gotoPage(currentIndex);

				document.removeEventListener('touchmove', this.touchMoveAct);
                document.removeEventListener('touchend', this.touchEndAct);
                document.removeEventListener('mousemove', this.touchMoveAct);
                document.removeEventListener('mouseup', this.touchEndAct);
			},
			gotoPage(index){
				this.translateX = -this.winW * index;
				this.activeIndex = index;
			}
		}
	}
</script>