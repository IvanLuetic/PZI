<template>
  <v-container class="py-10 d-flex justify-center">
    <v-col cols="12" md="6">
      <v-card class="py-8 pl-0">
        <v-card-title class="text-center">Profile Settings</v-card-title>
        <Form @submit="onSubmit" :validation-schema="schema">
          <v-col cols="8" class="mx-auto">
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

          <v-col cols="8" class="mx-auto">
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

          <v-col cols="8" class="mx-auto">
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
      </v-card>
    </v-col>
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
  try {
    await userStore.updateProfile(values)
    snackbar.value = true
  } catch (error) {
    snackbar.value = true
  }
  resetForm()
}

const { snackbar, loading, errorMessage } = storeToRefs(userStore)
</script>
