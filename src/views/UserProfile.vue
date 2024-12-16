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
    </v-row>
  </v-container>
</template>
