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
            likes:[],
            likePage:0,
            likeLoading:false,
            likeLoaded:false,
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

        //猜你喜欢
        this.$http
            .get('/src/assets/data/like.json')
            .then(response => {
                this.likes = response.body;
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
        },
        loadMoreLike(){
            let that = this;
            if(that.likeLoading || that.likeLoaded){
                return;
            }
            that.likeLoading = true;
            this.$http
                .get('/src/assets/data/like.json',{ page: that.likePage+1 })
                .then(response => {
                    that.likeLoading = false;
                    that.likePage ++;

                    let newLikes = response.body,
                        i = 0,
                        len = newLikes.length;
                    for( ; i<len; i++ ){
                        this.likes.push(newLikes[i]);
                    }

                    that.likeLoaded = newLikes.length<10;
                });
        }
    },
    computed: {
        
    }
}
