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
		<nav class="index-nav">
            <a v-for="item in navs" :href="'/detail/'+item.id">
                <img :src="item.url" :alt="item.title">
                <p>{{ item.title }}</p>
            </a>
        </nav>

        <!-- 头条 -->
        <div class="index-news">
            <img src="/src/assets/images/toutiao.png" alt="头条">
            <div class="news-wrap">
                <ul :style="{'transform' : 'translate3d(0,' + newsY + 'px, 0)'}">
                    <li v-for="item in news"><span>{{ item.tag }}</span><a :href="'/detail/'+item.id">{{ item.title }}</a></li>
                </ul>
            </div>
        </div>

        <!-- 推荐 -->
        <ul class="rec-list mt-10">
            <li>
                <a href="#">
                    <h2 class="color-org"><i class="iconfont icon-time"></i> 淘抢购</h2>
                    <p>限时限量汇全网好货</p>
                    <counterdown :seconds="3600"></counterdown>
                    <img src="/src/assets/images/rec1.jpg">
                </a>
            </li>
            <li>
                <a href="#">
                    <h2 class="color-blue"><i class="iconfont icon-appreciate_light"></i> 有好货</h2>
                    <p>好品味从挑剔开始</p>
                    <p class="color-blue">品质生活指南</p>
                    <img src="/src/assets/images/rec2.png">
                </a>
            </li>
            <li>
                <a href="#">
                    <h2 class="color-mred"><i class="iconfont icon-shop"></i> 爱逛街</h2>
                    <p>正流行的好品味</p>
                    <img src="/src/assets/images/rec3.jpg">
                </a>
            </li>
            <li>
                <a href="#">
                    <h2 class="color-red"><i class="iconfont icon-form_light"></i> 必买清单</h2>
                    <p>都帮您整理好啦</p>
                    <img src="/src/assets/images/rec4.jpg">
                </a>
            </li>
        </ul>

        <!-- 广告 -->
        <a class="ad mt-10" :href="'/detail/'+ad.id">
            <img :src="ad.img" :alt="ad.title">
        </a>

        <!-- 猜你喜欢 -->
        <div class="like-blk">
            <div class="title">
                <h2><i class="iconfont icon-like color-red"></i> 猜你喜欢</h2>
                <p>实时推荐最适合你的宝贝</p>
            </div>
            <ul class="like-list fn-clear" v-scroll="loadMoreLike">
                <li v-for="item in likes">
                    <a :href="'/detail/'+item.id">
                        <img :src="item.imgSrc" :alt="item.title">
                        <h3>{{item.title}}</h3>
                        <p class="color-org">￥{{item.price}}</p>
                    </a>
                </li>
            </ul>
            <div class="loading" v-show='likeLoading'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="data-loaded" v-show="likeLoaded">
                <span>我是有底线的</span>
            </div>
        </div>
  	</main-layout>
</template>
<style lang="less" scoped> @import '../assets/css/index';</style>
<script src="../assets/js/index.js"></script>
