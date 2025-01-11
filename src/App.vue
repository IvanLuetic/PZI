<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useUserStore } from './stores/userStore'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()

const { loading, snackbar } = storeToRefs(userStore)
</script>

<template>
  <v-app class="app-background">
    <Header v-if="route.path != '/register' && route.path != '/login'" />
    <v-main>
      <div
        class="text-center m3"
        v-show="loading"
        style="
          position: absolute;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 300px;
        "
      >
        <v-progress-circular indeterminate color="primary" />
      </div>
      <v-container fluid style="padding: 0px">
        <router-view />
      </v-container>
      <v-snackbar v-model="snackbar" :timeout="3000" top>
        {{ 'Logged out' }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<style scoped>
.app-background {
  background-color: var(--v-theme-background); /* Use the custom background color */
}
</style>
