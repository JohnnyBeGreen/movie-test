<template>
    <div class="container-fluid">
        <section class="container p-0 mt-3">
            <div class="raw d-flex">
                <div class="col-md-1 p-0 mr-1">
                    <select class="form-control" id="movie-year-select" v-model="filter.order">
                        <option value="asc">bottom</option>
                        <option value="desc">top</option>
                    </select>
                </div>
                <div class="col-md-3 p-0 mr-1">
                    <select class="form-control" id="movie-year-select" v-model="filter.year">
                        <option value="">any year</option>
                        <option v-for="(year, index) in years" :key="index" :value="year">{{year}}</option>
                    </select>
                </div>
                <div class="col-md-3 p-0">
                    <select class="form-control" id="movie-genre-select" v-model="filter.genre">
                        <option value="">any genre</option>
                        <option v-for="(genre, index) in genres" :key="index" :value="genre.id">{{genre.name}}</option>
                    </select>
                </div>
            </div>
        </section>
        <section class="container pt-4 pb-5">
            <template v-for="(item, index) in dataList">
                <ListItem :key="index" :item="item" :configuration="configuration"/>
            </template>
        </section>
    </div>
</template>

<script>
import ListItem from '@/components/views/movies/list/ListItem'
import generateYearsList from '@/mixins/utils/years' 

export default {
    name: 'HomePageView',

    mixins: [generateYearsList],
    components: {
        ListItem
    },
    data() {
        return {
            dataList: [],
            configuration: {
                imageBaseUrl: '',
                posterSizes: []
            },
            filter: {
                year: '',
                genre: '',
                sort: 'vote_count',
                order: 'asc'
            },

            genres: []
        }
    },
    computed: {
        years() {
            return this.generateYearsList() 
        }
    },
    mounted() {
        this.pageInit()
    },
    methods: {
        pageInit() {
            this.$store.dispatch('TMDB_MOVIES_GENRES')
                .then(() => {this.genres = this.$store.getters.TMDB_MOVIES_GENRES.genres})
            
            this.setCongiguration()
                .then(() => {
                    this.$store.dispatch('TMDB_MOVIES', {
                        year: this.filter.year,
                        sort: `${this.filter.sort}.${this.filter.order}`
                    })
                    .then(() => {
                        this.dataList = this.$store.getters.TMDB_MOVIES
                    })
                })
        },
        setCongiguration() {
            return this.$store.dispatch('TMDB_CONFIGURATION')
                .then(() => {
                    this.configuration.imageBaseUrl = this.$store.getters.TMDB_CONFIGURATION.images.base_url
                    this.configuration.posterSizes = this.$store.getters.TMDB_CONFIGURATION.images.poster_sizes
                })
        }       
    },
    watch: {
        'filter.year': {
            handler(val) {
                this.$store.dispatch('TMDB_MOVIES', {
                    year: val
                }).then(() => this.dataList = this.$store.getters.TMDB_MOVIES)
            }
        },
        'filter.genre': {
            handler(val) {
                this.$store.dispatch('TMDB_MOVIES', {
                    genre: val
                }).then(() => this.dataList = this.$store.getters.TMDB_MOVIES)
            }
        },
        'filter.order': {
            handler(val) {
                this.$store.dispatch('TMDB_MOVIES', {
                    sort: `${this.filter.sort}.${val}`
                }).then(() => this.dataList = this.$store.getters.TMDB_MOVIES)
            }
        }
    }
}
</script>