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
        <div v-for="item in sidebarItems" :key="item.name" @click="setActiveMenuItem(item.name)"
             :class="['flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200',item.active
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
              : isDarkMode
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900']">
          <div class="flex items-center space-x-3">
            <span class="text-lg">{{ item.icon }}</span>
            <span class="font-medium">{{ item.name }}</span>
          </div>
          <div v-if="item.notification" class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
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
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div v-for="stat in stats" :key="stat.title" :class="['p-4 md:p-6 rounded-xl border transition-all duration-200 hover:shadow-lg cursor-pointer',
              isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300']"
               @click="viewReport(stat.title)">
            <div class="flex items-center justify-between mb-4">
              <h3 :class="['text-sm font-medium',
                isDarkMode ? 'text-gray-400' : 'text-gray-600']">{{ stat.title }}</h3>
              <button :class="['hover:text-white transition-colors',
                isDarkMode ? 'text-gray-400' : 'text-gray-600']">⋯</button>
            </div>
            <div class="mb-4">
              <div class="text-xl md:text-2xl font-bold mb-2">{{ stat.value }}</div>
              <div class="flex items-center space-x-2">
                <span :class="['text-sm font-medium',
                  stat.positive ? 'text-green-400' : 'text-red-400']">
                  {{ stat.change }}
                </span>
                <span :class="['text-sm',isDarkMode ? 'text-gray-400' : 'text-gray-600']">{{ stat.changeValue }}</span>
              </div>
            </div>
            <button :class="['text-sm flex items-center space-x-1 transition-colors hover:text-purple-400',
              isDarkMode ? 'text-gray-400' : 'text-gray-600']">
              <span>View Report</span>
              <span>→</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          <!-- Revenue Chart -->
          <div :class="['xl:col-span-2 p-4 md:p-6 rounded-xl border',isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
              <div>
                <h3 class="text-lg font-semibold mb-1">Revenue</h3>
                <div class="flex items-center space-x-4">
                  <span class="text-2xl font-bold">${{ selectedRevenue.toLocaleString() }}</span>
                  <span class="text-green-400 text-sm">↗ +10%</span>
                </div>
              </div>
              <select v-model="selectedPeriod" @change="updateRevenue" :class="['p-2 rounded-lg border transition-colors',
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-white text-gray-900 border-gray-300']">
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="year">Year</option>
              </select>
            </div>

            <div class="flex items-center space-x-6 mb-6">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span :class="['text-sm',isDarkMode ? 'text-gray-400' : 'text-gray-600']">Profit</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-purple-300 rounded-full"></div>
                <span :class="['text-sm',
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                ]">Loss</span>
              </div>
            </div>

            <!-- Interactive Chart -->
            <div class="h-48 md:h-64 flex items-end space-x-1 md:space-x-2">
              <div v-for="(value, index) in chartData.profit" :key="index" class="flex flex-col items-center space-y-1 flex-1 group cursor-pointer"
                   @mouseenter="hoveredBar = index" @mouseleave="hoveredBar = -1">
                <div class="flex space-x-1 w-full relative">
                  <div class="bg-purple-500 rounded-sm flex-1 transition-all duration-300 hover:bg-purple-400"
                       :class="{ 'transform scale-105': hoveredBar === index }" :style="{ height: (value / 20000 * 160) + 'px' }">
                    <!-- Tooltip -->
                    <div v-if="hoveredBar === index"
                         class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                      Profit: ${{ value.toLocaleString() }}
                    </div>
                  </div>
                  <div class="bg-purple-300 rounded-sm flex-1 transition-all duration-300 hover:bg-purple-200"
                       :class="{ 'transform scale-105': hoveredBar === index }"
                       :style="{ height: (chartData.loss[index] / 20000 * 160) + 'px' }">
                    <!-- Tooltip -->
                    <div v-if="hoveredBar === index"
                         class="absolute -top-8 right-0 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                      Loss: ${{ chartData.loss[index].toLocaleString() }}
                    </div>
                  </div>
                </div>
                <span :class="['text-xs transition-colors',
                  hoveredBar === index
                    ? 'text-purple-500 font-medium'
                    : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                ]">{{ chartData.labels[index] }}</span>
              </div>
            </div>
          </div>

          <!-- Traffic Channel -->
          <div :class="['p-4 md:p-6 rounded-xl border',
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold">Traffic Channel</h3>
              <select :class="['p-2 rounded-lg border text-sm transition-colors',isDarkMode
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-white text-gray-900 border-gray-300']">
                <option>All time</option>
                <option>Last 30 days</option>
                <option>Last 7 days</option>
              </select>
            </div>

            <div class="flex items-center justify-center mb-6">
              <div class="relative w-32 h-32">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="35" fill="none" :stroke="isDarkMode ? '#374151' : '#E5E7EB'" stroke-width="8"/>
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#8B5CF6" stroke-width="8"
                          stroke-dasharray="110 220" stroke-linecap="round" class="animate-pulse"/>
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#A78BFA" stroke-width="8"
                          stroke-dasharray="42 220" stroke-linecap="round" transform="rotate(158 50 50)"/>
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#9CA3AF" stroke-width="8"
                          stroke-dasharray="68 220" stroke-linecap="round" transform="rotate(228 50 50)"/>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-xl font-bold">50.5%</span>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <div v-for="item in trafficData" :key="item.label"
                   class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                <div class="flex items-center space-x-2">
                  <div :class="['w-3 h-3 rounded-full', item.color]"></div>
                  <span :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">{{ item.label }}</span>
                </div>
                <span class="font-medium">{{ item.value }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div :class="['mt-6 md:mt-8 rounded-xl border overflow-hidden',
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
          <div :class="['p-4 md:p-6 border-b flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0',
            isDarkMode ? 'border-gray-700' : 'border-gray-200']">
            <h3 class="text-lg font-semibold">Recent Activity</h3>
            <div class="flex items-center space-x-2">
              <select v-model="activityFilter" @change="filterActivity"
                      :class="['p-2 rounded-lg border text-sm transition-colors',
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-white text-gray-900 border-gray-300']">
                <option value="all">All Activities</option>
                <option value="24h">Last 24h</option>
                <option value="week">This Week</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'">
              <tr>
                <th class="text-left p-3 md:p-4 font-medium text-sm">Customer</th>
                <th class="text-left p-3 md:p-4 font-medium text-sm">Status</th>
                <th class="text-left p-3 md:p-4 font-medium text-sm hidden md:table-cell">Customer ID</th>
                <th class="text-left p-3 md:p-4 font-medium text-sm">Time</th>
                <th class="text-left p-3 md:p-4 font-medium text-sm">Amount</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="activity in filteredActivity" :key="activity.customerId"
                  :class="['border-b transition-colors hover:cursor-pointer',
                    isDarkMode
                      ? 'border-gray-700 hover:bg-gray-700'
                      : 'border-gray-200 hover:bg-gray-50']" @click="viewCustomer(activity)">
                <td class="p-3 md:p-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white text-sm font-medium">{{ activity.name.charAt(0) }}</span>
                    </div>
                    <div class="min-w-0">
                      <div class="font-medium truncate">{{ activity.name }}</div>
                      <div :class="['text-sm truncate',
                          isDarkMode ? 'text-gray-400' : 'text-gray-600']">{{ activity.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="p-3 md:p-4">
                    <span :class="['px-2 py-1 rounded-full text-xs font-medium',
                        getStatusColor(activity.status) ]">{{ activity.status }}
                    </span>
                </td>
                <td :class="['p-3 md:p-4 hidden md:table-cell font-mono text-sm',
                    isDarkMode ? 'text-gray-300' : 'text-gray-700']">{{ activity.customerId }}</td>
                <td :class="['p-3 md:p-4 text-sm',
                    isDarkMode ? 'text-gray-400' : 'text-gray-600']">{{ activity.time }}</td>
                <td class="p-3 md:p-4 font-semibold">{{ activity.amount }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
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
  { name: 'NewFashions', icon: '💬',route: 'NewFashions', active: false, notification: false },
  { name: 'Notifications', icon: '📈',route: 'Notifications', active: false, notification: true },
  { name: 'Register', icon: '📢',route: 'Register', active: false, notification: true },
  { name: 'FavouritesView', icon: '👥',route: 'FavouritesView', active: false, notification: false },
  { name: 'ContactPage', icon: '📊',route: 'ContactPage', active: false, notification: false }
])

const stats = ref([
  {
    title: 'Total Sales',
    value: '$120,784.02',
    change: '+12.3%',
    changeValue: '+$1,453.89 today',
    positive: true
  },
  {
    title: 'Total Orders',
    value: '28,834',
    change: '+20.1%',
    changeValue: '+2,676 today',
    positive: true
  },
  {
    title: 'Visitor',
    value: '18,896',
    change: '-5.6%',
    changeValue: '-876 today',
    positive: false
  },
  {
    title: 'Refunded',
    value: '2,876',
    change: '+1.3%',
    changeValue: '+34 today',
    positive: true
  }
])

const recentActivity = ref([
  {
    name: 'Ronald Richards',
    email: 'ronrichards@mail.com',
    status: 'Member',
    customerId: '#74568320',
    time: '8 min ago',
    amount: '$12,408.20'
  },
  {
    name: 'Darrell Steward',
    email: 'steward.darrel@gmail.com',
    status: 'Signed Up',
    customerId: '#23134855',
    time: '10 min ago',
    amount: '$201.50'
  },
  {
    name: 'Marvin McKinney',
    email: 'mckinney.m@mail.com',
    status: 'New Customer',
    customerId: '#54394837',
    time: '15 min ago',
    amount: '$2,856.03'
  },
  {
    name: 'Jenny Wilson',
    email: 'jenny.wilson@mail.com',
    status: 'Member',
    customerId: '#12345678',
    time: '1 hour ago',
    amount: '$456.78'
  }
])

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  profit: [8000, 12000, 6000, 9000, 15000, 13000],
  loss: [6000, 8000, 10000, 7000, 12000, 9000]
})

const trafficData = ref([
  { label: 'Direct', value: 50.5, color: 'bg-blue-500' },
  { label: 'Referral', value: 19, color: 'bg-purple-400' },
  { label: 'Organic', value: 30.5, color: 'bg-gray-400' }
])

// Computed properties
const filteredActivity = computed(() => {
  if (activityFilter.value === 'all') return recentActivity.value
  // Add filtering logic based on activityFilter value
  return recentActivity.value
})

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
