<template>
    <div class="container pt-4">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/" tag="a">Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{ pageData.title }}</li>
            </ol>
        </nav>

        <div class="row app-movie__item">
            <div class="col-sm-auto app-movie__item__img">
                <img 
                    v-if="pageData.poster_path !== null" 
                    :src="configuration.imageBaseUrl + configuration.posterSizes[3] + pageData.poster_path"
                    :alt="pageData.title">
                <div v-else class="app-movie__noimg"><span>no image</span></div>
            </div>
            <div class="col col-sm app-movie__item__text">
                <h3 class="app-movie__item__title">{{ pageData.title }}</h3>
                <span v-if="pageData.release_date" class="mb-2 text-muted">{{ pageData.release_date | moment("MMMM DD, YYYY") }}</span>
                <span class="mb-1">{{ pageData.overview }}</span>
                <span class="text-muted">rating:&nbsp;{{ pageData.vote_average }}</span>
                
                <section class="mt-3 app-movie__item__companies">
                    <div class="" v-for="(company, index) in pageData.production_companies" :key="index">
                        <img v-if="company.logo_path" :src="configuration.imageBaseUrl + 'w92' + company.logo_path" :alt="company.name">
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Movie',

    data() {
        return {
            pageData: {},
            posters: [],
            configuration: {
                imageBaseUrl: '',
                posterSizes: []
            }
        }
    },
    computed: {
        itemComputed() {
            return this.item
        },
        isMobile() {
            return this.$store.getters.SETTINGS_IS_MOBILE
        }
    },
    mounted() {
        this.pageInit()
    },
    methods: {
        pageInit() {            
            this.setCongiguration()
                .then(() => {
                    this.$store.dispatch('TMDB_MOVIE', this.$route.params.id)
                        .then(() => {
                            this.pageData = this.$store.getters.TMDB_MOVIE
                            console.log(this.pageData)
                        })
                    
                    this.$store.dispatch('TMDB_MOVIE_IMAGES', this.$route.params.id)
                        .then(() => {
                            this.posters = [...this.$store.getters.TMDB_MOVIE_IMAGES.posters]
                        })
                })
        },
        setCongiguration() {
            return this.$store.dispatch('TMDB_CONFIGURATION')
                .then(() => {
                    console.log(this.$store.getters.TMDB_CONFIGURATION)
                    this.configuration.imageBaseUrl = this.$store.getters.TMDB_CONFIGURATION.images.base_url
                    this.configuration.posterSizes = this.$store.getters.TMDB_CONFIGURATION.images.poster_sizes
                })
        }   
    }
}
</script>