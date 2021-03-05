<template>
  <div id="app">
    <component :is="layout"></component>
    <Modal />
  </div>
</template>

<script>
import PublicLayout from '@/components/layout/public/Public'
import Modal from '@/components/ui/modals/Modal'

export default {
  name: 'App',
  components: {
    PublicLayout,
    Modal
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
