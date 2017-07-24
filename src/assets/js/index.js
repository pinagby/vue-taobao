import MainLayout from '../../layouts/Main.vue';
import Swiper from '../../components/Swiper.vue';
import Counterdown from '../../components/Counterdown.vue';

export default {
    data() {
        return {
            swipers:[],
            swiperLength:0,
            navs:[],
            news:[],
            newsY:0,
            ad:{}
        }
    },
    mounted() {
        //轮播图
        this.$http
            .get('/src/assets/data/swiper.json')
            .then(response => {
                this.swipers = response.body;
                this.swiperLength = this.swipers.length;
            });
        //导航
        this.$http
            .get('/src/assets/data/indexNavs.json')
            .then(response => {
                this.navs = response.body;
            });
        //头条
        this.$http
            .get('/src/assets/data/newsList.json')
            .then(response => {
                let that = this;
                this.news = response.body;
                let newsIndex = 0;
                let newsLen = this.news.length;
                setInterval(function(){
                    newsIndex ++;
                    newsIndex = newsIndex >= newsLen ? 0 : newsIndex;
                    that.newsY = -24*newsIndex;
                },3000);
            });

        //广告
        this.$http
            .get('/src/assets/data/ad.json')
            .then(response => {
                this.ad = response.body;
            });
    },
    components: {
        MainLayout,
        Swiper,
        Counterdown
    },
    methods: {
        onSlideChangeStart (currentPage) {
            // console.log('onSlideChangeStart', currentPage);
        },
        onSlideChangeEnd (currentPage) {
            // console.log('onSlideChangeEnd', currentPage);
        },
        goToSearchPage () {
            this.$router.push({ name: 'search', params: { keyword: ' ' }});
        }
    },
    computed: {
        
    }
}
