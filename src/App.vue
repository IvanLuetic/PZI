<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'

import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <v-app class="app-background">
    <Header v-if="route.path != '/register' && route.path != '/login'" />
    <v-main>
      <v-container fluid style="padding: 0px">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.app-background {
  background-color: var(--v-theme-background); /* Use the custom background color */
}
</style>
