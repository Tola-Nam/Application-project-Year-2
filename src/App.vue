<script setup>
import { ref } from "vue";
import Sidebar from "../src/components/AdminSidebar.vue";

const isDarkMode = ref(false);
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value.toString());
  document.documentElement.classList.toggle("dark", isDarkMode.value);
};
</script>

<template>
  <div class="flex h-screen">
    <!-- Mobile overlay (click to close) -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-opacity-50 z-20 lg:hidden"
      @click="toggleMobileMenu"></div>

    <!-- Sidebar Component -->
    <Sidebar
      :isDarkMode="isDarkMode"
      :isMobileMenuOpen="isMobileMenuOpen"
      @toggleMobile="toggleMobileMenu" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header with mobile toggle button -->
      <div class="p-4 border-b flex justify-between items-center">
        <button
          @click="toggleMobileMenu"
          class="lg:hidden text-2xl p-2 rounded">
          ☰
        </button>
        <!-- <h1 class="text-xl font-sans text-gray-800 color-cycle">Dashboard for admin</h1> -->
        <h1 class="text-base md:text-6xl lg:text-xl font-sans-center relative">
          <span class="inline-block animate-rainbow-text bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent bg-size-200 animate-gradient-x">
            Dashboard for Admin
          </span>
        </h1>
        <!--        <div class="flex items-center justify-between p-3">-->
        <!--          <button @click="toggleDarkMode"-->
        <!--              :class="['w-14 h-8 rounded-full relative flex items-center px-1 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500',-->
        <!--              isDarkMode ? 'bg-purple-700' : 'bg-gray-300']">-->
        <!--            &lt;!&ndash; Moon icon (optional, can change to sun/moon toggle later) &ndash;&gt;-->
        <!--            <i class="bi bi-moon text-white text-xs transition-opacity duration-300"-->
        <!--                :class="isDarkMode ? 'opacity-100' : 'opacity-0'"></i>-->
        <!--            &lt;!&ndash; Toggle knob &ndash;&gt;-->
        <!--            <div :class="['w-6 h-6 bg-white rounded-full shadow-md absolute top-1 transition-all duration-300',isDarkMode ? 'right-1' : 'left-1']"></div>-->
        <!--          </button>-->
        <!--        </div>-->
      </div>

      <!-- Main router view or content -->
      <main class="p-0 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style>
/* Optional: Improve mobile tap targets */
button {
  -webkit-tap-highlight-color: transparent;
}
@keyframes gradient-x {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

.bg-size-200 {
  background-size: 200% 200%;
}

/* Responsive text sizing */
@media (max-width: 768px) {
  .text-4xl {
    font-size: 2rem;
  }
  .text-6xl {
    font-size: 3rem;
  }
  .text-7xl {
    font-size: 3.5rem;
  }
}
</style>
