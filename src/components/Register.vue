<template>
  <form @submit.prevent="handleLogin">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = async () => {
  // Example: Check credentials
  if (username.value === 'admin' && password.value === '1234') {
    // Store token (optional)
    localStorage.setItem('token', 'mytoken')

    // Navigate to dashboard
    router.push('/NewFashions')
  } else {
    alert('Login failed')
  }
}
</script>
