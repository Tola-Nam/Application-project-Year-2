<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Header -->
    <div class="flex items-center justify-end mb-6">
      <div class="flex items-center space-x-3">
        <!-- Search Input -->
        <div class="relative">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input v-model="searchTerm" type="text" placeholder="Search"
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"/>
        </div>

        <!-- Filters Button -->
<!--        <button class="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">-->
<!--          <svg class="h-4 w-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>-->
<!--          </svg>-->
<!--          <span class="text-gray-700">Filters</span>-->
<!--        </button>-->
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <!-- Table Header -->
      <div class="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
        <div class="col-span-1">
          <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
        </div>
        <div class="col-span-4 md:col-span-3">User name</div>
        <div class=" hidden md:block md:col-span-2">Access</div>
        <div class="hidden md:block md:col-span-2">Last active</div>
        <div class="hidden lg:block lg:col-span-2">Date added</div>
        <div class="col-span-2 md:col-span-2 lg:col-span-2"></div>
      </div>

      <!-- Table Rows -->
      <div v-for="user in filteredUsers" :key="user.id" class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
        <!-- Checkbox -->
        <div class="col-span-1 flex items-center">
          <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
        </div>

        <!-- User Info -->
        <div class="col-span-4 md:col-span-3 flex items-center space-x-3">
          <img :src="user.avatar" :alt="user.name" class="h-10 w-10 rounded-full object-cover">
          <div>
            <div class="font-medium text-gray-900">{{ user.name }}</div>
            <div class="text-sm text-gray-500">{{ user.email }}</div>
          </div>
        </div>

        <!-- Access -->
        <div class="hidden md:flex md:col-span-2 items-center">
          <div class="flex flex-wrap gap-1">
            <span v-for="access in user.access" :key="access" class="px-2 py-1 text-xs font-medium rounded-md"
                  :class="{
                    'bg-green-100 text-green-800': access === 'Admin',
                    'bg-blue-100 text-blue-800': access === 'Data Export',
                    'bg-purple-100 text-purple-800': access === 'Data Import'
                  }">
              {{ access }}
            </span>
          </div>
        </div>
        <!-- Last Active (hidden on small screens) -->
        <div class="hidden md:flex md:col-span-2 items-center">
          <span class="text-sm text-gray-900">{{ user.lastActive }}</span>
        </div>
        <!-- Date Added (hidden on medium and small screens) -->
        <div class="hidden lg:flex lg:col-span-2 items-center">
          <span class="text-sm text-gray-500">{{ user.dateAdded }}</span>
        </div>
        <!-- Actions -->
        <div class="col-span-7 md:col-span-2 flex items-start justify-end">
          <button class="p-1 mb-2 md:mb-3 rounded hover:bg-gray-100 transition-colors">
            <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')

const users = ref([
  {
    id: 1,
    name: 'Florence Shaw',
    email: 'florence@untitledui.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    access: ['Admin', 'Data Export', 'Data Import'],
    lastActive: 'Mar 4, 2024',
    dateAdded: 'July 4, 2022'
  },
  {
    id: 2,
    name: 'Amelie Laurent',
    email: 'amelie@untitledui.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    access: ['Admin', 'Data Export', 'Data Import'],
    lastActive: 'Mar 4, 2024',
    dateAdded: 'July 4, 2022'
  },
  {
    id: 3,
    name: 'Ammar Foley',
    email: 'ammar@untitledui.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    access: ['Data Export', 'Data Import'],
    lastActive: 'Mar 2, 2024',
    dateAdded: 'July 4, 2022'
  },
  {
    id: 4,
    name: 'Caitlyn King',
    email: 'caitlyn@untitledui.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    access: ['Data Export', 'Data Import'],
    lastActive: 'Mar 6, 2024',
    dateAdded: 'July 4, 2022'
  },
  {
    id: 5,
    name: 'Sienna Hewitt',
    email: 'sienna@untitledui.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    access: ['Data Export', 'Data Import'],
    lastActive: 'Mar 8, 2024',
    dateAdded: 'July 4, 2022'
  },
  {
    id: 6,
    name: 'Olly Shoeder',
    email: 'olly@untitledui.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    access: ['Data Export', 'Data Import'],
    lastActive: 'Mar 6, 2024',
    dateAdded: 'July 4, 2022'
  }
])

const filteredUsers = computed(() => {
  if (!searchTerm.value) return users.value

  return users.value.filter(user =>
      user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})
</script>