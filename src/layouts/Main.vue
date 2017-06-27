<template>
    <div class="page">
        <header id="header" class="header">
            <slot name="header"></slot>
        </header>
        <!-- /header -->
        <nav class="nav-bar">
            <router-link to="/home" :class="{active:currentUrl=='/home'}"><i class="iconfont icon-home_fill_light"></i><br>首页</router-link>
            <router-link to="/chart" :class="{active:currentUrl=='/chart'}"><i class="iconfont icon-cart_fill_light"></i><br>购物车</router-link>
            <router-link to="/ucenter" :class="{active:currentUrl=='/ucenter'}"><i class="iconfont icon-my_fill_light"></i><br>我的</router-link>
        </nav>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                currentUrl:this.$route.path
            }
        },
        computed:{}
    }
</script>
