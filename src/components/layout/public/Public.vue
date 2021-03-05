<template>
    <div class="container-fluid p-0">
        <Header />
        <section class="container-fluid p-0 app-body">            
            <router-view />
        </section>
        <Footer />
    </div>
</template>

<script>
import Header from './header/Header'
import Footer from './footer/Footer'

export default {
    name: 'PublicLayout',

    components: {
        Header,
        Footer
    }
}
</script>