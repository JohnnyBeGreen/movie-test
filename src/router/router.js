import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home')
        },
        {
            path: '/movies',
            name: 'movies',
            redirect: '/'
        },
        {
            path: '/movies/:id',
            name: 'movie',
            component: () => import('@/views/movies/Movie')
        },
        {
            path: '/tv/:id',
            name: 'tv',
            component: () => import('@/views/movies/Movie')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

router.beforeEach ((to, from, next) => {
    store.dispatch('SETTINGS_IS_MOBILE', document.documentElement.clientWidth)
    next()
})

export default router