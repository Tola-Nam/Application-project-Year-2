<template>
  <div :class="['flex h-screen transition-colors duration-300',isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900']">
    <!-- Mobile Sidebar Overlay -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" @click="toggleMobileMenu"></div>

    <!-- Sidebar -->
    <div :class="['w-64 flex flex-col transition-all duration-300 z-30',isDarkMode ? 'bg-gray-800' : 'bg-white border-r',
      'fixed lg:relative inset-y-0 left-0',
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']">
      <!-- Logo -->
      <div :class="['p-4 lg:p-6 border-b',isDarkMode ? 'border-gray-700' : 'border-gray-200']">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">S</span>
            </div>
            <span class="text-xl font-bold">StoreShop</span>
          </div>
          <!-- Close button for mobile -->
          <button @click="toggleMobileMenu" class="lg:hidden p-1 rounded-md hover:bg-gray-700">
            <span class="text-xl">✕</span>
          </button>
        </div>
      </div>

      <!-- Store Selection -->
      <div :class="['p-4 border-b',isDarkMode ? 'border-gray-700' : 'border-gray-200']">
        <select :class="['w-full p-2 rounded-lg border transition-colors',isDarkMode
            ? 'bg-gray-700 text-white border-gray-600': 'bg-white text-gray-900 border-gray-300']">
          <option>Banana Store</option>
          <option>Apple Store</option>
          <option>Orange Store</option>
        </select>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <div>
          <router-link v-for="item in sidebarItems" :key="item.name" :to="item.route === '/' ? '/' : { name: item.route }"
              class="block">
            <div @click="setActiveMenuItem(item.name)"
                :class="['flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200',item.active
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
            : isDarkMode
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' ]">
              <div class="flex items-center space-x-3">
                <span class="text-lg">{{ item.icon }}</span>
                <span class="font-medium">{{ item.name }}</span>
              </div>
              <div v-if="item.notification" class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </router-link>
        </div>
      </nav>

      <!-- Bottom Section -->
      <div :class="['p-4 border-t space-y-2',isDarkMode ? 'border-gray-700' : 'border-gray-200']">
        <div :class="['flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
          isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100']">
          <span class="text-lg">⚙️</span>
          <span>Settings</span>
        </div>
        <div :class="['flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
          isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100']">
          <span class="text-lg">❓</span>
          <span>Help Center</span>
        </div>
        <div class="flex items-center justify-between p-3">
          <span :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">Dark Mode</span>
          <button @click="toggleDarkMode" :class="['w-12 h-6 rounded-full relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500',
              isDarkMode ? 'bg-purple-600' : 'bg-gray-300']">
            <div :class="['w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow-md',isDarkMode ? 'right-0.5' : 'left-0.5']"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header -->
      <header :class="['p-4 md:p-6 border-b transition-colors',isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Mobile menu button -->
            <button @click="toggleMobileMenu" class="lg:hidden p-2 rounded-md hover:bg-gray-700">
              <span class="text-xl">☰</span>
            </button>
            <div>
              <h1 class="text-xl md:text-2xl font-bold">Dashboard</h1>
              <p :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'" class="text-sm md:text-base">
                Here's your analytic details
              </p>
            </div>
          </div>

          <div class="flex items-center space-x-2 md:space-x-4">
            <div class="flex items-center space-x-2 md:space-x-3">
              <button :class="['p-2 rounded-lg transition-colors relative',
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200']">
                <span class="text-lg">🔔</span>
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>

              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-bold">M</span>
                </div>
                <div class="hidden md:block">
                  <div class="text-sm font-medium">Application Project G7</div>
                  <div :class="['text-xs',isDarkMode ? 'text-gray-400' : 'text-gray-600']">Admin Store</div>
                </div>
                <button :class="['text-lg hover:bg-gray-700 rounded p-1 transition-colors',
                  isDarkMode ? 'text-gray-400' : 'text-gray-600']">⋯
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 p-4 md:p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive state
const isDarkMode = ref(true)
const isMobileMenuOpen = ref(false)
const hoveredBar = ref(-1)
const selectedPeriod = ref('month')
const selectedRevenue = ref(16400)
const activityFilter = ref('all')

const sidebarItems = ref([
  { name: 'Dashboard', icon: '📊', route:'/', active: true, notification: false },
  { name: 'Electronics', icon: '📦',route: 'Electronics', active: false, notification: false },
  { name: 'Product', icon: '💬',route: 'NewFashions', active: false, notification: false },
  { name: 'Notifications', icon: '📈',route: 'Notifications', active: false, notification: true },
  { name: 'Form', icon: '📊',route: 'Register', active: false, notification: true },
  { name: 'FavouritesView', icon: '👥',route: 'FavouritesView', active: false, notification: false },
  { name: 'ContactPage', icon: '📊',route: 'ContactPage', active: false, notification: false }
])

// Methods
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value.toString())
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const setActiveMenuItem = (itemName) => {
  sidebarItems.value.forEach(item => {
    item.active = item.name === itemName
  })
  // Close mobile menu when item is selected
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

const updateRevenue = () => {
  const revenues = {
    week: 4200,
    month: 16400,
    year: 196800
  }
  selectedRevenue.value = revenues[selectedPeriod.value]
}

const filterActivity = () => {
  // Implement filtering logic
  console.log('Filtering activity by:', activityFilter.value)
}

const viewReport = (title) => {
  console.log('Viewing report for:', title)
  // Implement report viewing logic
}

const viewCustomer = (customer) => {
  console.log('Viewing customer:', customer.name)
  // Implement customer viewing logic
}

const getStatusColor = (status) => {
  const colors = {
    'Member': 'bg-gray-100 text-gray-800',
    'Signed Up': 'bg-orange-100 text-orange-800',
    'New Customer': 'bg-green-100 text-green-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

// Lifecycle
onMounted(() => {
  // Load dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode) {
    isDarkMode.value = savedDarkMode === 'true'
  }

  // Handle window resize
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      isMobileMenuOpen.value = false
    }
  }

  window.addEventListener('resize', handleResize)

  // Cleanup
  return () => {
    window.removeEventListener('resize', handleResize)
  }
})
</script>
<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
main::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
main {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;    /* Firefox */
}
</style>
