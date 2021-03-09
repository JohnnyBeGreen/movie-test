<template>
    <div class="container-fluid">
        <section class="container p-0 mt-3">
            <div class="raw d-flex">
                <div class="col-md-2 p-0 mr-1">
                    <select class="form-control" id="movie-year-select" v-model="filter.order">
                        <option value="asc">worst of</option>
                        <option value="desc">best of</option>
                    </select>
                </div>
                <div class="col-md-2 p-0 mr-1">
                    <select class="form-control" id="movie-year-select" v-model="filter.year">
                        <option value="">any year</option>
                        <option v-for="(year, index) in years" :key="index" :value="year">{{year}}</option>
                    </select>
                </div>
                <div class="col-md-2 p-0">
                    <select class="form-control" id="movie-genre-select" v-model="filter.type">
                        <option value="movie">movies</option>
                        <option value="tv">serials</option>
                    </select>
                </div>
            </div>
        </section>
        <section class="container pt-4 pb-5">
            <template v-for="(item, index) in dataList">
                <ListItem :key="index" :item="item" :configuration="configuration" :type="filter.type"/>
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
                type: 'movie',
                sort: 'popularity',
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
            
            this.setConfiguration()
                .then(() => {
                    this.$store.dispatch('TMDB_MOVIES', {
                        type: this.filter.type,
                        year: this.filter.year,
                        sort: `${this.filter.sort}.${this.filter.order}`
                    })
                    .then(() => {
                        this.dataList = this.$store.getters.TMDB_MOVIES.slice(0, 10)
                    })
                })
        },
        setConfiguration() {
            return this.$store.dispatch('TMDB_CONFIGURATION')
                .then(() => {
                    this.configuration.imageBaseUrl = this.$store.getters.TMDB_CONFIGURATION.images.base_url
                    this.configuration.posterSizes = this.$store.getters.TMDB_CONFIGURATION.images.poster_sizes
                })
        }       
    },
    watch: {
        filter: {
            handler(val) {
                this.$store.dispatch('TMDB_MOVIES', {
                    type: val.type,
                    year: val.year,
                    sort: `${val.sort}.${val.order}`
                }).then(() => this.dataList = this.$store.getters.TMDB_MOVIES.slice(0, 10))
            },
            deep: true
        }
    }
}
</script>