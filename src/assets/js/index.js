import MainLayout from '../../layouts/Main.vue';
import Swiper from '../../components/Swiper.vue';

export default {
    data() {
        return {
            swipers:[],
            swiperLength:0
        }
    },
    mounted() {
        this.$http
            .get('/src/assets/data/swiper.json')
            .then(response => {
                this.swipers = response.body;
                this.swiperLength = this.swipers.length;
            });
    },
    components: {
        MainLayout,
        Swiper
    },
    methods: {
        onSlideChangeStart (currentPage) {
            console.log('onSlideChangeStart', currentPage);
        },
        onSlideChangeEnd (currentPage) {
            console.log('onSlideChangeEnd', currentPage);
        },
        goToSearchPage () {
            console.log(123);
            this.$router.push({ name: 'search', params: { keyword: ' ' }});
        }
    },
    computed: {
        
    }
}
