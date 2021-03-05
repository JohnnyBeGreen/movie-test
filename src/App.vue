<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>
import PublicLayout from '@/components/layout/public/Public'

export default {
  name: 'App',
  components: {
    PublicLayout
  },
  data() {
    return {
      layout: PublicLayout
    }
  }
}
</script>

<style lang="sass">
  @import './assets/styles/styles'
</style>
