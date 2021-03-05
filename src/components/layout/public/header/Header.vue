<template>
    <header class="container-fluid p-0 d-flex align-items-center app-header">
        <div class="container">
            <div class="row">
                <div class="col-md-auto app-logo app-logo__header p-0" @click="$router.push('/')">
                    <img :src="getImg()" alt="">
                    <span>Киновтопку</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'PublicLayoutHeader',

    methods: {
        getImg() {
            return require('@/assets/files/svg/logo.svg')
        }
    } 
}
</script>