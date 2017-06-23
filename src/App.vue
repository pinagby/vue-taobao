<template>
	<div>
		<transition>
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
    </div>
</template>


<script>
  	export default {
  		created() {  }
  	}
</script>

<style lang="less">
  	@import './assets/css/fonts';
  	@import './assets/css/common';
</style>