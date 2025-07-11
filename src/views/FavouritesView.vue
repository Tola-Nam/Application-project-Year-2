<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Customer Management</h1>
        <p class="text-gray-600 mt-1">Manage and view customer information</p>
      </div>

      <!-- Table Container -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <!-- Table Header -->
            <thead class="bg-gray-50">
              <tr>
                <th 
                  v-for="column in columns" 
                  :key="column.key"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  @click="sortBy(column.key)"
                >
                  <div class="flex items-center space-x-1">
                    <span>{{ column.label }}</span>
                    <!-- <ChevronUpDownIcon class="h-4 w-4" /> -->
                  </div>
                </th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="customer in sortedCustomers" 
                :key="customer.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- Customer ID -->
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{{ customer.id }}
                </td>

                <!-- Name with Avatar -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div 
                        class="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                        :style="{ backgroundColor: customer.avatarColor }"
                      >
                        {{ customer.initials }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ customer.name }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Number of Orders -->
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ customer.orderCount }}
                </td>

                <!-- Total Order -->
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${{ formatCurrency(customer.totalOrder) }}
                </td>

                <!-- Average Order Value -->
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ formatCurrency(customer.avgOrderValue) }}
                </td>

                <!-- Status -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="customer.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'"
                  >
                    <div 
                      class="w-1.5 h-1.5 rounded-full mr-1.5"
                      :class="customer.status === 'Active' ? 'bg-green-400' : 'bg-red-400'"
                    ></div>
                    {{ customer.status }}
                  </span>
                </td>

                <!-- Last Order -->
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(customer.lastOrder) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table Footer/Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// import { ChevronUpDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

// Table columns configuration
const columns = [
  { key: 'id', label: 'Customer ID' },
  { key: 'name', label: 'Name' },
  { key: 'orderCount', label: 'No of Order' },
  { key: 'totalOrder', label: 'Total order' },
  { key: 'avgOrderValue', label: 'Avg. order value' },
  { key: 'status', label: 'Status' },
  { key: 'lastOrder', label: 'Last order' }
]

// Sample customer data
const customers = ref([
  {
    id: '56578',
    name: 'Brooklyn Simmons',
    initials: 'BS',
    avatarColor: '#10B981',
    orderCount: 131,
    totalOrder: 3950.00,
    avgOrderValue: 3950.00,
    status: 'Active',
    lastOrder: '2024-03-17'
  },
  {
    id: '56578',
    name: 'Dianne Russell',
    initials: 'DR',
    avatarColor: '#3B82F6',
    orderCount: 89,
    totalOrder: 110.00,
    avgOrderValue: 5.00,
    status: 'Active',
    lastOrder: '2024-03-17'
  },
  {
    id: '56578',
    name: 'Jerome Bell',
    initials: 'JB',
    avatarColor: '#8B5CF6',
    orderCount: 2,
    totalOrder: 14.90,
    avgOrderValue: 1090.00,
    status: 'Active',
    lastOrder: '2024-03-17'
  },
  {
    id: '56578',
    name: 'Ronald Richards',
    initials: 'RR',
    avatarColor: '#EF4444',
    orderCount: 211,
    totalOrder: 3950.00,
    avgOrderValue: 234.00,
    status: 'Inactive',
    lastOrder: '2024-03-17'
  },
  {
    id: '56578',
    name: 'Cody Fisher',
    initials: 'CF',
    avatarColor: '#F59E0B',
    orderCount: 141,
    totalOrder: 3666.00,
    avgOrderValue: 10333.00,
    status: 'Inactive',
    lastOrder: '2024-03-17'
  },
  {
    id: '56578',
    name: 'Cameron Williamson',
    initials: 'CW',
    avatarColor: '#06B6D4',
    orderCount: 41,
    totalOrder: 853.00,
    avgOrderValue: 950.00,
    status: 'Active',
    lastOrder: '2024-03-17'
  },
  {
    id: '56578',
    name: 'Wade Warren',
    initials: 'WW',
    avatarColor: '#84CC16',
    orderCount: 32,
    totalOrder: 412.60,
    avgOrderValue: 110.00,
    status: 'Active',
    lastOrder: '2024-03-17'
  },
  {
    id: '56578',
    name: 'Savannah Nguyen',
    initials: 'SN',
    avatarColor: '#EC4899',
    orderCount: 132,
    totalOrder: 7850.00,
    avgOrderValue: 853.00,
    status: 'Active',
    lastOrder: '2024-03-17'
  },
  {
    id: '56578',
    name: 'Darlene Robertson',
    initials: 'DR',
    avatarColor: '#6366F1',
    orderCount: 40,
    totalOrder: 1090.00,
    avgOrderValue: 412.60,
    status: 'Inactive',
    lastOrder: '2024-03-17'
  },
  {
    id: '56578',
    name: 'Leslie Alexander',
    initials: 'LA',
    avatarColor: '#14B8A6',
    orderCount: 12,
    totalOrder: 96.00,
    avgOrderValue: 14.90,
    status: 'Active',
    lastOrder: '2024-03-17'
  }
])

// Sorting functionality
const sortColumn = ref('')
const sortDirection = ref('asc')

const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const sortedCustomers = computed(() => {
  if (!sortColumn.value) return customers.value

  return [...customers.value].sort((a, b) => {
    let aVal = a[sortColumn.value]
    let bVal = b[sortColumn.value]

    // Handle different data types
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }

    if (sortDirection.value === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
})

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>