<template>
    <div class="row app-movie__item">
        <div class="col-sm-auto app-movie__item__img">
            <img 
                v-if="pageData.poster_path !== null && pageData.poster_path !== undefined" 
                :src="configuration.imageBaseUrl + configuration.posterSizes[3] + pageData.poster_path"
                :alt="pageData.title">
            <div v-else class="app-movie__noimg"><span>no image</span></div>
        </div>

        <div class="col col-sm app-movie__item__text">
            <h3 class="app-movie__item__title">{{ pageData.title || pageData.name }}</h3>
            <span v-if="pageData.release_date" class="mb-2 text-muted">{{ pageData.release_date | moment("MMMM DD, YYYY") }}</span>
            <span class="mb-1">{{ pageData.overview }}</span>
            <span class="text-muted">vote average:&nbsp;{{ pageData.vote_average }}</span>
            
            <section v-if="(credits.cast && credits.cast.length) || (credits.crew && credits.crew.length)" class="mt-3 app-movie__item__credits">
                <figure v-if="credits.cast.length">
                    <figcaption>Cast</figcaption>
                        <ul class="app-movie__list">
                            <li v-for="(actor, index) in castOpen ? credits.cast : credits.cast.slice(0, 6)" :key="index"><b v-if="actor.character">{{ actor.character + ' - '}}</b> {{ actor.name }}</li>
                            <li v-if="credits.cast.length > 6" class="app-movie__list__show" @click="castOpen = !castOpen">{{castOpen ? 'reduce' : 'show more'}}</li>
                        </ul>
                </figure>
                <figure v-if="credits.crew.length">
                    <figcaption>Crew</figcaption>
                        <ul class="app-movie__list">
                            <li v-for="(crew, index) in crewOpen ? credits.crew : credits.crew.slice(0, 6)" :key="index"><b v-if="crew.job">{{crew.job + ' - '}}</b> {{ crew.name }}</li>
                            <li v-if="credits.crew.length > 6" class="app-movie__list__show" @click="crewOpen = !crewOpen">{{crewOpen ? 'reduce' : 'show more'}}</li>
                        </ul>
                </figure>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MovieContent',

    props: {
        pageData: Object,
        credits: Object,
        configuration: Object
    },
    data() {
        return {
            castOpen: false,
            crewOpen: false
        }
    }
}
</script>