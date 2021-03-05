<template>
    <div class="app-movie__modalImg">
        <img :src="data.url">
    </div>
</template>

<script>
export default {
    name: 'SlideImage',

    props: {
        data: Object
    }
}
</script>