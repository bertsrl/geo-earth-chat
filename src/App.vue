<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
<style lang="sass">
    body
      background: #ddd
</style>
