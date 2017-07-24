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
			@transitionend="transitionEndAct"
			>
			<slot></slot>
		</div>
		<div class="swiper-page" v-show="showPage">
			<span 
				v-for="index in swiperLength" 
				:class="{active: index-1 == activeIndex}"
				@click="gotoPage(index-1)"
				></span>
		</div>
	</div>
</template>
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
			text-align: right;

			&>span{
				display: inline-block;
				width: .45rem;
				height: .45rem;
				margin: 0 .2rem;
				border-radius: 50%;
				background-color: @colorOrg;
				opacity: 0.3;

				&.active{
					opacity: 1;
				}
			}
		}
	}
	
</style>
<script>
	export default{
		props:{
			showPage:{
				type:Boolean,
				default:true
			},
			speed:{
				type:Number,
				default:500
			},
			swiperLength:{
				type:Number,
				default:0
			},
			interval:{
				type:Number,
				default:3000
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
				winW:0,
				indexChanged:false,
				timer:null
			}
		},
		mounted() {
			let that = this;
			this.swiperEls = [].map.call(this.$refs.swiperList.children, el => el);
			this.winW = document.body.clientWidth;
			this.timer = setInterval(function(){
				that.next();
			},that.interval);
		},
		watch:{
			swiperLength(newVal, oldVal){}
		},
		methods: {
			getCurrentPos(e){
				return e.changedTouches ? e.changedTouches[0]['pageX'] : e['pageX'];
			},
			touchStartAct(e){
				let that = this;
				this.startPos = this.getCurrentPos(e);
				this.startTranslateX = this.translateX;
				this.dragging = true;
				this.transitionDuration = 0;
				clearInterval(that.timer);

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
				let that = this;
				this.dragging = false;
				this.transitionDuration = this.speed;

				if(Math.abs(this.delta) < 50){
					this.translateX = this.startTranslateX;
					this.indexChanged = false;
					return;
				}

				let currentIndex = this.activeIndex;
				if(this.delta > 50 && currentIndex > 0){
					currentIndex = currentIndex-1;
					this.$emit('slide-change-start',currentIndex);
				}else if(this.delta<-50 && currentIndex+1 < this.swiperLength){
					currentIndex = currentIndex+1;
					this.$emit('slide-change-start',currentIndex);
				}
				this.indexChanged = true;
				this.gotoPage(currentIndex);

				this.timer = setInterval(function(){
					that.next();
				},that.interval);			

				document.removeEventListener('touchmove', this.touchMoveAct);
                document.removeEventListener('touchend', this.touchEndAct);
                document.removeEventListener('mousemove', this.touchMoveAct);
                document.removeEventListener('mouseup', this.touchEndAct);
			},
			gotoPage(index){
				this.translateX = -this.winW * index;
				this.activeIndex = index;
			},
			transitionEndAct(){
				if(this.indexChanged){
					this.$emit('slide-change-end',this.activeIndex);
				}
			},
			next(){
				this.transitionDuration = this.speed
				let currentIndex = this.activeIndex
				currentIndex ++;
				currentIndex = currentIndex >= this.swiperLength ? 0 : currentIndex;
				this.$emit('slide-change-start',currentIndex);
				this.indexChanged = true;
				this.gotoPage(currentIndex);
			}
		}
	}
</script>