<template>
  <!-- Sidebar -->
  <div :class="['w-64 flex flex-col transition-all duration-300 z-30',
      isDarkMode ? 'bg-gray-900' : 'bg-white border-r','fixed lg:relative inset-y-0 left-0',
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',]">
    <!-- Logo -->
    <div :class="['p-4 lg:p-6 border-b',isDarkMode ? 'border-gray-700' : 'border-gray-200',]">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">S</span>
          </div>
          <span class="text-xl font-bold">StoreShop</span>
        </div>
        <!-- Mobile Close Button -->
        <button @click="$emit('toggleMobile')" class="lg:hidden p-1 rounded-md hover:bg-gray-700">
          <span class="text-xl">✕</span>
        </button>
      </div>
    </div>

    <!-- Category Dropdown -->
    <div :class="['relative p-4 border-b',
        isDarkMode ? 'border-gray-700' : 'border-gray-200',]">
      <div @click="toggleCategoryDropdown"
        class="cursor-pointer w-full p-2 rounded-lg border transition-colors" :class="isDarkMode
            ? 'bg-gray-700 text-white border-gray-600'
            : 'bg-white text-gray-900 border-gray-300'">
        {{ selectedCategory || "Please check category" }}
      </div>
      <ul v-if="isOpen" class="absolute mt-1 w-full max-h-60 overflow-y-auto z-10 rounded-lg shadow-lg"
        :class="isDarkMode
            ? 'bg-gray-700 text-white border border-gray-600'
            : 'bg-white text-gray-900 border border-gray-300'">
        <li v-for="(category, index) in categories" :key="index" @click="selectCategory(category)"
          class="p-2 hover:bg-blue-500 hover:text-white cursor-pointer">
          <router-link class="block w-full h-full" :to="{ path: '/detail', query: { category: category } }">
            {{ category }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <router-link v-for="item in sidebarItems" :key="item.name" :to="item.route === '/' ? '/' : { name: item.route }"
        @click="setActiveMenuItem(item.name)">
        <div :class="['flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200',item.active
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
              : isDarkMode
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900']">
          <div class="flex items-center space-x-3">
            <span class="text-lg">{{ item.icon }}</span>
            <span class="font-medium">{{ item.name }}</span>
          </div>
          <div
            v-if="item.notification"
            class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  isDarkMode: Boolean,
  isMobileMenuOpen: Boolean,
});

const emit = defineEmits(["toggleMobile"]);

const sidebarItems = ref([
  {
    name: "Dashboard",
    icon: "📊",
    route: "/",
    active: true,
    notification: false,
  },
  {
    name: "Categories",
    icon: "🗂️",
    route: "Category",
    active: false,
    notification: false,
  },
  {
    name: "Product",
    icon: "📦",
    route: "NewFashions",
    active: false,
    notification: false,
  },
  {
    name: "Notifications",
    icon: "📑",
    route: "Notifications",
    active: false,
    notification: true,
  },
  {
    name: "Form",
    icon: "🎣",
    route: "Register",
    active: false,
    notification: true,
  },
  {
    name: "CustomerDetail",
    icon: "👥",
    route: "FavouritesView",
    active: false,
    notification: false,
  },
  {
    name: "ContactPage",
    icon: "✉️",
    route: "ContactPage",
    active: false,
    notification: false,
  },
  {
    name: "Logout",
    icon: "	🔓",
    route: "ContactPage",
    active: false,
    notification: false,
  },
]);

const isOpen = ref(false);
const selectedCategory = ref(null);
const categories = [
  "FishingClothing",
  "FishingChairs",
  "FishingWadersBoots",
  "FishingLine",
  "FishingReel",
  "FishingLures",
  "FishingBundles",
  "FishingTools",
  "FishingPolesWhips",
];

const toggleCategoryDropdown = () => {
  isOpen.value = !isOpen.value;
};
const selectCategory = (category) => {
  selectedCategory.value = category;
  isOpen.value = false;
};

const setActiveMenuItem = (itemName) => {
  sidebarItems.value.forEach((item) => {
    item.active = item.name === itemName;
  });
};
</script>
