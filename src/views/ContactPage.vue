<template>
  <div class="min-h-screen flex items-center justify-center  p-4">
    <div class="w-full max-w-md  rounded-lg shadow-lg border border-gray-200 p-8">
      <!-- Toggle Buttons -->
      <div class="mb-4 flex justify-center items-center gap-4">
        <!-- Register Button -->
        <button @click="isLoginMode = false" class="button" type="button">
          <span class="button__text">Register</span>
          <span class="button__icon">
          <i class="bi bi-person-plus"></i>
        </span>
        </button>

        <!-- Login Button -->
        <button @click="isLoginMode = true" class="button" type="button">
          <span class="button__text">Login</span>
          <span class="button__icon">
            <i class="bi bi-box-arrow-in-right"></i>
          </span>
        </button>
      </div>


      <!-- Register Form -->
      <form v-if="!isLoginMode" @submit.prevent="handleRegister" class="space-y-6">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input type="text" id="firstName" v-model="registerForm.firstName" autocomplete="given-name" required
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors">
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input type="text" id="lastName"
                   v-model="registerForm.lastName" autocomplete="family-name" required
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors">
          </div>
        </div>

        <div>
          <label for="registerEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" id="registerEmail" v-model="registerForm.email" autocomplete="email" required
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                 placeholder="example@gmail.com">
        </div>

        <div>
          <label for="registerPhone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input type="tel" id="registerPhone" v-model="registerForm.phone" required
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                 placeholder="09xxxxxxxx">
        </div>

        <div>
          <label for="registerPassword" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" id="registerPassword" v-model="registerForm.password"
                   autocomplete="new-password"
                   required pattern="[A-Za-z0-9]{8,}"
                   class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                   placeholder="Enter your password">
            <i :class="showPassword ? 'bi-eye' : 'bi-eye-slash'" @click="togglePassword"
               class="bi absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700">
            </i>
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <div class="relative">
            <input
                :type="showConfirm ? 'text' : 'password'"
                id="confirmPassword"
                v-model="registerForm.confirmPassword"
                autocomplete="new-password"
                required
                pattern="[A-Za-z0-9]{6,}"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Repeat your password"
            >
            <i
                :class="showConfirm ? 'bi-eye' : 'bi-eye-slash'"
                @click="toggleConfirm"
                class="bi absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            ></i>
          </div>
        </div>

        <button
            type="submit"
            class="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          Register
        </button>
      </form>

      <!-- Login Form -->
      <form v-else @submit.prevent="handleLogin" class="space-y-6">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

        <div>
          <label for="loginEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
              type="email"
              id="loginEmail"
              v-model="loginForm.email"
              autocomplete="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Input your email"
          >
        </div>

        <div>
          <label for="loginPhone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
              type="tel"
              id="loginPhone"
              v-model="loginForm.phone"
              autocomplete="tel"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Input your phone number"
          >
        </div>

        <div>
          <label for="loginPassword" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" id="loginPassword" v-model="loginForm.password"
                   autocomplete="current-password" required pattern="[A-Za-z0-9]{8,}"
                   class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                   placeholder="Enter your password">
            <i :class="showPassword ? 'bi-eye' : 'bi-eye-slash'" @click="togglePassword"
               class="bi absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700">
            </i>
          </div>
        </div>

        <button type="submit"
                class="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Form state
const isLoginMode = ref(false)
const showPassword = ref(false)
const showConfirm = ref(false)

// Form data
const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const loginForm = ref({
  email: '',
  phone: '',
  password: ''
})

// Toggle password visibility
function togglePassword() {
  showPassword.value = !showPassword.value
}

function toggleConfirm() {
  showConfirm.value = !showConfirm.value
}

// Form handlers
function handleRegister() {
  console.log('Register form submitted:', registerForm.value)
  // Add your registration logic here
}

function handleLogin() {
  console.log('Login form submitted:', loginForm.value)
  // Add your login logic here
}
</script>

<style scoped>
/* Custom styles for form validation */
input:invalid:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

input:valid:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

/* style button */
.button {
  position: relative;
  width: 150px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #17795E;
  background-color: #209978;
  overflow: hidden;
}

.button, .button__icon, .button__text {
  transition: all 0.3s;
}

.button .button__text {
  transform: translateX(22px);
  color: #fff;
  font-weight: 600;
}

.button .button__icon {
  position: absolute;
  transform: translateX(109px);
  height: 100%;
  width: 39px;
  background-color: #17795E;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button .svg {
  width: 20px;
  fill: #fff;
}

.button:hover {
  background: #17795E;
}

.button:hover .button__text {
  color: transparent;
}

.button:hover .button__icon {
  width: 148px;
  transform: translateX(0);
}

.button:active .button__icon {
  background-color: #146c54;
}

.button:active {
  border: 1px solid #146c54;
}
</style>