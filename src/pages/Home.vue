<template>
  	<main-layout>
    	<swiper
	        direction="horizontal"
	        :show-pagination="true"
	        :loop="true"
	        @slide-change-start="onSlideChangeStart"
	        @slide-change-end="onSlideChangeEnd">
		    <a href="#" class="swiper-item"><img src="/src/assets/images/banner1.jpg" alt=""></a>
		    <a href="#" class="swiper-item"><img src="/src/assets/images/banner2.jpg" alt=""></a>
		    <a href="#" class="swiper-item"><img src="/src/assets/images/banner3.jpg" alt=""></a>
		</swiper>
  	</main-layout>
</template>
<script src="../assets/js/index.js"></script>