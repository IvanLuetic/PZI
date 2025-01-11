import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router/index.js'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(null)
  const loading = ref(false)
  const errorMessage = ref('')
  const snackbar = ref(false)
  const settingsSnackbar = ref(false)

  const mockUsers = [
    { username: 'testuser', password: 'password123', firstName: 'John', lastName: 'Doe' },
  ]

  //test
  const login = async (username, password) => {
    loading.value = true
    errorMessage.value = ''

    const userData = mockUsers.find(
      (user) => user.username === username && user.password === password,
    )

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (userData) {
      token.value = 'mock-jwt-token'
      localStorage.setItem('token', token.value)
      user.value = userData
      console.log('Logging in...')

      router.push({ name: 'Home' })
    } else {
      errorMessage.value = 'Invalid username or password'
      console.log('Error: Invalid credentials')
    }

    loading.value = false
  }

  const register = async (username, password, email) => {
    loading.value = true
    console.log(loading.value)
    errorMessage.value = ''

    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push({ name: 'Home' })
    loading.value = false
    console.log(loading.value)
  }

  const logout = async () => {
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 2000))
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    loading.value = false
    snackbar.value = true
  }

  const updateProfile = async (userData) => {
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000))
    user.value = userData
    loading.value = false
    settingsSnackbar.value = true
  }

  return {
    token,
    user,
    loading,
    errorMessage,
    snackbar,
    settingsSnackbar,
    login,
    register,
    logout,
    updateProfile,
  }
})
