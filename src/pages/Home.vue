<template>
  	<main-layout>
  		<!-- header start-->
  		<div class="header-search" slot="header">
  			<i class="iconfont icon-tao"></i>
            <a class="search" href="/search">
                <i class="iconfont icon-search"></i> 寻找宝贝店铺
            </a>
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
		<!-- 首页导航 -->
		<nav>
            <a href="#">
                <img src="../assets/images/tmall.png">
                <p>天猫</p>
            </a>      
        </nav>
  		
  	</main-layout>
</template>
<style lang="less" scoped>
    @import '../assets/css/common';
    .header-search{
        .flex;
        padding: .35rem;
        line-height: 1.3rem;

        &>.icon-tao{
            font-size: 1.2rem;
        }

        .search{
            display: inline-block;
            .flex-1;
            margin-left: .5rem;
            background: rgba(0,0,0,0.2);
            border-radius: .25rem;
            
            &>.icon-search{
                font-size: .8rem;
                vertical-align: middle;
            }
        }
    }
</style>
<script src="../assets/js/index.js"></script>