import MainLayout from '../../layouts/Main.vue';
import Swiper from '../../components/Swiper.vue';
// import Swiper from 'vue-swiper';

export default {
    data() {
        return {}
    },
    created() {
        
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
        }
    },
    computed: {
        
    }
}
