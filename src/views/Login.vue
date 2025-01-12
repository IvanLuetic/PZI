<template>
  <v-container class="d-flex align-center justify-center" style="height: 100vh">
    <v-card
      class="pa-5 mx-auto"
      :height="height"
      :width="width"
      elevation="10"
      style="
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
      "
    >
      <v-card-title class="text-h5 text-center font-weight-bold title">Log in</v-card-title>

      <Form @submit="onSubmit" :validation-schema="schema">
        <v-row dense>
          <v-col cols="12">
            <Field name="username" v-slot="{ field, errors }">
              <v-text-field
                v-bind="field"
                value="testuser"
                label="Username"
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
                value="password123"
                type="password"
                outlined
                dense
                :error-messages="errors"
              ></v-text-field>
            </Field>
          </v-col>

          <v-col cols="12">
            <v-btn type="submit" color="#326ee7" block rounded="lg" class="text-white">
              Log in
            </v-btn>
          </v-col>
        </v-row>
      </Form>

      <div class="text-center mt-2">
        Don't have an account?
        <router-link to="/register">Register </router-link>
      </div>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="2000" :color="errorMessage ? 'error' : 'success'" top>
      {{ errorMessage ? errorMessage : 'Log in successful!' }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '../stores/userStore.js'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'

const { name } = useDisplay()
const height = computed(() => {
  switch (name.value) {
    case 'xs':
      return '60vh'
    case 'sm':
      return '50vh'
    case 'md':
      return '60vh'
    case 'lg':
      return '50vh'
    case 'xl':
      return '50vh'
    case 'xxl':
      return '40vh'
  }
})
const width = computed(() => {
  switch (name.value) {
    case 'xs':
      return '100vw'
    case 'sm':
      return '80vw'
    case 'md':
      return '50vw'
    case 'lg':
      return '30vw'
    case 'xl':
      return '25vw'
    case 'xxl':
      return '25vw'
  }
})

const userStore = useUserStore()

const snackbar = ref(false)
const schema = yup.object({
  password: yup
    .string()
    .min(6, 'Password must be over 6 characters')
    .required('Password is required'),
})

async function onSubmit(values, { resetForm }) {
  await userStore.login(values.username, values.password)

  if (errorMessage) {
    console.log(userStore.errorMessage)
    snackbar.value = true
  } else {
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
