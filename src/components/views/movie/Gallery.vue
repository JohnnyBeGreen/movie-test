<template>
    <div class="container pt-5 pb-5">
        <h5 class="mb-3">Gallery</h5>
        <div class="container-fluid p-0">
            <div class="d-flex flex-row flex-wrap">
                <img 
                    v-for="(poster, index) in posters" :key="index"
                    :src="configuration.imageBaseUrl + configuration.posterSizes[isModal ? 3 : 3] + poster.file_path" 
                    @click="!isModal ? openImage(configuration.imageBaseUrl + 'original' + poster.file_path) : false"
                    class="img-fluid p-1"/>
            </div>
        </div>   
    </div>
</template>

<script>
//IE friendly
import SlideModal from './SlideModal'

export default {
    name: 'Gallery',

    props: {
        posters: Array,
        configuration: Object
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