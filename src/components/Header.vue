<template>
  <v-app-bar app class="custom-navbar">
    <v-container>
      <v-row align="center">
        <v-col>
          <router-link to="/" class="no-underline" @click.native="scrollToTop"
            ><v-toolbar-title>Placeholder name</v-toolbar-title></router-link
          >
        </v-col>
        <v-spacer></v-spacer>

        <v-col class="d-none d-sm-flex" sm="auto">
          <a href="#about" class="no-underline"> <v-btn>About</v-btn> </a>
          <router-link v-if="!user" :to="'/login'" class="no-underline">
            <v-btn>Log in</v-btn>
          </router-link>

          <v-btn v-else @click="userStore.logout"> Log out </v-btn>
          <v-btn v-if="user">
            Profile
            <v-icon left>mdi-account</v-icon>
          </v-btn>
          <router-link to="/register" v-if="!user"> <v-btn> Register </v-btn></router-link>
        </v-col>

        <v-col class="d-flex d-sm-none justify-end">
          <v-btn icon @click="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app temporary right class="custom-drawer">
    <v-list>
      <v-list-item>
        <a href="#about" class="no-underline">
          <v-list-item-title>About</v-list-item-title>
        </a>
      </v-list-item>
      <v-list-item v-if="!user">
        <router-link :to="'/login'" class="no-underline">
          <v-list-item-title>Log in</v-list-item-title>
        </router-link>
      </v-list-item>
      <v-list-item v-else @click="userStore.logout">
        <v-list-item-title>Log out</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="user">
        <v-list-item-title>
          Profile
          <v-icon left>mdi-account</v-icon>
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!user">
        <router-link to="/register" class="no-underline">
          <v-list-item-title>Register</v-list-item-title>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const drawer = ref(false)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { user } = storeToRefs(userStore)
</script>

<style scoped>
.custom-navbar {
  background-color: #326ee7 !important;
  color: #e7e7e7;
}
.custom-navbar .v-btn {
  color: #e7e7e7;
  text-transform: none;
}
.custom-navbar .v-toolbar-title {
  color: #e7e7e7 !important;
  text-transform: none;
}
.custom-drawer {
  height: auto;
  width: auto;
  max-width: 100px;
  max-height: 150px;
  scrollbar-color: none;
  background-color: #f5f5f5;
}
</style>
