<template>
	<div class="couter-down">
		<span>{{ hour }}</span> :
		<span>{{ minute }}</span> :
		<span>{{ second }}</span>
	</div>
</template>
<style lang='less' scoped>
.couter-down{
	&>span{
		display: inline-block;
		padding: 0 .2rem;
		background-color: #333;
		border-radius: .25rem;
		color: #fff;
		font-size: .6rem;
		line-height: 1rem;
	}
}
</style>
<script>
	export default{
		props:{
			seconds:{
				type:Number,
				required:true
			}
		},
		data(){
			return {
				hour : '--',
				minute : '--',
				second : '--',
				timer : null,
				leftSeconds:0
			}
		},
		mounted(){
			let that = this;
			that.leftSeconds = that.seconds;
			that.formatTime(that.leftSeconds);
			
			that.timer = setInterval(function(){
				that.leftSeconds -- ;
				that.formatTime(that.leftSeconds);
				if(that.leftSeconds <= 0){
					clearInterval(that.timer);
				}
			},1000);
		},
		methods:{
			formatNumber(number){
				return number < 10 ? ('0' + number) : number;
			},
			formatTime(seconds){
				let that = this,
					hour = 0,
					minute = 0,
					second = 0;
				hour = Math.floor(seconds / 3600);
				minute = Math.floor( (seconds % 3600) / 60 );
				second = seconds - hour * 3600 - minute * 60;
				that.hour = that.formatNumber(hour);
				that.minute = that.formatNumber(minute);
				that.second = that.formatNumber(second);
			}
		}
	}
</script>