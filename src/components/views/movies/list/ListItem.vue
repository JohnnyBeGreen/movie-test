<template>
    <div class="row mb-4 app-movies__list__item">
        <div class="col-sm-auto p-0 app-movies__list__item__img">
            <img 
                v-if="item.poster_path !== null" 
                :src="configuration.imageBaseUrl + configuration.posterSizes[isMobile ? 4 : 1] + item.poster_path">
            <div v-else class="app-movies__list__noimg"><span>no image</span></div>
        </div>
        <div class="col col-sm app-movies__list__item__text">
            <router-link :to="getUrlType() + item.id" class="app-movies__list__item__title" tag="a">{{ item.title || item.name }}</router-link>
            <span v-if="item.release_date" class="mb-2 text-muted">{{ item.release_date | moment("MMMM DD, YYYY") }}</span>
            <span class="mb-1">{{ item.overview }}</span>
            <span class="text-muted">vote average:&nbsp;{{ item.vote_average }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MoviesListItem',

    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        configuration: {
            type: Object,
            default: () => ({})
        },
        type: {
            type: String
        }
    },
    computed: {
        itemComputed() {
            return this.item
        },
        isMobile() {
            return this.$store.getters.SETTINGS_IS_MOBILE
        },
    },
    methods: {
        getUrlType() {
            if (this.type === 'movie') return 'movies/'
            if (this.type === 'tv') return 'tv/'
        }
    }
}
</script>