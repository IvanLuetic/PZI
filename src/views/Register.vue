<template>
  <v-container class="d-flex justify-center align-center" style="height: calc(100vh - 56px)">
    <v-card class="pa-8" width="400" elevation="10" style="background-color: white">
      <v-card-title class="text-h5 text-center font-weight-bold">Register</v-card-title>

      <Form @submit="onSubmit" :validation-schema="schema">
        <v-row dense>
          <v-col cols="12">
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

          <v-col cols="12">
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

          <v-col cols="12">
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

          <v-col cols="12">
            <v-btn type="submit" color="#326ee7" block rounded="lg" class="text-white">
              Register
            </v-btn>
          </v-col>
        </v-row>
      </Form>

      <div class="text-center mt-2">
        Already have an account?
        <router-link to="/login" class="text-decoration-underline">Log in</router-link>
      </div>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="2000" color="error" top>
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '../stores/userStore.js'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const schema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be over 3 characters'),
  email: yup.string().email('Not a vaid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be over 6 characters')
    .required('Password is required'),
})

const snackbar = ref(false)

async function onSubmit(values, { resetForm }) {
  await userStore.register(values.username, values.password)

  if (errorMessage) {
    console.log(userStore.errorMessage)
    snackbar.value = true
  }
  resetForm()
}

const { errorMessage, loading } = storeToRefs(userStore)
</script>

<style scoped>
.v-card {
  border: 1px solid #525252;
  color: #326ee7;
  font-size: 1rem;
}
</style>
