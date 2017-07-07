import App from './App.vue'
/**
 * vue-router 预先全部加载方式 
 */
// import Home from './pages/Home.vue'
// import Category from './pages/Category.vue'
// import Chart from './pages/Chart.vue'
// import UCenter from './pages/UCenter.vue'

/**
 * vue-router 懒加载方式 
 */
const Home = resolve => require.ensure([], () => resolve(require('./pages/Home.vue')), 'home');
const Chart = r => require.ensure([], () => r(require('./pages/Chart.vue')), 'chart');
const UCenter = r => require.ensure([], () => r(require('./pages/UCenter.vue')), 'ucenter');
const Detail = r => require.ensure([], () => r(require('./pages/Detail.vue')), 'detail');
const Search = r => require.ensure([], () => r(require('./pages/Search.vue')), 'search');

export default [{
    name:'root',
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [{
        name:"null",
    	path:'',
    	redirect:'/home'
    },{
        name:'home',
    	path:'/home',
    	component:Home,
        meta: { keepAlive: true }
    },{
        name:'chart',
    	path:'/chart',
    	component:Chart
    },{
        name:'ucenter',
    	path:'/ucenter',
    	component:UCenter
    },{
        name:'detail',
        path:'/detail/:id',
        component:Detail
    },{
        path:'/search',
        component:Search
    },{
        name:'search',
        path:'/search/:keyword',
        component:Search
    }]
}];
