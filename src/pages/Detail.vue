<template>
  	<main-layout>
  		<!-- header start-->
  		<div slot="header">
  			<h1>详情</h1>
  		</div>
  		<!-- header end-->
  		
    	<h1>详情 {{$route.params.id}} </h1>
  	</main-layout>
</template>

<script>
  	import MainLayout from '../layouts/Main.vue'

  	export default {
	    components: {
	      	MainLayout
	    },
	    data(){
	    	return {
	    		id: 0
	    	}
	    }
  	}
</script>
