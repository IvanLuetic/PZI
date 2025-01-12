<template>
  <v-container class="py-6">
    <v-row class="justify-center" no-gutters>
      <v-col cols="12" md="5" lg="3" class="pa-4">
        <v-card class="pa-5 profile-card">
          <v-card-title class="d-flex justify-center align-center">
            <v-avatar color="grey" size="70" class="mb-3">
              <v-icon icon="mdi-account" size="50"></v-icon>
            </v-avatar>
          </v-card-title>

          <v-card-text class="text-center">
            <v-row justify="center">
              <v-col cols="12" class="d-flex justify-center align-center">
                <h3>{{ username }}</h3>
              </v-col>

              <v-col cols="12">
                <p class="text-body-2 mb-4" style="opacity: 80%">{{ email }}</p>
              </v-col>
            </v-row>

            <v-btn
              v-if="!updateProfile"
              color="#326ee7"
              rounded="lg"
              class="update-button"
              @click="updateProfile = !updateProfile"
              >Edit Profile</v-btn
            >
            <v-btn
              v-if="updateProfile"
              color="#326ee7"
              rounded="lg"
              class="update-button"
              @click="updateProfile = !updateProfile"
              >Cancel</v-btn
            >
            <Form v-if="updateProfile" @submit="onSubmit" :validation-schema="schema">
              <v-col cols="12" class="mx-auto pt-5" style="padding: 0px">
                <Field name="username" v-slot="{ field, errors }">
                  <v-text-field
                    v-bind="field"
                    label="Username"
                    outlined
                    dense
                    :error-messages="errors"
                  ></v-text-field>
                </Field>
              </v-col>

              <v-col cols="12" class="mx-auto" style="padding: 0px">
                <Field name="email" v-slot="{ field, errors }">
                  <v-text-field
                    v-bind="field"
                    label="E-mail"
                    outlined
                    dense
                    :error-messages="errors"
                  ></v-text-field>
                </Field>
              </v-col>

              <v-col cols="12" class="mx-auto" style="padding: 0px">
                <Field name="password" v-slot="{ field, errors }">
                  <v-text-field
                    v-bind="field"
                    label="Password"
                    type="password"
                    outlined
                    dense
                    :error-messages="errors"
                  ></v-text-field>
                </Field>
              </v-col>

              <v-col cols="8" class="mx-auto">
                <v-btn type="submit" color="#326ee7" block rounded="lg" class="text-white">
                  Save
                </v-btn>
              </v-col>
            </Form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        class="mx-auto doc-column"
        cols="12"
        md="7"
        lg="8"
        style="border: 1px solid #ccc; background-color: #f9f9f9; margin-top: 1.3%"
      >
        <v-row>
          <v-col cols="6" lg="6" class="d-flex justify-start pl-7 mx-auto">
            <h2>Your signed documents</h2>
          </v-col>
          <v-col cols="6" lg="6" class="d-flex justify-end">
            <v-text-field
              class="pr-3"
              style="max-width: 20vw"
              label="Search documents"
              append-inner-icon="mdi-magnify"
              variant="underlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" md="6" v-for="document in documents" :key="document.id">
            <v-card
              style="
                background-color: #fdfdfd;
                border: 1px solid #ccc;
                margin-left: 2%;
                margin-right: 2%;
              "
            >
              <v-card-title class="document-card">
                <p>{{ document.name }}</p>
              </v-card-title>
              <img
                class="px-2 document-image"
                :src="documentUrl"
                alt="Digital Signature"
                style="width: 100%; margin-top: -10%; margin-right: 2%"
              />

              <v-row class="px-2">
                <v-card-text>
                  <p>{{ document.date }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="#326ee7" text>View</v-btn>
                </v-card-actions>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="snackbar" :timeout="2000" :color="errorMessage ? 'error' : 'success'" top>
    {{ errorMessage ? errorMessage : 'Profile updated!' }}
  </v-snackbar>
</template>

<script setup>
import { ref } from 'vue'
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '../stores/userStore.js'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const schema = yup.object({
  username: yup.string().min(3),
  email: yup.string().email(),
  password: yup.string().min(6),
})

const onSubmit = async (values, { resetForm }) => {
  if (values.username || values.email || values.password) {
    try {
      await userStore.updateProfile(values)
      snackbar.value = true
    } catch (error) {
      snackbar.value = true
    }
  } else {
    alert('Please fill in the form')
  }
  resetForm()
}

const { snackbar, loading, errorMessage } = storeToRefs(userStore)
const updateProfile = ref(false)
const documentUrl = ref('./src/assets/images/doc.png')
const documentName = ref('doc.png')
const documentDate = ref('2025-12-1')
const documents = ref([
  { id: 1, name: documentName, date: documentDate, url: documentUrl },
  { id: 2, name: 'Document 2', date: '2021-10-11' },
  { id: 3, name: 'Document 3', date: '2021-10-12' },
  { id: 4, name: 'Document 4', date: '2021-10-13' },
  { id: 5, name: 'Document 5', date: '2021-10-14' },
])

const username = ref('John Doe')
const email = ref('johndoe@gmail.com')
</script>

<style scoped>
.document-card {
  height: 10vh;
}
.doc-column {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 1%;
  padding: 16px;
}
.v-card-actions {
  margin-left: -5px;
}
.profile-card {
  border: 1px solid #ccc;
  border-radius: 3%;
}
.update-button {
  font-size: 0.8rem;
  max-width: 50vw;
}
</style>
