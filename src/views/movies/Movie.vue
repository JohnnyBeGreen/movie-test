<template>
    <div class="container pt-4">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/" tag="a">Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{ pageData.title || pageData.name }}</li>
            </ol>
        </nav>

        <Content :page-data="pageData" :credits="credits" :configuration="configuration"/>

        <Slider v-if="posters.length" :configuration="configuration" :posters="posters"/>
    </div>
</template>

<script>
import Content from '@/components/views/movie/Content'
import Slider from '@/components/views/movie/Slider'

export default {
    name: 'Movie',

    components: {
        Content,
        Slider
    },
    data() {
        return {
            pageData: {},
            posters: [],
            credits: {},
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
            this.setConfiguration()
                .then(() => {
                    if (this.$route.name === 'movie') {
                        this.$store.dispatch('TMDB_MOVIE', this.$route.params.id)
                            .then(() => {
                                this.pageData = this.$store.getters.TMDB_MOVIE
                            })
                        
                        this.$store.dispatch('TMDB_MOVIE_CREDITS', this.$route.params.id)
                            .then(() => {
                                this.credits = { cast: this.$store.getters.TMDB_MOVIE_CREDITS.cast, crew: this.$store.getters.TMDB_MOVIE_CREDITS.crew }
                            })
                        
                        this.$store.dispatch('TMDB_MOVIE_IMAGES', this.$route.params.id)
                            .then(() => {
                                this.posters = [...this.$store.getters.TMDB_MOVIE_IMAGES.backdrops]
                            })
                    }
                    if (this.$route.name === 'tv') {
                        this.$store.dispatch('TMDB_TV', this.$route.params.id)
                            .then(() => {
                                // console.log(this.$store.getters.TMDB_TV)
                                this.pageData = this.$store.getters.TMDB_TV
                            })
                        this.$store.dispatch('TMDB_TV_CREDITS', this.$route.params.id)
                            .then(() => {
                                // console.log(this.$store.getters.TMDB_TV_CREDITS)
                                this.credits = { cast: this.$store.getters.TMDB_TV_CREDITS.cast, crew: this.$store.getters.TMDB_TV_CREDITS.crew }
                            })
                        
                        this.$store.dispatch('TMDB_TV_IMAGES', this.$route.params.id)
                            .then(() => {
                                // console.log(this.$store.getters.TMDB_TV_IMAGES)
                                this.posters = [...this.$store.getters.TMDB_TV_IMAGES.backdrops]
                            })
                    }
                })
        },
        setConfiguration() {
            return this.$store.dispatch('TMDB_CONFIGURATION')
                .then(() => {
                    this.configuration.imageBaseUrl = this.$store.getters.TMDB_CONFIGURATION.images.base_url
                    this.configuration.posterSizes = this.$store.getters.TMDB_CONFIGURATION.images.poster_sizes
                })
        }   
    }
}
</script>