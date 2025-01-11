<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title>
            <h2 class="text-h5">______________</h2>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Username"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn color="#326ee7" block rounded="lg"> Update Profile </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="ml-16" style="border: 1px solid #ccc; background-color: #f9f9f9; padding: 16px">
        <v-row class="mb-8 justify-center">
          <h2>Your signed documents</h2>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" v-for="document in documents" :key="document.id">
            <v-card>
              <v-card-title class="document-card">
                <p>{{ document.name }}</p>
              </v-card-title>
              <v-card-text>
                <p>{{ document.date }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
const documents = ref([
  { id: 1, name: 'Document 1', date: '2021-10-10' },
  { id: 2, name: 'Document 2', date: '2021-10-11' },
  { id: 3, name: 'Document 3', date: '2021-10-12' },
  { id: 4, name: 'Document 4', date: '2021-10-13' },
  { id: 5, name: 'Document 5', date: '2021-10-14' },
])
</script>

<style scoped>
.document-card {
  height: 100px;
}
</style>
