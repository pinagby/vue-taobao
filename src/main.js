import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './routes';
import FastClick from 'fastclick';

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.directive('scroll',{
	bind(el, binding, vnode){
		window.addEventListener('scroll',function(){
			if(document.body.scrollTop + window.innerHeight >= el.offsetTop + el.clientHeight) {  
			  	let scrollFunc = binding.value;
				scrollFunc();
			}
		});
	}
});

const router = new VueRouter({
    mode: 'history',
    routes
});
const app = new Vue({
   	router
}).$mount("#app");
