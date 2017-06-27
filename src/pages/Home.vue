<template>
  	<main-layout>
  		<!-- header start-->
  		<div slot="header">
  			<h1>shouye </h1>
  		</div>
  		<!-- header end-->
		<!-- 轮播图 start -->
    	<swiper
	        :show-pagination="true"
	        :swiper-length="swiperLength"
	        @slide-change-start="onSlideChangeStart"
	        @slide-change-end="onSlideChangeEnd">
		    <a class="swiper-item" v-for="item in swipers" :href="'/detail/'+item.id"><img :src="item.image" :alt="item.title"></a>
		</swiper>
  		<!-- 轮播图 start -->
		<!--  -->
		<nav></nav>
  		
  	</main-layout>
</template>
<script src="../assets/js/index.js"></script>