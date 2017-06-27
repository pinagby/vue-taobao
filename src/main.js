import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './routes';
import App from './App.vue';
import FastClick from 'fastclick';

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    mode: 'history',
    routes
});
const app = new Vue({
   	router
}).$mount("#app");
