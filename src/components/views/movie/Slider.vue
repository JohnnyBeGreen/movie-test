<template>
    <div class="container pt-5 pb-5">
        <h5 class="mb-3">Gallery</h5>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(poster, index) in posters" :key="index">
                <img 
                    :src="configuration.imageBaseUrl + configuration.posterSizes[isModal ? 3 : 2] + poster.file_path" 
                    @click="!isModal ? openImage(configuration.imageBaseUrl + 'original' + poster.file_path) : false"
                    :class="{'w-100': isModal}"/>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>     
    </div>
</template>

<script>
import SlideModal from './SlideModal'

export default {
    name: 'MovieSlider',

    props: {
        posters: Array,
        configuration: Object
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: this.$store.getters.SETTINGS_IS_MOBILE ? '1' : '5',
        //   centeredSlides: true,
          spaceBetween: 20,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    computed: {
        isModal() {
            return this.$store.getters.SETTINGS_IS_MOBILE
        }
    },
    methods: {
        openImage(url) {
            this.$store.dispatch('MODAL_OPEN', {
                component: SlideModal,
                data: {
                    url: url
                }
            })
        }
    }
}
</script>