<script setup>
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'
  import Navigation from './components/elements/Navigation.vue'

  const status = ref(true)
</script>

<template>
  <Navigation />
  <RouterView />
  <footer>
    server status: {{ status === true ? 'running!' : 'down?' }}
  </footer>
</template>

<style scoped>

</style>
